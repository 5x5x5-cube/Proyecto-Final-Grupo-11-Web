import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

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
  background: 'transparent',
  fontFamily: "'Roboto', sans-serif",
  transition: 'border-color 120ms ease, background-color 120ms ease',
  '&:focus-visible': {
    outline: `2px solid ${palette.primary}`,
    outlineOffset: '2px',
  },
};

export const PaymentTab = styled('button', {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  ...paymentTabBase,
  border: `2px solid ${$active ? palette.primary : palette.outlineVariant}`,
  backgroundColor: $active ? '#f0fbfc' : '#fff',
}));

export const PaymentTabLabel = styled(Typography, {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: $active ? palette.primary : palette.onSurfaceVariant,
}));

export const PaymentTabEmoji = styled(Typography)({
  fontSize: 28,
});
