/** Price breakdown returned by the backend (may contain string decimals) */
export interface PriceBreakdown {
  /** Backend sends pricePerNight; some callers may use basePrice */
  pricePerNight?: number | string;
  basePrice?: number | string;
  nights: number;
  subtotal: number | string;
  tourismTax?: number | string;
  vat?: number | string;
  serviceFee?: number | string;
  discountAmount?: number | string;
  discountName?: string;
  /** Backend sends total; some callers may use totalPrice */
  total?: number | string;
  totalPrice?: number | string;
  currency?: string;
}

/** Matches OpenAPI Cart schema (single-room) */
export interface Cart {
  id: string;
  userId: string;
  roomId: string;
  hotelId: string;
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
  /** Top-level price fields (may be absent when backend nests them in priceBreakdown) */
  pricePerNight?: number;
  nights?: number;
  subtotal?: number;
  tourismTax?: number;
  vat?: number;
  serviceFee?: number;
  total?: number;
  /** Nested price breakdown from the backend */
  priceBreakdown?: PriceBreakdown;
  createdAt: string;
  holdId?: string;
  holdExpiresAt?: string; // ISO datetime
}

/** Matches OpenAPI CreateBookingRequest schema */
export interface CreateBookingRequest {
  roomId: string;
  hotelId: string;
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

/** Matches the `method` discriminator accepted by POST /payments/tokenize */
export type PaymentMethod = 'credit_card' | 'digital_wallet' | 'transfer';
