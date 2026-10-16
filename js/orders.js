// ===== ORDERS MODULE =====
const Orders = (() => {
  const STATUSES = ['confirmed', 'preparing', 'onTheWay', 'delivered'];
  const STATUS_LABELS = { confirmed: 'Order Confirmed', preparing: 'Preparing Your Food', onTheWay: 'On the Way', delivered: 'Delivered' };
  const STATUS_ICONS = { confirmed: '✓', preparing: '👨‍🍳', onTheWay: '🛵', delivered: '📦' };

  function getOrders() { return JSON.parse(localStorage.getItem('feastflow_orders') || '[]'); }
  function saveOrders(orders) { localStorage.setItem('feastflow_orders', JSON.stringify(orders)); }

  function placeOrder(deliveryInfo) {
    const order = {
      id: 'FF' + Date.now().toString(36).toUpperCase(),
      items: Cart.getItems().map(i => ({ ...i })),
      subtotal: Cart.getSubtotal(),
      deliveryFee: Cart.getDeliveryFee(),
      tax: Cart.getTax(),
      discount: Cart.getDiscount(),
      total: Cart.getTotal(),
      status: 'confirmed',
      statusIndex: 0,
      deliveryInfo,
      placedAt: new Date().toISOString(),
      estimatedDelivery: '30-45 min'
    };
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    Cart.clear();
    return order;
  }

  function simulateTracking(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order || order.statusIndex >= 3) return;

    let step = order.statusIndex;
    const interval = setInterval(() => {
      step++;
      if (step > 3) { clearInterval(interval); return; }
      const allOrders = getOrders();
      const o = allOrders.find(x => x.id === orderId);
      if (o) {
        o.statusIndex = step;
        o.status = STATUSES[step];
        saveOrders(allOrders);
        renderTrackingPage(orderId);
      }
    }, 5000); // advance every 5 seconds for demo
  }

  function renderTrackingPage(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    const container = document.getElementById('tracking-content');
    if (!order || !container) return;

    container.innerHTML = `
      <div class="tracking-header">
        <h2>Order ${order.id}</h2>
        <p class="tracking-eta">Estimated delivery: <strong>${order.estimatedDelivery}</strong></p>
      </div>
      <div class="tracking-timeline">
        ${STATUSES.map((s, i) => `
          <div class="tracking-step ${i <= order.statusIndex ? 'active' : ''} ${i === order.statusIndex ? 'current' : ''}">
            <div class="tracking-step-icon">${STATUS_ICONS[s]}</div>
            <div class="tracking-step-line"></div>
            <div class="tracking-step-label">${STATUS_LABELS[s]}</div>
          </div>
        `).join('')}
      </div>
      <div class="tracking-items">
        <h3>Order Items</h3>
        ${order.items.map(item => `
          <div class="tracking-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h4>${item.name} × ${item.quantity}</h4>
              <p>${item.restaurantName}</p>
            </div>
            <span>$${(Cart.getItemPrice(item) * item.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
      <div class="tracking-total">
        <div class="price-row"><span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span></div>
        <div class="price-row"><span>Delivery</span><span>${order.deliveryFee === 0 ? 'FREE' : '$' + order.deliveryFee.toFixed(2)}</span></div>
        <div class="price-row"><span>Tax</span><span>$${order.tax.toFixed(2)}</span></div>
        ${order.discount > 0 ? `<div class="price-row discount"><span>Discount</span><span>-$${order.discount.toFixed(2)}</span></div>` : ''}
        <div class="price-row total"><span>Total</span><span>$${order.total.toFixed(2)}</span></div>
      </div>
    `;
  }

  function renderOrderHistory() {
    const container = document.getElementById('order-history-list');
    if (!container) return;
    const orders = getOrders();
    if (orders.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><h3>No orders yet</h3><p>Your order history will appear here</p><button class="btn btn-primary" onclick="navigateTo('restaurants')">Start Ordering</button></div>`;
      return;
    }
    container.innerHTML = orders.map(order => `
      <div class="order-history-card" onclick="navigateTo('tracking/${order.id}')">
        <div class="order-history-header">
          <span class="order-id">${order.id}</span>
          <span class="order-status status-${order.status}">${STATUS_LABELS[order.status]}</span>
        </div>
        <div class="order-history-items">${order.items.map(i => i.name).join(', ')}</div>
        <div class="order-history-footer">
          <span class="order-date">${new Date(order.placedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          <span class="order-total">$${order.total.toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  }

  return { placeOrder, simulateTracking, renderTrackingPage, renderOrderHistory, getOrders, STATUSES, STATUS_LABELS };
})();
