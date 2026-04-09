import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import AmenityTag from './AmenityTag';

describe('AmenityTag', () => {
  it('renders without crashing', () => {
    renderWithProviders(<AmenityTag icon="wifi" label="Wi-Fi" />);
  });

  it('renders the label text', () => {
    renderWithProviders(<AmenityTag icon="wifi" label="Wi-Fi" />);
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
  });

  it('renders with a known icon key', () => {
    renderWithProviders(<AmenityTag icon="pool" label="Pool" />);
    expect(screen.getByText('Pool')).toBeInTheDocument();
  });

  it('renders label even for unknown icon keys', () => {
    renderWithProviders(<AmenityTag icon="unknown_amenity" label="Mystery" />);
    expect(screen.getByText('Mystery')).toBeInTheDocument();
  });

  it('renders with free_breakfast icon', () => {
    renderWithProviders(<AmenityTag icon="free_breakfast" label="Desayuno" />);
    expect(screen.getByText('Desayuno')).toBeInTheDocument();
  });
});
