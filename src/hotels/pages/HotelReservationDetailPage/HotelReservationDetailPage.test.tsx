import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelReservationDetailPage from './HotelReservationDetailPage';

const mockMutate = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: 'd1000000-0000-0000-0000-000000000001' }),
}));

const mockUseHotelBookingDetail = vi.fn();

vi.mock('@/api/hooks/useHotelBookings', () => ({
  useHotelBookingDetail: (...args: unknown[]) => mockUseHotelBookingDetail(...args),
  useUpdateBookingStatus: vi.fn(() => ({
    mutate: mockMutate,
    isPending: false,
  })),
}));

const pendingBooking = {
  id: 'd1000000-0000-0000-0000-000000000001',
  code: 'BK-48291001',
  guest: 'Carlos Martinez',
  status: 'pending',
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseHotelBookingDetail.mockReturnValue({
    data: pendingBooking,
    isLoading: false,
  });
});

describe('HotelReservationDetailPage', () => {
  it('renders booking code from data', () => {
    renderWithProviders(<HotelReservationDetailPage />);

    expect(screen.getAllByText('BK-48291001').length).toBeGreaterThan(0);
  });

  it('shows confirm and reject buttons for pending bookings', () => {
    renderWithProviders(<HotelReservationDetailPage />);

    expect(screen.getByText(/Rechazar/)).toBeInTheDocument();
    expect(screen.getByText(/Confirmar reserva/)).toBeInTheDocument();
  });

  it('opens confirm dialog on confirm click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HotelReservationDetailPage />);

    const btn = screen.getByText(/Confirmar reserva/).closest('button')!;
    await user.click(btn);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('opens reject dialog on reject click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HotelReservationDetailPage />);

    const btn = screen.getByText(/Rechazar/).closest('button')!;
    await user.click(btn);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('calls mutate with confirm action when dialog is confirmed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HotelReservationDetailPage />);

    await user.click(screen.getByText(/Confirmar reserva/).closest('button')!);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // The dialog has its own "Confirmar reserva" button — find buttons inside dialog
    const dialog = screen.getByRole('dialog');
    const dialogButtons = within(dialog).getAllByRole('button');
    const confirmBtn = dialogButtons.find(b => b.textContent?.includes('Confirmar'));
    await user.click(confirmBtn!);

    expect(mockMutate).toHaveBeenCalledWith({
      bookingId: 'd1000000-0000-0000-0000-000000000001',
      action: 'confirm',
    });
  });

  it('calls mutate with reject action when dialog is confirmed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HotelReservationDetailPage />);

    await user.click(screen.getByText(/Rechazar/).closest('button')!);
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    const dialogButtons = within(dialog).getAllByRole('button');
    const rejectBtn = dialogButtons.find(b => b.textContent?.includes('Rechazar'));
    await user.click(rejectBtn!);

    expect(mockMutate).toHaveBeenCalledWith({
      bookingId: 'd1000000-0000-0000-0000-000000000001',
      action: 'reject',
    });
  });

  it('closes dialog on cancel without calling mutate', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HotelReservationDetailPage />);

    const btn = screen.getByText(/Confirmar reserva/).closest('button')!;
    await user.click(btn);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    const cancelBtn = within(dialog)
      .getByText(/Cancelar/)
      .closest('button')!;
    await user.click(cancelBtn);

    expect(mockMutate).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('hides action buttons for non-pending bookings', () => {
    mockUseHotelBookingDetail.mockReturnValue({
      data: { ...pendingBooking, status: 'confirmed' },
      isLoading: false,
    });

    renderWithProviders(<HotelReservationDetailPage />);

    expect(screen.queryByText(/Rechazar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Confirmar reserva/)).not.toBeInTheDocument();
  });

  it('shows skeleton while loading', () => {
    mockUseHotelBookingDetail.mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithProviders(<HotelReservationDetailPage />);

    expect(screen.queryByText('BK-48291001')).not.toBeInTheDocument();
  });
});
