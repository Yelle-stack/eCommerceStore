# 🛍️ Luvarte — Full-Stack E-Commerce Store

A clothing store built with a vanilla JavaScript frontend and a Node.js / Express backend, with payments handled by **Stripe Checkout** (test mode).

🌐 **[Live demo](https://e-commerce-store-pi-liard.vercel.app)**

![Luvarte store](portfolio.png)

> This is a demo project. Stripe runs in **test mode**: no real payment is possible.

---

## ✨ Features

**Shop**
- Product catalog with category filters (Shirts & Tops, Outwear, Caps, All Products)
- "Add to cart" with toast notifications

**Cart**
- Add, remove and change quantities
- Live total and item counter in the header
- Cart saved in the browser (`localStorage`)

**Checkout**
- Stripe Checkout payment page
- The server **recalculates the prices itself**: the browser only sends product names and quantities, so prices cannot be tampered with
- Success and cancel pages

**Design**
- Responsive layout with a mobile menu
- Custom favicon

## 🛠️ Tech Stack

| Frontend | Backend | Payments & hosting |
|---|---|---|
| HTML5 | Node.js | Stripe Checkout |
| CSS3 (Grid, Flexbox, variables) | Express 5 | Vercel |
| JavaScript (ES6+) | dotenv | |

## 🔄 How the checkout works

1. The cart is stored in the browser.
2. On **Checkout**, the browser sends the product names and quantities to `POST /stripe-checkout`.
3. The server looks up each price in its own product list and creates a Stripe session.
4. The customer is redirected to Stripe, then back to the success or cancel page.

## 🚀 Run it locally

**1. Clone the project and install the dependencies**

```bash
git clone https://github.com/Yelle-stack/eCommerceStore.git
cd eCommerceStore
npm install
```

**2. Create a `.env` file** in the project root with your Stripe **test** secret key (from the Stripe dashboard, in test mode):

```
STRIPE_SECRET_KEY=sk_test_your_key_here
BASE_URL=http://localhost:3000
```

Never commit this file: it is already listed in `.gitignore`.

**3. Start the server**

```bash
npm run dev
```

Then open http://localhost:3000.

**4. Pay with a Stripe test card**

| Field | Value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry date | any future date |
| CVC / postal code | any value |

## 📁 Project structure

```
├── public/
│   ├── css/style.css
│   ├── js/            # main.js (cart), cart.js (checkout), menu.js
│   ├── images/
│   ├── index.html
│   ├── cart.html
│   ├── success.html
│   ├── cancel.html
│   └── favicon.svg / favicon.png
├── server.js          # Express server and Stripe route
├── package.json
└── .env               # not committed
```

## ☁️ Deployment

The project is deployed on **Vercel**. Add two environment variables in the project settings:

- `STRIPE_SECRET_KEY`: your Stripe secret key
- `BASE_URL`: the public address of the site, without a trailing slash

## 🔮 Possible improvements

- Store the products in a database (MongoDB) instead of the server file
- Stripe webhook to save paid orders
- Shipping address collection and order history
- Euro currency and legal pages for a real shop

## 🎨 Credits

Product images are used for demonstration purposes only. Add the credits for your images and fonts here (Antonio font from Google Fonts, icons from Remix Icon).

## 👩🏻‍💻 Author

**Jelena Zeko** – Full-Stack Developer
GitHub: [@Yelle-stack](https://github.com/Yelle-stack)
