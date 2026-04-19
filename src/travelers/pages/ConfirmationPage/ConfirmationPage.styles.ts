import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '20px',
  maxWidth: 520,
  margin: '0 auto',
  height: '100%',
});

export const SuccessIconCircle = styled(Box)({
  width: 96,
  height: 96,
  borderRadius: '50%',
  background: palette.successContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ConfirmationTitle = styled(Typography)({
  fontSize: 36,
  fontWeight: 700,
  color: palette.onSurface,
});

export const ConfirmationSubtitle = styled(Typography)({
  fontSize: 16,
  color: palette.onSurfaceVariant,
  lineHeight: 1.6,
});

export const BookingCodeCard = styled(Box)({
  background: '#fff',
  border: `2px solid ${palette.primary}`,
  borderRadius: '12px',
  padding: '16px 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const BookingCodeLabel = styled(Typography)({
  fontSize: 12,
  color: palette.onSurfaceVariant,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
});

export const BookingCodeValue = styled(Typography)({
  fontSize: 24,
  fontWeight: 700,
  color: palette.primary,
  letterSpacing: '2px',
});

export const EmailNoticePill = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: palette.successContainer,
  padding: '14px 20px',
  borderRadius: '100px',
});

export const EmailNoticeText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: palette.success,
});

export const ActionButtonsRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  width: '100%',
});
