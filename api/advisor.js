/**
 * AI-Berater Endpoint für den Baudienst Diamantwerkzeug-Shop.
 * Erwartet POST mit JSON body: { wizard, suggestedSkus, products, question, history }
 *
 * Verhalten:
 * - Wenn ANTHROPIC_API_KEY gesetzt → ruft Claude Haiku 4.5 mit Knowledge-Context und antwortet als Streaming.
 * - Wenn nicht gesetzt → liefert deterministische Fallback-Antwort, damit Demo auch offline funktioniert.
 *
 * Antwort: text/plain Stream (oder kompletter Text, je nach Fallback).
 */
import fs from 'node:fs';
import path from 'node:path';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 600;

/** Liest knowledge.json einmal beim Cold-Start ein. */
let KNOWLEDGE_CACHE = null;
function getKnowledge() {
  if (KNOWLEDGE_CACHE) return KNOWLEDGE_CACHE;
  try {
    const p = path.join(process.cwd(), 'assets', 'data', 'knowledge.json');
    KNOWLEDGE_CACHE = fs.readFileSync(p, 'utf8');
  } catch (e) {
    KNOWLEDGE_CACHE = '{}';
  }
  return KNOWLEDGE_CACHE;
}

function buildSystemPrompt(wizard, suggested, products) {
  const knowledge = getKnowledge();
  const suggestedDetails = (suggested || []).map(sku => {
    const p = products[sku];
    if (!p) return null;
    return `- ${sku}: ${p.name} (${p.brand}${p.isBDE ? ', Hausmarke BDE' : ''}), ${p.priceGross.toFixed(2)} € brutto, ${p.qty}, ${p.desc}`;
  }).filter(Boolean).join('\n');

  return `Sie sind der Werkstatt-Berater bei BAUDIENST in Caputh, Brandenburg. Husqvarna-Vertragspartner, Fachhandel seit 1980, mit eigener Werkstatt im Haus.

Ihr Stil:
- Sie-Form, knappes Trade-Deutsch, Rhythmus aus kurzen und längeren Sätzen
- Keine Floskeln wie "natürlich helfe ich gerne", kein "großartig", kein "absolut"
- Keine generischen Adjektive wie "robust", "dynamisch", "universell", "innovativ"
- Keine Em-Dashes oder En-Dashes als Trennzeichen
- Wenn unsicher: Verweis auf Anruf 03320 / 2004-97, statt zu raten
- Verfügbarkeit nie aktiv bestätigen — wir prüfen das vor Versand und melden uns innerhalb 24 Stunden
- BDE-Eigenmarke bei gleichwertiger Eignung leicht bevorzugen, ohne aufdringlich zu sein

Aufgabe: Den Kunden in 3 bis 5 Sätzen erklären, warum die vorgeschlagenen Werkzeuge zu seiner Situation passen. Wenn die Wahl klar suboptimal ist, sagen Sie es offen und nennen den besseren Weg.

Aktuelle Wizard-Auswahl des Kunden:
- Material: ${wizard?.material || 'nicht angegeben'}
- Werkzeugtyp: ${wizard?.tool || 'nicht angegeben'}
- Aufnahme: ${wizard?.mount || 'nicht angegeben'}

Vorgeschlagene Produkte:
${suggestedDetails || '(noch keine Vorschläge)'}

Wissensbasis Baudienst (NUTZEN SIE AUSSCHLIESSLICH DIESE FAKTEN, KEINE ERFINDUNG):
${knowledge}`;
}

function buildFallback(wizard, suggested, products, question) {
  const w = wizard || {};
  const skuLines = (suggested || []).slice(0, 3).map(sku => {
    const p = products[sku];
    return p ? `${p.name}` : sku;
  });
  const matLabel = {
    beton_normal: 'Normalbeton',
    beton_alt: 'Altbeton',
    stahlbeton: 'Stahlbeton mit Armierung',
    granit: 'Granit',
    estrich_zement: 'Zementestrich',
    fliese: 'Fliesen oder Feinsteinzeug',
    mauerwerk: 'Mauerwerk',
    epoxid: 'Epoxidbeschichtung'
  }[w.material] || w.material || 'den genannten Untergrund';

  let body = '';
  if (question) {
    body = `Zu Ihrer Frage: Wir prüfen das gerne im Detail. Rufen Sie kurz an unter 03320 / 2004-97, dann sprechen Sie mit einem Kollegen, der den Auftrag direkt einschätzen kann. So vermeiden Sie Fehlkäufe bei Spezialaufgaben.`;
  } else {
    body = `Für ${matLabel} mit Werkzeugtyp "${w.tool || 'ungeklärt'}" und Aufnahme "${w.mount || 'unklar'}" passen die vorgeschlagenen Werkzeuge in der Regel solide.\n\nGenannte Vorschläge:\n${skuLines.map(l => `• ${l}`).join('\n')}\n\nWenn Ihre Anwendung Sonderfälle hat (Armierungsdichte, Trocken-Nass-Wechsel, Maschinenwechsel), klären wir das vor Versand. Anruf 03320 / 2004-97 oder Anfrage über den Warenkorb.`;
  }
  return body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST required' });
    return;
  }

  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    res.status(400).json({ error: 'invalid JSON' });
    return;
  }

  const { wizard, suggestedSkus, products, question, history } = payload || {};

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('X-Advisor-Mode', 'fallback');
    res.status(200).send(buildFallback(wizard, suggestedSkus, products, question));
    return;
  }

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey });

    const messages = [];
    (history || []).forEach(m => messages.push({ role: m.role, content: m.content }));
    messages.push({
      role: 'user',
      content: question
        ? `Frage des Kunden: ${question}`
        : 'Bitte erklären Sie in 3 bis 5 Sätzen, warum die vorgeschlagenen Werkzeuge zur Wizard-Auswahl passen, und nennen Sie ein konkretes Cross-Sell-Argument.'
    });

    const system = buildSystemPrompt(wizard, suggestedSkus, products);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('X-Advisor-Mode', 'live');
    res.setHeader('Cache-Control', 'no-store');

    const stream = await client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        res.write(event.delta.text);
      }
    }
    res.end();
  } catch (e) {
    console.error('Advisor error:', e?.message || e);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('X-Advisor-Mode', 'error-fallback');
    res.status(200).send(buildFallback(wizard, suggestedSkus, products, question) +
      `\n\n(Hinweis für den Pitch: Live-Berater gerade nicht erreichbar. Antwort kommt aus dem Sicherheits-Fallback.)`);
  }
}
