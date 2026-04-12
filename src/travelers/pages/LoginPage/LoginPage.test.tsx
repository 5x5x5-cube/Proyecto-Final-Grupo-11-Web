import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import LoginPage from './LoginPage';

vi.mock('@/api/hooks/useAuth', () => ({
  useLogin: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe('LoginPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<LoginPage />);
  });
});
