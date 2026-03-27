import { describe, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import RegisterPage from './RegisterPage';

vi.mock('@/api/hooks/useAuth', () => ({
  useRegister: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe('RegisterPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<RegisterPage />);
  });
});
