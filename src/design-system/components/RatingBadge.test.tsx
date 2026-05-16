import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import RatingBadge from './RatingBadge';

describe('RatingBadge', () => {
  it('renders the rating formatted to one decimal place', () => {
    renderWithProviders(<RatingBadge rating={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders integer rating with one decimal place', () => {
    renderWithProviders(<RatingBadge rating={5} />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('renders no stars by default', () => {
    const { container } = renderWithProviders(<RatingBadge rating={4.2} />);
    expect(container.textContent).toBe('4.2');
  });

  it('renders a single star with showStars="single"', () => {
    const { container } = renderWithProviders(<RatingBadge rating={4.2} showStars="single" />);
    expect(container.textContent).toBe('4.2★');
  });

  it('renders full stars with partial for showStars="full"', () => {
    const { container } = renderWithProviders(<RatingBadge rating={4.2} showStars="full" />);
    // 4 full + 1 partial + 0 empty = content includes rating + stars
    const stars = container.querySelectorAll('span');
    expect(stars.length).toBeGreaterThan(1);
  });

  it('renders 5 full stars for rating 5', () => {
    const { container } = renderWithProviders(<RatingBadge rating={5} showStars="full" />);
    expect(container.textContent).toContain('5.0');
    expect(container.textContent).toContain('★★★★★');
  });
});
