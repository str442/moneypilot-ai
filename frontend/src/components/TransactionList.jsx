import EmptyState from './EmptyState.jsx';

const categoryMeta = {
  FOOD: { label: 'Food', icon: '🍽' },
  TRANSPORT: { label: 'Transport', icon: '↗' },
  LEISURE: { label: 'Leisure', icon: '◐' },
  SHOPPING: { label: 'Shopping', icon: '◇' },
  EDUCATION: { label: 'Education', icon: '✦' },
  HEALTH: { label: 'Health', icon: '✚' },
  HOUSING: { label: 'Housing', icon: '⌂' },
  SALARY: { label: 'Salary', icon: '+' },
  SCHOLARSHIP: { label: 'Scholarship', icon: '★' },
  OTHER: { label: 'Other', icon: '•' },
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

export default function TransactionList({ transactions, onEdit, onDelete, isDeleting }) {
  return (
    <section className="panel transactions-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Money trail</span>
          <h2>Transactions</h2>
        </div>
        <strong>{transactions.length}</strong>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          message="Add your first transaction to start tracking your money."
        />
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === 'INCOME';
            const meta = categoryMeta[transaction.category] || categoryMeta.OTHER;
            return (
              <article className={`transaction-card ${isIncome ? 'transaction-income' : 'transaction-expense'}`} key={transaction.id}>
                <div className="transaction-main">
                  <span className="transaction-icon" aria-hidden="true">
                    {meta.icon}
                  </span>
                  <div>
                    <h3>{transaction.description}</h3>
                    <p>
                      <span className={`type-pill ${isIncome ? 'income-pill' : 'expense-pill'}`}>
                        {isIncome ? 'Income' : 'Expense'}
                      </span>
                      <span>{meta.label}</span>
                      <span>{transaction.date}</span>
                    </p>
                  </div>
                </div>

                <div className="transaction-actions">
                  <strong className={isIncome ? 'amount-income' : 'amount-expense'}>
                    {isIncome ? '+' : '-'}
                    {currency.format(transaction.amount)}
                  </strong>
                  <div>
                    <button className="ghost-button" type="button" onClick={() => onEdit(transaction)}>
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      disabled={isDeleting === transaction.id}
                      type="button"
                      onClick={() => onDelete(transaction)}
                    >
                      {isDeleting === transaction.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
