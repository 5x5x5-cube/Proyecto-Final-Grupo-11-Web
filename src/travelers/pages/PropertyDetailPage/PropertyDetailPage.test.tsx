import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PropertyDetailPage from './PropertyDetailPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: 'a1000000-0000-0000-0000-000000000001' }),
  useSearchParams: () => [new URLSearchParams('checkIn=2026-04-10&checkOut=2026-04-12&guests=2')],
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useHotelDetail: () => ({ isLoading: false, data: {} }),
  useHotelRooms: () => ({ isLoading: false, data: [] }),
  useHotelReviews: () => ({ data: [], isLoading: false }),
}));

vi.mock('@/api/hooks/useCart', () => ({
  useSetCart: () => ({ mutate: vi.fn(), isPending: false }),
}));

describe('PropertyDetailPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<PropertyDetailPage />);
  });
});
