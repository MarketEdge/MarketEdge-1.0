import './App.css'

declare const Stripe: (key: string) => {
  redirectToCheckout: (options: { sessionId: string }) => Promise<unknown>
}

export default function App() {
  const handleCheckout = async () => {
    const response = await fetch('http://localhost:4242/create-checkout-session', { method: 'POST' })
    const session = await response.json()
    const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    await stripe.redirectToCheckout({ sessionId: session.id })
  }

  return (
    <div className="product-page">
      <header className="hero">
        <h1>StockFlyer Global Equity Analysis</h1>
        <p>Your edge in the global markets</p>
        <button className="cta" onClick={handleCheckout}>Join Now</button>
      </header>
      <section className="pricing">
        <h2>$99 / month</h2>
        <p>Cancel anytime</p>
      </section>
      <section className="features">
        <div className="feature">
          <h3>Daily Market Reports</h3>
          <p>Comprehensive breakdown of global equity trends every trading day.</p>
        </div>
        <div className="feature">
          <h3>Real-time Alerts</h3>
          <p>Instant notifications on high-impact market events and trade setups.</p>
        </div>
        <div className="feature">
          <h3>Community Access</h3>
          <p>Join a private group of investors sharing strategies and insights.</p>
        </div>
      </section>
    </div>
  )
}
