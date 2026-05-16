import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import TransactionsPage from './TransactionsPage';
import type {
  PaymentsSummary,
  PaymentListItem,
  PaymentsListResponse,
} from '@/api/hooks/useAdminPayments';

// Hoisted mocks so vi.mock can reference them.
const mocks = vi.hoisted(() => ({
  usePaymentsSummary: vi.fn(),
  usePaymentsList: vi.fn(),
  exportPaymentsCsv: vi.fn(),
}));

vi.mock('@/api/hooks/useAdminPayments', () => ({
  usePaymentsSummary: mocks.usePaymentsSummary,
  usePaymentsList: mocks.usePaymentsList,
  exportPaymentsCsv: mocks.exportPaymentsCsv,
}));

const summaryFixture: PaymentsSummary = {
  totalProcessed: 4_000_000,
  totalDeclined: 500_000,
  totalRefunded: 250_000,
  approvalRate: 0.8,
  transactionCount: 14,
  approvedCount: 8,
  declinedCount: 2,
  refundedCount: 1,
  processingCount: 3,
  currency: 'COP',
};

const itemFixture: PaymentListItem = {
  id: '00000000-0000-0000-0000-000000000001',
  userId: '11111111-1111-1111-1111-111111111111',
  amount: 350000,
  currency: 'COP',
  method: 'credit_card',
  methodLabel: 'Visa •••• 4242',
  status: 'approved',
  transactionId: 'txn_abc123',
  errorCode: null,
  createdAt: '2026-04-15T10:30:00Z',
  processedAt: '2026-04-15T10:30:05Z',
};

const listFixture: PaymentsListResponse = {
  items: [itemFixture],
  page: 1,
  pageSize: 20,
  total: 1,
  totalPages: 1,
};

describe('TransactionsPage', () => {
  beforeEach(() => {
    mocks.usePaymentsSummary.mockReset();
    mocks.usePaymentsList.mockReset();
    mocks.exportPaymentsCsv.mockReset();

    mocks.usePaymentsSummary.mockReturnValue({ data: summaryFixture, isLoading: false });
    mocks.usePaymentsList.mockReturnValue({ data: listFixture, isLoading: false });
  });

  it('renders the four KPI cards with formatted summary data', () => {
    renderWithProviders(<TransactionsPage />);
    // Approval rate is rounded to integer percent
    expect(screen.getByText('80%')).toBeInTheDocument();
    // Each card has its own label
    expect(screen.getByText(/total procesado/i)).toBeInTheDocument();
    expect(screen.getByText(/tasa de aprobacion/i)).toBeInTheDocument();
    expect(screen.getByText(/total rechazado/i)).toBeInTheDocument();
    expect(screen.getByText(/total reembolsado/i)).toBeInTheDocument();
  });

  it('renders an em-dash for the approval rate when no decided transactions exist', () => {
    mocks.usePaymentsSummary.mockReturnValue({
      data: { ...summaryFixture, approvedCount: 0, declinedCount: 0 },
      isLoading: false,
    });
    renderWithProviders(<TransactionsPage />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders the table with the items returned by the listing hook', () => {
    renderWithProviders(<TransactionsPage />);
    expect(screen.getByText('Visa •••• 4242')).toBeInTheDocument();
  });

  it('opens the detail drawer when a row is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TransactionsPage />);
    // Drawer title not in the DOM until open
    expect(screen.queryByText(itemFixture.id)).not.toBeInTheDocument();

    await user.click(screen.getByText('Visa •••• 4242'));
    // The drawer renders the full ID (not truncated)
    expect(screen.getByText(itemFixture.id)).toBeInTheDocument();
  });

  it('triggers exportPaymentsCsv when the export button is clicked', async () => {
    mocks.exportPaymentsCsv.mockResolvedValue(new Blob(['csv'], { type: 'text/csv' }));
    // jsdom/happy-dom don't implement createObjectURL out of the box.
    const createObjectURL = vi.fn().mockReturnValue('blob:fake');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(window.URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    });

    const user = userEvent.setup();
    renderWithProviders(<TransactionsPage />);
    await user.click(screen.getByRole('button', { name: /exportar csv/i }));

    expect(mocks.exportPaymentsCsv).toHaveBeenCalled();
  });

  it('renders skeletons while the summary is loading', () => {
    mocks.usePaymentsSummary.mockReturnValue({ data: undefined, isLoading: true });
    const { container } = renderWithProviders(<TransactionsPage />);
    // 4 skeleton cards => multiple MUI Skeleton elements
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });
});
