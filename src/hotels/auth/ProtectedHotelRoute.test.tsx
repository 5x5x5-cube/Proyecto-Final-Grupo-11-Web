import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HotelAuthProvider } from './HotelAuthContext';
import { ProtectedHotelRoute } from './ProtectedHotelRoute';
import type { HotelSession } from './hotelSession';

const sampleSession: HotelSession = {
  token: 'jwt.header.payload',
  user: {
    id: 'hotel-admin-001',
    name: 'Admin Hotel',
    email: 'admin@hotel.com',
    role: 'hotel_admin',
  },
};

// Minimal routing harness: one protected page and the login page so we can
// assert what actually renders after the guard evaluates.
function Harness({ initialEntry }: { initialEntry: string }) {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <HotelAuthProvider>
        <Routes>
          <Route path="/hotel/login" element={<div>Login Page</div>} />
          <Route
            path="/hotel/dashboard"
            element={
              <ProtectedHotelRoute>
                <div>Dashboard Content</div>
              </ProtectedHotelRoute>
            }
          />
        </Routes>
      </HotelAuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedHotelRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to /hotel/login when there is no session', () => {
    render(<Harness initialEntry="/hotel/dashboard" />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument();
  });

  it('renders the protected children when the admin is authenticated', () => {
    // Hydrate a valid hotel admin session before mounting the provider.
    localStorage.setItem('auth_token', sampleSession.token);
    localStorage.setItem('auth_user', JSON.stringify(sampleSession.user));

    render(<Harness initialEntry="/hotel/dashboard" />);
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects when the stored user is not a hotel_admin', () => {
    // A traveler token sitting in storage must NOT unlock the admin portal.
    localStorage.setItem('auth_token', 'traveler-token');
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        id: 'c1',
        name: 'Carlos Martinez',
        email: 'carlos@email.com',
        role: 'traveler',
      })
    );

    render(<Harness initialEntry="/hotel/dashboard" />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument();
  });
});
