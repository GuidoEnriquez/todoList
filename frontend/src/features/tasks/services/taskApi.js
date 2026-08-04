const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Verificá que el backend esté iniciado.');
  }

  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();
  let payload;

  try {
    payload = responseText ? JSON.parse(responseText) : null;
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida.');
  }

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'No se pudo completar la operación.');
  }

  return payload?.data ?? null;
}

export function getTasks() {
  return request('/tasks');
}

export function getTask(id) {
  return request(`/tasks/${encodeURIComponent(id)}`);
}

export function createTask(task) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export function updateTask(id, task) {
  return request(`/tasks/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
}

export function deleteTask(id) {
  return request(`/tasks/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
