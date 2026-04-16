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

function normalizeBooking(raw: any): HotelBooking {
  const guestName: string = raw.guest ?? raw.guestName ?? '';
  const initials = guestName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0] ?? '')
    .join('')
    .toUpperCase();

  const checkIn = raw.checkIn;
  const checkOut = raw.checkOut;
  const nights =
    raw.nights ??
    (checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 1);

  return {
    id: raw.id,
    code: raw.code,
    guest: guestName,
    email: raw.email ?? raw.guestEmail ?? '',
    initials: initials || '?',
    avatarColor: raw.avatarColor ?? 'teal',
    room: raw.room ?? (raw.roomId ? raw.roomId.slice(0, 8) : '—'),
    roomType: raw.roomType ?? '',
    checkIn,
    checkOut,
    nights,
    status: raw.status,
    total: raw.total ?? String(raw.totalPrice ?? 0),
    totalCop: raw.totalCop ?? raw.totalPrice ?? 0,
    paymentMethod: raw.paymentMethod ?? '',
  };
}

export function useHotelBookings() {
  return useQuery({
    queryKey: ['hotelBookings'],
    queryFn: async () => {
      const raw = await httpClient.get<any>('/bookings/hotel');
      const list: any[] = raw.data ?? raw.reservations ?? [];
      return {
        data: list.map(normalizeBooking),
        summary: raw.summary,
      };
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
