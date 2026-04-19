import { createContext, useContext } from 'react';

interface HotelInfo {
  id: string;
  name: string;
}

interface HotelContextType {
  hotel: HotelInfo;
}

// TODO: Replace with real hotel from auth/session when implemented.
// Single source of truth for the current hotel admin session.
const MOCK_HOTEL: HotelInfo = {
  id: 'a1000000-0000-0000-0000-000000000001',
  name: 'Hotel Caribe Plaza',
};

const HotelContext = createContext<HotelContextType>({ hotel: MOCK_HOTEL });

export function HotelProvider({ children }: { children: React.ReactNode }) {
  return <HotelContext.Provider value={{ hotel: MOCK_HOTEL }}>{children}</HotelContext.Provider>;
}

export function useHotel() {
  return useContext(HotelContext);
}
