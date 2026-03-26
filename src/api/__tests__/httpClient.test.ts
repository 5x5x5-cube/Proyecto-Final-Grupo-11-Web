import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient } from '../httpClient';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

vi.mock('../mockHandlers', () => ({
  mockHandlers: [
    {
      method: 'GET',
      pattern: /^\/search\/hotels$/,
      handler: () => ({ status: 200, data: { hotels: ['mock-hotel'] } }),
    },
  ],
}));

beforeEach(() => {
  mockFetch.mockClear();
  localStorage.clear();
});

describe('httpClient', () => {
  describe('GET requests', () => {
    it('sends GET to the correct URL with /api/v1 prefix', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });

      await httpClient.get('/bookings');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/bookings'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('appends query params', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });

      await httpClient.get('/bookings', { params: { userId: 'abc', status: 'pending' } });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain('userId=abc');
      expect(calledUrl).toContain('status=pending');
    });
  });

  describe('POST requests', () => {
    it('sends POST with JSON body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: 'new', status: 'pending' }),
      });

      const result = await httpClient.post('/bookings', {
        body: { roomId: '123', guests: 2 },
      });

      expect(result).toEqual({ id: 'new', status: 'pending' });
      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toHaveProperty('roomId', '123');
    });
  });

  describe('authentication', () => {
    it('attaches Authorization header when token exists', async () => {
      localStorage.setItem('auth_token', 'jwt-123');
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });

      await httpClient.get('/bookings');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Authorization']).toBe('Bearer jwt-123');
    });

    it('omits Authorization when no token', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });

      await httpClient.get('/bookings');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Authorization']).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('throws with status and error data on non-ok response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        statusText: 'Conflict',
        json: async () => ({ code: 'ROOM_HELD', message: 'Room is held' }),
      });

      await expect(httpClient.post('/bookings', { body: {} })).rejects.toMatchObject({
        status: 409,
        code: 'ROOM_HELD',
      });
    });

    it('handles 204 No Content', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 204 });

      const result = await httpClient.delete('/bookings/123');
      expect(result).toBeUndefined();
    });
  });

  describe('501 fallback to mock', () => {
    it('falls back to mock handler when gateway returns 501', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 501, statusText: 'Not Implemented' });

      const result = await httpClient.get<{ hotels: string[] }>('/search/hotels');
      expect(result).toEqual({ hotels: ['mock-hotel'] });
    });

    it('throws when 501 and no mock handler exists', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 501, statusText: 'Not Implemented' });

      await expect(httpClient.get('/unknown/path')).rejects.toThrow('No mock handler');
    });
  });

  describe('network error fallback', () => {
    it('falls back to mock on TypeError (gateway not running)', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      const result = await httpClient.get<{ hotels: string[] }>('/search/hotels');
      expect(result).toEqual({ hotels: ['mock-hotel'] });
    });

    it('rethrows non-network errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server Error',
        json: async () => ({ message: 'Server error' }),
      });

      await expect(httpClient.get('/bookings')).rejects.toMatchObject({ status: 500 });
    });
  });

  describe('HTTP methods', () => {
    it.each([
      ['put', 'PUT'],
      ['patch', 'PATCH'],
      ['delete', 'DELETE'],
    ] as const)('httpClient.%s sends %s method', async (method, httpMethod) => {
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });

      await httpClient[method]('/test');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe(httpMethod);
    });
  });
});
