import { styled } from '@mui/material/styles';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const PageRoot = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: palette.background,
  fontFamily: "'Roboto', sans-serif",
});

export const HeroSection = styled(Box)({
  marginTop: '72px',
  height: 560,
  position: 'relative',
  background: 'linear-gradient(135deg, #003740 0%, #006874 45%, #4A6267 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    top: -120,
    right: -80,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -80,
    left: 60,
  },
});

export const HeroEyebrow = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: '1.5px',
  color: palette.primaryContainer,
  textTransform: 'uppercase',
});

export const HeroTitle = styled(Typography)({
  fontSize: 57,
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 1.1,
  letterSpacing: '-0.25px',
  maxWidth: 720,
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.75)',
  textAlign: 'center',
  maxWidth: 560,
  lineHeight: 1.5,
});

export const SearchCard = styled(Box)({
  position: 'relative',
  zIndex: 10,
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 32px rgba(0,104,116,0.18)',
  padding: '8px',
  display: 'flex',
  alignItems: 'stretch',
  width: 880,
  maxWidth: '90%',
  marginTop: '16px',
});

export const SearchField = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 20px',
  borderRight: `1px solid ${palette.outlineVariant}`,
  cursor: 'pointer',
  borderRadius: '12px',
  '&:hover': { backgroundColor: 'rgba(0,104,116,0.04)' },
});

export const SearchFieldNoBorder = styled(SearchField)({
  borderRight: 'none',
});

export const SearchFieldLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 500,
  color: palette.primary,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  marginBottom: '4px',
});

export const SearchFieldValue = styled(Typography, {
  shouldForwardProp: prop => prop !== 'hasValue',
})<{ hasValue?: boolean }>(({ hasValue }) => ({
  fontSize: 15,
  fontWeight: hasValue ? 500 : 400,
  color: hasValue ? palette.onSurface : palette.outline,
}));

export const SearchButton = styled(Button)({
  minWidth: 120,
  backgroundColor: palette.primary,
  borderRadius: '12px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 15,
  fontWeight: 500,
  color: '#ffffff',
  textTransform: 'none',
  letterSpacing: '0.1px',
  padding: '0 24px',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: palette.primary,
  },
});

export const GuestCounterBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 20px',
});

export const GuestCounterButton = styled(IconButton)({
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '8px',
  color: palette.primary,
  '&:disabled': { borderColor: palette.outlineVariant, opacity: 0.4 },
});

export const GuestCountText = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: palette.onSurface,
  minWidth: 24,
  textAlign: 'center',
});

export const DestinationsSection = styled(Box)({
  padding: '40px 48px 0',
});

export const DestinationsTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 600,
  color: palette.onSurface,
  marginBottom: '20px',
});

export const DestinationsGrid = styled(Box)({
  display: 'flex',
  gap: '16px',
});

export const DestinationCard = styled(Box)({
  flex: 1,
  height: 164,
  borderRadius: '16px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const DestinationGradient = styled(Box)({
  width: '100%',
  height: '100%',
});

export const DestinationOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '16px',
});

export const DestinationName = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: '#ffffff',
});

export const DestinationMeta = styled(Typography)({
  fontSize: 13,
  color: 'rgba(255,255,255,0.8)',
});
