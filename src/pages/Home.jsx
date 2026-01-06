function Home({setPage}) {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🗳️ Secure Online Voting System</h1>
          <p>
            A modern, transparent, and secure platform for institutional
            elections using Voter ID, Phone Number, and OTP authentication.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setPage("register")}>
  Register
</button>

<button className="secondary-btn" onClick={() => setPage("login")}>
  Login
</button>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose Our System?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>OTP based authentication ensures voter authenticity.</p>
          </div>

          <div className="feature-card">
            <h3>🗳️ One Person, One Vote</h3>
            <p>Each voter can vote only once, preventing fraud.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Results</h3>
            <p>Automatic counting provides instant and accurate results.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Secure Online Voting System</p>
      </footer>
    </div>
  );
}

export default Home;
