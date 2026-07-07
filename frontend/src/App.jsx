import { useCallback, useEffect, useState } from 'react';
import {
  createTransaction,
  deleteTransaction,
  getDashboard,
  getTransactions,
  updateTransaction,
} from './api/moneypilotApi.js';
import CategoryBreakdown from './components/CategoryBreakdown.jsx';
import DashboardCards from './components/DashboardCards.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Header from './components/Header.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import TransactionFilters, { defaultFilters } from './components/TransactionFilters.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';

function friendlyError(error) {
  const message = error?.message || 'Unexpected error.';

  if (message.toLowerCase().includes('user not found')) {
    return 'User not found. Create user 1 in the backend or adjust CURRENT_USER_ID when users are available.';
  }

  if (message.toLowerCase().includes('failed to fetch')) {
    return 'Unable to reach the backend at http://localhost:8080. Check that Spring Boot is running and that CORS allows the frontend origin.';
  }

  return message;
}

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadData = useCallback(async () => {
    setError('');
    try {
      const [dashboardData, transactionData] = await Promise.all([
        getDashboard(),
        getTransactions(appliedFilters),
      ]);
      setDashboard(dashboardData);
      setTransactions(Array.isArray(transactionData) ? transactionData : []);
    } catch (caughtError) {
      setError(friendlyError(caughtError));
    } finally {
      setIsInitialLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSubmit(transaction) {
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, transaction);
        setNotice('Transaction updated successfully.');
      } else {
        await createTransaction(transaction);
        setNotice('Transaction added successfully.');
      }
      setEditingTransaction(null);
      await loadData();
    } catch (caughtError) {
      setError(friendlyError(caughtError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(transaction) {
    const confirmed = window.confirm(`Delete "${transaction.description}"?`);
    if (!confirmed) return;

    setIsDeleting(transaction.id);
    setError('');
    setNotice('');

    try {
      await deleteTransaction(transaction.id);
      setNotice('Transaction deleted successfully.');
      if (editingTransaction?.id === transaction.id) {
        setEditingTransaction(null);
      }
      await loadData();
    } catch (caughtError) {
      setError(friendlyError(caughtError));
    } finally {
      setIsDeleting(null);
    }
  }

  function applyFilters() {
    setAppliedFilters(filters);
    setIsInitialLoading(true);
  }

  function clearFilters() {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setIsInitialLoading(true);
  }

  return (
    <main className="app-shell">
      <Header />

      <ErrorMessage message={error} />
      {notice && <div className="success-message">{notice}</div>}

      {isInitialLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DashboardCards dashboard={dashboard} />

          <div className="main-layout">
            <div className="left-column">
              <CategoryBreakdown expensesByCategory={dashboard?.expensesByCategory || {}} />
              <TransactionFilters
                filters={filters}
                onApply={applyFilters}
                onChange={setFilters}
                onClear={clearFilters}
              />
            </div>

            <div className="right-column">
              <TransactionForm
                editingTransaction={editingTransaction}
                isSaving={isSaving}
                onCancelEdit={() => setEditingTransaction(null)}
                onSubmit={handleSubmit}
              />
              <TransactionList
                isDeleting={isDeleting}
                onDelete={handleDelete}
                onEdit={setEditingTransaction}
                transactions={transactions}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
