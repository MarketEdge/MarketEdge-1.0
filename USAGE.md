# Usage

This project includes a simple backend that integrates Stripe Checkout for one-time payments and subscriptions and a React frontend built with Vite. The backend can run locally with Express and is compatible with Vercel's serverless functions for deployment.

## Prerequisites
- Node.js and npm installed
- A Stripe account with test API keys

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root (see `.env.example`) and set your Stripe **test** keys:
  ```env
  STRIPE_SECRET_KEY=sk_test_your_key_here
  CLIENT_URL=http://localhost:5173
  VITE_API_BASE=http://localhost:4242
  ```
  Replace `sk_test_your_key_here` with the secret key from your Stripe dashboard. This key enables Checkout in test mode so you
  can enter test card numbers or use Apple Pay without charging real cards.

## Running locally
1. Start the backend server:
   ```bash
   npm run server
   ```
   The server listens on the port specified by `PORT` (defaults to 4242).
2. In a separate terminal, run the frontend:
   ```bash
   npm run dev
   ```
   The React app runs on http://localhost:5173.

## Testing the integration
1. Open http://localhost:5173 in your browser.
2. Select a product and plan.
3. Click **Pay** for a one-time payment or **Subscribe** for a recurring subscription.
4. You will be redirected to Stripe's hosted checkout page. Complete the flow using any Stripe test card (e.g. `4242 4242 4242 4242`).
   Apple Pay will appear automatically on supported devices and browsers.

The backend endpoints used are:
- `POST /api/create-checkout-session` – creates a Checkout Session for one-time payments.
- `POST /api/create-subscription-session` – creates a Checkout Session for subscriptions.

## Notes
- The server uses dynamic price data, so no predefined Stripe prices are required.
- Success and cancellation URLs are configured through the `CLIENT_URL` environment variable.
- For deployment on Vercel, add the same environment variables (`STRIPE_SECRET_KEY` and `CLIENT_URL`) in your Vercel project settings. Serverless functions reside in the `api/` directory and will be deployed automatically.
