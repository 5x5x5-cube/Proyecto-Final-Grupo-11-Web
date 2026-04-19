import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import ReservationFilterBar from './ReservationFilterBar';

describe('ReservationFilterBar', () => {
  const defaultProps = {
    activeStatus: '',
    searchCode: '',
    onStatusChange: vi.fn(),
    onSearchChange: vi.fn(),
    onClear: vi.fn(),
  };

  it('renders all filter chips', () => {
    renderWithProviders(<ReservationFilterBar {...defaultProps} />);

    expect(screen.getAllByText(/todas/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/confirmadas/i)).toBeInTheDocument();
    expect(screen.getByText(/pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/canceladas/i)).toBeInTheDocument();
  });

  it('calls onStatusChange when a filter is clicked', async () => {
    const onStatusChange = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<ReservationFilterBar {...defaultProps} onStatusChange={onStatusChange} />);

    await user.click(screen.getByText(/pendientes/i));
    expect(onStatusChange).toHaveBeenCalledWith('pending');
  });
});
