import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReservationsPage from './ReservationsPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/hooks/useHotelBookings', () => ({
  useHotelBookings: vi.fn(() => ({
    data: null,
    isLoading: true,
  })),
  useUpdateBookingStatus: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe('ReservationsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ReservationsPage />);
  });
});
