// API Configuration (Replace with actual backend URLs)
const API_BASE_URL = "";

const API = {
  products: {
    list: (params) => `${API_BASE_URL}/products?${new URLSearchParams(params)}`,
    detail: (id) => `${API_BASE_URL}/products/${id}`,
    search: (query) =>
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
  },
  cart: {
    get: () => `${API_BASE_URL}/cart`,
    add: () => `${API_BASE_URL}/cart/items`,
    update: (id) => `${API_BASE_URL}/cart/items/${id}`,
    remove: (id) => `${API_BASE_URL}/cart/items/${id}`,
  },
  checkout: {
    create: () => `${API_BASE_URL}/orders`,
    validate: () => `${API_BASE_URL}/orders/validate`,
  },
  categories: {
    list: () => `${API_BASE_URL}/categories`,
  },
};

// Store Mock Data (Full product catalog for instant interactivity)

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Smartphone X",
    brand: "Brand",
    category: "cellphone",
    price: 12990,
    inStock: true,
    featured: true, // shown in homepage hero spotlight
    description: "5G speed, long-life battery, and a crisp OLED display.",
    sales: 120,
    date: "2026-03-01",
  },
  {
    id: "2",
    name: "Galaxy A Series",
    brand: "Brand",
    category: "cellphone",
    price: 9490,
    inStock: true,
    sales: 95,
    date: "2026-02-15",
  },
  {
    id: "3",
    name: "Everyday Laptop",
    brand: "Brand",
    category: "laptop",
    price: 24990,
    inStock: true,
    sales: 70,
    date: "2026-01-20",
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    brand: "Brand",
    category: "airbuds",
    price: 1299,
    inStock: true,
    sales: 150,
    date: "2026-03-10",
  },
  {
    id: "5",
    name: "Fast Charger 65W",
    brand: "Brand",
    category: "charger",
    price: 899,
    inStock: true,
    sales: 85,
    date: "2026-02-28",
  },
  {
    id: "6",
    name: "Powerbank 20,000mAh",
    brand: "Brand",
    category: "powerbank",
    price: 1499,
    inStock: true,
    sales: 110,
    date: "2026-03-05",
  },
  {
    id: "7",
    name: "Gaming Laptop Pro",
    brand: "Brand",
    category: "laptop",
    price: 54990,
    inStock: true,
    sales: 40,
    date: "2026-01-10",
  },
  {
    id: "8",
    name: "USB-C Cable Braided",
    brand: "Brand",
    category: "charger",
    price: 299,
    inStock: true,
    sales: 200,
    date: "2026-03-12",
  },
  {
    id: "9",
    name: "Pro Max Smartphone",
    brand: "Brand",
    category: "cellphone",
    price: 45990,
    inStock: true,
    sales: 80,
    date: "2026-02-10",
  },
  {
    id: "10",
    name: "Compact Ultra Laptop",
    brand: "Brand",
    category: "laptop",
    price: 38990,
    inStock: true,
    sales: 60,
    date: "2026-02-22",
  },
  {
    id: "11",
    name: "Noise Cancelling Buds",
    brand: "Brand",
    category: "airbuds",
    price: 2499,
    inStock: true,
    sales: 130,
    date: "2026-03-08",
  },
  {
    id: "12",
    name: "Magnetic Wireless Powerbank",
    brand: "Brand",
    category: "powerbank",
    price: 1899,
    inStock: true,
    sales: 90,
    date: "2026-02-18",
  },
  {
    id: "13",
    name: "Dual Port Wall Charger",
    brand: "Brand",
    category: "charger",
    price: 699,
    inStock: true,
    sales: 105,
    date: "2026-01-25",
  },
  {
    id: "14",
    name: "Budget Friendly Phone",
    brand: "Brand",
    category: "cellphone",
    price: 5990,
    inStock: false,
    sales: 50,
    date: "2026-01-15",
  },
  {
    id: "15",
    name: "Studio Earbuds with ANC",
    brand: "Brand",
    category: "airbuds",
    price: 3499,
    inStock: true,
    sales: 65,
    date: "2026-02-05",
  },
  {
    id: "16",
    name: "High-Speed 100W GaN Charger",
    brand: "Brand",
    category: "charger",
    price: 1599,
    inStock: true,
    sales: 75,
    date: "2026-03-02",
  },
];

// State Management

function loadStoredCart() {
  const isCleaned = localStorage.getItem("nihaya_cart_cleaned");
  if (!isCleaned) {
    localStorage.removeItem("nihaya_cart");
    localStorage.setItem("nihaya_cart_cleaned", "true");
    return [];
  }
  const stored = localStorage.getItem("nihaya_cart");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }
  return [];
}

function saveCart(items) {
  localStorage.setItem("nihaya_cart", JSON.stringify(items));
}

const initialCartItems = loadStoredCart();

const AppState = {
  cart: {
    items: initialCartItems,
    selectedIds: new Set(
      initialCartItems.filter((i) => i.selected).map((i) => i.id),
    ),
  },
  shop: {
    products: [...MOCK_PRODUCTS],
    activeCategory: "all",
    currentPage: 1,
    pageSize: 8,
    totalPages: 2,
    searchQuery: "",
    sortBy: "best-selling",
    filterStockOnly: false,
    filterPriceMax: null,
  },
  checkout: {
    step: 1,
    paymentMethod: "qrph",
    proofOfPayment: null,
    formData: {
      email: "",
      fullName: "",
      mobileNumber: "",
      deliveryAddress: "",
      notes: "",
    },
  },
};

// Utility Functions

// Format number as Philippine Peso currency (PHP)
function formatCurrency(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH");
}

// Generic fetch wrapper for backend API calls
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(
      "API Request Failed or backend offline, using client state:",
      error,
    );
    throw error;
  }
}

// Escape text before injecting into innerHTML to prevent XSS
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Product Service (single place the UI asks for product data)
// - API_BASE_URL empty  -> uses MOCK_PRODUCTS (works offline, for demo)
// - API_BASE_URL set    -> calls the backend; falls back to mock if it fails
// Expected backend responses:
//   GET /products/featured                     -> { id, name, brand, price, description?, inStock }
//   GET /products?sort=best-selling&limit=4    -> [ { id, name, brand, category, price, inStock }, ... ]

const ProductService = {
  // Products loaded on this page, so Add to Cart can find backend items too
  cache: new Map(),

  remember(items) {
    (Array.isArray(items) ? items : [items]).forEach((p) => {
      if (p && p.id != null) this.cache.set(String(p.id), p);
    });
    return items;
  },

  find(id) {
    return (
      this.cache.get(String(id)) ||
      MOCK_PRODUCTS.find((p) => p.id === String(id))
    );
  },

  useBackend() {
    return API_BASE_URL !== "";
  },

  async getFeatured() {
    if (this.useBackend()) {
      try {
        return await apiRequest(`${API_BASE_URL}/products/featured`);
      } catch (e) {}
    }
    // Mock: product flagged featured, else the best seller
    return (
      MOCK_PRODUCTS.find((p) => p.featured) ||
      [...MOCK_PRODUCTS].sort((a, b) => b.sales - a.sales)[0]
    );
  },

  async getPopular(limit = 4) {
    if (this.useBackend()) {
      try {
        return await apiRequest(
          API.products.list({ sort: "best-selling", limit }),
        );
      } catch (e) {}
    }
    return [...MOCK_PRODUCTS]
      .filter((p) => p.inStock)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, limit);
  },
};

// Navigation

function initNavigation() {
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle.classList.toggle("active");
      nav.classList.toggle("nav--open");
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        nav.classList.remove("nav--open");
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove("active");
        nav.classList.remove("nav--open");
      }
    });
  }
}

// Update cart count badge in navbar
function updateCartCount(count) {
  const cartLinks = document.querySelectorAll(".nav__cart-count");
  cartLinks.forEach((link) => {
    if (count > 0) {
      link.innerHTML = `Cart <span class="nav__cart-badge">${count}</span>`;
      const badge = link.querySelector(".nav__cart-badge");
      if (badge) {
        badge.classList.add("badge-bump");
        setTimeout(() => badge.classList.remove("badge-bump"), 250);
      }
    } else {
      link.textContent = "Cart";
    }
  });
}

// Shop Page Functions

// Filter, sort, paginate, and render shop products
function applyShopFilters() {
  const productsContainer = document.querySelector(".products");
  if (!productsContainer) return;

  let filtered = [...AppState.shop.products];

  // 1. Filter by category
  if (AppState.shop.activeCategory && AppState.shop.activeCategory !== "all") {
    filtered = filtered.filter(
      (p) =>
        p.category.toLowerCase() === AppState.shop.activeCategory.toLowerCase(),
    );
  }

  // 2. Filter by search query
  if (AppState.shop.searchQuery.trim()) {
    const q = AppState.shop.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  // 3. Filter by stock
  if (AppState.shop.filterStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // 4. Filter by max price
  if (
    AppState.shop.filterPriceMax !== null &&
    !isNaN(AppState.shop.filterPriceMax)
  ) {
    filtered = filtered.filter((p) => p.price <= AppState.shop.filterPriceMax);
  }

  // 5. Sort
  switch (AppState.shop.sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "best-selling":
    default:
      filtered.sort((a, b) => b.sales - a.sales);
      break;
  }

  // Update total pages & clamp current page
  const totalItems = filtered.length;
  const pageSize = AppState.shop.pageSize;
  AppState.shop.totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (AppState.shop.currentPage > AppState.shop.totalPages) {
    AppState.shop.currentPage = AppState.shop.totalPages;
  }
  if (AppState.shop.currentPage < 1) {
    AppState.shop.currentPage = 1;
  }

  // Update subtitle
  const startIdx = (AppState.shop.currentPage - 1) * pageSize;
  const pageItems = filtered.slice(startIdx, startIdx + pageSize);
  const subtitle = document.querySelector(".title-row__subtitle");
  if (subtitle) {
    subtitle.textContent = `Showing ${pageItems.length} of ${totalItems} items`;
  }

  // Render product grid
  renderProductGrid(pageItems);

  // Render pagination controls
  renderPagination(AppState.shop.totalPages, AppState.shop.currentPage);
}

// Render product cards into grid container
function renderProductGrid(items, container = null) {
  const productsContainer = container || document.querySelector(".products");
  if (!productsContainer) return;

  if (items.length === 0) {
    productsContainer.innerHTML = `
      <div style="text-align:center; padding: 48px 16px; width: 100%; color: var(--color-text-muted);">
        <p style="font-size: 20px; font-weight: 600; color: var(--color-text-dark); margin-bottom: 8px;">No products found</p>
        <p style="font-size: 15px;">Try adjusting your search or category filter to find what you're looking for.</p>
        <button class="btn btn--secondary" style="margin-top: 16px;" onclick="resetShopFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  let html = '<div class="product-row">';
  items.forEach((product) => {
    const isAdded = AppState.cart.items.some(
      (item) => item.id === String(product.id),
    );
    html += `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card__image">
          <span class="product-card__image-placeholder">Image</span>
          <span class="stock-badge ${product.inStock ? "" : "stock-badge--out"}">${product.inStock ? "In Stock" : "Out of Stock"}</span>
        </div>
        <div class="product-card__details">
          <span class="product-card__brand">${escapeHtml(product.brand)}</span>
          <span class="product-card__name">${escapeHtml(product.name)}</span>
          <span class="product-card__price">${formatCurrency(product.price)}</span>
        </div>
        <button class="btn ${isAdded ? "btn--added" : "btn--primary"} btn--add-to-cart" type="button" ${product.inStock ? "" : 'disabled style="opacity:0.6; cursor:not-allowed;"'}>
          ${isAdded ? "✓ Added" : product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    `;
  });
  html += "</div>";

  productsContainer.innerHTML = html;

  // Re-attach event listeners to new cards
  initAddToCartButtons();
  initProductCardLinks();
}

// Reset all shop filters to default state
window.resetShopFilters = function () {
  AppState.shop.activeCategory = "all";
  AppState.shop.searchQuery = "";
  AppState.shop.sortBy = "best-selling";
  AppState.shop.currentPage = 1;
  AppState.shop.filterStockOnly = false;
  AppState.shop.filterPriceMax = null;

  // Reset category chips UI
  document.querySelectorAll(".chip[data-category]").forEach((c) => {
    c.classList.toggle("chip--active", c.dataset.category === "all");
  });

  // Reset search field UI
  const searchInput = document.querySelector(".search-field");
  if (searchInput) searchInput.value = "";

  // Reset sort UI
  const sortSelect = document.querySelector(".sort-select");
  if (sortSelect) sortSelect.value = "best-selling";

  applyShopFilters();
};

// Render pagination controls and page numbers
function renderPagination(totalPages, currentPage) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = `<button class="pagination__btn" data-page="prev" type="button" ${currentPage === 1 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ""}>‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pagination__btn ${i === currentPage ? "pagination__btn--active" : ""}" data-page="${i}" type="button">${i}</button>`;
  }

  html += `<button class="pagination__btn" data-page="next" type="button" ${currentPage === totalPages ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ""}>›</button>`;

  pagination.innerHTML = html;
  initPagination();
}

// Initialize category chip filtering
function initCategoryChips() {
  const chips = document.querySelectorAll(".chip[data-category]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");

      const category = chip.dataset.category;
      AppState.shop.activeCategory = category;
      AppState.shop.currentPage = 1;

      applyShopFilters();
    });
  });
}

// Initialize search functionality
function initSearch() {
  const searchField = document.querySelector(".search-field");
  const searchBtn = document.querySelector(".search-btn");

  if (searchField) {
    let searchTimeout;
    searchField.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        AppState.shop.searchQuery = e.target.value;
        AppState.shop.currentPage = 1;
        applyShopFilters();
      }, 250);
    });

    searchField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        clearTimeout(searchTimeout);
        AppState.shop.searchQuery = searchField.value;
        AppState.shop.currentPage = 1;
        applyShopFilters();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = document.querySelector(".search-field")?.value || "";
      AppState.shop.searchQuery = query;
      AppState.shop.currentPage = 1;
      applyShopFilters();
    });
  }
}

// Initialize sorting dropdown handler
function initSort() {
  const sortSelect = document.querySelector(".sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.shop.sortBy = e.target.value;
      AppState.shop.currentPage = 1;
      applyShopFilters();
    });
  }
}

// Initialize filter button (interactive filter popover modal)
function initFilterModal() {
  const filterBtn = document.querySelector(".filter-btn");
  if (!filterBtn) return;

  // Check if modal already exists
  let modal = document.getElementById("filter-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "filter-modal";
    modal.className = "filter-modal-overlay";
    modal.innerHTML = `
      <div class="filter-modal-content">
        <div class="filter-modal-header">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--color-text-dark);">Filter Products</h3>
          <button type="button" class="filter-modal-close" style="font-size: 20px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; border:none; background:none;">✕</button>
        </div>
        <div class="divider" style="margin: 12px 0;"></div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="font-size: 14px; font-weight: 600; color: var(--color-text-dark); display: block; margin-bottom: 6px;">Availability</label>
            <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer;">
              <input type="checkbox" id="filter-stock-only" style="width: 18px; height: 18px; accent-color: var(--color-primary); cursor: pointer;">
              In Stock Only
            </label>
          </div>
          <div>
            <label for="filter-price-max" style="font-size: 14px; font-weight: 600; color: var(--color-text-dark); display: block; margin-bottom: 6px;">Max Price (₱)</label>
            <input type="number" id="filter-price-max" placeholder="e.g. 20000" class="form-input" style="height: 40px; width: 100%; border-radius: 8px; padding: 8px 12px;">
          </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 24px;">
          <button type="button" class="btn btn--primary" id="filter-apply-btn" style="flex: 1; padding: 10px 16px; font-size: 14px;">Apply Filter</button>
          <button type="button" class="btn btn--secondary" id="filter-reset-btn" style="flex: 1; padding: 10px 16px; font-size: 14px;">Clear</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Modal listeners
    const closeBtn = modal.querySelector(".filter-modal-close");
    const applyBtn = modal.querySelector("#filter-apply-btn");
    const resetBtn = modal.querySelector("#filter-reset-btn");
    const stockCheckbox = modal.querySelector("#filter-stock-only");
    const priceMaxInput = modal.querySelector("#filter-price-max");

    const closeModal = () => modal.classList.remove("active");
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    applyBtn.addEventListener("click", () => {
      AppState.shop.filterStockOnly = stockCheckbox.checked;
      const maxVal = parseFloat(priceMaxInput.value);
      AppState.shop.filterPriceMax = isNaN(maxVal) ? null : maxVal;
      AppState.shop.currentPage = 1;
      applyShopFilters();
      closeModal();
      filterBtn.style.borderColor =
        AppState.shop.filterStockOnly || AppState.shop.filterPriceMax !== null
          ? "var(--color-primary)"
          : "";
      filterBtn.style.color =
        AppState.shop.filterStockOnly || AppState.shop.filterPriceMax !== null
          ? "var(--color-primary)"
          : "";
    });

    resetBtn.addEventListener("click", () => {
      stockCheckbox.checked = false;
      priceMaxInput.value = "";
      AppState.shop.filterStockOnly = false;
      AppState.shop.filterPriceMax = null;
      AppState.shop.currentPage = 1;
      applyShopFilters();
      closeModal();
      filterBtn.style.borderColor = "";
      filterBtn.style.color = "";
    });
  }

  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("active");
  });
}

// Initialize pagination
function initPagination() {
  document.querySelectorAll(".pagination__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const page = btn.dataset.page;
      if (page === "prev") {
        if (AppState.shop.currentPage > 1) {
          AppState.shop.currentPage--;
        }
      } else if (page === "next") {
        if (AppState.shop.currentPage < AppState.shop.totalPages) {
          AppState.shop.currentPage++;
        }
      } else {
        AppState.shop.currentPage = parseInt(page);
      }

      applyShopFilters();

      // Scroll smoothly back to top of shop
      const shopCard = document.querySelector(".card");
      if (shopCard) {
        shopCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Add to cart handler
// Global Notification
function showToast(title, desc = "", actionText = null, actionHref = null) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  let actionHtml = "";
  if (actionText && actionHref) {
    actionHtml = `<a href="${actionHref}" class="toast__action">${actionText}</a>`;
  }

  toast.innerHTML = `
    <span class="toast__icon">✓</span>
    <div class="toast__content">
      <span class="toast__title">${escapeHtml(title)}</span>
      ${desc ? `<span class="toast__desc">${escapeHtml(desc)}</span>` : ""}
    </div>
    ${actionHtml}
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast--visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// Add or remove item from cart
async function addToCart(productId, button) {
  const product = ProductService.find(productId);
  if (!product) return;

  const existingIdx = AppState.cart.items.findIndex(
    (item) => item.id === String(productId),
  );

  if (existingIdx > -1) {
    // Remove if already added
    AppState.cart.items.splice(existingIdx, 1);
    AppState.cart.selectedIds.delete(String(productId));
    button.classList.remove("btn--added");
    button.classList.add("btn--primary");
    button.textContent = "Add to Cart";
    showToast("Removed from cart", product.name);
  } else {
    // Add to cart
    AppState.cart.items.push({
      id: String(product.id),
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: 1,
      selected: true,
    });
    AppState.cart.selectedIds.add(String(product.id));
    button.classList.remove("btn--primary");
    button.classList.add("btn--added");
    button.textContent = "✓ Added";
    showToast("Added to Cart!", product.name, "View Cart", "cart.html");
  }

  saveCart(AppState.cart.items);
  updateCartCount(AppState.cart.items.length);
}

// Initialize Add to Cart button handlers across cards
function initAddToCartButtons() {
  document.querySelectorAll(".btn--add-to-cart").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId =
        btn.closest("[data-product-id]")?.dataset.productId || "";
      addToCart(productId, btn);
    };
  });
}

// Cart Page Functions

// Render dynamic cart items from AppState.cart.items
function renderCartPage() {
  const container = document.querySelector(".cart-items");
  if (!container) return;

  const items = AppState.cart.items;
  const countEl = document.querySelector(".title-row__subtitle");
  if (countEl) {
    countEl.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
  }

  if (items.length === 0) {
    window.location.href = "cart-empty.html";
    return;
  }

  const allSelected = items.length > 0 && items.every((i) => i.selected);

  let html = `
    <div class="select-all">
      <div class="checkbox ${allSelected ? "checkbox--checked" : ""}" role="checkbox" aria-checked="${allSelected}" tabindex="0"></div>
      <span>Select all (${items.length})</span>
    </div>
    <div class="divider"></div>
  `;

  items.forEach((item) => {
    html += `
      <div class="cart-item" data-item-id="${item.id}" data-price="${item.price}">
        <div class="checkbox ${item.selected ? "checkbox--checked" : ""}" role="checkbox" aria-checked="${item.selected}" tabindex="0"></div>
        <div class="cart-item__image">
          <span style="font-size:12px;color:var(--color-text-muted);">Image</span>
        </div>
        <div class="cart-item__info">
          <div class="cart-item__top">
            <span class="cart-item__name">${item.name}</span>
            <span class="cart-item__price">${formatCurrency(item.price)}</span>
          </div>
          <span class="cart-item__brand">${item.brand || "Brand"}</span>
          <div class="quantity-control">
            <span class="quantity-control__btn" role="button" aria-label="Decrease quantity">−</span>
            <span class="quantity-control__value">${item.quantity || 1}</span>
            <span class="quantity-control__btn" role="button" aria-label="Increase quantity">+</span>
          </div>
          <button class="cart-item__remove" type="button">Remove</button>
        </div>
      </div>
      <div class="divider"></div>
    `;
  });

  html += `
    <div style="margin-top: 12px;">
      <a href="shop.html" class="btn btn--secondary">Continue Shopping</a>
    </div>
  `;

  container.innerHTML = html;

  initCheckboxes();
  initQuantityControls();
  initRemoveButtons();
  updateOrderSummary();
}

// Initialize checkbox toggling
function initCheckboxes() {
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.onclick = () => {
      checkbox.classList.toggle("checkbox--checked");
      const isChecked = checkbox.classList.contains("checkbox--checked");

      // If this is "select all"
      if (checkbox.closest(".select-all")) {
        AppState.cart.items.forEach((item) => {
          item.selected = isChecked;
        });
        document.querySelectorAll(".cart-item .checkbox").forEach((cb) => {
          cb.classList.toggle("checkbox--checked", isChecked);
        });
      } else {
        const itemEl = checkbox.closest(".cart-item");
        const itemId = itemEl?.dataset.itemId;
        const item = AppState.cart.items.find((i) => i.id === itemId);
        if (item) {
          item.selected = isChecked;
        }
      }

      saveCart(AppState.cart.items);
      updateOrderSummary();
    };
  });
}

// Initialize quantity controls
function initQuantityControls() {
  document.querySelectorAll(".quantity-control").forEach((control) => {
    const minusBtn = control.querySelector(
      ".quantity-control__btn:first-child",
    );
    const plusBtn = control.querySelector(".quantity-control__btn:last-child");
    const valueEl = control.querySelector(".quantity-control__value");
    const itemEl = control.closest(".cart-item");
    const itemId = itemEl?.dataset.itemId;

    if (minusBtn) {
      minusBtn.onclick = () => {
        let value = parseInt(valueEl.textContent);
        if (value > 1) {
          value--;
          valueEl.textContent = value;
          const item = AppState.cart.items.find((i) => i.id === itemId);
          if (item) item.quantity = value;
          saveCart(AppState.cart.items);
          updateOrderSummary();
        }
      };
    }

    if (plusBtn) {
      plusBtn.onclick = () => {
        let value = parseInt(valueEl.textContent);
        value++;
        valueEl.textContent = value;
        const item = AppState.cart.items.find((i) => i.id === itemId);
        if (item) item.quantity = value;
        saveCart(AppState.cart.items);
        updateOrderSummary();
      };
    }
  });
}

// Initialize remove item buttons
function initRemoveButtons() {
  document.querySelectorAll(".cart-item__remove").forEach((btn) => {
    btn.onclick = () => {
      const cartItem = btn.closest(".cart-item");
      const itemId = cartItem?.dataset.itemId;
      const divider = cartItem?.nextElementSibling;

      if (cartItem) {
        cartItem.style.transition = "opacity 0.3s, transform 0.3s";
        cartItem.style.opacity = "0";
        cartItem.style.transform = "translateX(-20px)";
        setTimeout(() => {
          const idx = AppState.cart.items.findIndex((i) => i.id === itemId);
          if (idx > -1) {
            AppState.cart.items.splice(idx, 1);
            saveCart(AppState.cart.items);
          }
          cartItem.remove();
          if (divider?.classList.contains("divider")) divider.remove();
          updateOrderSummary();
          updateCartCount(AppState.cart.items.length);
          const countEl = document.querySelector(".title-row__subtitle");
          if (countEl)
            countEl.textContent = `${AppState.cart.items.length} items`;
          checkEmptyCart();
        }, 300);
      }
    };
  });
}

// Recalculate subtotal, shipping fee, and total in cart summary
function updateOrderSummary() {
  const selectedItems = AppState.cart.items.filter((i) => i.selected);
  const selectedCount = selectedItems.length;

  const selectedCountEl = document.querySelector(
    '[data-summary="selected-count"]',
  );
  if (selectedCountEl) selectedCountEl.textContent = selectedCount;

  let subtotal = 0;
  selectedItems.forEach((item) => {
    subtotal += Number(item.price) * Number(item.quantity || 1);
  });

  const shippingFee = selectedCount > 0 ? 250 : 0;
  const total = subtotal + shippingFee;

  const subtotalEl = document.querySelector('[data-summary="subtotal"]');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

  const shippingEl = document.querySelector('[data-summary="shipping"]');
  if (shippingEl) shippingEl.textContent = formatCurrency(shippingFee);

  const totalEl = document.querySelector('[data-summary="total"]');
  if (totalEl) totalEl.textContent = formatCurrency(total);

  const checkoutBtn = document.querySelector('[data-action="checkout"]');
  if (checkoutBtn) {
    checkoutBtn.textContent = `Checkout (${selectedCount})`;
    if (selectedCount === 0) {
      checkoutBtn.style.opacity = "0.5";
      checkoutBtn.style.pointerEvents = "none";
    } else {
      checkoutBtn.style.opacity = "1";
      checkoutBtn.style.pointerEvents = "auto";
    }
  }

  const selectAllCheckbox = document.querySelector(".select-all .checkbox");
  const allSelected =
    AppState.cart.items.length > 0 &&
    selectedCount === AppState.cart.items.length;
  if (selectAllCheckbox) {
    selectAllCheckbox.classList.toggle("checkbox--checked", allSelected);
  }
}

// Render order summary items and totals on checkout page
function renderCheckoutSummary() {
  const summaryContainer = document.querySelector(
    "#checkout-step-2 .order-summary",
  );
  if (!summaryContainer) return;

  const selectedItems = AppState.cart.items.filter((i) => i.selected);
  const itemsToRender =
    selectedItems.length > 0 ? selectedItems : AppState.cart.items;

  let itemsHtml = `<h2 class="order-summary__title">Order Summary</h2>`;

  let subtotal = 0;
  itemsToRender.forEach((item) => {
    const itemTotal = Number(item.price) * Number(item.quantity || 1);
    subtotal += itemTotal;
    itemsHtml += `
      <div class="order-summary__item">
        <div class="order-summary__thumb"></div>
        <span class="order-summary__item-name">${item.name} × ${item.quantity || 1}</span>
        <span class="order-summary__item-price">${formatCurrency(itemTotal)}</span>
      </div>
    `;
  });

  const shippingFee = itemsToRender.length > 0 ? 250 : 0;
  const total = subtotal + shippingFee;

  itemsHtml += `
    <div class="divider"></div>
    <div class="order-summary__row">
      <span class="order-summary__label">Subtotal</span>
      <span class="order-summary__value">${formatCurrency(subtotal)}</span>
    </div>
    <div class="order-summary__row">
      <span class="order-summary__label">Shipping Fee (LBC)</span>
      <span class="order-summary__value">${formatCurrency(shippingFee)}</span>
    </div>
    <div class="divider"></div>
    <div class="order-summary__row order-summary__total">
      <span class="order-summary__label">Total</span>
      <span class="order-summary__value">${formatCurrency(total)}</span>
    </div>
    <button class="btn btn--primary btn--full" data-action="place-order" type="button">Place Order</button>
    <button class="btn btn--secondary btn--full" id="btn-back-to-step-1" type="button">Back</button>
  `;

  summaryContainer.innerHTML = itemsHtml;
  initPlaceOrder();
  const backBtn = document.getElementById("btn-back-to-step-1");
  if (backBtn) {
    backBtn.onclick = () => {
      document.getElementById("checkout-step-2").style.display = "none";
      document.getElementById("checkout-step-1").style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
}

// Redirect to empty cart page if no items remain
function checkEmptyCart() {
  const items = document.querySelectorAll(".cart-item");
  if (items.length === 0) {
    window.location.href = "cart-empty.html";
  }
}

// Checkout Page Functions (Step 1: Email -> Step 2: Delivery & Payment)

// Validate customer email format using regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Initialize 2-step checkout flow (Step 1 email gate -> Step 2 delivery/payment)
function initCheckoutFlow() {
  const step1Card = document.getElementById("checkout-step-1");
  const step2Card = document.getElementById("checkout-step-2");
  const emailInput = document.getElementById("contact-email-input");
  const emailGroup = document.getElementById("contact-email-group");
  const emailError = document.getElementById("contact-email-error");
  const btnContinue = document.getElementById("btn-step-1-continue");
  const btnBack = document.getElementById("btn-back-to-step-1");
  const btnEditEmail = document.getElementById("btn-edit-email");
  const displayEmail = document.getElementById("display-contact-email");

  if (!step1Card || !step2Card) return;

  // Restore existing email from state / storage if available
  const savedEmail =
    sessionStorage.getItem("nihaya_customer_email") ||
    AppState.checkout.formData.email ||
    "";
  if (savedEmail && emailInput) {
    emailInput.value = savedEmail;
  }

  // Clear email error on input
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      emailGroup?.classList.remove("has-error");
    });

    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btnContinue?.click();
      }
    });
  }

  // Continue to Step 2
  if (btnContinue) {
    btnContinue.addEventListener("click", () => {
      const emailValue = emailInput?.value.trim() || "";

      if (!isValidEmail(emailValue)) {
        emailGroup?.classList.add("has-error");
        if (emailError) {
          emailError.textContent = emailValue
            ? "Enter a valid email address, like name@gmail.com"
            : "Email address is required";
        }
        emailInput?.focus();
        return;
      }

      emailGroup?.classList.remove("has-error");
      AppState.checkout.formData.email = emailValue;
      sessionStorage.setItem("nihaya_customer_email", emailValue);

      if (displayEmail) {
        displayEmail.textContent = emailValue;
      }

      // Transition to Step 2
      step1Card.style.display = "none";
      step2Card.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Back to Step 1
  const goBackToStep1 = () => {
    step2Card.style.display = "none";
    step1Card.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
    emailInput?.focus();
  };

  if (btnBack) btnBack.addEventListener("click", goBackToStep1);
  if (btnEditEmail) btnEditEmail.addEventListener("click", goBackToStep1);
}

// Initialize payment method selection
function initPaymentOptions() {
  const proofPaymentLabel = document.getElementById("proof-payment-label");
  document.querySelectorAll(".payment-option").forEach((option) => {
    option.addEventListener("click", () => {
      document
        .querySelectorAll(".payment-option")
        .forEach((o) => o.classList.remove("payment-option--selected"));
      option.classList.add("payment-option--selected");
      AppState.checkout.paymentMethod = option.dataset.payment;
      const labelText = option
        .querySelector(".payment-option__label")
        ?.textContent?.trim();
      if (proofPaymentLabel && labelText) {
        proofPaymentLabel.textContent = labelText;
      }
    });
  });
}

// Proof of payment upload (click, drag-and-drop, preview & validation)
const PROOF_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
];
const PROOF_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function setProofError(message) {
  const dropzone = document.getElementById("proof-dropzone");
  const errorEl = document.getElementById("proof-error");
  if (message) {
    dropzone?.classList.add("has-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
  } else {
    dropzone?.classList.remove("has-error");
    errorEl?.classList.remove("is-visible");
  }
}

function validateProofOfPayment() {
  const fileInput = document.getElementById("proof-of-payment-input");
  if (!fileInput) return true;
  if (!AppState.checkout.proofOfPayment) {
    setProofError(
      "Please upload your proof of payment before placing your order.",
    );
    return false;
  }
  setProofError("");
  return true;
}

function initProofOfPayment() {
  const fileInput = document.getElementById("proof-of-payment-input");
  const dropzone = document.getElementById("proof-dropzone");
  const preview = document.getElementById("proof-preview");
  const thumb = document.getElementById("proof-thumb");
  const filenameEl = document.getElementById("proof-filename");
  const sizeEl = document.getElementById("proof-size");
  const removeBtn = document.getElementById("proof-remove-btn");

  if (!fileInput || !dropzone || !preview) return;

  const formatSize = (bytes) => {
    const kb = Math.max(1, Math.round(bytes / 1024));
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
  };

  const clearFile = () => {
    AppState.checkout.proofOfPayment = null;
    fileInput.value = "";
    preview.hidden = true;
    dropzone.style.display = "flex";
    if (thumb) thumb.innerHTML = "";
    setProofError("");
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!PROOF_ALLOWED_TYPES.includes(file.type)) {
      clearFile();
      setProofError("Unsupported file type. Please upload PNG, JPG, WEBP, or PDF.");
      return;
    }

    if (file.size > PROOF_MAX_BYTES) {
      clearFile();
      setProofError("File is too large. Maximum allowed size is 5 MB.");
      return;
    }

    AppState.checkout.proofOfPayment = file;
    setProofError("");
    if (filenameEl) filenameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = `${formatSize(file.size)} · Ready to submit`;

    if (thumb) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          thumb.innerHTML = `<img src="${ev.target.result}" alt="Proof of payment preview" />`;
        };
        reader.readAsDataURL(file);
      } else {
        thumb.textContent = "PDF";
      }
    }

    dropzone.style.display = "none";
    preview.hidden = false;
  };

  fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files?.[0]);
  });

  ["dragenter", "dragover"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("is-dragover");
    });
  });

  ["dragleave", "drop"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("is-dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  });

  removeBtn?.addEventListener("click", clearFile);
}

// Validate individual form field
function validateField(field) {
  const group = field.closest(".form-group");
  const value = field.value.trim();
  let valid = true;

  if (field.dataset.field === "mobile") {
    const cleaned = value.replace(/\s/g, "");
    valid = /^09\d{9}$/.test(cleaned);
  } else {
    valid = value.length > 0;
  }

  if (!valid) {
    group?.classList.add("has-error");
    group?.classList.remove("is-valid");
  } else {
    group?.classList.remove("has-error");
    group?.classList.add("is-valid");
  }

  return valid;
}

// Unified QR Ph / InstaPay payment configuration for Checkout Step 3
const QR_PAYMENT_CONFIG = {
  id: "qrph",
  label: "QR Ph / InstaPay",
  merchantName: "NIHAYA Cellphone & Accessories",
  qrImage: "assets/images/qr-instapay.jpg",
};

let paymentCountdownInterval = null;

function getCheckoutTotalText() {
  return (
    document
      .querySelector(
        "#checkout-step-2 .order-summary__total .order-summary__value",
      )
      ?.textContent?.trim() || "₱22,730"
  );
}

function startPaymentCountdown() {
  const timerEl = document.getElementById("payment-countdown");
  if (!timerEl) return;

  if (paymentCountdownInterval) {
    clearInterval(paymentCountdownInterval);
  }

  let secondsLeft = 15 * 60 - 1;
  const renderTimer = () => {
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
  };

  renderTimer();
  paymentCountdownInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      renderTimer();
    } else {
      clearInterval(paymentCountdownInterval);
      paymentCountdownInterval = null;
    }
  }, 1000);
}

// Save a clean downloadable QR slip PNG (falls back to raw QR image if canvas export is blocked)
function savePaymentQRCode() {
  const img = document.getElementById("payment-qr-img");
  const totalText = getCheckoutTotalText();

  if (img && img.complete && img.naturalWidth > 0) {
    try {
      const canvas = document.createElement("canvas");
      const w = 900;
      const h = 1080;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#12301f";
      ctx.font = "600 34px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(QR_PAYMENT_CONFIG.merchantName, w / 2, 76);

      ctx.fillStyle = "#295b53";
      ctx.font = "500 22px Inter, Arial, sans-serif";
      ctx.fillText(QR_PAYMENT_CONFIG.label, w / 2, 114);

      const qrSize = 720;
      ctx.drawImage(img, (w - qrSize) / 2, 150, qrSize, qrSize);

      ctx.fillStyle = "#0f6b36";
      ctx.font = "700 32px Inter, Arial, sans-serif";
      ctx.fillText(`Total: ${totalText}`, w / 2, 945);

      ctx.fillStyle = "#295b53";
      ctx.font = "400 20px Inter, Arial, sans-serif";
      ctx.fillText(
        "Scan or upload in GCash, Maya, GoTyme, or any InstaPay app",
        w / 2,
        988,
      );

      const link = document.createElement("a");
      link.download = "NIHAYA-QRPh-InstaPay.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("QR code saved", "Upload it in your e-wallet's QR scanner.");
      return;
    } catch (err) {
      // Fallback for file:// tainted canvas restriction
    }
  }

  const link = document.createElement("a");
  link.download = "NIHAYA-QRPh-InstaPay.jpg";
  link.href = QR_PAYMENT_CONFIG.qrImage;
  link.click();
  showToast("QR code saved", "Upload it in your e-wallet's QR scanner.");
}

// Populate Step 3 with the order total and start the payment countdown
function renderPaymentStep() {
  const totalText = getCheckoutTotalText();

  const totalEl = document.getElementById("payment-step-total");
  const howTotalEl = document.getElementById("payment-how-total");
  const modalTotalEl = document.getElementById("qr-modal-total");

  if (totalEl) totalEl.textContent = totalText;
  if (howTotalEl) howTotalEl.textContent = totalText;
  if (modalTotalEl) modalTotalEl.textContent = totalText;

  startPaymentCountdown();
}

// Initialize Step 3 controls (Copy amount, Save QR, Enlarge QR modal, Back, Confirm)
function initPaymentStep() {
  const step2Card = document.getElementById("checkout-step-2");
  const step3Card = document.getElementById("checkout-step-3");
  const copyAmountBtn = document.getElementById("btn-copy-amount");
  const saveQrBtn = document.getElementById("btn-save-qr");
  const modalSaveQrBtn = document.getElementById("btn-modal-save-qr");
  const qrSurfaceBtn = document.getElementById("btn-qr-surface");
  const enlargeQrBtn = document.getElementById("btn-enlarge-qr");
  const qrModal = document.getElementById("qr-lightbox-modal");
  const closeQrModalBtn = document.getElementById("btn-close-qr-modal");
  const backBtn = document.getElementById("btn-back-to-step-2");
  const confirmBtn = document.getElementById("btn-confirm-payment");

  if (copyAmountBtn) {
    copyAmountBtn.addEventListener("click", () => {
      const totalText = getCheckoutTotalText();
      const numericAmount = totalText.replace(/[^\d.]/g, "");
      navigator.clipboard?.writeText(numericAmount || totalText).catch(() => {});
      copyAmountBtn.textContent = "Copied";
      showToast("Amount copied", `${totalText} copied to clipboard.`);
      setTimeout(() => {
        copyAmountBtn.textContent = "Copy";
      }, 1500);
    });
  }

  saveQrBtn?.addEventListener("click", savePaymentQRCode);
  modalSaveQrBtn?.addEventListener("click", savePaymentQRCode);

  if (qrModal) {
    let lastTrigger = null;
    const openModal = (trigger) => {
      lastTrigger = trigger || null;
      qrModal.hidden = false;
      closeQrModalBtn?.focus();
    };
    const closeModal = () => {
      qrModal.hidden = true;
      lastTrigger?.focus();
    };

    qrSurfaceBtn?.addEventListener("click", (e) => openModal(e.currentTarget));
    enlargeQrBtn?.addEventListener("click", (e) => openModal(e.currentTarget));
    closeQrModalBtn?.addEventListener("click", closeModal);
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !qrModal.hidden) closeModal();
    });
  }

  if (backBtn && step2Card && step3Card) {
    backBtn.addEventListener("click", () => {
      if (paymentCountdownInterval) {
        clearInterval(paymentCountdownInterval);
        paymentCountdownInterval = null;
      }
      step3Card.style.display = "none";
      step2Card.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitPaymentAndOrder();
    });
  }
}

// Validate checkout delivery form (Step 2)
function validateCheckoutForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll(
    "#checkout-step-2 [data-required]",
  );

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// Initialize form validation on input and blur
function initFormValidation() {
  const requiredFields = document.querySelectorAll(
    "#checkout-step-2 [data-required]",
  );

  requiredFields.forEach((field) => {
    field.addEventListener("blur", () => {
      validateField(field);
    });

    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group?.classList.contains("has-error")) {
        validateField(field);
      }
    });
  });
}

// Step 2 -> Step 3: Validate delivery form and show designated payment QR/details
function placeOrder() {
  if (!validateCheckoutForm()) {
    return;
  }

  const step2Card = document.getElementById("checkout-step-2");
  const step3Card = document.getElementById("checkout-step-3");
  if (step2Card && step3Card) {
    renderPaymentStep();
    step2Card.style.display = "none";
    step3Card.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  submitPaymentAndOrder();
}

// Step 3: Validate proof of payment and finalize order
async function submitPaymentAndOrder() {
  if (!validateProofOfPayment()) {
    return;
  }

  const formData = {
    email:
      AppState.checkout.formData.email ||
      sessionStorage.getItem("nihaya_customer_email") ||
      "",
    fullName: document.querySelector('#checkout-step-2 [data-field="fullname"]')
      ?.value,
    mobileNumber: document.querySelector(
      '#checkout-step-2 [data-field="mobile"]',
    )?.value,
    deliveryAddress: document.querySelector(
      '#checkout-step-2 [data-field="address"]',
    )?.value,
    notes: document.querySelector('#checkout-step-2 [data-field="notes"]')
      ?.value,
    paymentMethod: AppState.checkout.paymentMethod,
    proofOfPayment: AppState.checkout.proofOfPayment,
  };

  // Ready-to-send multipart FormData payload for backend POST /orders
  const orderPayload = new FormData();
  orderPayload.append("email", formData.email);
  orderPayload.append("fullName", formData.fullName || "");
  orderPayload.append("mobileNumber", formData.mobileNumber || "");
  orderPayload.append("deliveryAddress", formData.deliveryAddress || "");
  orderPayload.append("notes", formData.notes || "");
  orderPayload.append("paymentMethod", formData.paymentMethod);
  if (formData.proofOfPayment) {
    orderPayload.append("proofOfPayment", formData.proofOfPayment);
  }
  // Backend integration: await fetch(API.checkout.create(), { method: "POST", body: orderPayload });

  sessionStorage.setItem(
    "nihaya_order",
    JSON.stringify({
      orderNumber: "#NHY-" + Math.floor(10000 + Math.random() * 90000),
      paymentMethod: QR_PAYMENT_CONFIG.label,
      proofFileName: formData.proofOfPayment?.name || "",
      email: formData.email,
      total: getCheckoutTotalText(),
      date: new Date().toLocaleDateString(),
    }),
  );

  AppState.checkout.proofOfPayment = null;
  AppState.cart.items = [];
  AppState.cart.selectedIds.clear();
  saveCart([]);

  window.location.href = "order-confirmation.html";
}

// Attach click handler to Place Order button
function initPlaceOrder() {
  const placeOrderBtn = document.querySelector('[data-action="place-order"]');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      placeOrder();
    });
  }
}

// Order Confirmation Page

function initOrderConfirmation() {
  const savedOrder = sessionStorage.getItem("nihaya_order");
  if (savedOrder) {
    try {
      const order = JSON.parse(savedOrder);
      const numEl = document.getElementById("confirm-order-number");
      const payEl = document.getElementById("confirm-payment-method");
      const totalEl = document.getElementById("confirm-total");
      if (numEl) numEl.textContent = order.orderNumber;
      if (payEl) payEl.textContent = order.paymentMethod;
      if (totalEl) totalEl.textContent = order.total;
    } catch (e) {}
  }
}

// Search Page Functions

// Clear recent search chips on search page
function initClearRecentSearches() {
  const clearBtn = document.querySelector(".recent-searches__clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const chipsContainer = document.querySelector(".recent-chips");
      if (chipsContainer) {
        chipsContainer.style.transition = "opacity 0.3s";
        chipsContainer.style.opacity = "0";
        setTimeout(() => chipsContainer.remove(), 300);
      }
    });
  }
}

// Navigate to shop with search query when clicking recent chips
function initRecentChips() {
  document.querySelectorAll(".recent-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const query = chip
        .querySelector(".recent-chip__text")
        ?.textContent?.trim();
      if (!query) return;

      const page = document.body.dataset.page;
      if (page === "search") {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      } else {
        const searchField = document.querySelector(".search-field");
        if (searchField) {
          searchField.value = query;
          AppState.shop.searchQuery = query;
          applyShopFilters();
        }
      }
    });
  });
}

// Handle search input and button submissions on search page
function initSearchPage() {
  const searchField = document.querySelector(".search-page .search-field");
  const searchBtn = document.querySelector(".search-page .search-btn");

  const executeSearch = () => {
    const query = searchField?.value?.trim();
    if (query) {
      window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
  };

  if (searchField) {
    searchField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      executeSearch();
    });
  }
}

// Product Detail Page Functions

function initProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "1";

  const product =
    MOCK_PRODUCTS.find((p) => p.id === String(productId)) || MOCK_PRODUCTS[0];

  // Populate dynamic product details
  const nameEl = document.querySelector(".product-detail__name");
  const brandEl = document.querySelector(".product-detail__brand");
  const priceEl = document.querySelector(".product-detail__price");
  const breadcrumbEl = document.querySelector(".product-detail__breadcrumb");
  const stockEl = document.querySelector(".product-detail .stock-badge");
  const cardEl = document.querySelector(".card[data-product-id]");

  if (cardEl) cardEl.dataset.productId = product.id;
  if (nameEl) nameEl.textContent = product.name;
  if (brandEl) brandEl.textContent = product.brand;
  if (priceEl) priceEl.textContent = formatCurrency(product.price);
  if (breadcrumbEl) {
    const catLabel = product.category
      ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
      : "Shop";
    breadcrumbEl.innerHTML = `<a href="shop.html" style="color:inherit;text-decoration:none;">Shop</a> / <a href="shop.html?category=${encodeURIComponent(product.category || "all")}" style="color:inherit;text-decoration:underline;">${catLabel}</a>`;
  }

  // Smart back button: return to previous page if it was shop, else shop.html
  const backBtn = document.getElementById("btn-back-to-shop");
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (
        document.referrer &&
        (document.referrer.includes("shop.html") ||
          document.referrer.includes("index.html") ||
          document.referrer.includes("search.html"))
      ) {
        window.history.back();
      } else {
        window.location.href = "shop.html";
      }
    };
  }
  if (stockEl) {
    stockEl.textContent = product.inStock ? "In Stock" : "Out of Stock";
    stockEl.className = `stock-badge ${product.inStock ? "" : "stock-badge--out"}`;
  }
  document.title = `${product.name} — NIHAYA`;

  const addBtn = document.querySelector(
    ".product-detail__actions .btn--add-to-cart",
  );

  const isAlreadyInCart = AppState.cart.items.some((i) => i.id === product.id);
  if (addBtn && isAlreadyInCart) {
    addBtn.classList.add("btn--added");
    addBtn.textContent = "✓ Added";
  }

  if (addBtn) {
    addBtn.onclick = (e) => {
      e.preventDefault();
      const quantity = parseInt(
        document.querySelector(".quantity-control__value")?.textContent || "1",
      );

      const existingIdx = AppState.cart.items.findIndex(
        (i) => i.id === product.id,
      );
      if (existingIdx > -1) {
        AppState.cart.items.splice(existingIdx, 1);
        AppState.cart.selectedIds.delete(product.id);
        addBtn.classList.remove("btn--added");
        addBtn.classList.add("btn--primary");
        addBtn.textContent = "Add to Cart";
      } else {
        AppState.cart.items.push({ ...product, quantity, selected: true });
        AppState.cart.selectedIds.add(product.id);
        addBtn.classList.remove("btn--primary");
        addBtn.classList.add("btn--added");
        addBtn.textContent = "✓ Added";
      }

      saveCart(AppState.cart.items);
      updateCartCount(AppState.cart.items.length);
    };
  }
}

// Product Card Click (Navigate to detail)

function initProductCardLinks() {
  document
    .querySelectorAll(".product-card[data-product-id]")
    .forEach((card) => {
      card.onclick = (e) => {
        if (e.target.closest(".btn--add-to-cart")) return;
        const productId = card.dataset.productId;
        window.location.href = `product-detail.html?id=${productId}`;
      };
    });
}

// Homepage (index.html)

// Fill hero spotlight + popular grid from ProductService. Works with mock data now, and with the backend once API_BASE_URL is set.
async function initHomePage() {
  // 1. Featured product (hero spotlight)
  const spotlight = document.getElementById("home-featured");
  if (spotlight) {
    try {
      const featured = ProductService.remember(
        await ProductService.getFeatured(),
      );
      spotlight.href = `product-detail.html?id=${encodeURIComponent(featured.id)}`;
      spotlight.querySelector(".spotlight__title").textContent = featured.name;
      spotlight
        .querySelector(".spotlight__title")
        .classList.remove("skeleton-text");
      spotlight.querySelector(".spotlight__desc").textContent =
        featured.description ||
        (featured.inStock
          ? "In stock now at our Daet store."
          : "Currently out of stock.");
      spotlight.querySelector(".spotlight__price").textContent = formatCurrency(
        featured.price,
      );
    } catch (e) {
      spotlight.hidden = true; // hide card instead of showing broken data
    }
  }

  // 2. Popular products grid
  const popularGrid = document.getElementById("home-popular");
  if (popularGrid) {
    try {
      const popular = ProductService.remember(
        await ProductService.getPopular(4),
      );
      renderProductGrid(popular, popularGrid);
    } catch (e) {
      popularGrid.innerHTML =
        '<p style="color: var(--color-text-muted);">Products could not load. Please refresh the page.</p>';
    }
  }
}

// Read category and search parameters from URL query string
function applyCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  if (category) {
    const chip = document.querySelector(
      `.chip[data-category="${CSS.escape(category)}"]`,
    );
    if (chip) {
      document
        .querySelectorAll(".chip[data-category]")
        .forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");
      AppState.shop.activeCategory = category;
    }
  }

  const search = urlParams.get("search");
  if (search) {
    AppState.shop.searchQuery = search;
    const searchField = document.querySelector(".search-field");
    if (searchField) searchField.value = search;
  }
}

// Initialization

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  updateCartCount(AppState.cart.items.length);

  const page = document.body.dataset.page;

  switch (page) {
    case "home":
      initHomePage();
      break;

    case "shop":
      applyCategoryFromUrl();
      initCategoryChips();
      initSearch();
      initSort();
      initFilterModal();
      initPagination();
      initAddToCartButtons();
      initProductCardLinks();
      // Initial render with mock products & active filters
      applyShopFilters();
      break;

    case "product-detail":
      initProductDetail();
      initQuantityControls();
      break;

    case "cart":
      renderCartPage();
      break;

    case "cart-empty":
      if (AppState.cart.items.length > 0) {
        window.location.href = "cart.html";
      }
      break;

    case "checkout":
      if (!AppState.cart.items || AppState.cart.items.length === 0) {
        window.location.href = "cart-empty.html";
        break;
      }
      initCheckoutFlow();
      renderCheckoutSummary();
      initPaymentOptions();
      initProofOfPayment();
      initPaymentStep();
      initFormValidation();
      initPlaceOrder();
      break;

    case "order-confirmation":
      initOrderConfirmation();
      break;

    case "search":
      initSearchPage();
      initClearRecentSearches();
      initRecentChips();
      initAddToCartButtons();
      initProductCardLinks();
      initCategoryChips();
      break;
  }
});
