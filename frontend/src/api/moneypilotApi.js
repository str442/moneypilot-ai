export const API_BASE_URL = 'http://localhost:8080';
export const CURRENT_USER_ID = 1;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data
        : data?.message || data?.error || 'Something went wrong while talking to the API.';
    throw new Error(message);
  }

  return data;
}

function buildQuery(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'ALL' && value !== 'NONE') {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `?${query}` : '';
}

export function getDashboard(userId = CURRENT_USER_ID) {
  return request(`/api/users/${userId}/dashboard`);
}

export function getTransactions(filters, userId = CURRENT_USER_ID) {
  return request(`/api/users/${userId}/transactions${buildQuery(filters)}`);
}

export function createTransaction(transaction, userId = CURRENT_USER_ID) {
  return request(`/api/users/${userId}/transactions`, {
    method: 'POST',
    body: JSON.stringify(transaction),
  });
}

export function updateTransaction(transactionId, transaction, userId = CURRENT_USER_ID) {
  return request(`/api/users/${userId}/transactions/${transactionId}`, {
    method: 'PUT',
    body: JSON.stringify(transaction),
  });
}

export function deleteTransaction(transactionId, userId = CURRENT_USER_ID) {
  return request(`/api/users/${userId}/transactions/${transactionId}`, {
    method: 'DELETE',
  });
}
