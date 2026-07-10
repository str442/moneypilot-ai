import { useEffect, useState } from 'react';

const categories = [
  { value: 'FOOD', label: 'Food', icon: '🍽' },
  { value: 'TRANSPORT', label: 'Transport', icon: '↗' },
  { value: 'LEISURE', label: 'Leisure', icon: '◐' },
  { value: 'SHOPPING', label: 'Shopping', icon: '◇' },
  { value: 'EDUCATION', label: 'Education', icon: '✦' },
  { value: 'HEALTH', label: 'Health', icon: '✚' },
  { value: 'HOUSING', label: 'Housing', icon: '⌂' },
  { value: 'SALARY', label: 'Salary', icon: '+' },
  { value: 'SCHOLARSHIP', label: 'Scholarship', icon: '★' },
  { value: 'OTHER', label: 'Other', icon: '•' },
];

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  description: '',
  amount: '',
  category: 'FOOD',
  type: 'EXPENSE',
  date: today,
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

function getCategoryMeta(categoryValue) {
  return categories.find((category) => category.value === categoryValue) || categories[categories.length - 1];
}

export default function TransactionForm({ editingTransaction, isSaving, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description || '',
        amount: editingTransaction.amount ?? '',
        category: editingTransaction.category || 'FOOD',
        type: editingTransaction.type || 'EXPENSE',
        date: editingTransaction.date || today,
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTransaction]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
  }

  const selectedCategory = getCategoryMeta(form.category);
  const isIncome = form.type === 'INCOME';
  const previewAmount = Number(form.amount || 0);
  const previewDescription = form.description.trim() || 'Transaction preview';

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{editingTransaction ? 'Fine tune' : 'New move'}</span>
          <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="transaction-composer">
          <div className="form-fields">
            <fieldset className="segmented-field">
              <legend>Type</legend>
              <div className="type-segment" role="group" aria-label="Transaction type">
                <button
                  className={isIncome ? 'segment-button active income-segment' : 'segment-button'}
                  type="button"
                  onClick={() => updateField('type', 'INCOME')}
                >
                  <span>+</span>
                  Income
                </button>
                <button
                  className={!isIncome ? 'segment-button active expense-segment' : 'segment-button'}
                  type="button"
                  onClick={() => updateField('type', 'EXPENSE')}
                >
                  <span>-</span>
                  Expense
                </button>
              </div>
            </fieldset>

            <label>
              Description
              <input
                required
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                placeholder="Continente, salary, rent..."
              />
            </label>

            <div className="form-pair">
              <label>
                Amount
                <input
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={(event) => updateField('amount', event.target.value)}
                  placeholder="23.50"
                />
              </label>

              <label>
                Date
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField('date', event.target.value)}
                />
              </label>
            </div>

            <fieldset className="category-field">
              <legend>Category</legend>
              <div className="category-chip-grid">
                {categories.map((category) => (
                  <button
                    className={form.category === category.value ? 'category-chip active' : 'category-chip'}
                    key={category.value}
                    type="button"
                    onClick={() => updateField('category', category.value)}
                  >
                    <span aria-hidden="true">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className={`transaction-preview ${isIncome ? 'preview-income' : 'preview-expense'}`} aria-live="polite">
            <div className="preview-orbit" aria-hidden="true" />
            <div className="preview-topline">
              <span>{isIncome ? 'Incoming' : 'Outgoing'}</span>
              <strong>{form.date || today}</strong>
            </div>
            <div className="preview-icon" aria-hidden="true">
              {selectedCategory.icon}
            </div>
            <h3>{previewDescription}</h3>
            <p>{selectedCategory.label}</p>
            <strong className="preview-amount">
              {isIncome ? '+' : '-'}
              {currency.format(previewAmount)}
            </strong>
          </aside>
        </div>

        <div className="button-row">
          {editingTransaction && (
            <button className="secondary-button" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          <button className="primary-button" disabled={isSaving} type="submit">
            {isSaving ? 'Saving...' : editingTransaction ? 'Save changes' : 'Add transaction'}
          </button>
        </div>
      </form>
    </section>
  );
}
