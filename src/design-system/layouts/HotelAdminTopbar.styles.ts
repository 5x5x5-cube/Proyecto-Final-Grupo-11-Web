import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { primary, onSurface, onSurfaceVariant, outlineVariant, onPrimary } from '../theme/palette';

export const TopbarRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0',
  marginBottom: '8px',
});

export const LeftSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const BreadcrumbRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const BreadcrumbSeparator = styled(Typography)({
  fontSize: '13px',
  color: onSurfaceVariant,
});

export const BreadcrumbLink = styled(Typography)({
  fontSize: '13px',
  color: onSurfaceVariant,
  '&:hover': { color: primary },
});

export const BreadcrumbCurrent = styled(Typography)({
  fontSize: '13px',
  fontWeight: 500,
  color: onSurface,
});

export const TopbarTitle = styled(Typography)({
  fontSize: 26,
  fontWeight: 700,
  color: onSurface,
});

export const TopbarSubtitle = styled(Typography)({
  fontSize: 14,
  color: onSurfaceVariant,
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const NotificationButton = styled(IconButton)({
  border: `1px solid ${outlineVariant}`,
  borderRadius: '8px',
  width: 32,
  height: 32,
});

export const AdminAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: primary,
  color: onPrimary,
  fontSize: '13px',
  fontWeight: 600,
});
