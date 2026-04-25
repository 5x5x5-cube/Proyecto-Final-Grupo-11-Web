/**
 * Persistence layer for the hotel admin session.
 *
 * Uses localStorage keys `auth_token` and `auth_user` so the existing
 * `httpClient` (which already reads `auth_token` for the Authorization
 * header) works without any change. The traveler mock AuthContext does
 * NOT read these keys, so the two sessions coexist safely.
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export interface HotelAuthUser {
  id: string;
  name: string;
  email: string;
  role: 'hotel_admin';
}

export interface HotelSession {
  token: string;
  user: HotelAuthUser;
}

/**
 * Read the persisted admin session. Returns null when there is no token,
 * no user, or the stored JSON is corrupt.
 */
export function getHotelSession(): HotelSession | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);
  if (!token || !rawUser) return null;

  try {
    const user = JSON.parse(rawUser) as HotelAuthUser;
    if (!user?.id || !user?.email || user?.role !== 'hotel_admin') return null;
    return { token, user };
  } catch {
    // Corrupt payload — treat as no session and clean up.
    clearHotelSession();
    return null;
  }
}

export function setHotelSession(session: HotelSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearHotelSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
