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
  holdId: 'hold-mock-001',
  holdExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
};

describe('CartSidebar', () => {
  it('renders total from cart', () => {
    renderWithProviders(<CartSidebar cart={mockCart} onContinue={() => {}} />);

    expect(screen.getByText(/595/)).toBeInTheDocument();
  });

  it('calls onContinue when button is clicked', async () => {
    const onContinue = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<CartSidebar cart={mockCart} onContinue={onContinue} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onContinue).toHaveBeenCalledOnce();
  });

  it('button is enabled by default', () => {
    renderWithProviders(<CartSidebar cart={mockCart} onContinue={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('does not show spinner', () => {
    renderWithProviders(<CartSidebar cart={mockCart} onContinue={() => {}} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
