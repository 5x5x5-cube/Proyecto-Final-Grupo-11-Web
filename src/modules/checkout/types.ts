/** Matches OpenAPI Cart schema (single-room) */
export interface Cart {
  id: number;
  userId: number;
  roomId: number;
  hotelId: number;
  hotelName: string;
  hotelType?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  roomName: string;
  roomFeatures?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  tourismTax?: number;
  vat?: number;
  serviceFee?: number;
  total: number;
  createdAt: string;
}

/** Matches OpenAPI CreateBookingRequest schema */
export interface CreateBookingRequest {
  roomId: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  initials: string;
}
