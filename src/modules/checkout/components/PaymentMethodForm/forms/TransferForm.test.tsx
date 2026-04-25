import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import TransferForm from './TransferForm';
import type { TransferFormProps } from './TransferForm';

function renderTransfer(overrides: Partial<TransferFormProps> = {}) {
  const onBankCodeChange = vi.fn();
  const onAccountNumberChange = vi.fn();
  const onAccountHolderChange = vi.fn();
  const props: TransferFormProps = {
    bankCode: '',
    onBankCodeChange,
    accountNumber: '',
    onAccountNumberChange,
    accountHolder: '',
    onAccountHolderChange,
    ...overrides,
  };
  renderWithProviders(<TransferForm {...props} />);
  return { onBankCodeChange, onAccountNumberChange, onAccountHolderChange };
}

describe('TransferForm', () => {
  it('calls onBankCodeChange when a bank is selected', () => {
    const { onBankCodeChange } = renderTransfer();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '007' } });

    expect(onBankCodeChange).toHaveBeenCalledWith('007');
  });

  it('strips non-digit characters from the account number', () => {
    const { onAccountNumberChange } = renderTransfer();

    fireEvent.change(screen.getByPlaceholderText(/ingrese su numero de cuenta/i), {
      target: { value: 'a1-2b' },
    });

    expect(onAccountNumberChange).toHaveBeenLastCalledWith('12');
  });

  it('limits the account number to 20 digits', () => {
    const { onAccountNumberChange } = renderTransfer();

    fireEvent.change(screen.getByPlaceholderText(/ingrese su numero de cuenta/i), {
      target: { value: '1'.repeat(25) },
    });

    expect(onAccountNumberChange).toHaveBeenCalledWith('1'.repeat(20));
  });

  it('does not show a length error before the field is touched', () => {
    renderTransfer({ accountNumber: '123' });

    expect(screen.queryByText(/al menos 6 digitos/i)).not.toBeInTheDocument();
  });

  it('shows the length error after blur when below the minimum', () => {
    renderTransfer({ accountNumber: '123' });

    const input = screen.getByPlaceholderText(/ingrese su numero de cuenta/i);
    fireEvent.blur(input);

    expect(screen.getByText(/al menos 6 digitos/i)).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('hides the length error for a valid account number', () => {
    renderTransfer({ accountNumber: '1234567' });

    fireEvent.blur(screen.getByPlaceholderText(/ingrese su numero de cuenta/i));

    expect(screen.queryByText(/al menos 6 digitos/i)).not.toBeInTheDocument();
  });

  it('forwards changes to the account holder field', () => {
    const { onAccountHolderChange } = renderTransfer();

    fireEvent.change(screen.getByPlaceholderText(/nombre completo del titular/i), {
      target: { value: 'Ada Lovelace' },
    });

    expect(onAccountHolderChange).toHaveBeenLastCalledWith('Ada Lovelace');
  });
});
