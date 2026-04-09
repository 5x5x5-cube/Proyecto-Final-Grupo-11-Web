import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import MyReservationsPage from './MyReservationsPage';

vi.mock('@/api/hooks/useBookings', () => ({
  useBookings: vi.fn(() => ({
    data: [],
    isLoading: false,
  })),
}));

describe('MyReservationsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<MyReservationsPage />);
  });
});
