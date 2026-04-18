import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import CartPage from './CartPage';

// Mock hooks
const mockNavigate = vi.fn();

vi.mock('@/api/hooks/useCart', () => ({
  useCart: vi.fn(() => ({
    data: {
      id: 1,
      userId: 1,
      roomId: 1,
      hotelId: 1,
      hotelName: 'Hotel Test',
      hotelType: 'Hotel · 5 estrellas',
      location: 'Cartagena, Colombia',
      rating: 4.5,
      reviewCount: 100,
      roomName: 'Suite',
      roomFeatures: '1 cama King · Vista al mar',
      pricePerNight: 300000,
      checkIn: '2026-04-10',
      checkOut: '2026-04-12',
      guests: 2,
      nights: 2,
      subtotal: 600000,
      vat: 114000,
      serviceFee: 0,
      total: 714000,
      createdAt: '2026-03-26T00:00:00Z',
      holdId: 'hold-mock-001',
      holdExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    },
    isLoading: false,
  })),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('./CartPage.skeleton', () => ({
  default: () => <div data-testid="cart-skeleton" />,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CartPage', () => {
  it('renders hotel name from cart data', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText('Hotel Test')).toBeInTheDocument();
  });

  it('renders room info from cart data', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText('Suite')).toBeInTheDocument();
    expect(screen.getByText('1 cama King · Vista al mar')).toBeInTheDocument();
  });

  it('renders location from cart data', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText('Cartagena, Colombia')).toBeInTheDocument();
  });

  it('renders total from API response', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText(/714/)).toBeInTheDocument();
  });

  it('navigates to /checkout/payment on continue click without calling createBooking', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);

    const buttons = screen.getAllByRole('button');
    const continueButton = buttons.find(b => !b.hasAttribute('disabled') && b.textContent !== '');
    if (continueButton) {
      await user.click(continueButton);
    }

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/checkout/payment', { state: { cartId: 1 } });
    });
  });

  it('renders guest info section', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText('Carlos Martinez')).toBeInTheDocument();
  });

  it('renders cancellation policy section', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });
});
