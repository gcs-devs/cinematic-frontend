const API_BASE_URL = 'http://localhost:5000';

export async function fetchHistory() {
  const response = await fetch(`${API_BASE_URL}/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return response.json();
}

export async function submitQuery(user, movie) {
  const response = await fetch(`${API_BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, movie }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit query');
  }
  return response.json();
}

