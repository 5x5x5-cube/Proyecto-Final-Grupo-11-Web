import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import SyncingBanner from './SyncingBanner';

describe('SyncingBanner', () => {
  it('renders nothing when not visible', () => {
    const { container } = renderWithProviders(<SyncingBanner visible={false} />);
    expect(container.querySelector('[class*="BannerRoot"]')).toBeNull();
  });

  it('renders spinner and text when visible', () => {
    renderWithProviders(<SyncingBanner visible />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
