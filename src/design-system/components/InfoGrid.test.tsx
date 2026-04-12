import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import InfoGrid from './InfoGrid';

const baseItems = [
  { label: 'Check-in', value: '1 Apr 2026' },
  { label: 'Check-out', value: '3 Apr 2026' },
  { label: 'Guests', value: '2' },
];

describe('InfoGrid', () => {
  it('renders without crashing', () => {
    renderWithProviders(<InfoGrid items={baseItems} />);
  });

  it('renders all item labels', () => {
    renderWithProviders(<InfoGrid items={baseItems} />);
    expect(screen.getByText('Check-in')).toBeInTheDocument();
    expect(screen.getByText('Check-out')).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });

  it('renders all item values', () => {
    renderWithProviders(<InfoGrid items={baseItems} />);
    expect(screen.getByText('1 Apr 2026')).toBeInTheDocument();
    expect(screen.getByText('3 Apr 2026')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders sub text when provided', () => {
    const items = [{ label: 'Nights', value: '2', sub: '(approx)' }];
    renderWithProviders(<InfoGrid items={items} />);
    expect(screen.getByText('(approx)')).toBeInTheDocument();
  });

  it('does not render sub text when omitted', () => {
    renderWithProviders(<InfoGrid items={baseItems} />);
    expect(screen.queryByText('(approx)')).not.toBeInTheDocument();
  });

  it('renders with a custom column count', () => {
    renderWithProviders(<InfoGrid items={baseItems} columns={2} />);
    expect(screen.getByText('Check-in')).toBeInTheDocument();
  });

  it('renders an empty grid without crashing', () => {
    renderWithProviders(<InfoGrid items={[]} />);
  });
});
