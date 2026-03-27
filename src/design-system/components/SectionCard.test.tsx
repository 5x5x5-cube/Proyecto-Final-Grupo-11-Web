import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import SectionCard from './SectionCard';

describe('SectionCard', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <SectionCard icon={<span data-testid="card-icon" />} title="Guest Info">
        <p>Card body</p>
      </SectionCard>
    );
  });

  it('renders the title', () => {
    renderWithProviders(
      <SectionCard icon={<span />} title="Payment Details">
        <p>Content</p>
      </SectionCard>
    );
    expect(screen.getByText('Payment Details')).toBeInTheDocument();
  });

  it('renders the children', () => {
    renderWithProviders(
      <SectionCard icon={<span />} title="Summary">
        <p>Inner content here</p>
      </SectionCard>
    );
    expect(screen.getByText('Inner content here')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderWithProviders(
      <SectionCard icon={<span data-testid="card-icon" />} title="Info">
        <p>Content</p>
      </SectionCard>
    );
    expect(screen.getByTestId('card-icon')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    renderWithProviders(
      <SectionCard icon={<span />} title="Multi">
        <p>First child</p>
        <p>Second child</p>
      </SectionCard>
    );
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });
});
