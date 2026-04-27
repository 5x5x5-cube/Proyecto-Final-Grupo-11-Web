import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { GuestInfo } from '@/modules/checkout/types';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
}

interface AuthContextType {
  user: AuthUser | null;
  guestInfo: GuestInfo;
  isAuthenticated: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
}

interface LoginResponse {
  access_token: string;
  user_id: string;
  name: string;
  email: string;
  role?: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function computeInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getSession(): { token: string; user: AuthUser } | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);
  if (!token || !rawUser) return null;

  try {
    const user = JSON.parse(rawUser) as AuthUser;
    if (!user?.id || !user?.email) return null;
    return { token, user };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function setSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

const EMPTY_GUEST: GuestInfo = { name: '', email: '', phone: '', initials: '' };

const AuthContext = createContext<AuthContextType>({
  user: null,
  guestInfo: EMPTY_GUEST,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState(() => getSession());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        setSessionState(getSession());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = (response: LoginResponse) => {
    const user: AuthUser = {
      id: response.user_id,
      name: response.name,
      email: response.email,
      phone: '',
      initials: computeInitials(response.name),
    };
    setSession(response.access_token, user);
    setSessionState({ token: response.access_token, user });
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  const user = session?.user ?? null;
  const guestInfo: GuestInfo = user
    ? { name: user.name, email: user.email, phone: user.phone, initials: user.initials }
    : EMPTY_GUEST;

  return (
    <AuthContext.Provider value={{ user, guestInfo, isAuthenticated: !!session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export type { AuthUser };
