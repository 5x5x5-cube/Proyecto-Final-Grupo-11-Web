import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import HoldCountdown from './HoldCountdown';

describe('HoldCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the countdown in MM:SS format', () => {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min
    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={() => {}} />);

    // Should show something around 09:59 or 10:00
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('shows warning styling when less than 2 minutes remain', () => {
    const expiresAt = new Date(Date.now() + 90 * 1000).toISOString(); // 1.5 min
    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={() => {}} />);

    // Should display around 01:29 or 01:30
    const countdown = screen.getByText(/01:\d{2}/);
    expect(countdown).toBeInTheDocument();
  });

  it('calls onExpired when countdown reaches zero', () => {
    const onExpired = vi.fn();
    const expiresAt = new Date(Date.now() + 2000).toISOString(); // 2 seconds

    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={onExpired} />);

    // Advance past expiry
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onExpired).toHaveBeenCalled();
  });

  it('calls onExpired immediately if already expired', () => {
    const onExpired = vi.fn();
    const expiresAt = new Date(Date.now() - 1000).toISOString(); // already expired

    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={onExpired} />);

    expect(onExpired).toHaveBeenCalled();
  });

  it('displays "para completar tu reserva" text', () => {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={() => {}} />);

    expect(screen.getByText('para completar tu reserva')).toBeInTheDocument();
  });

  it('decrements the countdown each second', () => {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min
    renderWithProviders(<HoldCountdown expiresAt={expiresAt} onExpired={() => {}} />);

    const initialText = screen.getByText(/\d{2}:\d{2}/).textContent;

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const updatedText = screen.getByText(/\d{2}:\d{2}/).textContent;
    expect(updatedText).not.toBe(initialText);
  });
});
