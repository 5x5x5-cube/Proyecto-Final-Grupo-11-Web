import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ConfirmationSidebar from './ConfirmationSidebar';

const mockPricing = {
  pricePerNight: 250000,
  nights: 2,
  subtotal: 500000,
  taxes: 95000,
  total: 595000,
  currency: 'COP',
};

vi.mock('@/api/hooks/usePayments', () => ({
  usePaymentStatus: () => ({
    data: {
      paymentId: 'pay-1',
      status: 'approved',
      paymentMethod: { displayLabel: 'Visa •••• 4242' },
      amount: 595000,
      currency: 'COP',
    },
  }),
}));

vi.mock('@/api/hooks/useCart', () => ({
  useCart: () => ({
    data: {
      id: 'cart-1',
      hotelName: 'Hotel Test',
      roomName: 'Standard',
      location: 'Bogota, Colombia',
      roomFeatures: 'Vista al mar',
      checkIn: '2026-05-01',
      checkOut: '2026-05-03',
      guests: 2,
      pricing: mockPricing,
    },
    pricing: mockPricing,
  }),
}));

describe('ConfirmationSidebar', () => {
  it('renders sidebar title', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText(/detalle de tu reserva/i)).toBeInTheDocument();
  });

  it('renders hotel name from cart', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText('Hotel Test')).toBeInTheDocument();
  });

  it('renders location', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText('Bogota, Colombia')).toBeInTheDocument();
  });

  it('renders check-in and check-out labels', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText(/llegada/i)).toBeInTheDocument();
    expect(screen.getByText(/salida/i)).toBeInTheDocument();
  });

  it('renders payment success pill', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText(/pago exitoso/i)).toBeInTheDocument();
  });

  it('renders payment method label', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText('Visa •••• 4242')).toBeInTheDocument();
  });

  it('renders next steps section', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText(/proximos pasos/i)).toBeInTheDocument();
  });
});
