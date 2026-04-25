import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import LocaleSelector from './LocaleSelector';

describe('LocaleSelector', () => {
  it('renders language and currency pills', () => {
    renderWithProviders(<LocaleSelector />);

    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('COP')).toBeInTheDocument();
  });

  it('opens language menu on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LocaleSelector />);

    await user.click(screen.getByText('ES'));

    expect(screen.getByText(/Español/)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
  });

  it('opens currency menu on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LocaleSelector />);

    await user.click(screen.getByText('COP'));

    expect(screen.getByText(/Peso colombiano/)).toBeInTheDocument();
    expect(screen.getByText(/Dólar estadounidense/)).toBeInTheDocument();
  });
});
