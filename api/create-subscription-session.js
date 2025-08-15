import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' })
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!stripe) {
    res.status(500).json({ error: 'Stripe secret key not configured' });
    return;
  }
  const { amount, productName, interval, interval_count } = req.body || {};
  const origin = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
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
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
