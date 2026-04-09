import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const BrandLogo = styled(Typography)({
  fontSize: 57,
  letterSpacing: '-0.25px',
  lineHeight: '64px',
  color: palette.onSurface,
});

export const BrandLight = styled('span')({
  fontWeight: 300,
});

export const BrandBold = styled('span')({
  fontWeight: 800,
});
