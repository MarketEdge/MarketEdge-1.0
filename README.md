# MarketEdge 1.0

This repository contains a simple Node.js backend and a React + TypeScript frontend built with Vite. The backend exposes a minimal API for creating Stripe Checkout sessions, while the frontend demonstrates how to subscribe through Stripe.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)
- Stripe test keys for subscription checkout:
  - `STRIPE_SECRET_KEY`
  - `PRICE_ID`
  - `VITE_STRIPE_PUBLISHABLE_KEY`

## Installation

1. Clone the repository and move into the project directory:
   ```bash
   git clone <repository-url>
   cd MarketEdge-1.0
   ```
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## Running the application

### 1. Start the server

Set the required environment variables and start the Node.js server. The server listens on port `4242` by default.

```bash
export STRIPE_SECRET_KEY=sk_test_YOUR_KEY
export PRICE_ID=price_YOUR_PRICE
export VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
node server.js
```

### 2. Start the frontend

In a new terminal window, run the frontend development server:

```bash
cd frontend
npm run dev
```

Visit <http://localhost:5173> in your browser and click **Join Now** to open Stripe Checkout.

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
