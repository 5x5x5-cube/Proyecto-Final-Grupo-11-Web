import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const PageRoot = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: palette.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Roboto', sans-serif",
  overflow: 'hidden',
  position: 'relative',
});

export const DecorativeSquare = styled(Box)({
  position: 'fixed',
  width: 220,
  height: 220,
  backgroundColor: palette.primary,
  borderRadius: '12px',
  opacity: 0.18,
  top: -60,
  left: -60,
});

export const DecorativeCircle = styled(Box)({
  position: 'fixed',
  width: 140,
  height: 140,
  backgroundColor: palette.primary,
  borderRadius: '50%',
  opacity: 0.18,
  bottom: 80,
  right: 120,
});

export const DecorativeSmallSquare = styled(Box)({
  position: 'fixed',
  width: 80,
  height: 80,
  backgroundColor: palette.secondary,
  borderRadius: '12px',
  opacity: 0.18,
  top: 120,
  right: 300,
});

export const FormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
});

export const FormCard = styled(Box)({
  backgroundColor: '#ffffff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '12px',
  padding: '40px 32px',
  width: 480,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CardTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 500,
  color: palette.onSurface,
  marginBottom: '16px',
});

export const inputSx = {
  '& .MuiOutlinedInput-root': {
    height: 56,
    borderRadius: '4px',
    fontSize: 16,
    letterSpacing: '0.5px',
    color: palette.onSurface,
    '& fieldset': {
      borderColor: palette.outline,
    },
    '&:hover fieldset': {
      borderColor: palette.outline,
    },
    '&.Mui-focused fieldset': {
      borderColor: palette.primary,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: 12,
    fontWeight: 400,
    color: palette.outline,
    letterSpacing: '0.4px',
  },
  '& .MuiInputLabel-shrink': {
    fontSize: 12,
    color: palette.outline,
  },
  '& input::placeholder': {
    color: palette.onSurfaceVariant,
    opacity: 1,
  },
} as const;
