export type RateType = 'standard' | 'weekend' | 'season' | 'promo';

export interface Tariff {
  id: string;
  roomId: string;
  roomName: string;
  roomLocation: string;
  rateType: RateType;
  pricePerNight: number;
  startDate: string | null;
  endDate: string | null;
}

export interface AdminRoom {
  id: string;
  name: string;
  location: string;
}

export const hotelAdminRooms: AdminRoom[] = [
  { id: 'b1000000-0000-0000-0000-000000000001', name: 'Suite Deluxe King', location: 'Cartagena' },
  { id: 'b1000000-0000-0000-0000-000000000002', name: 'Junior Suite', location: 'Cartagena' },
  {
    id: 'b1000000-0000-0000-0000-000000000003',
    name: 'Habitacion Estandar',
    location: 'Cartagena',
  },
  {
    id: 'b1000000-0000-0000-0000-000000000004',
    name: 'Habitacion Superior',
    location: 'Cartagena',
  },
];

export const tariffsList: Tariff[] = [
  {
    id: 't1000000-0000-0000-0000-000000000001',
    roomId: 'b1000000-0000-0000-0000-000000000001',
    roomName: 'Suite Deluxe King',
    roomLocation: 'Cartagena',
    rateType: 'standard',
    pricePerNight: 888000,
    startDate: null,
    endDate: null,
  },
  {
    id: 't1000000-0000-0000-0000-000000000002',
    roomId: 'b1000000-0000-0000-0000-000000000001',
    roomName: 'Suite Deluxe King',
    roomLocation: 'Cartagena',
    rateType: 'weekend',
    pricePerNight: 1050000,
    startDate: null,
    endDate: null,
  },
  {
    id: 't1000000-0000-0000-0000-000000000003',
    roomId: 'b1000000-0000-0000-0000-000000000001',
    roomName: 'Suite Deluxe King',
    roomLocation: 'Cartagena',
    rateType: 'season',
    pricePerNight: 1280000,
    startDate: '2025-12-20',
    endDate: '2026-01-10',
  },
  {
    id: 't1000000-0000-0000-0000-000000000004',
    roomId: 'b1000000-0000-0000-0000-000000000002',
    roomName: 'Junior Suite',
    roomLocation: 'Cartagena',
    rateType: 'standard',
    pricePerNight: 560000,
    startDate: null,
    endDate: null,
  },
  {
    id: 't1000000-0000-0000-0000-000000000005',
    roomId: 'b1000000-0000-0000-0000-000000000002',
    roomName: 'Junior Suite',
    roomLocation: 'Cartagena',
    rateType: 'promo',
    pricePerNight: 420000,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
  },
  {
    id: 't1000000-0000-0000-0000-000000000006',
    roomId: 'b1000000-0000-0000-0000-000000000003',
    roomName: 'Habitacion Estandar',
    roomLocation: 'Cartagena',
    rateType: 'standard',
    pricePerNight: 320000,
    startDate: null,
    endDate: null,
  },
];

export const roomRates = [
  {
    id: 1,
    name: 'Habitacion Superior',
    type: '1 cama King',
    basePrice: 532000,
    weekendPrice: 638000,
    capacity: 2,
    amenities: ['WiFi', 'A/C', 'TV', 'Minibar'],
    status: 'active' as const,
  },
  {
    id: 2,
    name: 'Suite Junior',
    type: 'Vista al mar',
    basePrice: 1020000,
    weekendPrice: 1224000,
    capacity: 3,
    amenities: ['WiFi', 'A/C', 'TV', 'Minibar', 'Jacuzzi', 'Desayuno'],
    status: 'active' as const,
  },
  {
    id: 3,
    name: 'Suite Deluxe King',
    type: 'Piso 4 \u00B7 Vista al mar',
    basePrice: 888000,
    weekendPrice: 1065600,
    capacity: 2,
    amenities: ['WiFi', 'A/C', 'TV', 'Minibar', 'Jacuzzi', 'Desayuno', 'Cancelacion gratuita'],
    status: 'active' as const,
  },
  {
    id: 4,
    name: 'Habitacion Estandar',
    type: '2 camas dobles',
    basePrice: 380000,
    weekendPrice: 456000,
    capacity: 4,
    amenities: ['WiFi', 'A/C', 'TV'],
    status: 'inactive' as const,
  },
];

export const discounts = [
  {
    id: 'd1000000-0000-0000-0000-000000000001',
    tariff_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Temporada alta Semana Santa',
    discount_type: 'percentage' as const,
    value: 15,
    start_date: '2026-03-28',
    end_date: '2026-04-12',
    status: 'inactive' as const,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000002',
    tariff_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Early Bird - Reservas anticipadas',
    discount_type: 'fixed' as const,
    value: 100000,
    start_date: '2026-02-01',
    end_date: '2026-06-30',
    status: 'active' as const,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000003',
    tariff_id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Flash Sale Fin de Semana',
    discount_type: 'percentage' as const,
    value: 20,
    start_date: '2026-05-01',
    end_date: '2026-05-31',
    status: 'active' as const,
    created_at: '2026-01-01T00:00:00Z',
  },
];
