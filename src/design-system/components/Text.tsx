import { Typography, type TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { palette } from '../theme/palette';

type TextVariant =
  | 'sectionTitle'
  | 'cardSubheading'
  | 'panelTitle'
  | 'bodyMedium'
  | 'bodySemibold'
  | 'body'
  | 'hint'
  | 'caption'
  | 'overline'
  | 'miniLabel'
  | 'price'
  | 'priceSmall';

interface TextStyleDef {
  fontSize: number;
  fontWeight?: number;
  color: string;
  textTransform?: string;
  letterSpacing?: string;
}

const variantMap: Record<TextVariant, TextStyleDef> = {
  sectionTitle: { fontSize: 18, fontWeight: 600, color: palette.onSurface },
  cardSubheading: { fontSize: 15, fontWeight: 600, color: palette.onSurface },
  panelTitle: { fontSize: 16, fontWeight: 600, color: palette.onSurface },
  bodyMedium: { fontSize: 14, fontWeight: 500, color: palette.onSurface },
  bodySemibold: { fontSize: 14, fontWeight: 600, color: palette.onSurface },
  body: { fontSize: 14, color: palette.onSurfaceVariant },
  hint: { fontSize: 13, color: palette.onSurfaceVariant },
  caption: { fontSize: 12, color: palette.onSurfaceVariant },
  overline: {
    fontSize: 11,
    fontWeight: 500,
    color: palette.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  miniLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: palette.outline,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  price: { fontSize: 20, fontWeight: 700, color: palette.primary },
  priceSmall: { fontSize: 16, fontWeight: 700, color: palette.primary },
};

interface TextProps extends Omit<TypographyProps, 'variant'> {
  textVariant?: TextVariant;
}

const Text = styled(Typography, {
  shouldForwardProp: prop => prop !== 'textVariant',
})<TextProps>(({ textVariant = 'body' }) => {
  const v = variantMap[textVariant];
  return {
    fontSize: v.fontSize,
    fontWeight: v.fontWeight,
    color: v.color,
    ...(v.textTransform && { textTransform: v.textTransform }),
    ...(v.letterSpacing && { letterSpacing: v.letterSpacing }),
  };
});

export default Text;
export type { TextVariant, TextProps };
