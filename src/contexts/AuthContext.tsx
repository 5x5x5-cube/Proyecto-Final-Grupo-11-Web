import { createContext, useContext } from 'react';
import type { GuestInfo } from '@/modules/checkout/types';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
}

interface AuthContextType {
  user: AuthUser;
  guestInfo: GuestInfo;
  isAuthenticated: boolean;
}

// TODO: Replace with real auth when implemented.
// This is the single source of truth for user data across the app.
const MOCK_USER: AuthUser = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Carlos Martinez',
  email: 'carlos.martinez@email.com',
  phone: '+57 310 000 0000',
  initials: 'CM',
};

// Sync user_id to localStorage so httpClient sends X-User-Id header.
// Runs at module load time — before any component renders or query fires.
// TODO: Remove when real auth sets this after login.
localStorage.setItem('user_id', MOCK_USER.id);

const AuthContext = createContext<AuthContextType>({
  user: MOCK_USER,
  guestInfo: {
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    initials: MOCK_USER.initials,
  },
  isAuthenticated: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // TODO: Replace with real auth state (token validation, user profile fetch)
  const value: AuthContextType = {
    user: MOCK_USER,
    guestInfo: {
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      phone: MOCK_USER.phone,
      initials: MOCK_USER.initials,
    },
    isAuthenticated: true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export type { AuthUser };
