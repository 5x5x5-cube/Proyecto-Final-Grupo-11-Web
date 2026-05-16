import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import MyReservationsPage from './MyReservationsPage';

const mockBookings = [
  {
    id: 'b1',
    code: 'TH-2026-00001',
    userId: 'u1',
    hotelId: 'h1',
    roomId: 'r1',
    checkIn: '2026-03-15T15:00:00',
    checkOut: '2026-03-20T12:00:00',
    guests: 2,
    status: 'confirmed' as const,
    totalPrice: 2664000,
    currency: 'COP',
    hotelName: 'Grand Hyatt Bogotá',
    roomName: 'Deluxe King Room',
    location: 'Bogotá, Colombia',
    nights: 5,
  },
  {
    id: 'b2',
    code: 'TH-2026-00002',
    userId: 'u1',
    hotelId: 'h2',
    roomId: 'r2',
    checkIn: '2026-04-10T15:00:00',
    checkOut: '2026-04-12T12:00:00',
    guests: 1,
    status: 'pending' as const,
    totalPrice: 800000,
    currency: 'COP',
    hotelName: 'Hotel Estelar Milla de Oro',
    roomName: 'Superior Room',
    location: 'Medellín, Colombia',
    nights: 2,
  },
  {
    id: 'b3',
    code: 'TH-2026-00003',
    userId: 'u1',
    hotelId: 'h3',
    roomId: 'r3',
    checkIn: '2026-02-01T15:00:00',
    checkOut: '2026-02-03T12:00:00',
    guests: 2,
    status: 'cancelled' as const,
    totalPrice: 600000,
    currency: 'COP',
    hotelName: 'Sofitel Legend Santa Clara',
    roomName: 'Classic Room',
    location: 'Cartagena, Colombia',
    nights: 2,
  },
];

vi.mock('@/api/hooks/useSearch', () => ({
  useHotelDetail: (hotelId: string) => ({
    data: hotelId
      ? { image_url: `https://images.unsplash.com/hotel-${hotelId}`, images: [] }
      : undefined,
  }),
}));

vi.mock('./useReservationTabs', () => ({
  useReservationTabs: vi.fn(() => ({
    tab: 'active',
    setTab: vi.fn(),
    bookings: mockBookings,
    isLoading: false,
  })),
}));

describe('MyReservationsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<MyReservationsPage />);
  });

  it('renders hotel names from API data (not UUIDs)', () => {
    renderWithProviders(<MyReservationsPage />);
    expect(screen.getByText('Grand Hyatt Bogotá')).toBeTruthy();
    expect(screen.getByText('Hotel Estelar Milla de Oro')).toBeTruthy();
    expect(screen.getByText('Sofitel Legend Santa Clara')).toBeTruthy();
  });

  it('renders location from API data', () => {
    renderWithProviders(<MyReservationsPage />);
    expect(screen.getByText('Bogotá, Colombia')).toBeTruthy();
    expect(screen.getByText('Medellín, Colombia')).toBeTruthy();
    expect(screen.getByText('Cartagena, Colombia')).toBeTruthy();
  });

  it('renders booking code from API data', () => {
    renderWithProviders(<MyReservationsPage />);
    expect(screen.getByText('TH-2026-00001')).toBeTruthy();
    expect(screen.getByText('TH-2026-00002')).toBeTruthy();
    expect(screen.getByText('TH-2026-00003')).toBeTruthy();
  });

  it('renders three reservation cards corresponding to the mock data', () => {
    renderWithProviders(<MyReservationsPage />);
    // All three booking codes appear — one per card
    const codes = screen.getAllByText(/TH-2026-000/);
    expect(codes).toHaveLength(3);
  });

  it('renders total paid using formatFixedPrice with each booking currency (COP)', () => {
    renderWithProviders(<MyReservationsPage />);
    // formatFixedPrice(booking.totalPrice, booking.currency) — no conversion to viewer preference.
    expect(screen.getByText(/COP\s+2[.,]664[.,]000/)).toBeTruthy();
    expect(screen.getByText(/COP\s+800[.,]000/)).toBeTruthy();
    expect(screen.getByText(/COP\s+600[.,]000/)).toBeTruthy();
  });

  it('renders hotel images from useHotelDetail in card thumbnails', () => {
    const { container } = renderWithProviders(<MyReservationsPage />);
    // Each card thumbnail should have the hotel image as background
    const thumbnails = container.querySelectorAll('[class*="CardThumbnail"]');
    thumbnails.forEach(thumb => {
      const style = (thumb as HTMLElement).style;
      expect(style.background || style.backgroundImage || thumb.getAttribute('style')).toContain(
        'unsplash'
      );
    });
  });
});
