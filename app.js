// ─── Demo Products (fallback when Supabase is not connected) ─────────────────
const DEMO_PRODUCTS = [
  { id:1, name:'Pro Edge Paddle', description:'Professional-grade paddle with carbon fiber surface, soft grip, and balanced control. Lightweight and durable.', price:1427, old_price:1585, rating:4.7, sold_count:826, category:'Sports', image_url:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop', variation_options:['Black','Blue','Red'] },
  { id:2, name:'Travel Bottle Set', description:'Portable bottle set for school, work, and travel. Leak-proof lids and easy to carry anywhere.', price:399, old_price:499, rating:4.6, sold_count:234, category:'Lifestyle', image_url:'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800&auto=format&fit=crop', variation_options:['White','Green','Gray'] },
  { id:3, name:'Wireless Earbuds', description:'Clear sound, compact charging case, and easy touch controls. Up to 24 hours total battery life.', price:899, old_price:1099, rating:4.8, sold_count:512, category:'Gadgets', image_url:'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop', variation_options:['Black','White'] },
  { id:4, name:'Sports Backpack', description:'Water-resistant athletic backpack with shoe compartment, laptop sleeve, and multiple pockets.', price:750, old_price:950, rating:4.6, sold_count:389, category:'Sports', image_url:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop', variation_options:['Black','Navy','Olive'] },
  { id:5, name:'Fitness Smartwatch', description:'Heart rate monitor, GPS tracking, sleep analysis, and waterproof design. iOS and Android compatible.', price:2499, old_price:2999, rating:4.7, sold_count:1204, category:'Gadgets', image_url:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', variation_options:['Black','Silver','Rose Gold'] },
  { id:6, name:'Yoga Mat Pro', description:'Non-slip alignment lines, 6mm thickness for joint support, eco-friendly TPE material. Includes carry strap.', price:550, old_price:699, rating:4.8, sold_count:2100, category:'Sports', image_url:'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop', variation_options:['Purple','Blue','Black'] },
];

const CATEGORIES = ['All','Sports','Gadgets','Lifestyle','Deals'];

const TRACKING_STEPS = [
  { key:'Order Placed',       label:'Order Placed',      icon:'📦' },
  { key:'Payment Confirmed',  label:'Payment Confirmed', icon:'💳' },
  { key:'Preparing Order',    label:'Preparing',         icon:'🔧' },
  { key:'Packed',             label:'Packed',            icon:'📫' },
  { key:'Out for Delivery',   label:'Out for Delivery',  icon:'🚚' },
  { key:'Delivered',          label:'Delivered',         icon:'✅' },
];

// ─── Supabase Client ──────────────────────────────────────────────────────────
let supabaseClient = null;

function initSupabase() {
  try {
    const cfg = window.SHOPGO_CONFIG || {};
    const url = cfg.supabaseUrl || '';
    const key = cfg.supabaseKey || '';
    if (url && key && url !== 'https://your-project.supabase.co' && window.supabase) {
      supabaseClient = window.supabase.createClient(url, key);
    }
  } catch(e) {
    console.warn('Supabase init failed:', e);
  }
}

// ─── DB Helpers ───────────────────────────────────────────────────────────────
async function dbFetchProducts() {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient.from('products').select('*').order('created_at', { ascending: false });
    if (error) return null;
    return data;
  } catch(e) { return null; }
}

async function dbSaveOrder(payload) {
  if (!supabaseClient) return null;
  try {
    const { data: order, error } = await supabaseClient
      .from('orders').insert({
        order_number:   payload.orderNumber,
        customer_name:  payload.customerName,
        address:        payload.address,
        contact_number: payload.contactNumber,
        payment_method: payload.paymentMethod,
        subtotal:       payload.subtotal,
        shipping_fee:   payload.shippingFee,
        discount:       payload.discount,
        total_amount:   payload.totalAmount,
        status:         'Order Placed',
      }).select().single();
    if (error || !order) return null;

    const items = payload.cartItems.map(i => ({
      order_id: order.id, product_id: i.id, product_name: i.name,
      product_price: i.price, quantity: i.qty, selected_variation: i.variation,
      item_total: i.price * i.qty,
    }));
    await supabaseClient.from('order_items').insert(items);
    await supabaseClient.from('order_tracking_logs').insert({
      order_id: order.id, status: 'Order Placed',
      note: 'Your order has been received and is being processed.',
    });
    return order;
  } catch(e) { return null; }
}

async function dbFetchTracking(orderNumber) {
  if (!supabaseClient) return null;
  try {
    const { data: order } = await supabaseClient.from('orders').select('*').eq('order_number', orderNumber).single();
    if (!order) return null;
    const { data: items }  = await supabaseClient.from('order_items').select('*').eq('order_id', order.id);
    const { data: logs }   = await supabaseClient.from('order_tracking_logs').select('*').eq('order_id', order.id).order('created_at', { ascending: true });
    return { ...order, items: items || [], trackingLogs: logs || [] };
  } catch(e) { return null; }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(msg, type) {
  let t = document.getElementById('app-toast');
  if (t) t.remove();
  t = document.createElement('div');
  t.id = 'app-toast';
  t.className = 'app-toast app-toast--' + (type || 'success');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('app-toast--visible'));
  setTimeout(() => { t.classList.remove('app-toast--visible'); setTimeout(() => t.remove(), 300); }, 2500);
}

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  products: [], filteredProducts: [], activeCategory: 'All',
  cart: [], currentProduct: null, selectedVariation: '',
  detailQty: 1, currentOrder: null, shippingFee: 120, discount: 0,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function peso(n) {
  return '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function genOrderNum() {
  return 'SG-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
}
function cartCount() { return state.cart.reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() { return state.cart.reduce((s, i) => s + i.price * i.qty, 0); }

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigateTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'screen-home')     updateBadges();
  if (id === 'screen-cart')     renderCart();
  if (id === 'screen-checkout') renderCheckoutSummary();
  if (id === 'screen-tracking') renderTracking();
}

function updateBadges() {
  const n = cartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = n;
    b.style.display = n > 0 ? 'flex' : 'none';
  });
}

// ─── Products ─────────────────────────────────────────────────────────────────
async function loadProducts() {
  const loader = document.getElementById('product-loader');
  if (loader) loader.style.display = 'flex';
  const remote = await dbFetchProducts();
  state.products = (remote && remote.length > 0) ? remote : DEMO_PRODUCTS;
  state.filteredProducts = [...state.products];
  if (loader) loader.style.display = 'none';
  renderCategories();
  renderProducts();
}

function filterByCategory(cat) {
  state.activeCategory = cat;
  state.filteredProducts = cat === 'All' ? [...state.products] : state.products.filter(p => p.category === cat);
  renderCategories();
  renderProducts();
}

function searchProducts(q) {
  const lq = q.toLowerCase().trim();
  state.filteredProducts = lq
    ? state.products.filter(p => p.name.toLowerCase().includes(lq) || (p.category || '').toLowerCase().includes(lq))
    : [...state.products];
  renderProducts();
}

function renderCategories() {
  const el = document.getElementById('category-tabs');
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c => `
    <button class="cat-tab ${state.activeCategory === c ? 'active' : ''}" onclick="app.filterByCategory('${c}')">${c}</button>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('product-list');
  if (!grid) return;
  if (!state.filteredProducts.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>No products found.</p></div>';
    return;
  }
  grid.innerHTML = state.filteredProducts.map(p => `
    <div class="product-card" onclick="app.viewProduct(${p.id})">
      <div class="p-img-box"><img src="${p.image_url}" alt="${p.name}" loading="lazy"></div>
      <div class="p-body">
        <div class="p-title">${p.name}</div>
        <div class="p-stats"><span class="p-star">★ ${p.rating}</span><span>${Number(p.sold_count).toLocaleString()} sold</span></div>
        <div class="p-price-row">
          <span class="p-price">${peso(p.price)}</span>
          ${p.old_price ? `<span class="p-old-price">${peso(p.old_price)}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Product Details ──────────────────────────────────────────────────────────
function viewProduct(id) {
  const p = state.products.find(x => x.id == id);
  if (!p) return;
  state.currentProduct = p;
  state.detailQty = 1;
  state.selectedVariation = (p.variation_options || [])[0] || '';

  document.getElementById('detail-image').src = p.image_url;
  document.getElementById('detail-image').alt = p.name;
  document.getElementById('detail-title').textContent = p.name;
  document.getElementById('detail-price').textContent = peso(p.price);
  document.getElementById('detail-old-price').textContent = p.old_price ? peso(p.old_price) : '';
  document.getElementById('detail-rating').textContent = p.rating;
  document.getElementById('detail-sold').textContent = Number(p.sold_count).toLocaleString();
  document.getElementById('detail-desc').textContent = p.description;
  document.getElementById('detail-qty').textContent = 1;

  const vars = p.variation_options || [];
  document.getElementById('detail-variations').innerHTML = vars.map((v, i) =>
    `<div class="var-chip ${i === 0 ? 'active' : ''}" onclick="app.selectVariation(this,'${v}')">${v}</div>`
  ).join('');

  updateBadges();
  navigateTo('screen-details');
}

function selectVariation(el, val) {
  document.querySelectorAll('#detail-variations .var-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  state.selectedVariation = val;
}

function changeDetailQty(delta) {
  const next = state.detailQty + delta;
  if (next >= 1) { state.detailQty = next; document.getElementById('detail-qty').textContent = next; }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
function addToCart(goCart) {
  const p = state.currentProduct;
  if (!p) return;
  const key = p.id + '-' + state.selectedVariation;
  const existing = state.cart.find(i => i.key === key);
  if (existing) { existing.qty += state.detailQty; }
  else { state.cart.push({ key, id: p.id, name: p.name, price: p.price, image: p.image_url, variation: state.selectedVariation, qty: state.detailQty }); }
  updateBadges();
  showToast(p.name + ' added to cart ✓');
  if (goCart) navigateTo('screen-cart');
}

function renderCart() {
  const list = document.getElementById('cart-list');
  if (!list) return;
  if (!state.cart.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><p class="empty-title">Your cart is empty</p><p>Browse products and add items to get started.</p><button class="btn btn-outline" style="width:auto;padding:10px 28px;margin-top:8px;" onclick="app.navigateTo('screen-home')">Start Shopping</button></div>`;
    document.getElementById('cart-subtotal').textContent = peso(0);
    return;
  }
  let sub = 0;
  list.innerHTML = state.cart.map((item, idx) => {
    sub += item.price * item.qty;
    return `<div class="cart-item">
      <div class="cart-img"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
      <div class="cart-info">
        <div class="cart-title">${item.name}</div>
        <div class="cart-var">${item.variation}</div>
        <div class="cart-price">${peso(item.price)}</div>
        <div class="cart-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="app.updateCartQty(${idx},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="app.updateCartQty(${idx},1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="app.removeFromCart(${idx})">Remove</button>
        </div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('cart-subtotal').textContent = peso(sub);
}

function updateCartQty(idx, delta) {
  const item = state.cart[idx];
  if (!item) return;
  const next = item.qty + delta;
  if (next <= 0) removeFromCart(idx);
  else { item.qty = next; renderCart(); updateBadges(); }
}

function removeFromCart(idx) {
  state.cart.splice(idx, 1);
  renderCart();
  updateBadges();
}

// ─── Checkout ─────────────────────────────────────────────────────────────────
function renderCheckoutSummary() {
  const sub = cartSubtotal();
  state.discount = sub > 1000 ? 100 : 0;
  const total = sub + state.shippingFee - state.discount;
  document.getElementById('chk-subtotal').textContent = peso(sub);
  document.getElementById('chk-shipping').textContent = peso(state.shippingFee);
  document.getElementById('chk-discount').textContent = state.discount > 0 ? '−' + peso(state.discount) : peso(0);
  document.getElementById('chk-total').textContent = peso(total);

  const el = document.getElementById('chk-items');
  if (el) el.innerHTML = state.cart.map(i => `
    <div class="chk-item">
      <img src="${i.image}" alt="${i.name}" class="chk-item-img" loading="lazy">
      <div class="chk-item-info"><div class="chk-item-name">${i.name}</div><div class="chk-item-meta">${i.variation} · Qty ${i.qty}</div></div>
      <div class="chk-item-price">${peso(i.price * i.qty)}</div>
    </div>`).join('');
}

function selectPayment(el) {
  document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  const r = el.querySelector('input[type="radio"]');
  if (r) r.checked = true;
}

async function submitOrder() {
  const addr = document.getElementById('checkout-address');
  if (!addr.value.trim()) { showToast('Please enter your shipping address', 'error'); addr.focus(); return; }

  const payRadio = document.querySelector('input[name="payment"]:checked');
  const payMethod = payRadio ? payRadio.value : 'GCash';
  const sub = cartSubtotal();
  const total = sub + state.shippingFee - state.discount;
  const orderNum = genOrderNum();

  const btn = document.getElementById('submit-order-btn');
  btn.textContent = 'Placing Order...';
  btn.disabled = true;

  const payload = {
    orderNumber: orderNum,
    customerName: (document.getElementById('checkout-name').value || 'Guest').trim(),
    address: addr.value.trim(),
    contactNumber: (document.getElementById('checkout-phone').value || '').trim(),
    paymentMethod: payMethod,
    subtotal: sub, shippingFee: state.shippingFee, discount: state.discount, totalAmount: total,
    cartItems: state.cart,
  };

  const saved = await dbSaveOrder(payload);

  state.currentOrder = {
    id: saved ? saved.id : null,
    order_number: orderNum,
    customer_name: payload.customerName,
    address: payload.address,
    contact_number: payload.contactNumber,
    payment_method: payMethod,
    subtotal: sub, shipping_fee: state.shippingFee, discount: state.discount, total_amount: total,
    status: 'Order Placed',
    created_at: new Date().toISOString(),
    items: state.cart.map(i => ({ ...i })),
    trackingLogs: [{ status: 'Order Placed', note: 'Your order has been received.', created_at: new Date().toISOString() }],
  };

  state.cart = [];
  updateBadges();
  btn.textContent = 'Place Order';
  btn.disabled = false;

  renderConfirmation();
  navigateTo('screen-confirmation');
}

// ─── Confirmation ─────────────────────────────────────────────────────────────
function renderConfirmation() {
  const o = state.currentOrder;
  if (!o) return;
  document.getElementById('conf-id').textContent = o.order_number;
  document.getElementById('conf-date').textContent = new Date(o.created_at).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('conf-pay').textContent = o.payment_method;
  document.getElementById('conf-total').textContent = peso(o.total_amount);
}

// ─── Tracking ─────────────────────────────────────────────────────────────────
async function renderTracking() {
  const o = state.currentOrder;
  if (!o) return;

  if (o.order_number && o.id) {
    const fresh = await dbFetchTracking(o.order_number);
    if (fresh) Object.assign(state.currentOrder, fresh);
  }

  const order = state.currentOrder;
  const completedKeys = (order.trackingLogs || []).map(l => l.status);
  const currentStatus = order.status || 'Order Placed';
  const currentIdx = TRACKING_STEPS.findIndex(s => s.key === currentStatus);

  document.getElementById('track-order-number').textContent = order.order_number;
  document.getElementById('track-date').textContent = new Date(order.created_at).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' });
  document.getElementById('track-address').textContent = order.address;
  document.getElementById('track-payment').textContent = order.payment_method;
  document.getElementById('track-total').textContent = peso(order.total_amount);

  const badge = document.getElementById('track-status-badge');
  badge.textContent = currentStatus;
  badge.className = 'status-badge ' + (currentStatus === 'Delivered' ? 'status-delivered' : 'status-active');

  document.getElementById('track-timeline').innerHTML = TRACKING_STEPS.map((step, idx) => {
    const done = idx < currentIdx || completedKeys.includes(step.key);
    const current = idx === currentIdx;
    const log = (order.trackingLogs || []).find(l => l.status === step.key);
    const timeStr = log ? new Date(log.created_at).toLocaleString('en-PH', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : '';
    return `<div class="track-step ${done ? 'done' : ''} ${current ? 'current' : ''}">
      <div class="step-dot-wrap">
        <div class="step-dot">${done ? '✓' : current ? '●' : ''}</div>
        ${idx < TRACKING_STEPS.length - 1 ? '<div class="step-line"></div>' : ''}
      </div>
      <div class="step-body">
        <div class="step-label">${step.icon} ${step.label}</div>
        <div class="step-note">${log ? log.note : (current ? 'In progress...' : 'Waiting')}</div>
        <div class="step-time">${(done || current) ? timeStr : ''}</div>
      </div>
    </div>`;
  }).join('');

  const itemsEl = document.getElementById('track-items');
  if (itemsEl && order.items && order.items.length) {
    itemsEl.innerHTML = order.items.map(i => `
      <div class="track-item">
        <img src="${i.image || i.image_url || ''}" alt="${i.name || i.product_name}" class="track-item-img" loading="lazy">
        <div class="track-item-info">
          <div class="track-item-name">${i.name || i.product_name}</div>
          <div class="track-item-meta">${i.variation || i.selected_variation} · Qty ${i.qty || i.quantity}</div>
        </div>
        <div class="track-item-price">${peso(i.price || i.product_price)}</div>
      </div>`).join('');
  }
}

// ─── Search ───────────────────────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let timer;
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => searchProducts(input.value), 300); });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  initSupabase();
  await loadProducts();
  initSearch();
  updateBadges();
}

// ─── Public API ───────────────────────────────────────────────────────────────
window.app = {
  navigateTo, viewProduct, selectVariation, changeDetailQty,
  addToCart: () => addToCart(false),
  buyNow:    () => addToCart(true),
  updateCartQty, removeFromCart, selectPayment, submitOrder, filterByCategory,
};

document.addEventListener('DOMContentLoaded', init);
