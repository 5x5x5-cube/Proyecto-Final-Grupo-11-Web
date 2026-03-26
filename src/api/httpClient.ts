import { mockHandlers } from './mockHandlers';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  params?: Record<string, unknown>;
  body?: unknown;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api/v1';

interface MockHandler {
  method: Method;
  pattern: RegExp;
  handler: (
    config: RequestConfig | undefined,
    match: RegExpMatchArray
  ) => { status: number; data: unknown };
}

function findMockHandler(
  method: Method,
  path: string
): { handler: MockHandler['handler']; match: RegExpMatchArray } | null {
  for (const route of mockHandlers as MockHandler[]) {
    if (route.method !== method) continue;
    const match = path.match(route.pattern);
    if (match) return { handler: route.handler, match };
  }
  return null;
}

function buildUrl(path: string, params?: Record<string, unknown>): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

async function request<T>(method: Method, path: string, config?: RequestConfig): Promise<T> {
  const url = buildUrl(path, config?.params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (config?.body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // If gateway returns 501 (not implemented), fall back to mock
    if (response.status === 501) {
      return fallbackToMock<T>(method, path, config);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw { status: response.status, data: errorData, ...errorData };
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    // Network error (gateway not running) — fall back to mock
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return fallbackToMock<T>(method, path, config);
    }
    throw error;
  }
}

async function fallbackToMock<T>(method: Method, path: string, config?: RequestConfig): Promise<T> {
  const found = findMockHandler(method, path);
  if (!found) throw new Error(`No mock handler for ${method} ${path}`);
  await new Promise(r => setTimeout(r, 300 + Math.random() * 200));
  const result = found.handler(config, found.match);
  if (result.status >= 400) throw result;
  return result.data as T;
}

export const httpClient = {
  get: <T>(path: string, config?: RequestConfig) => request<T>('GET', path, config),
  post: <T>(path: string, config?: RequestConfig) => request<T>('POST', path, config),
  put: <T>(path: string, config?: RequestConfig) => request<T>('PUT', path, config),
  patch: <T>(path: string, config?: RequestConfig) => request<T>('PATCH', path, config),
  delete: <T>(path: string, config?: RequestConfig) => request<T>('DELETE', path, config),
};
