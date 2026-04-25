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

export interface HotelBookingDetail {
  id: string;
  code: string;
  status: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  currency: string;
  createdAt: string;
  priceBreakdown: {
    pricePerNight: number;
    nights: number;
    basePrice: number;
    vat: number;
    serviceFee: number;
    totalPrice: number;
    currency: string;
  } | null;
  timeline: Array<{ event: string; timestamp: string; description: string }>;
}

export interface HotelBookingFilters {
  status?: string;
  code?: string;
  checkInFrom?: string;
  checkInTo?: string;
  page?: number;
  limit?: number;
}

interface BackendBooking {
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
}

interface BookingSummary {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

interface BackendBookingResponse {
  data: BackendBooking[];
  summary: BookingSummary;
}

export function useHotelBookings(filters: HotelBookingFilters = {}) {
  return useQuery({
    queryKey: ['hotelBookings', filters],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters.page) params.page = String(filters.page);
      if (filters.limit) params.limit = String(filters.limit);
      if (filters.status) params.status = filters.status;
      if (filters.code) params.code = filters.code;
      if (filters.checkInFrom) params.checkInFrom = filters.checkInFrom;
      if (filters.checkInTo) params.checkInTo = filters.checkInTo;

      const hasFilters = Object.keys(params).length > 0;
      const raw = hasFilters
        ? await httpClient.get<BackendBookingResponse>('/bookings/hotel', { params })
        : await httpClient.get<BackendBookingResponse>('/bookings/hotel');

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
          room: '—',
          roomType: '',
          checkIn: b.checkIn,
          checkOut: b.checkOut,
          nights,
          status: b.status,
          total: `${b.currency} ${b.totalPrice}`,
          totalCop: b.totalPrice,
          paymentMethod: 'card',
        };
      });

      return {
        reservations,
        summary: raw.summary,
        total: (raw as any).total ?? reservations.length,
        page: (raw as any).page ?? 1,
        limit: (raw as any).limit ?? 10,
      };
    },
  });
}

export function useHotelBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ['hotelBookings', bookingId],
    queryFn: async (): Promise<HotelBookingDetail> => {
      const raw = await httpClient.get<any>(`/bookings/hotel/${bookingId}`);
      const checkIn: string = raw.checkIn ?? raw.check_in ?? '';
      const checkOut: string = raw.checkOut ?? raw.check_out ?? '';
      const nights =
        checkIn && checkOut
          ? Math.max(
              1,
              Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
            )
          : 1;
      return {
        id: raw.id,
        code: raw.code,
        status: raw.status ?? 'pending',
        guestName: raw.guestName ?? raw.guest_name ?? '',
        guestEmail: raw.guestEmail ?? raw.guest_email ?? '',
        guestPhone: raw.guestPhone ?? raw.guest_phone ?? '',
        checkIn,
        checkOut,
        nights,
        guests: raw.guests ?? 1,
        totalPrice: raw.totalPrice ?? raw.total_price ?? 0,
        currency: raw.currency ?? 'COP',
        createdAt: raw.createdAt ?? raw.created_at ?? '',
        priceBreakdown: raw.priceBreakdown ?? raw.price_breakdown ?? null,
        timeline: raw.timeline ?? [],
      };
    },
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
