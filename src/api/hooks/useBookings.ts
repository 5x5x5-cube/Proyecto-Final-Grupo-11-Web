import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { CreateBookingRequest } from '@/modules/checkout/types';

export interface BookingData {
  id: string;
  code: string;
  userId: string;
  hotelId: string;
  roomId: string;
  holdId: string;
  paymentId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
}

interface BookingListResponse {
  data: BookingData[];
  total: number;
}

export function useBookings() {
  return useQuery<BookingData[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      const raw = await httpClient.get<BookingListResponse>('/bookings');
      return raw.data;
    },
  });
}

export function useBookingByPaymentId(paymentId: string) {
  return useQuery<BookingData | null>({
    queryKey: ['bookings', 'byPayment', paymentId],
    queryFn: async () => {
      const res = await httpClient.get<BookingListResponse>('/bookings', {
        params: { paymentId },
      });
      return res.data.length > 0 ? res.data[0] : null;
    },
    enabled: !!paymentId,
    refetchInterval: query => {
      if (query.state.data) return false;
      return 2000;
    },
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
