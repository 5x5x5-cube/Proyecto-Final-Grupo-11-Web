import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import BookingNextSteps from './BookingNextSteps';

describe('BookingNextSteps', () => {
  it('renders voucher + pending step for pending status', () => {
    renderWithProviders(<BookingNextSteps status="pending" />);

    expect(screen.getByText(/voucher enviado/i)).toBeInTheDocument();
    expect(screen.getByText(/pendiente de confirmacion/i)).toBeInTheDocument();
  });

  it('renders voucher + room reserved for confirmed status', () => {
    renderWithProviders(
      <BookingNextSteps status="confirmed" hotelName="Hotel Test" roomName="Suite" />
    );

    expect(screen.getByText(/voucher enviado/i)).toBeInTheDocument();
    expect(screen.getByText(/habitacion reservada/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotel Test/)).toBeInTheDocument();
    expect(screen.getByText(/Suite/)).toBeInTheDocument();
  });

  it('renders rejection message for rejected status', () => {
    renderWithProviders(<BookingNextSteps status="rejected" />);

    expect(screen.getByText(/reserva no confirmada/i)).toBeInTheDocument();
    expect(screen.getByText(/reembolso/i)).toBeInTheDocument();
    // Should not show voucher for rejected
    expect(screen.queryByText(/voucher enviado/i)).not.toBeInTheDocument();
  });

  it('renders cancellation message for cancelled status', () => {
    renderWithProviders(<BookingNextSteps status="cancelled" />);

    expect(screen.getByText(/reserva cancelada/i)).toBeInTheDocument();
    expect(screen.getByText(/reembolso/i)).toBeInTheDocument();
  });

  it('renders nothing for unknown status', () => {
    const { container } = renderWithProviders(<BookingNextSteps status="unknown" />);

    expect(container.innerHTML).toBe('');
  });
});
