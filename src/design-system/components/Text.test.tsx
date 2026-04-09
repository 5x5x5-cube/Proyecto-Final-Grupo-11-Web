import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import Text from './Text';
import type { TextVariant } from './Text';

describe('Text', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Text>Hello</Text>);
  });

  it('renders the children text', () => {
    renderWithProviders(<Text>Welcome to TravelHub</Text>);
    expect(screen.getByText('Welcome to TravelHub')).toBeInTheDocument();
  });

  it('renders with the default body variant', () => {
    renderWithProviders(<Text>Default body</Text>);
    expect(screen.getByText('Default body')).toBeInTheDocument();
  });

  it.each([
    'sectionTitle',
    'cardSubheading',
    'panelTitle',
    'bodyMedium',
    'bodySemibold',
    'body',
    'hint',
    'caption',
    'overline',
    'miniLabel',
    'price',
    'priceSmall',
  ] as TextVariant[])('renders with textVariant "%s"', variant => {
    renderWithProviders(<Text textVariant={variant}>Variant {variant}</Text>);
    expect(screen.getByText(`Variant ${variant}`)).toBeInTheDocument();
  });

  it('passes MUI Typography props through', () => {
    renderWithProviders(<Text component="h1">Heading</Text>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
