/* ── Baudienst Shop: geteilte Logik ──
   Cart-State (localStorage), Toast, Finder-Wizard, Netto/Brutto-Toggle,
   Card-Renderer. Wird auf allen Seiten eingebunden, NACH products.js. */

/* ============================================================
   CART (persistent via localStorage)
   ============================================================ */
const CART_KEY = 'baudienst_cart_v1';
const PRICE_MODE_KEY = 'baudienst_price_mode';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
}
function addToCart(sku, qty) {
  qty = qty || 1;
  if (!PRODUCTS[sku]) {
    console.warn('Unbekannte SKU:', sku);
    return;
  }
  const cart = getCart();
  cart[sku] = (cart[sku] || 0) + qty;
  saveCart(cart);
  openCartDrawer();
}
function addManyToCart(skus) {
  const cart = getCart();
  skus.forEach(sku => { cart[sku] = (cart[sku] || 0) + 1; });
  saveCart(cart);
  openCartDrawer();
}
function setCartQty(sku, qty) {
  const cart = getCart();
  if (qty <= 0) delete cart[sku];
  else cart[sku] = qty;
  saveCart(cart);
}
function removeFromCart(sku) {
  const cart = getCart();
  delete cart[sku];
  saveCart(cart);
}
function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCartBadge();
}
function getCartItemCount() {
  return Object.values(getCart()).reduce((s, q) => s + q, 0);
}
function getCartSubtotalNet() {
  const cart = getCart();
  return Object.entries(cart).reduce((sum, [sku, qty]) => {
    const p = PRODUCTS[sku];
    return p ? sum + p.priceNet * qty : sum;
  }, 0);
}
function getCartSubtotalGross() {
  const cart = getCart();
  return Object.entries(cart).reduce((sum, [sku, qty]) => {
    const p = PRODUCTS[sku];
    return p ? sum + p.priceGross * qty : sum;
  }, 0);
}
function renderCartBadge() {
  const els = document.querySelectorAll('#cartCount, .cart-badge');
  const count = getCartItemCount();
  els.forEach(el => { el.textContent = count; });
}

/* ============================================================
   FORMAT HELPERS
   ============================================================ */
function formatEUR(n) {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

/* ============================================================
   PRICE MODE (Netto/Brutto Toggle)
   ============================================================ */
function getPriceMode() {
  return localStorage.getItem(PRICE_MODE_KEY) || 'gross';
}
function setPriceMode(mode) {
  localStorage.setItem(PRICE_MODE_KEY, mode);
  applyPriceMode();
}
function applyPriceMode() {
  const mode = getPriceMode();
  document.body.classList.toggle('price-mode-net', mode === 'net');
  document.body.classList.toggle('price-mode-gross', mode === 'gross');
  document.querySelectorAll('.price-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  // Re-render dynamic prices on cards / cart
  document.querySelectorAll('[data-price-sku]').forEach(el => {
    renderPriceForCard(el);
  });
  if (typeof renderCart === 'function' && document.getElementById('cartItems')) renderCart();
}
function renderPriceForCard(el) {
  const sku = el.dataset.priceSku;
  const p = PRODUCTS[sku];
  if (!p) return;
  const mode = getPriceMode();
  if (mode === 'net') {
    el.innerHTML = `${formatEUR(p.priceNet)}<small>${formatEUR(p.priceGross)} brutto</small>`;
  } else {
    el.innerHTML = `${formatEUR(p.priceGross)}<small>${formatEUR(p.priceNet)} netto</small>`;
  }
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============================================================
   QTY HELPERS (PDP)
   ============================================================ */
function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  const val = Math.max(1, parseInt(input.value) + delta);
  input.value = val;
}

/* ============================================================
   GALLERY (PDP)
   ============================================================ */
function switchImg(el, src) {
  const main = document.getElementById('mainImg');
  if (main) main.src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/* ============================================================
   PRODUCT CARD RENDERER (verwendet von Kategorie/Cross-Sell)
   ============================================================ */
function renderProductCard(sku, opts) {
  opts = opts || {};
  const p = PRODUCTS[sku];
  if (!p) return '';
  const bdeBadge = p.isBDE ? '<span class="card-bde-badge">Hausmarke BDE</span>' : '';
  const url = p.url || (p.category === 'bohrkrone' ? 'bohrkrone-detail.html?sku=' + sku : 'bohrkrone-detail.html?sku=' + sku);
  const dataAttrs = [
    `data-sku="${sku}"`,
    `data-cat="${p.category}"`,
    `data-material="${(p.material || []).join(',')}"`,
    `data-bond="${p.bond || ''}"`,
    `data-mount="${p.mount || ''}"`,
    `data-application="${p.application || ''}"`,
    `data-bde="${p.isBDE ? '1' : '0'}"`
  ].join(' ');
  const fallbackJs = `this.style.display='none'; this.parentElement.classList.add('card-img-fallback');`;
  return `
    <div class="product-card" ${dataAttrs}>
      <a class="card-img" href="${url}" data-fallback-title="${(p.short || p.name).replace(/"/g, '&quot;')}" data-fallback-brand="${p.brand}">
        <img src="${p.img}" alt="${p.name}" onerror="${fallbackJs}">
        ${bdeBadge}
      </a>
      <div class="card-body">
        <p class="card-brand">${p.brand}</p>
        <h3 class="card-name"><a href="${url}" style="text-decoration:none;color:inherit;">${p.name}</a></h3>
        <p class="card-desc">${p.desc}</p>
        ${p.qty ? `<span class="card-qty-tag">${p.qty}</span>` : ''}
        <div class="card-footer">
          <div class="card-price" data-price-sku="${sku}"></div>
          <button class="btn-card-cart" onclick="event.stopPropagation(); addToCart('${sku}')" aria-label="In den Warenkorb">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}
function renderProductsGrid(skus, containerId, opts) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = skus.map(sku => renderProductCard(sku, opts)).join('');
  applyPriceMode(); // Preise nachträglich rendern
}

/* ============================================================
   FINDER (3-Step Wizard)
   ============================================================ */
let finderAnswers = { step1: null, step2: null, step3: null };
let currentFinderStep = 1;

function selectOption(step, value, el) {
  const parent = el.closest('.finder-options');
  parent.querySelectorAll('.finder-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  finderAnswers['step' + step] = value;

  setTimeout(() => {
    if (step < 3) {
      document.getElementById('step' + step).classList.remove('active');
      currentFinderStep = step + 1;
      document.getElementById('step' + currentFinderStep).classList.add('active');
    } else {
      showFinderResult();
    }
  }, 280);
}

function getFinderRecommendation() {
  const material = finderAnswers.step1;
  const tool = finderAnswers.step2;
  const mount = finderAnswers.step3;

  // Score each product: 3 = perfekt, 2 = passend, 1 = möglich, 0 = ungeeignet
  const scored = ALL_SKUS.map(sku => {
    const p = PRODUCTS[sku];
    let score = 0;
    let reasons = 0;

    // Werkzeugtyp match (hartes Kriterium)
    if (tool && p.category === tool) {
      score += 3; reasons++;
    } else if (tool && p.category !== tool) {
      return { sku, score: -1 };
    }

    // Material match
    if (material && p.material && p.material.includes(material)) {
      score += 2; reasons++;
    } else if (material && p.material && p.material.length > 0) {
      score -= 1;
    }

    // Aufnahme match
    if (mount && p.mount === mount) {
      score += 1; reasons++;
    }

    // Leicht zugunsten BDE bei gleichwertiger Eignung
    if (p.isBDE) score += 0.25;

    return { sku, score, reasons };
  });

  const top = scored
    .filter(s => s.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.sku);

  // Fallback wenn nichts wirklich passt: erste 3 Produkte der gewählten Kategorie
  if (top.length === 0 && tool) {
    return (SKUS_BY_CATEGORY[tool] || ALL_SKUS).slice(0, 3);
  }
  if (top.length === 0) {
    return ALL_SKUS.slice(0, 3);
  }
  return top;
}

function showFinderResult() {
  document.getElementById('step3').classList.remove('active');
  const result = document.getElementById('finderResult');
  result.classList.add('visible');
  const skus = getFinderRecommendation();
  window._finderResultSkus = skus;

  const html = skus.map(sku => {
    const p = PRODUCTS[sku];
    if (!p) return '';
    const price = getPriceMode() === 'net' ? p.priceNet : p.priceGross;
    const label = getPriceMode() === 'net' ? 'netto' : 'inkl. MwSt.';
    const bde = p.isBDE ? '<span class="result-product-bde">BDE</span>' : '';
    return `<div class="result-product" onclick="addToCart('${sku}')">
      ${bde}
      <div class="result-product-name">${p.short || p.name}</div>
      <div class="result-product-price">${formatEUR(price)}</div>
      <div class="result-product-qty">${label} · ${p.qty}</div>
    </div>`;
  }).join('');
  document.getElementById('resultProducts').innerHTML = html;

  // AI-Berater anstoßen, falls Block vorhanden
  if (document.getElementById('advisorOutput')) {
    resetAdvisor();
    runAdvisor(null);
  }
}

function addAllRecommendedToCart() {
  const skus = window._finderResultSkus || getFinderRecommendation();
  addManyToCart(skus);
}

function restartFinder() {
  finderAnswers = { step1: null, step2: null, step3: null };
  currentFinderStep = 1;
  for (let i = 1; i <= 3; i++) {
    const step = document.getElementById('step' + i);
    if (step) {
      step.classList.remove('active');
      step.querySelectorAll('.finder-option').forEach(o => o.classList.remove('selected'));
    }
  }
  document.getElementById('finderResult').classList.remove('visible');
  document.getElementById('step1').classList.add('active');
}

/* ============================================================
   FILTER (Kategorie- / Segmente-Seite)
   ============================================================ */
const filterState = { usage: null, goal: null };
function setFilter(type, value, btn) {
  if (filterState[type] === value) {
    filterState[type] = null;
  } else {
    filterState[type] = value;
  }
  // Update UI
  document.querySelectorAll(`.filter-pill[data-filter-type="${type}"]`).forEach(b => {
    b.classList.toggle('active', b.dataset.filterValue === filterState[type]);
  });
  applyFilter();
}
function resetFilter() {
  filterState.usage = null;
  filterState.goal = null;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  applyFilter();
}
function applyFilter() {
  let visible = 0;
  document.querySelectorAll('.product-card[data-cat="segment"]').forEach(card => {
    const usage = (card.dataset.usage || '').split(',');
    const goal = (card.dataset.goal || '').split(',');
    const matchUsage = !filterState.usage || usage.includes(filterState.usage);
    const matchGoal = !filterState.goal || goal.includes(filterState.goal);
    const show = matchUsage && matchGoal;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const countEl = document.getElementById('filterCount');
  if (countEl) countEl.textContent = visible + ' Produkte';
}

/* ============================================================
   SHOP-NAV (Tabs + Chips auf der Startseite)
   Filter-Achsen: material, application, bde
   ============================================================ */
const shopState = { tab: 'all', material: null, application: null, bde: null };
function setShopTab(cat) {
  shopState.tab = cat;
  document.querySelectorAll('.shop-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === cat);
  });
  applyShopFilter();
}
function setShopFilter(type, value) {
  if (shopState[type] === value) shopState[type] = null;
  else shopState[type] = value;
  document.querySelectorAll(`.shop-chip[data-chip-type="${type}"]`).forEach(b => {
    b.classList.toggle('active', b.dataset.chipValue === shopState[type]);
  });
  applyShopFilter();
}
function resetShopFilter() {
  shopState.material = null;
  shopState.application = null;
  shopState.bde = null;
  document.querySelectorAll('.shop-chip').forEach(b => b.classList.remove('active'));
  applyShopFilter();
}
function applyShopFilter() {
  let visible = 0;
  document.querySelectorAll('#shopGrid .product-card').forEach(card => {
    const cat = card.dataset.cat;
    const matchTab = shopState.tab === 'all' || cat === shopState.tab;
    const cardMaterial = (card.dataset.material || '').split(',');
    const matchMaterial = !shopState.material || cardMaterial.includes(shopState.material);
    const matchApp = !shopState.application || card.dataset.application === shopState.application || card.dataset.application === 'beides';
    const matchBde = !shopState.bde || card.dataset.bde === '1';
    const show = matchTab && matchMaterial && matchApp && matchBde;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const c = document.getElementById('shopVisibleCount');
  if (c) c.textContent = visible;
}

/* ============================================================
   MODAL (Anfrage-Formular)
   ============================================================ */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('show');
}

/* ============================================================
   CHROME (Topbar, Header, Footer, WhatsApp-FAB) — geteilt
   ============================================================ */
function renderTopbar() {
  return `<div class="topbar"><div class="topbar-inner">
    <div class="topbar-items">
      <span class="topbar-tag">B2B</span>
      <span>Gewerbekonditionen, Rechnungskauf und Skonto auf Anfrage</span>
    </div>
    <div class="topbar-items">
      <div class="price-toggle" role="tablist" aria-label="Preisanzeige">
        <button data-mode="gross" onclick="setPriceMode('gross')">Brutto</button>
        <button data-mode="net" onclick="setPriceMode('net')">Netto</button>
      </div>
      <span>Montag bis Freitag, 7 bis 17 Uhr</span>
      <a href="tel:+493320920049">📞 03320 / 2004-97</a>
    </div>
  </div></div>`;
}
function renderHeader(activeNav) {
  const items = [
    { key: 'sortiment', label: 'Sortiment',         href: 'index.html#produkte' },
    { key: 'bohrkrone', label: 'Bohrkronen',        href: 'index.html#produkte' },
    { key: 'trenn',     label: 'Trennscheiben',     href: 'index.html#produkte' },
    { key: 'bde',       label: 'Hausmarke BDE',     href: 'index.html#bde' },
    { key: 'berater',   label: 'Berater',           href: 'index.html#berater' },
    { key: 'werkstatt', label: 'Werkstatt',         href: 'index.html#werkstatt' },
  ];
  const nav = items.map(i =>
    `<a href="${i.href}" class="${i.key === activeNav ? 'active' : ''}">${i.label}</a>`
  ).join('');
  return `<header><div class="header-inner">
    <a href="index.html" class="logo logo-brand">
      <img src="assets/logo-compact.svg" alt="BAUDIENST Manfred Braunschweig GmbH" class="logo-img">
    </a>
    <nav class="main-nav">${nav}</nav>
    <div class="header-actions">
      <a href="tel:+493320920049" class="btn-phone">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        Beratung
      </a>
      <a href="warenkorb.html" class="btn-cart">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Warenkorb
        <span class="cart-badge" id="cartCount">0</span>
      </a>
    </div>
  </div></header>`;
}
function renderUspBar() {
  return `<div class="usp-bar"><div class="usp-inner">
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <div><p class="usp-title">Vertragspartner seit 1980</p><p class="usp-desc">Husqvarna-zertifizierter Fachhandel mit Originalteilen aus dem Hersteller-Katalog.</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
      <div><p class="usp-title">Lager Caputh</p><p class="usp-desc">Bestellung bis 14 Uhr verlässt heute das Haus, Tracking-Nummer kommt am gleichen Abend.</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg></div>
      <div><p class="usp-title">Rechnung statt Vorkasse</p><p class="usp-desc">Staffelpreise, Skonto und NET 14 ohne lange Onboarding-Prozedur.</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div>
      <div><p class="usp-title">Beratung am Telefon</p><p class="usp-desc">Mit jemandem, der die Maschine kennt. Werktags 7 bis 17 Uhr unter 03320 / 2004-97.</p></div>
    </div>
  </div></div>`;
}
function renderFooter() {
  return `<footer><div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="logo logo-brand">
        <img src="assets/logo.svg" alt="BAUDIENST Manfred Braunschweig GmbH" class="logo-img-full">
      </a>
      <p class="footer-desc">Husqvarna-Vertragspartner für Diamantschleiftechnik, Betontechnik und Baugeräte. Werkstatt und Lager in Caputh, Versand bundesweit, Holservice in Brandenburg und Berlin.</p>
    </div>
    <div class="footer-col">
      <h4>Sortiment</h4>
      <ul>
        <li><a href="index.html#produkte">Alle Diamantwerkzeuge</a></li>
        <li><a href="index.html#produkte">Bohrkronen</a></li>
        <li><a href="index.html#produkte">Trennscheiben</a></li>
        <li><a href="index.html#bde">Hausmarke BDE</a></li>
        <li><a href="warenkorb.html">Warenkorb</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Service</h4>
      <ul>
        <li><a href="index.html#werkstatt">Reparatur &amp; Wartung</a></li>
        <li><a href="index.html#berater">Werkzeug-Berater</a></li>
        <li><a href="#">Gewerbepreise</a></li>
        <li><a href="#">Versand &amp; Lieferung</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </div>
    <div class="footer-col footer-contact">
      <h4>Kontakt</h4>
      <p><strong>BAUDIENST Caputh</strong></p>
      <p>📍 Caputh, Brandenburg</p>
      <p>📞 <a href="tel:+493320920049">03320 / 2004-97</a></p>
      <p>✉️ <a href="mailto:info@baudienst.com">info@baudienst.com</a></p>
      <p>🕐 Mo–Fr 7:00–17:00 Uhr</p>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2024 BAUDIENST Manfred Braunschweig GmbH · Caputh</span>
    <span>Impressum &nbsp;·&nbsp; Datenschutz &nbsp;·&nbsp; AGB &nbsp;·&nbsp; Widerrufsbelehrung</span>
  </div></footer>`;
}
function renderWhatsAppFab() {
  // FAB ist jetzt der Chatbot, kein WhatsApp mehr
  return renderChatbot();
}
function renderChatbot() {
  return `<div class="chatbot-fab">
    <div class="chatbot-tease" id="chatbotTease">
      <button class="chatbot-tease-close" onclick="dismissChatbotTease(event)" aria-label="Schließen">×</button>
      <div class="chatbot-tease-author">Christian aus der Werkstatt</div>
      <div id="chatbotTeaseText">Hallo. Sehe Sie schauen sich Diamantwerkzeuge an. Soll ich Ihnen helfen das passende zu finden?</div>
    </div>
    <button class="chatbot-toggle" id="chatbotToggle" onclick="toggleChatbot()" aria-label="Chat öffnen">
      <span class="chatbot-pulse"></span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
    </button>
  </div>
  <aside class="chatbot-window" id="chatbotWindow" aria-hidden="true">
    <div class="chatbot-head">
      <div class="chatbot-head-avatar">CB</div>
      <div class="chatbot-head-text">
        <div class="chatbot-head-name">Christian, Werkstatt-Berater</div>
        <div class="chatbot-head-status">Antwort innerhalb Minuten</div>
      </div>
      <button class="chatbot-head-close" onclick="closeChatbot()" aria-label="Schließen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="chatbot-body" id="chatbotBody"></div>
    <div class="chatbot-foot">
      <input id="chatbotInput" type="text" placeholder="Frage stellen…" onkeydown="chatbotSendOnEnter(event)">
      <button onclick="chatbotSend()">Senden</button>
    </div>
  </aside>`;
}
function mountChrome(activeNav) {
  const tb = document.getElementById('topbar-mount');
  const hd = document.getElementById('header-mount');
  const us = document.getElementById('usp-mount');
  const ft = document.getElementById('footer-mount');
  const fab = document.getElementById('fab-mount');
  if (tb) tb.outerHTML = renderTopbar();
  if (hd) hd.outerHTML = renderHeader(activeNav);
  if (us) us.outerHTML = renderUspBar();
  if (ft) ft.outerHTML = renderFooter();
  if (fab) fab.outerHTML = renderWhatsAppFab();
}

/* ============================================================
   CART DRAWER (Smart Checkout, slide-in von rechts)
   ============================================================ */
function renderCartDrawerMarkup() {
  return `<div class="drawer-backdrop" id="drawerBackdrop" onclick="closeCartDrawer()"></div>
  <aside class="cart-drawer" id="cartDrawer" aria-hidden="true">
    <div class="cart-drawer-head">
      <h3>Ihr Warenkorb <small id="drawerCount">(0)</small></h3>
      <button class="drawer-close" onclick="closeCartDrawer()" aria-label="Schließen">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body" id="drawerBody"></div>
    <div class="cart-drawer-foot" id="drawerFoot"></div>
  </aside>`;
}
function openCartDrawer() {
  const d = document.getElementById('cartDrawer');
  const b = document.getElementById('drawerBackdrop');
  if (!d || !b) return;
  renderCartDrawer();
  d.classList.add('open');
  b.classList.add('open');
  d.setAttribute('aria-hidden', 'false');
}
function closeCartDrawer() {
  const d = document.getElementById('cartDrawer');
  const b = document.getElementById('drawerBackdrop');
  if (!d || !b) return;
  d.classList.remove('open');
  b.classList.remove('open');
  d.setAttribute('aria-hidden', 'true');
}
function renderCartDrawer() {
  const cart = getCart();
  const skus = Object.keys(cart);
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  const count = document.getElementById('drawerCount');
  if (!body || !foot) return;

  const totalCount = getCartItemCount();
  if (count) count.textContent = `(${totalCount})`;

  if (skus.length === 0) {
    body.innerHTML = `<div class="cart-drawer-empty">
      <h4>Noch leer</h4>
      <p>Schleifsegmente unten im Sortiment. Wenn Sie unsicher sind welches passt: drei Fragen im Berater geben Ihnen drei konkrete Vorschläge.</p>
    </div>`;
    foot.innerHTML = `<a href="index.html#produkte" class="drawer-cta">Zum Sortiment</a>
      <a href="index.html#berater" class="drawer-cta-secondary">Berater öffnen</a>`;
    return;
  }

  const mode = getPriceMode();
  body.innerHTML = skus.map(sku => {
    const p = PRODUCTS[sku];
    if (!p) return '';
    const qty = cart[sku];
    const unit = mode === 'net' ? p.priceNet : p.priceGross;
    return `<div class="cart-drawer-item">
      <div class="cart-drawer-item-img">
        <img src="${p.img}" alt="" onerror="this.src='${FALLBACK_IMG}';this.style.opacity='0.2'">
      </div>
      <div class="cart-drawer-item-info">
        <div class="cart-drawer-item-name">${p.short || p.name}</div>
        <div class="cart-drawer-item-meta">
          <div class="drawer-qty">
            <button onclick="cartChangeQtyDrawer('${sku}', -1)" aria-label="Weniger">−</button>
            <span>${qty}</span>
            <button onclick="cartChangeQtyDrawer('${sku}', 1)" aria-label="Mehr">+</button>
          </div>
          <span>${p.qty}</span>
        </div>
      </div>
      <div class="cart-drawer-item-side">
        <div class="cart-drawer-item-price">${formatEUR(unit * qty)}</div>
        <button class="cart-drawer-remove" onclick="cartRemoveDrawer('${sku}')">entfernen</button>
      </div>
    </div>`;
  }).join('');

  const subtotalNet = getCartSubtotalNet();
  const subtotalGross = getCartSubtotalGross();
  let discountPct = 0, staffelText = '';
  if (totalCount >= 10) {
    discountPct = 8;
    staffelText = `<div class="cart-drawer-staffel success">✓ 8 % Staffelrabatt aktiv</div>`;
  } else if (totalCount >= 5) {
    discountPct = 5;
    staffelText = `<div class="cart-drawer-staffel success">✓ 5 % Staffelrabatt aktiv. Ab 10 Stück werden es 8 %.</div>`;
  } else {
    const need = 5 - totalCount;
    staffelText = `<div class="cart-drawer-staffel">Noch ${need} Artikel und Sie bekommen 5 % Staffelrabatt.</div>`;
  }
  const discountNet = subtotalNet * (discountPct / 100);
  const discountGross = subtotalGross * (discountPct / 100);
  const totalNet = subtotalNet - discountNet;
  const totalGross = subtotalGross - discountGross;
  const displaySubtotal = mode === 'net' ? subtotalNet : subtotalGross;
  const displayTotal = mode === 'net' ? totalNet : totalGross;
  const vatLabel = mode === 'net' ? 'zzgl. 19 % MwSt.' : 'inkl. 19 % MwSt.';

  const crossHtml = (typeof renderDrawerCrossSells === 'function') ? renderDrawerCrossSells() : '';
  foot.innerHTML = `
    ${crossHtml}
    <div class="cart-drawer-summary"><span>Zwischensumme</span><strong>${formatEUR(displaySubtotal)}</strong></div>
    ${discountPct > 0 ? `<div class="cart-drawer-summary" style="color:var(--success);"><span>Staffelrabatt ${discountPct}&nbsp;%</span><strong>− ${formatEUR(mode === 'net' ? discountNet : discountGross)}</strong></div>` : ''}
    ${staffelText}
    <div class="cart-drawer-summary total"><span class="label">Gesamt</span><span class="value">${formatEUR(displayTotal)}</span></div>
    <div class="cart-drawer-vat-hint">${vatLabel}</div>
    <a href="warenkorb.html" class="drawer-cta">Angebot mit Lieferzeit anfordern</a>
    <button class="drawer-cta-secondary" onclick="closeCartDrawer()">Erst weiterstöbern</button>`;
}
function cartChangeQtyDrawer(sku, delta) {
  const cart = getCart();
  const newQty = (cart[sku] || 1) + delta;
  setCartQty(sku, newQty);
  renderCartDrawer();
}
function cartRemoveDrawer(sku) {
  removeFromCart(sku);
  renderCartDrawer();
}

/* ============================================================
   NEWSLETTER POPUP (5% Rabatt, einmal pro Browser)
   ============================================================ */
const NEWSLETTER_KEY = 'baudienst_newsletter_state';
function renderNewsletterMarkup() {
  return `<div class="newsletter-backdrop" id="newsletterBackdrop">
    <div class="newsletter-modal">
      <button class="newsletter-close" onclick="dismissNewsletter()" aria-label="Schließen">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="newsletter-visual">
        <span class="newsletter-visual-label">Erstkunden-Konditionen</span>
        <div>
          <div class="newsletter-discount">5&nbsp;%<small>auf Ihre Erstbestellung</small></div>
        </div>
      </div>
      <div class="newsletter-content">
        <h2>Code in 60 Sekunden.<br>Brief alle vier Wochen.</h2>
        <p>Geschäfts-E-Mail eintragen, Rabattcode kommt sofort. Danach ein Brief alle vier Wochen mit dem, was tatsächlich neu bei uns ist: neue Werkzeuge, Werkstatt-Aktionen, Husqvarna-Updates. Keine Werbeflut, keine generischen Newsletter, jederzeit abbestellbar.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); subscribeNewsletter(this);">
          <input type="email" placeholder="ihre.firma@beispiel.de" required>
          <button type="submit">Code holen</button>
        </form>
        <button class="newsletter-no-thanks" onclick="dismissNewsletter()">Nicht jetzt</button>
        <p class="newsletter-fine">Mit Klick auf „Code holen" stimmen Sie zu, dass wir Ihnen den Rabattcode und die monatlichen Updates per E-Mail senden dürfen. Abmeldung über den Link in jeder Mail.</p>
      </div>
    </div>
  </div>`;
}
function maybeShowNewsletter() {
  const state = localStorage.getItem(NEWSLETTER_KEY);
  if (state === 'dismissed' || state === 'subscribed') return;
  setTimeout(() => {
    const bd = document.getElementById('newsletterBackdrop');
    if (bd) bd.classList.add('show');
  }, 9000);
}
function dismissNewsletter() {
  const bd = document.getElementById('newsletterBackdrop');
  if (bd) bd.classList.remove('show');
  localStorage.setItem(NEWSLETTER_KEY, 'dismissed');
}
function subscribeNewsletter(form) {
  const email = form.querySelector('input[type="email"]').value;
  localStorage.setItem(NEWSLETTER_KEY, 'subscribed');
  const bd = document.getElementById('newsletterBackdrop');
  if (bd) bd.classList.remove('show');
  showToast(`<span>✓ Rabattcode gesendet</span> an ${email}`);
}

/* ============================================================
   MOUNT DRAWER + NEWSLETTER (auf jeder Seite)
   ============================================================ */
function mountChromeExtras() {
  let drawer = document.getElementById('cartDrawer');
  if (!drawer) {
    const div = document.createElement('div');
    div.innerHTML = renderCartDrawerMarkup();
    while (div.firstChild) document.body.appendChild(div.firstChild);
  }
  let news = document.getElementById('newsletterBackdrop');
  if (!news) {
    const div = document.createElement('div');
    div.innerHTML = renderNewsletterMarkup();
    while (div.firstChild) document.body.appendChild(div.firstChild);
  }
}

/* ============================================================
   AI-BERATER (Streaming-Fetch zu /api/advisor)
   ============================================================ */
const advisorHistory = []; // {role, content}
let advisorBusy = false;

async function runAdvisor(question) {
  if (advisorBusy) return;
  const out = document.getElementById('advisorOutput');
  if (!out) return;
  advisorBusy = true;

  const wizard = {
    material: finderAnswers.step1,
    tool: finderAnswers.step2,
    mount: finderAnswers.step3,
  };
  const suggestedSkus = window._finderResultSkus || [];

  // Echo user question into the conversation
  if (question) {
    const userMsg = document.createElement('div');
    userMsg.className = 'advisor-msg advisor-user';
    userMsg.textContent = question;
    out.appendChild(userMsg);
    advisorHistory.push({ role: 'user', content: question });
  }

  const reply = document.createElement('div');
  reply.className = 'advisor-msg advisor-assistant streaming';
  reply.innerHTML = '<span class="advisor-cursor">▍</span>';
  out.appendChild(reply);
  out.scrollTop = out.scrollHeight;

  // Trim PRODUCTS payload to just the suggested ones plus their cross-sells
  const relevantSkus = new Set(suggestedSkus);
  suggestedSkus.forEach(s => getCrossSells(s).forEach(c => relevantSkus.add(c)));
  const slimProducts = {};
  relevantSkus.forEach(s => {
    if (PRODUCTS[s]) slimProducts[s] = {
      name: PRODUCTS[s].name,
      brand: PRODUCTS[s].brand,
      isBDE: !!PRODUCTS[s].isBDE,
      priceGross: PRODUCTS[s].priceGross,
      qty: PRODUCTS[s].qty,
      desc: PRODUCTS[s].desc
    };
  });

  try {
    const res = await fetch('/api/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wizard, suggestedSkus,
        products: slimProducts,
        question: question || null,
        history: advisorHistory.slice(0, -1) // ohne die gerade gepushte Frage
      })
    });

    if (!res.body) {
      const text = await res.text();
      reply.innerHTML = '';
      reply.textContent = text;
      advisorHistory.push({ role: 'assistant', content: text });
      reply.classList.remove('streaming');
      advisorBusy = false;
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      reply.innerHTML = escapeHtml(buffer) + '<span class="advisor-cursor">▍</span>';
      out.scrollTop = out.scrollHeight;
    }
    reply.innerHTML = escapeHtml(buffer);
    reply.classList.remove('streaming');
    advisorHistory.push({ role: 'assistant', content: buffer });
  } catch (e) {
    reply.classList.remove('streaming');
    reply.textContent = 'Berater gerade nicht erreichbar. Rufen Sie uns an unter 03320 / 2004-97, wir sind werktags 7 bis 17 Uhr für Sie da.';
  } finally {
    advisorBusy = false;
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

function advisorAskFromInput(e) {
  if (e && e.key && e.key !== 'Enter') return;
  const input = document.getElementById('advisorInput');
  if (!input) return;
  const q = (input.value || '').trim();
  if (!q) return;
  input.value = '';
  runAdvisor(q);
}

function resetAdvisor() {
  advisorHistory.length = 0;
  const out = document.getElementById('advisorOutput');
  if (out) out.innerHTML = '';
}

/* ============================================================
   CROSS-SELL RENDERING (PDP, Cart-Drawer)
   ============================================================ */
function renderCrossSellGrid(sku, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const skus = getCrossSells(sku);
  if (!skus.length) { c.innerHTML = ''; return; }
  c.innerHTML = skus.map(s => renderProductCard(s)).join('');
  applyPriceMode();
}

function renderCrossSellList(sku, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const skus = getCrossSells(sku);
  if (!skus.length) {
    const wrap = document.getElementById('pdpCrossSellInline');
    if (wrap) wrap.style.display = 'none';
    return;
  }
  c.innerHTML = skus.map(s => {
    const p = PRODUCTS[s];
    if (!p) return '';
    const bde = p.isBDE ? '<span class="cross-list-bde">BDE</span>' : '';
    return `<a class="cross-list-item" href="bohrkrone-detail.html?sku=${s}">
      <img src="${p.img}" alt="${p.name}" onerror="this.style.opacity='0.3'">
      <div class="cross-list-info">
        ${bde}
        <div class="cross-list-name">${p.short || p.name}</div>
        <div class="cross-list-brand">${p.brand}</div>
        <div class="cross-list-price" data-price-sku="${s}"></div>
      </div>
      <button class="cross-list-add" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${s}')" aria-label="In den Warenkorb">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </a>`;
  }).join('');
  applyPriceMode();
}

function renderDrawerCrossSells() {
  const cart = getCart();
  const cartSkus = Object.keys(cart);
  if (cartSkus.length === 0) return '';
  // collect unique cross-sells not already in cart
  const set = new Set();
  cartSkus.forEach(s => getCrossSells(s).forEach(c => {
    if (!cart[c]) set.add(c);
  }));
  const top = Array.from(set).slice(0, 3);
  if (!top.length) return '';
  return `<div class="drawer-crosssell">
    <h4>Vergessen Sie das nicht</h4>
    ${top.map(s => {
      const p = PRODUCTS[s]; if (!p) return '';
      return `<button class="drawer-crosssell-item" onclick="addToCart('${s}')">
        <img src="${p.img}" alt="">
        <span>
          <strong>${p.short || p.name}</strong>
          <em>${formatEUR(getPriceMode() === 'net' ? p.priceNet : p.priceGross)}</em>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>`;
    }).join('')}
  </div>`;
}

/* ============================================================
   INIT (auf jeder Seite aufrufen)
   ============================================================ */
function initShop(activeNav) {
  mountChrome(activeNav);
  mountChromeExtras();
  renderCartBadge();
  applyPriceMode();
  if (typeof loadCrossSells === 'function') loadCrossSells();
  maybeShowNewsletter();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCartDrawer(); dismissNewsletter(); }
  });
}
document.addEventListener('DOMContentLoaded', () => initShop(window.PAGE_NAV));

/* ============================================================
   CHATBOT (ersetzt WhatsApp-FAB)
   ============================================================ */
let chatbotState = { open: false, started: false, teased: false, wizard: { material: null, tool: null, mount: null }, history: [] };

function toggleChatbot() {
  const w = document.getElementById('chatbotWindow');
  if (!w) return;
  if (w.classList.contains('open')) {
    closeChatbot();
  } else {
    openChatbot();
  }
}
function openChatbot() {
  const w = document.getElementById('chatbotWindow');
  const t = document.getElementById('chatbotTease');
  if (!w) return;
  w.classList.add('open');
  w.setAttribute('aria-hidden', 'false');
  if (t) t.classList.remove('show');
  chatbotState.open = true;
  if (!chatbotState.started) {
    chatbotState.started = true;
    chatbotBoot();
  }
  setTimeout(() => document.getElementById('chatbotInput')?.focus(), 200);
}
function closeChatbot() {
  const w = document.getElementById('chatbotWindow');
  if (!w) return;
  w.classList.remove('open');
  w.setAttribute('aria-hidden', 'true');
  chatbotState.open = false;
}
function dismissChatbotTease(e) {
  if (e) e.stopPropagation();
  const t = document.getElementById('chatbotTease');
  if (t) t.classList.remove('show');
  sessionStorage.setItem('chatbot_tease_dismissed', '1');
}

function chatbotBoot() {
  chatbotPushBot('Guten Tag. Ich bin der Werkstatt-Berater bei Baudienst. Wenn Sie wissen welches Werkzeug Sie brauchen, suchen Sie direkt im Sortiment. Wenn nicht, leite ich Sie durch drei kurze Fragen.');
  chatbotPushActions([
    { label: 'Werkzeug finden in drei Fragen', action: () => chatbotStartWizard() },
    { label: 'Eine konkrete Frage stellen', action: () => chatbotPushBot('Gerne. Stellen Sie Ihre Frage unten.') },
    { label: 'Lieber anrufen 03320 / 2004-96', action: () => { window.location.href = 'tel:+493320920496'; } },
  ]);
}

function chatbotPushBot(text) {
  const body = document.getElementById('chatbotBody');
  if (!body) return;
  const el = document.createElement('div');
  el.className = 'chatbot-msg bot';
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
}
function chatbotPushUser(text) {
  const body = document.getElementById('chatbotBody');
  if (!body) return;
  const el = document.createElement('div');
  el.className = 'chatbot-msg user';
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
}
function chatbotPushActions(actions) {
  const body = document.getElementById('chatbotBody');
  if (!body) return;
  const wrap = document.createElement('div');
  wrap.className = 'chatbot-quick-actions';
  actions.forEach(({ label, action }) => {
    const b = document.createElement('button');
    b.className = 'chatbot-quick';
    b.textContent = label;
    b.onclick = () => { chatbotPushUser(label); wrap.remove(); action(); };
    wrap.appendChild(b);
  });
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function chatbotStartWizard() {
  chatbotState.wizard = { material: null, tool: null, mount: null };
  chatbotPushBot('Schritt 1 von 3: Was für ein Untergrund liegt vor?');
  chatbotPushActions([
    { label: 'Normalbeton', action: () => chatbotWizardStep(1, 'beton_normal') },
    { label: 'Stahlbeton',  action: () => chatbotWizardStep(1, 'stahlbeton') },
    { label: 'Altbeton',    action: () => chatbotWizardStep(1, 'beton_alt') },
    { label: 'Mauerwerk',   action: () => chatbotWizardStep(1, 'mauerwerk') },
    { label: 'Fliese',      action: () => chatbotWizardStep(1, 'fliese') },
    { label: 'Estrich',     action: () => chatbotWizardStep(1, 'estrich_zement') },
  ]);
}
function chatbotWizardStep(step, value) {
  if (step === 1) {
    chatbotState.wizard.material = value;
    chatbotPushBot('Schritt 2 von 3: Welcher Werkzeugtyp?');
    chatbotPushActions([
      { label: 'Bohrkrone',     action: () => chatbotWizardStep(2, 'bohrkrone') },
      { label: 'Trennscheibe',  action: () => chatbotWizardStep(2, 'trennscheibe') },
      { label: 'Schleiftopf',   action: () => chatbotWizardStep(2, 'schleiftopf') },
      { label: 'Dosensenker',   action: () => chatbotWizardStep(2, 'dosensenker') },
      { label: 'Fliesenbohrer', action: () => chatbotWizardStep(2, 'fliesenbohrer') },
    ]);
  } else if (step === 2) {
    chatbotState.wizard.tool = value;
    chatbotPushBot('Schritt 3 von 3: Welche Aufnahme hat Ihre Maschine?');
    chatbotPushActions([
      { label: '1¼-7 UNC (Kernbohrgerät)', action: () => chatbotWizardStep(3, '1.25-7-UNC') },
      { label: 'M14 (Winkelschleifer)',    action: () => chatbotWizardStep(3, 'M14') },
      { label: 'SDS-Plus (Bohrhammer)',    action: () => chatbotWizardStep(3, 'SDS-Plus') },
      { label: 'M16 (Dosensenker)',        action: () => chatbotWizardStep(3, 'M16') },
    ]);
  } else if (step === 3) {
    chatbotState.wizard.mount = value;
    chatbotShowWizardResult();
  }
}

function chatbotShowWizardResult() {
  // Recommendation aus dem bestehenden Wizard-Algorithmus
  finderAnswers = { step1: chatbotState.wizard.material, step2: chatbotState.wizard.tool, step3: chatbotState.wizard.mount };
  const skus = getFinderRecommendation();
  window._finderResultSkus = skus;

  chatbotPushBot('Drei Vorschläge aus dem Sortiment:');
  const body = document.getElementById('chatbotBody');
  if (!body) return;
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gap = '6px';
  grid.style.marginBottom = '10px';
  skus.slice(0, 3).forEach(sku => {
    const p = PRODUCTS[sku];
    if (!p) return;
    const card = document.createElement('button');
    card.style.cssText = 'display:grid;grid-template-columns:42px 1fr;gap:10px;align-items:center;background:white;border:1px solid var(--gray-border);border-radius:6px;padding:8px;text-align:left;cursor:pointer;font-family:inherit;';
    card.innerHTML = `<img src="${p.img}" style="width:42px;height:42px;object-fit:contain;background:var(--gray-bg);border-radius:3px;">
      <span><strong style="display:block;font-size:12.5px;color:var(--text);font-weight:600;">${p.short || p.name}</strong>
      <em style="font-style:normal;font-size:11.5px;color:var(--red);">${formatEUR(getPriceMode() === 'net' ? p.priceNet : p.priceGross)}</em></span>`;
    card.onclick = () => { addToCart(sku); chatbotPushUser(`In den Warenkorb: ${p.short || p.name}`); chatbotPushBot('Gerne. Möchten Sie noch mehr Details?'); };
    grid.appendChild(card);
  });
  body.appendChild(grid);
  body.scrollTop = body.scrollHeight;

  // AI-Berater-Erklärung direkt im Chatbot
  chatbotPushBot('Einen Moment, ich erkläre kurz warum diese Auswahl…');
  runChatbotAdvisor();
}

async function runChatbotAdvisor(question) {
  const body = document.getElementById('chatbotBody');
  if (!body) return;
  const reply = document.createElement('div');
  reply.className = 'chatbot-msg bot';
  reply.innerHTML = '<span class="advisor-cursor">▍</span>';
  body.appendChild(reply);
  body.scrollTop = body.scrollHeight;

  const wizard = chatbotState.wizard;
  const suggestedSkus = window._finderResultSkus || [];
  const relevantSkus = new Set(suggestedSkus);
  suggestedSkus.forEach(s => getCrossSells(s).forEach(c => relevantSkus.add(c)));
  const slimProducts = {};
  relevantSkus.forEach(s => {
    if (PRODUCTS[s]) slimProducts[s] = {
      name: PRODUCTS[s].name, brand: PRODUCTS[s].brand, isBDE: !!PRODUCTS[s].isBDE,
      priceGross: PRODUCTS[s].priceGross, qty: PRODUCTS[s].qty, desc: PRODUCTS[s].desc
    };
  });

  try {
    const res = await fetch('/api/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wizard, suggestedSkus, products: slimProducts, question: question || null, history: chatbotState.history })
    });
    if (!res.body) {
      const text = await res.text();
      reply.textContent = text;
      chatbotState.history.push({ role: 'assistant', content: text });
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      reply.innerHTML = escapeHtml(buf) + '<span class="advisor-cursor">▍</span>';
      body.scrollTop = body.scrollHeight;
    }
    reply.innerHTML = escapeHtml(buf);
    chatbotState.history.push({ role: 'assistant', content: buf });
  } catch (e) {
    reply.textContent = 'Berater gerade nicht erreichbar. Rufen Sie 03320 / 2004-96.';
  }
}

function chatbotSendOnEnter(e) { if (e.key === 'Enter') chatbotSend(); }
function chatbotSend() {
  const input = document.getElementById('chatbotInput');
  if (!input) return;
  const q = (input.value || '').trim();
  if (!q) return;
  input.value = '';
  chatbotPushUser(q);
  chatbotState.history.push({ role: 'user', content: q });
  runChatbotAdvisor(q);
}

/* Proaktive Tease-Logik: nach 18 Sekunden Scroll/Verweil-Aktivität, einmal pro Session */
function initChatbotProactive() {
  if (sessionStorage.getItem('chatbot_tease_dismissed')) return;
  if (sessionStorage.getItem('chatbot_tease_shown')) return;
  let scrolled = 0;
  let timer = null;
  const trigger = () => {
    if (sessionStorage.getItem('chatbot_tease_dismissed')) return;
    if (chatbotState.open) return;
    const t = document.getElementById('chatbotTease');
    const textEl = document.getElementById('chatbotTeaseText');
    if (!t || !textEl) return;
    // Kontext-spezifische Nachricht
    const hash = location.hash;
    let msg = 'Hallo. Ich sehe Sie schauen sich Diamantwerkzeuge an. Soll ich Ihnen helfen das passende zu finden? Drei Fragen reichen.';
    if (hash === '#bde')        msg = 'Die BDE-Linie kommt direkt aus unserer Werkstatt. Wenn Sie unsicher sind welche Körnung Sie brauchen, klicken Sie hier rein.';
    if (hash === '#werkstatt')  msg = 'Reparatur-Anfrage? Schreiben Sie mir hier kurz Hersteller und Modell, dann gebe ich Ihnen eine grobe Lieferzeit.';
    if (hash === '#berater')    msg = 'Schon dabei den Berater zu starten? Wenn Sie lieber tippen statt klicken: ich frage Sie alles per Chat.';
    textEl.textContent = msg;
    t.classList.add('show');
    sessionStorage.setItem('chatbot_tease_shown', '1');
  };
  const onScroll = () => {
    scrolled++;
    if (scrolled === 1) {
      timer = setTimeout(trigger, 18000);
    }
    if (scrolled > 6 && timer) {
      clearTimeout(timer);
      trigger();
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  // Fallback: nach 30s pure Verweildauer trotzdem zeigen
  setTimeout(trigger, 30000);
}

// In initShop einklinken
const _origInitShop = initShop;
initShop = function(activeNav) {
  _origInitShop(activeNav);
  initChatbotProactive();
};
