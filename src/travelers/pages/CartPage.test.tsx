import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/renderWithProviders';
import CartPage from './CartPage';

// Mock hooks
const mockMutate = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/api/hooks/useCart', () => ({
  useCart: vi.fn(() => ({
    data: {
      items: [
        {
          roomId: 'b1000000-0000-0000-0000-000000000001',
          hotelId: 'a1000000-0000-0000-0000-000000000001',
          hotelName: 'Hotel Test',
          location: 'Cartagena, Colombia',
          rating: 4.5,
          reviewCount: 100,
          hotelType: 'Hotel · 5 estrellas',
          roomName: 'Suite',
          roomFeatures: '1 cama King · Vista al mar',
          pricePerNight: 300000,
          checkIn: '2026-04-10',
          checkOut: '2026-04-12',
          guests: 2,
          nights: 2,
        },
      ],
    },
    isLoading: false,
  })),
}));

vi.mock('@/api/hooks/useBookings', () => ({
  useCreateBooking: vi.fn(() => ({
    mutate: mockMutate,
    isPending: false,
  })),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mock the skeleton to avoid rendering complexities
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

  it('renders price breakdown with calculated values', () => {
    renderWithProviders(<CartPage />);

    // Total: 300000 * 2 * 1.19 = 714000
    expect(screen.getByText(/714/)).toBeInTheDocument();
  });

  it('calls createBooking.mutate with cart data on continue click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartPage />);

    // Find the continue button (inside CartSidebar)
    const buttons = screen.getAllByRole('button');
    const continueButton = buttons.find(b => !b.hasAttribute('disabled') && b.textContent !== '');
    if (continueButton) {
      await user.click(continueButton);
    }

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          roomId: 'b1000000-0000-0000-0000-000000000001',
          hotelId: 'a1000000-0000-0000-0000-000000000001',
          checkIn: '2026-04-10',
          checkOut: '2026-04-12',
          guests: 2,
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  it('renders guest info section', () => {
    renderWithProviders(<CartPage />);

    // TODO: hardcoded guest for now
    expect(screen.getByText('Carlos Martinez')).toBeInTheDocument();
  });

  it('renders cancellation policy section', () => {
    renderWithProviders(<CartPage />);

    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });
});
