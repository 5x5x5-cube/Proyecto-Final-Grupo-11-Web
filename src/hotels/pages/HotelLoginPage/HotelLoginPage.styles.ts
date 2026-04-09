import { styled, Box, Typography, TextField as MuiTextField } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const PageRoot = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  overflow: 'hidden',
  fontFamily: "'Roboto', sans-serif",
});

export const FormSide = styled(Box)({
  backgroundColor: palette.surface,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px 96px',
  gap: '40px',
});

export const BrandSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'flex-start',
  width: '100%',
});

export const BrandName = styled(Typography)({
  fontSize: 32,
  fontWeight: 800,
  color: palette.primary,
  letterSpacing: '-0.5px',
});

export const PortalBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: palette.primaryContainer,
  color: palette.primary,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  padding: '4px 12px',
  borderRadius: '100px',
});

export const FormTitle = styled(Typography)({
  fontSize: 28,
  fontWeight: 700,
  color: palette.onSurface,
  marginBottom: '4px',
});

export const FormSubtitle = styled(Typography)({
  fontSize: 15,
  color: palette.onSurfaceVariant,
  marginBottom: '16px',
});

export const StyledTextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    height: 56,
    borderRadius: '8px',
    fontSize: 15,
    color: palette.onSurface,
    '& fieldset': { borderColor: palette.outline },
    '&:hover fieldset': { borderColor: palette.outline },
    '&.Mui-focused fieldset': { borderColor: palette.primary },
  },
  '& .MuiInputLabel-root': {
    fontSize: 12,
    color: palette.outline,
    letterSpacing: '0.4px',
  },
  '& .MuiInputLabel-shrink': { fontSize: 12, color: palette.outline },
  '& input::placeholder': { color: palette.onSurfaceVariant, opacity: 1 },
});

export const ForgotPasswordLink = styled(Typography)({
  textAlign: 'right',
  fontSize: 13,
  color: palette.primary,
  fontWeight: 500,
  cursor: 'pointer',
  marginBottom: '8px',
});

export const TrustBadgesBar = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  padding: '16px 20px',
  backgroundColor: palette.background,
  borderRadius: '12px',
  width: '100%',
});

export const TrustBadgeItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 12,
  color: palette.onSurfaceVariant,
});

export const VisualSide = styled(Box)({
  background: 'linear-gradient(160deg, #001F24 0%, #006874 50%, #4A6267 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px',
  gap: '32px',
  position: 'relative',
  overflow: 'hidden',
});

export const DecorativeCircle = styled(Box)<{
  size: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  variant?: 'border' | 'fill';
}>(({ size, top, right, bottom, left, variant = 'border' }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  ...(variant === 'border'
    ? { border: '1px solid rgba(255,255,255,0.08)' }
    : { background: 'rgba(255,255,255,0.04)' }),
  ...(top !== undefined && { top }),
  ...(right !== undefined && { right }),
  ...(bottom !== undefined && { bottom }),
  ...(left !== undefined && { left }),
}));

export const EyebrowText = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '2px',
  color: palette.primaryContainer,
  textTransform: 'uppercase',
  zIndex: 1,
});

export const HeroTitle = styled(Typography)({
  fontSize: 44,
  fontWeight: 700,
  color: palette.onPrimary,
  textAlign: 'center',
  lineHeight: 1.15,
  maxWidth: 560,
  zIndex: 1,
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 16,
  color: 'rgba(255,255,255,0.7)',
  textAlign: 'center',
  maxWidth: 480,
  lineHeight: 1.6,
  zIndex: 1,
});

export const StatCard = styled(Box)({
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '16px',
  padding: '20px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  textAlign: 'center',
});

export const StatNumber = styled(Typography)({
  fontSize: 28,
  fontWeight: 700,
  color: palette.onPrimary,
});

export const StatLabel = styled(Typography)({
  fontSize: 12,
  color: 'rgba(255,255,255,0.65)',
});

export const FeatureRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const FeatureIcon = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const FeatureText = styled(Typography)({
  fontSize: 14,
  color: 'rgba(255,255,255,0.85)',
  fontWeight: 500,
});
