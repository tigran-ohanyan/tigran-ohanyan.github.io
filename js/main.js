(function () {
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // ----- theme -----
  const themeKey = 'cv-theme';
  const savedTheme = safeGet(themeKey);
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) root.setAttribute('data-theme', 'light');
  $('#theme-toggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    safeSet(themeKey, next);
  });

  // ----- language -----
  const langKey = 'cv-lang';
  const dict = window.I18N || {};
  const defaultLang = (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
  let lang = safeGet(langKey) || defaultLang;

  function applyLang(next) {
    lang = dict[next] ? next : 'en';
    root.setAttribute('lang', lang);
    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]);
      if (value != null) el.innerHTML = value;
    });
    $$('.lang-switch button').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    const titles = dict[lang] && dict[lang]['meta.title'];
    if (titles) document.title = titles;
    safeSet(langKey, lang);
  }
  $$('.lang-switch button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(lang);

  // ----- mobile nav -----
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-menu a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // ----- project filters -----
  $$('.filters .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('.filters .chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const f = chip.dataset.filter;
      $$('#projects-grid .project').forEach((p) => {
        const cats = (p.dataset.cat || '').split(/\s+/);
        p.classList.toggle('is-hidden', f !== 'all' && !cats.includes(f));
      });
    });
  });

  // ----- reveal on scroll -----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));

  // ----- print -----
  $('#print-btn').addEventListener('click', () => window.print());

  $('#year').textContent = new Date().getFullYear();

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
})();
