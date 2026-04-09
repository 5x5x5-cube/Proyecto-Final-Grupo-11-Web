import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import HomePage from './HomePage';

vi.mock('@/api/hooks/useSearch', () => ({
  useDestinations: vi.fn(() => ({
    data: [],
    isLoading: false,
  })),
}));

describe('HomePage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HomePage />);
  });
});
