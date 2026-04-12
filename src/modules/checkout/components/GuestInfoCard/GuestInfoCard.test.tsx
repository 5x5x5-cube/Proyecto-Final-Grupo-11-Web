import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import GuestInfoCard from './GuestInfoCard';
import type { GuestInfo } from '../../types';

const mockGuest: GuestInfo = {
  name: 'Carlos Martinez',
  email: 'carlos@test.com',
  phone: '+57 310 000 0000',
  initials: 'CM',
};

describe('GuestInfoCard', () => {
  it('renders guest name', () => {
    renderWithProviders(<GuestInfoCard guest={mockGuest} />);

    expect(screen.getByText('Carlos Martinez')).toBeInTheDocument();
  });

  it('renders guest email and phone', () => {
    renderWithProviders(<GuestInfoCard guest={mockGuest} />);

    expect(screen.getByText(/carlos@test\.com/)).toBeInTheDocument();
    expect(screen.getByText(/\+57 310 000 0000/)).toBeInTheDocument();
  });

  it('renders guest initials in avatar', () => {
    renderWithProviders(<GuestInfoCard guest={mockGuest} />);

    expect(screen.getByText('CM')).toBeInTheDocument();
  });
});
