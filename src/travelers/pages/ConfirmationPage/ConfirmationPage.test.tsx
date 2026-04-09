import { describe, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import ConfirmationPage from './ConfirmationPage';

describe('ConfirmationPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ConfirmationPage />);
  });
});
