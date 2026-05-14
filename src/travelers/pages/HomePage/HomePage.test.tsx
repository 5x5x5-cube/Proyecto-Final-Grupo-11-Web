import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import HomePage from './HomePage';

const mockDestinations = [
  {
    name: 'Bogotá',
    country: 'Colombia',
    hotelCount: 5,
    gradient: 'linear-gradient(#000,#111)',
    minPrice: 200000,
  },
  {
    name: 'Medellín',
    country: 'Colombia',
    hotelCount: 3,
    gradient: 'linear-gradient(#222,#333)',
    minPrice: 150000,
  },
];

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mocks.navigate,
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useDestinations: vi.fn(() => ({
    data: mockDestinations,
    isLoading: false,
  })),
}));

describe('HomePage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HomePage />);
  });

  it('clicking a destination card sets the search bar value instead of navigating', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<HomePage />);

    // Click the Bogotá destination card
    await user.click(screen.getByText('Bogotá'));

    // Should NOT navigate to /results
    expect(mocks.navigate).not.toHaveBeenCalled();

    // The destination should now appear in the search bar field
    expect(screen.getByText('Bogotá, Colombia')).toBeTruthy();
  });
});
