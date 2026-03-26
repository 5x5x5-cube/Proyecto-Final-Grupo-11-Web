import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { saveCartSelection, getCartSelection, clearCartSelection } from './cartStorage';

const mockSelection = {
  roomId: 'b1000000-0000-0000-0000-000000000001',
  hotelId: 'a1000000-0000-0000-0000-000000000001',
  checkIn: '2026-04-01',
  checkOut: '2026-04-04',
  guests: 2,
};

describe('cartStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('saves and retrieves a cart selection', () => {
    saveCartSelection(mockSelection);
    const result = getCartSelection();

    expect(result).not.toBeNull();
    expect(result!.roomId).toBe(mockSelection.roomId);
    expect(result!.hotelId).toBe(mockSelection.hotelId);
    expect(result!.checkIn).toBe(mockSelection.checkIn);
    expect(result!.checkOut).toBe(mockSelection.checkOut);
    expect(result!.guests).toBe(mockSelection.guests);
    expect(result!.savedAt).toBeDefined();
  });

  it('returns null when no selection is stored', () => {
    expect(getCartSelection()).toBeNull();
  });

  it('returns null and clears when selection is older than 20 minutes', () => {
    saveCartSelection(mockSelection);

    // Advance time by 21 minutes
    vi.advanceTimersByTime(21 * 60 * 1000);

    expect(getCartSelection()).toBeNull();
    expect(localStorage.getItem('travelhub_cart_selection')).toBeNull();
  });

  it('returns valid selection within 20 minutes', () => {
    saveCartSelection(mockSelection);

    // Advance time by 19 minutes
    vi.advanceTimersByTime(19 * 60 * 1000);

    expect(getCartSelection()).not.toBeNull();
  });

  it('returns null and clears on malformed JSON', () => {
    localStorage.setItem('travelhub_cart_selection', 'not valid json');
    expect(getCartSelection()).toBeNull();
    expect(localStorage.getItem('travelhub_cart_selection')).toBeNull();
  });

  it('clears the stored selection', () => {
    saveCartSelection(mockSelection);
    expect(getCartSelection()).not.toBeNull();

    clearCartSelection();
    expect(getCartSelection()).toBeNull();
  });
});
