import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import ResultsPage from './ResultsPage';

const mockNavigate = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams],
}));

vi.mock('@/api/hooks/useSearch', () => ({
  useSearchHotels: vi.fn((params: unknown) => {
    if (!params) return { data: [], isLoading: false };
    return {
      data: [
        {
          id: 'h1',
          name: 'Hotel Test',
          city: 'Bogota',
          country: 'Colombia',
          rating: 4.5,
          pricePerNight: 200000,
          amenities: { wifi: true },
          gradient: 'linear-gradient(135deg, #006874, #4A9FAA)',
        },
      ],
      isLoading: false,
    };
  }),
}));

describe('ResultsPage', () => {
  it('redirects to home when no destination param', () => {
    mockSearchParams = new URLSearchParams();
    renderWithProviders(<ResultsPage />);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('renders hotel results when destination is provided', () => {
    mockSearchParams = new URLSearchParams({
      destination: 'Bogota',
      checkIn: '2026-05-01',
      checkOut: '2026-05-03',
      guests: '2',
    });
    renderWithProviders(<ResultsPage />);
    expect(screen.getByText('Hotel Test')).toBeInTheDocument();
  });

  it('shows "1 alojamiento" count', () => {
    mockSearchParams = new URLSearchParams({
      destination: 'Bogota',
      checkIn: '2026-05-01',
      checkOut: '2026-05-03',
      guests: '2',
    });
    renderWithProviders(<ResultsPage />);
    expect(screen.getByText(/1 alojamiento/)).toBeInTheDocument();
  });
});
