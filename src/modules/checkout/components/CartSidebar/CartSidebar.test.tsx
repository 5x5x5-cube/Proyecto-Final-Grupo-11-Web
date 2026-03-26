import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import CartSidebar from './CartSidebar';
import type { CartPriceBreakdown } from '../types';

const mockBreakdown: CartPriceBreakdown = {
  pricePerNight: 250000,
  nights: 2,
  basePrice: 500000,
  vat: 95000,
  serviceFee: 0,
  totalPrice: 595000,
};

describe('CartSidebar', () => {
  it('renders price breakdown values', () => {
    renderWithProviders(
      <CartSidebar priceBreakdown={mockBreakdown} isPending={false} onContinue={() => {}} />
    );

    expect(screen.getByText(/595/)).toBeInTheDocument();
  });

  it('calls onContinue when button is clicked', async () => {
    const onContinue = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <CartSidebar priceBreakdown={mockBreakdown} isPending={false} onContinue={onContinue} />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onContinue).toHaveBeenCalledOnce();
  });

  it('disables button and shows spinner when isPending', () => {
    renderWithProviders(
      <CartSidebar priceBreakdown={mockBreakdown} isPending={true} onContinue={() => {}} />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not show spinner when not pending', () => {
    renderWithProviders(
      <CartSidebar priceBreakdown={mockBreakdown} isPending={false} onContinue={() => {}} />
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
