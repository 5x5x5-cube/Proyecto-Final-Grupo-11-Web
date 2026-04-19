import { describe, it, expect } from 'vitest';
import { isValidLuhn } from './luhn';

describe('isValidLuhn', () => {
  it('validates the 4242 test card', () => {
    expect(isValidLuhn('4242424242424242')).toBe(true);
  });

  it('validates the decline test card', () => {
    expect(isValidLuhn('4000000000000002')).toBe(true);
  });

  it('validates the expired test card', () => {
    expect(isValidLuhn('4000000000000069')).toBe(true);
  });

  it('rejects a random 16-digit number', () => {
    expect(isValidLuhn('1233233234324323')).toBe(false);
  });

  it('rejects a number that is too short', () => {
    expect(isValidLuhn('42424242')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidLuhn('')).toBe(false);
  });

  it('handles spaces and dashes', () => {
    expect(isValidLuhn('4242 4242 4242 4242')).toBe(true);
    expect(isValidLuhn('4242-4242-4242-4242')).toBe(true);
  });
});
