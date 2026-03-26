import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import HotelSummaryCard from './HotelSummaryCard';
import type { CartItem } from '../types';

const mockItem: CartItem = {
  roomId: 'room-1',
  hotelId: 'hotel-1',
  hotel: {
    name: 'Hotel Caribe Plaza',
    location: 'Centro Historico, Cartagena',
    rating: 4.5,
    reviewCount: 312,
    type: 'Hotel · 5 estrellas',
  },
  room: {
    id: 'room-1',
    name: 'Standard',
    features: '1 cama King · 32 m²',
    pricePerNight: 250000,
  },
  checkIn: '2026-04-01',
  checkOut: '2026-04-03',
  guests: 2,
  nights: 2,
};

describe('HotelSummaryCard', () => {
  it('renders hotel name and location', () => {
    renderWithProviders(<HotelSummaryCard item={mockItem} />);

    expect(screen.getByText('Hotel Caribe Plaza')).toBeInTheDocument();
    expect(screen.getByText('Centro Historico, Cartagena')).toBeInTheDocument();
  });

  it('renders hotel type', () => {
    renderWithProviders(<HotelSummaryCard item={mockItem} />);

    expect(screen.getByText('Hotel · 5 estrellas')).toBeInTheDocument();
  });

  it('renders review count', () => {
    renderWithProviders(<HotelSummaryCard item={mockItem} />);

    expect(screen.getByText(/312/)).toBeInTheDocument();
  });

  it('renders room name and features', () => {
    renderWithProviders(<HotelSummaryCard item={mockItem} />);

    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('1 cama King · 32 m²')).toBeInTheDocument();
  });

  it('renders room price per night', () => {
    renderWithProviders(<HotelSummaryCard item={mockItem} />);

    expect(screen.getByText(/250/)).toBeInTheDocument();
  });
});
