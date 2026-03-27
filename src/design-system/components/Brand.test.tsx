import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import Brand from './Brand';

describe('Brand', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Brand />);
  });

  it('renders the brand text containing Hub', () => {
    renderWithProviders(<Brand />);
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('renders the Travel portion', () => {
    renderWithProviders(<Brand />);
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });

  it('renders with nav variant by default', () => {
    renderWithProviders(<Brand />);
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('renders with hero variant', () => {
    renderWithProviders(<Brand variant="hero" />);
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('accepts a custom size', () => {
    renderWithProviders(<Brand size={32} />);
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });
});
