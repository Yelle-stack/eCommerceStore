import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

// Load variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Public address of the site (set BASE_URL in .env locally and on Vercel)
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

if (!process.env.stripe_key) {
    console.error("Missing stripe_key in the .env file");
    process.exit(1);
}

const stripeGateway = Stripe(process.env.stripe_key);

// Products: the prices are defined HERE, never taken from the browser.
// The names must match the product titles in index.html.
const PRODUCTS = {
    "Short Sleeve Shirt": { price: 607, image: "images/shortsleeve.png" },
    "Dark Blue T-Shirt": { price: 60, image: "images/darkblue.png" },
    "Crew Neck T-Shirt": { price: 55, image: "images/crewneck.png" },
    "Beige Jacket": { price: 1050, image: "images/beigejack.png" },
    "Dark Jacket": { price: 1060, image: "images/darkjack.png" },
    "Short Sleeve Wool": { price: 670, image: "images/woolshort.png" },
    "Black Top": { price: 740, image: "images/blacktop.png" },
    "Baseball Cap": { price: 120, image: "images/baseballcap.png" },
};

app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});
app.get("/cart", (req, res) => {
    res.sendFile("cart.html", { root: "public" });
});

// Stripe
app.post("/stripe-checkout", async (req, res) => {
    const items = req.body.items;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Your cart is empty" });
    }

    const lineItems = [];

    for (const item of items) {
        const quantity = Number(item.quantity);

        // Only the name and the quantity come from the browser
        if (
            !Object.hasOwn(PRODUCTS, item.name) ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 20
        ) {
            return res.status(400).json({ error: "Invalid item in the cart" });
        }

        const product = PRODUCTS[item.name];
        const productData = { name: item.name };

        // Stripe can only load images from a public https address
        if (BASE_URL.startsWith("https://")) {
            productData.images = [`${BASE_URL}/${product.image}`];
        }

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: productData,
                unit_amount: Math.round(product.price * 100),
            },
            quantity,
        });
    }

    try {
        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${BASE_URL}/success.html`,
            cancel_url: `${BASE_URL}/cancel.html`,
            line_items: lineItems,
            billing_address_collection: "required",
        });
        res.json({ url: session.url });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Could not start the payment" });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});