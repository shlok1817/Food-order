// ===== SEARCH MODULE =====
const Search = (() => {
  let debounceTimer = null;

  function searchAll(query) {
    const q = query.toLowerCase().trim();
    if (!q) return { restaurants: [], items: [] };
    const restaurants = RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some(c => c.includes(q)) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
    const items = MENU_ITEMS.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
    return { restaurants, items };
  }

  function filterRestaurants(filters) {
    let results = [...RESTAURANTS];
    if (filters.cuisine && filters.cuisine !== 'all') {
      results = results.filter(r => r.cuisine.includes(filters.cuisine));
    }
    if (filters.rating) {
      results = results.filter(r => r.rating >= filters.rating);
    }
    if (filters.priceRange) {
      results = results.filter(r => r.priceRange === filters.priceRange);
    }
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating': results.sort((a, b) => b.rating - a.rating); break;
        case 'deliveryTime': results.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)); break;
        case 'deliveryFee': results.sort((a, b) => a.deliveryFee - b.deliveryFee); break;
        case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      }
    }
    return results;
  }

  function renderSearchResults(query) {
    const dropdown = document.getElementById('search-dropdown');
    if (!dropdown) return;
    if (!query.trim()) { dropdown.classList.remove('active'); return; }
    const { restaurants, items } = searchAll(query);

    if (restaurants.length === 0 && items.length === 0) {
      dropdown.innerHTML = `<div class="search-no-results"><p>No results found for "${query}"</p></div>`;
      dropdown.classList.add('active');
      return;
    }

    let html = '';
    if (restaurants.length > 0) {
      html += `<div class="search-section"><h4>Restaurants</h4>`;
      html += restaurants.slice(0, 4).map(r => `
        <div class="search-result-item" onclick="navigateTo('restaurant/${r.id}'); Search.closeDropdown()">
          <span class="search-result-emoji">${r.logo}</span>
          <div><strong>${r.name}</strong><p>${r.cuisine.join(', ')} · ⭐ ${r.rating}</p></div>
        </div>
      `).join('');
      html += `</div>`;
    }
    if (items.length > 0) {
      html += `<div class="search-section"><h4>Dishes</h4>`;
      html += items.slice(0, 5).map(m => {
        const rest = RESTAURANTS.find(r => r.id === m.restaurantId);
        return `
          <div class="search-result-item" onclick="openDishModal('${m.id}'); Search.closeDropdown()">
            <img src="${m.image}" class="search-result-img" alt="${m.name}">
            <div><strong>${m.name}</strong><p>${rest?.name || ''} · $${m.price.toFixed(2)}</p></div>
          </div>
        `;
      }).join('');
      html += `</div>`;
    }
    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  }

  function closeDropdown() {
    const dropdown = document.getElementById('search-dropdown');
    if (dropdown) dropdown.classList.remove('active');
  }

  function handleSearchInput(e) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => renderSearchResults(e.target.value), 200);
  }

  function init() {
    const input = document.getElementById('search-input');
    if (input) {
      input.addEventListener('input', handleSearchInput);
      input.addEventListener('focus', () => { if (input.value.trim()) renderSearchResults(input.value); });
    }
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) closeDropdown();
    });
  }

  return { searchAll, filterRestaurants, renderSearchResults, closeDropdown, init };
})();
