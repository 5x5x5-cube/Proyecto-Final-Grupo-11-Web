import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar } from '@mui/material';
import {
  primary,
  onPrimary,
  secondaryContainer,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  outline,
} from '../theme/palette';

export const SidebarRoot = styled(Box)({
  width: 280,
  height: '100vh',
  backgroundColor: secondaryContainer,
  borderRadius: '0 24px 24px 0',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 16px',
  flexShrink: 0,
  overflowY: 'auto',
});

export const BrandRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  padding: '0 8px',
});

export const BrandText = styled(Typography)({
  fontSize: 22,
  fontWeight: 800,
  color: primary,
  letterSpacing: '-0.25px',
});

export const PortalBadge = styled(Box)({
  backgroundColor: primary,
  color: onPrimary,
  borderRadius: '6px',
  padding: '2px 8px',
  fontSize: '10px',
  fontWeight: 600,
});

export const HotelCard = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255,255,255,0.5)',
  marginBottom: '24px',
  marginTop: '16px',
});

export const HotelAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  backgroundColor: primary,
  fontSize: '16px',
  fontWeight: 600,
});

export const HotelName = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: onSurface,
});

export const LocationRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

export const LocationText = styled(Typography)({
  fontSize: '12px',
  color: onSurfaceVariant,
});

export const SectionLabel = styled(Typography)({
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: outline,
  letterSpacing: '0.5px',
  padding: '0 16px',
  marginBottom: '8px',
});

export const NavGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  marginBottom: '24px',
});

export const NavItemBox = styled(Box, {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 16px',
  borderRadius: '10px',
  backgroundColor: $active ? primary : 'transparent',
  color: $active ? onPrimary : onSurface,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  '&:hover': {
    backgroundColor: $active ? primary : 'rgba(0,0,0,0.04)',
  },
}));

export const NavItemLabel = styled(Typography, {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  fontSize: '14px',
  fontWeight: $active ? 600 : 400,
  color: 'inherit',
}));

export const BottomSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  borderTop: `1px solid ${outlineVariant}`,
  paddingTop: '16px',
});

export const VersionText = styled(Typography)({
  fontSize: 11,
  textAlign: 'center',
  color: onSurfaceVariant,
  opacity: 0.5,
  paddingTop: '12px',
});
