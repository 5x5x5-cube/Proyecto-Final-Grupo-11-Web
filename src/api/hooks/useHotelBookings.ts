import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export function useHotelBookings() {
  return useQuery({
    queryKey: ['hotelBookings'],
    queryFn: () => httpClient.get<{ reservations: unknown[]; summary: unknown }>('/bookings/hotel'),
  });
}

export function useHotelBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ['hotelBookings', bookingId],
    queryFn: () => httpClient.get(`/bookings/hotel/${bookingId}`),
  });
}

export function useConfirmBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) =>
      httpClient.post(`/bookings/hotel/${bookingId}/confirm`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelBookings'] });
    },
  });
}

export function useRejectBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) =>
      httpClient.post(`/bookings/hotel/${bookingId}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelBookings'] });
    },
  });
}
