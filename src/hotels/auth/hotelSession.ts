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
const HOTEL_ID_KEY = 'auth_hotel_id';
const HOTEL_INFO_KEY = 'auth_hotel_info';

export interface HotelAuthUser {
  id: string;
  name: string;
  email: string;
  role: 'hotel_admin';
}

export interface HotelInfo {
  id: string;
  name: string;
  location: string;
  initials: string;
}

export interface HotelSession {
  token: string;
  user: HotelAuthUser;
  hotelId?: string;
  hotelInfo?: HotelInfo;
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
    const hotelId = localStorage.getItem(HOTEL_ID_KEY) || undefined;
    let hotelInfo: HotelInfo | undefined;
    const rawHotelInfo = localStorage.getItem(HOTEL_INFO_KEY);
    if (rawHotelInfo) {
      hotelInfo = JSON.parse(rawHotelInfo) as HotelInfo;
    }
    return { token, user, hotelId, hotelInfo };
  } catch {
    // Corrupt payload — treat as no session and clean up.
    clearHotelSession();
    return null;
  }
}

export function setHotelSession(session: HotelSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  if (session.hotelId) {
    localStorage.setItem(HOTEL_ID_KEY, session.hotelId);
  } else {
    localStorage.removeItem(HOTEL_ID_KEY);
  }
  if (session.hotelInfo) {
    localStorage.setItem(HOTEL_INFO_KEY, JSON.stringify(session.hotelInfo));
  } else {
    localStorage.removeItem(HOTEL_INFO_KEY);
  }
}

export function clearHotelSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(HOTEL_ID_KEY);
  localStorage.removeItem(HOTEL_INFO_KEY);
}
