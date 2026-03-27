import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import RatesPage from './RatesPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useTariffs', () => ({
  useTariffs: vi.fn(() => ({ data: [], isLoading: false })),
}));

describe('RatesPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<RatesPage />);
  });
});
