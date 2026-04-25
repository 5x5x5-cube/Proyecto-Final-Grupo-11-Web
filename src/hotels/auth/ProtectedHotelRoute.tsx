import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useHotelAuth } from './HotelAuthContext';

interface ProtectedHotelRouteProps {
  children: ReactNode;
}

/**
 * Route guard for the hotel admin portal. Redirects to `/hotel/login` when
 * there is no active admin session.
 *
 * We use `replace` so the protected URL does not pollute the browser
 * history — pressing back from the login page should not take the user
 * back to a page they were never authorized to see. Auto-returning to the
 * requested URL after login is a nice-to-have and is deliberately out of
 * scope for HU3.1 (see follow-up ticket).
 */
export function ProtectedHotelRoute({ children }: ProtectedHotelRouteProps) {
  const { isAuthenticated } = useHotelAuth();

  if (!isAuthenticated) {
    return <Navigate to="/hotel/login" replace />;
  }

  return <>{children}</>;
}
