import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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

export const BookingMiniCard = styled(Box)({
  backgroundColor: palette.background,
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
});

export const BookingThumbnail = styled(Box)({
  width: 60,
  height: 60,
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #003740, #006874)',
  flexShrink: 0,
});

export const PriceBreakdownList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const PriceRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const PriceRowValue = styled(Typography)({
  fontSize: 14,
  color: palette.onSurface,
});

export const Divider = styled(Box)({
  height: 1,
  backgroundColor: palette.outlineVariant,
});

export const TotalPrice = styled(Typography)({
  fontSize: 24,
  fontWeight: 700,
  color: palette.primary,
});

export const SecureNote = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
});
