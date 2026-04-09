import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import RatingBadge from './RatingBadge';

describe('RatingBadge', () => {
  it('renders without crashing', () => {
    renderWithProviders(<RatingBadge rating={4.5} />);
  });

  it('renders the rating formatted to one decimal place', () => {
    renderWithProviders(<RatingBadge rating={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders integer rating with one decimal place', () => {
    renderWithProviders(<RatingBadge rating={5} />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('renders zero rating', () => {
    renderWithProviders(<RatingBadge rating={0} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('renders a low rating', () => {
    renderWithProviders(<RatingBadge rating={2.3} />);
    expect(screen.getByText('2.3')).toBeInTheDocument();
  });

  it('renders a maximum rating', () => {
    renderWithProviders(<RatingBadge rating={10} />);
    expect(screen.getByText('10.0')).toBeInTheDocument();
  });
});
