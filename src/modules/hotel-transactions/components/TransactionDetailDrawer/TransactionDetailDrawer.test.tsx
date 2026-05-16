import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import TransactionDetailDrawer from './TransactionDetailDrawer';
import type { PaymentListItem } from '@/api/hooks/useAdminPayments';

const approvedItem: PaymentListItem = {
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

const declinedItem: PaymentListItem = {
  ...approvedItem,
  id: '00000000-0000-0000-0000-000000000002',
  status: 'declined',
  errorCode: 'insufficient_funds',
};

describe('TransactionDetailDrawer', () => {
  it('does not render the body when no item is selected', () => {
    renderWithProviders(<TransactionDetailDrawer item={null} open={false} onClose={vi.fn()} />);
    // The drawer's title only appears when open
    expect(screen.queryByText(/detalle de transaccion/i)).not.toBeInTheDocument();
  });

  it('renders the full id and userId (no truncation) when an item is selected', () => {
    renderWithProviders(
      <TransactionDetailDrawer item={approvedItem} open={true} onClose={vi.fn()} />
    );
    expect(screen.getByText(approvedItem.id)).toBeInTheDocument();
    expect(screen.getByText(approvedItem.userId)).toBeInTheDocument();
    expect(screen.getByText(/visa •••• 4242/i)).toBeInTheDocument();
    expect(screen.getByText(approvedItem.transactionId!)).toBeInTheDocument();
  });

  it('does not show the decline-reason box for an approved transaction', () => {
    renderWithProviders(
      <TransactionDetailDrawer item={approvedItem} open={true} onClose={vi.fn()} />
    );
    expect(screen.queryByText(/motivo de rechazo/i)).not.toBeInTheDocument();
  });

  it('shows the decline reason when status is declined', () => {
    renderWithProviders(
      <TransactionDetailDrawer item={declinedItem} open={true} onClose={vi.fn()} />
    );
    expect(screen.getByText(/motivo de rechazo/i)).toBeInTheDocument();
    expect(screen.getByText(/insufficient_funds/)).toBeInTheDocument();
  });

  it('shows a fallback when a declined transaction has no error code', () => {
    renderWithProviders(
      <TransactionDetailDrawer
        item={{ ...declinedItem, errorCode: null }}
        open={true}
        onClose={vi.fn()}
      />
    );
    expect(screen.getByText(/sin motivo registrado/i)).toBeInTheDocument();
  });

  it('shows two history events for a decided transaction (created + processed)', () => {
    renderWithProviders(
      <TransactionDetailDrawer item={approvedItem} open={true} onClose={vi.fn()} />
    );
    // "Procesando" appears once (history event for createdAt)
    expect(screen.getAllByText(/procesando/i).length).toBeGreaterThanOrEqual(1);
    // The decided event appears with the translated status
    expect(screen.getAllByText(/aprobada/i).length).toBeGreaterThanOrEqual(1);
  });

  it('shows only the created event when the transaction is still processing', () => {
    const processing: PaymentListItem = {
      ...approvedItem,
      status: 'processing',
      processedAt: null,
    };
    renderWithProviders(
      <TransactionDetailDrawer item={processing} open={true} onClose={vi.fn()} />
    );
    // No "Aprobada" event since the transaction has not been decided
    expect(screen.queryByText(/aprobada/i)).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <TransactionDetailDrawer item={approvedItem} open={true} onClose={onClose} />
    );
    await user.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
