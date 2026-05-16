const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.tonusoft.com/api/v1';

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (body as any)?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return body as ApiResponse<T>;
}

function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('authToken');
}

async function request<T>(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });

  return parseResponse<T>(response);
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: any) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body?: any) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
