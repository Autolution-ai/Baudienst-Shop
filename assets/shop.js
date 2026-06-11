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
  const compatBadge = (opts.showCompat && p.compat && p.compat.includes('PG 400'))
    ? '<span class="card-compat-badge">Passt zu PG 400</span>' : '';
  const url = p.url || 'pg400.html';
  const dataAttrs = `data-sku="${sku}" data-usage="${(p.usage || []).join(',')}" data-goal="${(p.goal || []).join(',')}" data-cat="${p.category}"`;
  // Fallback: hide img, show placeholder block with product short name + brand
  const fallbackJs = `this.style.display='none'; this.parentElement.classList.add('card-img-fallback');`;
  return `
    <div class="product-card" ${dataAttrs}>
      <a class="card-img" href="${url}" data-fallback-title="${(p.short || p.name).replace(/"/g, '&quot;')}" data-fallback-brand="${p.brand}">
        <img src="${p.img}" alt="${p.name}" onerror="${fallbackJs}">
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
   SHOP-NAV (Tabs + Chips auf der Startseite v3)
   ============================================================ */
const shopState = { tab: 'all', usage: null, goal: null };
function setShopTab(cat) {
  shopState.tab = cat;
  document.querySelectorAll('.shop-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === cat);
  });
  const chipsRow = document.getElementById('shopFilterChips');
  if (chipsRow) {
    const showChips = (cat === 'segment' || cat === 'all');
    chipsRow.style.opacity = showChips ? '1' : '0.4';
    chipsRow.style.pointerEvents = showChips ? 'auto' : 'none';
  }
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
  shopState.usage = null;
  shopState.goal = null;
  document.querySelectorAll('.shop-chip').forEach(b => b.classList.remove('active'));
  applyShopFilter();
}
function applyShopFilter() {
  let visible = 0;
  document.querySelectorAll('#shopGrid .product-card').forEach(card => {
    const cat = card.dataset.cat;
    const matchTab = shopState.tab === 'all' || cat === shopState.tab;
    let matchChips = true;
    if (cat === 'segment') {
      const usage = (card.dataset.usage || '').split(',');
      const goal = (card.dataset.goal || '').split(',');
      const matchUsage = !shopState.usage || usage.includes(shopState.usage);
      const matchGoal = !shopState.goal || goal.includes(shopState.goal);
      matchChips = matchUsage && matchGoal;
    } else if ((shopState.usage || shopState.goal) && shopState.tab === 'all') {
      matchChips = false;
    }
    const show = matchTab && matchChips;
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
    { key: 'sortiment', label: 'Sortiment',       href: 'index.html#produkte' },
    { key: 'segmente',  label: 'Schleifsegmente', href: 'index.html#produkte' },
    { key: 'maschine',  label: 'Husqvarna PG 400',href: 'pg400.html' },
    { key: 'berater',   label: 'Produktberater',  href: 'index.html#berater' },
    { key: 'werkstatt', label: 'Werkstatt',       href: 'index.html#werkstatt' },
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
      <div><p class="usp-title">Husqvarna Vertragspartner</p><p class="usp-desc">Autorisierter Fachhändler mit eigenem Werkstatt-Service</p></div>
    </div>
    <div class="usp-item">
      <div class="usp-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
      <div><p class="usp-title">Versand in 2–3 Werktagen</p><p class="usp-desc">Schleifsegmente auf Lager. Sofort lieferbar.</p></div>
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
      <a href="index.html" class="logo logo-brand">
        <img src="assets/logo.svg" alt="BAUDIENST Manfred Braunschweig GmbH" class="logo-img-full">
      </a>
      <p class="footer-desc">Ihr Fachpartner für Diamantschleiftechnik, Betontechnik und Baugeräte in Berlin und Brandenburg.</p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="index.html#produkte">Sortiment</a></li>
        <li><a href="pg400.html">Husqvarna PG 400</a></li>
        <li><a href="index.html#produkte">Schleifsegmente</a></li>
        <li><a href="index.html#produkte">Adapter &amp; Halter</a></li>
        <li><a href="warenkorb.html">Warenkorb</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Service</h4>
      <ul>
        <li><a href="index.html#werkstatt">Reparatur &amp; Wartung</a></li>
        <li><a href="index.html#berater">Produktberater</a></li>
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
      <p>Stöbern Sie im Sortiment oder starten Sie den Produktberater.</p>
    </div>`;
    foot.innerHTML = `<a href="segmente.html" class="drawer-cta">Zu den Schleifsegmenten</a>
      <a href="finder.html" class="drawer-cta-secondary">Produktberater starten</a>`;
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
    staffelText = `<div class="cart-drawer-staffel success">✓ 5 % Staffelrabatt aktiv (ab 10 Stk. 8 %)</div>`;
  } else {
    const need = 5 - totalCount;
    staffelText = `<div class="cart-drawer-staffel">Noch ${need} Artikel bis 5 % Staffelrabatt</div>`;
  }
  const discountNet = subtotalNet * (discountPct / 100);
  const discountGross = subtotalGross * (discountPct / 100);
  const totalNet = subtotalNet - discountNet;
  const totalGross = subtotalGross - discountGross;
  const displaySubtotal = mode === 'net' ? subtotalNet : subtotalGross;
  const displayTotal = mode === 'net' ? totalNet : totalGross;
  const vatLabel = mode === 'net' ? 'zzgl. 19 % MwSt.' : 'inkl. 19 % MwSt.';

  foot.innerHTML = `
    <div class="cart-drawer-summary"><span>Zwischensumme</span><strong>${formatEUR(displaySubtotal)}</strong></div>
    ${discountPct > 0 ? `<div class="cart-drawer-summary" style="color:var(--success);"><span>Staffelrabatt ${discountPct}&nbsp;%</span><strong>− ${formatEUR(mode === 'net' ? discountNet : discountGross)}</strong></div>` : ''}
    ${staffelText}
    <div class="cart-drawer-summary total"><span class="label">Gesamt</span><span class="value">${formatEUR(displayTotal)}</span></div>
    <div class="cart-drawer-vat-hint">${vatLabel}</div>
    <a href="warenkorb.html" class="drawer-cta">Zum Warenkorb &amp; Angebot anfordern</a>
    <button class="drawer-cta-secondary" onclick="closeCartDrawer()">Weiter einkaufen</button>`;
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
        <span class="newsletter-visual-label">Neukunden-Vorteil</span>
        <div>
          <div class="newsletter-discount">5&nbsp;%<small>auf Ihre erste Bestellung</small></div>
        </div>
      </div>
      <div class="newsletter-content">
        <h2>Direkt vom Fachhändler.<br>5&nbsp;% bei der ersten Bestellung.</h2>
        <p>Tragen Sie Ihre Geschäfts-E-Mail ein. Wir senden Ihnen den Rabattcode plus monatliche Hinweise zu neuen Werkzeugen, Aktionen und Husqvarna-Updates. Keine Werbeflut, jederzeit abbestellbar.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); subscribeNewsletter(this);">
          <input type="email" placeholder="ihre.firma@beispiel.de" required>
          <button type="submit">Rabattcode anfordern</button>
        </form>
        <button class="newsletter-no-thanks" onclick="dismissNewsletter()">Nein danke, später vielleicht</button>
        <p class="newsletter-fine">Mit Klick auf „Rabattcode anfordern" willigen Sie ein, dass wir Ihnen Werbe-E-Mails senden dürfen. Abmeldung jederzeit per Link in jeder E-Mail.</p>
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
   INIT (auf jeder Seite aufrufen)
   ============================================================ */
function initShop(activeNav) {
  mountChrome(activeNav);
  mountChromeExtras();
  renderCartBadge();
  applyPriceMode();
  maybeShowNewsletter();
  // ESC schließt Drawer / Newsletter
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCartDrawer(); dismissNewsletter(); }
  });
}
// Auto-init: page may set window.PAGE_NAV before this script loads
document.addEventListener('DOMContentLoaded', () => initShop(window.PAGE_NAV));
