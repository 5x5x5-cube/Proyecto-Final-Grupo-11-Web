import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';
import { palette } from '@/design-system/theme/palette';

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
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  'aria-invalid'?: boolean;
}>(inputBase);

export const FormSelect = styled(Box)<{
  component?: React.ElementType;
  defaultValue?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}>({
  ...inputBase,
  cursor: 'pointer',
});

export const FieldError = styled(Typography)({
  fontSize: 12,
  color: palette.error,
  marginTop: '6px',
});
