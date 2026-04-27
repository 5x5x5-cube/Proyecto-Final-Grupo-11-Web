import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentMethodForm from './PaymentMethodForm';

describe('PaymentMethodForm', () => {
  it('renders three method tabs with card selected by default', () => {
    renderWithProviders(<PaymentMethodForm ref={null} onValidityChange={() => {}} />);

    const tabs = screen.getAllByRole('radio');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-checked', 'true');
  });

  it('switches to wallet form when wallet tab is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentMethodForm ref={null} onValidityChange={() => {}} />);

    await user.click(screen.getByRole('radio', { name: /billetera digital/i }));
    expect(screen.getByText(/proveedor de billetera/i)).toBeInTheDocument();
    expect(screen.queryByText(/numero de tarjeta/i)).not.toBeInTheDocument();
  });

  it('switches to transfer form when transfer tab is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentMethodForm ref={null} onValidityChange={() => {}} />);

    await user.click(screen.getByRole('radio', { name: /transferencia/i }));
    expect(screen.getByPlaceholderText(/ingrese su numero de cuenta/i)).toBeInTheDocument();
  });

  it('calls onValidityChange when form becomes valid', async () => {
    const onValidityChange = vi.fn();
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentMethodForm ref={null} onValidityChange={onValidityChange} />);

    // Fill valid card form (4242... passes Luhn)
    await user.type(screen.getByPlaceholderText('1234 5678 9012 3456'), '4242424242424242');
    await user.type(screen.getAllByRole('textbox')[1], 'Test User');
    await user.type(screen.getByPlaceholderText('MM/AA'), '1228');
    await user.type(screen.getByPlaceholderText('•••'), '123');

    expect(onValidityChange).toHaveBeenCalledWith(true);
  });

  it('shows card number error for invalid Luhn', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<PaymentMethodForm ref={null} onValidityChange={() => {}} />);

    await user.type(screen.getByPlaceholderText('1234 5678 9012 3456'), '1233233234324323');

    expect(screen.getByText(/numero de tarjeta invalido/i)).toBeInTheDocument();
  });
});
