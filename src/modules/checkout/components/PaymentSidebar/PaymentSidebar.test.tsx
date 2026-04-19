import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import PaymentSidebar from './PaymentSidebar';
import type { NormalizedCart, CartPricing } from '../../types';

const mockPricing: CartPricing = {
  pricePerNight: 250000,
  nights: 2,
  subtotal: 500000,
  taxes: 95000,
  total: 595000,
  currency: 'COP',
};

const mockCart: NormalizedCart = {
  id: 'cart-1',
  userId: 'user-1',
  roomId: 'room-1',
  hotelId: 'hotel-1',
  hotelName: 'Hotel Caribe Plaza',
  roomName: 'Standard',
  checkIn: '2026-05-01',
  checkOut: '2026-05-03',
  guests: 2,
  createdAt: '2026-04-01T00:00:00Z',
  pricing: mockPricing,
};

describe('PaymentSidebar', () => {
  it('renders hotel name from cart', () => {
    renderWithProviders(
      <PaymentSidebar
        cart={mockCart}
        pricing={mockPricing}
        isFormValid
        onPay={() => {}}
        isProcessing={false}
      />
    );

    expect(screen.getByText('Hotel Caribe Plaza')).toBeInTheDocument();
  });

  it('renders total price', () => {
    renderWithProviders(
      <PaymentSidebar
        cart={mockCart}
        pricing={mockPricing}
        isFormValid
        onPay={() => {}}
        isProcessing={false}
      />
    );

    expect(screen.getAllByText(/595/).length).toBeGreaterThanOrEqual(1);
  });

  it('disables pay button when form is invalid', () => {
    renderWithProviders(
      <PaymentSidebar
        cart={mockCart}
        pricing={mockPricing}
        isFormValid={false}
        onPay={() => {}}
        isProcessing={false}
      />
    );

    const button = screen.getByRole('button', { name: /pagar/i });
    expect(button).toBeDisabled();
  });

  it('shows spinner when processing', () => {
    renderWithProviders(
      <PaymentSidebar
        cart={mockCart}
        pricing={mockPricing}
        isFormValid
        onPay={() => {}}
        isProcessing
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls onPay when button is clicked', async () => {
    const onPay = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <PaymentSidebar
        cart={mockCart}
        pricing={mockPricing}
        isFormValid
        onPay={onPay}
        isProcessing={false}
      />
    );

    await user.click(screen.getByRole('button', { name: /pagar/i }));
    expect(onPay).toHaveBeenCalledOnce();
  });
});
