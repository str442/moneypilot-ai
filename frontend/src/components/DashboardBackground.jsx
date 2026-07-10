export default function DashboardBackground() {
  return (
    <div className="dashboard-background" aria-hidden="true">
      <div className="background-grid" />
      <div className="background-grid background-grid-secondary" />
      <div className="background-glow background-glow-one" />
      <div className="background-glow background-glow-two" />
      <div className="background-glow background-glow-three" />
      <div className="background-glow background-glow-four" />
      <div className="trajectory-field">
        <span className="trajectory-line trajectory-line-one" />
        <span className="trajectory-line trajectory-line-two" />
        <span className="trajectory-line trajectory-line-three" />
      </div>
      <div className="particle-field">
        <span className="particle particle-one" />
        <span className="particle particle-two" />
        <span className="particle particle-three" />
        <span className="particle particle-four" />
        <span className="particle particle-five" />
        <span className="particle particle-six" />
        <span className="particle particle-seven" />
        <span className="particle particle-eight" />
      </div>
      <div className="radial-light radial-light-one" />
      <div className="radial-light radial-light-two" />
      <div className="background-noise" />
    </div>
  );
}
