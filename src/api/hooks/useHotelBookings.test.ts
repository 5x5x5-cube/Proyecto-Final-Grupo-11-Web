import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useHotelBookings, useHotelBookingDetail } from './useHotelBookings';

vi.mock('@/api/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import { httpClient } from '@/api/httpClient';

const mockGet = httpClient.get as ReturnType<typeof vi.fn>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useHotelBookings', () => {
  const backendResponse = {
    data: [
      {
        id: '1',
        code: 'BK-001',
        guestName: 'Maria Lopez',
        guestEmail: 'maria@email.com',
        roomId: 'room-1',
        checkIn: '2026-05-20',
        checkOut: '2026-05-23',
        guests: 2,
        status: 'pending',
        totalPrice: 297500,
        currency: 'COP',
      },
      {
        id: '2',
        code: 'BK-002',
        guestName: 'Carlos Rodriguez',
        guestEmail: 'carlos@email.com',
        roomId: 'room-2',
        checkIn: '2026-05-10',
        checkOut: '2026-05-12',
        guests: 1,
        status: 'confirmed',
        totalPrice: 500000,
        currency: 'COP',
      },
    ],
    summary: { total: 2, confirmed: 1, pending: 1, cancelled: 0 },
  };

  it('maps backend response to frontend HotelBooking shape', async () => {
    mockGet.mockResolvedValueOnce(backendResponse);

    const { result } = renderHook(() => useHotelBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { reservations, summary } = result.current.data!;

    expect(reservations).toHaveLength(2);
    expect(summary).toEqual(backendResponse.summary);

    expect(reservations[0]).toMatchObject({
      id: '1',
      code: 'BK-001',
      guest: 'Maria Lopez',
      email: 'maria@email.com',
      initials: 'ML',
      status: 'pending',
      totalCop: 297500,
      total: 'COP 297500',
      nights: 3,
    });

    expect(reservations[1]).toMatchObject({
      id: '2',
      code: 'BK-002',
      guest: 'Carlos Rodriguez',
      initials: 'CR',
      status: 'confirmed',
      nights: 2,
    });
  });

  it('defaults guest name to "Guest" when guestName is missing', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        {
          id: '3',
          code: 'BK-003',
          roomId: 'room-1',
          checkIn: '2026-06-01',
          checkOut: '2026-06-03',
          guests: 1,
          status: 'pending',
          totalPrice: 100000,
          currency: 'COP',
        },
      ],
      summary: { total: 1, confirmed: 0, pending: 1, cancelled: 0 },
    });

    const { result } = renderHook(() => useHotelBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const booking = result.current.data!.reservations[0];
    expect(booking.guest).toBe('Guest');
    expect(booking.initials).toBe('G');
    expect(booking.email).toBe('');
  });

  it('calculates nights as minimum 1', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        {
          id: '4',
          code: 'BK-004',
          guestName: 'Ana',
          roomId: 'room-1',
          checkIn: '2026-06-01',
          checkOut: '2026-06-01',
          guests: 1,
          status: 'pending',
          totalPrice: 50000,
          currency: 'COP',
        },
      ],
      summary: { total: 1, confirmed: 0, pending: 1, cancelled: 0 },
    });

    const { result } = renderHook(() => useHotelBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.reservations[0].nights).toBe(1);
  });

  it('handles empty data array', async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
      summary: { total: 0, confirmed: 0, pending: 0, cancelled: 0 },
    });

    const { result } = renderHook(() => useHotelBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.reservations).toEqual([]);
    expect(result.current.data!.summary.total).toBe(0);
  });

  it('calls the correct API endpoint', async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
      summary: { total: 0, confirmed: 0, pending: 0, cancelled: 0 },
    });

    const { result } = renderHook(() => useHotelBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGet).toHaveBeenCalledWith('/bookings/hotel');
  });
});

describe('useHotelBookingDetail', () => {
  it('fetches and maps a specific booking by ID', async () => {
    const mockRaw = {
      id: '1',
      code: 'BK-001',
      status: 'pending',
      guestName: 'Maria Lopez',
      guestEmail: 'maria@email.com',
      guestPhone: '+57 310 000 0000',
      checkIn: '2026-05-20',
      checkOut: '2026-05-23',
      guests: 2,
      totalPrice: 595000,
      currency: 'COP',
      createdAt: '2026-04-01T10:00:00Z',
      priceBreakdown: null,
      timeline: [],
    };
    mockGet.mockResolvedValueOnce(mockRaw);

    const { result } = renderHook(() => useHotelBookingDetail('1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      id: '1',
      code: 'BK-001',
      status: 'pending',
      guestName: 'Maria Lopez',
      guestEmail: 'maria@email.com',
      guestPhone: '+57 310 000 0000',
      checkIn: '2026-05-20',
      checkOut: '2026-05-23',
      nights: 3,
      guests: 2,
      totalPrice: 595000,
      currency: 'COP',
      priceBreakdown: null,
      timeline: [],
    });
    expect(mockGet).toHaveBeenCalledWith('/bookings/hotel/1');
  });
});
