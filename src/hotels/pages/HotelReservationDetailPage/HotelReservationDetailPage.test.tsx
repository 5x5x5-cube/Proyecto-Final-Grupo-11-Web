import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelReservationDetailPage from './HotelReservationDetailPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useHotelBookings', () => ({
  useHotelBookingDetail: vi.fn(() => ({
    data: null,
    isLoading: true,
  })),
  useConfirmBooking: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
  useRejectBooking: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe('HotelReservationDetailPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HotelReservationDetailPage />);
  });
});
