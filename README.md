# Bengali IT — Demo eCommerce Website

A high-converting Proof of Concept (PoC) eCommerce site for **Bengali IT**, a digital products company in Bangladesh.

## 🌐 Live Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — Hero, Products Grid, Stats, Trust Section |
| `product.html` | Single Product Page — Windows 11 Pro Key |
| `domain-hosting.html` | Domain & Hosting — DNS fix demo + plans |

## 🚀 Features

- ✅ **Sticky Navbar** with Services dropdown (Domain Hosting link)
- ⚡ **Flash Delivery Countdown Timer** (10-minute live timer)
- 📊 **Animated Stats Counters** (5,000+ customers, 100% genuine)
- 🔥 **FOMO Sales Popup** — rotating Bangladeshi city notifications every 8–12s
- 💬 **Auto-Triggered Chatbot** — opens 7 seconds after page load with welcome message + Web Audio notification sound
- 💳 **Local Payment Badges** — bKash, Nagad, Rocket on homepage, product page, and footer
- 📱 **Mobile-First** responsive design
- 🎨 **Premium UI** — Glassmorphism, gradients, micro-animations, Tailwind CSS + custom CSS

## 🛠️ Tech Stack

- **HTML5** — Semantic, SEO-optimised
- **Tailwind CSS** (CDN v3) — Utility-first styling
- **Vanilla JavaScript** — No frameworks, zero dependencies
- **Google Fonts** — Inter + Poppins

## 📂 File Structure

```
bengali-it-demo/
├── index.html               # Homepage (hero, products, stats, trust, footer)
├── product.html             # Single product page (Windows 11 Pro Key)
├── domain-hosting.html      # DNS error fix demo + hosting plans
│
└── assets/
    ├── css/
    │   └── style.css        # Custom CSS (animations, FOMO, chatbot, design tokens)
    ├── js/
    │   ├── main.js          # Navigation, counters, countdown, particles
    │   ├── fomo.js          # FOMO sales notification popup
    │   └── chatbot.js       # Auto-trigger chatbot widget
    └── images/
        ├── logo.png         # Bengali IT logo
        ├── payment-badge.png # bKash + Nagad + Rocket badge
        └── products/
            ├── windows11.jpg
            ├── office365.jpg
            └── canva-pro.jpg
```

## ▶️ Running Locally

Simply open `index.html` in any modern browser:

```bash
# Option 1: Double-click index.html
# Option 2: Use a local server (recommended to avoid CORS issues with images)
npx serve .
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

## 💳 Payment Methods Shown

- **bKash** — Pink, butterfly logo
- **Nagad** — Orange, Nagad logo  
- **Rocket** — Purple, DBBL Rocket logo

## 🎯 Conversion Features

1. **FOMO Popup**: Shows "Someone from Dhaka just purchased Windows 11 Pro Key" style notifications
2. **Countdown Timer**: Creates urgency with 10-minute flash delivery countdown
3. **Social Proof**: Star ratings, review counts, sold count (847 sold)
4. **Trust Badges**: SSL encrypted, genuine products, refund guarantee
5. **Chatbot**: Auto-opens at 7s with welcome message + notification sound

---

Made with ❤️ in Bangladesh · Bengali IT © 2024
