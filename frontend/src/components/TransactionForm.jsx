import { useEffect, useState } from 'react';

const categories = [
  'FOOD',
  'TRANSPORT',
  'LEISURE',
  'SHOPPING',
  'EDUCATION',
  'HEALTH',
  'HOUSING',
  'SALARY',
  'SCHOLARSHIP',
  'OTHER',
];

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  description: '',
  amount: '',
  category: 'FOOD',
  type: 'EXPENSE',
  date: today,
};

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

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{editingTransaction ? 'Fine tune' : 'New move'}</span>
          <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
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

        <div className="form-pair">
          <label>
            Category
            <select value={form.category} onChange={(event) => updateField('category', event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Type
            <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </label>
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
