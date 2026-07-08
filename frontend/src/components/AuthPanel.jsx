import { useEffect, useState } from 'react';

const emptyForms = {
  login: {
    email: '',
    password: '',
  },
  register: {
    name: '',
    email: '',
    password: '',
  },
};

export default function AuthPanel({ error, initialMode = 'login', isLoading, onLogin, onRegister }) {
  const [mode, setMode] = useState(initialMode);
  const [forms, setForms] = useState(emptyForms);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isRegister = mode === 'register';

  function updateField(field, value) {
    setForms((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [field]: value,
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isRegister) {
      onRegister(forms.register);
      return;
    }

    onLogin(forms.login);
  }

  return (
    <section className="auth-section" id="auth-panel" aria-label="Authentication">
      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Secure access</span>
          <h2>{isRegister ? 'Create your MoneyPilot account' : 'Welcome back to MoneyPilot'}</h2>
          <p>
            Keep your money overview close, track daily movement, and understand your spending habits
            with a clean personal finance dashboard.
          </p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
          <button
            className={!isRegister ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={!isRegister}
            onClick={() => setMode('login')}
          >
            Sign in
          </button>
          <button
            className={isRegister ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={isRegister}
            onClick={() => setMode('register')}
          >
            Create account
          </button>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <strong>Authentication failed</strong>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Name
              <input
                autoComplete="name"
                disabled={isLoading}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
                required
                value={forms.register.name}
              />
            </label>
          )}

          <label>
            Email
            <input
              autoComplete="email"
              disabled={isLoading}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={isRegister ? forms.register.email : forms.login.email}
            />
          </label>

          <label>
            Password
            <input
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              disabled={isLoading}
              minLength={6}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Minimum 6 characters"
              required
              type="password"
              value={isRegister ? forms.register.password : forms.login.password}
            />
          </label>

          <button className="auth-submit" disabled={isLoading} type="submit">
            {isLoading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
}
