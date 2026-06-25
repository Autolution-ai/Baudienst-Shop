/* ── Baudienst Shop: zentrale Produktdaten — Diamantwerkzeug-Sortiment ──
   Sortiment angelehnt an diamantwerkzeuge.shop von Baudienst.
   Specs aus öffentlichen Datenblättern Husqvarna, ADT, Tyrolit, Bosch, Heller, Eibenstock.
   BDE-Produkte aus dem aktuellen WooCommerce-Demo übernommen. */

const FALLBACK_IMG = 'assets/products/_fallback.svg';

const PRODUCTS = {
  /* ── DIAMANTBOHRKRONEN (6) ────────────────────────────────────────── */
  'bk-nass-52': {
    sku: 'BK-N-052', brand: 'Husqvarna', name: 'Diamant-Kernbohrkrone D 1245 52 mm Nass',
    short: 'Bohrkrone Nass Ø52', desc: 'Standardbohrkrone für Beton und Stahlbeton mit 52 mm Durchmesser. Gelaserte Segmente, Aufnahme 1¼-7 UNC. Empfohlen für Rohrdurchführungen, Sanitärinstallation.',
    priceNet: 89.50, priceGross: 106.50, qty: 'Stück',
    img: 'assets/products/bohrkrone-52.svg',
    category: 'bohrkrone',
    diameter: 52, bond: 'gelasert', mount: '1.25-7-UNC',
    material: ['beton_normal', 'beton_alt', 'stahlbeton'],
    application: 'nass'
  },
  'bk-nass-82': {
    sku: 'BK-N-082', brand: 'Husqvarna', name: 'Diamant-Kernbohrkrone D 1245 82 mm Nass',
    short: 'Bohrkrone Nass Ø82', desc: 'Die meistgekaufte Bohrkrone für Unterputzdosen-Durchbrüche und Lüftungsanschlüsse. 82 mm passt zur tiefen UP-Dose. Gelaserte Segmente.',
    priceNet: 124.00, priceGross: 147.56, qty: 'Stück',
    img: 'assets/products/bohrkrone-82.svg',
    category: 'bohrkrone',
    diameter: 82, bond: 'gelasert', mount: '1.25-7-UNC',
    material: ['beton_normal', 'beton_alt', 'stahlbeton'],
    application: 'nass'
  },
  'bk-nass-112': {
    sku: 'BK-N-112', brand: 'Husqvarna', name: 'Diamant-Kernbohrkrone D 1245 112 mm Nass',
    short: 'Bohrkrone Nass Ø112', desc: 'Standardgröße für Lüftungsdurchbrüche DN 100. Gelaserte Segmente, Schnittlänge 450 mm. Aufnahme 1¼-7 UNC.',
    priceNet: 178.50, priceGross: 212.42, qty: 'Stück',
    img: 'assets/products/bohrkrone-112.svg',
    category: 'bohrkrone',
    diameter: 112, bond: 'gelasert', mount: '1.25-7-UNC',
    material: ['beton_normal', 'beton_alt', 'stahlbeton'],
    application: 'nass'
  },
  'bk-nass-152': {
    sku: 'BK-N-152', brand: 'Husqvarna', name: 'Diamant-Kernbohrkrone D 1245 152 mm Nass',
    short: 'Bohrkrone Nass Ø152', desc: 'Großdurchmesser für Lüftungssysteme DN 150 und Kabelkanal-Bündel. Braucht Kernbohrgerät mit Stativ, nicht für Handbetrieb.',
    priceNet: 234.00, priceGross: 278.46, qty: 'Stück',
    img: 'assets/products/bohrkrone-152.svg',
    category: 'bohrkrone',
    diameter: 152, bond: 'gelasert', mount: '1.25-7-UNC',
    material: ['beton_normal', 'beton_alt', 'stahlbeton'],
    application: 'nass'
  },
  'bk-trocken-82': {
    sku: 'BK-T-082', brand: 'ADT', name: 'Diamant-Bohrkrone Trocken 82 mm Mauerwerk',
    short: 'Bohrkrone Trocken Ø82', desc: 'Trockenbohrkrone für Mauerwerk, Kalksandstein und Porenbeton. Aufnahme M16. Nicht für Stahlbeton geeignet.',
    priceNet: 67.50, priceGross: 80.33, qty: 'Stück',
    img: 'assets/products/bohrkrone-trocken-82.svg',
    category: 'bohrkrone',
    diameter: 82, bond: 'geloetet', mount: 'M16',
    material: ['mauerwerk', 'beton_jung'],
    application: 'trocken'
  },
  'bk-armierung-122': {
    sku: 'BK-A-122', brand: 'Husqvarna', name: 'Armierungs-Bohrkrone 122 mm',
    short: 'Armierungsbohrkrone Ø122', desc: 'Spezialbohrkrone für Stahlbeton mit dichter Armierung. Gelaserte Segmente in Armierungs-Mischung. Durchschneidet Eisen ohne Segmentriss.',
    priceNet: 289.00, priceGross: 343.91, qty: 'Stück',
    img: 'assets/products/bohrkrone-armierung-122.svg',
    category: 'bohrkrone',
    diameter: 122, bond: 'gelasert', mount: '1.25-7-UNC',
    material: ['stahlbeton'],
    application: 'nass'
  },

  /* ── DIAMANTTRENNSCHEIBEN (4) ─────────────────────────────────────── */
  'ts-beton-230': {
    sku: 'TS-B-230', brand: 'Husqvarna', name: 'Diamant-Trennscheibe Beton 230 mm M14',
    short: 'Trennscheibe Beton Ø230', desc: 'Standard-Trennscheibe für Beton und Naturstein am Winkelschleifer. Segmenthöhe 10 mm bei Auslieferung. Aufnahme M14.',
    priceNet: 54.50, priceGross: 64.86, qty: 'Stück',
    img: 'assets/products/trennscheibe-230.svg',
    category: 'trennscheibe',
    diameter: 230, bond: 'gelasert', mount: 'M14',
    material: ['beton_normal', 'beton_alt', 'granit'],
    application: 'beides'
  },
  'ts-beton-300': {
    sku: 'TS-B-300', brand: 'Husqvarna', name: 'Diamant-Trennscheibe Beton 300 mm',
    short: 'Trennscheibe Beton Ø300', desc: 'Für Trennschleifer und Fugenschneider. Höhere Schnitttiefe als 230er-Scheibe. Aufnahme 22,23 mm Bohrung.',
    priceNet: 89.00, priceGross: 105.91, qty: 'Stück',
    img: 'assets/products/trennscheibe-300.svg',
    category: 'trennscheibe',
    diameter: 300, bond: 'gelasert', mount: '22.23-Bohrung',
    material: ['beton_normal', 'beton_alt', 'granit'],
    application: 'beides'
  },
  'ts-asphalt-400': {
    sku: 'TS-A-400', brand: 'Tyrolit', name: 'Diamant-Trennscheibe Asphalt 400 mm',
    short: 'Trennscheibe Asphalt Ø400', desc: 'Spezialbindung für Asphalt und abrasive Materialien. Falsche Wahl auf Beton macht die Scheibe in Minuten kaputt.',
    priceNet: 145.00, priceGross: 172.55, qty: 'Stück',
    img: 'assets/products/trennscheibe-asphalt-400.svg',
    category: 'trennscheibe',
    diameter: 400, bond: 'gelasert', mount: '25.4-Bohrung',
    material: ['estrich_zement', 'beton_jung'],
    application: 'nass'
  },
  'ts-fliese-125': {
    sku: 'TS-F-125', brand: 'Heller', name: 'Diamant-Trennscheibe Fliese 125 mm',
    short: 'Trennscheibe Fliese Ø125', desc: 'Geschlossener Rand für rissfreien Schnitt in Feinsteinzeug und Naturstein. Aufnahme M14, mit Wasser kühlen.',
    priceNet: 42.00, priceGross: 49.98, qty: 'Stück',
    img: 'assets/products/trennscheibe-fliese-125.svg',
    category: 'trennscheibe',
    diameter: 125, bond: 'galvanisch', mount: 'M14',
    material: ['fliese'],
    application: 'nass'
  },

  /* ── DIAMANTSCHLEIFTÖPFE (3) ──────────────────────────────────────── */
  'st-doppelreihe-125': {
    sku: 'ST-D-125', brand: 'Bosch', name: 'Diamant-Schleiftopf Doppelreihe 125 mm',
    short: 'Schleiftopf Doppelreihe Ø125', desc: 'Doppelreihige Anordnung für aggressiveren Abtrag. Pyramidenprofil. Für Putzreste, Beton-Erhebungen, Estrich-Vorbereitung.',
    priceNet: 68.50, priceGross: 81.52, qty: 'Stück',
    img: 'assets/products/schleiftopf-doppel-125.svg',
    category: 'schleiftopf',
    diameter: 125, bond: 'geloetet', mount: 'M14',
    material: ['beton_normal', 'beton_alt', 'estrich_zement'],
    application: 'trocken'
  },
  'st-doppelreihe-180': {
    sku: 'ST-D-180', brand: 'Bosch', name: 'Diamant-Schleiftopf Doppelreihe 180 mm',
    short: 'Schleiftopf Doppelreihe Ø180', desc: 'Größere Fläche pro Durchgang, braucht großen Winkelschleifer mit M14-Adapter. Doppelreihiges Boomerang-Profil.',
    priceNet: 98.00, priceGross: 116.62, qty: 'Stück',
    img: 'assets/products/schleiftopf-doppel-180.svg',
    category: 'schleiftopf',
    diameter: 180, bond: 'geloetet', mount: 'M14',
    material: ['beton_normal', 'beton_alt', 'estrich_zement'],
    application: 'trocken'
  },
  'st-pcd-125': {
    sku: 'ST-PCD-125', brand: 'Husqvarna', name: 'PCD-Schleiftopf 125 mm Epoxid',
    short: 'PCD-Schleiftopf Ø125', desc: 'PCD-Blöcke statt Diamantsegmente. Einzige sinnvolle Wahl für Epoxidbeschichtungen, Kleberreste und Lacke. Verklebt nicht.',
    priceNet: 145.00, priceGross: 172.55, qty: 'Stück',
    img: 'assets/products/schleiftopf-pcd-125.svg',
    category: 'schleiftopf',
    diameter: 125, bond: 'pcd', mount: 'M14',
    material: ['epoxid'],
    application: 'trocken'
  },

  /* ── DOSENSENKER (2) ──────────────────────────────────────────────── */
  'ds-68': {
    sku: 'DS-068', brand: 'Heller', name: 'Diamant-Dosensenker 68 mm Standard-UP',
    short: 'Dosensenker Ø68', desc: 'Standardgröße für Unterputzdosen nach DIN 49073. SDS-Plus-Aufnahme. Trocken im Mauerwerk, mit Wasser im Beton.',
    priceNet: 89.50, priceGross: 106.50, qty: 'Stück',
    img: 'assets/products/dosensenker-68.svg',
    category: 'dosensenker',
    diameter: 68, bond: 'geloetet', mount: 'SDS-Plus',
    material: ['mauerwerk', 'beton_normal'],
    application: 'beides'
  },
  'ds-82': {
    sku: 'DS-082', brand: 'Heller', name: 'Diamant-Dosensenker 82 mm Tiefe UP-Dose',
    short: 'Dosensenker Ø82', desc: 'Größere Variante für tiefe Installationsdosen und Hohlwanddosen. SDS-Plus, Zentrierbohrer integriert.',
    priceNet: 112.00, priceGross: 133.28, qty: 'Stück',
    img: 'assets/products/dosensenker-82.svg',
    category: 'dosensenker',
    diameter: 82, bond: 'geloetet', mount: 'SDS-Plus',
    material: ['mauerwerk', 'beton_normal'],
    application: 'beides'
  },

  /* ── FLIESENBOHRER (2) ────────────────────────────────────────────── */
  'fb-galvanisch-set': {
    sku: 'FB-GAL-SET', brand: 'Heller', name: 'Fliesenbohrer-Set galvanisch 5 bis 14 mm',
    short: 'Fliesenbohrer-Set 5-14 mm', desc: 'Sechs Durchmesser: 5, 6, 8, 10, 12, 14 mm. Galvanische Beschichtung, langsam ansetzen, mit Wasser kühlen für lange Standzeit.',
    priceNet: 68.50, priceGross: 81.52, qty: '6er-Set',
    img: 'assets/products/fliesenbohrer-set.svg',
    category: 'fliesenbohrer',
    diameter: 14, bond: 'galvanisch', mount: 'Rundschaft',
    material: ['fliese'],
    application: 'beides'
  },
  'fb-vakuum-30': {
    sku: 'FB-VAC-030', brand: 'Bosch', name: 'Vakuum-Fliesenbohrer 30 mm',
    short: 'Vakuum-Fliesenbohrer Ø30', desc: 'Größerer Durchmesser für Armaturen und Wasseranschlüsse. Vakuum-Diamantbeschichtung hält länger als galvanisch.',
    priceNet: 54.00, priceGross: 64.26, qty: 'Stück',
    img: 'assets/products/fliesenbohrer-30.svg',
    category: 'fliesenbohrer',
    diameter: 30, bond: 'gelasert', mount: 'Rundschaft',
    material: ['fliese'],
    application: 'nass'
  },

  /* ── MASCHINEN (2) ────────────────────────────────────────────────── */
  'maschine-kernbohr': {
    sku: 'M-KB-230', brand: 'Husqvarna', name: 'Husqvarna DM 230 Kernbohrgerät',
    short: 'Kernbohrgerät DM 230', desc: 'Handgeführtes Kernbohrgerät bis 150 mm Durchmesser im Beton. Aufnahme 1¼-7 UNC. Wasseranschluss integriert. Mit oder ohne Stativ einsetzbar.',
    priceNet: 1890.00, priceGross: 2249.10, qty: 'Einzelgerät',
    img: 'assets/products/maschine-kernbohr.svg',
    category: 'maschine',
    diameter: null, bond: null, mount: '1.25-7-UNC',
    material: [],
    application: 'nass'
  },
  'maschine-winkelschleifer': {
    sku: 'M-WS-125', brand: 'Bosch', name: 'Bosch GWS 17-125 Inox Winkelschleifer',
    short: 'Winkelschleifer 125 mm', desc: 'Standard-Winkelschleifer für Trennscheiben bis 125 mm und Schleiftöpfe bis 125 mm. M14-Spindel. Sanftanlauf, Wiederanlaufschutz.',
    priceNet: 198.00, priceGross: 235.62, qty: 'Einzelgerät',
    img: 'assets/products/maschine-winkelschleifer.svg',
    category: 'maschine',
    diameter: null, bond: null, mount: 'M14',
    material: [],
    application: 'trocken'
  },

  /* ── ZUBEHÖR (3) ──────────────────────────────────────────────────── */
  'adapter-1-25-m18': {
    sku: 'ADP-125-18', brand: 'Husqvarna', name: 'Adapter 1¼-7 UNC auf M18',
    short: 'Adapter 1¼ auf M18', desc: 'Verbindungsadapter zwischen Kernbohrgerät mit 1¼-7 UNC und Bohrkronen mit M18-Aufnahme. Verlängert Werkzeug-Kompatibilität.',
    priceNet: 38.50, priceGross: 45.82, qty: 'Stück',
    img: 'assets/products/adapter-125-m18.svg',
    category: 'zubehoer',
    diameter: null, bond: null, mount: '1.25-7-UNC',
    material: [],
    application: 'beides'
  },
  'zentrierbohrer-50': {
    sku: 'ZB-050', brand: 'Husqvarna', name: 'Zentrierbohrer 50 mm Schaft 12 mm',
    short: 'Zentrierbohrer Ø50', desc: 'Hartmetall-Zentrierbohrer für Trockenbohrungen mit Bohrkronen bis 100 mm. Verhindert Verlaufen am Anfangspunkt.',
    priceNet: 24.50, priceGross: 29.16, qty: 'Stück',
    img: 'assets/products/zentrierbohrer-50.svg',
    category: 'zubehoer',
    diameter: 50, bond: null, mount: 'Rundschaft 12mm',
    material: ['mauerwerk', 'beton_normal'],
    application: 'trocken'
  },
  'kuehladapter': {
    sku: 'KUEHL-ADP', brand: 'Husqvarna', name: 'Wasserkühl-Anschlussadapter GARDENA',
    short: 'Kühlwasser-Adapter', desc: 'Schnellverschluss-Adapter für Wasseranschluss am Kernbohrgerät. GARDENA-Stecksystem auf Geräte-Anschluss. Druckfest bis 4 bar.',
    priceNet: 18.50, priceGross: 22.02, qty: 'Stück',
    img: 'assets/products/kuehladapter.svg',
    category: 'zubehoer',
    diameter: null, bond: null, mount: 'GARDENA',
    material: [],
    application: 'nass'
  },

  /* ── BDE EIGENMARKE (6) ───────────────────────────────────────────── */
  'bde-schleifstift-6': {
    sku: 'BDE-SS-06', brand: 'BDE', name: 'BDE Diamantschleifstift Ø6 mm',
    short: 'BDE Schleifstift Ø6', desc: 'Diamant-Schleifstift für Kantenbearbeitung und Nacharbeit an Bohrungen. Hausmarke BDE. Varianten: Beton und Abrasiv. Schaft 6 mm.',
    priceNet: 35.68, priceGross: 42.46, qty: '3er-Set',
    img: 'assets/products/bde-schleifstift-6.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 6, bond: 'galvanisch', mount: 'Rundschaft 6mm',
    material: ['beton_normal', 'estrich_zement'],
    application: 'trocken'
  },
  'bde-schleifstift-10': {
    sku: 'BDE-SS-10', brand: 'BDE', name: 'BDE Diamantschleifstift Ø10 mm',
    short: 'BDE Schleifstift Ø10', desc: 'Größere Variante für Konturen und gröberen Abtrag. Hausmarke BDE. Beton- oder Abrasiv-Variante wählbar. Schaft 10 mm.',
    priceNet: 40.91, priceGross: 48.68, qty: '3er-Set',
    img: 'assets/products/bde-schleifstift-10.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 10, bond: 'galvanisch', mount: 'Rundschaft 10mm',
    material: ['beton_normal', 'estrich_zement'],
    application: 'trocken'
  },
  'bde-klett-select-225': {
    sku: 'BDE-KS-225', brand: 'BDE', name: 'BDE Klett-Schleifpapier 225 mm SELECT',
    short: 'BDE Schleifpapier SELECT 225', desc: 'Klett-Schleifpapier für Estrich-Schleifgeräte wie Giraffe. Körnungen K16 bis K320. Hausmarke BDE, abgestimmt auf abrasive Untergründe.',
    priceNet: 28.13, priceGross: 33.47, qty: '25er-Pack',
    img: 'assets/products/bde-klett-select.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 225, bond: null, mount: 'Klett',
    material: ['estrich_zement', 'estrich_anhydrit'],
    application: 'trocken'
  },
  'bde-klett-fleece-225': {
    sku: 'BDE-KF-225', brand: 'BDE', name: 'BDE Klett-Schleifpapier 225 mm FLEECE',
    short: 'BDE Schleifpapier FLEECE 225', desc: 'Vlies-Schleifpapier für feinere Durchgänge und Politurarbeiten. Körnungen K40 bis K220. Hält länger als Standard-Papier auf weichen Untergründen.',
    priceNet: 51.25, priceGross: 60.99, qty: '25er-Pack',
    img: 'assets/products/bde-klett-fleece.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 225, bond: null, mount: 'Klett',
    material: ['estrich_anhydrit', 'estrich_zement'],
    application: 'trocken'
  },
  'bde-klett-gitter-225': {
    sku: 'BDE-KG-225', brand: 'BDE', name: 'BDE Klett-Schleifgitter 225 mm',
    short: 'BDE Schleifgitter 225', desc: 'Gitter statt Vollfläche, Staub fällt durch und verklebt das Schleifmittel nicht. Für Spachtelmasse und harte Anstrich-Schichten.',
    priceNet: 40.63, priceGross: 48.35, qty: '25er-Pack',
    img: 'assets/products/bde-klett-gitter.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 225, bond: null, mount: 'Klett',
    material: ['estrich_zement'],
    application: 'trocken'
  },
  'bde-schleifteller-225': {
    sku: 'BDE-ST-225', brand: 'BDE', name: 'BDE Klett-Schleifteller 225 mm Universal',
    short: 'BDE Schleifteller 225', desc: 'Trägerteller mit Klettbeschichtung für die BDE-Schleifpapier-Linie. Passt auf Estrich-Schleifgeräte mit 225 mm Aufnahme.',
    priceNet: 38.66, priceGross: 46.00, qty: 'Stück',
    img: 'assets/products/bde-schleifteller.svg',
    category: 'zubehoer', isBDE: true,
    diameter: 225, bond: null, mount: 'Klett',
    material: [],
    application: 'trocken'
  }
};

/* Sortimentslisten */
const ALL_SKUS = Object.keys(PRODUCTS);
const CATEGORIES = ['bohrkrone', 'trennscheibe', 'schleiftopf', 'dosensenker', 'fliesenbohrer', 'maschine', 'zubehoer'];
const SKUS_BY_CATEGORY = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = ALL_SKUS.filter(k => PRODUCTS[k].category === cat);
  return acc;
}, {});
const BDE_SKUS = ALL_SKUS.filter(k => PRODUCTS[k].isBDE);

/* Cross-Sell-Matrix wird aus assets/data/crosssell.json geladen.
   Loader-Helfer für shop.js. */
let CROSS_SELL = {};
async function loadCrossSells() {
  try {
    const res = await fetch('assets/data/crosssell.json');
    if (res.ok) CROSS_SELL = await res.json();
  } catch (e) { /* still leise, Cross-Sells sind optional */ }
}
function getCrossSells(sku) {
  return (CROSS_SELL[sku] || []).filter(s => PRODUCTS[s]);
}
