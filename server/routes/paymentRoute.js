const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const line_items = products.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.imgdata],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qnty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",

      // ✅ Add this to show shipping address fields
      shipping_address_collection: {
        allowed_countries: ["IN"], // or add "US", "CA", etc.
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
