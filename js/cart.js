// ===== CART MODULE =====
const Cart = (() => {
  let items = JSON.parse(localStorage.getItem('feastflow_cart') || '[]');
  let promoCode = null;

  function save() {
    localStorage.setItem('feastflow_cart', JSON.stringify(items));
    updateBadge();
    if (document.getElementById('cart-panel')?.classList.contains('open')) renderCartPanel();
  }

  function updateBadge() {
    const badge = document.getElementById('cart-badge');
    const count = items.reduce((s, i) => s + i.quantity, 0);
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      if (count > 0) badge.classList.add('bounce');
      setTimeout(() => badge.classList.remove('bounce'), 300);
    }
  }

  function addItem(menuItem, selectedSize, selectedToppings, quantity = 1) {
    const key = menuItem.id + '_' + (selectedSize?.name || '') + '_' + (selectedToppings || []).map(t => t.name).sort().join(',');
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        key, id: menuItem.id, name: menuItem.name, image: menuItem.image,
        basePrice: menuItem.price, size: selectedSize, toppings: selectedToppings || [],
        quantity, restaurantId: menuItem.restaurantId,
        restaurantName: RESTAURANTS.find(r => r.id === menuItem.restaurantId)?.name || ''
      });
    }
    save();
    showToast(`${menuItem.name} added to cart!`);
  }

  function removeItem(key) {
    items = items.filter(i => i.key !== key);
    save();
  }

  function updateQuantity(key, delta) {
    const item = items.find(i => i.key === key);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) items = items.filter(i => i.key !== key);
    save();
  }

  function getItemPrice(item) {
    let price = item.basePrice;
    if (item.size) price += item.size.price;
    if (item.toppings) price += item.toppings.reduce((s, t) => s + t.price, 0);
    return price;
  }

  function getSubtotal() { return items.reduce((s, i) => s + getItemPrice(i) * i.quantity, 0); }

  function getDeliveryFee() {
    if (items.length === 0) return 0;
    if (promoCode && PROMO_CODES[promoCode]?.type === 'freeDelivery') return 0;
    const rIds = [...new Set(items.map(i => i.restaurantId))];
    return rIds.reduce((s, id) => s + (RESTAURANTS.find(r => r.id === id)?.deliveryFee || 0), 0);
  }

  function getDiscount() {
    if (!promoCode || !PROMO_CODES[promoCode]) return 0;
    const p = PROMO_CODES[promoCode];
    const sub = getSubtotal();
    if (sub < p.minOrder) return 0;
    if (p.type === 'percent') return sub * p.discount / 100;
    if (p.type === 'fixed') return p.discount;
    return 0;
  }

  function getTax() { return getSubtotal() * 0.08; }
  function getTotal() { return Math.max(0, getSubtotal() - getDiscount() + getTax() + getDeliveryFee()); }
  function getItems() { return items; }
  function getCount() { return items.reduce((s, i) => s + i.quantity, 0); }
  function clear() { items = []; promoCode = null; save(); }

  function applyPromo(code) {
    const upper = code.toUpperCase().trim();
    if (!PROMO_CODES[upper]) return { success: false, message: 'Invalid promo code' };
    if (getSubtotal() < PROMO_CODES[upper].minOrder) return { success: false, message: `Minimum order $${PROMO_CODES[upper].minOrder} required` };
    promoCode = upper;
    save();
    return { success: true, message: PROMO_CODES[upper].description };
  }

  function removePromo() { promoCode = null; save(); }

  function renderCartPanel() {
    const panel = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    if (!panel) return;

    if (items.length === 0) {
      panel.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><h3>Your cart is empty</h3><p>Add some delicious items to get started!</p><button class="btn btn-primary" onclick="Cart.close(); navigateTo('restaurants')">Browse Restaurants</button></div>`;
      if (summary) summary.style.display = 'none';
      return;
    }

    if (summary) summary.style.display = 'block';
    panel.innerHTML = items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-restaurant">${item.restaurantName}</p>
          ${item.size ? `<span class="cart-item-detail">${item.size.name}</span>` : ''}
          ${item.toppings.length ? `<span class="cart-item-detail">+${item.toppings.map(t=>t.name).join(', ')}</span>` : ''}
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="Cart.updateQuantity('${item.key}', -1)">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.updateQuantity('${item.key}', 1)">+</button>
            </div>
            <span class="cart-item-price">$${(getItemPrice(item) * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="Cart.removeItem('${item.key}')">✕</button>
      </div>
    `).join('');

    // Update summary
    document.getElementById('cart-subtotal').textContent = `$${getSubtotal().toFixed(2)}`;
    document.getElementById('cart-delivery').textContent = getDeliveryFee() === 0 ? 'FREE' : `$${getDeliveryFee().toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${getTax().toFixed(2)}`;
    const discountEl = document.getElementById('cart-discount-row');
    if (getDiscount() > 0) {
      discountEl.style.display = 'flex';
      document.getElementById('cart-discount').textContent = `-$${getDiscount().toFixed(2)}`;
    } else {
      discountEl.style.display = 'none';
    }
    document.getElementById('cart-total').textContent = `$${getTotal().toFixed(2)}`;
  }

  function open() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    if (panel) { panel.classList.add('open'); renderCartPanel(); }
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  return { addItem, removeItem, updateQuantity, getItems, getCount, getSubtotal, getDeliveryFee,
    getDiscount, getTax, getTotal, applyPromo, removePromo, clear, open, close, renderCartPanel,
    updateBadge, getItemPrice };
})();
