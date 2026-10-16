// ===== APP CONTROLLER =====

// Toast notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== ROUTING =====
function navigateTo(route) {
  window.location.hash = route;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const page = parts[0];
  const param = parts[1];

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Show target section
  const section = document.getElementById(`page-${page}`);
  if (section) section.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));

  // Scroll to top
  window.scrollTo(0, 0);

  // Page-specific rendering
  switch (page) {
    case 'home': renderHomePage(); break;
    case 'restaurants': renderRestaurantsPage(); break;
    case 'restaurant': if (param) renderRestaurantDetail(param); break;
    case 'checkout': renderCheckoutPage(); break;
    case 'tracking': if (param) { renderTrackingSection(param); } break;
    case 'orders': Orders.renderOrderHistory(); break;
    case 'profile': renderProfilePage(); break;
    case 'confirmation': renderConfirmationPage(param); break;
  }
}

// ===== PAGE RENDERERS =====

function renderHomePage() {
  // Categories
  const catContainer = document.getElementById('categories-grid');
  if (catContainer) {
    catContainer.innerHTML = CATEGORIES.map(c => `
      <div class="category-card" onclick="navigateTo('restaurants'); setTimeout(()=> document.querySelector('[data-cuisine=\\'${c.id}\\']')?.click(), 100)">
        <span class="category-emoji">${c.emoji}</span>
        <span class="category-name">${c.name}</span>
      </div>
    `).join('');
  }

  // Featured restaurants
  const featContainer = document.getElementById('featured-restaurants');
  if (featContainer) {
    featContainer.innerHTML = RESTAURANTS.slice(0, 6).map(r => renderRestaurantCard(r)).join('');
  }

  // Popular dishes
  const popContainer = document.getElementById('popular-dishes');
  if (popContainer) {
    const popular = MENU_ITEMS.filter(m => m.popular);
    popContainer.innerHTML = popular.map(m => renderDishCard(m)).join('');
  }

  // Testimonials
  const testContainer = document.getElementById('testimonials-grid');
  if (testContainer) {
    testContainer.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <span class="testimonial-avatar">${t.avatar}</span>
          <div><strong>${t.name}</strong><div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div></div>
        </div>
        <p>"${t.text}"</p>
      </div>
    `).join('');
  }
}

function renderRestaurantCard(r) {
  const favClass = Auth.isFavorite(r.id) ? 'active' : '';
  return `
    <div class="restaurant-card" onclick="navigateTo('restaurant/${r.id}')">
      <div class="restaurant-card-img" style="background-image:url('${r.image}')">
        <button class="fav-btn ${favClass}" onclick="event.stopPropagation(); Auth.toggleFavorite('${r.id}'); renderRestaurantsPage();">♥</button>
        <span class="delivery-badge">${r.deliveryTime} min</span>
      </div>
      <div class="restaurant-card-body">
        <h3>${r.name}</h3>
        <p class="restaurant-cuisine">${r.cuisine.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' · ')}</p>
        <div class="restaurant-meta">
          <span class="rating">⭐ ${r.rating} <span class="review-count">(${r.reviews})</span></span>
          <span class="price-range">${r.priceRange}</span>
          <span class="delivery-fee">${r.deliveryFee === 0 ? 'Free Delivery' : '$' + r.deliveryFee.toFixed(2) + ' delivery'}</span>
        </div>
        <div class="restaurant-tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `;
}

function renderDishCard(m) {
  const rest = RESTAURANTS.find(r => r.id === m.restaurantId);
  return `
    <div class="dish-card" onclick="openDishModal('${m.id}')">
      <div class="dish-card-img" style="background-image:url('${m.image}')">
        ${m.popular ? '<span class="popular-badge">🔥 Popular</span>' : ''}
      </div>
      <div class="dish-card-body">
        <h4>${m.name}</h4>
        <p class="dish-restaurant">${rest?.name || ''}</p>
        <div class="dish-meta">
          <span class="dish-price">$${m.price.toFixed(2)}</span>
          <span class="dish-rating">⭐ ${m.rating}</span>
        </div>
      </div>
    </div>
  `;
}

function renderRestaurantsPage() {
  const container = document.getElementById('restaurants-grid');
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.cuisine || 'all';
  const sortBy = document.getElementById('sort-select')?.value || 'rating';

  const filtered = Search.filterRestaurants({ cuisine: activeFilter, sortBy });
  if (container) {
    container.innerHTML = filtered.map(r => renderRestaurantCard(r)).join('');
  }
}

function renderRestaurantDetail(id) {
  const r = RESTAURANTS.find(x => x.id === id);
  if (!r) { navigateTo('restaurants'); return; }
  const container = document.getElementById('restaurant-detail-content');
  if (!container) return;

  const menuItems = MENU_ITEMS.filter(m => m.restaurantId === id);
  const categories = [...new Set(menuItems.map(m => m.category))];

  container.innerHTML = `
    <div class="rest-detail-banner" style="background-image:url('${r.image}')">
      <div class="rest-detail-overlay">
        <button class="back-btn" onclick="navigateTo('restaurants')">← Back</button>
        <div class="rest-detail-info">
          <h1>${r.name}</h1>
          <p class="rest-detail-cuisine">${r.cuisine.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' · ')}</p>
          <div class="rest-detail-meta">
            <span>⭐ ${r.rating} (${r.reviews} reviews)</span>
            <span>🕐 ${r.deliveryTime} min</span>
            <span>💰 ${r.priceRange}</span>
            <span>🚚 $${r.deliveryFee.toFixed(2)} delivery</span>
          </div>
          <p class="rest-detail-desc">${r.description}</p>
        </div>
      </div>
    </div>
    <div class="menu-section">
      <div class="menu-categories">
        ${categories.map((c, i) => `<button class="menu-cat-btn ${i === 0 ? 'active' : ''}" onclick="filterMenuCategory(this, '${c}')">${c}</button>`).join('')}
      </div>
      <div class="menu-grid" id="menu-items-grid">
        ${menuItems.map(m => `
          <div class="menu-item-card" data-category="${m.category}" onclick="openDishModal('${m.id}')">
            <img src="${m.image}" alt="${m.name}" class="menu-item-img">
            <div class="menu-item-info">
              <h4>${m.name}</h4>
              <p class="menu-item-desc">${m.description}</p>
              <div class="menu-item-bottom">
                <span class="menu-item-price">$${m.price.toFixed(2)}</span>
                <span class="menu-item-rating">⭐ ${m.rating}</span>
                <button class="add-btn" onclick="event.stopPropagation(); quickAdd('${m.id}')">+ Add</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function filterMenuCategory(btn, category) {
  document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.menu-item-card').forEach(card => {
    card.style.display = card.dataset.category === category || !category ? '' : 'none';
  });
  // Show all if clicking same category again
  if (category) {
    document.querySelectorAll('.menu-item-card').forEach(card => {
      card.style.display = card.dataset.category === category ? '' : 'none';
    });
  }
}

function quickAdd(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (item) Cart.addItem(item, item.sizes?.[0] || null, [], 1);
}

// ===== DISH MODAL =====
function openDishModal(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) return;
  const rest = RESTAURANTS.find(r => r.id === item.restaurantId);
  const modal = document.getElementById('dish-modal');
  const content = document.getElementById('dish-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <button class="modal-close" onclick="closeDishModal()">✕</button>
    <img src="${item.image}" alt="${item.name}" class="dish-modal-img">
    <div class="dish-modal-body">
      <h2>${item.name}</h2>
      <p class="dish-modal-restaurant">${rest?.name || ''}</p>
      <div class="dish-modal-rating">⭐ ${item.rating} · ${item.category}</div>
      <p class="dish-modal-desc">${item.description}</p>
      <div class="dish-modal-price" id="dish-modal-total">$${item.price.toFixed(2)}</div>

      ${item.sizes.length > 0 ? `
        <div class="dish-option-group">
          <h4>Size</h4>
          ${item.sizes.map((s, i) => `
            <label class="option-label">
              <input type="radio" name="dish-size" value="${i}" ${i === 0 ? 'checked' : ''} onchange="updateDishPrice('${item.id}')">
              <span>${s.name}</span>
              <span class="option-price">${s.price > 0 ? '+$' + s.price.toFixed(2) : 'Included'}</span>
            </label>
          `).join('')}
        </div>
      ` : ''}

      ${item.toppings.length > 0 ? `
        <div class="dish-option-group">
          <h4>Extras</h4>
          ${item.toppings.map((t, i) => `
            <label class="option-label">
              <input type="checkbox" name="dish-topping" value="${i}" onchange="updateDishPrice('${item.id}')">
              <span>${t.name}</span>
              <span class="option-price">+$${t.price.toFixed(2)}</span>
            </label>
          `).join('')}
        </div>
      ` : ''}

      <div class="dish-modal-actions">
        <div class="qty-control qty-lg">
          <button class="qty-btn" onclick="changeDishQty(-1)">−</button>
          <span id="dish-qty">1</span>
          <button class="qty-btn" onclick="changeDishQty(1)">+</button>
        </div>
        <button class="btn btn-primary btn-lg" onclick="addDishToCart('${item.id}')">
          Add to Cart · <span id="dish-add-price">$${item.price.toFixed(2)}</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDishModal() {
  document.getElementById('dish-modal')?.classList.remove('active');
  document.body.style.overflow = '';
}

let dishQty = 1;
function changeDishQty(delta) {
  dishQty = Math.max(1, dishQty + delta);
  document.getElementById('dish-qty').textContent = dishQty;
  // recalculate price shown on button
  const totalEl = document.getElementById('dish-add-price');
  const priceEl = document.getElementById('dish-modal-total');
  if (totalEl && priceEl) {
    const unitPrice = parseFloat(priceEl.textContent.replace('$', ''));
    totalEl.textContent = '$' + (unitPrice * dishQty).toFixed(2);
  }
}

function updateDishPrice(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) return;
  let price = item.price;
  const sizeRadio = document.querySelector('input[name="dish-size"]:checked');
  if (sizeRadio) price += item.sizes[parseInt(sizeRadio.value)].price;
  document.querySelectorAll('input[name="dish-topping"]:checked').forEach(cb => {
    price += item.toppings[parseInt(cb.value)].price;
  });
  document.getElementById('dish-modal-total').textContent = '$' + price.toFixed(2);
  document.getElementById('dish-add-price').textContent = '$' + (price * dishQty).toFixed(2);
}

function addDishToCart(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) return;
  const sizeRadio = document.querySelector('input[name="dish-size"]:checked');
  const selectedSize = sizeRadio ? item.sizes[parseInt(sizeRadio.value)] : null;
  const selectedToppings = [];
  document.querySelectorAll('input[name="dish-topping"]:checked').forEach(cb => {
    selectedToppings.push(item.toppings[parseInt(cb.value)]);
  });
  Cart.addItem(item, selectedSize, selectedToppings, dishQty);
  dishQty = 1;
  closeDishModal();
}

// ===== CHECKOUT =====
function renderCheckoutPage() {
  if (Cart.getCount() === 0) { navigateTo('restaurants'); return; }
  const container = document.getElementById('checkout-content');
  if (!container) return;
  const user = Auth.getUser();

  container.innerHTML = `
    <div class="checkout-grid">
      <div class="checkout-form">
        <h2>Delivery Details</h2>
        <form id="checkout-form" onsubmit="handleCheckout(event)">
          <div class="form-group">
            <label for="checkout-name">Full Name</label>
            <input type="text" id="checkout-name" required value="${user?.name || ''}" placeholder="John Doe">
          </div>
          <div class="form-group">
            <label for="checkout-phone">Phone Number</label>
            <input type="tel" id="checkout-phone" required value="${user?.phone || ''}" placeholder="(555) 123-4567">
          </div>
          <div class="form-group">
            <label for="checkout-address">Delivery Address</label>
            <input type="text" id="checkout-address" required placeholder="123 Main Street, Apt 4B">
          </div>
          <div class="form-group">
            <label for="checkout-notes">Delivery Notes (optional)</label>
            <textarea id="checkout-notes" placeholder="Ring the doorbell, leave at door, etc."></textarea>
          </div>
          <h3>Payment Method</h3>
          <div class="payment-options">
            <label class="payment-option active">
              <input type="radio" name="payment" value="card" checked onchange="this.closest('.payment-options').querySelectorAll('.payment-option').forEach(p=>p.classList.remove('active')); this.closest('.payment-option').classList.add('active')">
              <span class="payment-icon">💳</span> Credit Card
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="cash" onchange="this.closest('.payment-options').querySelectorAll('.payment-option').forEach(p=>p.classList.remove('active')); this.closest('.payment-option').classList.add('active')">
              <span class="payment-icon">💵</span> Cash on Delivery
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="wallet" onchange="this.closest('.payment-options').querySelectorAll('.payment-option').forEach(p=>p.classList.remove('active')); this.closest('.payment-option').classList.add('active')">
              <span class="payment-icon">📱</span> Digital Wallet
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-full">Place Order · $${Cart.getTotal().toFixed(2)}</button>
        </form>
      </div>
      <div class="checkout-summary">
        <h3>Order Summary</h3>
        <div class="checkout-items">
          ${Cart.getItems().map(item => `
            <div class="checkout-item">
              <img src="${item.image}" alt="${item.name}">
              <div>
                <h4>${item.name} × ${item.quantity}</h4>
                <p>${item.restaurantName}</p>
              </div>
              <span>$${(Cart.getItemPrice(item) * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="checkout-totals">
          <div class="price-row"><span>Subtotal</span><span>$${Cart.getSubtotal().toFixed(2)}</span></div>
          <div class="price-row"><span>Delivery</span><span>${Cart.getDeliveryFee() === 0 ? 'FREE' : '$' + Cart.getDeliveryFee().toFixed(2)}</span></div>
          <div class="price-row"><span>Tax</span><span>$${Cart.getTax().toFixed(2)}</span></div>
          ${Cart.getDiscount() > 0 ? `<div class="price-row discount"><span>Discount</span><span>-$${Cart.getDiscount().toFixed(2)}</span></div>` : ''}
          <div class="price-row total"><span>Total</span><span>$${Cart.getTotal().toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  `;
}

function handleCheckout(e) {
  e.preventDefault();
  const deliveryInfo = {
    name: document.getElementById('checkout-name').value,
    phone: document.getElementById('checkout-phone').value,
    address: document.getElementById('checkout-address').value,
    notes: document.getElementById('checkout-notes').value,
    payment: document.querySelector('input[name="payment"]:checked').value
  };
  const order = Orders.placeOrder(deliveryInfo);
  navigateTo('confirmation/' + order.id);
}

// ===== CONFIRMATION =====
function renderConfirmationPage(orderId) {
  const orders = Orders.getOrders();
  const order = orders.find(o => o.id === orderId);
  const container = document.getElementById('confirmation-content');
  if (!container) return;

  // Show confirmation section
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.getElementById('page-confirmation')?.classList.add('active');

  container.innerHTML = `
    <div class="confirmation-card">
      <div class="confirmation-icon">✓</div>
      <h2>Order Placed Successfully!</h2>
      <p class="confirmation-id">Order ID: <strong>${orderId}</strong></p>
      <p class="confirmation-eta">Estimated delivery: <strong>${order?.estimatedDelivery || '30-45 min'}</strong></p>
      <div class="confirmation-actions">
        <button class="btn btn-primary" onclick="navigateTo('tracking/${orderId}')">Track Order</button>
        <button class="btn btn-secondary" onclick="navigateTo('home')">Back to Home</button>
      </div>
    </div>
  `;
}

// ===== TRACKING SECTION =====
function renderTrackingSection(orderId) {
  Orders.renderTrackingPage(orderId);
  Orders.simulateTracking(orderId);
}

// ===== PROFILE =====
function renderProfilePage() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  if (!Auth.isLoggedIn()) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">👤</div><h3>Please log in</h3><p>Log in to view your profile and order history</p><button class="btn btn-primary" onclick="openAuthModal()">Log In</button></div>`;
    return;
  }
  const user = Auth.getUser();
  const orders = Orders.getOrders();

  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${user.avatar || user.name.charAt(0)}</div>
      <div class="profile-info">
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <p>Member since ${new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>
      <button class="btn btn-secondary" onclick="Auth.logout()">Log Out</button>
    </div>
    <div class="profile-sections">
      <div class="profile-section">
        <h3>📋 Recent Orders</h3>
        ${orders.length > 0 ? orders.slice(0, 5).map(order => `
          <div class="order-history-card" onclick="navigateTo('tracking/${order.id}')">
            <div class="order-history-header">
              <span class="order-id">${order.id}</span>
              <span class="order-status status-${order.status}">${Orders.STATUS_LABELS[order.status]}</span>
            </div>
            <div class="order-history-items">${order.items.map(i => i.name).join(', ')}</div>
            <div class="order-history-footer">
              <span>${new Date(order.placedAt).toLocaleDateString()}</span>
              <span class="order-total">$${order.total.toFixed(2)}</span>
            </div>
          </div>
        `).join('') : '<p class="text-muted">No orders yet</p>'}
      </div>
      <div class="profile-section">
        <h3>❤️ Favorite Restaurants</h3>
        <div class="favorites-grid">
          ${(user.favorites || []).length > 0 ? user.favorites.map(fId => {
            const r = RESTAURANTS.find(x => x.id === fId);
            return r ? `<div class="fav-card" onclick="navigateTo('restaurant/${r.id}')"><span class="fav-logo">${r.logo}</span><span>${r.name}</span></div>` : '';
          }).join('') : '<p class="text-muted">No favorites yet. Tap ♥ on a restaurant to save it!</p>'}
        </div>
      </div>
    </div>
  `;
}

// ===== DARK MODE =====
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('feastflow_theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById('nav-links')?.classList.toggle('mobile-open');
}

// ===== INIT =====
function initApp() {
  // Theme
  const savedTheme = localStorage.getItem('feastflow_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  // Auth UI
  Auth.updateUI();

  // Cart badge
  Cart.updateBadge();

  // Search
  Search.init();

  // Filter buttons for restaurants page
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRestaurantsPage();
    });
  });

  // Promo code
  const promoBtn = document.getElementById('apply-promo-btn');
  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const input = document.getElementById('promo-input');
      if (input) {
        const result = Cart.applyPromo(input.value);
        showToast(result.message, result.success ? 'success' : 'error');
      }
    });
  }

  // Cart overlay close
  document.getElementById('cart-overlay')?.addEventListener('click', Cart.close);

  // Route
  handleRoute();
  window.addEventListener('hashchange', handleRoute);

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
  });
}

document.addEventListener('DOMContentLoaded', initApp);
