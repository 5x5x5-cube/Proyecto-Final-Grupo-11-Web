import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import SearchField from './SearchField';

describe('SearchField', () => {
  it('renders without crashing', () => {
    renderWithProviders(<SearchField />);
  });

  it('renders with a custom placeholder', () => {
    renderWithProviders(<SearchField placeholder="Search hotels..." />);
    expect(screen.getByPlaceholderText('Search hotels...')).toBeInTheDocument();
  });

  it('renders with the default placeholder', () => {
    renderWithProviders(<SearchField />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('displays a controlled value', () => {
    renderWithProviders(<SearchField value="Cartagena" onChange={() => {}} />);
    expect(screen.getByDisplayValue('Cartagena')).toBeInTheDocument();
  });

  it('calls onChange when the user types', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<SearchField onChange={onChange} />);

    await user.type(screen.getByPlaceholderText('Buscar...'), 'B');

    expect(onChange).toHaveBeenCalled();
  });

  it('renders the search icon', () => {
    const { container } = renderWithProviders(<SearchField />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
