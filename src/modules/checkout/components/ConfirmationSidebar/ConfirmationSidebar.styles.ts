import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const SidebarRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const SidebarTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: palette.onSurface,
});

export const HotelMiniCard = styled(Box)({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start',
});

export const HotelThumbnail = styled(Box)({
  width: 80,
  height: 80,
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #003740, #006874)',
  flexShrink: 0,
});

export const HotelTypeLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 500,
  color: palette.primary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '4px',
});

export const HotelNameText = styled(Typography)({
  fontSize: 16,
  fontWeight: 700,
  color: palette.onSurface,
  marginBottom: '4px',
});

export const PaymentRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const PaymentAmount = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: palette.primary,
});

export const PaymentSuccessPill = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: palette.successContainer,
  padding: '4px 12px',
  borderRadius: '100px',
});

export const PaymentSuccessText = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: palette.success,
});

export const StepsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const StepCircle = styled(Box)({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: palette.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const StepNumber = styled(Typography)({
  fontSize: 12,
  fontWeight: 700,
  color: palette.primary,
});
