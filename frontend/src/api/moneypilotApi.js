export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request(path, options = {}) {
  const headers = {
    ...(options.headers || {}),
  };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data || 'Something went wrong while talking to the API.'
        : data?.message || data?.error || 'Something went wrong while talking to the API.';

    throw new ApiError(message, response.status);
  }

  return data;
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

function normalizeFilterValue(value) {
  if (value === 'ALL' || value === 'NONE' || value === undefined || value === null || value === '') {
    return '';
  }

  return String(value);
}

export function buildQuery(filters = {}) {
  const params = new URLSearchParams();
  const allowedFilters = ['type', 'category', 'minAmount', 'startDate', 'endDate', 'sort'];

  allowedFilters.forEach((key) => {
    const value = normalizeFilterValue(filters[key]);
    if (value) params.set(key, value);
  });

  const query = params.toString();
  return query ? `?${query}` : '';
}

export function registerUser(data) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function loginUser(data) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getDashboard(userId, token) {
  return request(`/api/users/${userId}/dashboard`, {
    headers: authHeaders(token),
  });
}

export function getTransactions(userId, token, filters = {}) {
  return request(`/api/users/${userId}/transactions${buildQuery(filters)}`, {
    headers: authHeaders(token),
  });
}

export function createTransaction(userId, token, transaction) {
  return request(`/api/users/${userId}/transactions`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(transaction),
  });
}

export function updateTransaction(userId, token, transactionId, transaction) {
  return request(`/api/users/${userId}/transactions/${transactionId}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(transaction),
  });
}

export function deleteTransaction(userId, token, transactionId) {
  return request(`/api/users/${userId}/transactions/${transactionId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}
