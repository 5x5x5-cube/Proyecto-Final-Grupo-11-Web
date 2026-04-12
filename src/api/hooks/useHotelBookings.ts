import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export interface HotelBooking {
  id: string;
  code: string;
  guest: string;
  email: string;
  initials: string;
  avatarColor: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
  total: string;
  totalCop: number;
  paymentMethod: string;
}

export function useHotelBookings() {
  return useQuery({
    queryKey: ['hotelBookings'],
    queryFn: () =>
      httpClient.get<{
        reservations: HotelBooking[];
        summary: { total: number; confirmed: number; pending: number; cancelled: number };
      }>('/bookings/hotel'),
  });
}

export function useHotelBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ['hotelBookings', bookingId],
    queryFn: () => httpClient.get<HotelBooking>(`/bookings/hotel/${bookingId}`),
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
