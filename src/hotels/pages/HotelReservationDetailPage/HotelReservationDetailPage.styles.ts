import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const HeaderCard = styled(Box)({
  backgroundColor: palette.surface,
  borderRadius: '16px',
  padding: '20px 24px',
  border: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '20px',
});

export const BookingCodeBadge = styled(Box)({
  backgroundColor: palette.primaryContainer,
  color: palette.primary,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '1px',
  padding: '8px 16px',
  borderRadius: '10px',
});

export const HeaderTitle = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: palette.onSurface,
});

export const HeaderMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: 13,
  color: palette.onSurfaceVariant,
});

export const PendingBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: 12,
  fontWeight: 600,
  padding: '4px 12px',
  borderRadius: '100px',
  backgroundColor: palette.warningContainer,
  color: palette.warning,
});

export const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 340px',
  gap: '20px',
});

export const GuestAvatar = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${palette.primaryContainer}, ${palette.secondaryContainer})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const GuestName = styled(Typography)({
  fontSize: 16,
  fontWeight: 700,
  color: palette.onSurface,
});

export const ContactRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: 12,
  color: palette.onSurfaceVariant,
});

export const RoomSectionLabel = styled(Typography)({
  fontSize: 13,
  fontWeight: 700,
  color: palette.onSurface,
});

export const RoomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px',
  backgroundColor: palette.background,
  borderRadius: '12px',
});

export const RoomImage = styled(Box)({
  width: 80,
  height: 56,
  borderRadius: '8px',
  background: `linear-gradient(135deg, ${palette.primary} 0%, #4A6267 100%)`,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const RoomTitle = styled(Typography)({
  fontSize: 13,
  fontWeight: 600,
  color: palette.onSurface,
});

export const RoomSubtitle = styled(Typography)({
  fontSize: 11,
  color: palette.onSurfaceVariant,
});

export const AmenityChip = styled(Box)({
  fontSize: 10,
  color: palette.onSurfaceVariant,
  backgroundColor: palette.surfaceVariant,
  padding: '2px 8px',
  borderRadius: '100px',
});

export const PriceLineLabel = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
});

export const PaymentMethodRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  backgroundColor: palette.background,
  borderRadius: '10px',
  marginTop: '12px',
});

export const PaymentMethodIcon = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #006874, #004F58)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const PaymentMethodName = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: palette.onSurface,
});

export const PaymentMethodNumber = styled(Typography)({
  fontSize: 11,
  color: palette.outline,
});

export const ApprovedBadge = styled(Box)({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: palette.successContainer,
  color: palette.success,
  fontSize: 11,
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: '100px',
});

export const PolicyValue = styled(Typography)<{ valueColor: string }>(({ valueColor }) => ({
  fontWeight: 600,
  color: valueColor,
  fontSize: 12,
}));
