import i18n from '../i18n';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

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
    'Accept-Language': i18n.language === 'EN' ? 'en' : 'es',
    ...config?.headers,
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

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    if (
      response.status === 401 &&
      localStorage.getItem('auth_token') &&
      !path.startsWith('/auth/')
    ) {
      const isHotelAdmin = (() => {
        try {
          const u = JSON.parse(localStorage.getItem('auth_user') ?? '');
          return u?.role === 'hotel_admin';
        } catch {
          return false;
        }
      })();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_hotel_id');
      localStorage.removeItem('auth_hotel_info');
      window.location.href = isHotelAdmin ? '/hotel/login' : '/login';
      return undefined as T;
    }
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw { status: response.status, data: errorData, ...errorData };
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (config?.responseType === 'blob') {
    return response.blob() as Promise<T>;
  }

  return response.json();
}

export const httpClient = {
  get: <T>(path: string, config?: RequestConfig) => request<T>('GET', path, config),
  post: <T>(path: string, config?: RequestConfig) => request<T>('POST', path, config),
  put: <T>(path: string, config?: RequestConfig) => request<T>('PUT', path, config),
  patch: <T>(path: string, config?: RequestConfig) => request<T>('PATCH', path, config),
  delete: <T>(path: string, config?: RequestConfig) => request<T>('DELETE', path, config),
};
