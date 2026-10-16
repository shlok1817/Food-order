// ===== AUTH MODULE =====
const Auth = (() => {
  let currentUser = JSON.parse(localStorage.getItem('feastflow_user') || 'null');

  function save() {
    localStorage.setItem('feastflow_user', JSON.stringify(currentUser));
    updateUI();
  }

  function isLoggedIn() { return currentUser !== null; }
  function getUser() { return currentUser; }

  function signup(name, email, password, phone) {
    const users = JSON.parse(localStorage.getItem('feastflow_users') || '[]');
    if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered' };
    const user = {
      id: 'u' + Date.now(), name, email, password, phone,
      avatar: name.charAt(0).toUpperCase(),
      addresses: [], favorites: [], joinDate: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem('feastflow_users', JSON.stringify(users));
    currentUser = { ...user };
    delete currentUser.password;
    save();
    return { success: true, message: 'Account created successfully!' };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('feastflow_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    currentUser = { ...user };
    delete currentUser.password;
    save();
    return { success: true, message: 'Welcome back!' };
  }

  function logout() {
    currentUser = null;
    save();
    navigateTo('home');
  }

  function updateProfile(data) {
    if (!currentUser) return;
    Object.assign(currentUser, data);
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('feastflow_users') || '[]');
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx >= 0) { Object.assign(users[idx], data); localStorage.setItem('feastflow_users', JSON.stringify(users)); }
    save();
  }

  function addAddress(address) {
    if (!currentUser) return;
    if (!currentUser.addresses) currentUser.addresses = [];
    currentUser.addresses.push({ id: 'a' + Date.now(), ...address });
    save();
  }

  function removeAddress(id) {
    if (!currentUser) return;
    currentUser.addresses = currentUser.addresses.filter(a => a.id !== id);
    save();
  }

  function toggleFavorite(restaurantId) {
    if (!currentUser) { openAuthModal(); return; }
    if (!currentUser.favorites) currentUser.favorites = [];
    const idx = currentUser.favorites.indexOf(restaurantId);
    if (idx >= 0) currentUser.favorites.splice(idx, 1);
    else currentUser.favorites.push(restaurantId);
    save();
  }

  function isFavorite(restaurantId) {
    return currentUser?.favorites?.includes(restaurantId) || false;
  }

  function updateUI() {
    const loginBtn = document.getElementById('nav-login-btn');
    const userMenu = document.getElementById('nav-user-menu');
    const userAvatar = document.getElementById('nav-user-avatar');
    const userName = document.getElementById('nav-user-name');

    if (currentUser) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (userAvatar) userAvatar.textContent = currentUser.avatar || currentUser.name.charAt(0);
      if (userName) userName.textContent = currentUser.name.split(' ')[0];
    } else {
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
    }
  }

  function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function validatePassword(pw) { return pw.length >= 6; }

  return { isLoggedIn, getUser, signup, login, logout, updateProfile, addAddress,
    removeAddress, toggleFavorite, isFavorite, updateUI, validateEmail, validatePassword };
})();

function openAuthModal(tab = 'login') {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchAuthTab(tab);
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form-container').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signup-form-container').style.display = tab === 'signup' ? 'block' : 'none';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  if (!Auth.validateEmail(email)) { errorEl.textContent = 'Please enter a valid email'; return; }
  const result = Auth.login(email, password);
  if (result.success) { closeAuthModal(); showToast(result.message); }
  else { errorEl.textContent = result.message; }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const phone = document.getElementById('signup-phone').value.trim();
  const errorEl = document.getElementById('signup-error');
  if (!name) { errorEl.textContent = 'Name is required'; return; }
  if (!Auth.validateEmail(email)) { errorEl.textContent = 'Please enter a valid email'; return; }
  if (!Auth.validatePassword(password)) { errorEl.textContent = 'Password must be at least 6 characters'; return; }
  const result = Auth.signup(name, email, password, phone);
  if (result.success) { closeAuthModal(); showToast(result.message); }
  else { errorEl.textContent = result.message; }
}
