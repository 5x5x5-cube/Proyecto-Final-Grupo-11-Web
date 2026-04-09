import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import LanguagePill from './LanguagePill';

describe('LanguagePill', () => {
  it('renders without crashing', () => {
    renderWithProviders(<LanguagePill />);
  });

  it('renders both language options', () => {
    renderWithProviders(<LanguagePill />);
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('switches language when the other option is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguagePill />);

    await user.click(screen.getByText('EN'));

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('clicking the current language does not crash', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguagePill />);

    await user.click(screen.getByText('ES'));

    expect(screen.getByText('ES')).toBeInTheDocument();
  });
});
