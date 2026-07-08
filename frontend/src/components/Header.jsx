export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div>
        <span className="eyebrow">Live dashboard</span>
        <h1>MoneyPilot</h1>
        <p>Welcome back, {user?.name || 'there'}. Your money is clearer, calmer, and under control.</p>
      </div>

      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}
