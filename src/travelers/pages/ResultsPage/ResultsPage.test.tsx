import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ResultsPage from './ResultsPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useSearchHotels: () => ({ data: [], isLoading: false }),
}));

describe('ResultsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ResultsPage />);
  });
});
