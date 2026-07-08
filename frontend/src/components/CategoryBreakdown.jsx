import EmptyState from './EmptyState.jsx';

const labels = {
  FOOD: 'Food',
  TRANSPORT: 'Transport',
  LEISURE: 'Leisure',
  SHOPPING: 'Shopping',
  EDUCATION: 'Education',
  HEALTH: 'Health',
  HOUSING: 'Housing',
  SALARY: 'Salary',
  SCHOLARSHIP: 'Scholarship',
  OTHER: 'Other',
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

function percentClass(percent) {
  const roundedPercent = Math.max(0, Math.min(100, Math.round(percent / 5) * 5));
  return `progress-fill percent-${roundedPercent}`;
}

export default function CategoryBreakdown({ expensesByCategory = {} }) {
  const entries = Object.entries(expensesByCategory).filter(([, amount]) => Number(amount) > 0);
  const total = entries.reduce((sum, [, amount]) => sum + Number(amount), 0);

  return (
    <section className="panel category-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Spending map</span>
          <h2>Expenses by category</h2>
        </div>
        <strong>{currency.format(total)}</strong>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No expense categories yet"
          message="Expense categories will appear here as soon as you add spending."
        />
      ) : (
        <div className="category-list">
          {entries.map(([category, amount]) => {
            const percent = total ? Math.round((Number(amount) / total) * 100) : 0;
            return (
              <div className="category-row" key={category}>
                <div className="category-meta">
                  <span>{labels[category] || category}</span>
                  <strong>{currency.format(amount)}</strong>
                </div>
                <div
                  className="progress-track"
                  aria-label={`${labels[category] || category}: ${percent}%`}
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow={percent}
                  role="progressbar"
                >
                  <span className={percentClass(percent)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
