// MSB App - shared utilities, navigation, formatting, persistence

const MSB = (() => {
  const STORAGE_KEY = 'msb_state_v1';

  const defaultState = {
    language: 'ru',
    auth: { loggedIn: false, pin: '' },
    drafts: {},
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch (e) {
      return { ...defaultState };
    }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  let state = loadState();

  function updateState(patch) {
    state = { ...state, ...patch };
    saveState(state);
  }

  function getState() { return state; }

  function logout() {
    updateState({ auth: { loggedIn: false, pin: '' } });
  }

  function login() {
    updateState({ auth: { loggedIn: true, pin: '0000' } });
  }

  // Currency formatting
  function fmtMoney(amount, currency = 'UZS') {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    }
    const n = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(amount);
    return `${n} сум`;
  }

  function fmtMoneyShort(amount, currency = 'UZS') {
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    if (currency === 'USD') return `${sign}$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(abs)}`;
    if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)} млн сум`;
    if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(0)} тыс`;
    return `${sign}${abs}`;
  }

  function fmtCardNumber(num) {
    return num.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const months = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function fmtDateShort(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
  }

  function relativeDay(iso) {
    if (!iso) return '';
    const today = new Date('2026-05-13');
    const d = new Date(iso);
    const diff = Math.round((today - d) / 86400000);
    if (diff === 0) return 'Сегодня';
    if (diff === 1) return 'Вчера';
    if (diff < 7) return `${diff} дн. назад`;
    return fmtDateShort(iso);
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('');
  }

  function qsParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function toast(msg, ms = 2200) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
  }

  function statusBar() {
    return `
      <div class="status-bar">
        <span>9:41</span>
        <span class="icons">
          <span>●●●●</span>
          <span style="font-size: 11px;">5G</span>
          <span style="font-size: 11px;">▣</span>
        </span>
      </div>`;
  }

  // Bottom navigation - exact Figma spec (5 items, 64px height, sticky)
  function bottomNav(active) {
    const items = [
      { key: 'home',     href: 'home.html',         label: 'Главная',   icon: 'ic-home.svg' },
      { key: 'docs',     href: 'documents.html',    label: 'Документы', icon: 'ic-file.svg' },
      { key: 'qr',       href: 'qr.html',           label: 'QR оплата', icon: 'ic-qr-nav.svg' },
      { key: 'reports',  href: 'reports.html',      label: 'Отчеты',    icon: 'ic-chart-pie.svg' },
      { key: 'menu',     href: 'menu.html',         label: 'Меню',      icon: 'ic-menu.svg' },
    ];
    return `<nav class="bottom-nav-figma">
      ${items.map(i => `
        <a href="${i.href}" class="bn-item ${active === i.key ? 'active' : ''}">
          <span class="bn-icon"><img src="../assets/${i.icon}" alt=""></span>
          <span class="bn-label">${i.label}</span>
        </a>
      `).join('')}
    </nav>
    <div class="bottom-nav-home-indicator"></div>`;
  }

  // Pink-gradient top bar with back arrow + title + headphones + bell — matches Figma
  function pinkHeader({ title, back = true, showActions = true }) {
    return `
      <div class="header-pink-bar">
        <div class="ios-status on-gradient">
          <div class="time">9:41</div>
          <div class="dynamic-island"></div>
          <div class="levels">
            <img class="cellular" src="../assets/ic-cellular.svg" alt="">
            <img class="wifi" src="../assets/ic-wifi.svg" alt="">
            <img class="battery" src="../assets/ic-battery.svg" alt="">
          </div>
        </div>
        <div class="hp-top-bar">
          ${back
            ? '<button class="hp-back" onclick="history.back()" aria-label="Назад"><img src="../assets/ic-chevron-right.svg" alt="" style="transform: scaleX(-1);"></button>'
            : '<button class="hp-hamburger" onclick="location.href=\'menu.html\'" aria-label="Меню"><img src="../assets/ic-hamburger.svg" alt=""></button>'}
          <div class="hp-title">${title}</div>
          ${showActions ? `
          <div class="hp-actions">
            <button class="hp-icon-btn" onclick="MSB.toast('Поддержка · скоро')" aria-label="Поддержка">
              <img src="../assets/ic-headphones.svg" alt="">
            </button>
            <button class="hp-icon-btn" onclick="location.href='notifications.html'" aria-label="Уведомления">
              <img src="../assets/ic-bell.svg" alt="">
            </button>
          </div>` : ''}
        </div>
      </div>`;
  }

  function requireAuth() {
    const path = location.pathname;
    const isAuthPage = /(intro|login)\.html$/.test(path);
    if (!state.auth.loggedIn && !isAuthPage) {
      location.replace('login.html');
    }
  }

  function init() {
    requireAuth();
  }

  // ---------- Onboarding invites (HR side) ----------
  const INVITES_KEY = 'msb_invites_v1';
  const NEW_STAFF_KEY = 'msb_new_staff_v1';

  function loadInvites() {
    try { return JSON.parse(localStorage.getItem(INVITES_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveInvites(list) {
    try { localStorage.setItem(INVITES_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function createInvite(data) {
    const list = loadInvites();
    const token = Math.random().toString(36).slice(2, 10).toUpperCase();
    const now = new Date('2026-05-13T09:41:00');
    const expires = new Date(now.getTime() + 24 * 3600 * 1000); // +24h
    const invite = {
      token,
      firstName: data.firstName,
      lastName: data.lastName,
      passport: data.passport,
      dob: data.dob,
      phone: data.phone,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: 'pending',
    };
    list.push(invite);
    saveInvites(list);
    return invite;
  }
  function getInvite(token) {
    return loadInvites().find(i => i.token === token);
  }
  function markInviteCompleted(token) {
    const list = loadInvites();
    const inv = list.find(i => i.token === token);
    if (inv) inv.status = 'completed';
    saveInvites(list);
  }

  // ---------- Onboarded new staff (employee side completes) ----------
  function loadNewStaff() {
    try { return JSON.parse(localStorage.getItem(NEW_STAFF_KEY) || '[]'); } catch (e) { return []; }
  }
  function addNewStaff(emp) {
    const list = loadNewStaff();
    list.push(emp);
    try { localStorage.setItem(NEW_STAFF_KEY, JSON.stringify(list)); } catch (e) {}
    return emp;
  }
  function clearOnboardingState() {
    saveInvites([]);
    try { localStorage.setItem(NEW_STAFF_KEY, '[]'); } catch (e) {}
  }

  // Validators
  function validatePassport(v) { return /^[A-Z]{2}\d{7}$/.test((v || '').toUpperCase().replace(/\s/g, '')); }
  function validatePhone(v) { return /^\+998\d{9}$/.test((v || '').replace(/[\s\-()]/g, '')); }
  function validateDob(v) {
    const m = (v || '').match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!m) return false;
    const [_, d, mo, y] = m;
    const date = new Date(`${y}-${mo}-${d}`);
    return date.getFullYear() === Number(y) && date.getMonth() + 1 === Number(mo) && date.getDate() === Number(d);
  }

  return {
    state, getState, updateState, login, logout,
    fmtMoney, fmtMoneyShort, fmtCardNumber, fmtDate, fmtDateShort, relativeDay,
    initials, qsParam, toast,
    statusBar, bottomNav, pinkHeader,
    createInvite, getInvite, loadInvites, markInviteCompleted,
    loadNewStaff, addNewStaff, clearOnboardingState,
    validatePassport, validatePhone, validateDob,
    init,
  };
})();

if (typeof window !== 'undefined') window.MSB = MSB;
