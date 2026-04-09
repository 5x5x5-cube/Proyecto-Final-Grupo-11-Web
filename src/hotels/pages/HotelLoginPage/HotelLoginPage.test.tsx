import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelLoginPage from './HotelLoginPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/hooks/useAuth', () => ({
  useLogin: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe('HotelLoginPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HotelLoginPage />);
  });
});
