/* ======================================
   main.js — Bengali IT
   Navigation, Counters, Countdown Timer
====================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────
     1. STICKY NAVBAR SCROLL EFFECT
  ───────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ─────────────────────────────
     2. MOBILE MENU TOGGLE
  ───────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Toggle hamburger → X icon
      const bars = menuBtn.querySelectorAll('span');
      bars.forEach(b => b.classList.toggle('hidden'));
    });
  }

  /* ─────────────────────────────
     3. ANIMATED COUNTERS
  ───────────────────────────── */
  function animateCounter(el, target, suffix = '', duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('[data-counter]');

  // Use IntersectionObserver so counters animate when visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix, 2000);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));

  /* ─────────────────────────────
     4. COUNTDOWN TIMER (Flash Delivery)
  ───────────────────────────── */
  const timerEls = {
    h: document.getElementById('timer-h'),
    m: document.getElementById('timer-m'),
    s: document.getElementById('timer-s'),
  };

  if (timerEls.h && timerEls.m && timerEls.s) {
    // Set a target time 10 minutes from now on page load
    let deadline = new Date().getTime() + 10 * 60 * 1000;

    function updateTimer() {
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        // Reset to 10 minutes
        deadline = new Date().getTime() + 10 * 60 * 1000;
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      timerEls.h.textContent = String(h).padStart(2, '0');
      timerEls.m.textContent = String(m).padStart(2, '0');
      timerEls.s.textContent = String(s).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ─────────────────────────────
     5. FLOATING HERO PARTICLES
  ───────────────────────────── */
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const colors = ['rgba(79,70,229,0.4)', 'rgba(124,58,237,0.3)', 'rgba(34,197,94,0.25)', 'rgba(129,140,248,0.35)'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 6 + 3;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${colors[i % colors.length]};
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 6 + 4}s;
        animation-delay: ${Math.random() * 3}s;
      `;
      heroSection.appendChild(p);
    }
  }

  /* ─────────────────────────────
     6. SMOOTH SCROLL FOR ANCHORS
  ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  /* ─────────────────────────────
     7. BUY NOW BUTTON RIPPLE EFFECT
  ───────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple-anim 0.6s linear;
        left: ${e.clientX - rect.left - 15}px;
        top: ${e.clientY - rect.top - 15}px;
        width: 30px;
        height: 30px;
        pointer-events: none;
      `;
      const style = document.createElement('style');
      style.textContent = `@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }`;
      document.head.appendChild(style);
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ─────────────────────────────
     8. FADE-IN ON SCROLL (SECTIONS)
  ───────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeSlideUp 0.6s ease both';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
  });

});
