import { describe, it, expect } from 'vitest';
import {
  calculateRefundPercentage,
  cancellationKind,
  daysUntilCheckIn,
  freeCancellationDeadline,
  isCancellable,
  REFUND_FULL,
  REFUND_NONE,
  REFUND_PARTIAL,
} from './cancellationPolicy';

const day = (s: string) => new Date(`${s}T00:00:00Z`);

describe('cancellationPolicy', () => {
  describe('daysUntilCheckIn', () => {
    it('returns the whole-day delta', () => {
      expect(daysUntilCheckIn(day('2026-05-20'), day('2026-05-17'))).toBe(3);
    });
    it('returns 0 when check-in is today', () => {
      expect(daysUntilCheckIn(day('2026-05-17'), day('2026-05-17'))).toBe(0);
    });
    it('returns a negative number when check-in is in the past', () => {
      expect(daysUntilCheckIn(day('2026-05-10'), day('2026-05-17'))).toBe(-7);
    });
  });

  describe('calculateRefundPercentage', () => {
    it('returns 100% when check-in is more than 7 days away', () => {
      expect(calculateRefundPercentage(day('2026-06-01'), day('2026-05-17'))).toBe(REFUND_FULL);
    });
    it('returns 100% at exactly 8 days', () => {
      expect(calculateRefundPercentage(day('2026-05-25'), day('2026-05-17'))).toBe(REFUND_FULL);
    });
    it('returns 50% at exactly 7 days', () => {
      expect(calculateRefundPercentage(day('2026-05-24'), day('2026-05-17'))).toBe(REFUND_PARTIAL);
    });
    it('returns 50% at exactly 2 days', () => {
      expect(calculateRefundPercentage(day('2026-05-19'), day('2026-05-17'))).toBe(REFUND_PARTIAL);
    });
    it('returns 0% at 1 day', () => {
      expect(calculateRefundPercentage(day('2026-05-18'), day('2026-05-17'))).toBe(REFUND_NONE);
    });
    it('returns 0% on check-in day', () => {
      expect(calculateRefundPercentage(day('2026-05-17'), day('2026-05-17'))).toBe(REFUND_NONE);
    });
    it('returns 0% when check-in is past', () => {
      expect(calculateRefundPercentage(day('2026-05-10'), day('2026-05-17'))).toBe(REFUND_NONE);
    });
  });

  describe('freeCancellationDeadline', () => {
    it('is exactly 7 days before check-in', () => {
      const deadline = freeCancellationDeadline(day('2026-05-20'));
      expect(deadline.toISOString().slice(0, 10)).toBe('2026-05-13');
    });
  });

  describe('cancellationKind', () => {
    it('classifies refund percentages', () => {
      expect(cancellationKind(1)).toBe('free');
      expect(cancellationKind(0.5)).toBe('partial');
      expect(cancellationKind(0)).toBe('none');
    });
  });

  describe('isCancellable', () => {
    it('only allows pending and confirmed', () => {
      expect(isCancellable('pending')).toBe(true);
      expect(isCancellable('confirmed')).toBe(true);
      expect(isCancellable('cancelled')).toBe(false);
      expect(isCancellable('rejected')).toBe(false);
      expect(isCancellable('past')).toBe(false);
      expect(isCancellable(undefined)).toBe(false);
      expect(isCancellable(null)).toBe(false);
    });
  });
});
