/* ======================================
   fomo.js — Bengali IT
   Live Sales Notification (FOMO Popup)
   Fires every 8–12 seconds with rotating
   dummy Bangladeshi city purchase data.
====================================== */

(function () {
  'use strict';

  /* ── FOMO Notification Data ── */
  const fomoData = [
    { name: 'Rakib H.',   city: 'Dhaka',      product: 'Windows 11 Pro Key',        time: 'just now'    },
    { name: 'Sumaiya T.', city: 'Chittagong', product: 'Microsoft Office 365',      time: '2 mins ago'  },
    { name: 'Fahim K.',   city: 'Sylhet',     product: 'Canva Pro (1 Year)',         time: '4 mins ago'  },
    { name: 'Nusrat J.',  city: 'Rajshahi',   product: 'Adobe Creative Cloud',      time: '1 min ago'   },
    { name: 'Arif M.',    city: 'Khulna',     product: 'Windows 11 Home Key',       time: 'just now'    },
    { name: 'Tamanna B.', city: 'Comilla',    product: 'Canva Pro (1 Year)',         time: '3 mins ago'  },
    { name: 'Imran A.',   city: 'Mymensingh', product: 'Microsoft Office 365',      time: 'just now'    },
    { name: 'Sadia I.',   city: 'Barisal',    product: 'Windows 11 Pro Key',        time: '5 mins ago'  },
    { name: 'Hasan R.',   city: 'Narayanganj',product: 'Adobe Photoshop CC',        time: '2 mins ago'  },
    { name: 'Mitu P.',    city: 'Gazipur',    product: 'Canva Pro (1 Year)',         time: 'just now'    },
    { name: 'Sajid U.',   city: 'Bogura',     product: 'Windows 11 Pro Key',        time: '1 min ago'   },
    { name: 'Rifa K.',    city: 'Jessore',    product: 'Microsoft Office 365',      time: 'just now'    },
  ];

  let fomoIndex = 0;
  let fomoTimeout = null;

  /* ── Get or create FOMO popup element ── */
  function getFomoEl() {
    let el = document.getElementById('fomo-popup');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fomo-popup';
      el.setAttribute('role', 'alert');
      el.setAttribute('aria-live', 'polite');
      el.innerHTML = `
        <button class="fomo-close" id="fomo-close-btn" aria-label="Close notification">×</button>
        <div class="fomo-pulse"></div>
        <div class="fomo-icon">🔥</div>
        <div class="fomo-text">
          <div class="fomo-title" id="fomo-msg-title"></div>
          <div class="fomo-sub" id="fomo-msg-sub"></div>
          <span class="fomo-time" id="fomo-msg-time"></span>
        </div>
      `;
      document.body.appendChild(el);

      // Wire up close button
      document.getElementById('fomo-close-btn').addEventListener('click', () => {
        hideFomo();
        // Re-start cycle after hiding
        scheduleFomo();
      });
    }
    return el;
  }

  /* ── Show FOMO popup ── */
  function showFomo() {
    const el = getFomoEl();
    const data = fomoData[fomoIndex % fomoData.length];
    fomoIndex++;

    document.getElementById('fomo-msg-title').textContent =
      `Someone from ${data.city} just purchased "${data.product}"`;
    document.getElementById('fomo-msg-sub').textContent =
      `${data.name} — Verified Purchase ✅`;
    document.getElementById('fomo-msg-time').textContent = `⏱ ${data.time}`;

    el.classList.add('show');

    // Auto-hide after 5 seconds
    fomoTimeout = setTimeout(() => {
      hideFomo();
      scheduleFomo();
    }, 5000);
  }

  /* ── Hide FOMO popup ── */
  function hideFomo() {
    const el = document.getElementById('fomo-popup');
    if (el) el.classList.remove('show');
    if (fomoTimeout) clearTimeout(fomoTimeout);
  }

  /* ── Schedule next FOMO popup (random 8–12s) ── */
  function scheduleFomo() {
    const delay = Math.floor(Math.random() * 4000) + 8000; // 8000–12000ms
    setTimeout(showFomo, delay);
  }

  /* ── Init: first popup appears after 3 seconds ── */
  function initFomo() {
    // Shuffle data for variety
    fomoData.sort(() => Math.random() - 0.5);

    // First popup after 3 seconds
    setTimeout(() => {
      showFomo();
    }, 3000);
  }

  /* ── Start when DOM is ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFomo);
  } else {
    initFomo();
  }

})();
