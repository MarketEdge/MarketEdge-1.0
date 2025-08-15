import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe calls will fail.');
}
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' })
  : null;

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, productName } = req.body;
  const origin = req.headers.origin || clientUrl;
  if (!stripe) {
    res.status(500).json({ error: 'Stripe secret key not configured' });
    return;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: productName || 'Selected Plan' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error ? err.message : 'Unknown error') });
  }
});

app.post('/api/create-subscription-session', async (req, res) => {
  const { amount, productName, interval, interval_count } = req.body;
  const origin = req.headers.origin || clientUrl;
  if (!stripe) {
    res.status(500).json({ error: 'Stripe secret key not configured' });
    return;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: productName || 'Selected Plan' },
            unit_amount: amount,
            recurring: { interval, interval_count },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error ? err.message : 'Unknown error') });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
