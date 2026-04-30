import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReservationDetailPage from './ReservationDetailPage';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'u1', name: 'Test User', email: 'test@test.com', phone: '', initials: 'TU' },
    guestInfo: { name: 'Test User', email: 'test@test.com', phone: '', initials: 'TU' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockBooking = {
  id: '42',
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
  hotelName: 'Hotel Test',
  roomName: 'Superior Room',
  location: 'Test City',
  nights: 5,
  guestName: 'Carlos M.',
};

// Capture the id that useParams returns so tests can assert it is used
let capturedBookingId: string | undefined;

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '42' }),
}));

vi.mock('@/api/hooks/useBookings', () => ({
  useBookingDetail: (id: string) => {
    capturedBookingId = id;
    return { isLoading: false, data: mockBooking };
  },
}));

vi.mock('@/api/hooks/usePayments', () => ({
  usePaymentStatus: () => ({ isLoading: false, data: null }),
}));

describe('ReservationDetailPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ReservationDetailPage />);
  });

  it('renders hotel name from API data', () => {
    renderWithProviders(<ReservationDetailPage />);
    expect(screen.getByText('Hotel Test')).toBeTruthy();
  });

  it('renders booking code from API data', () => {
    renderWithProviders(<ReservationDetailPage />);
    expect(screen.getByText('TH-2026-00001')).toBeTruthy();
  });

  it('renders check-in and check-out dates from API data', () => {
    renderWithProviders(<ReservationDetailPage />);
    // The dates are formatted by formatDate; we check that both date strings
    // produce at least one element containing the year "2026".
    const dateEls = screen.getAllByText(/2026/);
    expect(dateEls.length).toBeGreaterThanOrEqual(2);
  });

  it('uses the route param id (not a hardcoded value) when fetching booking detail', () => {
    capturedBookingId = undefined;
    renderWithProviders(<ReservationDetailPage />);
    // useParams returns id='42'; the page must pass it to useBookingDetail
    expect(capturedBookingId).toBe('42');
  });

  it('formats monetary totals with booking currency (COP)', () => {
    renderWithProviders(<ReservationDetailPage />);
    const copTotals = screen.getAllByText(/COP\s+2[.,]664[.,]000/);
    expect(copTotals.length).toBeGreaterThanOrEqual(1);
  });
});
