import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import WalletForm from './WalletForm';
import type { WalletFormProps } from './WalletForm';

function renderWallet(overrides: Partial<WalletFormProps> = {}) {
  const onWalletProviderChange = vi.fn();
  const onWalletEmailChange = vi.fn();
  const props: WalletFormProps = {
    walletProvider: '',
    onWalletProviderChange,
    walletEmail: '',
    onWalletEmailChange,
    ...overrides,
  };
  renderWithProviders(<WalletForm {...props} />);
  return { onWalletProviderChange, onWalletEmailChange };
}

describe('WalletForm', () => {
  it('calls onWalletProviderChange when a provider is selected', () => {
    const { onWalletProviderChange } = renderWallet();

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'google_pay' } });

    expect(onWalletProviderChange).toHaveBeenCalledWith('google_pay');
  });

  it('forwards typed characters to onWalletEmailChange', async () => {
    const user = userEvent.setup({ delay: null });
    const { onWalletEmailChange } = renderWallet();

    await user.type(screen.getByPlaceholderText(/tu@ejemplo.com/i), 'a');

    expect(onWalletEmailChange).toHaveBeenLastCalledWith('a');
  });

  it('does not show a validation error while the field is untouched', () => {
    renderWallet({ walletEmail: 'not-an-email' });

    expect(screen.queryByText(/ingrese un correo electronico valido/i)).not.toBeInTheDocument();
  });

  it('shows an invalid-email error after blur when the value is malformed', () => {
    renderWallet({ walletEmail: 'not-an-email' });

    const input = screen.getByPlaceholderText(/tu@ejemplo.com/i);
    fireEvent.blur(input);

    expect(screen.getByText(/ingrese un correo electronico valido/i)).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show the error for a valid email after blur', () => {
    renderWallet({ walletEmail: 'buyer@example.com' });

    fireEvent.blur(screen.getByPlaceholderText(/tu@ejemplo.com/i));

    expect(screen.queryByText(/ingrese un correo electronico valido/i)).not.toBeInTheDocument();
  });
});
