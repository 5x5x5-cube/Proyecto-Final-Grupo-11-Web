import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import PillButton, {
  PrimaryPillButton,
  OutlinedPillButton,
  ErrorPillButton,
  ErrorOutlinedPillButton,
  SuccessPillButton,
  NeutralPillButton,
  NeutralOutlinedPillButton,
} from './PillButton';

describe('PillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<PillButton>Click me</PillButton>);
  });

  it('renders the button text', () => {
    renderWithProviders(<PillButton>Confirm</PillButton>);
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<PillButton onClick={onClick}>Submit</PillButton>);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as disabled when disabled prop is passed', () => {
    renderWithProviders(<PillButton disabled>Disabled</PillButton>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it.each(['lg', 'md', 'sm', 'xs', 'xxs'] as const)('renders with pillSize "%s"', size => {
    renderWithProviders(<PillButton pillSize={size}>Size {size}</PillButton>);
    expect(screen.getByRole('button', { name: `Size ${size}` })).toBeInTheDocument();
  });
});

describe('PrimaryPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<PrimaryPillButton>Primary</PrimaryPillButton>);
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
  });
});

describe('OutlinedPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<OutlinedPillButton>Outlined</OutlinedPillButton>);
    expect(screen.getByRole('button', { name: 'Outlined' })).toBeInTheDocument();
  });
});

describe('ErrorPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ErrorPillButton>Error</ErrorPillButton>);
    expect(screen.getByRole('button', { name: 'Error' })).toBeInTheDocument();
  });
});

describe('ErrorOutlinedPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ErrorOutlinedPillButton>Error Outlined</ErrorOutlinedPillButton>);
    expect(screen.getByRole('button', { name: 'Error Outlined' })).toBeInTheDocument();
  });
});

describe('SuccessPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<SuccessPillButton>Success</SuccessPillButton>);
    expect(screen.getByRole('button', { name: 'Success' })).toBeInTheDocument();
  });
});

describe('NeutralPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<NeutralPillButton>Neutral</NeutralPillButton>);
    expect(screen.getByRole('button', { name: 'Neutral' })).toBeInTheDocument();
  });
});

describe('NeutralOutlinedPillButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<NeutralOutlinedPillButton>Neutral Outlined</NeutralOutlinedPillButton>);
    expect(screen.getByRole('button', { name: 'Neutral Outlined' })).toBeInTheDocument();
  });
});
