import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useBookings, useBookingDetail, useCreateBooking, useCancelBooking } from './useBookings';

// Mock the httpClient module
vi.mock('@/api/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { httpClient } from '@/api/httpClient';

const mockGet = httpClient.get as ReturnType<typeof vi.fn>;
const mockPost = httpClient.post as ReturnType<typeof vi.fn>;

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

describe('useBookings', () => {
  it('fetches bookings list', async () => {
    const mockData = {
      data: [
        { id: '1', code: 'BK-001', status: 'pending', totalPrice: 595000 },
        { id: '2', code: 'BK-002', status: 'confirmed', totalPrice: 892500 },
      ],
      total: 2,
      page: 1,
      limit: 10,
    };
    mockGet.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useBookings(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData.data);
    expect(mockGet).toHaveBeenCalledWith('/bookings');
  });
});

describe('useBookingDetail', () => {
  it('fetches a specific booking by ID', async () => {
    const mockBooking = {
      id: '1',
      code: 'BK-8072EF8D',
      status: 'pending',
      totalPrice: 595000,
      priceBreakdown: { basePrice: 500000, vat: 95000, totalPrice: 595000 },
    };
    mockGet.mockResolvedValueOnce(mockBooking);

    const { result } = renderHook(() => useBookingDetail(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockBooking);
    expect(mockGet).toHaveBeenCalledWith('/bookings/1');
  });
});

describe('useCreateBooking', () => {
  it('posts booking data and invalidates queries on success', async () => {
    const newBooking = {
      id: '3',
      code: 'BK-NEW123',
      status: 'pending',
      totalPrice: 2023000,
    };
    mockPost.mockResolvedValueOnce(newBooking);

    const { result } = renderHook(() => useCreateBooking(), { wrapper: createWrapper() });

    result.current.mutate({
      roomId: 'room-1',
      hotelId: 'hotel-1',
      checkIn: '2026-04-10',
      checkOut: '2026-04-12',
      guests: 2,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(newBooking);
    expect(mockPost).toHaveBeenCalledWith('/bookings', {
      body: expect.objectContaining({ roomId: 'room-1', guests: 2 }),
    });
  });
});

describe('useCancelBooking', () => {
  it('posts cancel request', async () => {
    mockPost.mockResolvedValueOnce({ status: 'cancelled' });

    const { result } = renderHook(() => useCancelBooking(), { wrapper: createWrapper() });

    result.current.mutate(42);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockPost).toHaveBeenCalledWith('/bookings/42/cancel');
  });
});
