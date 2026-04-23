import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelAdminSidebar from './HotelAdminSidebar';

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mocks.navigate,
}));

describe('HotelAdminSidebar', () => {
  beforeEach(() => {
    mocks.navigate.mockReset();
    // Seed a valid hotel admin session so useHotelAuth().logout() has
    // something real to clear.
    localStorage.setItem('auth_token', 'jwt.header.payload');
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        id: 'hotel-admin-001',
        name: 'Admin Hotel',
        email: 'admin@hotel.com',
        role: 'hotel_admin',
      })
    );
  });

  it('renders the logout item as a button (not a router link)', () => {
    renderWithProviders(<HotelAdminSidebar activeItem="dashboard" />);
    // The logout entry must NOT be an <a> — it has to be a real button so it
    // can trigger session cleanup instead of naked navigation. We query by
    // the visible label and then assert on the tag.
    const logoutLabel = screen.getByText(/cerrar sesi[oó]n/i);
    const button = logoutLabel.closest('button');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('aria-label')).toMatch(/cerrar sesi[oó]n/i);
  });

  it('clicking logout clears the session and navigates to /hotel/login', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<HotelAdminSidebar activeItem="dashboard" />);

    const logoutLabel = screen.getByText(/cerrar sesi[oó]n/i);
    const button = logoutLabel.closest('button');
    expect(button).not.toBeNull();
    await user.click(button!);

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(mocks.navigate).toHaveBeenCalledWith('/hotel/login', { replace: true });
  });
});
