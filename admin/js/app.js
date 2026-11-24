/* =========================================================
   NIHAYA Admin â€” Figma-Matched Data & LocalStorage Store
   ========================================================= */

(function () {
  const STORAGE_KEY = 'nihaya_figma_admin_v2';

  const DEFAULT_DATA = {
    categories: [
      { id: 'cat-cellphone', name: 'Cellphone', icon: 'smartphone' },
      { id: 'cat-laptop', name: 'Laptop', icon: 'laptop' },
      { id: 'cat-airbuds', name: 'Airbuds', icon: 'headphones' },
      { id: 'cat-charger', name: 'Charger', icon: 'plug-zap' },
      { id: 'cat-powerbank', name: 'Powerbank', icon: 'battery-charging' },
    ],

    products: [
      {
        id: 'PRD-1001',
        name: 'USB-C fast charger',
        category: 'Charger',
        price: 1299,
        stock: 48,
        sales: 312,
        featured: true,
        image: '',
        description: 'Compact 65W GaN USB-C fast charger for laptops, tablets, and phones.',
        boxContents: '65W charger, 2m USB-C cable, quick guide',
        specs: { brand: 'NIHAYA', model: 'GaN-65', ram: '', storage: '', display: '', battery: '', color: 'Matte White', warranty: '1 year' },
      },
      {
        id: 'PRD-1002',
        name: 'Phone case',
        category: 'Cellphone',
        price: 498,
        stock: 126,
        sales: 268,
        featured: false,
        image: '',
        description: 'Shockproof translucent matte case with MagSafe ring.',
        boxContents: 'Phone case, microfiber wipe',
        specs: { brand: 'NIHAYA', model: 'Shield Pro', ram: '', storage: '', display: '', battery: '', color: 'Forest Smoke', warranty: '6 months' },
      },
      {
        id: 'PRD-1003',
        name: 'Wireless earbuds',
        category: 'Airbuds',
        price: 2150,
        stock: 9,
        sales: 190,
        featured: true,
        image: '',
        description: 'Active noise cancelling true wireless earbuds with 36-hour case.',
        boxContents: 'Earbuds, charging case, ear tips, USB-C cable',
        specs: { brand: 'NIHAYA', model: 'AirBuds ANC', ram: '', storage: '', display: '', battery: '36 hours', color: 'Graphite', warranty: '1 year' },
      },
      {
        id: 'PRD-1004',
        name: 'Power bank 30,000 mAh',
        category: 'Powerbank',
        price: 799,
        stock: 4,
        sales: 154,
        featured: true,
        image: '',
        description: 'High-capacity PD fast-charging power bank with LED wattage display.',
        boxContents: 'Power bank, braided USB-C cable',
        specs: { brand: 'NIHAYA', model: 'PB-30K', ram: '', storage: '', display: 'LED %', battery: '30,000 mAh', color: 'Obsidian', warranty: '1 year' },
      },
      {
        id: 'PRD-1005',
        name: 'Everyday laptop',
        category: 'Laptop',
        price: 24990,
        stock: 12,
        sales: 86,
        featured: true,
        image: '',
        description: 'Slim 14-inch aluminum ultrabook built for school and everyday productivity.',
        boxContents: 'Laptop, 65W USB-C charger, sleeve',
        specs: { brand: 'NIHAYA', model: 'Book 14', ram: '16 GB', storage: '512 GB SSD', display: '14-inch FHD IPS', battery: '12 hours', color: 'Silver', warranty: '2 years' },
      },
      {
        id: 'PRD-1006',
        name: 'Smartphone X',
        category: 'Cellphone',
        price: 12990,
        stock: 18,
        sales: 134,
        featured: true,
        image: '',
        description: '5G smartphone with 120Hz AMOLED display and 50MP OIS camera.',
        boxContents: 'Phone, 65W charger, USB-C cable, clear case',
        specs: { brand: 'NIHAYA', model: 'X 5G', ram: '8 GB', storage: '256 GB', display: '6.5-inch AMOLED', battery: '5,000 mAh', color: 'Phantom Black', warranty: '1 year' },
      },
      {
        id: 'PRD-1007',
        name: 'Budget friendly phone',
        category: 'Cellphone',
        price: 5990,
        stock: 0,
        sales: 94,
        featured: false,
        image: '',
        description: 'Reliable everyday smartphone with all-day battery life.',
        boxContents: 'Phone, charger, USB-C cable',
        specs: { brand: 'NIHAYA', model: 'Lite A1', ram: '6 GB', storage: '128 GB', display: '6.5-inch LCD', battery: '5,000 mAh', color: 'Mint Green', warranty: '1 year' },
      },
      {
        id: 'PRD-1008',
        name: 'Dual port wall charger',
        category: 'Charger',
        price: 699,
        stock: 64,
        sales: 142,
        featured: false,
        image: '',
        description: 'Dual USB-C + USB-A 35W travel wall adapter.',
        boxContents: 'Wall adapter, warranty card',
        specs: { brand: 'NIHAYA', model: 'Duo-35', ram: '', storage: '', display: '', battery: '', color: 'White', warranty: '1 year' },
      },
      {
        id: 'PRD-1009',
        name: 'Gaming laptop pro',
        category: 'Laptop',
        price: 54990,
        stock: 2,
        sales: 49,
        featured: true,
        image: '',
        description: '16-inch 165Hz QHD gaming powerhouse with RTX graphics.',
        boxContents: 'Laptop, 240W power brick',
        specs: { brand: 'NIHAYA', model: 'Pro 16G', ram: '32 GB', storage: '1 TB SSD', display: '16-inch QHD 165Hz', battery: '90 Wh', color: 'Slate Black', warranty: '2 years' },
      },
      {
        id: 'PRD-1010',
        name: 'AirBuds Lite',
        category: 'Airbuds',
        price: 1299,
        stock: 0,
        sales: 120,
        featured: false,
        image: '',
        description: 'Featherweight Bluetooth 5.4 earbuds with clear call mic.',
        boxContents: 'Earbuds, charging case, cable',
        specs: { brand: 'NIHAYA', model: 'Lite 5.4', ram: '', storage: '', display: '', battery: '24 hours', color: 'Pearl White', warranty: '1 year' },
      },
      {
        id: 'PRD-1011',
        name: 'Power bank 20,000 mAh',
        category: 'Powerbank',
        price: 1499,
        stock: 19,
        sales: 110,
        featured: false,
        image: '',
        description: 'Airline-safe slim aluminum power bank with built-in USB-C cable.',
        boxContents: 'Power bank, pouch',
        specs: { brand: 'NIHAYA', model: 'Slim-20K', ram: '', storage: '', display: '', battery: '20,000 mAh', color: 'Space Gray', warranty: '1 year' },
      },
      {
        id: 'PRD-1012',
        name: 'Braided USB-C cable 2m',
        category: 'Charger',
        price: 349,
        stock: 5,
        sales: 215,
        featured: false,
        image: '',
        description: '100W PD nylon braided cable tested for 20,000 bends.',
        boxContents: '2m USB-C cable, velcro tie',
        specs: { brand: 'NIHAYA', model: 'C-100W', ram: '', storage: '', display: '', battery: '', color: 'Charcoal', warranty: '1 year' },
      },
    ],

    customers: [
      { id: 'CUS-1', name: 'Maria Santos', email: 'maria.s@email.com', phone: '+63 917 482 1920', orders: 12, totalSpent: 18450, status: 'Active', joined: '2026-02-14' },
      { id: 'CUS-2', name: 'John Dela Cruz', email: 'john.d@email.com', phone: '+63 918 551 0394', orders: 8, totalSpent: 9980, status: 'Active', joined: '2026-03-08' },
      { id: 'CUS-3', name: 'Ana Reyes', email: 'ana.r@email.com', phone: '+63 927 891 4412', orders: 5, totalSpent: 6200, status: 'Active', joined: '2026-04-21' },
      { id: 'CUS-4', name: 'Leo Perez', email: 'leo.p@email.com', phone: '+63 917 663 9021', orders: 3, totalSpent: 2397, status: 'Inactive', joined: '2026-05-19' },
      { id: 'CUS-5', name: 'Carlo Mendoza', email: 'carlo.m@email.com', phone: '+63 919 304 7718', orders: 1, totalSpent: 1299, status: 'New', joined: '2026-11-05' },
      { id: 'CUS-6', name: 'Bea Tolentino', email: 'bea.t@email.com', phone: '+63 915 772 6100', orders: 6, totalSpent: 7850, status: 'Active', joined: '2026-06-11' },
      { id: 'CUS-7', name: 'Paolo Garcia', email: 'paolo.g@email.com', phone: '+63 917 119 8832', orders: 2, totalSpent: 3150, status: 'New', joined: '2026-11-08' },
      { id: 'CUS-8', name: 'Lia Fernandez', email: 'lia.f@email.com', phone: '+63 928 441 5520', orders: 9, totalSpent: 12640, status: 'Active', joined: '2026-02-28' },
    ],

    orders: [
      { id: '10482', customerName: 'Maria S.', fullCustomer: 'Maria Santos', email: 'maria.s@email.com', item: 'USB-C fast charger', total: 1374, date: 'Nov 10', paymentMethod: 'GCash', paymentStatus: 'Paid', status: 'Processing', address: '42 Katipunan Ave, Quezon City' },
      { id: '10481', customerName: 'John D.', fullCustomer: 'John Dela Cruz', email: 'john.d@email.com', item: 'Phone case', total: 573, date: 'Nov 9', paymentMethod: 'Maya', paymentStatus: 'Paid', status: 'Shipped', address: '18 Ayala Ave, Makati City' },
      { id: '10480', customerName: 'Ana R.', fullCustomer: 'Ana Reyes', email: 'ana.r@email.com', item: 'Wireless earbuds', total: 2225, date: 'Nov 9', paymentMethod: 'Credit Card', paymentStatus: 'Paid', status: 'Delivered', address: '105 BGC High St, Taguig' },
      { id: '10479', customerName: 'Leo P.', fullCustomer: 'Leo Perez', email: 'leo.p@email.com', item: 'Power bank 30,000 mAh', total: 874, date: 'Nov 8', paymentMethod: 'GCash', paymentStatus: 'Pending', status: 'Pending', address: '88 Ortigas Ave, Pasig City' },
      { id: '10478', customerName: 'Bea T.', fullCustomer: 'Bea Tolentino', email: 'bea.t@email.com', item: 'USB-C fast charger', total: 1299, date: 'Nov 8', paymentMethod: 'Credit Card', paymentStatus: 'Paid', status: 'Delivered', address: '12 Session Rd, Baguio City' },
      { id: '10477', customerName: 'Paolo G.', fullCustomer: 'Paolo Garcia', email: 'paolo.g@email.com', item: 'Phone case', total: 573, date: 'Nov 7', paymentMethod: 'COD', paymentStatus: 'Pending', status: 'Pending', address: '204 IT Park, Cebu City' },
      { id: '10476', customerName: 'Lia F.', fullCustomer: 'Lia Fernandez', email: 'lia.f@email.com', item: 'Wireless earbuds', total: 2225, date: 'Nov 6', paymentMethod: 'Maya', paymentStatus: 'Paid', status: 'Shipped', address: '51 J.P. Laurel Ave, Davao City' },
      { id: '10475', customerName: 'Carlo M.', fullCustomer: 'Carlo Mendoza', email: 'carlo.m@email.com', item: 'Power bank 30,000 mAh', total: 874, date: 'Nov 5', paymentMethod: 'GCash', paymentStatus: 'Paid', status: 'Delivered', address: '33 Shaw Blvd, Mandaluyong' },
    ],

    promotions: [
      { id: 'PRM-1', name: 'Holiday Sale', subtitle: '20% off chargers', scope: 'applies to all chargers', code: 'HOLIDAY20', discount: '20% off', period: 'Nov 1 - Dec 31', status: 'Active' },
      { id: 'PRM-2', name: 'Free Shipping', subtitle: 'over \u20B11,500', scope: 'nationwide', code: 'FREESHIP', discount: '\u20B11,500+', period: 'Nov 1 - Nov 30', status: 'Active' },
      { id: 'PRM-3', name: 'Black Friday', subtitle: '30% off storewide', scope: 'all products', code: 'BLACKFRIDAY', discount: '30% off', period: 'Nov 27 - Nov 30', status: 'Scheduled' },
      { id: 'PRM-4', name: 'Back to School', subtitle: '15% off laptops', scope: 'selected laptops', code: 'SCHOOL15', discount: '15% off', period: 'Jun 1 - Jul 15', status: 'Ended' },
      { id: 'PRM-5', name: 'Midyear Sale', subtitle: '10% off accessories', scope: 'accessories', code: 'MIDYEAR10', discount: '10% off', period: 'Jun 1 - Jun 30', status: 'Ended' },
    ],

    banner: {
      title: 'Holiday Sale',
      subtitle: 'Up to 20% off chargers',
      cta: 'Shop now',
      active: true,
      schedule: 'Nov 1 - Dec 31',
      impressions: 18920,
      clicks: 1284,
      clickRate: '6.8%',
    },

    account: {
      fullName: 'Racman',
      role: 'Store admin',
      username: 'racman',
      email: 'admin@example.com',
      mobile: '+63 9XX XXX XXXX',
      photo: '',
    },

    weeklyOrders: [
      { day: 'Mon', count: 20 },
      { day: 'Tue', count: 34 },
      { day: 'Wed', count: 54 },
      { day: 'Thu', count: 65 },
      { day: 'Fri', count: 45 },
      { day: 'Sat', count: 20 },
      { day: 'Sun', count: 25 },
    ],
  };

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_DATA);
      return Object.assign(clone(DEFAULT_DATA), JSON.parse(raw));
    } catch {
      return clone(DEFAULT_DATA);
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  window.NIHAYA_STORE = {
    get() {
      return state;
    },
    save,
    reset() {
      state = clone(DEFAULT_DATA);
      save();
    },
    addProduct(data) {
      const item = Object.assign(
        {
          id: 'PRD-' + (1001 + state.products.length + Math.floor(Math.random() * 40)),
          sales: 0,
          featured: false,
          image: '',
          description: '',
          boxContents: '',
          specs: {},
        },
        data,
        {
          price: Number(data.price) || 0,
          stock: Math.max(0, Number(data.stock) || 0),
        }
      );
      state.products.unshift(item);
      save();
      return item;
    },
    updateProduct(id, updates) {
      const idx = state.products.findIndex((p) => p.id === id);
      if (idx === -1) return;
      state.products[idx] = Object.assign({}, state.products[idx], updates, {
        price: updates.price !== undefined ? Number(updates.price) || 0 : state.products[idx].price,
        stock: updates.stock !== undefined ? Math.max(0, Number(updates.stock) || 0) : state.products[idx].stock,
      });
      save();
    },
    deleteProduct(id) {
      state.products = state.products.filter((p) => p.id !== id);
      save();
    },
    addCategory(cat) {
      state.categories.push({
        id: 'cat-' + Date.now(),
        name: cat.name.trim(),
        icon: cat.icon || 'package',
      });
      save();
    },
    updateCategory(id, updates) {
      const c = state.categories.find((x) => x.id === id);
      if (!c) return;
      const oldName = c.name;
      Object.assign(c, updates);
      if (updates.name && updates.name !== oldName) {
        state.products.forEach((p) => {
          if (p.category === oldName) p.category = updates.name;
        });
      }
      save();
    },
    deleteCategory(id) {
      state.categories = state.categories.filter((c) => c.id !== id);
      save();
    },
    updateOrderStatus(id, status) {
      const o = state.orders.find((x) => x.id === id);
      if (!o) return;
      o.status = status;
      if (status === 'Delivered' && o.paymentStatus === 'Pending') o.paymentStatus = 'Paid';
      save();
    },
    updateCustomerStatus(id, status) {
      const c = state.customers.find((x) => x.id === id);
      if (!c) return;
      c.status = status;
      save();
    },
    addPromotion(promo) {
      state.promotions.unshift(
        Object.assign({ id: 'PRM-' + Date.now() }, promo, {
          code: String(promo.code || '').trim().toUpperCase(),
        })
      );
      save();
    },
    updatePromotion(id, updates) {
      const p = state.promotions.find((x) => x.id === id);
      if (!p) return;
      Object.assign(p, updates);
      if (p.code) p.code = p.code.toUpperCase();
      save();
    },
    deletePromotion(id) {
      state.promotions = state.promotions.filter((p) => p.id !== id);
      save();
    },
    updateBanner(updates) {
      Object.assign(state.banner, updates);
      save();
    },
    updateAccount(updates) {
      Object.assign(state.account, updates);
      save();
    },
  };
})();


/* =========================================================
   NIHAYA Admin â€” UI Helpers (Figma Badges, Modals, Toasts)
   ========================================================= */

(function () {
  const ICON_MAP = {
    Cellphone: 'smartphone',
    Laptop: 'laptop',
    Airbuds: 'headphones',
    Charger: 'plug-zap',
    Powerbank: 'battery-charging',
  };

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatPeso(n) {
    return '\u20B1' + (Number(n) || 0).toLocaleString('en-PH', { maximumFractionDigits: 0 });
  }

  function getStockLabel(stock) {
    const q = Number(stock) || 0;
    if (q <= 0) return 'Out of stock';
    if (q <= 9) return 'Low stock';
    return 'In stock';
  }

  function statusPill(status) {
    const map = {
      'In stock': 'pill-green',
      'Low stock': 'pill-red',
      'Out of stock': 'pill-gray',
      Active: 'pill-green',
      New: 'pill-mid',
      Inactive: 'pill-gray',
      Processing: 'pill-mid',
      Shipped: 'pill-mid',
      Delivered: 'pill-green',
      Pending: 'pill-green',
      Scheduled: 'pill-mid',
      Ended: 'pill-gray',
    };
    const cls = map[status] || 'pill-gray';
    return `<span class="status-pill ${cls}">${esc(status)}</span>`;
  }

  function categoryIcon(nameOrIcon) {
    return ICON_MAP[nameOrIcon] || nameOrIcon || 'package';
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function toast(message) {
    const wrap = document.getElementById('toast-container');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i data-lucide="check-circle-2" style="color:#86efac"></i><span>${esc(message)}</span>`;
    wrap.appendChild(el);
    refreshIcons();
    setTimeout(() => el.remove(), 3000);
  }

  function openModal({ title, subtitle = '', bodyHTML = '', footerHTML = '', size = 'md' }) {
    const root = document.getElementById('modal-root');
    const box = document.getElementById('modal-box');
    const titleEl = document.getElementById('modal-title');
    const subEl = document.getElementById('modal-subtitle');
    const bodyEl = document.getElementById('modal-body');
    const footerEl = document.getElementById('modal-footer');

    box.className = 'modal-box' + (size === 'sm' ? ' modal-sm' : size === 'lg' ? ' modal-lg' : '');
    titleEl.textContent = title;
    subEl.textContent = subtitle;
    subEl.classList.toggle('hidden', !subtitle);
    bodyEl.innerHTML = bodyHTML;

    if (footerHTML) {
      footerEl.innerHTML = footerHTML;
      footerEl.classList.remove('hidden');
    } else {
      footerEl.innerHTML = '';
      footerEl.classList.add('hidden');
    }
    root.classList.remove('hidden');
    refreshIcons();
  }

  function closeModal() {
    document.getElementById('modal-root')?.classList.add('hidden');
  }

  let confirmCb = null;
  function confirmDialog({ title, message, confirmLabel = 'Confirm', danger = true, onConfirm }) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    const okBtn = document.getElementById('confirm-ok-btn');
    okBtn.textContent = confirmLabel;
    okBtn.className = danger ? 'btn-danger' : 'btn-solid';
    confirmCb = onConfirm;
    document.getElementById('confirm-root').classList.remove('hidden');
    refreshIcons();
  }

  function closeConfirm() {
    document.getElementById('confirm-root')?.classList.add('hidden');
    confirmCb = null;
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]')) closeModal();
    if (e.target.closest('[data-confirm-close]')) closeConfirm();
    if (e.target.closest('#confirm-ok-btn')) {
      const cb = confirmCb;
      closeConfirm();
      if (typeof cb === 'function') cb();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeConfirm();
    }
  });

  window.NIHAYA_UI = {
    esc,
    formatPeso,
    getStockLabel,
    statusPill,
    categoryIcon,
    refreshIcons,
    toast,
    openModal,
    closeModal,
    confirmDialog,
  };
})();


/* =========================================================
   NIHAYA Admin â€” Core Figma Screens:
   Dashboard, Products (Categories & All Items), Add Product
   ========================================================= */

(function () {
  const UI = window.NIHAYA_UI;
  const Store = window.NIHAYA_STORE;

  const uiState = {
    catSearch: '',
    prodSearch: '',
    prodFilter: 'All',
    prodCategory: 'All',
    prodSortKey: 'name',
    prodSortDir: 'asc',
    editingProductId: null,
  };

  /* -------------------------------------------------------
     1. DASHBOARD (Exact Figma frame 4:5)
     ------------------------------------------------------- */
  function renderDashboard(root) {
    const state = Store.get();
    const orderRevenue = state.orders.reduce((s, o) => s + o.total, 0);
    const totalRevenue = 1277000 + orderRevenue;
    const totalOrders = 992 + state.orders.length;
    const avgOrder = Math.round(totalRevenue / totalOrders);

    const lowStockItems = state.products.filter((p) => p.stock > 0 && p.stock <= 9);
    const outStockItems = state.products.filter((p) => p.stock === 0);
    const pendingOrders = state.orders.filter((o) => o.status === 'Pending').length;

    const maxBar = Math.max(...state.weeklyOrders.map((w) => w.count), 1);
    const recentOrders = state.orders.slice(0, 4);
    const bestSellers = [...state.products].sort((a, b) => b.sales - a.sales).slice(0, 4);
    const stockWatch = [...state.products].sort((a, b) => a.stock - b.stock).slice(0, 7);

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Overview</h1>
            <p>Welcome back, ${UI.esc(state.account.fullName)}. Here is how Nihaya is doing over the last 30 days.</p>
          </div>
        </section>

        <!-- Row 1: Revenue | Weekly Orders | Average visitors -->
        <section class="grid-dash-row1">
          <div class="card">
            <div class="card-head">
              <span class="chip">Revenue</span>
              <a href="./orders.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <p class="rev-big">${UI.formatPeso(totalRevenue)}</p>
            <p class="rev-sub">+12% vs. previous 30 days</p>
            <div class="mini-stats-3">
              <div>
                <div class="mini-stat-val">${totalOrders.toLocaleString()}</div>
                <div class="mini-stat-lbl">Orders</div>
              </div>
              <div>
                <div class="mini-stat-val">${UI.formatPeso(avgOrder)}</div>
                <div class="mini-stat-lbl">Avg. order</div>
              </div>
              <div>
                <div class="mini-stat-val">3.4%</div>
                <div class="mini-stat-lbl">Conversion</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <span class="chip">Weekly Orders</span>
              <a href="./orders.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="weekly-bars">
              ${state.weeklyOrders
                .map((w) => {
                  const pct = Math.max(18, Math.round((w.count / maxBar) * 100));
                  return `
                    <div class="bar-col">
                      <span class="bar-num">${w.count}</span>
                      <div class="bar-fill" style="height:${pct}%"></div>
                      <span class="bar-day">${w.day}</span>
                    </div>`;
                })
                .join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <span class="chip">Average visitors</span>
              <a href="./customers.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="visitors-grid">
              <div>
                <div class="visitors-val">256</div>
                <div class="visitors-lbl">Per day</div>
              </div>
              <div>
                <div class="visitors-val">1,792</div>
                <div class="visitors-lbl">Per week</div>
              </div>
              <div>
                <div class="visitors-val">7,680</div>
                <div class="visitors-lbl">Per month</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Row 2: Recent orders | Alerts -->
        <section class="grid-dash-row2">
          <div class="card">
            <div class="card-head">
              <span class="chip">Recent orders</span>
              <a href="./orders.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="clean-list">
              ${recentOrders
                .map(
                  (o) => `
                  <div class="row-between clickable-row" data-dash-order="${UI.esc(o.id)}">
                    <span style="font-size:13.5px;font-weight:500">#${UI.esc(o.id)} &middot; ${UI.esc(o.customerName)}</span>
                    <div style="display:flex;align-items:center;gap:14px">
                      <span class="price-green" style="font-size:13.5px">${UI.formatPeso(o.total)}</span>
                      ${UI.statusPill(o.status)}
                    </div>
                  </div>`
                )
                .join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <span class="chip">Alerts</span>
              <a href="./products.html?view=all" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="clean-list">
              <a href="./products.html?view=all" class="row-between clickable-row">
                <span style="font-size:13.5px;color:var(--ink-dark)">Low stock</span>
                <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--primary)">
                  <span class="dot" style="background:var(--primary)"></span>${lowStockItems.length + outStockItems.length} items
                </span>
              </a>
              <a href="./orders.html" class="row-between clickable-row">
                <span style="font-size:13.5px;color:var(--ink-dark)">Failed payments</span>
                <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--danger)">
                  <span class="dot" style="background:var(--danger)"></span>${pendingOrders + 2}
                </span>
              </a>
              <a href="./orders.html" class="row-between clickable-row">
                <span style="font-size:13.5px;color:var(--ink-dark)">Pending orders</span>
                <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--primary)">
                  <span class="dot" style="background:var(--primary)"></span>${pendingOrders}
                </span>
              </a>
            </div>
          </div>
        </section>

        <!-- Row 3: Best sellers | Stock watch -->
        <section class="grid-dash-row2">
          <div class="card">
            <div class="card-head">
              <span class="chip">Best sellers</span>
              <a href="./products.html?view=all" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="clean-list">
              ${bestSellers
                .map(
                  (p) => `
                  <div class="row-between">
                    <span style="font-size:13.5px">${UI.esc(p.name)}</span>
                    <span style="font-size:13px;font-weight:600;color:var(--primary)">${p.sales} sold</span>
                  </div>`
                )
                .join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-head">
              <span class="chip">Stock watch</span>
              <a href="./products.html?view=all" class="view-all">View all <i data-lucide="arrow-right"></i></a>
            </div>
            <div class="clean-list">
              ${stockWatch
                .map((p) => {
                  const isLow = p.stock <= 5;
                  return `
                    <div class="row-between" style="padding:7px 0">
                      <span style="font-size:13px">${UI.esc(p.name)}</span>
                      <span class="status-pill ${isLow ? 'pill-red' : 'pill-green'}">${p.stock === 0 ? 'Out of stock' : p.stock + ' left'}</span>
                    </div>`;
                })
                .join('')}
            </div>
          </div>
        </section>
      </div>
    `;

    root.querySelectorAll('[data-dash-order]').forEach((el) => {
      el.addEventListener('click', () => window.NIHAYA_PAGES_OPS.openOrderModal(el.dataset.dashOrder));
    });
  }

  /* -------------------------------------------------------
     2. PRODUCTS â€” CATEGORIES (Exact Figma Admin v2 â€” Improved)
     ------------------------------------------------------- */
  function renderProductsCategories(root) {
    const state = Store.get();
    const q = uiState.catSearch.trim().toLowerCase();
    const filtered = state.categories.filter((c) => !q || c.name.toLowerCase().includes(q));

    const lowCount = state.products.filter((p) => p.stock > 0 && p.stock <= 9).length;
    const outCount = state.products.filter((p) => p.stock === 0).length;

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Products</h1>
            <p>${state.products.length} products in ${state.categories.length} categories. ${lowCount} are low on stock and ${outCount} ${outCount === 1 ? 'is' : 'are'} out of stock.</p>
          </div>
          <div class="hero-controls">
            <div class="hero-search">
              <i data-lucide="search"></i>
              <input id="cat-search-input" type="text" value="${UI.esc(uiState.catSearch)}" placeholder="Search categories" />
            </div>
            <button type="button" id="hero-add-cat-btn" class="btn-text-white">Add category</button>
          </div>
        </section>

        <section class="grid-3">
          ${filtered
            .map((cat) => {
              const items = state.products.filter((p) => p.category === cat.name);
              const ok = items.filter((p) => p.stock > 9).length;
              const low = items.filter((p) => p.stock > 0 && p.stock <= 9).length;
              const out = items.filter((p) => p.stock === 0).length;
              const total = Math.max(items.length, 1);

              return `
                <div class="card cat-card">
                  <div class="cat-preview" data-open-cat="${UI.esc(cat.name)}">
                    <div class="cat-icon-art">
                      <i data-lucide="${UI.esc(UI.categoryIcon(cat.icon || cat.name))}"></i>
                    </div>
                    <div class="cat-preview-tools">
                      <button type="button" class="cat-tool-btn" data-edit-cat="${UI.esc(cat.id)}" title="Edit category"><i data-lucide="pencil"></i></button>
                      <button type="button" class="cat-tool-btn danger" data-del-cat="${UI.esc(cat.id)}" title="Delete category"><i data-lucide="trash-2"></i></button>
                    </div>
                  </div>

                  <div class="row-between">
                    <div>
                      <h3 style="margin:0;font-size:18px;font-weight:700">${UI.esc(cat.name)}</h3>
                      <p style="margin:3px 0 0;font-size:12.5px;color:var(--ink-subtle)">${items.length} ${items.length === 1 ? 'product' : 'products'}</p>
                    </div>
                    <button type="button" class="cat-go-btn" data-open-cat="${UI.esc(cat.name)}" title="View ${UI.esc(cat.name)} products">
                      <i data-lucide="chevron-right"></i>
                    </button>
                  </div>

                  <div class="stock-bar">
                    ${ok > 0 ? `<div class="seg-ok" style="width:${(ok / total) * 100}%"></div>` : ''}
                    ${low > 0 ? `<div class="seg-low" style="width:${(low / total) * 100}%"></div>` : ''}
                    ${out > 0 ? `<div class="seg-out" style="width:${(out / total) * 100}%"></div>` : ''}
                  </div>
                  <div class="stock-legend">
                    <span><span class="dot" style="background:var(--primary)"></span>${ok} in stock</span>
                    ${low > 0 ? `<span><span class="dot" style="background:var(--danger)"></span>${low} low stock</span>` : ''}
                    ${out > 0 ? `<span><span class="dot" style="background:#9ca3af"></span>${out} out of stock</span>` : ''}
                  </div>
                </div>`;
            })
            .join('')}

          <button type="button" id="dashed-add-cat-btn" class="cat-add-dashed">
            <span class="cat-add-plus"><i data-lucide="plus"></i></span>
            <span>Add category</span>
          </button>
        </section>
      </div>
    `;

    root.querySelector('#cat-search-input').addEventListener('input', (e) => {
      uiState.catSearch = e.target.value;
      window.NIHAYA_APP.rerenderKeepFocus('cat-search-input');
    });
    root.querySelector('#hero-add-cat-btn').addEventListener('click', () => openCategoryModal(null));
    root.querySelector('#dashed-add-cat-btn').addEventListener('click', () => openCategoryModal(null));

    root.querySelectorAll('[data-open-cat]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.cat-preview-tools')) return;
        window.location.href = './products.html?view=all&category=' + encodeURIComponent(el.dataset.openCat);
      });
    });

    root.querySelectorAll('[data-edit-cat]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCategoryModal(btn.dataset.editCat);
      });
    });

    root.querySelectorAll('[data-del-cat]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cat = Store.get().categories.find((c) => c.id === btn.dataset.delCat);
        if (!cat) return;
        UI.confirmDialog({
          title: `Delete "${cat.name}"?`,
          message: 'This category will be removed from the Products grid. Existing products stay in All products.',
          confirmLabel: 'Delete',
          danger: true,
          onConfirm: () => {
            Store.deleteCategory(cat.id);
            UI.toast(`Deleted category "${cat.name}".`);
            window.NIHAYA_APP.render();
          },
        });
      });
    });
  }

  function openCategoryModal(catId) {
    const existing = catId ? Store.get().categories.find((c) => c.id === catId) : null;
    const icons = ['smartphone', 'laptop', 'headphones', 'plug-zap', 'battery-charging', 'watch'];
    let picked = existing?.icon || 'smartphone';

    UI.openModal({
      title: existing ? `Manage Category - ${existing.name}` : 'New Category',
      size: 'sm',
      bodyHTML: `
        <form id="cat-form" class="page-stack" style="gap:14px">
          <div>
            <label class="field-label">Category Name *</label>
            <input name="name" required class="figma-input" value="${UI.esc(existing?.name || '')}" placeholder="e.g. Smartwatches" />
          </div>
          <div>
            <label class="field-label">Category Icon</label>
            <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px">
              ${icons
                .map(
                  (ic) => `
                  <button type="button" data-ic="${ic}" style="height:40px;border-radius:10px;border:1px solid #cfe5d8;display:flex;align-items:center;justify-content:center;background:${picked === ic ? '#0f6b36' : '#e3efe7'};color:${picked === ic ? '#fff' : '#0f6b36'}">
                    <i data-lucide="${ic}" style="width:18px;height:18px"></i>
                  </button>`
                )
                .join('')}
            </div>
          </div>
        </form>
      `,
      footerHTML: `
        <button type="button" class="btn-outline" data-modal-close>Cancel</button>
        <button type="submit" form="cat-form" class="btn-solid">${existing ? 'Save Changes' : 'Add Category'}</button>
      `,
    });

    document.querySelectorAll('[data-ic]').forEach((b) => {
      b.addEventListener('click', () => {
        picked = b.dataset.ic;
        document.querySelectorAll('[data-ic]').forEach((x) => {
          x.style.background = '#e3efe7';
          x.style.color = '#0f6b36';
        });
        b.style.background = '#0f6b36';
        b.style.color = '#fff';
      });
    });

    document.getElementById('cat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = new FormData(e.target).get('name');
      if (existing) {
        Store.updateCategory(existing.id, { name, icon: picked });
        UI.toast('Category updated.');
      } else {
        Store.addCategory({ name, icon: picked });
        UI.toast(`Category "${name}" added.`);
      }
      UI.closeModal();
      window.NIHAYA_APP.render();
    });
  }

  /* -------------------------------------------------------
     3. PRODUCTS â€” ALL ITEMS (Exact Figma frame 298:1361)
     ------------------------------------------------------- */
  function renderProductsAll(root) {
    const state = Store.get();
    const q = uiState.prodSearch.trim().toLowerCase();

    const lowCount = state.products.filter((p) => p.stock > 0 && p.stock <= 9).length;
    const outCount = state.products.filter((p) => p.stock === 0).length;

    const filtered = state.products
      .filter((p) => {
        const st = UI.getStockLabel(p.stock);
        const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
        const matchF = uiState.prodFilter === 'All' || st === uiState.prodFilter;
        const matchCat = uiState.prodCategory === 'All' || p.category === uiState.prodCategory;
        return matchQ && matchF && matchCat;
      })
      .sort((a, b) => {
        const dir = uiState.prodSortDir === 'asc' ? 1 : -1;
        if (uiState.prodSortKey === 'price' || uiState.prodSortKey === 'stock') {
          return (a[uiState.prodSortKey] - b[uiState.prodSortKey]) * dir;
        }
        return String(a[uiState.prodSortKey] || '').localeCompare(String(b[uiState.prodSortKey] || '')) * dir;
      });

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>All products</h1>
            <p>${state.products.length} products across ${state.categories.length} categories &middot; ${lowCount} low on stock${uiState.prodCategory !== 'All' ? ` &middot; Filtered: ${UI.esc(uiState.prodCategory)}` : ''}</p>
          </div>
          <div class="hero-controls">
            <div class="hero-search">
              <i data-lucide="search"></i>
              <input id="prod-all-search" type="text" value="${UI.esc(uiState.prodSearch)}" placeholder="Search by product name" />
            </div>
            <button type="button" id="go-add-product-btn" class="btn-hero-green">Add Product</button>
          </div>
        </section>

        <!-- 3 Centered KPI Cards -->
        <section class="grid-3">
          <div class="card kpi-card">
            <span class="chip">Total products</span>
            <p class="kpi-value">${state.products.length}</p>
          </div>
          <div class="card kpi-card">
            <span class="chip">Low stock</span>
            <p class="kpi-value">${lowCount}</p>
          </div>
          <div class="card kpi-card">
            <span class="chip">Out of stock</span>
            <p class="kpi-value">${outCount}</p>
          </div>
        </section>

        <!-- Table Card -->
        <section class="card">
          <div class="card-head">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span class="chip">All products</span>
              ${
                uiState.prodCategory !== 'All'
                  ? `<button type="button" id="clear-cat-filter" class="filter-pill active">${UI.esc(uiState.prodCategory)} &times;</button>`
                  : `<a href="./products.html" class="view-all" style="margin-left:6px">Browse categories <i data-lucide="arrow-right"></i></a>`
              }
            </div>
            <div class="filter-pills">
              ${['All', 'In stock', 'Low stock', 'Out of stock']
                .map((tab) => `<button type="button" class="filter-pill ${uiState.prodFilter === tab ? 'active' : ''}" data-pf="${tab}">${tab}</button>`)
                .join('')}
            </div>
          </div>

          <div class="table-scroll">
            <table class="figma-table">
              <thead>
                <tr>
                  <th class="sortable" data-psort="name">PRODUCT</th>
                  <th>CATEGORY</th>
                  <th class="sortable" data-psort="price">PRICE</th>
                  <th class="sortable" data-psort="stock">STOCK</th>
                  <th>STATUS</th>
                  <th class="text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--ink-subtle)">No matching products found.</td></tr>`
                    : filtered
                        .map((p) => {
                          const st = UI.getStockLabel(p.stock);
                          const initial = (p.name[0] || 'P').toUpperCase();
                          return `
                            <tr>
                              <td>
                                <div class="name-cell">
                                  <span class="initial-badge">${p.image ? `<img src="${UI.esc(p.image)}" alt="" />` : initial}</span>
                                  <span>${UI.esc(p.name)}</span>
                                </div>
                              </td>
                              <td style="color:var(--ink-muted)">${UI.esc(p.category)}</td>
                              <td class="price-green">${UI.formatPeso(p.price)}</td>
                              <td style="color:var(--primary);font-weight:600">${p.stock}</td>
                              <td>${UI.statusPill(st)}</td>
                              <td class="text-right">
                                <button type="button" class="btn-outline-sm" data-edit-prod="${UI.esc(p.id)}">Edit</button>
                              </td>
                            </tr>`;
                        })
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    root.querySelector('#prod-all-search').addEventListener('input', (e) => {
      uiState.prodSearch = e.target.value;
      window.NIHAYA_APP.rerenderKeepFocus('prod-all-search');
    });
    root.querySelector('#go-add-product-btn').addEventListener('click', () => {
      window.location.href = './add-product.html';
    });
    root.querySelector('#clear-cat-filter')?.addEventListener('click', () => {
      uiState.prodCategory = 'All';
      window.location.href = './products.html?view=all';
    });
    root.querySelectorAll('[data-pf]').forEach((b) =>
      b.addEventListener('click', () => {
        uiState.prodFilter = b.dataset.pf;
        window.NIHAYA_APP.render();
      })
    );
    root.querySelectorAll('[data-psort]').forEach((th) =>
      th.addEventListener('click', () => {
        const k = th.dataset.psort;
        if (uiState.prodSortKey === k) uiState.prodSortDir = uiState.prodSortDir === 'asc' ? 'desc' : 'asc';
        else {
          uiState.prodSortKey = k;
          uiState.prodSortDir = 'asc';
        }
        window.NIHAYA_APP.render();
      })
    );
    root.querySelectorAll('[data-edit-prod]').forEach((b) =>
      b.addEventListener('click', () => {
        window.location.href = './add-product.html?id=' + encodeURIComponent(b.dataset.editProd);
      })
    );
  }

  /* -------------------------------------------------------
     4. ADD / EDIT PRODUCT (Exact Figma frame 128:355)
     ------------------------------------------------------- */
  function renderAddProduct(root) {
    const state = Store.get();
    const urlId = new URLSearchParams(window.location.search).get('id');
    const targetId = urlId || uiState.editingProductId;
    const editing = targetId ? state.products.find((p) => p.id === targetId) : null;

    let mainImage = editing?.image || '';
    let featured = editing ? Boolean(editing.featured) : true;
    const selectedCategory = editing?.category || state.categories[0]?.name || 'Cellphone';
    const sp = editing?.specs || {};

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>${editing ? 'Edit Product' : 'Add Product'}</h1>
            <p>${editing ? `Update details for ${UI.esc(editing.name)}.` : 'Fill in the details below to add a new product to your shop.'}</p>
          </div>
          <div class="hero-controls">
            <a href="./products.html?view=all" class="btn-white">Back to Products</a>
          </div>
        </section>

        <form id="figma-add-product-form" class="card">
          <div class="grid-add-product">
            <!-- Left Column: Picture, Gallery, Description, Box -->
            <div class="page-stack" style="gap:16px">
              <div>
                <label class="field-label">Product Picture *</label>
                <div class="upload-dropzone" id="ap-dropzone">
                  ${
                    mainImage
                      ? `<img src="${UI.esc(mainImage)}" alt="Preview" style="max-height:130px;border-radius:12px;object-fit:contain" />`
                      : `<i data-lucide="upload" style="width:28px;height:28px;color:var(--primary)"></i>
                         <div style="font-weight:500;color:var(--primary)">Drag & drop an image here</div>
                         <div style="font-size:12px;color:var(--ink-subtle)">or</div>`
                  }
                  <label class="btn-solid" style="height:36px;padding:0 20px;font-size:13px;cursor:pointer">
                    Browse Files
                    <input id="ap-img-input" type="file" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="field-label">Gallery (Optional)</label>
                <div class="gallery-slots">
                  <div class="gallery-slot"><i data-lucide="plus"></i></div>
                  <div class="gallery-slot"><i data-lucide="plus"></i></div>
                  <div class="gallery-slot"><i data-lucide="plus"></i></div>
                </div>
                <p style="margin:8px 0 0;font-size:11.5px;color:var(--ink-subtle);line-height:1.4">
                  PNG or JPG, up to 5 MB. Square images look best on product cards.
                </p>
              </div>

              <div>
                <label class="field-label">Description</label>
                <textarea name="description" rows="2" class="figma-textarea" placeholder="Key features customers should know">${UI.esc(editing?.description || '')}</textarea>
              </div>

              <div>
                <label class="field-label">What's in the box</label>
                <input name="boxContents" class="figma-input" value="${UI.esc(editing?.boxContents || '')}" placeholder="e.g. Phone, 65W charger, USB-C cable" />
              </div>
            </div>

            <!-- Right Column: Name, Category/Price/Stock, Featured toggle, Specifications -->
            <div class="page-stack" style="gap:16px">
              <div>
                <label class="field-label">Product Name *</label>
                <input name="name" required class="figma-input" value="${UI.esc(editing?.name || '')}" placeholder="e.g. Samsung Galaxy S24" />
              </div>

              <div class="grid-3" style="gap:12px">
                <div>
                  <label class="field-label">Category *</label>
                  <select id="ap-category" name="category" class="figma-select">
                    ${state.categories
                      .map((c) => `<option value="${UI.esc(c.name)}" ${selectedCategory === c.name ? 'selected' : ''}>${UI.esc(c.name)}</option>`)
                      .join('')}
                  </select>
                </div>
                <div>
                  <label class="field-label">Price (PHP) *</label>
                  <input name="price" type="number" min="0" required class="figma-input" value="${UI.esc(editing?.price ?? '')}" placeholder="\u20B1 0.00" />
                </div>
                <div>
                  <label class="field-label">Stock *</label>
                  <input name="stock" type="number" min="0" required class="figma-input" value="${UI.esc(editing?.stock ?? '')}" placeholder="0" />
                </div>
              </div>

              <div class="row-between" style="padding:4px 0">
                <span style="font-size:13px;color:var(--ink-muted)">Feature on homepage</span>
                <div style="display:flex;align-items:center;gap:10px">
                  <button type="button" id="ap-featured-toggle" class="toggle-switch ${featured ? 'on' : ''}">
                    <span class="toggle-knob"></span>
                  </button>
                  <span style="font-size:12.5px;color:var(--ink-dark)">Show as featured arrival</span>
                </div>
              </div>

              <div style="border-top:1px solid #e6f0ea;padding-top:14px">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                  <strong style="font-size:15px;color:var(--primary)">Specifications</strong>
                  <span id="ap-spec-chip" class="chip" style="font-size:11.5px;padding:3px 10px">${UI.esc(selectedCategory)}</span>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  <div><label class="field-label">Brand</label><input name="brand" class="figma-input" value="${UI.esc(sp.brand || '')}" placeholder="e.g. Samsung" /></div>
                  <div><label class="field-label">Model</label><input name="model" class="figma-input" value="${UI.esc(sp.model || '')}" placeholder="e.g. Galaxy S24" /></div>
                  <div><label class="field-label">RAM</label><input name="ram" class="figma-input" value="${UI.esc(sp.ram || '')}" placeholder="e.g. 8 GB" /></div>
                  <div><label class="field-label">Storage</label><input name="storage" class="figma-input" value="${UI.esc(sp.storage || '')}" placeholder="e.g. 256 GB" /></div>
                  <div><label class="field-label">Display</label><input name="display" class="figma-input" value="${UI.esc(sp.display || '')}" placeholder="e.g. 6.2-inch AMOLED" /></div>
                  <div><label class="field-label">Battery</label><input name="battery" class="figma-input" value="${UI.esc(sp.battery || '')}" placeholder="e.g. 4,000 mAh" /></div>
                  <div><label class="field-label">Color</label><input name="color" class="figma-input" value="${UI.esc(sp.color || '')}" placeholder="e.g. Phantom Black" /></div>
                  <div><label class="field-label">Warranty</label><input name="warranty" class="figma-input" value="${UI.esc(sp.warranty || '')}" placeholder="e.g. 1 year" /></div>
                </div>
              </div>
            </div>
          </div>

          <div class="row-between" style="margin-top:22px;padding-top:16px;border-top:1px solid #e6f0ea;flex-wrap:wrap">
            <span style="font-size:12px;color:var(--ink-subtle)">* Required fields</span>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              ${editing ? `<button type="button" id="ap-delete-btn" class="btn-danger">Delete</button>` : ''}
              <a href="./products.html?view=all" class="btn-outline">Cancel</a>
              <button type="submit" class="btn-solid">${editing ? 'Save Changes' : 'Save Product'}</button>
            </div>
          </div>
        </form>
      </div>
    `;

    root.querySelector('#ap-category').addEventListener('change', (e) => {
      document.getElementById('ap-spec-chip').textContent = e.target.value;
    });

    root.querySelector('#ap-featured-toggle').addEventListener('click', (e) => {
      featured = !featured;
      e.currentTarget.classList.toggle('on', featured);
    });

    root.querySelector('#ap-img-input').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        mainImage = String(reader.result);
        const dz = document.getElementById('ap-dropzone');
        dz.innerHTML = `
          <img src="${UI.esc(mainImage)}" alt="Preview" style="max-height:130px;border-radius:12px;object-fit:contain" />
          <label class="btn-solid" style="height:36px;padding:0 20px;font-size:13px;cursor:pointer">
            Change Image
            <input id="ap-img-input-2" type="file" accept="image/*" class="hidden" />
          </label>`;
      };
      reader.readAsDataURL(file);
    });

    root.querySelector('#ap-delete-btn')?.addEventListener('click', () => {
      UI.confirmDialog({
        title: `Delete "${editing.name}"?`,
        message: 'This product will be permanently removed from your store catalog.',
        confirmLabel: 'Delete Product',
        danger: true,
        onConfirm: () => {
          Store.deleteProduct(editing.id);
          uiState.editingProductId = null;
          UI.toast(`Deleted "${editing.name}".`);
          window.location.href = './products.html?view=all';
        },
      });
    });

    root.querySelector('#figma-add-product-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        name: String(fd.get('name') || '').trim(),
        category: fd.get('category'),
        price: fd.get('price'),
        stock: fd.get('stock'),
        featured,
        image: mainImage,
        description: fd.get('description'),
        boxContents: fd.get('boxContents'),
        specs: {
          brand: fd.get('brand'),
          model: fd.get('model'),
          ram: fd.get('ram'),
          storage: fd.get('storage'),
          display: fd.get('display'),
          battery: fd.get('battery'),
          color: fd.get('color'),
          warranty: fd.get('warranty'),
        },
      };

      if (editing) {
        Store.updateProduct(editing.id, payload);
        UI.toast(`Updated "${payload.name}".`);
      } else {
        Store.addProduct(payload);
        UI.toast(`Added "${payload.name}" to your shop.`);
      }
      uiState.editingProductId = null;
      window.location.href = './products.html?view=all';
    });
  }

  window.NIHAYA_SET_PROD_CAT = (cat) => {
    uiState.prodCategory = cat || 'All';
  };

  window.NIHAYA_PAGES_CORE = {
    dashboard: renderDashboard,
    products: renderProductsCategories,
    'products-all': renderProductsAll,
    'add-product': renderAddProduct,
  };
})();


/* =========================================================
   NIHAYA Admin â€” Operations Figma Screens:
   Customers, Marketing, Orders, My Account
   ========================================================= */

(function () {
  const UI = window.NIHAYA_UI;
  const Store = window.NIHAYA_STORE;

  const opsState = {
    custSearch: '',
    custFilter: 'All',
    ordSearch: '',
    ordFilter: 'All',
  };

  /* -------------------------------------------------------
     5. CUSTOMERS (Exact Figma frame 29:1590)
     ------------------------------------------------------- */
  function renderCustomers(root) {
    const state = Store.get();
    const q = opsState.custSearch.trim().toLowerCase();

    const filtered = state.customers.filter((c) => {
      const matchQ = !q || c.email.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
      const matchF = opsState.custFilter === 'All' || c.status === opsState.custFilter;
      return matchQ && matchF;
    });

    const totalCustomers = 1240 + state.customers.length;
    const newThisMonth = 84 + state.customers.filter((c) => c.status === 'New').length;
    const repeatCustomers = 407 + state.customers.filter((c) => c.orders >= 2).length;

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Customers</h1>
            <p>${totalCustomers.toLocaleString()} customers &middot; ${newThisMonth} joined this month</p>
          </div>
          <div class="hero-controls">
            <div class="hero-search">
              <i data-lucide="search"></i>
              <input id="cust-search-input" type="text" value="${UI.esc(opsState.custSearch)}" placeholder="Search by email" />
            </div>
          </div>
        </section>

        <section class="grid-3">
          <div class="card kpi-card"><span class="chip">Total Customers</span><p class="kpi-value">${totalCustomers.toLocaleString()}</p></div>
          <div class="card kpi-card"><span class="chip">New This Month</span><p class="kpi-value">${newThisMonth}</p></div>
          <div class="card kpi-card"><span class="chip">Repeat customers</span><p class="kpi-value">${repeatCustomers}</p></div>
        </section>

        <section class="card">
          <div class="card-head">
            <span class="chip">All customers</span>
            <div class="filter-pills">
              ${['All', 'Active', 'New', 'Inactive']
                .map((tab) => `<button type="button" class="filter-pill ${opsState.custFilter === tab ? 'active' : ''}" data-cf="${tab}">${tab}</button>`)
                .join('')}
            </div>
          </div>

          <div class="table-scroll">
            <table class="figma-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>EMAIL</th>
                  <th>ORDERS</th>
                  <th>TOTAL SPENT</th>
                  <th>STATUS</th>
                  <th class="text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--ink-subtle)">No customers match your search.</td></tr>`
                    : filtered
                        .map(
                          (c) => `
                          <tr>
                            <td>
                              <div class="name-cell">
                                <span class="initial-badge">${UI.esc((c.name[0] || 'C').toUpperCase())}</span>
                                <span>${UI.esc(c.name)}</span>
                              </div>
                            </td>
                            <td style="color:var(--ink-muted)">${UI.esc(c.email)}</td>
                            <td>${c.orders}</td>
                            <td class="price-green">${UI.formatPeso(c.totalSpent)}</td>
                            <td>${UI.statusPill(c.status)}</td>
                            <td class="text-right">
                              <button type="button" class="btn-outline-sm" data-view-cust="${UI.esc(c.id)}">View</button>
                            </td>
                          </tr>`
                        )
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    root.querySelector('#cust-search-input').addEventListener('input', (e) => {
      opsState.custSearch = e.target.value;
      window.NIHAYA_APP.rerenderKeepFocus('cust-search-input');
    });
    root.querySelectorAll('[data-cf]').forEach((b) =>
      b.addEventListener('click', () => {
        opsState.custFilter = b.dataset.cf;
        window.NIHAYA_APP.render();
      })
    );
    root.querySelectorAll('[data-view-cust]').forEach((b) =>
      b.addEventListener('click', () => openCustomerModal(b.dataset.viewCust))
    );
  }

  function openCustomerModal(custId) {
    const state = Store.get();
    const c = state.customers.find((x) => x.id === custId);
    if (!c) return;
    const custOrders = state.orders.filter((o) => o.email === c.email);

    UI.openModal({
      title: c.name,
      subtitle: `${c.email} · ${c.phone}`,
      bodyHTML: `
        <div class="page-stack" style="gap:16px">
          <div class="info-box row-between" style="flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:12px">
              <span class="account-avatar-lg" style="width:46px;height:46px;font-size:17px">${UI.esc(c.name[0])}</span>
              <div>
                <div style="display:flex;align-items:center;gap:8px">
                  <strong>${UI.esc(c.name)}</strong>
                  ${UI.statusPill(c.status)}
                </div>
                <div style="font-size:12px;color:var(--ink-subtle);margin-top:2px">Joined ${UI.esc(c.joined)}</div>
              </div>
            </div>
            <select id="modal-cust-status" class="figma-select" style="width:auto;height:36px">
              ${['Active', 'New', 'Inactive']
                .map((s) => `<option value="${s}" ${c.status === s ? 'selected' : ''}>${s}</option>`)
                .join('')}
            </select>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="info-box"><div style="font-size:11.5px;color:var(--ink-subtle)">Total Orders</div><strong style="font-size:20px;color:var(--primary)">${c.orders}</strong></div>
            <div class="info-box"><div style="font-size:11.5px;color:var(--ink-subtle)">Total Spent</div><strong style="font-size:20px;color:var(--primary)">${UI.formatPeso(c.totalSpent)}</strong></div>
          </div>

          <div>
            <div class="field-label">Recent Orders</div>
            ${
              custOrders.length === 0
                ? `<div class="info-box" style="font-size:12.5px;color:var(--ink-subtle)">No orders in this period.</div>`
                : `<div class="clean-list">${custOrders
                    .map(
                      (o) => `
                      <div class="row-between">
                        <div><strong>#${o.id}</strong> &middot; <span style="color:var(--ink-muted)">${UI.esc(o.item)}</span></div>
                        <div style="display:flex;align-items:center;gap:10px"><span class="price-green">${UI.formatPeso(o.total)}</span>${UI.statusPill(o.status)}</div>
                      </div>`
                    )
                    .join('')}</div>`
            }
          </div>
        </div>
      `,
    });

    document.getElementById('modal-cust-status').addEventListener('change', (e) => {
      Store.updateCustomerStatus(c.id, e.target.value);
      UI.toast(`${c.name} marked as ${e.target.value}.`);
      window.NIHAYA_APP.render();
      openCustomerModal(c.id);
    });
  }

  /* -------------------------------------------------------
     6. MARKETING (Exact Figma frame 29:1592)
     ------------------------------------------------------- */
  function renderMarketing(root) {
    const state = Store.get();
    const activePromos = state.promotions.filter((p) => p.status === 'Active');
    const activeUpcoming = state.promotions.filter((p) => p.status === 'Active' || p.status === 'Scheduled');
    const b = state.banner;

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Marketing</h1>
            <p>Manage your promotions and the homepage banner.</p>
          </div>
        </section>

        <section class="grid-3">
          <div class="card kpi-card"><span class="chip">Active promos</span><p class="kpi-value">${activePromos.length}</p></div>
          <div class="card kpi-card"><span class="chip">Total promos</span><p class="kpi-value">${state.promotions.length}</p></div>
          <div class="card kpi-card"><span class="chip">Banner status</span><p class="kpi-value">${b.active ? 'Active' : 'Paused'}</p></div>
        </section>

        <section class="grid-marketing">
          <!-- Left Column: Active & upcoming + All promotions -->
          <div class="page-stack" style="gap:20px">
            <div class="card">
              <div class="card-head"><span class="chip">Active & upcoming</span></div>
              <div class="page-stack" style="gap:10px">
                ${
                  activeUpcoming.length === 0
                    ? `<p style="font-size:13px;color:var(--ink-subtle);margin:0">No active or scheduled promotions.</p>`
                    : activeUpcoming
                        .map(
                          (p) => `
                          <div class="promo-row">
                            <div>
                              <div style="font-size:14px;font-weight:600;color:var(--primary)">${UI.esc(p.name)}: ${UI.esc(p.subtitle)}</div>
                              <div style="font-size:12px;color:var(--ink-muted);margin-top:2px">${UI.esc(p.period)} &middot; ${UI.esc(p.scope)}</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                              <span class="promo-code-chip">${UI.esc(p.code)}</span>
                              ${UI.statusPill(p.status)}
                              <button type="button" class="btn-outline-sm" data-edit-promo="${UI.esc(p.id)}">Edit</button>
                            </div>
                          </div>`
                        )
                        .join('')
                }
              </div>
            </div>

            <div class="card">
              <div class="card-head"><span class="chip">All promotions</span></div>
              <div class="table-scroll">
                <table class="figma-table">
                  <thead>
                    <tr>
                      <th>PROMOTION</th>
                      <th>DISCOUNT</th>
                      <th>PERIOD</th>
                      <th>STATUS</th>
                      <th class="text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${state.promotions
                      .map(
                        (p) => `
                        <tr>
                          <td><strong>${UI.esc(p.name)}</strong></td>
                          <td class="price-green">${UI.esc(p.discount)}</td>
                          <td style="color:var(--ink-muted)">${UI.esc(p.period)}</td>
                          <td>${UI.statusPill(p.status)}</td>
                          <td class="text-right">
                            <button type="button" class="btn-outline-sm" data-edit-promo="${UI.esc(p.id)}">Edit</button>
                          </td>
                        </tr>`
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Right Column: Homepage banner card -->
          <div class="card">
            <div class="card-head"><span class="chip">Homepage banner</span></div>

            <div class="banner-preview-box">
              <h3>${UI.esc(b.title)}</h3>
              <p>${UI.esc(b.subtitle)}</p>
              <span class="btn-white" style="height:30px;padding:0 16px;font-size:12px">${UI.esc(b.cta)}</span>
            </div>

            <div class="clean-list" style="margin-bottom:18px">
              <div class="row-between">
                <span style="font-size:13px;color:var(--ink-muted)">Banner status</span>
                <div style="display:flex;align-items:center;gap:8px">
                  <button type="button" id="mkt-banner-toggle" class="toggle-switch ${b.active ? 'on' : ''}">
                    <span class="toggle-knob"></span>
                  </button>
                  <strong style="font-size:13px;color:var(--primary)">${b.active ? 'Active' : 'Paused'}</strong>
                </div>
              </div>
              <div class="row-between"><span style="font-size:13px;color:var(--ink-muted)">Schedule</span><strong style="font-size:13px">${UI.esc(b.schedule)}</strong></div>
              <div class="row-between"><span style="font-size:13px;color:var(--ink-muted)">Impressions</span><strong style="font-size:13px;color:var(--primary)">${b.impressions.toLocaleString()}</strong></div>
              <div class="row-between"><span style="font-size:13px;color:var(--ink-muted)">Clicks</span><strong style="font-size:13px;color:var(--primary)">${b.clicks.toLocaleString()}</strong></div>
              <div class="row-between"><span style="font-size:13px;color:var(--ink-muted)">Click rate</span><strong style="font-size:13px;color:var(--primary)">${UI.esc(b.clickRate)}</strong></div>
            </div>

            <div class="page-stack" style="gap:10px">
              <button type="button" id="mkt-create-promo-btn" class="btn-solid btn-full">Create Promotion</button>
              <button type="button" id="mkt-edit-banner-btn" class="btn-outline btn-full">Edit Banner</button>
            </div>
          </div>
        </section>
      </div>
    `;

    root.querySelector('#mkt-banner-toggle').addEventListener('click', () => {
      Store.updateBanner({ active: !b.active });
      UI.toast(`Homepage banner ${!b.active ? 'activated' : 'paused'}.`);
      window.NIHAYA_APP.render();
    });
    root.querySelector('#mkt-create-promo-btn').addEventListener('click', () => openPromoModal(null));
    root.querySelector('#mkt-edit-banner-btn').addEventListener('click', openBannerModal);
    root.querySelectorAll('[data-edit-promo]').forEach((btn) =>
      btn.addEventListener('click', () => openPromoModal(btn.dataset.editPromo))
    );
  }

  function openPromoModal(promoId) {
    const existing = promoId ? Store.get().promotions.find((p) => p.id === promoId) : null;
    UI.openModal({
      title: existing ? `Edit Promotion - ${existing.name}` : 'New Promotion',
      bodyHTML: `
        <form id="promo-form" class="page-stack" style="gap:14px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="field-label">Promotion Name *</label><input name="name" required class="figma-input" value="${UI.esc(existing?.name || '')}" placeholder="e.g. Holiday Sale" /></div>
            <div><label class="field-label">Coupon Code *</label><input name="code" required class="figma-input" style="text-transform:uppercase" value="${UI.esc(existing?.code || '')}" placeholder="HOLIDAY20" /></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="field-label">Discount *</label><input name="discount" required class="figma-input" value="${UI.esc(existing?.discount || '')}" placeholder="20% off" /></div>
            <div><label class="field-label">Period *</label><input name="period" required class="figma-input" value="${UI.esc(existing?.period || 'Nov 1 - Dec 31')}" /></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="field-label">Short Headline</label><input name="subtitle" class="figma-input" value="${UI.esc(existing?.subtitle || '')}" placeholder="20% off chargers" /></div>
            <div><label class="field-label">Applies To</label><input name="scope" class="figma-input" value="${UI.esc(existing?.scope || 'all products')}" /></div>
          </div>
          <div>
            <label class="field-label">Status</label>
            <select name="status" class="figma-select">
              ${['Active', 'Scheduled', 'Ended']
                .map((s) => `<option value="${s}" ${(existing?.status || 'Active') === s ? 'selected' : ''}>${s}</option>`)
                .join('')}
            </select>
          </div>
        </form>
      `,
      footerHTML: `
        ${existing ? `<button type="button" id="del-promo-btn" class="btn-danger" style="margin-right:auto">Delete</button>` : ''}
        <button type="button" class="btn-outline" data-modal-close>Cancel</button>
        <button type="submit" form="promo-form" class="btn-solid">${existing ? 'Save Changes' : 'Create Promotion'}</button>
      `,
    });

    document.getElementById('del-promo-btn')?.addEventListener('click', () => {
      UI.confirmDialog({
        title: `Delete "${existing.name}"?`,
        message: 'This promotion and its coupon code will be removed.',
        confirmLabel: 'Delete',
        danger: true,
        onConfirm: () => {
          Store.deletePromotion(existing.id);
          UI.closeModal();
          UI.toast(`Deleted promotion "${existing.name}".`);
          window.NIHAYA_APP.render();
        },
      });
    });

    document.getElementById('promo-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        name: fd.get('name'),
        code: fd.get('code'),
        discount: fd.get('discount'),
        period: fd.get('period'),
        subtitle: fd.get('subtitle') || fd.get('discount'),
        scope: fd.get('scope') || 'all products',
        status: fd.get('status'),
      };
      if (existing) {
        Store.updatePromotion(existing.id, payload);
        UI.toast('Promotion updated.');
      } else {
        Store.addPromotion(payload);
        UI.toast(`Promotion "${payload.name}" created.`);
      }
      UI.closeModal();
      window.NIHAYA_APP.render();
    });
  }

  function openBannerModal() {
    const b = Store.get().banner;
    UI.openModal({
      title: 'Edit Banner',
      subtitle: 'Update the live storefront hero banner preview.',
      size: 'sm',
      bodyHTML: `
        <form id="banner-form" class="page-stack" style="gap:14px">
          <div><label class="field-label">Headline</label><input name="title" required class="figma-input" value="${UI.esc(b.title)}" /></div>
          <div><label class="field-label">Subheadline</label><input name="subtitle" required class="figma-input" value="${UI.esc(b.subtitle)}" /></div>
          <div><label class="field-label">Button Label</label><input name="cta" required class="figma-input" value="${UI.esc(b.cta)}" /></div>
          <div><label class="field-label">Schedule</label><input name="schedule" required class="figma-input" value="${UI.esc(b.schedule)}" /></div>
        </form>
      `,
      footerHTML: `
        <button type="button" class="btn-outline" data-modal-close>Cancel</button>
        <button type="submit" form="banner-form" class="btn-solid">Save Banner</button>
      `,
    });

    document.getElementById('banner-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Store.updateBanner({
        title: fd.get('title'),
        subtitle: fd.get('subtitle'),
        cta: fd.get('cta'),
        schedule: fd.get('schedule'),
      });
      UI.closeModal();
      UI.toast('Homepage banner updated.');
      window.NIHAYA_APP.render();
    });
  }

  /* -------------------------------------------------------
     7. ORDERS (Exact Figma frame 29:1594)
     ------------------------------------------------------- */
  function renderOrders(root) {
    const state = Store.get();
    const q = opsState.ordSearch.trim().toLowerCase();

    const filtered = state.orders.filter((o) => {
      const matchQ =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.item.toLowerCase().includes(q);
      const matchF = opsState.ordFilter === 'All' || o.status === opsState.ordFilter;
      return matchQ && matchF;
    });

    const totalOrders = 992 + state.orders.length;
    const processingCount = 17 + state.orders.filter((o) => o.status === 'Processing').length;
    const deliveredCount = 840 + state.orders.filter((o) => o.status === 'Delivered').length;

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Orders</h1>
            <p>${totalOrders.toLocaleString()} orders &middot; ${processingCount} processing &middot; ${deliveredCount} delivered</p>
          </div>
          <div class="hero-controls">
            <div class="hero-search">
              <i data-lucide="search"></i>
              <input id="ord-search-input" type="text" value="${UI.esc(opsState.ordSearch)}" placeholder="Search by order #" />
            </div>
          </div>
        </section>

        <section class="grid-3">
          <div class="card kpi-card"><span class="chip">Total Orders</span><p class="kpi-value">${totalOrders.toLocaleString()}</p></div>
          <div class="card kpi-card"><span class="chip">Processing</span><p class="kpi-value">${processingCount}</p></div>
          <div class="card kpi-card"><span class="chip">Delivered</span><p class="kpi-value">${deliveredCount}</p></div>
        </section>

        <section class="card">
          <div class="card-head">
            <span class="chip">Recent orders</span>
            <div class="filter-pills">
              ${['All', 'Pending', 'Processing', 'Shipped', 'Delivered']
                .map((tab) => `<button type="button" class="filter-pill ${opsState.ordFilter === tab ? 'active' : ''}" data-of="${tab}">${tab}</button>`)
                .join('')}
            </div>
          </div>

          <div class="table-scroll">
            <table class="figma-table">
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>ITEM</th>
                  <th>TOTAL</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th class="text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--ink-subtle)">No orders match your filter.</td></tr>`
                    : filtered
                        .map(
                          (o) => `
                          <tr>
                            <td><strong style="color:var(--primary)">#${UI.esc(o.id)}</strong></td>
                            <td>${UI.esc(o.customerName)}</td>
                            <td style="color:var(--ink-muted)">${UI.esc(o.item)}</td>
                            <td class="price-green">${UI.formatPeso(o.total)}</td>
                            <td style="color:var(--ink-subtle)">${UI.esc(o.date)}</td>
                            <td>${UI.statusPill(o.status)}</td>
                            <td class="text-right">
                              <button type="button" class="btn-outline-sm" data-view-ord="${UI.esc(o.id)}">View</button>
                            </td>
                          </tr>`
                        )
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    root.querySelector('#ord-search-input').addEventListener('input', (e) => {
      opsState.ordSearch = e.target.value;
      window.NIHAYA_APP.rerenderKeepFocus('ord-search-input');
    });
    root.querySelectorAll('[data-of]').forEach((b) =>
      b.addEventListener('click', () => {
        opsState.ordFilter = b.dataset.of;
        window.NIHAYA_APP.render();
      })
    );
    root.querySelectorAll('[data-view-ord]').forEach((b) =>
      b.addEventListener('click', () => openOrderModal(b.dataset.viewOrd))
    );
  }

  function openOrderModal(orderId) {
    const o = Store.get().orders.find((x) => x.id === orderId);
    if (!o) return;

    UI.openModal({
      title: `Order #${o.id}`,
      subtitle: `${o.date} - ${o.paymentMethod} (${o.paymentStatus})`,
      bodyHTML: `
        <div class="page-stack" style="gap:16px">
          <div class="info-box" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <div class="field-label">Customer</div>
              <strong>${UI.esc(o.fullCustomer)}</strong>
              <div style="font-size:12px;color:var(--ink-muted)">${UI.esc(o.email)}</div>
            </div>
            <div>
              <div class="field-label">Shipping Address</div>
              <div style="font-size:12.5px;color:var(--ink-dark)">${UI.esc(o.address)}</div>
            </div>
          </div>

          <div class="info-box row-between">
            <div>
              <div class="field-label" style="margin-bottom:2px">Item</div>
              <strong>${UI.esc(o.item)}</strong>
            </div>
            <div style="text-align:right">
              <div class="field-label" style="margin-bottom:2px">Total</div>
              <strong style="font-size:18px;color:var(--primary)">${UI.formatPeso(o.total)}</strong>
            </div>
          </div>

          <div>
            <div class="field-label">Update Order Status</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
              ${['Pending', 'Processing', 'Shipped', 'Delivered']
                .map(
                  (st) => `
                  <button type="button" class="filter-pill ${o.status === st ? 'active' : ''}" data-ord-status="${st}" style="height:36px">
                    ${st}
                  </button>`
                )
                .join('')}
            </div>
          </div>
        </div>
      `,
    });

    document.querySelectorAll('[data-ord-status]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.ordStatus;
        Store.updateOrderStatus(o.id, next);
        UI.toast(`Order #${o.id} updated to ${next}.`);
        window.NIHAYA_APP.render();
        openOrderModal(o.id);
      });
    });
  }

  /* -------------------------------------------------------
     8. MY ACCOUNT (Exact Figma frame 222:866)
     ------------------------------------------------------- */
  function renderAccount(root) {
    const a = Store.get().account;
    let photo = a.photo || '';

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>My account</h1>
            <p>Manage your profile and sign-in details.</p>
          </div>
        </section>

        <section class="grid-account">
          <!-- Profile Card -->
          <form id="acct-profile-form" class="card page-stack" style="gap:16px">
            <div><span class="chip">Profile</span></div>

            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div class="account-avatar-lg" id="acct-avatar-box">
                ${photo ? `<img src="${UI.esc(photo)}" alt="" />` : UI.esc((a.fullName[0] || 'R').toUpperCase())}
              </div>
              <div>
                <div style="font-size:16px;font-weight:700;color:var(--primary)">${UI.esc(a.fullName)}</div>
                <div style="font-size:12.5px;color:var(--ink-subtle)">${UI.esc(a.role)}</div>
              </div>
              <label class="btn-outline" style="height:38px;padding:0 20px;font-size:13px;cursor:pointer">
                Change photo
                <input id="acct-photo-input" type="file" accept="image/*" class="hidden" />
              </label>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div><label class="field-label">Full Name</label><input name="fullName" required class="figma-input" value="${UI.esc(a.fullName)}" /></div>
              <div><label class="field-label">Username</label><input name="username" required class="figma-input" value="${UI.esc(a.username)}" /></div>
            </div>

            <div><label class="field-label">Email Address</label><input name="email" type="email" required class="figma-input" value="${UI.esc(a.email)}" /></div>
            <div><label class="field-label">Mobile Number</label><input name="mobile" class="figma-input" value="${UI.esc(a.mobile)}" /></div>

            <div style="display:flex;justify-content:flex-end;gap:10px;padding-top:6px">
              <a href="./dashboard.html" class="btn-outline">Cancel</a>
              <button type="submit" class="btn-solid">Save changes</button>
            </div>
          </form>

          <!-- Password Card -->
          <form id="acct-password-form" class="card page-stack" style="gap:14px">
            <div><span class="chip">Password</span></div>

            <div><label class="field-label">Current Password</label><input name="currentPassword" type="password" required class="figma-input" placeholder="Enter current password" /></div>
            <div>
              <label class="field-label">New Password</label>
              <input name="newPassword" type="password" required class="figma-input" placeholder="Enter a new password" />
              <p style="margin:6px 0 0;font-size:11.5px;color:var(--ink-subtle)">Use a long, unique password you don't use elsewhere.</p>
            </div>
            <div><label class="field-label">Confirm New Password</label><input name="confirmPassword" type="password" required class="figma-input" placeholder="Re-enter the new password" /></div>
            <p id="acct-pw-err" class="hidden" style="margin:0;font-size:12.5px;color:var(--danger);font-weight:600"></p>

            <button type="submit" class="btn-solid btn-full" style="margin-top:4px">Update password</button>
          </form>
        </section>
      </div>
    `;

    root.querySelector('#acct-photo-input').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        photo = String(reader.result);
        document.getElementById('acct-avatar-box').innerHTML = `<img src="${UI.esc(photo)}" alt="" />`;
      };
      reader.readAsDataURL(file);
    });

    root.querySelector('#acct-profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Store.updateAccount({
        fullName: fd.get('fullName'),
        username: fd.get('username'),
        email: fd.get('email'),
        mobile: fd.get('mobile'),
        photo,
      });
      UI.toast('Profile changes saved.');
      window.NIHAYA_APP.syncShell();
    });

    root.querySelector('#acct-password-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const err = document.getElementById('acct-pw-err');
      const np = String(fd.get('newPassword') || '');
      const cp = String(fd.get('confirmPassword') || '');
      if (np.length < 8) {
        err.textContent = 'New password must be at least 8 characters.';
        err.classList.remove('hidden');
        return;
      }
      if (np !== cp) {
        err.textContent = 'Passwords do not match.';
        err.classList.remove('hidden');
        return;
      }
      err.classList.add('hidden');
      e.target.reset();
      UI.toast('Password updated.');
    });
  }

  window.NIHAYA_PAGES_OPS = {
    customers: renderCustomers,
    marketing: renderMarketing,
    orders: renderOrders,
    account: renderAccount,
    openOrderModal,
  };
})();


/* =========================================================
   NIHAYA Admin â€” Router & Shell Controls
   ========================================================= */

(function () {
  const UI = window.NIHAYA_UI;
  const Store = window.NIHAYA_STORE;

  const ROUTES = {
    dashboard: window.NIHAYA_PAGES_CORE.dashboard,
    products: window.NIHAYA_PAGES_CORE.products,
    'products-all': window.NIHAYA_PAGES_CORE['products-all'],
    'add-product': window.NIHAYA_PAGES_CORE['add-product'],
    customers: window.NIHAYA_PAGES_OPS.customers,
    marketing: window.NIHAYA_PAGES_OPS.marketing,
    orders: window.NIHAYA_PAGES_OPS.orders,
    account: window.NIHAYA_PAGES_OPS.account,
  };

  const shell = document.getElementById('app-shell');

  /* -------------------------------------------------------
     Auth Pages (login, forgot-password, forgot-username, reset-password)
     ------------------------------------------------------- */
  const authPage = document.body?.dataset?.authPage;
  if (authPage && !shell) {
    document.querySelectorAll('[data-toggle-pw]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.togglePw);
        if (!input) return;
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        btn.textContent = showing ? 'Show' : 'Hide';
      });
    });

    if (authPage === 'login') {
      document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('login-id').value.trim();
        const pw = document.getElementById('login-pw').value;
        const idErr = document.getElementById('login-id-error');
        const pwErr = document.getElementById('login-pw-error');
        idErr.classList.add('hidden');
        pwErr.classList.add('hidden');
        if (!id) {
          idErr.textContent = 'Please enter your username or email.';
          idErr.classList.remove('hidden');
          return;
        }
        if (!pw) {
          pwErr.textContent = 'Please enter your password.';
          pwErr.classList.remove('hidden');
          return;
        }
        window.location.href = './dashboard.html';
      });
    }

    if (authPage === 'forgot-password') {
      document.getElementById('fp-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('fp-email').value.trim();
        const err = document.getElementById('fp-email-error');
        if (!email || !email.includes('@')) {
          err.textContent = 'Please enter a valid email address.';
          err.classList.remove('hidden');
          return;
        }
        err.classList.add('hidden');
        document.getElementById('fp-form').classList.add('hidden');
        document.getElementById('fp-sent').classList.remove('hidden');
      });
    }

    if (authPage === 'forgot-username') {
      document.getElementById('fu-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('fu-email').value.trim();
        const err = document.getElementById('fu-email-error');
        if (!email || !email.includes('@')) {
          err.textContent = 'Please enter a valid email address.';
          err.classList.remove('hidden');
          return;
        }
        err.classList.add('hidden');
        document.getElementById('fu-form').classList.add('hidden');
        document.getElementById('fu-sent').classList.remove('hidden');
      });
      document.getElementById('fu-different')?.addEventListener('click', () => {
        document.getElementById('fu-sent').classList.add('hidden');
        document.getElementById('fu-form').classList.remove('hidden');
      });
    }

    if (authPage === 'reset-password') {
      document.getElementById('rp-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const np = document.getElementById('rp-new').value;
        const cp = document.getElementById('rp-confirm').value;
        const newErr = document.getElementById('rp-new-error');
        const confErr = document.getElementById('rp-confirm-error');
        newErr.classList.add('hidden');
        confErr.classList.add('hidden');
        if (np.length < 8) {
          newErr.textContent = 'Password must be at least 8 characters.';
          newErr.classList.remove('hidden');
          return;
        }
        if (np !== cp) {
          confErr.textContent = 'Passwords do not match.';
          confErr.classList.remove('hidden');
          return;
        }
        document.getElementById('rp-form').classList.add('hidden');
        document.getElementById('rp-done').classList.remove('hidden');
      });
    }
    return;
  }

  if (!shell) return;

  const signedOut = document.getElementById('signed-out-screen');
  const pageRoot = document.getElementById('page-root');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const profileBtn = document.getElementById('profile-btn');
  const profilePopover = document.getElementById('profile-popover');

  function getPage() {
    const bodyPage = document.body?.dataset?.page;
    const params = new URLSearchParams(window.location.search);
    if (bodyPage === 'products' && params.get('view') === 'all') {
      const cat = params.get('category');
      if (cat) window.NIHAYA_SET_PROD_CAT?.(cat);
      return 'products-all';
    }
    if (bodyPage && ROUTES[bodyPage]) return bodyPage;
    const hash = (window.location.hash || '#dashboard').replace(/^#\/?/, '').toLowerCase();
    return ROUTES[hash] ? hash : 'dashboard';
  }

  function closeMobile() {
    shell.classList.remove('mobile-open');
    mobileBackdrop.classList.add('hidden');
  }

  function syncShell() {
    const a = Store.get().account;
    document.getElementById('topbar-admin-name').textContent = a.fullName;
    document.getElementById('dropdown-admin-name').textContent = a.fullName;
    document.getElementById('dropdown-admin-email').textContent = a.email;
    const backBtn = document.getElementById('sign-back-in-btn');
    if (backBtn) backBtn.textContent = `Sign back in as ${a.fullName}`;

    const orb = document.getElementById('topbar-avatar');
    if (a.photo) {
      orb.style.backgroundImage = `url("${a.photo}")`;
    } else {
      orb.style.backgroundImage = '';
    }
  }

  function render() {
    const page = getPage();
    const activeNav = page === 'products-all' || page === 'add-product' ? 'products' : page;

    document.querySelectorAll('#sidebar-nav .nav-pill').forEach((link) => {
      link.classList.toggle('active', link.dataset.page === activeNav);
    });

    ROUTES[page](pageRoot);
    syncShell();
    UI.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function rerenderKeepFocus(inputId) {
    const active = document.getElementById(inputId);
    const pos = active ? active.selectionStart : null;
    const page = getPage();
    ROUTES[page](pageRoot);
    syncShell();
    UI.refreshIcons();
    const nextEl = document.getElementById(inputId);
    if (nextEl) {
      nextEl.focus();
      if (pos !== null) nextEl.setSelectionRange(pos, pos);
    }
  }

  // Mobile drawer
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    shell.classList.add('mobile-open');
    mobileBackdrop.classList.remove('hidden');
  });
  document.getElementById('mobile-close-btn').addEventListener('click', closeMobile);
  mobileBackdrop.addEventListener('click', closeMobile);
  document.querySelectorAll('#sidebar-nav .nav-pill').forEach((a) => a.addEventListener('click', closeMobile));

  // Profile dropdown
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profilePopover.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-anchor')) profilePopover.classList.add('hidden');
  });

  document.getElementById('dropdown-account-btn').addEventListener('click', () => {
    profilePopover.classList.add('hidden');
    window.location.href = './my-account.html';
  });

  document.getElementById('dropdown-reset-btn').addEventListener('click', () => {
    profilePopover.classList.add('hidden');
    UI.confirmDialog({
      title: 'Reset demo data?',
      message: 'Restore all NIHAYA products, categories, orders, customers, promotions, and account details to default values?',
      confirmLabel: 'Reset Data',
      danger: true,
      onConfirm: () => {
        Store.reset();
        UI.toast('Demo data restored.');
        render();
      },
    });
  });

  document.getElementById('dropdown-logout-btn').addEventListener('click', () => {
    profilePopover.classList.add('hidden');
    UI.confirmDialog({
      title: 'Log out of NIHAYA?',
      message: 'You will be signed out of the admin portal. Your saved changes remain in localStorage.',
      confirmLabel: 'Log out',
      danger: false,
      onConfirm: () => {
        window.location.href = './login.html';
      },
    });
  });

  document.getElementById('sign-back-in-btn')?.addEventListener('click', () => {
    shell.classList.remove('hidden');
    render();
  });

  window.NIHAYA_APP = {
    render,
    rerenderKeepFocus,
    syncShell,
  };

  window.addEventListener('DOMContentLoaded', () => {
    render();
  });
})();

