import { useCallback, useEffect, useState } from 'react';
import {
  ApiError,
  createTransaction,
  deleteTransaction,
  getDashboard,
  getTransactions,
  loginUser,
  registerUser,
  updateTransaction,
} from './api/moneypilotApi.js';
import AuthPanel from './components/AuthPanel.jsx';
import CategoryBreakdown from './components/CategoryBreakdown.jsx';
import DashboardBackground from './components/DashboardBackground.jsx';
import DashboardCards from './components/DashboardCards.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import TransactionFilters, { defaultFilters } from './components/TransactionFilters.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';

const SESSION_KEY = 'moneypilot_session';

function readStoredSession() {
  try {
    const rawSession = localStorage.getItem(SESSION_KEY);
    if (!rawSession) return null;

    const session = JSON.parse(rawSession);
    if (!session?.token || !session?.userId) return null;

    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function friendlyError(error) {
  const message = error?.message || 'Unexpected error.';

  if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
    return 'Your session expired. Please sign in again.';
  }

  if (message.toLowerCase().includes('failed to fetch')) {
    return 'Unable to reach MoneyPilot services. Please try again in a moment.';
  }

  return message;
}

function normalizeSession(authResponse) {
  const user = authResponse?.user || {};
  const token = authResponse?.token || authResponse?.accessToken || authResponse?.jwt;
  const userId = authResponse?.userId || authResponse?.id || user?.id;

  return {
    token,
    userId,
    name: authResponse?.name || user?.name || authResponse?.email || user?.email || 'there',
    email: authResponse?.email || user?.email || '',
  };
}

export default function App() {
  const [session, setSession] = useState(() => readStoredSession());
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(Boolean(session));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setShowAuth(true);
    setAuthMode('login');
    setDashboard(null);
    setTransactions([]);
    setEditingTransaction(null);
    setError('');
    setNotice('');
    setIsInitialLoading(false);
  }, []);

  function storeSession(authResponse) {
    const nextSession = normalizeSession(authResponse);

    if (!nextSession.token || !nextSession.userId) {
      throw new ApiError('The API response did not include a valid session.', 0);
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    setShowAuth(false);
    setAuthError('');
    setError('');
    setNotice('');
    setIsInitialLoading(true);
  }

  function openAuth(mode) {
    setAuthMode(mode);
    setShowAuth(true);
    setAuthError('');

    window.setTimeout(() => {
      document.getElementById('auth-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  }

  async function handleAuth(action, data) {
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = action === 'register' ? await registerUser(data) : await loginUser(data);
      storeSession(response);
    } catch (caughtError) {
      setAuthError(friendlyError(caughtError));
    } finally {
      setIsAuthenticating(false);
    }
  }

  const loadData = useCallback(async () => {
    if (!session?.token || !session?.userId) {
      setIsInitialLoading(false);
      return;
    }

    setError('');

    try {
      const [dashboardData, transactionData] = await Promise.all([
        getDashboard(session.userId, session.token),
        getTransactions(session.userId, session.token, appliedFilters),
      ]);

      setDashboard(dashboardData);
      setTransactions(Array.isArray(transactionData) ? transactionData : []);
    } catch (caughtError) {
      setError(friendlyError(caughtError));

      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearSession();
        openAuth('login');
      }
    } finally {
      setIsInitialLoading(false);
    }
  }, [appliedFilters, clearSession, session?.token, session?.userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSubmit(transaction) {
    if (!session?.token || !session?.userId) return;

    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      if (editingTransaction) {
        await updateTransaction(session.userId, session.token, editingTransaction.id, transaction);
        setNotice('Transaction updated successfully.');
      } else {
        await createTransaction(session.userId, session.token, transaction);
        setNotice('Transaction added successfully.');
      }

      setEditingTransaction(null);
      await loadData();
    } catch (caughtError) {
      setError(friendlyError(caughtError));

      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearSession();
        openAuth('login');
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(transaction) {
    if (!session?.token || !session?.userId) return;

    const confirmed = window.confirm(`Delete "${transaction.description}"?`);
    if (!confirmed) return;

    setIsDeleting(transaction.id);
    setError('');
    setNotice('');

    try {
      await deleteTransaction(session.userId, session.token, transaction.id);
      setNotice('Transaction deleted successfully.');

      if (editingTransaction?.id === transaction.id) {
        setEditingTransaction(null);
      }

      await loadData();
    } catch (caughtError) {
      setError(friendlyError(caughtError));

      if (caughtError instanceof ApiError && (caughtError.status === 401 || caughtError.status === 403)) {
        clearSession();
        openAuth('login');
      }
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

  if (!session) {
    return (
      <main className="public-shell">
        <LandingPage onGetStarted={() => openAuth('register')} onSignIn={() => openAuth('login')} />

        {showAuth && (
          <AuthPanel
            error={authError}
            initialMode={authMode}
            isLoading={isAuthenticating}
            onLogin={(data) => handleAuth('login', data)}
            onRegister={(data) => handleAuth('register', data)}
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <DashboardBackground />
      <Header user={session} onLogout={clearSession} />

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
