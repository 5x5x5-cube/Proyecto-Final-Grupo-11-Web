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
  id: 1,
  userId: 1,
  roomId: 1,
  hotelId: 1,
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
};

// Hotel detail mock (enriched from mockHotels[0])
const hotelDetail = {
  ...mockHotels[0],
  address: 'Calle del Torno #39-29, Centro Histórico, Cartagena',
  description: 'propertyDetail.descriptionText',
  amenities: [
    { icon: 'wifi', label: 'Wi-Fi gratis' },
    { icon: 'pool', label: 'Piscina' },
    { icon: 'free_breakfast', label: 'Desayuno incluido' },
    { icon: 'spa', label: 'Spa & Bienestar' },
    { icon: 'fitness_center', label: 'Gimnasio' },
    { icon: 'local_parking', label: 'Parqueadero' },
    { icon: 'ac_unit', label: 'Aire acondicionado' },
    { icon: 'restaurant', label: 'Restaurante' },
    { icon: 'local_bar', label: 'Bar' },
  ],
  rooms: [
    {
      name: 'Habitación Superior',
      features: '1 cama King · Vista al jardín · 32 m²',
      price: 480000,
      gradient: 'linear-gradient(135deg, #006874, #4A9FAA)',
      active: true,
    },
    {
      name: 'Suite Junior',
      features: 'Vista al mar · Jacuzzi · 48 m²',
      price: 680000,
      gradient: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
      active: false,
    },
  ],
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
  id: 'TH-48291',
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
    handler: () => ok(mockHotels),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels\/(\d+)$/,
    handler: () => ok(hotelDetail),
  },
  {
    method: 'GET',
    pattern: /^\/search\/hotels\/(\d+)\/reviews$/,
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
    handler: () => ok(cartData),
  },
  {
    method: 'DELETE',
    pattern: /^\/cart$/,
    handler: () => ok({ message: 'Cart cleared' }),
  },

  // ─── Payments ───
  {
    method: 'POST',
    pattern: /^\/payments\/initiate$/,
    handler: () =>
      ok({ paymentId: 'pay-001', status: 'approved', redirectUrl: '/checkout/confirmation' }),
  },
  {
    method: 'GET',
    pattern: /^\/payments\/([^/]+)\/status$/,
    handler: () => ok({ paymentId: 'pay-001', status: 'approved' }),
  },

  // ─── Hotel Bookings (Admin) ───
  {
    method: 'GET',
    pattern: /^\/bookings\/hotel$/,
    handler: () => ok({ reservations: hotelReservations, summary: reservationSummary }),
  },
  {
    method: 'GET',
    pattern: /^\/bookings\/hotel\/([^/]+)$/,
    handler: () => ok(hotelReservationDetail),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/hotel\/([^/]+)\/confirm$/,
    handler: () => ok({ message: 'Booking confirmed' }),
  },
  {
    method: 'POST',
    pattern: /^\/bookings\/hotel\/([^/]+)\/reject$/,
    handler: () => ok({ message: 'Booking rejected' }),
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
