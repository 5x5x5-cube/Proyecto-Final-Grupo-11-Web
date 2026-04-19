import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const BannerRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  backgroundColor: palette.secondaryContainer,
  borderRadius: '8px',
  marginBottom: '4px',
});

export const BannerText = styled(Typography)({
  fontSize: 13,
  color: palette.primary,
});
