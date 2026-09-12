/* ======================================
   chatbot.js — Bengali IT
   Floating Chat Widget
   Auto-opens 7 seconds after page load
   with welcome message + notification sound
====================================== */

(function () {
  'use strict';

  /* ── Create Audio Context for notification sound ── */
  function playNotificationSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Friendly two-tone chime
      function playTone(freq, startTime, duration, volume = 0.3) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      }

      const now = ctx.currentTime;
      playTone(880, now,        0.15, 0.25); // A5
      playTone(1100, now + 0.15, 0.2,  0.2);  // C#6
      playTone(1320, now + 0.3,  0.3,  0.18); // E6
    } catch (e) {
      // Audio not supported — silently fail
    }
  }

  /* ── Build chat widget HTML ── */
  function buildChatWidget() {
    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.setAttribute('aria-label', 'Chat Support Widget');
    widget.innerHTML = `
      <!-- Chat Box -->
      <div id="chat-box" role="dialog" aria-label="Chat with Bengali IT Support">
        <div class="chat-header">
          <div class="chat-avatar">🤖</div>
          <div class="chat-header-info">
            <div class="chat-name">Bengali IT Support</div>
            <div class="chat-status">
              <span class="chat-status-dot"></span> Online — Typically replies instantly
            </div>
          </div>
          <button id="chat-close" aria-label="Close chat"
            style="margin-left:auto;background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;opacity:0.7;transition:opacity 0.2s;"
            onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7">×</button>
        </div>
        <div class="chat-body" id="chat-messages">
          <!-- Messages injected by JS -->
        </div>
        <div class="chat-footer">
          <input
            id="chat-input"
            class="chat-input"
            type="text"
            placeholder="Type your message..."
            aria-label="Chat message input"
            maxlength="200"
          />
          <button class="chat-send" id="chat-send-btn" aria-label="Send message">
            ➤
          </button>
        </div>
      </div>

      <!-- Bubble Button -->
      <button id="chat-bubble" aria-label="Open chat support" aria-expanded="false">
        <span id="chat-notif-dot" class="chat-notif-dot" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    `;
    document.body.appendChild(widget);
  }

  /* ── Add a message to the chat ── */
  function addMessage(text, isUser = false, delay = 0) {
    setTimeout(() => {
      const messagesEl = document.getElementById('chat-messages');
      if (!messagesEl) return;

      const msgDiv = document.createElement('div');
      msgDiv.style.cssText = isUser
        ? 'display:flex;justify-content:flex-end;margin-bottom:0.75rem;'
        : 'display:flex;justify-content:flex-start;margin-bottom:0.75rem;';

      const bubble = document.createElement('div');
      bubble.className = 'chat-msg';
      bubble.textContent = text;
      if (isUser) {
        bubble.style.cssText = `
          background: linear-gradient(135deg, rgba(79,70,229,0.5), rgba(124,58,237,0.4));
          border: 1px solid rgba(79,70,229,0.4);
          border-radius: 14px 14px 4px 14px;
          color: #f1f5f9;
          max-width: 220px;
        `;
      }

      msgDiv.appendChild(bubble);
      messagesEl.appendChild(msgDiv);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, delay);
  }

  /* ── Open/close chat box ── */
  let chatOpen = false;
  let autoOpened = false;

  function openChat() {
    const chatBox = document.getElementById('chat-box');
    const bubble = document.getElementById('chat-bubble');
    const dot = document.getElementById('chat-notif-dot');

    if (!chatBox) return;
    chatBox.classList.add('open');
    chatOpen = true;
    if (bubble) bubble.setAttribute('aria-expanded', 'true');
    if (dot) dot.classList.remove('visible');

    // If first time opening, show welcome message
    if (!autoOpened) {
      autoOpened = true;
      const messagesEl = document.getElementById('chat-messages');
      if (messagesEl) messagesEl.innerHTML = '';

      addMessage('👋 Welcome to Bengali IT! Are you looking for digital products at the best price? Let us know!', false, 300);
      addMessage('💡 We offer 100% genuine software keys, instant delivery, and 24/7 support.', false, 1200);
      addMessage('🎁 First-time buyer? Ask us about exclusive discounts!', false, 2100);
    }
  }

  function closeChat() {
    const chatBox = document.getElementById('chat-box');
    const bubble = document.getElementById('chat-bubble');
    if (!chatBox) return;
    chatBox.classList.remove('open');
    chatOpen = false;
    if (bubble) bubble.setAttribute('aria-expanded', 'false');
  }

  function toggleChat() {
    chatOpen ? closeChat() : openChat();
  }

  /* ── Auto-reply logic ── */
  const autoReplies = [
    'Great question! Our team will get back to you shortly. 😊',
    'Thanks for reaching out! We offer instant delivery for all digital products.',
    'You can pay via bKash, Nagad, or Rocket — 100% secure! 🔒',
    'All our products come with a genuine license guarantee. ✅',
    'Need help choosing? Our best sellers are Windows 11 Pro & Canva Pro!',
  ];
  let replyIndex = 0;

  function handleSend() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const userMsg = input.value.trim();
    input.value = '';
    addMessage(userMsg, true);

    // Auto-reply after 1.2s
    setTimeout(() => {
      addMessage(autoReplies[replyIndex % autoReplies.length], false);
      replyIndex++;
    }, 1200);
  }

  /* ── Wire events after DOM ready ── */
  function initChatbot() {
    buildChatWidget();

    const bubble = document.getElementById('chat-bubble');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const dot = document.getElementById('chat-notif-dot');

    if (bubble) bubble.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    /* ── AUTO-TRIGGER: 7 seconds after page load ── */
    setTimeout(() => {
      if (!chatOpen) {
        // Show notification dot on bubble first
        if (dot) dot.classList.add('visible');
        playNotificationSound();

        // Open the chat after a brief 0.5s delay (dot visible first)
        setTimeout(() => {
          openChat();
        }, 500);
      }
    }, 7000);
  }

  /* ── Start ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
