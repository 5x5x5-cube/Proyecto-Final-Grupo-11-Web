import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { HotelAuthProvider, useHotelAuth } from './HotelAuthContext';
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

// Simple probe component that exposes the hook's value to the DOM so the
// tests can assert on it without pulling in the whole HotelLoginPage.
function Probe() {
  const auth = useHotelAuth();
  return (
    <div>
      <span data-testid="is-auth">{auth.isAuthenticated ? 'yes' : 'no'}</span>
      <span data-testid="email">{auth.session?.user.email ?? 'none'}</span>
      <button onClick={() => auth.login(sampleSession)}>login</button>
      <button onClick={auth.logout}>logout</button>
    </div>
  );
}

describe('HotelAuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated when there is no stored session', () => {
    render(
      <HotelAuthProvider>
        <Probe />
      </HotelAuthProvider>
    );
    expect(screen.getByTestId('is-auth').textContent).toBe('no');
    expect(screen.getByTestId('email').textContent).toBe('none');
  });

  it('hydrates the session from localStorage on mount (survives refresh)', () => {
    localStorage.setItem('auth_token', sampleSession.token);
    localStorage.setItem('auth_user', JSON.stringify(sampleSession.user));

    render(
      <HotelAuthProvider>
        <Probe />
      </HotelAuthProvider>
    );

    expect(screen.getByTestId('is-auth').textContent).toBe('yes');
    expect(screen.getByTestId('email').textContent).toBe('admin@hotel.com');
  });

  it('login() writes to storage and updates the context', () => {
    render(
      <HotelAuthProvider>
        <Probe />
      </HotelAuthProvider>
    );

    act(() => {
      screen.getByRole('button', { name: 'login' }).click();
    });

    expect(screen.getByTestId('is-auth').textContent).toBe('yes');
    expect(localStorage.getItem('auth_token')).toBe(sampleSession.token);
    expect(JSON.parse(localStorage.getItem('auth_user') ?? 'null')).toEqual(sampleSession.user);
  });

  it('logout() clears both storage and context', () => {
    localStorage.setItem('auth_token', sampleSession.token);
    localStorage.setItem('auth_user', JSON.stringify(sampleSession.user));

    render(
      <HotelAuthProvider>
        <Probe />
      </HotelAuthProvider>
    );

    expect(screen.getByTestId('is-auth').textContent).toBe('yes');

    act(() => {
      screen.getByRole('button', { name: 'logout' }).click();
    });

    expect(screen.getByTestId('is-auth').textContent).toBe('no');
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
  });

  it('throws when useHotelAuth is called outside the provider', () => {
    // Silence the expected React error boundary output for this assertion.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/HotelAuthProvider/);
    spy.mockRestore();
  });
});
