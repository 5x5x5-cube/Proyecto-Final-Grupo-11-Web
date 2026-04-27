import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { CreateBookingRequest } from '@/modules/checkout/types';

export interface BookingData {
  id: string;
  code: string;
  userId: string;
  hotelId: string;
  roomId: string;
  holdId?: string;
  paymentId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'rejected' | 'past';
  totalPrice: number;
  currency: string;
  createdAt?: string;
  hotelName?: string;
  roomName?: string;
  location?: string;
  nights?: number;
  guestName?: string;
  timeline?: Array<{ event: string; timestamp: string; description: string }>;
  priceBreakdown?: {
    pricePerNight: number;
    nights: number;
    basePrice: number;
    vat: number;
    serviceFee: number;
    totalPrice: number;
    currency: string;
  } | null;
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

export function useBookingDetail(bookingId: string) {
  return useQuery<BookingData>({
    queryKey: ['bookings', bookingId],
    queryFn: () => httpClient.get<BookingData>(`/bookings/${bookingId}`),
    enabled: !!bookingId,
  });
}

export function useBookingQR(bookingId: string) {
  return useQuery({
    queryKey: ['bookings', bookingId, 'qr'],
    queryFn: () => httpClient.get(`/bookings/${bookingId}/qr`),
    enabled: !!bookingId,
  });
}

export function useBookingPayments(bookingId: string) {
  return useQuery({
    queryKey: ['bookings', bookingId, 'payments'],
    queryFn: () => httpClient.get(`/bookings/${bookingId}/payments`),
    enabled: !!bookingId,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => httpClient.post(`/bookings/${bookingId}/cancel`),
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
