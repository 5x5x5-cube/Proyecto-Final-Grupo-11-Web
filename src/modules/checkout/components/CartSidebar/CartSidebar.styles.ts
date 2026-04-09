import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const SidebarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const SidebarTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: palette.onSurface,
});

export const BreakdownList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const BreakdownRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const BreakdownLabel = styled(Typography)({
  fontSize: 14,
  color: palette.onSurfaceVariant,
});

export const BreakdownValue = styled(Typography)({
  fontSize: 14,
  color: palette.onSurface,
});

export const Divider = styled(Box)({
  height: 1,
  backgroundColor: palette.outlineVariant,
});

export const TotalLabel = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: palette.onSurface,
});

export const TotalValue = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  color: palette.primary,
});

export const SecureNote = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
});

export const SecureText = styled(Typography)({
  fontSize: 12,
  color: palette.onSurfaceVariant,
});
