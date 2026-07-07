const categories = [
  'ALL',
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

export const defaultFilters = {
  type: 'ALL',
  category: 'ALL',
  minAmount: '',
  startDate: '',
  endDate: '',
  sort: 'NONE',
};

export default function TransactionFilters({ filters, onChange, onApply, onClear }) {
  function updateField(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <section className="panel filters-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Focus mode</span>
          <h2>Filters</h2>
        </div>
      </div>

      <div className="filters-grid">
        <label>
          Type
          <select value={filters.type} onChange={(event) => updateField('type', event.target.value)}>
            <option value="ALL">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </label>

        <label>
          Category
          <select value={filters.category} onChange={(event) => updateField('category', event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'ALL' ? 'All' : category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Min amount
          <input
            type="number"
            min="0"
            step="0.01"
            value={filters.minAmount}
            onChange={(event) => updateField('minAmount', event.target.value)}
            placeholder="0.00"
          />
        </label>

        <label>
          Start date
          <input
            type="date"
            value={filters.startDate}
            onChange={(event) => updateField('startDate', event.target.value)}
          />
        </label>

        <label>
          End date
          <input
            type="date"
            value={filters.endDate}
            onChange={(event) => updateField('endDate', event.target.value)}
          />
        </label>

        <label>
          Sort
          <select value={filters.sort} onChange={(event) => updateField('sort', event.target.value)}>
            <option value="NONE">None</option>
            <option value="dateDesc">Most recent first</option>
            <option value="dateAsc">Oldest first</option>
            <option value="amountDesc">Highest amount</option>
            <option value="amountAsc">Lowest amount</option>
          </select>
        </label>
      </div>

      <div className="button-row">
        <button className="secondary-button" type="button" onClick={onClear}>
          Clear filters
        </button>
        <button className="primary-button" type="button" onClick={onApply}>
          Apply filters
        </button>
      </div>
    </section>
  );
}
