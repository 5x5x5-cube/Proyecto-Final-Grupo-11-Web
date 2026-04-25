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
  useHotelAdminRooms: vi.fn(() => ({ data: [], isLoading: false })),
  useCreateTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
  useUpdateTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
  useDeleteTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
}));

describe('RatesPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<RatesPage />);
  });
});
