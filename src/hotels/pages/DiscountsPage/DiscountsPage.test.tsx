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
  useCreateDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useUpdateDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  useDeleteDiscount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}));

vi.mock('@/api/hooks/useTariffs', () => ({
  useTariffs: vi.fn(() => ({ data: [], isLoading: false })),
}));

describe('DiscountsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<DiscountsPage />);
  });
});
