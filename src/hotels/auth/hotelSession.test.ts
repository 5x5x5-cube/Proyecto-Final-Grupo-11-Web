import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearHotelSession,
  getHotelSession,
  setHotelSession,
  type HotelSession,
} from './hotelSession';

const validSession: HotelSession = {
  token: 'jwt.header.payload',
  user: {
    id: 'hotel-admin-001',
    name: 'Admin Hotel',
    email: 'admin@hotel.com',
    role: 'hotel_admin',
  },
};

describe('hotelSession', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no session is stored', () => {
    expect(getHotelSession()).toBeNull();
  });

  it('returns null when the token is present but the user is missing', () => {
    localStorage.setItem('auth_token', validSession.token);
    expect(getHotelSession()).toBeNull();
  });

  it('persists and reads back a valid session', () => {
    setHotelSession(validSession);
    expect(getHotelSession()).toEqual(validSession);
  });

  it('clears both keys on logout', () => {
    setHotelSession(validSession);
    clearHotelSession();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(getHotelSession()).toBeNull();
  });

  it('treats a stored traveler role as no admin session (defence in depth)', () => {
    localStorage.setItem('auth_token', 'some-token');
    localStorage.setItem(
      'auth_user',
      JSON.stringify({ id: 1, name: 'Traveler', email: 'x@y.com', role: 'traveler' })
    );
    expect(getHotelSession()).toBeNull();
  });

  it('recovers from corrupt JSON by wiping both keys', () => {
    localStorage.setItem('auth_token', 'some-token');
    localStorage.setItem('auth_user', '{not-json');
    expect(getHotelSession()).toBeNull();
    // Corrupt payload is cleaned up so subsequent reads do not keep failing.
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
  });
});
