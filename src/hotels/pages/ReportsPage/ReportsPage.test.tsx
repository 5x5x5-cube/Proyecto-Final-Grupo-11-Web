import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReportsPage from './ReportsPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/useReports', () => ({
  useReportKpis: vi.fn(() => ({ data: [], isLoading: false })),
  useRevenue: vi.fn(() => ({ data: [], isLoading: false })),
  useReportTransactions: vi.fn(() => ({ data: [], isLoading: false })),
  useMonthlyRevenue: vi.fn(() => ({ data: null, isLoading: false })),
  useAvailablePeriods: vi.fn(() => ({ data: { periods: [] }, isLoading: false })),
  downloadRevenueReport: vi.fn(() => Promise.resolve(new Blob())),
}));

describe('ReportsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ReportsPage />);
  });
});
