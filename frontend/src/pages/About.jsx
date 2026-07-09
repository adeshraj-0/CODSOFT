function About() {
  return (
    <section className="about">

      <div className="about-container">

        <span className="about-tag">ABOUT ORIGIN STORE</span>

        <h1>
          Building The Future Of
          <span> Online Shopping</span>
        </h1>

        <p className="about-text">
          Origin Store is a modern e-commerce platform focused on delivering
          premium products with exceptional customer experience. From fashion
          to electronics, we combine quality, affordability, and fast delivery
          to make online shopping simple and reliable.
        </p>

        <div className="stats">

          <div className="stat-card">
            <h2>50K+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat-card">
            <h2>10K+</h2>
            <p>Products</p>
          </div>

          <div className="stat-card">
            <h2>99%</h2>
            <p>Customer Satisfaction</p>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <p>Customer Support</p>
          </div>

        </div>

        <div className="features">

          <div className="feature-card">
            <div className="icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery across India.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>Trusted payment gateway with complete security.</p>
          </div>

          <div className="feature-card">
            <div className="icon">⭐</div>
            <h3>Premium Quality</h3>
            <p>Every product is verified before shipping.</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;