import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import PriceBreakdown from './PriceBreakdown';

const baseRows = [
  { label: 'Base price', value: '$500,000' },
  { label: 'VAT (19%)', value: '$95,000' },
];

describe('PriceBreakdown', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <PriceBreakdown rows={baseRows} totalLabel="Total" totalValue="$595,000" />
    );
  });

  it('renders all row labels', () => {
    renderWithProviders(
      <PriceBreakdown rows={baseRows} totalLabel="Total" totalValue="$595,000" />
    );
    expect(screen.getByText('Base price')).toBeInTheDocument();
    expect(screen.getByText('VAT (19%)')).toBeInTheDocument();
  });

  it('renders all row values', () => {
    renderWithProviders(
      <PriceBreakdown rows={baseRows} totalLabel="Total" totalValue="$595,000" />
    );
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('$95,000')).toBeInTheDocument();
  });

  it('renders the total label', () => {
    renderWithProviders(
      <PriceBreakdown rows={baseRows} totalLabel="Grand Total" totalValue="$595,000" />
    );
    expect(screen.getByText('Grand Total')).toBeInTheDocument();
  });

  it('renders the total value', () => {
    renderWithProviders(
      <PriceBreakdown rows={baseRows} totalLabel="Total" totalValue="$595,000" />
    );
    expect(screen.getByText('$595,000')).toBeInTheDocument();
  });

  it('renders with an empty rows array', () => {
    renderWithProviders(<PriceBreakdown rows={[]} totalLabel="Total" totalValue="$0" />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});
