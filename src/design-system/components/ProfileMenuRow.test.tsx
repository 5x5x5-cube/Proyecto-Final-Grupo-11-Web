import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import ProfileMenuRow from './ProfileMenuRow';

describe('ProfileMenuRow', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <ProfileMenuRow icon={<span data-testid="row-icon" />} label="My Account" />
    );
  });

  it('renders the label text', () => {
    renderWithProviders(<ProfileMenuRow icon={<span />} label="Profile Settings" />);
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderWithProviders(<ProfileMenuRow icon={<span data-testid="row-icon" />} label="Language" />);
    expect(screen.getByTestId('row-icon')).toBeInTheDocument();
  });

  it('renders the value when provided', () => {
    renderWithProviders(<ProfileMenuRow icon={<span />} label="Language" value="Spanish" />);
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('does not render value when omitted', () => {
    renderWithProviders(<ProfileMenuRow icon={<span />} label="Language" />);
    expect(screen.queryByText('Spanish')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<ProfileMenuRow icon={<span />} label="Logout" onClick={onClick} />);

    await user.click(screen.getByText('Logout'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders without onClick and does not throw when interacted with', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfileMenuRow icon={<span />} label="Info Row" />);

    await user.click(screen.getByText('Info Row'));

    expect(screen.getByText('Info Row')).toBeInTheDocument();
  });
});
