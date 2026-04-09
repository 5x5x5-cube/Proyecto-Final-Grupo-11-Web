import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import ModalOverlay from './ModalOverlay';

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  icon: <span data-testid="modal-icon" />,
  iconBg: '#e0f2fe',
  title: 'Test Modal',
  children: <p>Modal body content</p>,
};

describe('ModalOverlay', () => {
  it('renders without crashing when open', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} />);
  });

  it('renders the title', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} />);
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} subtitle="A helpful subtitle" />);
    expect(screen.getByText('A helpful subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when omitted', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} />);
    expect(screen.queryByText('A helpful subtitle')).not.toBeInTheDocument();
  });

  it('renders the footer when provided', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} footer={<button>Confirm</button>} />);
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<ModalOverlay {...defaultProps} onClose={onClose} />);

    // The MUI IconButton wrapping CloseIcon has no accessible name text;
    // find it by the CloseIcon test id that MUI injects.
    const closeIcon = screen.getByTestId('CloseIcon');
    await user.click(closeIcon);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not render dialog content when closed', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} open={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderWithProviders(<ModalOverlay {...defaultProps} />);
    expect(screen.getByTestId('modal-icon')).toBeInTheDocument();
  });
});
