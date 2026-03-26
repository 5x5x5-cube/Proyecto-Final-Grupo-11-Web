import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import FilterChip from './FilterChip';

describe('FilterChip', () => {
  it('renders without crashing', () => {
    renderWithProviders(<FilterChip label="Wifi" />);
  });

  it('renders the label text', () => {
    renderWithProviders(<FilterChip label="Pool" />);
    expect(screen.getByText('Pool')).toBeInTheDocument();
  });

  it('renders unselected by default', () => {
    renderWithProviders(<FilterChip label="Spa" />);
    expect(screen.getByText('Spa')).toBeInTheDocument();
  });

  it('renders selected state when selected prop is true', () => {
    renderWithProviders(<FilterChip label="Gym" selected />);
    expect(screen.getByText('Gym')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<FilterChip label="Parking" onClick={onClick} />);

    await user.click(screen.getByText('Parking'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders with an icon node', () => {
    renderWithProviders(<FilterChip label="Bar" icon={<span data-testid="chip-icon" />} />);
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('renders without an icon when icon prop is omitted', () => {
    renderWithProviders(<FilterChip label="Restaurant" />);
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });
});
