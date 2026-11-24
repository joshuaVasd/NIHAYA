/* =========================================================
   NIHAYA Admin - Single Backend-Ready Application Script
   =========================================================
   Structure (all inside one file, mirroring customer/js/app.js):
   1. CONFIG           - API base URL, USE_MOCK_API flag, REST endpoints
   2. MOCK DATABASE    - Seed data + localStorage helpers (used in mock mode)
   3. API CLIENT       - Centralized fetch wrapper (GET/POST/PUT/PATCH/DELETE)
   4. AUTH SERVICE     - Login, logout, Bearer token session, route guard
   5. DOMAIN SERVICES  - Async CRUD for Dashboard, Products, Categories,
                         Orders, Customers, Marketing, and Account
   6. VALIDATORS       - Reusable form validation & inline error helpers
   7. UI HELPERS       - Formatters, badges, modals, confirms, toasts, states
   8. PAGE CONTROLLERS - Render & event logic for each HTML page
   9. APP BOOTSTRAP    - Initializes auth guard, topbar, and current page

   HOW TO CONNECT A REAL BACKEND:
   Set USE_MOCK_API: false and update API_BASE_URL below (or via window.__NIHAYA_ENV__).
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIG - Centralized Environment & API Endpoints
   --------------------------------------------------------- */

(function () {
  const overrides = window.__NIHAYA_ENV__ || {};

  const CONFIG = Object.freeze({
    API_BASE_URL: String(overrides.API_BASE_URL || 'http://localhost:5000/api').replace(/\/+$/, ''),
    USE_MOCK_API: overrides.USE_MOCK_API !== undefined ? Boolean(overrides.USE_MOCK_API) : true,
    API_TIMEOUT_MS: Number(overrides.API_TIMEOUT_MS) || 15000,
    REQUIRE_AUTH: overrides.REQUIRE_AUTH !== undefined ? Boolean(overrides.REQUIRE_AUTH) : false,
    MOCK_DELAY_MS: Number(overrides.MOCK_DELAY_MS ?? 120),
    ROLES: Object.freeze({
      ADMIN: 'admin',
      MANAGER: 'manager',
      STAFF: 'staff',
    }),
    ENDPOINTS: Object.freeze({
      AUTH: Object.freeze({
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        FORGOT_PASSWORD: '/auth/forgot-password',
        FORGOT_USERNAME: '/auth/forgot-username',
        RESET_PASSWORD: '/auth/reset-password',
      }),
      DASHBOARD: '/dashboard/overview',
      PRODUCTS: '/products',
      CATEGORIES: '/categories',
      ORDERS: '/orders',
      CUSTOMERS: '/customers',
      PROMOTIONS: '/marketing/promotions',
      BANNER: '/marketing/banner',
      ACCOUNT_PROFILE: '/account/profile',
      ACCOUNT_PASSWORD: '/account/password',
    }),
  });

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.config = CONFIG;
})();


/* =========================================================
   NIHAYA Admin - Mock Dataset & LocalStorage Persistence
   Used only when NIHAYA.config.USE_MOCK_API === true
   ========================================================= */

(function () {
  const STORAGE_KEY = 'nihaya_figma_admin_v5';

  const SEED_DATA = {
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
      { id: 'CUS-1', name: 'Maria Santos', email: 'maria.s@email.com', phone: '0917 234 5678', address: 'Purok 3, Brgy. Lag-on, Daet, Camarines Norte', orders: 12, totalSpent: 18450, lastOrder: '#10482 \u00B7 Nov 10', status: 'Active', joined: 'Mar 2025' },
      { id: 'CUS-2', name: 'John Dela Cruz', email: 'john.d@email.com', phone: '0918 551 0394', address: '18 Ayala Ave, Makati City, Metro Manila', orders: 8, totalSpent: 9980, lastOrder: '#10481 \u00B7 Nov 9', status: 'Active', joined: 'Apr 2025' },
      { id: 'CUS-3', name: 'Ana Reyes', email: 'ana.r@email.com', phone: '0927 891 4412', address: '105 BGC High St, Taguig, Metro Manila', orders: 5, totalSpent: 6200, lastOrder: '#10480 \u00B7 Nov 9', status: 'Active', joined: 'May 2025' },
      { id: 'CUS-4', name: 'Leo Perez', email: 'leo.p@email.com', phone: '0917 663 9021', address: '88 Ortigas Ave, Pasig City, Metro Manila', orders: 3, totalSpent: 2397, lastOrder: '#10479 \u00B7 Nov 8', status: 'Inactive', joined: 'Jun 2025' },
      { id: 'CUS-5', name: 'Carlo Mendoza', email: 'carlo.m@email.com', phone: '0919 304 7718', address: '33 Shaw Blvd, Mandaluyong City', orders: 1, totalSpent: 1299, lastOrder: '#10475 \u00B7 Nov 5', status: 'New', joined: 'Nov 2025' },
      { id: 'CUS-6', name: 'Bea Tolentino', email: 'bea.t@email.com', phone: '0915 772 6100', address: '12 Session Rd, Baguio City, Benguet', orders: 6, totalSpent: 7850, lastOrder: '#10478 \u00B7 Nov 8', status: 'Active', joined: 'Jul 2025' },
      { id: 'CUS-7', name: 'Paolo Garcia', email: 'paolo.g@email.com', phone: '0917 119 8832', address: '204 IT Park, Cebu City, Cebu', orders: 2, totalSpent: 3150, lastOrder: '#10477 \u00B7 Nov 7', status: 'New', joined: 'Nov 2025' },
      { id: 'CUS-8', name: 'Lia Fernandez', email: 'lia.f@email.com', phone: '0928 441 5520', address: '51 J.P. Laurel Ave, Davao City', orders: 9, totalSpent: 12640, lastOrder: '#10476 \u00B7 Nov 6', status: 'Active', joined: 'Feb 2025' },
    ],

    orders: [
      { id: '10482', customerName: 'Maria S.', fullCustomer: 'Maria Santos', mobile: '0917 234 5678', email: 'maria.s@email.com', item: 'USB-C fast charger', qty: 1, subtotal: 1299, shippingFee: 75, total: 1374, date: 'Nov 10', deliveryMethod: 'Delivery', address: 'Purok 3, Brgy. Lag-on, Daet, Camarines Norte', notes: 'Please call before delivery.', paymentMethod: 'GCash', paymentStatus: 'Paid', status: 'Processing' },
      { id: '10481', customerName: 'John D.', fullCustomer: 'John Dela Cruz', mobile: '0918 551 0394', email: 'john.d@email.com', item: 'Phone case', qty: 1, subtotal: 498, shippingFee: 75, total: 573, date: 'Nov 9', deliveryMethod: 'Delivery', address: '18 Ayala Ave, Makati City, Metro Manila', notes: 'Leave at lobby reception.', paymentMethod: 'Maya', paymentStatus: 'Paid', status: 'Shipped' },
      { id: '10480', customerName: 'Ana R.', fullCustomer: 'Ana Reyes', mobile: '0927 891 4412', email: 'ana.r@email.com', item: 'Wireless earbuds', qty: 1, subtotal: 2150, shippingFee: 75, total: 2225, date: 'Nov 9', deliveryMethod: 'Delivery', address: '105 BGC High St, Taguig, Metro Manila', notes: 'Deliver during office hours.', paymentMethod: 'Credit Card', paymentStatus: 'Paid', status: 'Delivered' },
      { id: '10479', customerName: 'Leo P.', fullCustomer: 'Leo Perez', mobile: '0917 663 9021', email: 'leo.p@email.com', item: 'Power bank 30,000 mAh', qty: 1, subtotal: 799, shippingFee: 75, total: 874, date: 'Nov 8', deliveryMethod: 'Delivery', address: '88 Ortigas Ave, Pasig City, Metro Manila', notes: 'Text upon arrival.', paymentMethod: 'GCash', paymentStatus: 'Pending', status: 'Pending' },
      { id: '10478', customerName: 'Bea T.', fullCustomer: 'Bea Tolentino', mobile: '0915 772 6100', email: 'bea.t@email.com', item: 'USB-C fast charger', qty: 1, subtotal: 1299, shippingFee: 0, total: 1299, date: 'Nov 8', deliveryMethod: 'Pickup', address: '12 Session Rd, Baguio City, Benguet', notes: 'Store pickup requested.', paymentMethod: 'Credit Card', paymentStatus: 'Paid', status: 'Delivered' },
      { id: '10477', customerName: 'Paolo G.', fullCustomer: 'Paolo Garcia', mobile: '0917 119 8832', email: 'paolo.g@email.com', item: 'Phone case', qty: 1, subtotal: 498, shippingFee: 75, total: 573, date: 'Nov 7', deliveryMethod: 'Delivery', address: '204 IT Park, Cebu City, Cebu', notes: 'Call 10 minutes before arrival.', paymentMethod: 'COD', paymentStatus: 'Pending', status: 'Pending' },
      { id: '10476', customerName: 'Lia F.', fullCustomer: 'Lia Fernandez', mobile: '0928 441 5520', email: 'lia.f@email.com', item: 'Wireless earbuds', qty: 1, subtotal: 2150, shippingFee: 75, total: 2225, date: 'Nov 6', deliveryMethod: 'Delivery', address: '51 J.P. Laurel Ave, Davao City', notes: 'No special instructions.', paymentMethod: 'Maya', paymentStatus: 'Paid', status: 'Shipped' },
      { id: '10475', customerName: 'Carlo M.', fullCustomer: 'Carlo Mendoza', mobile: '0919 304 7718', email: 'carlo.m@email.com', item: 'Power bank 30,000 mAh', qty: 1, subtotal: 799, shippingFee: 75, total: 874, date: 'Nov 5', deliveryMethod: 'Delivery', address: '33 Shaw Blvd, Mandaluyong City', notes: 'Deliver to guard house.', paymentMethod: 'GCash', paymentStatus: 'Paid', status: 'Delivered' },
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
      id: 'USR-ADMIN-1',
      fullName: 'Racman',
      role: 'Store admin',
      roleCode: 'admin',
      username: 'racman',
      email: 'admin@example.com',
      mobile: '+63 9XX XXX XXXX',
      photo: '',
    },

    analytics: {
      baseRevenue: 1277000,
      baseOrders: 992,
      baseCustomers: 1240,
      baseNewCustomers: 84,
      baseRepeatCustomers: 407,
      baseProcessingOrders: 17,
      baseDeliveredOrders: 840,
      conversionRate: '3.4%',
      revenueGrowthLabel: '+12% vs. previous 30 days',
      visitors: { perDay: 256, perWeek: 1792, perMonth: 7680 },
      weeklyOrders: [
        { day: 'Mon', count: 20 },
        { day: 'Tue', count: 34 },
        { day: 'Wed', count: 54 },
        { day: 'Thu', count: 65 },
        { day: 'Fri', count: 45 },
        { day: 'Sat', count: 20 },
        { day: 'Sun', count: 25 },
      ],
    },
  };

  /** Deep-clones plain JSON objects so UI code cannot mutate stored data directly. */
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  /** Reads the mock database from localStorage, falling back to SEED_DATA. */
  function readDb() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(SEED_DATA);
      const parsed = JSON.parse(raw);
      return Object.assign(clone(SEED_DATA), parsed);
    } catch {
      return clone(SEED_DATA);
    }
  }

  /** Saves the updated mock database back into localStorage. */
  function writeDb(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      // ignore storage quota issues in mock mode
    }
  }

  /** Restores all mock tables (products, orders, customers, etc.) to defaults. */
  function resetDb() {
    const fresh = clone(SEED_DATA);
    writeDb(fresh);
    return fresh;
  }

  /** Simulates short network delay so loading states behave like a real API. */
  function simulateLatency(result) {
    const delay = window.NIHAYA?.config?.MOCK_DELAY_MS ?? 120;
    return new Promise((resolve) => {
      setTimeout(() => resolve(clone(result)), delay);
    });
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.mockDb = {
    read: readDb,
    write: writeDb,
    reset: resetDb,
    simulateLatency,
    clone,
  };
})();


/* =========================================================
   NIHAYA Admin - Centralized HTTP API Client
   Supports GET, POST, PUT, PATCH, DELETE with timeout,
   Bearer auth token injection, and standardized errors.
   ========================================================= */

(function () {
  class ApiError extends Error {
    constructor(message, status = 0, details = null) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.details = details;
    }
  }

  /** Builds a full API URL by combining API_BASE_URL, path, and optional query params. */
  function buildUrl(path, query) {
    const base = window.NIHAYA.config.API_BASE_URL;
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    const url = new URL(base + cleanPath);
    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '' && val !== 'All') {
          url.searchParams.set(key, String(val));
        }
      });
    }
    return url.toString();
  }

  /**
   * Sends an HTTP request with JSON body, Bearer token, timeout, and error handling.
   * Throws ApiError on non-2xx responses, timeouts, or network failures.
   */
  async function request(method, path, { body, query, headers = {}, skipAuth = false } = {}) {
    const controller = new AbortController();
    const timeoutMs = window.NIHAYA.config.API_TIMEOUT_MS || 15000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const requestHeaders = Object.assign(
      { Accept: 'application/json' },
      body !== undefined ? { 'Content-Type': 'application/json' } : {},
      headers
    );

    if (!skipAuth && window.NIHAYA.auth) {
      const token = window.NIHAYA.auth.getToken();
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(buildUrl(path, query), {
        method,
        headers: requestHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json')
        ? await response.json().catch(() => null)
        : await response.text().catch(() => '');

      if (!response.ok) {
        if (response.status === 401 && window.NIHAYA.auth && !skipAuth) {
          window.NIHAYA.auth.clearSession();
        }
        const message =
          (payload && typeof payload === 'object' && (payload.message || payload.error)) ||
          `Request failed with status ${response.status}`;
        throw new ApiError(message, response.status, payload);
      }

      return payload;
    } catch (err) {
      if (err instanceof ApiError) throw err;
      if (err && err.name === 'AbortError') {
        throw new ApiError('Request timed out. Please check your connection and try again.', 408);
      }
      throw new ApiError(
        'Unable to reach the server. Check API_BASE_URL or your network connection.',
        0,
        err
      );
    } finally {
      clearTimeout(timer);
    }
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.ApiError = ApiError;
  window.NIHAYA.apiClient = {
    request,
    get: (path, options) => request('GET', path, options),
    post: (path, body, options) => request('POST', path, Object.assign({}, options, { body })),
    put: (path, body, options) => request('PUT', path, Object.assign({}, options, { body })),
    patch: (path, body, options) => request('PATCH', path, Object.assign({}, options, { body })),
    del: (path, options) => request('DELETE', path, options),
  };
})();


/* =========================================================
   NIHAYA Admin - Authentication & Session Service
   Backend-ready token & role handling. Never stores passwords.
   ========================================================= */

(function () {
  const SESSION_KEY = 'nihaya_admin_session_v1';

  function getStorage(persistent) {
    return persistent ? window.localStorage : window.sessionStorage;
  }

  function readSession() {
    try {
      const raw =
        window.sessionStorage.getItem(SESSION_KEY) ||
        window.localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.token || !parsed.user) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function saveSession(session, remember = true) {
    clearSession();
    try {
      const target = getStorage(Boolean(remember));
      target.setItem(
        SESSION_KEY,
        JSON.stringify({
          token: session.token,
          user: session.user,
          issuedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore storage errors
    }
  }

  function clearSession() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }

  function getToken() {
    return readSession()?.token || null;
  }

  function getUser() {
    const session = readSession();
    if (session?.user) return session.user;
    if (window.NIHAYA.config.USE_MOCK_API) {
      return window.NIHAYA.mockDb.read().account;
    }
    return null;
  }

  function isAuthenticated() {
    return Boolean(getToken());
  }

  function hasRole(allowedRoles = []) {
    if (!allowedRoles.length) return true;
    const user = getUser();
    if (!user) return false;
    const role = String(user.roleCode || user.role || '').toLowerCase();
    return allowedRoles.map((r) => String(r).toLowerCase()).includes(role);
  }

  /** Guards admin pages: redirects to login.html when REQUIRE_AUTH is enabled and user is signed out. */
  function requireAuth() {
    const cfg = window.NIHAYA.config;
    if (!cfg.REQUIRE_AUTH && cfg.USE_MOCK_API) {
      return true;
    }
    if (!isAuthenticated()) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.replace(`./login.html?next=${next}`);
      return false;
    }
    return true;
  }

  /** Authenticates the admin user and saves the returned session token (never stores passwords). */
  async function login({ identifier, password, remember = true }) {
    const cfg = window.NIHAYA.config;
    if (cfg.USE_MOCK_API) {
      const db = window.NIHAYA.mockDb.read();
      const user = Object.assign({}, db.account);
      // Mock token only; real backend must verify password and issue signed JWT/session
      const session = {
        token: 'mock-session-token-' + Date.now(),
        user,
      };
      const result = await window.NIHAYA.mockDb.simulateLatency(session);
      saveSession(result, remember);
      return result;
    }

    const res = await window.NIHAYA.apiClient.post(
      cfg.ENDPOINTS.AUTH.LOGIN,
      { identifier, password },
      { skipAuth: true }
    );
    const session = { token: res.token || res.accessToken, user: res.user };
    saveSession(session, remember);
    return session;
  }

  async function logout() {
    const cfg = window.NIHAYA.config;
    try {
      if (!cfg.USE_MOCK_API && getToken()) {
        await window.NIHAYA.apiClient.post(cfg.ENDPOINTS.AUTH.LOGOUT);
      }
    } finally {
      clearSession();
    }
  }

  async function requestPasswordReset(email) {
    const cfg = window.NIHAYA.config;
    if (cfg.USE_MOCK_API) {
      return window.NIHAYA.mockDb.simulateLatency({ ok: true });
    }
    return window.NIHAYA.apiClient.post(
      cfg.ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
      { skipAuth: true }
    );
  }

  async function requestUsernameReminder(email) {
    const cfg = window.NIHAYA.config;
    if (cfg.USE_MOCK_API) {
      return window.NIHAYA.mockDb.simulateLatency({ ok: true });
    }
    return window.NIHAYA.apiClient.post(
      cfg.ENDPOINTS.AUTH.FORGOT_USERNAME,
      { email },
      { skipAuth: true }
    );
  }

  async function resetPassword({ token, newPassword }) {
    const cfg = window.NIHAYA.config;
    if (cfg.USE_MOCK_API) {
      return window.NIHAYA.mockDb.simulateLatency({ ok: true });
    }
    return window.NIHAYA.apiClient.post(
      cfg.ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword },
      { skipAuth: true }
    );
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.auth = {
    getSession: readSession,
    saveSession,
    clearSession,
    getToken,
    getUser,
    isAuthenticated,
    hasRole,
    requireAuth,
    login,
    logout,
    requestPasswordReset,
    requestUsernameReminder,
    resetPassword,
  };
})();


/* =========================================================
   NIHAYA Admin - Domain CRUD Services
   Each service works with mockDb when USE_MOCK_API is true
   and calls apiClient REST endpoints when USE_MOCK_API is false.
   ========================================================= */

(function () {
  const cfg = () => window.NIHAYA.config;
  const api = () => window.NIHAYA.apiClient;
  const db = () => window.NIHAYA.mockDb;

  /* -------------------------------------------------------
     Dashboard Service
     ------------------------------------------------------- */
  const dashboardService = {
    async getOverview() {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.DASHBOARD);
      }
      const data = db().read();
      const orderRevenue = data.orders.reduce((sum, o) => sum + o.total, 0);
      const totalRevenue = data.analytics.baseRevenue + orderRevenue;
      const totalOrders = data.analytics.baseOrders + data.orders.length;

      return db().simulateLatency({
        account: data.account,
        totalRevenue,
        totalOrders,
        avgOrder: Math.round(totalRevenue / Math.max(totalOrders, 1)),
        conversionRate: data.analytics.conversionRate,
        revenueGrowthLabel: data.analytics.revenueGrowthLabel,
        visitors: data.analytics.visitors,
        weeklyOrders: data.analytics.weeklyOrders,
        recentOrders: data.orders.slice(0, 4),
        bestSellers: [...data.products].sort((a, b) => b.sales - a.sales).slice(0, 4),
        stockWatch: [...data.products].sort((a, b) => a.stock - b.stock).slice(0, 7),
        alerts: {
          lowStockCount: data.products.filter((p) => p.stock <= 9).length,
          failedPaymentsCount: data.orders.filter((o) => o.status === 'Pending').length + 2,
          pendingOrdersCount: data.orders.filter((o) => o.status === 'Pending').length,
        },
      });
    },
  };

  /* -------------------------------------------------------
     Product Service (CRUD)
     ------------------------------------------------------- */
  const productService = {
    async list(filters = {}) {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.PRODUCTS, { query: filters });
      }
      const data = db().read();
      return db().simulateLatency(data.products);
    },

    async getById(id) {
      if (!cfg().USE_MOCK_API) {
        return api().get(`${cfg().ENDPOINTS.PRODUCTS}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      const found = data.products.find((p) => p.id === id);
      if (!found) throw new window.NIHAYA.ApiError('Product not found.', 404);
      return db().simulateLatency(found);
    },

    async create(payload) {
      if (!cfg().USE_MOCK_API) {
        return api().post(cfg().ENDPOINTS.PRODUCTS, payload);
      }
      const data = db().read();
      const item = Object.assign(
        {
          id: 'PRD-' + (1001 + data.products.length + Math.floor(Math.random() * 40)),
          sales: 0,
          featured: false,
          image: '',
          description: '',
          boxContents: '',
          specs: {},
        },
        payload,
        {
          name: String(payload.name || '').trim(),
          price: Number(payload.price) || 0,
          stock: Math.max(0, Number(payload.stock) || 0),
        }
      );
      data.products.unshift(item);
      db().write(data);
      return db().simulateLatency(item);
    },

    async update(id, updates) {
      if (!cfg().USE_MOCK_API) {
        return api().put(`${cfg().ENDPOINTS.PRODUCTS}/${encodeURIComponent(id)}`, updates);
      }
      const data = db().read();
      const idx = data.products.findIndex((p) => p.id === id);
      if (idx === -1) throw new window.NIHAYA.ApiError('Product not found.', 404);
      data.products[idx] = Object.assign({}, data.products[idx], updates, {
        price: updates.price !== undefined ? Number(updates.price) || 0 : data.products[idx].price,
        stock:
          updates.stock !== undefined
            ? Math.max(0, Number(updates.stock) || 0)
            : data.products[idx].stock,
      });
      db().write(data);
      return db().simulateLatency(data.products[idx]);
    },

    async remove(id) {
      if (!cfg().USE_MOCK_API) {
        return api().del(`${cfg().ENDPOINTS.PRODUCTS}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      data.products = data.products.filter((p) => p.id !== id);
      db().write(data);
      return db().simulateLatency({ deleted: true, id });
    },
  };

  /* -------------------------------------------------------
     Category Service (CRUD)
     ------------------------------------------------------- */
  const categoryService = {
    async list() {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.CATEGORIES);
      }
      const data = db().read();
      return db().simulateLatency(data.categories);
    },

    async create(payload) {
      if (!cfg().USE_MOCK_API) {
        return api().post(cfg().ENDPOINTS.CATEGORIES, payload);
      }
      const data = db().read();
      const cat = {
        id: 'cat-' + Date.now(),
        name: String(payload.name || '').trim(),
        icon: payload.icon || 'package',
      };
      data.categories.push(cat);
      db().write(data);
      return db().simulateLatency(cat);
    },

    async update(id, updates) {
      if (!cfg().USE_MOCK_API) {
        return api().put(`${cfg().ENDPOINTS.CATEGORIES}/${encodeURIComponent(id)}`, updates);
      }
      const data = db().read();
      const cat = data.categories.find((c) => c.id === id);
      if (!cat) throw new window.NIHAYA.ApiError('Category not found.', 404);
      const oldName = cat.name;
      Object.assign(cat, updates);
      if (updates.name && updates.name !== oldName) {
        data.products.forEach((p) => {
          if (p.category === oldName) p.category = updates.name;
        });
      }
      db().write(data);
      return db().simulateLatency(cat);
    },

    async remove(id) {
      if (!cfg().USE_MOCK_API) {
        return api().del(`${cfg().ENDPOINTS.CATEGORIES}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      data.categories = data.categories.filter((c) => c.id !== id);
      db().write(data);
      return db().simulateLatency({ deleted: true, id });
    },
  };

  /* -------------------------------------------------------
     Order Service (Read & Status Update)
     ------------------------------------------------------- */
  const orderService = {
    async list(filters = {}) {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.ORDERS, { query: filters });
      }
      const data = db().read();
      return db().simulateLatency({
        items: data.orders,
        summary: {
          totalOrders: data.analytics.baseOrders + data.orders.length,
          processingCount:
            data.analytics.baseProcessingOrders +
            data.orders.filter((o) => o.status === 'Processing').length,
          deliveredCount:
            data.analytics.baseDeliveredOrders +
            data.orders.filter((o) => o.status === 'Delivered').length,
        },
      });
    },

    async getById(id) {
      if (!cfg().USE_MOCK_API) {
        return api().get(`${cfg().ENDPOINTS.ORDERS}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      const order = data.orders.find((o) => o.id === id);
      if (!order) throw new window.NIHAYA.ApiError('Order not found.', 404);
      return db().simulateLatency(order);
    },

    async updateStatus(id, status) {
      if (!cfg().USE_MOCK_API) {
        return api().patch(`${cfg().ENDPOINTS.ORDERS}/${encodeURIComponent(id)}/status`, {
          status,
        });
      }
      const data = db().read();
      const order = data.orders.find((o) => o.id === id);
      if (!order) throw new window.NIHAYA.ApiError('Order not found.', 404);
      order.status = status;
      if (status === 'Delivered' && order.paymentStatus === 'Pending') {
        order.paymentStatus = 'Paid';
      }
      db().write(data);
      return db().simulateLatency(order);
    },
  };

  /* -------------------------------------------------------
     Customer Service (Read & Update)
     ------------------------------------------------------- */
  const customerService = {
    async list(filters = {}) {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.CUSTOMERS, { query: filters });
      }
      const data = db().read();
      return db().simulateLatency({
        items: data.customers,
        summary: {
          totalCustomers: data.analytics.baseCustomers + data.customers.length,
          newThisMonth:
            data.analytics.baseNewCustomers +
            data.customers.filter((c) => c.status === 'New').length,
          repeatCustomers:
            data.analytics.baseRepeatCustomers +
            data.customers.filter((c) => c.orders >= 2).length,
        },
      });
    },

    async getById(id) {
      if (!cfg().USE_MOCK_API) {
        return api().get(`${cfg().ENDPOINTS.CUSTOMERS}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      const customer = data.customers.find((c) => c.id === id);
      if (!customer) throw new window.NIHAYA.ApiError('Customer not found.', 404);
      const orders = data.orders.filter((o) => o.email === customer.email);
      return db().simulateLatency({ customer, orders });
    },
  };

  /* -------------------------------------------------------
     Marketing Service (Promotions CRUD + Banner Update)
     ------------------------------------------------------- */
  const marketingService = {
    async getOverview() {
      if (!cfg().USE_MOCK_API) {
        const [promotions, banner] = await Promise.all([
          api().get(cfg().ENDPOINTS.PROMOTIONS),
          api().get(cfg().ENDPOINTS.BANNER),
        ]);
        return { promotions, banner };
      }
      const data = db().read();
      return db().simulateLatency({ promotions: data.promotions, banner: data.banner });
    },

    async createPromotion(payload) {
      if (!cfg().USE_MOCK_API) {
        return api().post(cfg().ENDPOINTS.PROMOTIONS, payload);
      }
      const data = db().read();
      const item = Object.assign({ id: 'PRM-' + Date.now() }, payload, {
        code: String(payload.code || '').trim().toUpperCase(),
      });
      data.promotions.unshift(item);
      db().write(data);
      return db().simulateLatency(item);
    },

    async updatePromotion(id, updates) {
      if (!cfg().USE_MOCK_API) {
        return api().put(`${cfg().ENDPOINTS.PROMOTIONS}/${encodeURIComponent(id)}`, updates);
      }
      const data = db().read();
      const promo = data.promotions.find((p) => p.id === id);
      if (!promo) throw new window.NIHAYA.ApiError('Promotion not found.', 404);
      Object.assign(promo, updates);
      if (promo.code) promo.code = promo.code.toUpperCase();
      db().write(data);
      return db().simulateLatency(promo);
    },

    async deletePromotion(id) {
      if (!cfg().USE_MOCK_API) {
        return api().del(`${cfg().ENDPOINTS.PROMOTIONS}/${encodeURIComponent(id)}`);
      }
      const data = db().read();
      data.promotions = data.promotions.filter((p) => p.id !== id);
      db().write(data);
      return db().simulateLatency({ deleted: true, id });
    },

    async updateBanner(updates) {
      if (!cfg().USE_MOCK_API) {
        return api().put(cfg().ENDPOINTS.BANNER, updates);
      }
      const data = db().read();
      Object.assign(data.banner, updates);
      db().write(data);
      return db().simulateLatency(data.banner);
    },
  };

  /* -------------------------------------------------------
     Account Service (Profile & Password)
     ------------------------------------------------------- */
  const accountService = {
    async getProfile() {
      if (!cfg().USE_MOCK_API) {
        return api().get(cfg().ENDPOINTS.ACCOUNT_PROFILE);
      }
      return db().simulateLatency(db().read().account);
    },

    async updateProfile(updates) {
      if (!cfg().USE_MOCK_API) {
        return api().put(cfg().ENDPOINTS.ACCOUNT_PROFILE, updates);
      }
      const data = db().read();
      Object.assign(data.account, updates);
      db().write(data);
      return db().simulateLatency(data.account);
    },

    async changePassword({ currentPassword, newPassword }) {
      if (!cfg().USE_MOCK_API) {
        return api().put(cfg().ENDPOINTS.ACCOUNT_PASSWORD, { currentPassword, newPassword });
      }
      // Never store passwords in localStorage; backend handles hashing & verification
      return db().simulateLatency({ updated: true });
    },

    async resetDemoData() {
      if (!cfg().USE_MOCK_API) {
        throw new window.NIHAYA.ApiError('Demo reset is disabled in production API mode.', 400);
      }
      db().reset();
      return db().simulateLatency({ reset: true });
    },
  };

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.services = {
    dashboard: dashboardService,
    products: productService,
    categories: categoryService,
    orders: orderService,
    customers: customerService,
    marketing: marketingService,
    account: accountService,
  };
})();


/* =========================================================
   NIHAYA Admin - Centralized Form Validation Helpers
   ========================================================= */

(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const CODE_RE = /^[A-Z0-9_-]{3,24}$/;

  function isBlank(val) {
    return !String(val ?? '').trim();
  }

  function isValidEmail(email) {
    return EMAIL_RE.test(String(email ?? '').trim());
  }

  /** Validates the Add/Edit Product form (name, category, positive price, whole-number stock). */
  function validateProduct(data) {
    const errors = {};
    if (isBlank(data.name)) errors.name = 'Product name is required.';
    else if (String(data.name).trim().length < 2) errors.name = 'Product name must be at least 2 characters.';

    if (isBlank(data.category)) errors.category = 'Please select a category.';

    const price = Number(data.price);
    if (data.price === '' || data.price === null || Number.isNaN(price)) {
      errors.price = 'Price is required.';
    } else if (price <= 0) {
      errors.price = 'Price must be greater than 0.';
    }

    const stock = Number(data.stock);
    if (data.stock === '' || data.stock === null || Number.isNaN(stock)) {
      errors.stock = 'Stock quantity is required.';
    } else if (!Number.isInteger(stock) || stock < 0) {
      errors.stock = 'Stock must be a whole number (0 or more).';
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validateCategory(data) {
    const errors = {};
    if (isBlank(data.name)) errors.name = 'Category name is required.';
    else if (String(data.name).trim().length < 2) errors.name = 'Category name must be at least 2 characters.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validatePromotion(data) {
    const errors = {};
    if (isBlank(data.name)) errors.name = 'Promotion name is required.';
    const code = String(data.code || '').trim().toUpperCase();
    if (!code) errors.code = 'Coupon code is required.';
    else if (!CODE_RE.test(code)) errors.code = 'Use 3-24 uppercase letters, numbers, - or _.';
    if (isBlank(data.discount)) errors.discount = 'Discount value is required.';
    if (isBlank(data.period)) errors.period = 'Promotion period is required.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validateBanner(data) {
    const errors = {};
    if (isBlank(data.title)) errors.title = 'Banner headline is required.';
    if (isBlank(data.subtitle)) errors.subtitle = 'Subheadline is required.';
    if (isBlank(data.cta)) errors.cta = 'Button label is required.';
    if (isBlank(data.schedule)) errors.schedule = 'Schedule is required.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validateProfile(data) {
    const errors = {};
    if (isBlank(data.fullName)) errors.fullName = 'Full name is required.';
    if (isBlank(data.username)) errors.username = 'Username is required.';
    if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validatePasswordChange(data) {
    const errors = {};
    if (isBlank(data.currentPassword)) errors.currentPassword = 'Current password is required.';
    const np = String(data.newPassword || '');
    if (np.length < 8) errors.newPassword = 'New password must be at least 8 characters.';
    if (np !== String(data.confirmPassword || '')) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validateLogin(data) {
    const errors = {};
    if (isBlank(data.identifier)) errors.identifier = 'Please enter your username or email.';
    if (isBlank(data.password)) errors.password = 'Please enter your password.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function validateResetPassword(data) {
    const errors = {};
    const np = String(data.newPassword || '');
    if (np.length < 8) errors.newPassword = 'Password must be at least 8 characters.';
    if (np !== String(data.confirmPassword || '')) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }

  function clearFormErrors(form) {
    if (!form) return;
    form.querySelectorAll('.field-error-msg').forEach((el) => el.remove());
    form.querySelectorAll('.input-invalid').forEach((el) => el.classList.remove('input-invalid'));
  }

  /** Displays inline red error messages below invalid inputs inside a form. */
  function showFormErrors(form, errors) {
    clearFormErrors(form);
    if (!form || !errors) return;
    Object.entries(errors).forEach(([fieldName, message]) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) return;
      input.classList.add('input-invalid');
      const err = document.createElement('p');
      err.className = 'field-error-msg';
      err.textContent = message;
      input.insertAdjacentElement('afterend', err);
    });
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.validators = {
    isBlank,
    isValidEmail,
    validateProduct,
    validateCategory,
    validatePromotion,
    validateBanner,
    validateProfile,
    validatePasswordChange,
    validateLogin,
    validateResetPassword,
    clearFormErrors,
    showFormErrors,
  };
})();


/* =========================================================
   NIHAYA Admin - Shared UI Helpers, Modals, Toasts & States
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

  /** Formats a number as Philippine Pesos (e.g. 1299 -> ₱1,299). */
  function formatPeso(n) {
    return '\u20B1' + (Number(n) || 0).toLocaleString('en-PH', { maximumFractionDigits: 0 });
  }

  /** Computes stock label ('Out of stock', 'Low stock', or 'In stock') from quantity. */
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

  function loadingStateHTML(label = 'Loading data...') {
    return `
      <div class="card state-card">
        <div class="spinner" aria-hidden="true"></div>
        <p class="state-title">${esc(label)}</p>
      </div>
    `;
  }

  function errorStateHTML(message = 'Something went wrong while loading data.') {
    return `
      <div class="card state-card">
        <p class="state-title" style="color:var(--danger)">Unable to load data</p>
        <p class="state-sub">${esc(message)}</p>
        <button type="button" class="btn-solid" data-retry-page style="margin-top:14px">Try again</button>
      </div>
    `;
  }

  function emptyStateHTML(title = 'No records found', subtitle = 'Try adjusting your search or filter.') {
    return `
      <div class="state-empty">
        <strong>${esc(title)}</strong>
        <p>${esc(subtitle)}</p>
      </div>
    `;
  }

  function setButtonBusy(btn, busy, busyLabel = 'Saving...') {
    if (!btn) return;
    if (busy) {
      btn.dataset.origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = busyLabel;
    } else {
      btn.disabled = false;
      if (btn.dataset.origText) btn.textContent = btn.dataset.origText;
    }
  }

  function toast(message, type = 'success') {
    const wrap = document.getElementById('toast-container');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' toast-error' : '');
    const icon = type === 'error' ? 'alert-circle' : 'check-circle-2';
    const color = type === 'error' ? '#fca5a5' : '#86efac';
    el.innerHTML = `<i data-lucide="${icon}" style="color:${color}"></i><span>${esc(message)}</span>`;
    wrap.appendChild(el);
    refreshIcons();
    setTimeout(() => el.remove(), 3400);
  }

  /** Opens the shared modal overlay with the requested title, body HTML, footer, and size preset. */
  function openModal({ title, subtitle = '', bodyHTML = '', footerHTML = '', size = 'md' }) {
    const root = document.getElementById('modal-root');
    const box = document.getElementById('modal-box');
    const titleEl = document.getElementById('modal-title');
    const subEl = document.getElementById('modal-subtitle');
    const bodyEl = document.getElementById('modal-body');
    const footerEl = document.getElementById('modal-footer');

    box.className =
      'modal-box' +
      (size === 'sm'
        ? ' modal-sm'
        : size === 'lg'
        ? ' modal-lg'
        : size === 'figma-customer'
        ? ' modal-figma-customer'
        : size === 'figma-order'
        ? ' modal-figma-order'
        : '');

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

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.ui = {
    esc,
    formatPeso,
    getStockLabel,
    statusPill,
    categoryIcon,
    refreshIcons,
    loadingStateHTML,
    errorStateHTML,
    emptyStateHTML,
    setButtonBusy,
    toast,
    openModal,
    closeModal,
    confirmDialog,
  };
})();


/* =========================================================
   NIHAYA Admin - Dashboard Page Controller
   ========================================================= */

(function () {
  /** Renders the Dashboard Overview page (Revenue, Weekly Orders, Visitors, Recent Orders, Alerts, Best Sellers, Stock Watch). */
  async function renderDashboard(root) {
    const UI = window.NIHAYA.ui;
    const { dashboard } = window.NIHAYA.services;

    root.innerHTML = UI.loadingStateHTML('Loading dashboard overview...');

    try {
      const data = await dashboard.getOverview();
      const maxBar = Math.max(...data.weeklyOrders.map((w) => w.count), 1);

      root.innerHTML = `
        <div class="page-stack">
          <section class="hero-banner">
            <div>
              <h1>Overview</h1>
              <p>Welcome back, ${UI.esc(data.account.fullName)}. Here is how Nihaya is doing over the last 30 days.</p>
            </div>
          </section>

          <section class="grid-dash-row1">
            <div class="card">
              <div class="card-head">
                <span class="chip">Revenue</span>
                <a href="./orders.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
              </div>
              <p class="rev-big">${UI.formatPeso(data.totalRevenue)}</p>
              <p class="rev-sub">${UI.esc(data.revenueGrowthLabel)}</p>
              <div class="mini-stats-3">
                <div>
                  <div class="mini-stat-val">${data.totalOrders.toLocaleString()}</div>
                  <div class="mini-stat-lbl">Orders</div>
                </div>
                <div>
                  <div class="mini-stat-val">${UI.formatPeso(data.avgOrder)}</div>
                  <div class="mini-stat-lbl">Avg. order</div>
                </div>
                <div>
                  <div class="mini-stat-val">${UI.esc(data.conversionRate)}</div>
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
                ${data.weeklyOrders
                  .map((w) => {
                    const pct = Math.max(18, Math.round((w.count / maxBar) * 100));
                    return `
                      <div class="bar-col">
                        <span class="bar-num">${w.count}</span>
                        <div class="bar-fill" style="height:${pct}%"></div>
                        <span class="bar-day">${UI.esc(w.day)}</span>
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
                  <div class="visitors-val">${data.visitors.perDay.toLocaleString()}</div>
                  <div class="visitors-lbl">Per day</div>
                </div>
                <div>
                  <div class="visitors-val">${data.visitors.perWeek.toLocaleString()}</div>
                  <div class="visitors-lbl">Per week</div>
                </div>
                <div>
                  <div class="visitors-val">${data.visitors.perMonth.toLocaleString()}</div>
                  <div class="visitors-lbl">Per month</div>
                </div>
              </div>
            </div>
          </section>

          <section class="grid-dash-row2">
            <div class="card">
              <div class="card-head">
                <span class="chip">Recent orders</span>
                <a href="./orders.html" class="view-all">View all <i data-lucide="arrow-right"></i></a>
              </div>
              <div class="clean-list">
                ${
                  data.recentOrders.length === 0
                    ? UI.emptyStateHTML('No recent orders', 'Orders will appear here once placed.')
                    : data.recentOrders
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
                        .join('')
                }
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
                    <span class="dot" style="background:var(--primary)"></span>${data.alerts.lowStockCount} items
                  </span>
                </a>
                <a href="./orders.html" class="row-between clickable-row">
                  <span style="font-size:13.5px;color:var(--ink-dark)">Failed payments</span>
                  <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--danger)">
                    <span class="dot" style="background:var(--danger)"></span>${data.alerts.failedPaymentsCount}
                  </span>
                </a>
                <a href="./orders.html" class="row-between clickable-row">
                  <span style="font-size:13.5px;color:var(--ink-dark)">Pending orders</span>
                  <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--primary)">
                    <span class="dot" style="background:var(--primary)"></span>${data.alerts.pendingOrdersCount}
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section class="grid-dash-row2">
            <div class="card">
              <div class="card-head">
                <span class="chip">Best sellers</span>
                <a href="./products.html?view=all" class="view-all">View all <i data-lucide="arrow-right"></i></a>
              </div>
              <div class="clean-list">
                ${data.bestSellers
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
                ${data.stockWatch
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
        el.addEventListener('click', () =>
          window.NIHAYA.pages.openOrderModal(el.dataset.dashOrder)
        );
      });
      UI.refreshIcons();
    } catch (err) {
      root.innerHTML = UI.errorStateHTML(err.message);
      root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderDashboard(root));
    }
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.dashboard = renderDashboard;
})();


/* =========================================================
   NIHAYA Admin - Products, Categories & Add/Edit Product
   ========================================================= */

(function () {
  const uiState = {
    catSearch: '',
    prodSearch: '',
    prodFilter: 'All',
    prodCategory: 'All',
    prodSortKey: 'name',
    prodSortDir: 'asc',
    cachedProducts: [],
    cachedCategories: [],
  };

  /* -------------------------------------------------------
     Categories Grid View (products.html)
     ------------------------------------------------------- */
  /** Renders the Products Categories grid with stock distribution bars and Add Category card. */
  async function renderProductsCategories(root, skipFetch = false) {
    const UI = window.NIHAYA.ui;
    const { products, categories } = window.NIHAYA.services;

    if (!skipFetch) {
      root.innerHTML = UI.loadingStateHTML('Loading product categories...');
      try {
        const [prodList, catList] = await Promise.all([products.list(), categories.list()]);
        uiState.cachedProducts = prodList;
        uiState.cachedCategories = catList;
      } catch (err) {
        root.innerHTML = UI.errorStateHTML(err.message);
        root.querySelector('[data-retry-page]')?.addEventListener('click', () =>
          renderProductsCategories(root)
        );
        return;
      }
    }

    const q = uiState.catSearch.trim().toLowerCase();
    const filtered = uiState.cachedCategories.filter((c) => !q || c.name.toLowerCase().includes(q));
    const lowCount = uiState.cachedProducts.filter((p) => p.stock > 0 && p.stock <= 9).length;
    const outCount = uiState.cachedProducts.filter((p) => p.stock === 0).length;

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>Products</h1>
            <p>${uiState.cachedProducts.length} products in ${uiState.cachedCategories.length} categories. ${lowCount} are low on stock and ${outCount} ${outCount === 1 ? 'is' : 'are'} out of stock.</p>
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
              const items = uiState.cachedProducts.filter((p) => p.category === cat.name);
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
      const pos = e.target.selectionStart;
      renderProductsCategories(root, true);
      const next = document.getElementById('cat-search-input');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });

    root.querySelector('#hero-add-cat-btn').addEventListener('click', () => openCategoryModal(null, root));
    root.querySelector('#dashed-add-cat-btn').addEventListener('click', () => openCategoryModal(null, root));

    root.querySelectorAll('[data-open-cat]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.cat-preview-tools')) return;
        window.location.href = './products.html?view=all&category=' + encodeURIComponent(el.dataset.openCat);
      });
    });

    root.querySelectorAll('[data-edit-cat]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCategoryModal(btn.dataset.editCat, root);
      });
    });

    root.querySelectorAll('[data-del-cat]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cat = uiState.cachedCategories.find((c) => c.id === btn.dataset.delCat);
        if (!cat) return;
        UI.confirmDialog({
          title: `Delete "${cat.name}"?`,
          message: 'This category will be removed from the Products grid.',
          confirmLabel: 'Delete',
          danger: true,
          onConfirm: async () => {
            try {
              await categories.remove(cat.id);
              UI.toast(`Deleted category "${cat.name}".`);
              renderProductsCategories(root);
            } catch (err) {
              UI.toast(err.message || 'Failed to delete category.', 'error');
            }
          },
        });
      });
    });

    UI.refreshIcons();
  }

  function openCategoryModal(catId, root) {
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;
    const { categories } = window.NIHAYA.services;
    const existing = catId ? uiState.cachedCategories.find((c) => c.id === catId) : null;
    const icons = ['smartphone', 'laptop', 'headphones', 'plug-zap', 'battery-charging', 'watch'];
    let picked = existing?.icon || 'smartphone';

    UI.openModal({
      title: existing ? `Manage Category - ${existing.name}` : 'New Category',
      size: 'sm',
      bodyHTML: `
        <form id="cat-form" class="page-stack" style="gap:14px" novalidate>
          <div>
            <label class="field-label">Category Name *</label>
            <input name="name" class="figma-input" value="${UI.esc(existing?.name || '')}" placeholder="e.g. Smartwatches" />
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
        <button type="submit" id="cat-submit-btn" form="cat-form" class="btn-solid">${existing ? 'Save Changes' : 'Add Category'}</button>
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

    document.getElementById('cat-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = new FormData(form).get('name');
      const check = V.validateCategory({ name });
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('cat-submit-btn');
      UI.setButtonBusy(btn, true);
      try {
        if (existing) {
          await categories.update(existing.id, { name: String(name).trim(), icon: picked });
          UI.toast('Category updated.');
        } else {
          await categories.create({ name: String(name).trim(), icon: picked });
          UI.toast(`Category "${String(name).trim()}" added.`);
        }
        UI.closeModal();
        renderProductsCategories(root);
      } catch (err) {
        UI.toast(err.message || 'Failed to save category.', 'error');
        UI.setButtonBusy(btn, false);
      }
    });
  }

  /* -------------------------------------------------------
     All Products Table View (products.html?view=all)
     ------------------------------------------------------- */
  /** Renders the searchable, filterable, sortable All Products table for a selected category or full catalog. */
  async function renderProductsAll(root, skipFetch = false) {
    const UI = window.NIHAYA.ui;
    const { products, categories } = window.NIHAYA.services;

    if (!skipFetch) {
      const catParam = new URLSearchParams(window.location.search).get('category');
      if (catParam) uiState.prodCategory = catParam;
      root.innerHTML = UI.loadingStateHTML('Loading products...');
      try {
        const [prodList, catList] = await Promise.all([products.list(), categories.list()]);
        uiState.cachedProducts = prodList;
        uiState.cachedCategories = catList;
      } catch (err) {
        root.innerHTML = UI.errorStateHTML(err.message);
        root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderProductsAll(root));
        return;
      }
    }

    const q = uiState.prodSearch.trim().toLowerCase();
    const lowCount = uiState.cachedProducts.filter((p) => p.stock > 0 && p.stock <= 9).length;
    const outCount = uiState.cachedProducts.filter((p) => p.stock === 0).length;

    const filtered = uiState.cachedProducts
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
            <p>${uiState.cachedProducts.length} products across ${uiState.cachedCategories.length} categories &middot; ${lowCount} low on stock${uiState.prodCategory !== 'All' ? ` &middot; Filtered: ${UI.esc(uiState.prodCategory)}` : ''}</p>
          </div>
          <div class="hero-controls">
            <div class="hero-search">
              <i data-lucide="search"></i>
              <input id="prod-all-search" type="text" value="${UI.esc(uiState.prodSearch)}" placeholder="Search by product name" />
            </div>
            <a href="./add-product.html" class="btn-hero-green">Add Product</a>
          </div>
        </section>

        <section class="grid-3">
          <div class="card kpi-card"><span class="chip">Total products</span><p class="kpi-value">${uiState.cachedProducts.length}</p></div>
          <div class="card kpi-card"><span class="chip">Low stock</span><p class="kpi-value">${lowCount}</p></div>
          <div class="card kpi-card"><span class="chip">Out of stock</span><p class="kpi-value">${outCount}</p></div>
        </section>

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
                    ? `<tr><td colspan="6">${UI.emptyStateHTML('No matching products', 'Try clearing filters or add a new product.')}</td></tr>`
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
                                <a href="./add-product.html?id=${encodeURIComponent(p.id)}" class="btn-outline-sm">Edit</a>
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
      const pos = e.target.selectionStart;
      renderProductsAll(root, true);
      const next = document.getElementById('prod-all-search');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });

    root.querySelector('#clear-cat-filter')?.addEventListener('click', () => {
      uiState.prodCategory = 'All';
      window.location.href = './products.html?view=all';
    });

    root.querySelectorAll('[data-pf]').forEach((b) =>
      b.addEventListener('click', () => {
        uiState.prodFilter = b.dataset.pf;
        renderProductsAll(root, true);
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
        renderProductsAll(root, true);
      })
    );

    UI.refreshIcons();
  }

  /* -------------------------------------------------------
     Add / Edit Product Page (add-product.html)
     ------------------------------------------------------- */
  /** Renders the Add/Edit Product form with image preview, specs, validation, and create/update/delete actions. */
  async function renderAddProduct(root) {
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;
    const { products, categories } = window.NIHAYA.services;
    const editId = new URLSearchParams(window.location.search).get('id');

    root.innerHTML = UI.loadingStateHTML(editId ? 'Loading product details...' : 'Preparing product form...');

    let editing = null;
    let catList = [];
    try {
      catList = await categories.list();
      if (editId) editing = await products.getById(editId);
    } catch (err) {
      root.innerHTML = UI.errorStateHTML(err.message);
      root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderAddProduct(root));
      return;
    }

    let mainImage = editing?.image || '';
    let featured = editing ? Boolean(editing.featured) : true;
    const selectedCategory = editing?.category || catList[0]?.name || 'Cellphone';
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

        <form id="figma-add-product-form" class="card" novalidate>
          <div class="grid-add-product">
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

            <div class="page-stack" style="gap:16px">
              <div>
                <label class="field-label">Product Name *</label>
                <input name="name" class="figma-input" value="${UI.esc(editing?.name || '')}" placeholder="e.g. Samsung Galaxy S24" />
              </div>

              <div class="grid-3" style="gap:12px">
                <div>
                  <label class="field-label">Category *</label>
                  <select id="ap-category" name="category" class="figma-select">
                    ${catList
                      .map((c) => `<option value="${UI.esc(c.name)}" ${selectedCategory === c.name ? 'selected' : ''}>${UI.esc(c.name)}</option>`)
                      .join('')}
                  </select>
                </div>
                <div>
                  <label class="field-label">Price (PHP) *</label>
                  <input name="price" type="number" min="0" step="any" class="figma-input" value="${UI.esc(editing?.price ?? '')}" placeholder="\u20B1 0.00" />
                </div>
                <div>
                  <label class="field-label">Stock *</label>
                  <input name="stock" type="number" min="0" step="1" class="figma-input" value="${UI.esc(editing?.stock ?? '')}" placeholder="0" />
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
              <button type="submit" id="ap-save-btn" class="btn-solid">${editing ? 'Save Changes' : 'Save Product'}</button>
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
        dz.innerHTML = `<img src="${UI.esc(mainImage)}" alt="Preview" style="max-height:130px;border-radius:12px;object-fit:contain" />`;
      };
      reader.readAsDataURL(file);
    });

    root.querySelector('#ap-delete-btn')?.addEventListener('click', () => {
      UI.confirmDialog({
        title: `Delete "${editing.name}"?`,
        message: 'This product will be permanently removed from your store catalog.',
        confirmLabel: 'Delete Product',
        danger: true,
        onConfirm: async () => {
          try {
            await products.remove(editing.id);
            UI.toast(`Deleted "${editing.name}".`);
            window.location.href = './products.html?view=all';
          } catch (err) {
            UI.toast(err.message || 'Failed to delete product.', 'error');
          }
        },
      });
    });

    root.querySelector('#figma-add-product-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
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

      const check = V.validateProduct(payload);
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('ap-save-btn');
      UI.setButtonBusy(btn, true, editing ? 'Saving...' : 'Creating...');
      try {
        if (editing) {
          await products.update(editing.id, payload);
          UI.toast(`Updated "${payload.name}".`);
        } else {
          await products.create(payload);
          UI.toast(`Added "${payload.name}" to your shop.`);
        }
        window.location.href = './products.html?view=all';
      } catch (err) {
        UI.toast(err.message || 'Failed to save product.', 'error');
        UI.setButtonBusy(btn, false);
      }
    });

    UI.refreshIcons();
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.products = renderProductsCategories;
  window.NIHAYA.pages['products-all'] = renderProductsAll;
  window.NIHAYA.pages['add-product'] = renderAddProduct;
})();


/* =========================================================
   NIHAYA Admin - Customers Page & Figma Customer Overlay
   ========================================================= */

(function () {
  const uiState = {
    search: '',
    filter: 'All',
    cachedItems: [],
    cachedSummary: { totalCustomers: 0, newThisMonth: 0, repeatCustomers: 0 },
  };

  /** Renders the Customers list page with email search, KPI cards, and status filter pills. */
  async function renderCustomers(root, skipFetch = false) {
    const UI = window.NIHAYA.ui;
    const { customers } = window.NIHAYA.services;

    if (!skipFetch) {
      root.innerHTML = UI.loadingStateHTML('Loading customers...');
      try {
        const res = await customers.list();
        uiState.cachedItems = res.items || [];
        uiState.cachedSummary = res.summary || {
          totalCustomers: uiState.cachedItems.length,
          newThisMonth: uiState.cachedItems.filter((c) => c.status === 'New').length,
          repeatCustomers: uiState.cachedItems.filter((c) => c.orders >= 2).length,
        };
      } catch (err) {
        root.innerHTML = UI.errorStateHTML(err.message);
        root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderCustomers(root));
        return;
      }
    }

    const q = uiState.search.trim().toLowerCase();
    const filtered = uiState.cachedItems.filter((c) => {
      const matchQ = !q || c.email.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
      const matchF = uiState.filter === 'All' || c.status === uiState.filter;
      return matchQ && matchF;
    });

    const { totalCustomers, newThisMonth, repeatCustomers } = uiState.cachedSummary;

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
              <input id="cust-search-input" type="text" value="${UI.esc(uiState.search)}" placeholder="Search by email" />
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
                .map((tab) => `<button type="button" class="filter-pill ${uiState.filter === tab ? 'active' : ''}" data-cf="${tab}">${tab}</button>`)
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
                    ? `<tr><td colspan="6">${UI.emptyStateHTML('No customers match your search', 'Try a different email or status filter.')}</td></tr>`
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
      uiState.search = e.target.value;
      const pos = e.target.selectionStart;
      renderCustomers(root, true);
      const next = document.getElementById('cust-search-input');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });

    root.querySelectorAll('[data-cf]').forEach((b) =>
      b.addEventListener('click', () => {
        uiState.filter = b.dataset.cf;
        renderCustomers(root, true);
      })
    );

    root.querySelectorAll('[data-view-cust]').forEach((b) =>
      b.addEventListener('click', () => openCustomerModal(b.dataset.viewCust))
    );

    UI.refreshIcons();
  }

  /** Opens the Figma Customer Details overlay showing contact info, address, totals, and a View Orders button. */
  async function openCustomerModal(custId) {
    const UI = window.NIHAYA.ui;
    const { customers } = window.NIHAYA.services;

    UI.openModal({
      title: 'Customer',
      size: 'figma-customer',
      bodyHTML: UI.loadingStateHTML('Loading customer details...'),
    });

    try {
      const { customer: c, orders: custOrders } = await customers.getById(custId);
      const latestOrder = custOrders[0]
        ? `#${custOrders[0].id} &middot; ${UI.esc(custOrders[0].date)}`
        : UI.esc(c.lastOrder || 'No orders yet');
      const firstName = c.name.split(' ')[0] || c.name;

      UI.openModal({
        title: c.name,
        size: 'figma-customer',
        bodyHTML: `
          <div class="figma-cust-modal">
            <h2 class="figma-cust-name">${UI.esc(c.name)}</h2>
            <p class="figma-cust-email">${UI.esc(c.email)}</p>

            <div class="figma-cust-details">
              <div class="figma-cust-row">
                <span class="figma-cust-label">Status</span>
                ${UI.statusPill(c.status)}
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Mobile</span>
                <span class="figma-cust-val">${UI.esc(c.phone)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Delivery address</span>
                <span class="figma-cust-val">${UI.esc(c.address || 'Not provided')}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Total orders</span>
                <span class="figma-cust-val">${c.orders}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Total spent</span>
                <span class="figma-cust-val">${UI.formatPeso(c.totalSpent)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Last order</span>
                <span class="figma-cust-val">${latestOrder}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Member since</span>
                <span class="figma-cust-val">${UI.esc(c.joined)}</span>
              </div>
            </div>

            <div class="figma-cust-actions">
              <button type="button" class="btn-outline" data-modal-close>Close</button>
              <a href="./orders.html?search=${encodeURIComponent(firstName)}" class="btn-solid">View Orders</a>
            </div>
          </div>
        `,
      });
    } catch (err) {
      UI.closeModal();
      UI.toast(err.message || 'Failed to load customer details.', 'error');
    }
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.customers = renderCustomers;
})();


/* =========================================================
   NIHAYA Admin - Marketing & Homepage Banner Page
   ========================================================= */

(function () {
  let cachedPromos = [];
  let cachedBanner = null;

  /** Renders the Marketing page with active promotions, promotions table, and live Homepage Banner controls. */
  async function renderMarketing(root) {
    const UI = window.NIHAYA.ui;
    const { marketing } = window.NIHAYA.services;

    root.innerHTML = UI.loadingStateHTML('Loading promotions and banner...');

    try {
      const data = await marketing.getOverview();
      cachedPromos = data.promotions || [];
      cachedBanner = data.banner;
    } catch (err) {
      root.innerHTML = UI.errorStateHTML(err.message);
      root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderMarketing(root));
      return;
    }

    const activePromos = cachedPromos.filter((p) => p.status === 'Active');
    const activeUpcoming = cachedPromos.filter((p) => p.status === 'Active' || p.status === 'Scheduled');
    const b = cachedBanner;

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
          <div class="card kpi-card"><span class="chip">Total promos</span><p class="kpi-value">${cachedPromos.length}</p></div>
          <div class="card kpi-card"><span class="chip">Banner status</span><p class="kpi-value">${b.active ? 'Active' : 'Paused'}</p></div>
        </section>

        <section class="grid-marketing">
          <div class="page-stack" style="gap:20px">
            <div class="card">
              <div class="card-head"><span class="chip">Active & upcoming</span></div>
              <div class="page-stack" style="gap:10px">
                ${
                  activeUpcoming.length === 0
                    ? UI.emptyStateHTML('No active promotions', 'Create a promotion to feature here.')
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
                    ${
                      cachedPromos.length === 0
                        ? `<tr><td colspan="5">${UI.emptyStateHTML('No promotions yet', 'Click Create Promotion to add one.')}</td></tr>`
                        : cachedPromos
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
                            .join('')
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

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

    root.querySelector('#mkt-banner-toggle').addEventListener('click', async () => {
      try {
        await marketing.updateBanner({ active: !b.active });
        UI.toast(`Homepage banner ${!b.active ? 'activated' : 'paused'}.`);
        renderMarketing(root);
      } catch (err) {
        UI.toast(err.message || 'Failed to update banner.', 'error');
      }
    });

    root.querySelector('#mkt-create-promo-btn').addEventListener('click', () => openPromoModal(null, root));
    root.querySelector('#mkt-edit-banner-btn').addEventListener('click', () => openBannerModal(root));
    root.querySelectorAll('[data-edit-promo]').forEach((btn) =>
      btn.addEventListener('click', () => openPromoModal(btn.dataset.editPromo, root))
    );

    UI.refreshIcons();
  }

  function openPromoModal(promoId, root) {
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;
    const { marketing } = window.NIHAYA.services;
    const existing = promoId ? cachedPromos.find((p) => p.id === promoId) : null;

    UI.openModal({
      title: existing ? `Edit Promotion - ${existing.name}` : 'New Promotion',
      bodyHTML: `
        <form id="promo-form" class="page-stack" style="gap:14px" novalidate>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="field-label">Promotion Name *</label><input name="name" class="figma-input" value="${UI.esc(existing?.name || '')}" placeholder="e.g. Holiday Sale" /></div>
            <div><label class="field-label">Coupon Code *</label><input name="code" class="figma-input" style="text-transform:uppercase" value="${UI.esc(existing?.code || '')}" placeholder="HOLIDAY20" /></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="field-label">Discount *</label><input name="discount" class="figma-input" value="${UI.esc(existing?.discount || '')}" placeholder="20% off" /></div>
            <div><label class="field-label">Period *</label><input name="period" class="figma-input" value="${UI.esc(existing?.period || 'Nov 1 - Dec 31')}" /></div>
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
        <button type="submit" id="promo-submit-btn" form="promo-form" class="btn-solid">${existing ? 'Save Changes' : 'Create Promotion'}</button>
      `,
    });

    document.getElementById('del-promo-btn')?.addEventListener('click', () => {
      UI.confirmDialog({
        title: `Delete "${existing.name}"?`,
        message: 'This promotion and its coupon code will be removed.',
        confirmLabel: 'Delete',
        danger: true,
        onConfirm: async () => {
          try {
            await marketing.deletePromotion(existing.id);
            UI.closeModal();
            UI.toast(`Deleted promotion "${existing.name}".`);
            renderMarketing(root);
          } catch (err) {
            UI.toast(err.message || 'Failed to delete promotion.', 'error');
          }
        },
      });
    });

    document.getElementById('promo-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get('name') || '').trim(),
        code: String(fd.get('code') || '').trim().toUpperCase(),
        discount: String(fd.get('discount') || '').trim(),
        period: String(fd.get('period') || '').trim(),
        subtitle: String(fd.get('subtitle') || fd.get('discount') || '').trim(),
        scope: String(fd.get('scope') || 'all products').trim(),
        status: fd.get('status'),
      };

      const check = V.validatePromotion(payload);
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('promo-submit-btn');
      UI.setButtonBusy(btn, true);
      try {
        if (existing) {
          await marketing.updatePromotion(existing.id, payload);
          UI.toast('Promotion updated.');
        } else {
          await marketing.createPromotion(payload);
          UI.toast(`Promotion "${payload.name}" created.`);
        }
        UI.closeModal();
        renderMarketing(root);
      } catch (err) {
        UI.toast(err.message || 'Failed to save promotion.', 'error');
        UI.setButtonBusy(btn, false);
      }
    });
  }

  function openBannerModal(root) {
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;
    const { marketing } = window.NIHAYA.services;
    const b = cachedBanner;

    UI.openModal({
      title: 'Edit Banner',
      subtitle: 'Update the live storefront hero banner preview.',
      size: 'sm',
      bodyHTML: `
        <form id="banner-form" class="page-stack" style="gap:14px" novalidate>
          <div><label class="field-label">Headline *</label><input name="title" class="figma-input" value="${UI.esc(b.title)}" /></div>
          <div><label class="field-label">Subheadline *</label><input name="subtitle" class="figma-input" value="${UI.esc(b.subtitle)}" /></div>
          <div><label class="field-label">Button Label *</label><input name="cta" class="figma-input" value="${UI.esc(b.cta)}" /></div>
          <div><label class="field-label">Schedule *</label><input name="schedule" class="figma-input" value="${UI.esc(b.schedule)}" /></div>
        </form>
      `,
      footerHTML: `
        <button type="button" class="btn-outline" data-modal-close>Cancel</button>
        <button type="submit" id="banner-submit-btn" form="banner-form" class="btn-solid">Save Banner</button>
      `,
    });

    document.getElementById('banner-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      const payload = {
        title: String(fd.get('title') || '').trim(),
        subtitle: String(fd.get('subtitle') || '').trim(),
        cta: String(fd.get('cta') || '').trim(),
        schedule: String(fd.get('schedule') || '').trim(),
      };
      const check = V.validateBanner(payload);
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('banner-submit-btn');
      UI.setButtonBusy(btn, true);
      try {
        await marketing.updateBanner(payload);
        UI.closeModal();
        UI.toast('Homepage banner updated.');
        renderMarketing(root);
      } catch (err) {
        UI.toast(err.message || 'Failed to update banner.', 'error');
        UI.setButtonBusy(btn, false);
      }
    });
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.marketing = renderMarketing;
})();


/* =========================================================
   NIHAYA Admin - Orders Page & Figma Order Details Overlay
   ========================================================= */

(function () {
  const uiState = {
    search: '',
    filter: 'All',
    urlSearchApplied: false,
    cachedItems: [],
    cachedSummary: { totalOrders: 0, processingCount: 0, deliveredCount: 0 },
  };

  /** Renders the Orders page with order search, KPI cards, status filter pills, and order rows. */
  async function renderOrders(root, skipFetch = false) {
    const UI = window.NIHAYA.ui;
    const { orders } = window.NIHAYA.services;

    if (!uiState.urlSearchApplied) {
      const urlSearch = new URLSearchParams(window.location.search).get('search');
      if (urlSearch) uiState.search = urlSearch;
      uiState.urlSearchApplied = true;
    }

    if (!skipFetch) {
      root.innerHTML = UI.loadingStateHTML('Loading orders...');
      try {
        const res = await orders.list();
        uiState.cachedItems = res.items || [];
        uiState.cachedSummary = res.summary || {
          totalOrders: uiState.cachedItems.length,
          processingCount: uiState.cachedItems.filter((o) => o.status === 'Processing').length,
          deliveredCount: uiState.cachedItems.filter((o) => o.status === 'Delivered').length,
        };
      } catch (err) {
        root.innerHTML = UI.errorStateHTML(err.message);
        root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderOrders(root));
        return;
      }
    }

    const q = uiState.search.trim().toLowerCase();
    const filtered = uiState.cachedItems.filter((o) => {
      const matchQ =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        (o.fullCustomer || '').toLowerCase().includes(q) ||
        o.item.toLowerCase().includes(q);
      const matchF = uiState.filter === 'All' || o.status === uiState.filter;
      return matchQ && matchF;
    });

    const { totalOrders, processingCount, deliveredCount } = uiState.cachedSummary;

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
              <input id="ord-search-input" type="text" value="${UI.esc(uiState.search)}" placeholder="Search by order #" />
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
                .map((tab) => `<button type="button" class="filter-pill ${uiState.filter === tab ? 'active' : ''}" data-of="${tab}">${tab}</button>`)
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
                    ? `<tr><td colspan="7">${UI.emptyStateHTML('No matching orders', 'Try adjusting your search or status filter.')}</td></tr>`
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
      uiState.search = e.target.value;
      const pos = e.target.selectionStart;
      renderOrders(root, true);
      const next = document.getElementById('ord-search-input');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });

    root.querySelectorAll('[data-of]').forEach((b) =>
      b.addEventListener('click', () => {
        uiState.filter = b.dataset.of;
        renderOrders(root, true);
      })
    );

    root.querySelectorAll('[data-view-ord]').forEach((b) =>
      b.addEventListener('click', () => openOrderModal(b.dataset.viewOrd))
    );

    UI.refreshIcons();
  }

  /** Opens the Figma Order Details overlay with Items, Customer, Delivery, Payment, Warranty, and status updates. */
  async function openOrderModal(orderId) {
    const UI = window.NIHAYA.ui;
    const { orders } = window.NIHAYA.services;

    UI.openModal({
      title: `Order #${orderId}`,
      size: 'figma-order',
      bodyHTML: UI.loadingStateHTML('Loading order details...'),
    });

    try {
      const o = await orders.getById(orderId);
      const qty = o.qty || 1;
      const shippingFee = o.shippingFee !== undefined ? o.shippingFee : 75;
      const subtotal = o.subtotal !== undefined ? o.subtotal : Math.max(0, o.total - shippingFee);
      const warrantyStatus = o.status === 'Delivered' ? 'Active' : 'Starts on delivery';

      const nextStepMap = {
        Pending: { next: 'Processing', label: 'Mark as Processing' },
        Processing: { next: 'Shipped', label: 'Mark as Shipped' },
        Shipped: { next: 'Delivered', label: 'Mark as Delivered' },
        Delivered: { next: 'Delivered', label: 'Save Status' },
      };
      const nextAction = nextStepMap[o.status] || { next: 'Shipped', label: 'Mark as Shipped' };

      UI.openModal({
        title: `Order #${o.id}`,
        size: 'figma-order',
        bodyHTML: `
          <div class="figma-cust-modal">
            <h2 class="figma-cust-name">Order #${UI.esc(o.id)}</h2>
            <p class="figma-cust-email">Placed ${UI.esc(o.date)} by ${UI.esc(o.fullCustomer)}</p>

            <div class="figma-cust-details">
              <div class="figma-cust-row">
                <span class="figma-cust-label">Status</span>
                ${UI.statusPill(o.status)}
              </div>

              <div class="figma-order-section">ITEMS</div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">${UI.esc(o.item)} &times; ${qty}</span>
                <span class="figma-cust-val">${UI.formatPeso(subtotal)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Subtotal</span>
                <span class="figma-cust-val">${UI.formatPeso(subtotal)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Shipping fee</span>
                <span class="figma-cust-val">${UI.formatPeso(shippingFee)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Total</span>
                <span class="figma-cust-val">${UI.formatPeso(o.total)}</span>
              </div>

              <div class="figma-order-section">CUSTOMER</div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Name</span>
                <span class="figma-cust-val">${UI.esc(o.fullCustomer)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Mobile</span>
                <span class="figma-cust-val">${UI.esc(o.mobile || '0917 234 5678')}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Email</span>
                <span class="figma-cust-val">${UI.esc(o.email)}</span>
              </div>

              <div class="figma-order-section">DELIVERY</div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Method</span>
                <span class="figma-cust-val">${UI.esc(o.deliveryMethod || 'Delivery')}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Address</span>
                <span class="figma-cust-val">${UI.esc(o.address)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Notes</span>
                <span class="figma-cust-val">${UI.esc(o.notes || 'None')}</span>
              </div>

              <div class="figma-order-section">PAYMENT</div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Method</span>
                <span class="figma-cust-val">${UI.esc(o.paymentMethod)}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Payment status</span>
                <span class="figma-cust-val">${UI.esc(o.paymentStatus)}</span>
              </div>

              <div class="figma-order-section">WARRANTY &amp; RETURNS</div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Replacement (3 days)</span>
                <span class="figma-cust-val">${warrantyStatus}</span>
              </div>
              <div class="figma-cust-row">
                <span class="figma-cust-label">Service warranty (1 month)</span>
                <span class="figma-cust-val">${warrantyStatus}</span>
              </div>
            </div>

            <div class="figma-order-status-field">
              <label class="figma-order-status-label" for="figma-ord-status-select">UPDATE STATUS</label>
              <select id="figma-ord-status-select" class="figma-order-select">
                ${['Pending', 'Processing', 'Shipped', 'Delivered']
                  .map((st) => `<option value="${st}" ${o.status === st ? 'selected' : ''}>${st}</option>`)
                  .join('')}
              </select>
            </div>

            <div class="figma-cust-actions">
              <button type="button" class="btn-outline" data-modal-close>Close</button>
              <button type="button" id="figma-ord-primary-btn" class="btn-solid">${nextAction.label}</button>
            </div>
          </div>
        `,
      });

      const applyStatus = async (status, triggerBtn) => {
        if (triggerBtn) UI.setButtonBusy(triggerBtn, true, 'Updating...');
        try {
          await orders.updateStatus(o.id, status);
          UI.toast(`Order #${o.id} updated to ${status}.`);
          window.NIHAYA.app.refreshCurrentPage();
          openOrderModal(o.id);
        } catch (err) {
          UI.toast(err.message || 'Failed to update order status.', 'error');
          if (triggerBtn) UI.setButtonBusy(triggerBtn, false);
        }
      };

      document.getElementById('figma-ord-status-select')?.addEventListener('change', (e) => {
        applyStatus(e.target.value, null);
      });

      document.getElementById('figma-ord-primary-btn')?.addEventListener('click', (e) => {
        applyStatus(nextAction.next, e.currentTarget);
      });
    } catch (err) {
      UI.closeModal();
      UI.toast(err.message || 'Failed to load order details.', 'error');
    }
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.orders = renderOrders;
  window.NIHAYA.pages.openOrderModal = openOrderModal;
})();


/* =========================================================
   NIHAYA Admin - My Account Page Controller
   ========================================================= */

(function () {
  /** Renders the My Account page for updating admin profile details, photo, and password. */
  async function renderAccount(root) {
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;
    const { account } = window.NIHAYA.services;

    root.innerHTML = UI.loadingStateHTML('Loading account settings...');

    let profile = null;
    try {
      profile = await account.getProfile();
    } catch (err) {
      root.innerHTML = UI.errorStateHTML(err.message);
      root.querySelector('[data-retry-page]')?.addEventListener('click', () => renderAccount(root));
      return;
    }

    let photo = profile.photo || '';

    root.innerHTML = `
      <div class="page-stack">
        <section class="hero-banner">
          <div>
            <h1>My account</h1>
            <p>Manage your profile and sign-in details.</p>
          </div>
        </section>

        <section class="grid-account">
          <form id="acct-profile-form" class="card page-stack" style="gap:16px" novalidate>
            <div><span class="chip">Profile</span></div>

            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div class="account-avatar-lg" id="acct-avatar-box">
                ${photo ? `<img src="${UI.esc(photo)}" alt="" />` : UI.esc((profile.fullName[0] || 'R').toUpperCase())}
              </div>
              <div>
                <div style="font-size:16px;font-weight:700;color:var(--primary)">${UI.esc(profile.fullName)}</div>
                <div style="font-size:12.5px;color:var(--ink-subtle)">${UI.esc(profile.role)}</div>
              </div>
              <label class="btn-outline" style="height:38px;padding:0 20px;font-size:13px;cursor:pointer">
                Change photo
                <input id="acct-photo-input" type="file" accept="image/*" class="hidden" />
              </label>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div><label class="field-label">Full Name *</label><input name="fullName" class="figma-input" value="${UI.esc(profile.fullName)}" /></div>
              <div><label class="field-label">Username *</label><input name="username" class="figma-input" value="${UI.esc(profile.username)}" /></div>
            </div>

            <div><label class="field-label">Email Address *</label><input name="email" type="email" class="figma-input" value="${UI.esc(profile.email)}" /></div>
            <div><label class="field-label">Mobile Number</label><input name="mobile" class="figma-input" value="${UI.esc(profile.mobile)}" /></div>

            <div style="display:flex;justify-content:flex-end;gap:10px;padding-top:6px">
              <a href="./dashboard.html" class="btn-outline">Cancel</a>
              <button type="submit" id="acct-save-btn" class="btn-solid">Save changes</button>
            </div>
          </form>

          <form id="acct-password-form" class="card page-stack" style="gap:14px" novalidate>
            <div><span class="chip">Password</span></div>

            <div><label class="field-label">Current Password *</label><input name="currentPassword" type="password" class="figma-input" placeholder="Enter current password" /></div>
            <div>
              <label class="field-label">New Password *</label>
              <input name="newPassword" type="password" class="figma-input" placeholder="Enter a new password" />
              <p style="margin:6px 0 0;font-size:11.5px;color:var(--ink-subtle)">Use a long, unique password you don't use elsewhere.</p>
            </div>
            <div><label class="field-label">Confirm New Password *</label><input name="confirmPassword" type="password" class="figma-input" placeholder="Re-enter the new password" /></div>

            <button type="submit" id="acct-pw-btn" class="btn-solid btn-full" style="margin-top:4px">Update password</button>
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

    root.querySelector('#acct-profile-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      const payload = {
        fullName: String(fd.get('fullName') || '').trim(),
        username: String(fd.get('username') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        mobile: String(fd.get('mobile') || '').trim(),
        photo,
      };

      const check = V.validateProfile(payload);
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('acct-save-btn');
      UI.setButtonBusy(btn, true);
      try {
        await account.updateProfile(payload);
        UI.toast('Profile changes saved.');
        window.NIHAYA.app.syncShell();
      } catch (err) {
        UI.toast(err.message || 'Failed to update profile.', 'error');
      } finally {
        UI.setButtonBusy(btn, false);
      }
    });

    root.querySelector('#acct-password-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      const payload = {
        currentPassword: String(fd.get('currentPassword') || ''),
        newPassword: String(fd.get('newPassword') || ''),
        confirmPassword: String(fd.get('confirmPassword') || ''),
      };

      const check = V.validatePasswordChange(payload);
      if (!check.valid) {
        V.showFormErrors(form, check.errors);
        return;
      }
      V.clearFormErrors(form);

      const btn = document.getElementById('acct-pw-btn');
      UI.setButtonBusy(btn, true, 'Updating...');
      try {
        await account.changePassword({
          currentPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        });
        form.reset();
        UI.toast('Password updated.');
      } catch (err) {
        UI.toast(err.message || 'Failed to update password.', 'error');
      } finally {
        UI.setButtonBusy(btn, false);
      }
    });

    UI.refreshIcons();
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.account = renderAccount;
})();


/* =========================================================
   NIHAYA Admin - Auth Pages Controller
   (login, forgot-password, forgot-username, reset-password)
   ========================================================= */

(function () {
  /** Initializes form validation and authService handlers for Login and Account Recovery pages. */
  function initAuthPage(authPage) {
    const auth = window.NIHAYA.auth;
    const UI = window.NIHAYA.ui;
    const V = window.NIHAYA.validators;

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
      document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-id').value.trim();
        const password = document.getElementById('login-pw').value;
        const remember = Boolean(document.getElementById('login-keep')?.checked);
        const idErr = document.getElementById('login-id-error');
        const pwErr = document.getElementById('login-pw-error');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        idErr.classList.add('hidden');
        pwErr.classList.add('hidden');

        const check = V.validateLogin({ identifier, password });
        if (!check.valid) {
          if (check.errors.identifier) {
            idErr.textContent = check.errors.identifier;
            idErr.classList.remove('hidden');
          }
          if (check.errors.password) {
            pwErr.textContent = check.errors.password;
            pwErr.classList.remove('hidden');
          }
          return;
        }

        UI.setButtonBusy(submitBtn, true, 'Signing in...');
        try {
          await auth.login({ identifier, password, remember });
          const next = new URLSearchParams(window.location.search).get('next');
          window.location.href = next && next.startsWith('/') ? next : './dashboard.html';
        } catch (err) {
          pwErr.textContent = err.message || 'Sign-in failed. Please check your credentials.';
          pwErr.classList.remove('hidden');
          UI.setButtonBusy(submitBtn, false);
        }
      });
    }

    if (authPage === 'forgot-password') {
      document.getElementById('fp-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('fp-email').value.trim();
        const errEl = document.getElementById('fp-email-error');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        if (!V.isValidEmail(email)) {
          errEl.textContent = 'Please enter a valid email address.';
          errEl.classList.remove('hidden');
          return;
        }
        errEl.classList.add('hidden');

        UI.setButtonBusy(submitBtn, true, 'Sending...');
        try {
          await auth.requestPasswordReset(email);
          document.getElementById('fp-form').classList.add('hidden');
          document.getElementById('fp-sent').classList.remove('hidden');
        } catch (err) {
          errEl.textContent = err.message || 'Unable to send reset link.';
          errEl.classList.remove('hidden');
        } finally {
          UI.setButtonBusy(submitBtn, false);
        }
      });
    }

    if (authPage === 'forgot-username') {
      document.getElementById('fu-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('fu-email').value.trim();
        const errEl = document.getElementById('fu-email-error');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        if (!V.isValidEmail(email)) {
          errEl.textContent = 'Please enter a valid email address.';
          errEl.classList.remove('hidden');
          return;
        }
        errEl.classList.add('hidden');

        UI.setButtonBusy(submitBtn, true, 'Sending...');
        try {
          await auth.requestUsernameReminder(email);
          document.getElementById('fu-form').classList.add('hidden');
          document.getElementById('fu-sent').classList.remove('hidden');
        } catch (err) {
          errEl.textContent = err.message || 'Unable to send username reminder.';
          errEl.classList.remove('hidden');
        } finally {
          UI.setButtonBusy(submitBtn, false);
        }
      });

      document.getElementById('fu-different')?.addEventListener('click', () => {
        document.getElementById('fu-sent').classList.add('hidden');
        document.getElementById('fu-form').classList.remove('hidden');
      });
    }

    if (authPage === 'reset-password') {
      document.getElementById('rp-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('rp-new').value;
        const confirmPassword = document.getElementById('rp-confirm').value;
        const newErr = document.getElementById('rp-new-error');
        const confErr = document.getElementById('rp-confirm-error');
        const submitBtn = e.target.querySelector('button[type="submit"]');

        newErr.classList.add('hidden');
        confErr.classList.add('hidden');

        const check = V.validateResetPassword({ newPassword, confirmPassword });
        if (!check.valid) {
          if (check.errors.newPassword) {
            newErr.textContent = check.errors.newPassword;
            newErr.classList.remove('hidden');
          }
          if (check.errors.confirmPassword) {
            confErr.textContent = check.errors.confirmPassword;
            confErr.classList.remove('hidden');
          }
          return;
        }

        const token = new URLSearchParams(window.location.search).get('token') || '';
        UI.setButtonBusy(submitBtn, true, 'Resetting...');
        try {
          await auth.resetPassword({ token, newPassword });
          document.getElementById('rp-form').classList.add('hidden');
          document.getElementById('rp-done').classList.remove('hidden');
        } catch (err) {
          confErr.textContent = err.message || 'Unable to reset password.';
          confErr.classList.remove('hidden');
        } finally {
          UI.setButtonBusy(submitBtn, false);
        }
      });
    }
  }

  window.NIHAYA = window.NIHAYA || {};
  window.NIHAYA.pages = window.NIHAYA.pages || {};
  window.NIHAYA.pages.initAuthPage = initAuthPage;
})();


/* =========================================================
   NIHAYA Admin - Application Bootstrap & Shell Controller
   ========================================================= */

(function () {
  /** Main application entry point: checks auth, binds sidebar/topbar events, and renders the active HTML page. */
  function boot() {
    const { auth, ui: UI, pages, services } = window.NIHAYA;

    // 1. Auth pages (login, forgot-password, forgot-username, reset-password)
    const authPage = document.body?.dataset?.authPage;
    if (authPage) {
      pages.initAuthPage(authPage);
      return;
    }

    // 2. Protected route guard for admin pages
    const shell = document.getElementById('app-shell');
    const pageRoot = document.getElementById('page-root');
    if (!shell || !pageRoot) return;
    if (!auth.requireAuth()) return;

    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const profileBtn = document.getElementById('profile-btn');
    const profilePopover = document.getElementById('profile-popover');

    function closeMobile() {
      shell.classList.remove('mobile-open');
      mobileBackdrop?.classList.add('hidden');
    }

    async function syncShell() {
      try {
        const user = (await services.account.getProfile()) || auth.getUser();
        if (!user) return;
        const nameEl = document.getElementById('topbar-admin-name');
        const ddName = document.getElementById('dropdown-admin-name');
        const ddEmail = document.getElementById('dropdown-admin-email');
        const orb = document.getElementById('topbar-avatar');

        if (nameEl) nameEl.textContent = user.fullName || 'Admin';
        if (ddName) ddName.textContent = user.fullName || 'Admin';
        if (ddEmail) ddEmail.textContent = user.email || '';
        if (orb) orb.style.backgroundImage = user.photo ? `url("${user.photo}")` : '';
      } catch {
        // fallback silently if profile header fails
      }
    }

    function resolvePageKey() {
      const bodyPage = document.body?.dataset?.page || 'dashboard';
      const params = new URLSearchParams(window.location.search);
      if (bodyPage === 'products' && params.get('view') === 'all') {
        return 'products-all';
      }
      return bodyPage;
    }

    function refreshCurrentPage() {
      const key = resolvePageKey();
      const activeNav = key === 'products-all' || key === 'add-product' ? 'products' : key;

      document.querySelectorAll('#sidebar-nav .nav-pill').forEach((link) => {
        link.classList.toggle('active', link.dataset.page === activeNav);
      });

      const renderer = pages[key] || pages.dashboard;
      if (typeof renderer === 'function') {
        renderer(pageRoot);
      }
      syncShell();
      UI.refreshIcons();
    }

    // Mobile drawer bindings
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
      shell.classList.add('mobile-open');
      mobileBackdrop?.classList.remove('hidden');
    });
    document.getElementById('mobile-close-btn')?.addEventListener('click', closeMobile);
    mobileBackdrop?.addEventListener('click', closeMobile);
    document.querySelectorAll('#sidebar-nav .nav-pill').forEach((a) =>
      a.addEventListener('click', closeMobile)
    );

    // Profile dropdown bindings
    profileBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      profilePopover?.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.profile-anchor')) profilePopover?.classList.add('hidden');
    });

    document.getElementById('dropdown-account-btn')?.addEventListener('click', () => {
      profilePopover?.classList.add('hidden');
      window.location.href = './my-account.html';
    });

    const resetBtn = document.getElementById('dropdown-reset-btn');
    if (resetBtn) {
      if (!window.NIHAYA.config.USE_MOCK_API) {
        resetBtn.classList.add('hidden');
      } else {
        resetBtn.addEventListener('click', () => {
          profilePopover?.classList.add('hidden');
          UI.confirmDialog({
            title: 'Reset demo data?',
            message: 'Restore all NIHAYA mock data back to defaults?',
            confirmLabel: 'Reset Data',
            danger: true,
            onConfirm: async () => {
              await services.account.resetDemoData();
              UI.toast('Demo data restored.');
              refreshCurrentPage();
            },
          });
        });
      }
    }

    document.getElementById('dropdown-logout-btn')?.addEventListener('click', () => {
      profilePopover?.classList.add('hidden');
      UI.confirmDialog({
        title: 'Log out of NIHAYA?',
        message: 'You will be signed out of the admin portal.',
        confirmLabel: 'Log out',
        danger: false,
        onConfirm: async () => {
          await auth.logout();
          window.location.href = './login.html';
        },
      });
    });

    window.NIHAYA.app = {
      refreshCurrentPage,
      syncShell,
    };

    refreshCurrentPage();
  }

  window.addEventListener('DOMContentLoaded', boot);
})();
