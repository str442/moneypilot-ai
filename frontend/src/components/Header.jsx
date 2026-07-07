export default function Header() {
  return (
    <header className="app-header">
      <div>
        <span className="eyebrow">MVP Preview</span>
        <h1>MoneyPilot AI</h1>
        <p>Your smart personal finance dashboard</p>
      </div>
      <div className="pilot-orb" aria-hidden="true">
        <span>AI</span>
      </div>
    </header>
  );
}
