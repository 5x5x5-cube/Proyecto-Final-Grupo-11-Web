import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import DashboardPage from './DashboardPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}));

vi.mock('@/api/hooks/useReports', () => ({
  useDashboard: vi.fn(() => ({
    data: null,
    isLoading: true,
  })),
}));

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<DashboardPage />);
  });
});
