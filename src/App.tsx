import React, { useState } from 'react';

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedProduct, setSelectedProduct] = useState('essential');
  const [darkMode, setDarkMode] = useState(false);

  const products = [
    {
      id: 'essential',
      name: 'SF-Essential',
      price: 149,
      description: 'Perfect for beginners',
      popular: false
    },
    {
      id: 'ultimate',
      name: 'SF-Ultimate',
      price: 249,
      description: 'Most popular choice',
      popular: true
    },
    {
      id: 'futures',
      name: 'SF-Futures',
      price: 399,
      description: 'Advanced futures trading',
      popular: false
    },
    {
      id: 'technofunda',
      name: 'STOCKFLYER SF-Technofunda',
      price: 799,
      description: 'Professional grade analysis',
      popular: false
    }
  ];

  const subscriptionOptions = [
    { id: 'monthly', label: 'Monthly', price: 149, savings: 0, initialFee: 9.99 },
    { id: '3months', label: '3 Months', price: 420, savings: 6, initialFee: 0 },
    { id: '1year', label: '1 Year', price: 1800, savings: 20, initialFee: 0 }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Srini Ch',
      rating: 5,
      date: '6 days ago',
      comment: "I've been following Pavan for a while now, and I'm truly impressed with his work. Many of the stock suggestions he's provided have given me very good profits, and his approach shows both skill and patience. He takes the time to answer every question from his subscribers, no matter how basic or detailed...",
      writtenAfter: 'Written 1 month after purchase'
    },
    {
      id: 2,
      name: 'Thrinethra Tejaswi Balasundarappa',
      rating: 5,
      date: '20 days ago',
      comment: "Though my subscription was short duration, but I got very good profits. Would like to come back and upgrade it to ultimate plan as I liked the approach and planning which really helped",
      writtenAfter: 'Written 1 month after purchase'
    },
    {
      id: 3,
      name: 'Dilip Allani',
      rating: 5,
      date: '23 days ago',
      comment: "I recently subscribed to this service and have been thoroughly impressed by its exceptional accuracy, with price targets often met to the dot. The analysis is both expert and actionable, greatly increasing my confidence in investment decisions. Regular webinar sessions provide deeper market insights...",
      writtenAfter: 'Written 2 months after purchase'
    },
    {
      id: 4,
      name: 'Lakshminarayana Vudum',
      rating: 5,
      date: '25 days ago',
      comment: "I'm really happy to be part of this community. In trading, profits and losses are part of the game, but what makes the difference is the support and learning you get along the way. What I value most here isn't just the gains—though I've seen some great results—but the way losses are managed...",
      writtenAfter: 'Written 2 months after purchase'
    }
  ];

  const getSelectedProductPrice = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return 149;
    
    if (selectedPlan === 'monthly') return product.price;
    if (selectedPlan === '3months') return Math.round(product.price * 3 * 0.94); // 6% off
    if (selectedPlan === '1year') return Math.round(product.price * 12 * 0.8); // 20% off
    
    return product.price;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-btn">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <header className="hero">
        <h1>StockFlyer US Equity Analysis</h1>
        <p>Deep-dive insights into US stock markets right at your fingertips.</p>
        <button className="cta">Join Now</button>
      </header>
      
      <section className="features">
        <div className="feature-card">
          <h3>Real-Time Screener</h3>
          <p>Filter NYSE & NASDAQ stocks using live market data and technical indicators.</p>
        </div>
        <div className="feature-card">
          <h3>AI Market Sentiment</h3>
          <p>Natural-language summaries of US market trends and sector analysis.</p>
        </div>
        <div className="feature-card">
          <h3>Model Portfolios</h3>
          <p>Curated US stock lists built by expert analysts for different timeframes.</p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="pricing-header">
          <div className="product-info">
            <div className="product-title">
              <span className="icon">🧠</span>
              <h2>SF-Essential</h2>
            </div>
            <h1>Comprehensive US Equities Insights</h1>
            <div className="rating">
              <div className="stars">★★★★★</div>
              <span>5.00 (18) Trading</span>
            </div>
          </div>
        </div>

        <div className="pricing-content">
          <div className="products-grid">
            <h3>Products</h3>
            <div className="product-cards">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`product-card ${selectedProduct === product.id ? 'selected' : ''} ${product.popular ? 'popular' : ''}`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  {product.popular && <span className="popular-badge">Most Popular</span>}
                  <h4>{product.name}</h4>
                  <p className="product-price">${product.price.toLocaleString()}.00 / month</p>
                  <p className="product-description">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="subscription-panel">
            <h3>Subscription</h3>
            <div className="subscription-options">
              {subscriptionOptions.map((option) => (
                <label key={option.id} className={`subscription-option ${selectedPlan === option.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="subscription"
                    value={option.id}
                    checked={selectedPlan === option.id}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  />
                  <div className="option-content">
                    <div className="option-header">
                      <span className="option-label">{option.label}</span>
                      {option.savings > 0 && <span className="savings-badge">{option.savings}% off</span>}
                    </div>
                    <div className="option-price">
                      {option.id === 'monthly' ? (
                        <>
                          ${option.price.toLocaleString()}.00 / month
                          {option.initialFee > 0 && <span className="initial-fee">+ ${option.initialFee} initial fee</span>}
                        </>
                      ) : (
                        `$${option.price.toLocaleString()}.00 for ${option.label.toLowerCase()}`
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="total-price">
              <span className="total-label">Total:</span>
              <span className="total-amount">${getSelectedProductPrice().toLocaleString()}.00</span>
            </div>

            <div className="payment-buttons">
              <button className="payment-btn google-pay">
                <span className="google-pay-icon">G</span>
                Pay
              </button>
              <button className="payment-btn subscribe">
                Subscribe
              </button>
            </div>

            <div className="members-info">
              <span className="members-icon">👥</span>
              <span>Join 88 members</span>
            </div>
          </div>
        </div>

        <div className="product-description-full">
          <p>Dive into US Equities with discussions on short-term trades, swing trades, and long-term investments. Access sentiment data and analyze micro and macro market factors specific to US markets.</p>
        </div>

        <div className="features-list">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>US Equities (NYSE & NASDAQ) for Short, Medium and Long term Trading/Investing.</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>In-depth analysis of US micro and macro market factors.</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>2 way mode of communication for Questions.</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Free monthly insider zoom webinars on US markets</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <div className="overall-rating">
            <div className="rating-stars">★★★★★</div>
            <div className="rating-text">
              <span className="rating-number">5 out of 5</span>
              <span className="rating-count">18 total reviews</span>
            </div>
          </div>
        </div>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-meta">
                <span className="written-after">{review.writtenAfter}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-creator">
        <div className="creator-card">
          <div className="creator-header">
            <div className="creator-avatar">S</div>
            <div className="creator-info">
              <h3>StockFlyer</h3>
              <p className="creator-handle">@pavanequity • Joined Sep 2024</p>
            </div>
          </div>
          <p className="creator-bio">
            I've dedicated my career to demystifying global equity markets. With a passion for the US market, I aim to empower investors with the knowledge to diversify and succeed.
          </p>
        </div>
      </section>

      <section className="affiliates-section">
        <div className="affiliates-card">
          <div className="affiliates-header">
            <div className="affiliates-avatar">SA</div>
            <h3>Become an affiliate</h3>
          </div>
          <div className="affiliates-content">
            <h4>STOCKFLYER- US Equity Analysis</h4>
            <div className="reward-info">
              <span className="reward-percentage">5% reward</span>
            </div>
            <p className="affiliates-description">
              Earn money by bringing customers to STOCKFLYER- US Equity Analysis. Every time a customer purchases using your link, you'll earn a commission.
            </p>
            <button className="affiliate-btn">Become an Affiliate</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 StockFlyer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
