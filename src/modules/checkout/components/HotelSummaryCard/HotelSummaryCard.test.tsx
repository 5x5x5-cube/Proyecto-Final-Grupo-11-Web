import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelSummaryCard from './HotelSummaryCard';
import type { Cart } from '../../types';

const mockCart: Cart = {
  id: '1',
  userId: '1',
  roomId: '1',
  hotelId: '1',
  hotelName: 'Hotel Caribe Plaza',
  hotelType: 'Hotel · 5 estrellas',
  location: 'Centro Historico, Cartagena',
  rating: 4.5,
  reviewCount: 312,
  roomName: 'Standard',
  roomFeatures: '1 cama King · 32 m²',
  pricePerNight: 250000,
  checkIn: '2026-04-01',
  checkOut: '2026-04-03',
  guests: 2,
  nights: 2,
  subtotal: 500000,
  vat: 95000,
  serviceFee: 0,
  total: 595000,
  createdAt: '2026-03-26T00:00:00Z',
};

describe('HotelSummaryCard', () => {
  it('renders hotel name and location', () => {
    renderWithProviders(<HotelSummaryCard cart={mockCart} />);

    expect(screen.getByText('Hotel Caribe Plaza')).toBeInTheDocument();
    expect(screen.getByText('Centro Historico, Cartagena')).toBeInTheDocument();
  });

  it('renders hotel type', () => {
    renderWithProviders(<HotelSummaryCard cart={mockCart} />);

    expect(screen.getByText('Hotel · 5 estrellas')).toBeInTheDocument();
  });

  it('renders review count', () => {
    renderWithProviders(<HotelSummaryCard cart={mockCart} />);

    expect(screen.getByText(/312/)).toBeInTheDocument();
  });

  it('renders room name and features', () => {
    renderWithProviders(<HotelSummaryCard cart={mockCart} />);

    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('1 cama King · 32 m²')).toBeInTheDocument();
  });

  it('renders room price per night', () => {
    renderWithProviders(<HotelSummaryCard cart={mockCart} />);

    expect(screen.getByText(/250/)).toBeInTheDocument();
  });

  it('hides optional fields when not provided', () => {
    const minimalCart: Cart = {
      id: '2',
      userId: '1',
      roomId: '2',
      hotelId: '1',
      hotelName: 'Hotel Básico',
      roomName: 'Single',
      pricePerNight: 100000,
      checkIn: '2026-04-01',
      checkOut: '2026-04-02',
      guests: 1,
      nights: 1,
      subtotal: 100000,
      total: 119000,
      createdAt: '2026-03-26T00:00:00Z',
    };

    renderWithProviders(<HotelSummaryCard cart={minimalCart} />);

    expect(screen.getByText('Hotel Básico')).toBeInTheDocument();
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.queryByText(/estrellas/)).not.toBeInTheDocument();
  });
});
