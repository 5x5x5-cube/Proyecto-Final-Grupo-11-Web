import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { httpClient } from '../httpClient';

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockClear();
  localStorage.clear();
});

describe('httpClient', () => {
  describe('GET requests', () => {
    it('sends GET request to the correct URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });

      await httpClient.get('/bookings');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/bookings'),
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('appends query params from config.params', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ data: [] }),
      });

      await httpClient.get('/bookings', { params: { userId: 'abc-123', status: 'pending' } });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain('userId=abc-123');
      expect(calledUrl).toContain('status=pending');
    });
  });

  describe('POST requests', () => {
    it('sends POST with JSON body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: 'new-booking', status: 'pending' }),
      });

      const result = await httpClient.post('/bookings', {
        body: { roomId: '123', hotelId: '456', checkIn: '2026-04-01', checkOut: '2026-04-03', guests: 2 },
      });

      expect(result).toEqual({ id: 'new-booking', status: 'pending' });
      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toHaveProperty('roomId', '123');
    });
  });

  describe('authentication', () => {
    it('attaches Authorization header when token exists', async () => {
      localStorage.setItem('auth_token', 'test-jwt-token');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await httpClient.get('/bookings');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Authorization']).toBe('Bearer test-jwt-token');
    });

    it('does not attach Authorization when no token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await httpClient.get('/bookings');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Authorization']).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('throws on non-ok responses with error data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        statusText: 'Conflict',
        json: async () => ({ code: 'ROOM_HELD', message: 'Room is being processed' }),
      });

      await expect(httpClient.post('/bookings', { body: {} })).rejects.toMatchObject({
        status: 409,
        code: 'ROOM_HELD',
      });
    });

    it('handles 204 No Content', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await httpClient.delete('/bookings/123');
      expect(result).toBeUndefined();
    });
  });

  describe('HTTP methods', () => {
    it.each([
      ['put', 'PUT'],
      ['patch', 'PATCH'],
      ['delete', 'DELETE'],
    ] as const)('httpClient.%s sends %s method', async (method, httpMethod) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await httpClient[method]('/test');

      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe(httpMethod);
    });
  });
});
