import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

/* --- User Sidebar --- */

export const SidebarRoot = styled(Box)({
  width: 280,
  flexShrink: 0,
  background: '#fff',
  borderRight: `1px solid ${palette.outlineVariant}`,
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
  background: palette.background,
  borderRadius: '12px',
  marginBottom: '16px',
});

export const UserAvatar = styled(Box)({
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: palette.secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  fontWeight: 700,
  color: palette.primary,
  flexShrink: 0,
});

export const SidebarSectionTitle = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: palette.onSurfaceVariant,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  padding: '0 12px',
  marginBottom: '8px',
});

export const SidebarMenuItem = styled(Box, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '100px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  color: active ? palette.primary : palette.onSurfaceVariant,
  background: active ? palette.secondaryContainer : 'transparent',
  '&:hover': {
    background: active ? palette.secondaryContainer : 'rgba(0,0,0,0.04)',
  },
}));

export const MenuItemLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: 'inherit',
});

export const MenuBadge = styled(Box)({
  marginLeft: 'auto',
  background: palette.primary,
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  padding: '2px 7px',
  borderRadius: '100px',
});

export const SidebarDivider = styled(Box)({
  height: 1,
  background: palette.outlineVariant,
  margin: '12px 0',
});

/* --- Main Layout --- */

export const PageLayout = styled(Box)({
  display: 'flex',
  margin: '-32px -48px',
  minHeight: 'calc(100vh - 64px)',
});

export const MainContent = styled(Box)({
  flex: 1,
  padding: '36px 48px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const PageTitle = styled(Typography)({
  fontSize: 28,
  fontWeight: 700,
  color: palette.onSurface,
});

export const TabsBar = styled(Box)({
  display: 'flex',
  gap: 0,
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const Tab = styled(Box, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  padding: '12px 24px',
  fontSize: 14,
  fontWeight: 500,
  color: active ? palette.primary : palette.onSurfaceVariant,
  cursor: 'pointer',
  borderBottom: `2px solid ${active ? palette.primary : 'transparent'}`,
  marginBottom: '-1px',
}));

export const FiltersRow = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

export const CardList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

/* --- Reservation Card --- */

export const ReservationCard = styled(Box)({
  background: '#fff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  display: 'flex',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
  '&:hover': { boxShadow: '0 4px 16px rgba(0,104,116,0.12)' },
});

export const CardThumbnail = styled(Box)({
  width: 180,
  flexShrink: 0,
});

export const CardBody = styled(Box)({
  flex: 1,
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const HotelName = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: palette.onSurface,
});

export const DatesRow = styled(Box)({
  display: 'flex',
  gap: '24px',
  marginTop: '4px',
});

export const CardRightPanel = styled(Box)({
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  borderLeft: `1px solid ${palette.outlineVariant}`,
  width: 220,
  flexShrink: 0,
});

export const StatusGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '6px',
});

export const BookingCode = styled(Typography)({
  fontSize: 11,
  color: palette.onSurfaceVariant,
});

export const TotalLabel = styled(Typography)({
  fontSize: 11,
  color: palette.onSurfaceVariant,
});
