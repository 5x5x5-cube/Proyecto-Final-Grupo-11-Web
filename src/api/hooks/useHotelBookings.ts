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
    queryFn: async () => {
      const raw = await httpClient.get<{
        data: Array<{
          id: string;
          code: string;
          guestName?: string;
          guestEmail?: string;
          roomId: string;
          checkIn: string;
          checkOut: string;
          guests: number;
          status: string;
          totalPrice: number;
          currency: string;
        }>;
        summary: { total: number; confirmed: number; pending: number; cancelled: number };
      }>('/bookings/hotel');

      const reservations: HotelBooking[] = (raw.data ?? []).map(b => {
        const name = b.guestName ?? 'Guest';
        const initials = name
          .split(' ')
          .map(w => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();
        const nights = Math.max(
          1,
          Math.round((new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000)
        );
        return {
          id: b.id,
          code: b.code,
          guest: name,
          email: b.guestEmail ?? '',
          initials,
          avatarColor: 'teal',
          room: `Room`,
          roomType: 'Standard',
          checkIn: b.checkIn,
          checkOut: b.checkOut,
          nights,
          status: b.status,
          total: `${b.currency} ${b.totalPrice}`,
          totalCop: b.totalPrice,
          paymentMethod: 'card',
        };
      });

      return { reservations, summary: raw.summary };
    },
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
