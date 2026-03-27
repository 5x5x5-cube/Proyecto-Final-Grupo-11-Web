import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PropertyDetailPage from './PropertyDetailPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useHotelDetail: () => ({ isLoading: false, data: {} }),
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
