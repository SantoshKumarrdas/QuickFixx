// // controllers/paymentController.js
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { products } = req.body;

//     const lineItems = products.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.dish,
//           images: [item.imgdata],
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.qnty,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/success",
//       cancel_url: "http://localhost:5173/cancel",
//     });

//     res.status(200).json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe Error:", error.message);
//     res.status(500).json({ error: "Payment failed" });
//   }
// };
