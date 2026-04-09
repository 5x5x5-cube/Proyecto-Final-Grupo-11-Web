import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { CreateBookingRequest } from '@/modules/checkout/types';

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => httpClient.get('/bookings'),
  });
}

export function useBookingDetail(bookingId: number) {
  return useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => httpClient.get(`/bookings/${bookingId}`),
  });
}

export function useBookingQR(bookingId: number) {
  return useQuery({
    queryKey: ['bookings', bookingId, 'qr'],
    queryFn: () => httpClient.get(`/bookings/${bookingId}/qr`),
  });
}

export function useBookingPayments(bookingId: number) {
  return useQuery({
    queryKey: ['bookings', bookingId, 'payments'],
    queryFn: () => httpClient.get(`/bookings/${bookingId}/payments`),
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: number) => httpClient.post(`/bookings/${bookingId}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBookingRequest) => httpClient.post('/bookings', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
