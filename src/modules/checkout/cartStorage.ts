const CART_STORAGE_KEY = 'travelhub_cart_selection';

export interface CartSelection {
  roomId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  savedAt: string; // ISO timestamp
}

export function saveCartSelection(selection: Omit<CartSelection, 'savedAt'>): void {
  const data: CartSelection = { ...selection, savedAt: new Date().toISOString() };
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
}

export function getCartSelection(): CartSelection | null {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CartSelection;
    // Expire after 20 minutes (slightly longer than hold TTL)
    const age = Date.now() - new Date(data.savedAt).getTime();
    if (age > 20 * 60 * 1000) {
      clearCartSelection();
      return null;
    }
    return data;
  } catch {
    clearCartSelection();
    return null;
  }
}

export function clearCartSelection(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}
