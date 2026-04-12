import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const CardRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  backgroundColor: '#fff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '12px',
});

export const Avatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: palette.secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  fontWeight: 600,
  color: palette.primary,
  flexShrink: 0,
});

export const GuestName = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: palette.onSurface,
});

export const GuestContact = styled(Typography)({
  fontSize: 12,
  color: palette.onSurfaceVariant,
});
