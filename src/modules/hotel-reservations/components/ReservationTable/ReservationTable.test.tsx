import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReservationTable from './ReservationTable';
import type { HotelBooking } from '@/api/hooks/useHotelBookings';

const mockReservations: HotelBooking[] = [
  {
    id: '1',
    code: 'BK-001',
    guest: 'Carlos Martinez',
    email: 'carlos@test.com',
    initials: 'CM',
    avatarColor: 'teal',
    room: '—',
    roomType: '',
    checkIn: '2026-05-01',
    checkOut: '2026-05-03',
    nights: 2,
    status: 'pending',
    total: 'COP 595000',
    totalCop: 595000,
    paymentMethod: 'card',
  },
];

describe('ReservationTable', () => {
  const defaultProps = {
    reservations: mockReservations,
    currentPage: 1,
    totalPages: 3,
    total: 25,
    itemsPerPage: 10,
    onPageChange: vi.fn(),
  };

  it('renders booking code', () => {
    renderWithProviders(<ReservationTable {...defaultProps} />);
    expect(screen.getByText('BK-001')).toBeInTheDocument();
  });

  it('renders guest name', () => {
    renderWithProviders(<ReservationTable {...defaultProps} />);
    expect(screen.getByText('Carlos Martinez')).toBeInTheDocument();
  });

  it('renders pagination buttons', () => {
    renderWithProviders(<ReservationTable {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onPageChange when page button is clicked', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<ReservationTable {...defaultProps} onPageChange={onPageChange} />);

    await user.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
