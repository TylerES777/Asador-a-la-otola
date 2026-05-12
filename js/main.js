/* Asador Otola — interactions */
(function () {
  'use strict';

  // ----- Scroll-triggered nav -----
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile nav toggle -----
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const open = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(a => {
      a.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ----- Highlight today's hours row -----
  const dayMap = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const today = dayMap[new Date().getDay()];
  document.querySelectorAll(`.hours-table tr[data-day="${today}"]`).forEach(tr => tr.classList.add('today'));

  // ----- Testimonial slider -----
  const tList = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots button');
  let tIdx = 0;
  let tTimer = null;
  const tShow = (i) => {
    tList.forEach((t, n) => t.classList.toggle('is-active', n === i));
    dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
    tIdx = i;
  };
  const tNext = () => tShow((tIdx + 1) % tList.length);
  if (tList.length) {
    tShow(0);
    tTimer = setInterval(tNext, 6500);
    dots.forEach((d, n) => {
      d.addEventListener('click', () => {
        clearInterval(tTimer);
        tShow(n);
        tTimer = setInterval(tNext, 6500);
      });
    });
  }

  // ----- Active menu category on scroll (menu page) -----
  const cats = document.querySelectorAll('.menu-categories a');
  if (cats.length) {
    const sections = Array.from(cats).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActiveCat = () => {
      const top = window.scrollY + 200;
      let active = sections[0];
      for (const s of sections) { if (s.offsetTop <= top) active = s; }
      cats.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active.id}`));
    };
    window.addEventListener('scroll', setActiveCat, { passive: true });
    setActiveCat();
  }

  // ----- Form fake submit -----
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        btn.textContent = 'Enviado · Gracias';
        btn.disabled = true;
        btn.style.background = 'var(--moss)';
      }
      form.reset();
    });
  }
})();
