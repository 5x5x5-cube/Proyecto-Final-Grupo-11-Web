import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const PolicyList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const PolicyRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const PolicyText = styled(Typography)({
  fontSize: 13,
  color: palette.onSurface,
});
