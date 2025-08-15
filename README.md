# MarketEdge 1.0

This repository contains a simple Node.js backend and a React + TypeScript frontend built with Vite. The backend exposes a minimal API for creating Stripe Checkout sessions, while the frontend demonstrates how to subscribe through Stripe.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)
- Stripe test keys for subscription checkout:
  - `STRIPE_SECRET_KEY`
  - `PRICE_ID`
  - `VITE_STRIPE_PUBLISHABLE_KEY`


## Installation & Starting the Service

1. **Clone the repository and move into the project directory:**
   ```bash
   git clone <repository-url>
   cd MarketEdge-1.0
   ```

2. **Install dependencies at both the root and frontend:**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. **Set the required environment variables:**
   - `STRIPE_SECRET_KEY` (your Stripe secret key)
   - `PRICE_ID` (your Stripe Price ID)
   - `VITE_STRIPE_PUBLISHABLE_KEY` (your Stripe publishable key)

   You can set these in your shell or in a `.env` file at the root.

4. **Start both backend and frontend together:**
   ```bash
   npm run dev
   ```
   This uses `concurrently` to run the backend (`node server.js`) and the Vite frontend (`npm --prefix frontend run dev`) in parallel.

5. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser. Click **Join Now** to test frontend–backend connectivity (it should POST to `http://localhost:4242/create-checkout-session`).

---


## Building for production

To create an optimized production build of the frontend:

```bash
cd frontend
npm run build
```

The compiled assets will be placed in `frontend/dist`. You can preview the production build locally with:

```bash
npm run preview
```

## Environment variables

- `PORT` – optional; overrides the server port (defaults to `4242`).
- `STRIPE_SECRET_KEY` – your Stripe secret key for server-side requests.
- `PRICE_ID` – the Stripe Price ID for the subscription.
- `VITE_STRIPE_PUBLISHABLE_KEY` – publishable key for the frontend.

## License

This project is licensed under the MIT License.
