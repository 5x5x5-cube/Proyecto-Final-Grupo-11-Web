import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import StatusChip from './StatusChip';

describe('StatusChip', () => {
  it('renders without crashing', () => {
    renderWithProviders(<StatusChip status="confirmed" />);
  });

  it('renders with confirmed status', () => {
    renderWithProviders(<StatusChip status="confirmed" />);
    const chip = screen.getByText(/confirmed|confirmad/i);
    expect(chip).toBeInTheDocument();
  });

  it('renders with pending status', () => {
    renderWithProviders(<StatusChip status="pending" />);
    const chip = screen.getByText(/pending|pendiente/i);
    expect(chip).toBeInTheDocument();
  });

  it('renders with cancelled status', () => {
    renderWithProviders(<StatusChip status="cancelled" />);
    const chip = screen.getByText(/cancelled|cancelad/i);
    expect(chip).toBeInTheDocument();
  });

  it('renders with past status', () => {
    renderWithProviders(<StatusChip status="past" />);
    const chip = screen.getByText(/past|pasad/i);
    expect(chip).toBeInTheDocument();
  });

  it('renders a custom label when provided', () => {
    renderWithProviders(<StatusChip status="confirmed" label="Approved" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('uses the custom label over the default translation', () => {
    renderWithProviders(<StatusChip status="pending" label="Awaiting" />);
    expect(screen.getByText('Awaiting')).toBeInTheDocument();
    expect(screen.queryByText(/pendiente/i)).not.toBeInTheDocument();
  });
});
