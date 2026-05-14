import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import RatesPage from './RatesPage';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}));

const mockTariffs = [
  {
    id: 't1',
    roomId: 'r1',
    roomName: 'Deluxe Suite',
    roomLocation: 'Bogotá',
    roomImage: 'https://images.unsplash.com/photo-room1',
    rateType: 'standard',
    pricePerNight: 250000,
    startDate: null,
    endDate: null,
  },
  {
    id: 't2',
    roomId: 'r2',
    roomName: 'Classic Room',
    roomLocation: 'Bogotá',
    roomImage: null,
    rateType: 'season',
    pricePerNight: 180000,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
  },
];

vi.mock('@/api/hooks/useTariffs', () => ({
  useTariffs: vi.fn(() => ({ data: mockTariffs, isLoading: false })),
  useHotelAdminRooms: vi.fn(() => ({ data: [], isLoading: false })),
  useCreateTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
  useUpdateTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
  useDeleteTariff: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
}));

describe('RatesPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<RatesPage />);
  });

  it('renders tariff room names', () => {
    renderWithProviders(<RatesPage />);
    expect(screen.getByText('Deluxe Suite')).toBeTruthy();
    expect(screen.getByText('Classic Room')).toBeTruthy();
  });

  it('renders location for each tariff row', () => {
    renderWithProviders(<RatesPage />);
    expect(screen.getAllByText('Bogotá')).toHaveLength(2);
  });

  it('renders two tariff rows', () => {
    renderWithProviders(<RatesPage />);
    // Both room names should appear (one per row)
    expect(screen.getByText('Deluxe Suite')).toBeTruthy();
    expect(screen.getByText('Classic Room')).toBeTruthy();
  });
});
