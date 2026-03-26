import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReservationDetailPage from './ReservationDetailPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useBookings', () => ({
  useBookingDetail: () => ({ isLoading: false, data: {} }),
  useBookingPayments: () => ({ isLoading: false, data: [] }),
}));

describe('ReservationDetailPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ReservationDetailPage />);
  });
});
