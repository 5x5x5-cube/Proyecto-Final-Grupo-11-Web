import type { RequestConfig } from './httpClient';
import { mockDestinations } from '../travelers/data/mockDestinations';
import { mockHotels } from '../travelers/data/mockHotels';
import { mockReservations } from '../travelers/data/mockReservations';
import { hotelReservations, reservationSummary } from '../hotels/data/mockHotelReservations';
import { roomRates, discounts } from '../hotels/data/mockRates';
import {
  dashboardStats,
  recentReservations,
  revenueData,
  quickAccessItems,
} from '../hotels/data/mockDashboard';

type Handler = (
  config: RequestConfig | undefined,
  match: RegExpMatchArray
) => { status: number; data: unknown };

interface MockRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  pattern: RegExp;
  handler: Handler;
}

const ok = (data: unknown) => ({ status: 200, data });
const created = (data: unknown) => ({ status: 201, data });
const accepted = (data: unknown) => ({ status: 202, data });

// Reviews for property detail (inline since not in a separate mock file)
const hotelReviews = [
  {
    initial: 'M',
    name: 'Maria Gonzalez',
    date: 'Febrero 2026',
    stars: 5,
    text: '"Experiencia increible. El personal fue amabilisimo y las instalaciones son impecables. Sin duda regresare."',
  },
  {
    initial: 'J',
    name: 'Juan Perez',
    date: 'Enero 2026',
    stars: 5,
    text: '"La ubicacion es perfecta, en pleno centro historico. El desayuno fue excelente y la piscina una delicia."',
  },
  {
    initial: 'A',
    name: 'Andrea Rios',
    date: 'Enero 2026',
    stars: 4,
    text: '"Muy buena experiencia en general. Las habitaciones son hermosas y el spa es de primera. Recomendado."',
  },
];

// Cart mock data — matches OpenAPI Cart schema (single-room)
const cartData = {
  id: 'cart-mock-001',
  userId: 'c1000000-0000-0000-0000-000000000001',
  roomId: 'b1000000-0000-0000-0000-000000000001',
  hotelId: 'a1000000-0000-0000-0000-000000000001',
  hotelName: 'Hotel Santa Clara Sofitel',
  hotelType: 'Hotel · 5 estrellas',
  location: 'Centro Historico, Cartagena',
  rating: 4.8,
  reviewCount: 312,
  roomName: 'Habitación Superior',
  roomFeatures: '1 cama King · Vista al jardín · 32 m²',
  checkIn: '2026-03-15',
  checkOut: '2026-03-20',
  guests: 2,
  pricePerNight: 480000,
  nights: 5,
  subtotal: 2400000,
  tourismTax: 96000,
  vat: 168000,
  serviceFee: 0,
  total: 2664000,
  createdAt: '2026-03-10T10:00:00Z',
  holdId: 'hold-mock-001',
  holdExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

// Hotel detail mock — backend format (flat, matching search_service.get_hotel_by_id)
const hotelDetail = {
  id: 'a1000000-0000-0000-0000-000000000001',
  name: 'Hotel Santa Clara Sofitel',
  description:
    "Luxury colonial hotel in the heart of Cartagena's historic district, surrounded by centuries-old architecture and minutes from the walled city.",
  city: 'Cartagena',
  country: 'Colombia',
  rating: 4.8,
};

// Rooms mock — backend format (matching search_service.get_hotel_rooms)
const hotelRooms = {
  hotel_id: 'a1000000-0000-0000-0000-000000000001',
  rooms: [
    {
      id: 'b1000000-0000-0000-0000-000000000001',
      hotel_id: 'a1000000-0000-0000-0000-000000000001',
      room_type: 'Superior',
      room_number: '101',
      capacity: 2,
      price_per_night: 480000,
      tax_rate: 0.19,
      description: '1 cama King · Vista al jardín · 32 m²',
      amenities: { wifi: true, ac: true, tv: true },
      total_quantity: 5,
    },
    {
      id: 'b1000000-0000-0000-0000-000000000002',
      hotel_id: 'a1000000-0000-0000-0000-000000000001',
      room_type: 'Suite Junior',
      room_number: '201',
      capacity: 2,
      price_per_night: 680000,
      tax_rate: 0.19,
      description: 'Vista al mar · Jacuzzi · 48 m²',
      amenities: { wifi: true, ac: true, tv: true, minibar: true, balcony: true, jacuzzi: true },
      total_quantity: 3,
    },
  ],
  total: 2,
};

// Booking detail mock
const bookingDetail = {
  id: 1,
  code: 'TH-2026-48291',
  status: 'confirmed' as const,
  hotelType: 'Hotel · 5 estrellas',
  hotelName: 'Hotel Santa Clara Sofitel',
  address: 'Calle del Torno #39-29, Centro Histórico, Cartagena',
  rating: 4.8,
  reviewCount: 312,
  checkIn: '2026-03-15T15:00:00',
  checkOut: '2026-03-20T12:00:00',
  nights: 5,
  guests: '2 adultos',
  room: 'Habitación Superior',
  roomFeatures: '1 cama King · Vista al jardín · 32 m²',
  pricePerNight: 480000,
  subtotal: 2400000,
  tourismTax: 96000,
  vat: 168000,
  total: 2664000,
  gradient: 'linear-gradient(135deg, #003740, #006874)',
};

// Booking payments mock
const bookingPayments = [
  {
    type: 'payment',
    label: 'Pago de reserva',
    date: '2026-02-15',
    time: '10:34 a.m.',
    method: 'VISA •••• 4242',
    amount: 2664000,
    status: 'approved',
  },
];

// Hotel reservation detail mock
const hotelReservationDetail = {
  id: 'd1000000-0000-0000-0000-000000000001',
  code: 'BK-48291001',
  guest: 'Carlos Martinez',
  email: 'carlos.m@email.com',
  phone: '+57 310 000 0000',
  initials: 'C',
  room: 'Habitación Superior',
  roomType: '1 cama King',
  checkIn: '2026-03-15',
  checkOut: '2026-03-20',
  nights: 5,
  guests: 2,
  status: 'confirmed' as const,
  total: 2664000,
  paymentMethod: 'Visa ****4821',
  pricePerNight: 532000,
  subtotal: 2660000,
  tourismTax: 96000,
  vat: 168000,
};

// Reports data
const reportKpis = [
  {
    label: 'Ingresos totales',
    value: 'COP 94.2M',
    change: '+12%',
    changeType: 'up' as const,
    icon: 'payments',
    iconColor: 'green' as const,
  },
  {
    label: 'Reservas completadas',
    value: '47',
    change: '+8%',
    changeType: 'up' as const,
    icon: 'event_available',
    iconColor: 'teal' as const,
  },
  {
    label: 'Ticket promedio',
    value: 'COP 2.0M',
    change: '+5%',
    changeType: 'up' as const,
    icon: 'confirmation_number',
    iconColor: 'amber' as const,
  },
  {
    label: 'Tasa de ocupacion',
    value: '78%',
    change: '+3%',
    changeType: 'up' as const,
    icon: 'trending_up',
    iconColor: 'blue' as const,
  },
];

const reportTransactions = [
  {
    id: 'TH-48291',
    guest: 'Carlos Martinez',
    room: 'Habitación Superior',
    date: '2026-03-15',
    amount: 2664000,
    status: 'confirmed' as const,
  },
  {
    id: 'TH-48305',
    guest: 'Laura Sanchez',
    room: 'Suite Junior',
    date: '2026-03-18',
    amount: 4080000,
    status: 'pending' as const,
  },
  {
    id: 'TH-48312',
    guest: 'Miguel Torres',
    room: 'Habitación Superior',
    date: '2026-03-20',
    amount: 1596000,
    status: 'confirmed' as const,
  },
  {
    id: 'TH-48320',
    guest: 'Ana Ramirez',
    room: 'Suite Junior',
    date: '2026-03-25',
    amount: 2448000,
    status: 'pending' as const,
  },
  {
    id: 'TH-48331',
    guest: 'Julian Lopez',
    room: 'Habitación Superior',
    date: '2026-04-01',
    amount: 1596000,
    status: 'confirmed' as const,
  },
];

// Bar chart data for revenue (same as inline in ReportsPage)
const barData = [
  { week: 1, month: '2026-01-01', height: 90 },
  { week: 2, month: '2026-01-01', height: 112 },
  { week: 3, month: '2026-01-01', height: 98 },
  { week: 4, month: '2026-01-01', height: 140 },
  { week: 1, month: '2026-02-01', height: 125 },
  { week: 2, month: '2026-02-01', height: 156 },
  { week: 3, month: '2026-02-01', height: 144 },
  { week: 4, month: '2026-02-01', height: 132 },
];

export const mockHandlers: MockRoute[] = [
  // ─── Auth ───
  {
    method: 'POST',
    pattern: /^\/auth\/login$/,
    handler: () =>
      ok({
        token: 'mock-jwt-token',
        user: { id: 1, name: 'Carlos Martinez', email: 'carlos.m@email.com' },
      }),
  },
  {
    method: 'POST',
    pattern: /^\/auth\/register$/,
    handler: () => created({ id: 1, name: 'Carlos Martinez', email: 'carlos.m@email.com' }),
  },
  {
    method: 'GET',
    pattern: /^\/auth\/me$/,
    handler: () =>
      ok({ id: 1, name: 'Carlos Martinez', email: 'carlos.m@email.com', initials: 'C' }),
  },
  {
    method: 'POST',
    pattern: /^\/auth\/forgot-password$/,
    handler: () => ok({ message: 'Password reset email sent' }),
  },

  // ─── Search ───
  {
    method: 'GET',
    pattern: /^\/search\/destinations$/,
    handler: () => ok(mockDestinations),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels$/,
    handler: () =>
      ok({
        results: mockHotels.map(h => ({
          id: h.id,
          name: h.name,
          description: '',
          city: h.location.split(', ').pop() ?? h.location,
          country: '',
          address: h.location,
          rating: h.rating,
          available_rooms_count: 5,
          min_price: h.pricePerNight,
        })),
        total: mockHotels.length,
        page: 1,
        page_size: 20,
        total_pages: 1,
      }),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels\/([^/]+)$/,
    handler: () => ok(hotelDetail),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels\/([^/]+)\/rooms$/,
    handler: () => ok(hotelRooms),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels\/([^/]+)\/reviews$/,
    handler: () => ok(hotelReviews),
  },

  // ─── Bookings (Traveler) ───
  {
    method: 'GET',
    pattern: /^\/bookings$/,
    handler: () => ok(mockReservations),
  },
  {
    method: 'GET',
    pattern: /^\/bookings\/(\d+)$/,
    handler: () => ok(bookingDetail),
  },
  {
    method: 'GET',
    pattern: /^\/bookings\/(\d+)\/payments$/,
    handler: () => ok(bookingPayments),
  },
  {
    method: 'GET',
    pattern: /^\/bookings\/(\d+)\/qr$/,
    handler: () => ok({ qrCode: 'TH-2026-48291', bookingId: 1 }),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/(\d+)\/cancel$/,
    handler: () => ok({ message: 'Booking cancelled', refund: 2664000 }),
  },
  {
    method: 'POST',
    pattern: /^\/bookings$/,
    handler: () => created(bookingDetail),
  },

  // ─── Cart (single-room) ───
  {
    method: 'GET',
    pattern: /^\/cart$/,
    handler: () => ok(cartData),
  },
  {
    method: 'PUT',
    pattern: /^\/cart$/,
    handler: () =>
      ok({
        ...cartData,
        holdId: 'hold-mock-001',
        holdExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      }),
  },
  {
    method: 'DELETE',
    pattern: /^\/cart$/,
    handler: () => ok({ message: 'Cart cleared' }),
  },

  // ─── Payments ───
  {
    method: 'POST',
    pattern: /^\/gateway\/tokenize$/,
    handler: (config: RequestConfig | undefined) => {
      const body = config?.body as
        | {
            method?: 'credit_card' | 'debit_card' | 'digital_wallet' | 'transfer';
            cardNumber?: string;
            walletProvider?: string;
            walletEmail?: string;
            bankCode?: string;
            accountNumber?: string;
          }
        | undefined;
      const method = body?.method ?? 'credit_card';
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

      if (method === 'digital_wallet') {
        const provider = body?.walletProvider ?? 'wallet';
        return ok({
          token: `tok_wallet_${provider}_${Date.now()}`,
          method: 'digital_wallet',
          displayLabel: `${provider} · ${body?.walletEmail ?? ''}`,
          expiresAt,
          cardLast4: null,
          cardBrand: null,
          walletProvider: provider,
          bankCode: null,
        });
      }

      if (method === 'transfer') {
        const bank = body?.bankCode ?? '000';
        const acct = (body?.accountNumber ?? '').slice(-4) || '0000';
        return ok({
          token: `tok_transfer_${bank}_${acct}`,
          method: 'transfer',
          displayLabel: `Bank ${bank} · ****${acct}`,
          expiresAt,
          cardLast4: null,
          cardBrand: null,
          walletProvider: null,
          bankCode: bank,
        });
      }

      const digits = (body?.cardNumber ?? '').replace(/\D/g, '');
      const last4 = digits.slice(-4) || '0000';
      return ok({
        token: `tok_mock_${last4}`,
        method,
        displayLabel: `Visa ****${last4}`,
        expiresAt,
        cardLast4: last4,
        cardBrand: 'Visa',
        walletProvider: null,
        bankCode: null,
      });
    },
  },
  {
    method: 'POST',
    pattern: /^\/payments\/initiate$/,
    handler: () => accepted({ paymentId: 'pay-001', status: 'processing' }),
  },
  {
    method: 'GET',
    pattern: /^\/payments\/([^/]+)$/,
    handler: () => ok({ paymentId: 'pay-001', status: 'approved', bookingCode: 'BK-MOCK001' }),
  },

  // ─── Hotel Bookings (Admin) ───
  {
    method: 'GET',
    pattern: /^\/bookings\/hotel$/,
    handler: () =>
      ok({
        data: hotelReservations.map(r => ({
          id: r.id,
          code: r.code,
          guestName: r.guest,
          guestEmail: r.email,
          roomId: r.id,
          checkIn: r.checkIn,
          checkOut: r.checkOut,
          guests: 2,
          status: r.status,
          totalPrice: r.totalCop,
          currency: 'COP',
        })),
        total: reservationSummary.total,
        page: 1,
        limit: 10,
        summary: reservationSummary,
      }),
  },
  {
    method: 'GET',
    pattern: /^\/bookings\/hotel\/([^/]+)$/,
    handler: () =>
      ok({
        id: hotelReservationDetail.id,
        code: hotelReservationDetail.code,
        status: hotelReservationDetail.status,
        guestName: hotelReservationDetail.guest,
        guestEmail: hotelReservationDetail.email,
        guestPhone: hotelReservationDetail.phone,
        checkIn: hotelReservationDetail.checkIn,
        checkOut: hotelReservationDetail.checkOut,
        guests: hotelReservationDetail.guests,
        totalPrice: hotelReservationDetail.total,
        currency: 'COP',
        createdAt: '2026-02-24T10:32:00Z',
        priceBreakdown: {
          pricePerNight: hotelReservationDetail.pricePerNight,
          nights: hotelReservationDetail.nights,
          basePrice: hotelReservationDetail.total,
          vat: hotelReservationDetail.tourismTax + hotelReservationDetail.vat,
          serviceFee: 0,
          totalPrice:
            hotelReservationDetail.total +
            hotelReservationDetail.tourismTax +
            hotelReservationDetail.vat,
          currency: 'COP',
        },
        timeline: [
          {
            event: 'booking_created',
            timestamp: '2026-02-24T10:32:00Z',
            description: 'Reserva registrada en el sistema',
          },
          {
            event: 'confirmed',
            timestamp: '2026-02-24T11:00:00Z',
            description: 'Reserva confirmada por el hotel',
          },
        ],
      }),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/hotel\/([^/]+)\/status$/,
    handler: (config: RequestConfig | undefined) => {
      const action = (config?.body as { action?: string })?.action;
      const status = action === 'confirm' ? 'confirmed' : 'rejected';
      return ok({
        id: hotelReservationDetail.id,
        code: hotelReservationDetail.code,
        status: status as 'confirmed' | 'rejected',
        guestName: hotelReservationDetail.guest,
        guestEmail: hotelReservationDetail.email,
        guestPhone: hotelReservationDetail.phone,
        checkIn: hotelReservationDetail.checkIn,
        checkOut: hotelReservationDetail.checkOut,
        guests: hotelReservationDetail.guests,
        totalPrice: hotelReservationDetail.total,
        currency: 'COP',
        createdAt: '2026-02-24T10:32:00Z',
        priceBreakdown: null,
        timeline: [],
      });
    },
  },

  // ─── Tariffs ───
  {
    method: 'GET',
    pattern: /^\/bookings\/tariffs$/,
    handler: () => ok(roomRates),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/tariffs$/,
    handler: _config => created({ id: 5, ...(_config?.body as object) }),
  },
  {
    method: 'PUT',
    pattern: /^\/bookings\/tariffs\/(\d+)$/,
    handler: _config => ok({ id: 1, ...(_config?.body as object) }),
  },
  {
    method: 'DELETE',
    pattern: /^\/bookings\/tariffs\/(\d+)$/,
    handler: () => ok({ message: 'Tariff deleted' }),
  },

  // ─── Discounts ───
  {
    method: 'GET',
    pattern: /^\/bookings\/discounts$/,
    handler: () => ok(discounts),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/discounts$/,
    handler: _config => created({ id: 4, ...(_config?.body as object) }),
  },
  {
    method: 'PUT',
    pattern: /^\/bookings\/discounts\/(\d+)$/,
    handler: _config => ok({ id: 1, ...(_config?.body as object) }),
  },
  {
    method: 'DELETE',
    pattern: /^\/bookings\/discounts\/(\d+)$/,
    handler: () => ok({ message: 'Discount deleted' }),
  },

  // ─── Reports ───
  {
    method: 'GET',
    pattern: /^\/reports\/dashboard$/,
    handler: () => ok({ stats: dashboardStats, recentReservations, revenueData, quickAccessItems }),
  },
  {
    method: 'GET',
    pattern: /^\/reports\/revenue$/,
    handler: () => ok(barData),
  },
  {
    method: 'GET',
    pattern: /^\/reports\/kpis$/,
    handler: () => ok(reportKpis),
  },
  {
    method: 'GET',
    pattern: /^\/reports\/transactions$/,
    handler: () => ok(reportTransactions),
  },
];
