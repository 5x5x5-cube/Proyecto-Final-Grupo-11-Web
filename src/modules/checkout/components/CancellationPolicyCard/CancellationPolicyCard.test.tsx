import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import CancellationPolicyCard from './CancellationPolicyCard';

describe('CancellationPolicyCard', () => {
  it('renders all three policy lines', () => {
    renderWithProviders(<CancellationPolicyCard />);

    // Free cancellation line
    expect(screen.getByText(/gratuita|free/i)).toBeInTheDocument();
    // Half charge line
    expect(screen.getByText(/50%/)).toBeInTheDocument();
    // No refund line
    expect(screen.getByText(/sin reembolso|no refund/i)).toBeInTheDocument();
  });
});
