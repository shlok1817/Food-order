<p align="center">
  <img src="https://img.shields.io/badge/FeastFlow-🍕-orange?style=for-the-badge" alt="FeastFlow Logo">
</p>

<h1 align="center">FeastFlow — Delicious Food, Delivered</h1>

<p align="center">
  A modern, fully client-side food ordering web application with restaurant browsing, real-time cart management, order tracking, user authentication, and dark/light theme support — all powered by vanilla HTML, CSS, and JavaScript.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/LocalStorage-Persistent-green?style=flat-square" alt="LocalStorage">
  <img src="https://img.shields.io/badge/No_Framework-Vanilla-blueviolet?style=flat-square" alt="Vanilla JS">
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Architecture & Modules](#-architecture--modules)
- [Data Model](#-data-model)
- [Promo Codes](#-promo-codes)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧾 Overview

**FeastFlow** is a feature-rich food ordering Single Page Application (SPA) that simulates the full food delivery experience — from discovering restaurants and browsing menus to placing orders, applying promo codes, and tracking delivery in real-time.

The entire app runs in the browser with **zero backend dependencies**. All user data, cart state, and order history are persisted using the browser's `localStorage`, making it instantly deployable as a static site on any hosting platform.

---

## 🚀 Live Demo

> **[🔗 View Live App →  https://food-order-seven-rho.vercel.app](https://food-order-seven-rho.vercel.app)**

Deployed on **Vercel** with automatic GitHub integration — every push to `main` triggers a new deployment.

---

## ✨ Features

### 🏠 Home Page
- **Hero banner** with call-to-action button for restaurant exploration
- **Browse by Cuisine** — clickable category cards (Pizza, Sushi, Burgers, Indian, Chinese, Mexican, Italian, Desserts, Healthy, Drinks)
- **Featured Restaurants** — top-rated restaurants showcased in card format
- **Popular Right Now** — trending dishes with badges and ratings
- **Customer Testimonials** — real-style reviews with star ratings

### 🍽️ Restaurant Discovery
- **Full restaurant listing** with image cards, ratings, delivery time, pricing, and tags
- **Cuisine filtering** — filter by Pizza, Sushi, Burgers, Indian, Chinese, Mexican, Healthy, Desserts
- **Sorting options** — sort by Rating, Fastest Delivery, Lowest Delivery Fee, or Name (A-Z)
- **Favorite restaurants** — tap ♥ to save favorites (requires login)

### 📖 Restaurant Detail & Menu
- **Restaurant banner** with full metadata (rating, reviews, delivery time, price range, delivery fee, description)
- **Categorized menu** with tab-style category filters
- **Menu item cards** with images, descriptions, prices, ratings, and quick-add buttons
- **Dish detail modal** with:
  - Size selection (e.g., Small, Medium, Large)
  - Extras/toppings with individual pricing
  - Quantity selector
  - Real-time price calculation

### 🛒 Shopping Cart
- **Slide-in cart panel** with overlay backdrop
- **Per-item detail** — shows selected size, toppings, and restaurant name
- **Quantity controls** — increment, decrement, or remove items
- **Promo code input** — apply discount codes for savings
- **Price breakdown** — subtotal, delivery fee, tax (8%), discount, and total
- **Proceed to checkout** button with running total

### 💳 Checkout
- **Delivery form** — name, phone, address, and delivery notes
- **Pre-filled fields** for logged-in users
- **Payment method selection** — Credit Card, Cash on Delivery, or Digital Wallet
- **Order summary sidebar** — full item list with pricing breakdown

### 📋 Order Management
- **Order confirmation page** — animated success card with order ID and estimated delivery
- **Real-time order tracking** — 4-step visual timeline:
  1. ✓ Order Confirmed
  2. 👨‍🍳 Preparing Your Food
  3. 🛵 On the Way
  4. 📦 Delivered
- **Simulated live tracking** — status advances automatically every 5 seconds for demo purposes
- **Order history** — full chronological list of past orders with status badges and totals

### 👤 User Authentication
- **Sign Up** — name, email, password (min 6 chars), and optional phone number
- **Log In** — email/password authentication
- **Profile page** — avatar, member-since date, recent orders, and favorite restaurants
- **Session persistence** — login state survives browser refresh via `localStorage`
- **Email validation** and password strength checks

### 🔍 Search
- **Global search bar** in the navbar
- **Instant search results** — debounced (200ms) live dropdown
- **Dual-category results** — searches across both restaurants (name, cuisine, tags) and menu items (name, category, description)
- **Click-to-navigate** — jump directly to a restaurant page or open a dish modal

### 🌗 Theme System
- **Dark mode** (default) and **Light mode** toggle
- **Persistent preference** — saved in `localStorage`
- **Full-app theming** — all components respect the active theme via CSS custom properties

### 📱 Responsive Design
- **Mobile-first** layout that adapts to all screen sizes
- **Hamburger menu** for mobile navigation
- **Touch-friendly** controls and tap targets

### 🔔 Toast Notifications
- **Non-intrusive toasts** for actions like "Item added to cart", "Login successful", etc.
- **Auto-dismiss** after 3 seconds with smooth slide animations

---

## 🛠️ Tech Stack

| Layer        | Technology               | Purpose                                        |
| ------------ | ------------------------ | ---------------------------------------------- |
| **Structure**| HTML5                    | Semantic page structure and SPA section layout  |
| **Styling**  | Vanilla CSS3             | Custom properties, animations, responsive grid  |
| **Logic**    | Vanilla JavaScript (ES6) | Modular IIFE-based architecture, DOM rendering  |
| **Storage**  | localStorage API         | Persistent cart, auth, orders, theme preference  |
| **Images**   | Unsplash                 | High-quality restaurant and food photography     |
| **Routing**  | Hash-based (`#page`)     | Client-side SPA navigation without a framework  |

> **No frameworks. No build tools. No npm dependencies.** Just open `index.html` and go.

---

## 📁 Project Structure

```
Food-order/
├── assets/                 # Static media assets
│   └── hero.png            # Hero section background image
│
├── css/
│   └── style.css           # Complete stylesheet (~27 KB)
│                           #   ├── CSS custom properties (theming)
│                           #   ├── Dark/Light mode variables
│                           #   ├── Layout and grid systems
│                           #   ├── Component styles (cards, modals, etc.)
│                           #   ├── Animations and transitions
│                           #   └── Responsive media queries
│
├── js/
│   ├── data.js             # Static data layer (~18 KB)
│   │                       #   ├── CATEGORIES (10 cuisine types)
│   │                       #   ├── RESTAURANTS (8 restaurants)
│   │                       #   ├── MENU_ITEMS (34 dishes with sizes/toppings)
│   │                       #   ├── PROMO_CODES (4 discount codes)
│   │                       #   └── TESTIMONIALS (4 customer reviews)
│   │
│   ├── app.js              # Main application controller (~22 KB)
│   │                       #   ├── Hash-based routing engine
│   │                       #   ├── Page renderers (home, restaurants, detail, etc.)
│   │                       #   ├── Dish modal with size/topping customization
│   │                       #   ├── Checkout form and order submission
│   │                       #   ├── Profile page rendering
│   │                       #   ├── Theme toggle logic
│   │                       #   └── App initialization
│   │
│   ├── cart.js             # Cart module (IIFE) (~6.8 KB)
│   │                       #   ├── Add/remove/update items
│   │                       #   ├── Price calculation (subtotal, tax, delivery, discount)
│   │                       #   ├── Promo code application
│   │                       #   ├── Slide-in panel rendering
│   │                       #   └── localStorage persistence
│   │
│   ├── auth.js             # Authentication module (IIFE) (~5.8 KB)
│   │                       #   ├── Sign up / Log in / Log out
│   │                       #   ├── Profile & favorites management
│   │                       #   ├── Address book CRUD
│   │                       #   ├── Input validation
│   │                       #   └── Nav UI state management
│   │
│   ├── orders.js           # Orders module (IIFE) (~5.1 KB)
│   │                       #   ├── Order placement with full cart snapshot
│   │                       #   ├── 4-step delivery status simulation
│   │                       #   ├── Tracking page renderer
│   │                       #   └── Order history list
│   │
│   └── search.js           # Search module (IIFE) (~3.9 KB)
│                           #   ├── Full-text search across restaurants & dishes
│                           #   ├── Multi-criteria restaurant filtering
│                           #   ├── Debounced live search dropdown
│                           #   └── Click-through navigation
│
├── .gitignore              # Git ignore rules
├── index.html              # Main entry point — single HTML file (~9.5 KB)
└── README.md               # This file
```

---

## 🏁 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- *(Optional)* A local HTTP server for development

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shlok1817/Food-order.git
   cd Food-order
   ```

2. **Open directly in a browser**
   ```bash
   # Simply double-click index.html, or:
   start index.html        # Windows
   open index.html          # macOS
   xdg-open index.html      # Linux
   ```

3. **Or serve locally** (recommended for full functionality)
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000

   # Using VS Code
   # Install "Live Server" extension → right-click index.html → "Open with Live Server"
   ```

4. **Visit** `http://localhost:8000` in your browser.

---

## 📖 Usage Guide

### Browsing & Ordering

1. **Explore** — Browse the home page for featured restaurants, popular dishes, and cuisine categories
2. **Filter** — Navigate to the Restaurants page and filter by cuisine or sort by rating/delivery time
3. **Select** — Click a restaurant card to view its full menu with categorized items
4. **Customize** — Click a dish to open the detail modal, choose size, add extras, set quantity
5. **Add to Cart** — Items appear in the slide-in cart panel with full customization details

### Cart & Checkout

1. **Review Cart** — Click the 🛒 icon to open the cart panel
2. **Apply Promo** — Enter a promo code (e.g., `WELCOME20`) for discounts
3. **Checkout** — Fill in delivery details and choose a payment method
4. **Confirm** — Place your order and receive a confirmation with order ID

### Order Tracking

1. **Track** — Click "Track Order" on the confirmation page
2. **Watch** — The 4-step timeline animates through: Confirmed → Preparing → On the Way → Delivered
3. **History** — View all past orders on the "My Orders" page

### Account Management

1. **Sign Up** — Create an account with name, email, and password
2. **Log In** — Access your profile, order history, and favorite restaurants
3. **Favorites** — Tap ♥ on any restaurant card to save it to your favorites
4. **Profile** — View your account details, recent orders, and saved restaurants

---

## 🏗️ Architecture & Modules

The application follows a **modular IIFE (Immediately Invoked Function Expression)** pattern for encapsulation, with each module exposing a public API:

```
┌─────────────────────────────────────────────────────┐
│                    index.html                       │
│              (Single Page Application)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │ data.js  │  │ cart.js  │  │ auth.js  │        │
│   │ (Static  │  │ (IIFE   │  │ (IIFE   │        │
│   │  Data)   │  │ Module) │  │ Module) │        │
│   └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │search.js │  │orders.js │  │  app.js  │        │
│   │ (IIFE   │  │ (IIFE   │  │ (Main   │        │
│   │ Module) │  │ Module) │  │ Controller│       │
│   └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
│   ┌─────────────────────────────────────────┐      │
│   │           localStorage                   │      │
│   │  ┌────────────┬───────────┬───────────┐ │      │
│   │  │feastflow_  │feastflow_ │feastflow_ │ │      │
│   │  │cart        │user       │orders     │ │      │
│   │  │feastflow_  │feastflow_ │           │ │      │
│   │  │theme       │users      │           │ │      │
│   │  └────────────┴───────────┴───────────┘ │      │
│   └─────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

### Module Descriptions

| Module       | Pattern    | Responsibilities                                                   |
| ------------ | ---------- | ------------------------------------------------------------------ |
| `data.js`    | Constants  | All static data: restaurants, menu items, categories, promo codes   |
| `cart.js`    | IIFE → `Cart`   | Cart state, price calculations, promo codes, panel UI         |
| `auth.js`    | IIFE → `Auth`   | User signup/login/logout, favorites, profile, validation      |
| `orders.js`  | IIFE → `Orders` | Order placement, tracking simulation, order history           |
| `search.js`  | IIFE → `Search` | Full-text search, restaurant filtering, debounced dropdown    |
| `app.js`     | Functions  | Routing, page rendering, modals, checkout, initialization          |

### Routing

FeastFlow uses **hash-based routing** (`window.location.hash`):

| Route                    | Page                     | Description                    |
| ------------------------ | ------------------------ | ------------------------------ |
| `#home`                  | Home                     | Landing page with featured content |
| `#restaurants`           | All Restaurants          | Filterable restaurant listing  |
| `#restaurant/{id}`       | Restaurant Detail        | Menu with categories           |
| `#checkout`              | Checkout                 | Delivery & payment form        |
| `#confirmation/{orderId}`| Confirmation             | Order success page             |
| `#tracking/{orderId}`    | Order Tracking           | Live delivery timeline         |
| `#orders`                | My Orders                | Order history list             |
| `#profile`               | Profile                  | User account dashboard         |

---

## 📊 Data Model

### Restaurants (8 total)

Each restaurant includes: `id`, `name`, `cuisine[]`, `rating`, `reviews`, `deliveryTime`, `deliveryFee`, `minOrder`, `priceRange`, `address`, `phone`, `hours`, `description`, `tags[]`, `image`, `logo`

| Restaurant         | Cuisine              | Rating | Delivery Time |
| ------------------ | -------------------- | ------ | ------------- |
| Pizza Paradise     | Pizza, Italian       | 4.8    | 25-35 min     |
| Sakura Sushi Bar   | Sushi, Japanese      | 4.9    | 30-40 min     |
| Burger Barn        | Burger, American     | 4.6    | 20-30 min     |
| Spice Route        | Indian               | 4.7    | 30-45 min     |
| Dragon Palace      | Chinese              | 4.5    | 25-35 min     |
| Taco Fiesta        | Mexican              | 4.4    | 20-30 min     |
| Green Bowl         | Healthy, Salad       | 4.7    | 15-25 min     |
| Sweet Surrender    | Dessert, Bakery      | 4.8    | 20-30 min     |

### Menu Items (34 total)

Each item includes: `id`, `restaurantId`, `name`, `category`, `price`, `rating`, `description`, `image`, `popular`, `sizes[]`, `toppings[]`

---

## 🏷️ Promo Codes

Try these promo codes in the cart:

| Code         | Discount                    | Minimum Order |
| ------------ | --------------------------- | ------------- |
| `WELCOME20`  | 20% off                     | $15           |
| `FEAST10`    | 10% off                     | $20           |
| `FREEDEL`    | Free delivery               | $25           |
| `SAVE5`      | $5 off                      | $15           |

---

## 🎨 Customization

### Theming

The app uses **CSS custom properties** for theming. Modify the CSS variables in `css/style.css` to customize colors, fonts, spacing, and more:

```css
[data-theme="dark"] {
  --bg-primary: #0f0f1a;
  --bg-secondary: #1a1a2e;
  --text-primary: #ffffff;
  --accent: #ff6b35;
  /* ... more variables */
}

[data-theme="light"] {
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a2e;
  --accent: #ff6b35;
  /* ... more variables */
}
```

### Adding Restaurants & Menu Items

Edit `js/data.js` to add new restaurants or dishes. Follow the existing object structure:

```javascript
// Add a new restaurant
RESTAURANTS.push({
  id: 'r9',
  name: 'Your Restaurant',
  cuisine: ['cuisine-type'],
  rating: 4.5,
  // ... see existing entries for full schema
});

// Add menu items for the restaurant
MENU_ITEMS.push({
  id: 'm35',
  restaurantId: 'r9',
  name: 'New Dish',
  category: 'Category',
  price: 12.99,
  // ... see existing entries for full schema
});
```

---

## 🌐 Browser Support

| Browser          | Support |
| ---------------- | ------- |
| Chrome 80+       | ✅      |
| Firefox 78+      | ✅      |
| Safari 14+       | ✅      |
| Edge 80+         | ✅      |
| Opera 67+        | ✅      |
| Mobile Chrome    | ✅      |
| Mobile Safari    | ✅      |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Guidelines

- Maintain the **zero-dependency** philosophy — no npm packages or frameworks
- Follow the existing **IIFE module pattern** for new modules
- Test on both **dark and light** themes
- Ensure **mobile responsiveness** for all new UI elements
- Add meaningful **comments** to new code

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and 🍕 by <a href="https://github.com/shlok1817">shlok1817</a>
</p>
