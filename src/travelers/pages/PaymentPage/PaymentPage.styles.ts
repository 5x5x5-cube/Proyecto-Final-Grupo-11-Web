import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';
import { palette } from '@/design-system/theme/palette';

/* ── Sidebar ── */
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

export const PayButtonInner = styled(Box)({
  height: 56,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const SecureNote = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
});

/* ── Main content ── */
export const CardList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const FormFieldsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const PaymentTabsRow = styled(Box)({
  display: 'flex',
  gap: '12px',
});

const paymentTabBase = {
  flex: 1,
  padding: '16px',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: '8px',
};

export const PaymentTabActive = styled(Box)({
  ...paymentTabBase,
  border: `2px solid ${palette.primary}`,
  backgroundColor: '#f0fbfc',
});

export const PaymentTabInactive = styled(Box)({
  ...paymentTabBase,
  border: `2px solid ${palette.outlineVariant}`,
  backgroundColor: '#fff',
});

export const PaymentTabEmoji = styled(Typography)({
  fontSize: 28,
});

export const PaymentTabLabelActive = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
  color: palette.primary,
});

export const PaymentTabLabelInactive = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
  color: palette.onSurfaceVariant,
});

/* ── Card Preview ── */
export const CardPreview = styled(Box)({
  background: 'linear-gradient(135deg, #003740 0%, #006874 60%, #4A9FAA 100%)',
  borderRadius: '16px',
  padding: '24px',
  width: 340,
  height: 200,
  margin: '0 auto',
  aspectRatio: '1.586 / 1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const CardPreviewHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const CardChip = styled(Box)({
  width: 36,
  height: 28,
  background: 'linear-gradient(135deg, #C89030, #F4A020)',
  borderRadius: '4px',
});

export const CardBrand = styled(Typography)({
  fontSize: 22,
  fontWeight: 800,
  color: 'rgba(255,255,255,0.9)',
  fontStyle: 'italic',
});

export const CardNumber = styled(Typography)({
  fontSize: 18,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.9)',
  letterSpacing: '3px',
});

export const CardPreviewFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

export const CardFieldLabel = styled(Typography)({
  fontSize: 10,
  color: 'rgba(255,255,255,0.6)',
  letterSpacing: '0.5px',
  marginBottom: '2px',
});

export const CardFieldLabelRight = styled(Typography)({
  fontSize: 10,
  color: 'rgba(255,255,255,0.6)',
  letterSpacing: '0.5px',
  marginBottom: '2px',
  textAlign: 'right',
});

export const CardFieldValue = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#fff',
});

/* ── Form Inputs ── */
export const FormFieldsGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const FormRowThreeCol = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '16px',
});

const inputBase = {
  width: '100%',
  height: 52,
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '0 16px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 15,
  color: palette.onSurface,
  backgroundColor: '#fff',
  outline: 'none',
  boxSizing: 'border-box' as const,
  '&:focus': { borderColor: palette.primary },
};

export const FormInput = styled(Box)<{
  component?: React.ElementType;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}>(inputBase);

export const FormSelect = styled(Box)<{
  component?: React.ElementType;
  defaultValue?: string;
}>({
  ...inputBase,
  cursor: 'pointer',
});
