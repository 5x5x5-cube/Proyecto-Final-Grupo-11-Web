import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import TransactionsTable from './TransactionsTable';
import type { PaymentListItem } from '@/api/hooks/useAdminPayments';

const baseItem: PaymentListItem = {
  id: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  userId: '11111111-2222-3333-4444-555555555555',
  amount: 250000,
  currency: 'COP',
  method: 'credit_card',
  methodLabel: 'Visa •••• 4242',
  status: 'approved',
  transactionId: 'txn_abc123',
  errorCode: null,
  createdAt: '2026-04-15T10:30:00Z',
  processedAt: '2026-04-15T10:30:05Z',
};

describe('TransactionsTable', () => {
  const defaults = {
    items: [],
    isLoading: false,
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
    onPageChange: vi.fn(),
  };

  it('renders the table headers', () => {
    renderWithProviders(<TransactionsTable {...defaults} />);
    expect(screen.getByText(/^id$/i)).toBeInTheDocument();
    expect(screen.getByText(/^fecha$/i)).toBeInTheDocument();
    expect(screen.getByText(/^viajero$/i)).toBeInTheDocument();
    expect(screen.getByText(/^metodo$/i)).toBeInTheDocument();
    expect(screen.getByText(/^monto$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^estado$/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the empty-state message when items is empty and not loading', () => {
    renderWithProviders(<TransactionsTable {...defaults} />);
    expect(screen.getByText(/no hay transacciones que coincidan/i)).toBeInTheDocument();
  });

  it('renders one row per item with a truncated id and the method label', () => {
    renderWithProviders(
      <TransactionsTable {...defaults} items={[baseItem]} total={1} totalPages={1} />
    );
    // Truncated UUID (first 8 chars + ellipsis)
    expect(screen.getByText(/aaaaaaaa…/)).toBeInTheDocument();
    expect(screen.getByText('Visa •••• 4242')).toBeInTheDocument();
    // Status chip is the localized label
    expect(screen.getByText(/aprobada/i)).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <TransactionsTable
        {...defaults}
        items={[baseItem]}
        total={1}
        totalPages={1}
        onRowClick={onRowClick}
      />
    );

    await user.click(screen.getByText(/aaaaaaaa…/));
    expect(onRowClick).toHaveBeenCalledWith(baseItem);
  });

  it('hides the pagination control when there is only one page', () => {
    renderWithProviders(
      <TransactionsTable {...defaults} items={[baseItem]} total={1} totalPages={1} />
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('calls onPageChange when a different page is selected', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <TransactionsTable
        {...defaults}
        items={[baseItem]}
        total={45}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /go to page 2/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
