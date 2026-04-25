import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  clearHotelSession,
  getHotelSession,
  setHotelSession,
  type HotelSession,
  type HotelAuthUser,
} from './hotelSession';

interface HotelAuthContextValue {
  session: HotelSession | null;
  isAuthenticated: boolean;
  login: (session: HotelSession) => void;
  logout: () => void;
}

const HotelAuthContext = createContext<HotelAuthContextValue | undefined>(undefined);

export function HotelAuthProvider({ children }: { children: ReactNode }) {
  // Hydrate from localStorage on mount so a page refresh keeps the admin
  // signed in. Running inside useState initializer avoids a flicker where
  // `session` is null for one render before the effect runs.
  const [session, setSession] = useState<HotelSession | null>(() => getHotelSession());

  // Keep tabs in sync: if the admin logs out in another tab, reflect it here.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'auth_user') {
        setSession(getHotelSession());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = (next: HotelSession) => {
    setHotelSession(next);
    setSession(next);
  };

  const logout = () => {
    clearHotelSession();
    setSession(null);
  };

  const value: HotelAuthContextValue = {
    session,
    isAuthenticated: session !== null,
    login,
    logout,
  };

  return <HotelAuthContext.Provider value={value}>{children}</HotelAuthContext.Provider>;
}

export function useHotelAuth(): HotelAuthContextValue {
  const ctx = useContext(HotelAuthContext);
  if (!ctx) {
    throw new Error('useHotelAuth must be used within a HotelAuthProvider');
  }
  return ctx;
}

export type { HotelAuthUser, HotelSession };
