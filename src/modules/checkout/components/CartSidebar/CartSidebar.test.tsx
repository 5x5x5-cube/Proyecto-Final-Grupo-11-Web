import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import CartSidebar from './CartSidebar';
import type { Cart } from '../../types';

const mockCart: Cart = {
  id: 1,
  userId: 1,
  roomId: 1,
  hotelId: 1,
  hotelName: 'Hotel Test',
  roomName: 'Standard',
  pricePerNight: 250000,
  checkIn: '2026-04-01',
  checkOut: '2026-04-03',
  guests: 2,
  nights: 2,
  subtotal: 500000,
  vat: 95000,
  serviceFee: 0,
  total: 595000,
  createdAt: '2026-03-26T00:00:00Z',
};

describe('CartSidebar', () => {
  it('renders total from cart', () => {
    renderWithProviders(<CartSidebar cart={mockCart} isPending={false} onContinue={() => {}} />);

    expect(screen.getByText(/595/)).toBeInTheDocument();
  });

  it('calls onContinue when button is clicked', async () => {
    const onContinue = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<CartSidebar cart={mockCart} isPending={false} onContinue={onContinue} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onContinue).toHaveBeenCalledOnce();
  });

  it('disables button and shows spinner when isPending', () => {
    renderWithProviders(<CartSidebar cart={mockCart} isPending={true} onContinue={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not show spinner when not pending', () => {
    renderWithProviders(<CartSidebar cart={mockCart} isPending={false} onContinue={() => {}} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
