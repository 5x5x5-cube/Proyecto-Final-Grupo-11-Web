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

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, action }: { bookingId: string; action: 'confirm' | 'reject' }) =>
      httpClient.post(`/bookings/hotel/${bookingId}/status`, {
        body: { action },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotelBookings'] });
    },
  });
}
