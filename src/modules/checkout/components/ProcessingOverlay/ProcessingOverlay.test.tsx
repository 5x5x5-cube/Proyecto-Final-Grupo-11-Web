import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ProcessingOverlay from './ProcessingOverlay';

describe('ProcessingOverlay', () => {
  it('renders nothing when not visible', () => {
    const { container } = renderWithProviders(<ProcessingOverlay visible={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders spinner when visible', () => {
    renderWithProviders(<ProcessingOverlay visible />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
