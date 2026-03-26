export interface CartHotel {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  type: string;
}

export interface CartRoom {
  id: string;
  name: string;
  features: string;
  pricePerNight: number;
}

export interface CartItem {
  roomId: string;
  hotelId: string;
  hotel: CartHotel;
  room: CartRoom;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
}

export interface CartPriceBreakdown {
  pricePerNight: number;
  nights: number;
  basePrice: number;
  vat: number;
  serviceFee: number;
  totalPrice: number;
}

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  initials: string;
}
