import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import CheckoutStepper from './CheckoutStepper';

describe('CheckoutStepper', () => {
  it('renders without crashing', () => {
    renderWithProviders(<CheckoutStepper currentStep={1} />);
  });

  it('renders all four step labels', () => {
    renderWithProviders(<CheckoutStepper currentStep={1} />);
    // The stepper always renders 4 steps
    const stepNumbers = screen.getAllByText(/\d/);
    expect(stepNumbers.length).toBeGreaterThanOrEqual(4);
  });

  it('renders step 1 as active when currentStep is 1', () => {
    renderWithProviders(<CheckoutStepper currentStep={1} />);
    // Step number 1 should be visible (not replaced by a check icon)
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders steps before current as done (shows check icons)', () => {
    renderWithProviders(<CheckoutStepper currentStep={3} />);
    // Steps 1 and 2 are done — their numbers should not be rendered as text
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    // Step 3 is current
    expect(screen.getByText('3')).toBeInTheDocument();
    // Step 4 is upcoming
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders all step numbers when currentStep is 1', () => {
    renderWithProviders(<CheckoutStepper currentStep={1} />);
    // Only step 1 visible as number (active), steps 2-4 as numbers (upcoming)
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders with currentStep at the last step', () => {
    renderWithProviders(<CheckoutStepper currentStep={4} />);
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
