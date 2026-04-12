import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import DiscountsPage from './DiscountsPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useDiscounts', () => ({
  useDiscounts: vi.fn(() => ({ data: [], isLoading: false })),
}));

describe('DiscountsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<DiscountsPage />);
  });
});
