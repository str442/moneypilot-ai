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
      <section className="dashboard-grid" aria-label="Financial dashboard summary">
        <EmptyState
          title="Dashboard waiting for data"
          message="Add your first transaction to unlock your MoneyPilot overview."
        />
      </section>
    );
  }

  const netMovement = Number(dashboard.totalIncome || 0) - Number(dashboard.totalExpenses || 0);

  const cards = [
    {
      label: 'Balance',
      value: formatMoney(dashboard.balance),
      detail:
        Number(dashboard.balance || 0) >= 0
          ? 'Available after your tracked activity'
          : 'Outflow is ahead right now',
      tone: 'balance',
      icon: '◎',
    },
    {
      label: 'Total Income',
      value: formatMoney(dashboard.totalIncome),
      detail: `${dashboard.incomeCount || 0} income records`,
      tone: 'income',
      icon: '+',
    },
    {
      label: 'Total Expenses',
      value: formatMoney(dashboard.totalExpenses),
      detail: `${dashboard.expenseCount || 0} expense records`,
      tone: 'expense',
      icon: '-',
    },
    {
      label: 'Net Movement',
      value: formatMoney(netMovement),
      detail: netMovement >= 0 ? 'Income is leading expenses' : 'Expenses are leading income',
      tone: netMovement >= 0 ? 'average' : 'highest',
      icon: '↕',
    },
  ];

  return (
    <section className="dashboard-grid" aria-label="Financial dashboard summary">
      {cards.map((card, index) => (
        <article className={`metric-card ${card.tone}`} key={card.label}>
          <div className="metric-icon" aria-hidden="true">
            {card.icon}
          </div>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.detail}</small>
          <i className={`metric-sheen sheen-delay-${index}`} aria-hidden="true" />
        </article>
      ))}
    </section>
  );
}
