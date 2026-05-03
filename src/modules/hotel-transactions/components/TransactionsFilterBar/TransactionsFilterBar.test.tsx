import { describe, it, expect, vi } from 'vitest';
import { screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import TransactionsFilterBar from './TransactionsFilterBar';
import { EMPTY_FILTERS } from '@/modules/hotel-transactions/types';

describe('TransactionsFilterBar', () => {
  const defaultProps = {
    filters: EMPTY_FILTERS,
    onChange: vi.fn(),
    onClear: vi.fn(),
  };

  it('renders all six filter controls plus the clear button', () => {
    renderWithProviders(<TransactionsFilterBar {...defaultProps} />);
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/metodo de pago/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^desde$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^hasta$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monto minimo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monto maximo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpiar filtros/i })).toBeInTheDocument();
  });

  it('disables the clear button when no filters are active', () => {
    renderWithProviders(<TransactionsFilterBar {...defaultProps} />);
    expect(screen.getByRole('button', { name: /limpiar filtros/i })).toBeDisabled();
  });

  it('enables the clear button once any filter is set', () => {
    renderWithProviders(
      <TransactionsFilterBar {...defaultProps} filters={{ status: 'approved' }} />
    );
    expect(screen.getByRole('button', { name: /limpiar filtros/i })).toBeEnabled();
  });

  it('calls onChange with the new status when the status select changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<TransactionsFilterBar {...defaultProps} onChange={onChange} />);

    // MUI Select renders a hidden native input under the label — open the listbox first.
    await user.click(screen.getByLabelText(/estado/i));
    const listbox = await screen.findByRole('listbox');
    await user.click(within(listbox).getByText(/aprobada/i));

    expect(onChange).toHaveBeenCalledWith({ status: 'approved' });
  });

  it('clears a filter when the user picks the "Todos" option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <TransactionsFilterBar
        {...defaultProps}
        filters={{ status: 'declined' }}
        onChange={onChange}
      />
    );

    await user.click(screen.getByLabelText(/estado/i));
    const listbox = await screen.findByRole('listbox');
    await user.click(within(listbox).getAllByText(/todos/i)[0]);

    expect(onChange).toHaveBeenCalledWith({ status: undefined });
  });

  it('calls onClear when the clear button is clicked', async () => {
    const onClear = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <TransactionsFilterBar {...defaultProps} filters={{ status: 'approved' }} onClear={onClear} />
    );
    await user.click(screen.getByRole('button', { name: /limpiar filtros/i }));
    expect(onClear).toHaveBeenCalled();
  });

  it('parses an amount input into a number on change', () => {
    const onChange = vi.fn();
    renderWithProviders(<TransactionsFilterBar {...defaultProps} onChange={onChange} />);

    // Single-shot change — the parent doesn't update `filters` between calls
    // in this unit test, so we can't reliably test consecutive edits here.
    fireEvent.change(screen.getByLabelText(/monto minimo/i), { target: { value: '500' } });
    expect(onChange).toHaveBeenLastCalledWith({ amountMin: 500 });
  });

  it('clears the amount filter when the input is emptied', () => {
    const onChange = vi.fn();
    renderWithProviders(
      <TransactionsFilterBar {...defaultProps} filters={{ amountMin: 500 }} onChange={onChange} />
    );

    fireEvent.change(screen.getByLabelText(/monto minimo/i), { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith({ amountMin: undefined });
  });
});
