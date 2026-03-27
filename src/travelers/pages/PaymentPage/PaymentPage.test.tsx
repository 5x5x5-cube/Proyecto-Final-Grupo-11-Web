import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentPage from './PaymentPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/usePayments', () => ({
  useInitiatePayment: () => ({ mutate: vi.fn(), isPending: false }),
}));

describe('PaymentPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<PaymentPage />);
  });
});
