import { createContext, useContext } from 'react';
import { useHotelAuth } from '@/hotels/auth/HotelAuthContext';

interface HotelInfo {
  id: string;
  name: string;
  location: string;
  initials: string;
}

interface HotelAdminUser {
  name: string;
  initials: string;
}

interface HotelContextType {
  hotel: HotelInfo;
  adminUser: HotelAdminUser;
}

// Generate initials from name
function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const HotelContext = createContext<HotelContextType>({
  hotel: { id: '', name: '', location: '', initials: '' },
  adminUser: { name: '', initials: '' },
});

export function HotelProvider({ children }: { children: React.ReactNode }) {
  const { session } = useHotelAuth();

  // Use real hotel data from session, or fallback to empty
  const hotel: HotelInfo = session?.hotelInfo || {
    id: '',
    name: '',
    location: '',
    initials: '',
  };

  // Use real admin user data from session, or fallback to empty
  const adminUser: HotelAdminUser = session?.user
    ? {
        name: session.user.name,
        initials: generateInitials(session.user.name),
      }
    : {
        name: '',
        initials: '',
      };

  return <HotelContext.Provider value={{ hotel, adminUser }}>{children}</HotelContext.Provider>;
}

export function useHotel() {
  return useContext(HotelContext);
}
