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
    showToast(`<span>${sku}</span> in den Warenkorb gelegt`);
    return;
  }
  const cart = getCart();
  cart[sku] = (cart[sku] || 0) + qty;
  saveCart(cart);
  showToast(`<span>${PRODUCTS[sku].short || PRODUCTS[sku].name}</span> in den Warenkorb gelegt`);
}
function addManyToCart(skus) {
  const cart = getCart();
  skus.forEach(sku => { cart[sku] = (cart[sku] || 0) + 1; });
  saveCart(cart);
  showToast(`<span>${skus.length} Artikel</span> in den Warenkorb gelegt`);
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
  const compatBadge = (opts.showCompat && p.compat && p.compat.includes('PG 400'))
    ? '<span class="card-compat-badge">Passt zu PG 400</span>' : '';
  const url = p.url || ('pg400.html'); // alle Segment-Klicks → PDP (Demo-Vereinfachung)
  const dataAttrs = `data-sku="${sku}" data-usage="${(p.usage || []).join(',')}" data-goal="${(p.goal || []).join(',')}" data-cat="${p.category}"`;
  return `
    <div class="product-card" ${dataAttrs}>
      <a class="card-img" href="${url}" style="text-decoration:none;">
        <img src="${p.img}" alt="${p.name}"
             onerror="this.src='${FALLBACK_IMG}'; this.style.opacity='0.15'; this.style.padding='30px'">
        ${compatBadge}
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
  const key1 = finderAnswers.step1 || 'mittel';
  const key2 = finderAnswers.step2 || 'schleifen';
  return (RECOMMENDATIONS[key1] && RECOMMENDATIONS[key1][key2]) || RECOMMENDATIONS.mittel.schleifen;
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
    return `<div class="result-product" onclick="addToCart('${sku}')">
      <div class="result-product-name">${p.short || p.name}</div>
      <div class="result-product-price">${formatEUR(price)}</div>
      <div class="result-product-qty">${label} · ${p.qty}</div>
    </div>`;
  }).join('');
  document.getElementById('resultProducts').innerHTML = html;
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
      <span>Gewerbekunden: Staffelpreise &amp; Rechnung auf Anfrage</span>
    </div>
    <div class="topbar-items">
      <div class="price-toggle" role="tablist" aria-label="Preisanzeige">
        <button data-mode="gross" onclick="setPriceMode('gross')">Brutto</button>
        <button data-mode="net" onclick="setPriceMode('net')">Netto</button>
      </div>
      <span>Mo–Fr 7:00–17:00</span>
      <a href="tel:+493320920049">📞 03320 / 2004-97</a>
    </div>
  </div></div>`;
}
function renderHeader(activeNav) {
  const items = [
    { key: 'home',     label: 'Startseite',      href: 'index.html' },
    { key: 'maschinen',label: 'Diamantschleifer',href: 'kategorie.html' },
    { key: 'segmente', label: 'Schleifsegmente', href: 'segmente.html' },
    { key: 'finder',   label: 'Produktberater',  href: 'finder.html' },
    { key: 'kontakt',  label: 'Kontakt',         href: '#' },
  ];
  const nav = items.map(i =>
    `<a href="${i.href}" class="${i.key === activeNav ? 'active' : ''}">${i.label}</a>`
  ).join('');
  return `<header><div class="header-inner">
    <a href="index.html" class="logo">
      <div class="logo-mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
          <circle cx="12" cy="12" r="9"/><path d="M12 3 L12 21 M3 12 L21 12"/>
        </svg>
      </div>
      <div><span class="logo-text">BAUDIENST</span><span class="logo-sub">Caputh · seit 1980</span></div>
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
      <div><p class="usp-title">Husqvarna Vertragspartner</p><p class="usp-desc">Autorisierter Fachhändler mit eigenem Werkstatt-Service</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
      <div><p class="usp-title">Versand in 2–3 Werktagen</p><p class="usp-desc">Schleifsegmente auf Lager – sofort lieferbar</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg></div>
      <div><p class="usp-title">B2B-Gewerbepreise</p><p class="usp-desc">Staffelpreise und Rechnungskauf auf Anfrage</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div>
      <div><p class="usp-title">Direkte Beratung</p><p class="usp-desc">Mo–Fr 7–17 Uhr: 03320 / 2004-97</p></div>
    </div>
  </div></div>`;
}
function renderFooter() {
  return `<footer><div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="logo">
        <div class="logo-mark"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3 L12 21 M3 12 L21 12"/></svg></div>
        <div><span class="logo-text">BAUDIENST</span><span class="logo-sub">Caputh · seit 1980</span></div>
      </a>
      <p class="footer-desc">Ihr Fachpartner für Diamantschleiftechnik, Betontechnik und Baugeräte in Berlin und Brandenburg.</p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="kategorie.html">Diamantschleifer</a></li>
        <li><a href="segmente.html">Schleifsegmente</a></li>
        <li><a href="#">Betontechnik</a></li>
        <li><a href="#">Putztechnik</a></li>
        <li><a href="#">Vermietung</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Service</h4>
      <ul>
        <li><a href="#">Reparatur &amp; Wartung</a></li>
        <li><a href="#">B2B-Gewerbepreise</a></li>
        <li><a href="#">Versand &amp; Lieferung</a></li>
        <li><a href="finder.html">Produktberater</a></li>
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
  return `<div class="whatsapp-fab" onclick="showToast('WhatsApp-Chat wird geöffnet …')">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.395 5.608L0 24l6.537-1.37A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.597-.487-5.112-1.341l-.366-.217-3.793.994.995-3.692-.239-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  </div>`;
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
   INIT (auf jeder Seite aufrufen)
   ============================================================ */
function initShop(activeNav) {
  mountChrome(activeNav);
  renderCartBadge();
  applyPriceMode();
}
// Auto-init: page may set window.PAGE_NAV before this script loads
document.addEventListener('DOMContentLoaded', () => initShop(window.PAGE_NAV));
