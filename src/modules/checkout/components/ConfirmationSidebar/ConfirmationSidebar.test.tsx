import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ConfirmationSidebar from './ConfirmationSidebar';

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

vi.mock('@/api/hooks/useBookings', () => ({
  useBookingByPaymentId: () => ({
    data: {
      id: 'bk-1',
      code: 'BK-12345678',
      hotelId: 'hotel-1',
      roomId: 'room-1',
      checkIn: '2026-05-01',
      checkOut: '2026-05-03',
      guests: 2,
      totalPrice: 595000,
      currency: 'COP',
    },
  }),
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useHotelDetail: () => ({
    data: {
      name: 'Hotel Test',
      city: 'Bogota',
      country: 'Colombia',
      rating: 4.5,
    },
  }),
}));

describe('ConfirmationSidebar', () => {
  it('renders sidebar title', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText(/detalle de tu reserva/i)).toBeInTheDocument();
  });

  it('renders hotel name from hotel detail', () => {
    renderWithProviders(<ConfirmationSidebar paymentId="pay-1" />);
    expect(screen.getByText('Hotel Test')).toBeInTheDocument();
  });

  it('renders location from hotel detail', () => {
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
