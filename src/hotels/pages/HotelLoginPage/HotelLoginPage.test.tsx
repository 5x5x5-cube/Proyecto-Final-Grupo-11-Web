import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import HotelLoginPage from './HotelLoginPage';

const mocks = vi.hoisted(() => ({
  loginMutate: vi.fn(),
  navigate: vi.fn(),
  isPending: false,
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mocks.navigate,
}));

vi.mock('@/api/hooks/useAuth', () => ({
  useLogin: () => ({ mutate: mocks.loginMutate, isPending: mocks.isPending }),
}));

async function fillValidCredentials() {
  const user = userEvent.setup({ delay: null });
  await user.type(screen.getByLabelText(/correo electronico/i), 'admin@hotel.com');
  await user.type(screen.getByLabelText(/contrasena/i), 'secret123');
  return user;
}

// Mirrors the real auth_service AuthResponse shape: flat, with access_token /
// user_id / name / email / role.
const successResponse = {
  access_token: 'mock-hotel-admin-jwt',
  token_type: 'bearer',
  user_id: 'hotel-admin-001',
  name: 'Admin Hotel',
  email: 'admin@hotel.com',
  role: 'hotel_admin' as const,
};

describe('HotelLoginPage', () => {
  beforeEach(() => {
    mocks.loginMutate.mockReset();
    mocks.navigate.mockReset();
    mocks.isPending = false;
    localStorage.clear();
  });

  it('renders without crashing', () => {
    renderWithProviders(<HotelLoginPage />);
    expect(screen.getByRole('button', { name: /iniciar sesion/i })).toBeInTheDocument();
  });

  it('keeps the submit button disabled until email and password are valid', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<HotelLoginPage />);

    const button = screen.getByRole('button', { name: /iniciar sesion/i });
    expect(button).toBeDisabled();

    await user.type(screen.getByLabelText(/correo electronico/i), 'not-an-email');
    expect(button).toBeDisabled();

    await user.clear(screen.getByLabelText(/correo electronico/i));
    await user.type(screen.getByLabelText(/correo electronico/i), 'admin@hotel.com');
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123');
    expect(button).toBeEnabled();
  });

  it('shows an inline email validation error after blur', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<HotelLoginPage />);

    const emailInput = screen.getByLabelText(/correo electronico/i);
    await user.type(emailInput, 'bad-email');
    emailInput.blur();

    expect(await screen.findByText(/ingresa un correo electronico valido/i)).toBeInTheDocument();
  });

  it('submits with the Enter key from within the form', async () => {
    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();

    // Focus on password and press Enter — implicit form submission.
    screen.getByLabelText(/contrasena/i).focus();
    await user.keyboard('{Enter}');

    expect(mocks.loginMutate).toHaveBeenCalledTimes(1);
    const [payload] = mocks.loginMutate.mock.calls[0];
    expect(payload).toEqual({ email: 'admin@hotel.com', password: 'secret123' });
  });

  it('navigates to the dashboard on successful login', async () => {
    mocks.loginMutate.mockImplementation((_payload, opts) => opts?.onSuccess?.(successResponse));

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(mocks.navigate).toHaveBeenCalledWith('/hotel/dashboard');
  });

  it('persists the JWT and user in localStorage on successful login', async () => {
    mocks.loginMutate.mockImplementation((_payload, opts) => opts?.onSuccess?.(successResponse));

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(localStorage.getItem('auth_token')).toBe(successResponse.access_token);
    expect(JSON.parse(localStorage.getItem('auth_user') ?? 'null')).toEqual({
      id: successResponse.user_id,
      name: successResponse.name,
      email: successResponse.email,
      role: successResponse.role,
    });
  });

  it('does not navigate or persist when the backend response is for a non-admin role', async () => {
    // A valid traveler response (role !== hotel_admin) must be rejected:
    // the admin portal must never be signed in with a non-admin payload (RBAC).
    mocks.loginMutate.mockImplementation((_payload, opts) =>
      opts?.onSuccess?.({
        access_token: 't',
        token_type: 'bearer',
        user_id: 'c1',
        name: 'Carlos Martinez',
        email: 'carlos.m@email.com',
        role: 'traveler',
      })
    );

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('does not navigate or persist when the backend response is missing required fields', async () => {
    // Malformed shape (no access_token) must also be rejected.
    mocks.loginMutate.mockImplementation((_payload, opts) =>
      opts?.onSuccess?.({ user: { id: 1, name: 'X' } })
    );

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(mocks.navigate).not.toHaveBeenCalled();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('shows a generic invalid-credentials message on 401 without leaking backend detail', async () => {
    mocks.loginMutate.mockImplementation((_payload, opts) =>
      opts?.onError?.({ status: 401, data: { message: 'User admin@hotel.com not found' } })
    );

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(await screen.findByText(/usuario o contrasena incorrectos/i)).toBeInTheDocument();
    // The raw backend message must NOT appear anywhere in the DOM.
    expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
    // Stays on the page — no navigation.
    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it('falls back to a network error message on non-auth failures', async () => {
    mocks.loginMutate.mockImplementation((_payload, opts) =>
      opts?.onError?.({ status: 500, data: { message: 'Internal Server Error' } })
    );

    renderWithProviders(<HotelLoginPage />);
    const user = await fillValidCredentials();
    await user.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    expect(await screen.findByText(/no pudimos iniciar sesion/i)).toBeInTheDocument();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });
});
