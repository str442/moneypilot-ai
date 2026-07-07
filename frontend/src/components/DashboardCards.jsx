import EmptyState from './EmptyState.jsx';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

function formatMoney(value) {
  return currency.format(Number(value || 0));
}

export default function DashboardCards({ dashboard }) {
  if (!dashboard) {
    return (
      <EmptyState
        title="Dashboard waiting for data"
        message="Add your first transaction to unlock your MoneyPilot overview."
      />
    );
  }

  const cards = [
    {
      label: 'Total Income',
      value: formatMoney(dashboard.totalIncome),
      detail: `${dashboard.incomeCount || 0} income records`,
      tone: 'income',
    },
    {
      label: 'Total Expenses',
      value: formatMoney(dashboard.totalExpenses),
      detail: `${dashboard.expenseCount || 0} expense records`,
      tone: 'expense',
    },
    {
      label: 'Balance',
      value: formatMoney(dashboard.balance),
      detail: Number(dashboard.balance || 0) >= 0 ? 'You are in the green' : 'Needs attention',
      tone: 'balance',
    },
    {
      label: 'Average Expense',
      value: formatMoney(dashboard.averageExpense),
      detail: 'Typical outgoing transaction',
      tone: 'average',
    },
    {
      label: 'Highest Expense',
      value: dashboard.highestExpense ? formatMoney(dashboard.highestExpense.amount) : formatMoney(0),
      detail: dashboard.highestExpense?.description || 'No expense recorded yet',
      tone: 'highest',
    },
  ];

  return (
    <section className="dashboard-grid" aria-label="Financial dashboard summary">
      {cards.map((card) => (
        <article className={`metric-card ${card.tone}`} key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.detail}</small>
        </article>
      ))}
    </section>
  );
}
