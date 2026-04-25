import { createContext, useContext } from 'react';

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

// TODO: Replace with real hotel + admin user from auth/session when implemented.
// Single source of truth for the current hotel admin session.
const MOCK_HOTEL: HotelInfo = {
  id: 'a1000000-0000-0000-0000-000000000001',
  name: 'Hotel Caribe Plaza',
  location: 'Cartagena, Colombia',
  initials: 'HC',
};

const MOCK_ADMIN: HotelAdminUser = {
  name: 'Admin Demo',
  initials: 'AD',
};

const HotelContext = createContext<HotelContextType>({
  hotel: MOCK_HOTEL,
  adminUser: MOCK_ADMIN,
});

export function HotelProvider({ children }: { children: React.ReactNode }) {
  return (
    <HotelContext.Provider value={{ hotel: MOCK_HOTEL, adminUser: MOCK_ADMIN }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}
