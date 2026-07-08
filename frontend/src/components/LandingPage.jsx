export default function LandingPage({ onGetStarted, onSignIn }) {
  return (
    <section className="landing-page">
      <nav className="landing-nav" aria-label="Public navigation">
        <a className="brand-lockup" href="#top" aria-label="MoneyPilot home">
          <span className="brand-mark" aria-hidden="true" />
          <strong>MoneyPilot</strong>
        </a>

        <button className="nav-signin" type="button" onClick={onSignIn}>
          Sign in
        </button>
      </nav>

      <div className="landing-hero" id="top">
        <div className="hero-copy">
          <span className="hero-kicker">Personal finance dashboard</span>
          <h1>MoneyPilot</h1>
          <p>
            Track income and expenses, understand spending habits, and keep a clean money overview
            that helps you stay in better control of your personal finances.
          </p>

          <div className="hero-actions">
            <button className="hero-primary" type="button" onClick={onGetStarted}>
              Get started
            </button>

            <button className="hero-secondary" type="button" onClick={onSignIn}>
              Sign in
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <article className="float-card balance-card">
            <span>Balance</span>
            <strong>EUR 2,480</strong>
            <small>Clean monthly overview</small>
          </article>

          <article className="float-card expense-card">
            <span>Expenses</span>
            <strong>EUR 412</strong>
            <small>Track where money goes</small>
          </article>

          <article className="float-card habit-card">
            <span>Habits</span>
            <strong>Dining +12%</strong>
            <small>Understand spending patterns</small>
          </article>

          <article className="float-card category-card">
            <span>Categories</span>
            <div className="mini-bars">
              <i />
              <i />
              <i />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
