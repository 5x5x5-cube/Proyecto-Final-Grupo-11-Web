import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
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

const makeBooking = (overrides: Partial<typeof baseBooking> = {}) => ({
  ...baseBooking,
  ...overrides,
});

const baseBooking = {
  id: '42',
  code: 'TH-2026-00001',
  userId: 'u1',
  hotelId: 'h1',
  roomId: 'r1',
  paymentId: 'p1',
  // Far enough in the future to get the 100% free-cancellation tier.
  checkIn: '2099-01-15T15:00:00',
  checkOut: '2099-01-20T12:00:00',
  guests: 2,
  status: 'confirmed' as 'confirmed' | 'pending' | 'cancelled' | 'rejected' | 'past',
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
let currentBooking = makeBooking();
const mutateMock = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '42' }),
}));

vi.mock('@/api/hooks/useBookings', () => ({
  useBookingDetail: (id: string) => {
    capturedBookingId = id;
    return { isLoading: false, data: currentBooking };
  },
  useCancelBooking: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

vi.mock('@/api/hooks/usePayments', () => ({
  usePaymentStatus: () => ({
    isLoading: false,
    data: {
      status: 'approved',
      amount: 2664000,
      currency: 'COP',
      paymentMethod: { displayLabel: 'Visa ****4242' },
    },
  }),
}));

describe('ReservationDetailPage', () => {
  beforeEach(() => {
    currentBooking = makeBooking();
    mutateMock.mockClear();
  });

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
    const dateEls = screen.getAllByText(/2099/);
    expect(dateEls.length).toBeGreaterThanOrEqual(2);
  });

  it('uses the route param id (not a hardcoded value) when fetching booking detail', () => {
    capturedBookingId = undefined;
    renderWithProviders(<ReservationDetailPage />);
    expect(capturedBookingId).toBe('42');
  });

  it('formats monetary totals with booking currency (COP)', () => {
    renderWithProviders(<ReservationDetailPage />);
    const copTotals = screen.getAllByText(/COP\s+2[.,]664[.,]000/);
    expect(copTotals.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render the confirmed modal', () => {
    renderWithProviders(<ReservationDetailPage />);
    expect(screen.queryByText(/Ver confirmacion|View confirmation/)).toBeNull();
  });

  it('renders the next steps section for confirmed status', () => {
    renderWithProviders(<ReservationDetailPage />);
    expect(screen.getByText(/Next steps|Proximos pasos/)).toBeTruthy();
  });

  describe('cancel card visibility', () => {
    it('shows the cancel-reservation card when the booking is confirmed', () => {
      currentBooking = makeBooking({ status: 'confirmed' });
      renderWithProviders(<ReservationDetailPage />);
      // The card's button label comes from cancelBox.cancelButton (ES/EN)
      const btns = screen.getAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      });
      expect(btns.length).toBeGreaterThanOrEqual(1);
    });

    it('shows the cancel-reservation card when the booking is pending', () => {
      currentBooking = makeBooking({ status: 'pending' });
      renderWithProviders(<ReservationDetailPage />);
      const btns = screen.getAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      });
      expect(btns.length).toBeGreaterThanOrEqual(1);
    });

    it('hides the cancel-reservation card when the booking is already cancelled', () => {
      currentBooking = makeBooking({ status: 'cancelled' });
      renderWithProviders(<ReservationDetailPage />);
      const btns = screen.queryAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      });
      expect(btns.length).toBe(0);
    });

    it('hides the cancel-reservation card when the booking was rejected', () => {
      currentBooking = makeBooking({ status: 'rejected' });
      renderWithProviders(<ReservationDetailPage />);
      const btns = screen.queryAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      });
      expect(btns.length).toBe(0);
    });

    it('hides the cancel-reservation card when the booking is past', () => {
      currentBooking = makeBooking({ status: 'past' });
      renderWithProviders(<ReservationDetailPage />);
      const btns = screen.queryAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      });
      expect(btns.length).toBe(0);
    });
  });

  describe('cancel modal', () => {
    it('opens with a title that includes the booking code', () => {
      currentBooking = makeBooking({ status: 'confirmed', code: 'TH-2026-00042' });
      renderWithProviders(<ReservationDetailPage />);
      // Before opening the modal: code appears once (page header).
      // After opening: it should also appear inside the modal title.
      const before = screen.getAllByText(/TH-2026-00042/).length;
      const trigger = screen.getAllByRole('button', {
        name: /Cancel(ar)?\s+reserva|Cancel reservation/i,
      })[0];
      fireEvent.click(trigger);
      const after = screen.getAllByText(/TH-2026-00042/).length;
      expect(after).toBeGreaterThan(before);
    });

    it('fires the cancel mutation with the booking id when "Confirmar" is clicked', () => {
      currentBooking = makeBooking({ status: 'confirmed' });
      renderWithProviders(<ReservationDetailPage />);
      fireEvent.click(
        screen.getAllByRole('button', { name: /Cancel(ar)?\s+reserva|Cancel reservation/i })[0]
      );
      const confirm = screen.getByRole('button', {
        name: /Confirmar cancelaci|Confirm cancellation/i,
      });
      fireEvent.click(confirm);
      expect(mutateMock).toHaveBeenCalledTimes(1);
      expect(mutateMock.mock.calls[0][0]).toBe('42');
    });

    it('shows a 100% refund for a check-in more than 7 days away', () => {
      currentBooking = makeBooking({ status: 'confirmed' });
      renderWithProviders(<ReservationDetailPage />);
      fireEvent.click(
        screen.getAllByRole('button', { name: /Cancel(ar)?\s+reserva|Cancel reservation/i })[0]
      );
      // Total to refund equals total price for free cancellation tier
      const totalRefund = screen.getAllByText(/COP\s+2[.,]664[.,]000/);
      expect(totalRefund.length).toBeGreaterThanOrEqual(1);
    });

    it('shows the real payment method label from usePaymentStatus', () => {
      currentBooking = makeBooking({ status: 'confirmed' });
      renderWithProviders(<ReservationDetailPage />);
      const before = screen.getAllByText(/Visa \*\*\*\*4242/).length;
      fireEvent.click(
        screen.getAllByRole('button', { name: /Cancel(ar)?\s+reserva|Cancel reservation/i })[0]
      );
      const after = screen.getAllByText(/Visa \*\*\*\*4242/).length;
      // Method label should now also be visible in the refund-method box
      expect(after).toBeGreaterThan(before);
    });
  });
});
