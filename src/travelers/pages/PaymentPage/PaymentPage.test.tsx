import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentPage from './PaymentPage';

const mocks = vi.hoisted(() => ({
  tokenizeMutate: vi.fn(),
  initiateMutate: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mocks.navigate,
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/api/hooks/usePayments', () => ({
  useTokenize: () => ({ mutate: mocks.tokenizeMutate, isPending: false }),
  useInitiatePayment: () => ({ mutate: mocks.initiateMutate, isPending: false }),
  usePaymentStatus: () => ({ data: undefined, isLoading: false }),
}));

describe('PaymentPage', () => {
  beforeEach(() => {
    mocks.tokenizeMutate.mockReset();
    mocks.initiateMutate.mockReset();
    mocks.navigate.mockReset();
  });

  it('renders the three payment method tabs with card selected by default', () => {
    renderWithProviders(<PaymentPage />);

    const radiogroup = screen.getByRole('radiogroup', { name: /metodo de pago/i });
    const tabs = within(radiogroup).getAllByRole('radio');

    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-checked', 'true');
    expect(tabs[1]).toHaveAttribute('aria-checked', 'false');
    expect(tabs[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('switches to the wallet form when the wallet tab is selected', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentPage />);

    await user.click(screen.getByRole('radio', { name: /billetera digital/i }));

    expect(screen.getByText(/proveedor de billetera/i)).toBeInTheDocument();
    expect(screen.queryByText(/numero de tarjeta/i)).not.toBeInTheDocument();
  });

  it('switches to the transfer form when the transfer tab is selected', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentPage />);

    await user.click(screen.getByRole('radio', { name: /transferencia/i }));

    expect(screen.getByText(/titular de la cuenta/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ingrese su numero de cuenta/i)).toBeInTheDocument();
    expect(screen.queryByText(/numero de tarjeta/i)).not.toBeInTheDocument();
  });

  it('keeps the pay button disabled while the active form is invalid', () => {
    renderWithProviders(<PaymentPage />);

    const payButton = screen.getByRole('button', { name: /pagar/i });
    expect(payButton).toBeDisabled();
  });

  it('dispatches a digital_wallet tokenize payload when the wallet form is valid', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentPage />);

    await user.click(screen.getByRole('radio', { name: /billetera digital/i }));

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'paypal' } });

    const emailInput = screen.getByPlaceholderText(/tu@ejemplo.com/i);
    await user.type(emailInput, 'buyer@example.com');

    const payButton = screen.getByRole('button', { name: /pagar/i });
    expect(payButton).not.toBeDisabled();
    await user.click(payButton);

    expect(mocks.tokenizeMutate).toHaveBeenCalledTimes(1);
    const [payload] = mocks.tokenizeMutate.mock.calls[0];
    expect(payload).toEqual({
      method: 'digital_wallet',
      walletProvider: 'paypal',
      walletEmail: 'buyer@example.com',
    });
  });

  it('dispatches a transfer tokenize payload when the transfer form is valid', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentPage />);

    await user.click(screen.getByRole('radio', { name: /transferencia/i }));

    const [bankSelect] = screen.getAllByRole('combobox');
    fireEvent.change(bankSelect, { target: { value: '007' } });

    await user.type(screen.getByPlaceholderText(/ingrese su numero de cuenta/i), '1234567');
    await user.type(screen.getByPlaceholderText(/nombre completo del titular/i), 'Ada Lovelace');

    const payButton = screen.getByRole('button', { name: /pagar/i });
    expect(payButton).not.toBeDisabled();
    await user.click(payButton);

    expect(mocks.tokenizeMutate).toHaveBeenCalledTimes(1);
    const [payload] = mocks.tokenizeMutate.mock.calls[0];
    expect(payload).toEqual({
      method: 'transfer',
      bankCode: '007',
      accountNumber: '1234567',
      accountHolder: 'Ada Lovelace',
    });
  });
});
