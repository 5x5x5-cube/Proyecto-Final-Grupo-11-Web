import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outline,
  outlineVariant,
  background,
  secondaryContainer,
  primaryContainer,
  success,
  successContainer,
  error,
  errorContainer,
} from '@/design-system/theme/palette';

/* ─── Page Layout ─── */

export const ThreeColumnLayout = styled(Box)({
  display: 'flex',
  margin: '-32px -48px',
  minHeight: 'calc(100vh - 64px)',
});

export const CenterPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
});

export const MainContent = styled(Box)({
  flex: 1,
  padding: '36px 48px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

/* ─── Left Sidebar ─── */

export const UserSidebarContainer = styled(Box)({
  width: 280,
  flexShrink: 0,
  background: '#fff',
  borderRight: `1px solid ${outlineVariant}`,
  padding: '32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const UserCard = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 12px',
  background: background,
  borderRadius: '12px',
  marginBottom: '16px',
});

export const UserAvatar = styled(Box)({
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  fontWeight: 700,
  color: primary,
  flexShrink: 0,
});

export const SidebarSectionTitle = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: onSurfaceVariant,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  padding: '0 12px',
  marginBottom: '8px',
});

export const SidebarMenuItem = styled(Box)<{
  active?: boolean;
  component?: React.ElementType;
  to?: string;
}>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '100px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  color: active ? primary : onSurfaceVariant,
  background: active ? secondaryContainer : 'transparent',
  textDecoration: 'none',
  '&:hover': {
    background: active ? secondaryContainer : 'rgba(0,0,0,0.04)',
  },
}));

export const MenuItemLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: 'inherit',
});

export const MenuItemBadge = styled(Box)({
  marginLeft: 'auto',
  background: primary,
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  padding: '2px 7px',
  borderRadius: '100px',
});

export const SidebarDivider = styled(Box)({
  height: 1,
  background: outlineVariant,
  marginTop: '12px',
  marginBottom: '12px',
});

export const SidebarBottomItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '100px',
  cursor: 'pointer',
  color: onSurfaceVariant,
  '&:hover': { background: 'rgba(0,0,0,0.04)' },
});

/* ─── Right Sidebar ─── */

export const RightSidebarContainer = styled(Box)({
  width: 380,
  flexShrink: 0,
  background: '#fff',
  borderLeft: `1px solid ${outlineVariant}`,
  padding: '32px 28px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const PriceSummaryTitle = styled(Typography)({
  fontSize: 17,
  fontWeight: 700,
  color: onSurface,
});

export const PriceRowsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const PriceRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const PriceRowValue = styled(Typography)({
  fontSize: 14,
  color: onSurface,
});

export const CancelBox = styled(Box)({
  background: errorContainer,
  borderRadius: '12px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const CancelBoxHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const CancelBoxTitle = styled(Typography)({
  fontSize: 15,
  fontWeight: 600,
  color: error,
});

/* ─── Page Header ─── */

export const PageHeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginTop: '4px',
});

export const PageTitle = styled(Typography)({
  fontSize: 26,
  fontWeight: 700,
  color: onSurface,
});

export const BookingCodeRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const ModalTriggerRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginTop: '12px',
});

/* ─── Hotel Info ─── */

export const HotelRow = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
});

export const HotelThumbnail = styled(Box)({
  width: 100,
  height: 100,
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #003740, #006874)',
  flexShrink: 0,
});

export const HotelInfoColumn = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const HotelRatingRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const LocationRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

/* ─── Room Row ─── */

export const RoomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '14px 18px',
  background: background,
  borderRadius: '12px',
});

export const RoomThumbnail = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #006874, #4A9FAA)',
  flexShrink: 0,
});

export const RoomAmenityTag = styled(Box)({
  fontSize: 11,
  color: onSurfaceVariant,
  background: '#fff',
  border: `1px solid ${outlineVariant}`,
  padding: '3px 10px',
  borderRadius: '100px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

/* ─── Payment History ─── */

export const PaymentRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '14px 0',
});

export const PaymentIcon = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: successContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const PaymentAmount = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: success,
});

export const PaymentBadge = styled(Box)({
  fontSize: 11,
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: '100px',
  background: successContainer,
  color: success,
});

export const PaymentRightCol = styled(Box)({
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'flex-end',
});

/* ─── Modals ─── */

export const ModalEmailBanner = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  background: primaryContainer,
  borderRadius: '12px',
});

export const ModalEmailTitle = styled(Typography)({
  fontSize: 13,
  fontWeight: 600,
  color: primary,
});

export const ModalSummarySection = styled(Box)({
  background: background,
  borderRadius: '12px',
  padding: '16px',
});

export const ModalSectionLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: outline,
  marginBottom: '10px',
});

export const ModalRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 0',
});

export const ModalRowValue = styled(Typography)({
  fontSize: 13,
  fontWeight: 600,
  color: onSurface,
});

export const ModalTotalLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
  color: onSurface,
});

export const ModalTotalValue = styled(Typography)({
  fontSize: 16,
  fontWeight: 700,
  color: primary,
});

export const NextStepRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '6px 0',
});

export const NextStepIcon = styled(Box)({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: successContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

/* ─── Cancel Modal ─── */

export const CancelModalRowValue = styled(Typography)<{ color?: string }>(({ color: c }) => ({
  fontSize: 13,
  fontWeight: 600,
  color: c ?? onSurface,
}));

export const RefundTotalBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 14px',
  background: successContainer,
  borderRadius: '10px',
  marginTop: '4px',
});

export const RefundTotalLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
  color: success,
});

export const RefundTotalValue = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: success,
});

export const RefundMethodBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 14px',
  background: '#FAFDFE',
  borderRadius: '10px',
  border: `1px solid ${outlineVariant}`,
});

export const RefundMethodIcon = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #006874, #004F58)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const RefundMethodTitle = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: onSurface,
});

export const RefundMethodCaption = styled(Typography)({
  fontSize: 11,
  color: outline,
});

export const TimelineRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
