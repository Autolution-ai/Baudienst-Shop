/* ── Baudienst Shop: zentrale Produktdaten ──
   Single source of truth für alle Seiten (PDP, Kategorie, Warenkorb, Finder).
   Preise aus Kontext-Datei. Bilder vom Baudienst-CDN, mit onerror-Fallback. */

const CDN = 'https://baudienst.shop/wp-content/uploads/artikelbilder-dmc/';
const FALLBACK_IMG = 'https://baudienst.shop/wp-content/uploads/2019/10/bd-logo-300-kl-6.png';

const PRODUCTS = {
  // ── HAUPTPRODUKT: SCHLEIFMASCHINE ────────────────────────────────
  'pg400': {
    sku: '00200606',
    mfgNo: '970704501',
    ean: '7333377534254',
    brand: 'Husqvarna',
    name: 'PG 400 Betonschleifer 400 V',
    short: 'Betonschleifer 400 mm · 400 V',
    desc: '110-Kilo-Einscheibenschleifer mit 400 mm Teller. Die Standardmaschine für Flächen zwischen 50 und 2.000 m². Werkzeugaufnahme Redi Lock® und EZchange.',
    priceNet: 5494.67,
    priceGross: 6538.66,
    qty: 'Einzelgerät',
    img: CDN + '970704501-525x577.jpg',
    images: [
      CDN + '970704501-525x577.jpg',
      CDN + '970704501_2-525x852.jpg',
      CDN + '970704501_3-525x851.jpg',
      CDN + '970704501_4-525x319.jpg',
      CDN + '970704501_5-525x302.jpg',
    ],
    category: 'maschine',
    url: 'pg400.html',
    compat: null,
  },

  // ── SCHLEIFSEGMENTE (Verschleißteile, Wiederkauf) ─────────────────
  'ez-h': {
    sku: 'EZ-H', mfgNo: 'EZ H', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ H Diamant-Schleifsegment',
    short: 'ELITE-GRIND EZ H',
    desc: 'Standard-Segment für harten Beton und Altbeton. Steht für Schleif- und Polierdurchgänge auf normaler PG-Drehzahl.',
    priceNet: 76.36, priceGross: 90.87, qty: '3er-Set',
    img: CDN + 'EZ_H-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['hart'], goal: ['schleifen', 'polieren'],
  },
  'ez-s': {
    sku: 'EZ-S', mfgNo: 'EZ S', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ S Diamant-Schleifsegment',
    short: 'ELITE-GRIND EZ S',
    desc: 'Weiche Bindung. Hält länger auf abrasivem Estrich und jungem Beton, wo harte Bindungen sich glattlaufen würden.',
    priceNet: 117.00, priceGross: 139.23, qty: '3er-Set',
    img: CDN + 'EZ_S-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['weich'], goal: ['abtrag', 'schleifen', 'renovierung'],
  },
  'ez-x': {
    sku: 'EZ-X', mfgNo: 'EZ X', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ X Diamant-Schleifsegment',
    short: 'ELITE-GRIND EZ X',
    desc: 'Für Granit, sehr harten Altbeton und Beton mit hohem Quarzanteil. Längere Diamant-Stützfunktion in der Bindung.',
    priceNet: 76.36, priceGross: 90.87, qty: '3er-Set',
    img: CDN + 'EZ_X-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['hart'], goal: ['abtrag', 'schleifen', 'renovierung'],
  },
  'ez-sharxx': {
    sku: 'EZ-SHARXX', mfgNo: 'EZ SHARXX', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ SHARXX Diamant-Schleifsegment',
    short: 'ELITE-GRIND EZ SHARXX',
    desc: 'Aggressive Diamantanordnung für maximalen Abtrag. Frisst sich auch in Granit und hochfesten Beton, wo Standard-Segmente steckenbleiben.',
    priceNet: 76.36, priceGross: 90.87, qty: '3er-Set',
    img: CDN + 'EZ_SHARXX-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['hart'], goal: ['abtrag', 'renovierung'],
  },
  'ez-m': {
    sku: 'EZ-M', mfgNo: 'EZ M', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ M Diamant-Schleifsegment',
    short: 'ELITE-GRIND EZ M',
    desc: 'Mittlere Bindung für normalen Hallenbeton. Wird im Lager am häufigsten nachgekauft, weil es zu den meisten Projekten passt.',
    priceNet: 76.36, priceGross: 90.87, qty: '3er-Set',
    img: CDN + 'EZ_M-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['mittel', 'weich'], goal: ['abtrag', 'schleifen', 'polieren', 'renovierung'],
  },
  't-rex-dome': {
    sku: 'EZ-TREX-DOME', mfgNo: 'EZ T-REX', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ T-REX DOME PCD-Schleifsegment',
    short: 'EZ T-REX DOME PCD',
    desc: 'PCD-Block mit Dome-Profil. Zieht Epoxidschichten und Kleberreste in einem Durchgang ab. Funktioniert auch auf Beton, wo Diamant-Bindungen verkleben.',
    priceNet: 174.53, priceGross: 207.69, qty: '3er-Set',
    img: CDN + 'EZT_REX-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['beschichtet', 'weich', 'mittel'],
    goal: ['abtrag', 'schleifen', 'polieren', 'renovierung'],
  },
  't-rex-super': {
    sku: 'EZ-TREX-SUPER', mfgNo: 'EZ T-REX SUPER', brand: 'Husqvarna',
    name: 'ELITE-GRIND EZ T-REX SUPER PCD-Schleifsegment',
    short: 'EZ T-REX SUPER PCD',
    desc: 'Fünf PCD-Blöcke pro Segment. Höchste Abtragsleistung im Sortiment. Reserviert für Großflächen mit dicken Beschichtungen oder Epoxidböden.',
    priceNet: 243.60, priceGross: 289.88, qty: '3er-Set',
    img: CDN + 'EZT_REXSUPER-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['beschichtet', 'hart'],
    goal: ['abtrag', 'renovierung'],
  },
  'vari-grind-sl': {
    sku: 'EZ-SL', mfgNo: 'EZ SL', brand: 'Husqvarna',
    name: 'VARI-GRIND EZ SL Schleifsegment',
    short: 'VARI-GRIND EZ SL',
    desc: 'Spezialsegment für Holzschleifen und feine Politurarbeiten. Auch für Naturstein-Renovierung in Polier-Schritten geeignet.',
    priceNet: 162.40, priceGross: 193.26, qty: '3er-Set',
    img: CDN + 'EZ_SL-192x192.jpg',
    category: 'segment', compat: 'PG 400 / PG 280 / PG 540',
    usage: ['weich', 'hart', 'mittel'], goal: ['polieren', 'schleifen'],
  },

  // ── ZUBEHÖR: ADAPTERPLATTEN / WERKZEUGHALTER ─────────────────────
  'adapter-multi-400-9': {
    sku: 'ADP-400-9', brand: 'Husqvarna',
    name: 'Adapterplatte Multi 400 9',
    short: 'Adapterplatte Multi 400 / 9 Pos.',
    desc: 'Trägerplatte für PG 400 mit neun Aufnahmepositionen. Erlaubt den schnellen Wechsel zwischen Segment-Sets ohne Umrüstzeit am Teller.',
    priceNet: 365.00, priceGross: 434.35, qty: 'Stück',
    img: CDN + 'adapter-multi-400.jpg',
    category: 'zubehoer', compat: 'PG 400',
  },
  'adapter-multi-280-6': {
    sku: 'ADP-280-6', brand: 'Husqvarna',
    name: 'Adapterplatte Multi 280 6',
    short: 'Adapterplatte Multi 280 / 6 Pos.',
    desc: 'Trägerplatte für die kleinere PG 280 mit sechs Aufnahmepositionen. Passend zu Multi-Set-Konfigurationen für gemischte Untergründe.',
    priceNet: 329.54, priceGross: 392.15, qty: 'Stück',
    img: CDN + 'adapter-multi-280.jpg',
    category: 'zubehoer', compat: 'PG 280',
  },
  'halter-multi-400-9': {
    sku: 'WZH-400-9', brand: 'Husqvarna',
    name: 'Werkzeughalter Multi 400 9',
    short: 'Werkzeughalter Multi 400 / 9 Pos.',
    desc: 'Werkzeughalter für PG 400, neun Aufnahmen. Zusätzliche Variabilität für Projekte mit häufig wechselnden Segmenten.',
    priceNet: 485.00, priceGross: 577.15, qty: 'Stück',
    img: CDN + 'wzh-multi-400.jpg',
    category: 'zubehoer', compat: 'PG 400',
  },
  'halter-multi-230-6': {
    sku: 'WZH-230-6H', brand: 'Husqvarna',
    name: 'Werkzeughalter Multi 230 6 H',
    short: 'Werkzeughalter Multi 230 / 6 Pos. H',
    desc: 'Werkzeughalter für PG 540 in harter Ausführung, sechs Aufnahmen. Ausgelegt für Dauerbetrieb auf hartem Beton.',
    priceNet: 207.31, priceGross: 246.70, qty: 'Stück',
    img: CDN + 'wzh-multi-230.jpg',
    category: 'zubehoer', compat: 'PG 540',
  },
};

/* Empfehlungs-Matrix für Finder. Werte = SKUs aus PRODUCTS. */
const RECOMMENDATIONS = {
  hart: {
    abtrag:      ['ez-x', 'ez-sharxx', 't-rex-super'],
    schleifen:   ['ez-h', 'ez-x', 'vari-grind-sl'],
    polieren:    ['ez-h', 'vari-grind-sl', 'ez-m'],
    renovierung: ['ez-sharxx', 'ez-x', 't-rex-dome'],
  },
  weich: {
    abtrag:      ['ez-s', 't-rex-dome', 'vari-grind-sl'],
    schleifen:   ['ez-s', 'ez-m', 'ez-h'],
    polieren:    ['ez-m', 'vari-grind-sl', 'ez-s'],
    renovierung: ['ez-s', 't-rex-dome', 'ez-m'],
  },
  mittel: {
    abtrag:      ['ez-m', 't-rex-dome', 'ez-h'],
    schleifen:   ['ez-m', 'ez-h', 'vari-grind-sl'],
    polieren:    ['ez-m', 'vari-grind-sl', 'ez-h'],
    renovierung: ['ez-m', 't-rex-dome', 'ez-h'],
  },
  beschichtet: {
    abtrag:      ['t-rex-dome', 't-rex-super', 'ez-s'],
    schleifen:   ['t-rex-dome', 'ez-m', 'ez-s'],
    polieren:    ['t-rex-dome', 'vari-grind-sl', 'ez-m'],
    renovierung: ['t-rex-super', 't-rex-dome', 'ez-s'],
  },
};

/* Sortimentslisten — verwendet von Kategorie- und Übersichtsseiten */
const ALL_SKUS = Object.keys(PRODUCTS);
const MACHINES_SKUS  = ALL_SKUS.filter(k => PRODUCTS[k].category === 'maschine');
const SEGMENT_SKUS   = ALL_SKUS.filter(k => PRODUCTS[k].category === 'segment');
const ACCESSORY_SKUS = ALL_SKUS.filter(k => PRODUCTS[k].category === 'zubehoer');
