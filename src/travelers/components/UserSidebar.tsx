import { Box } from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import Text from '@/design-system/components/Text';
import {
  SidebarRoot,
  UserCard,
  UserAvatar,
  SidebarSectionTitle,
  SidebarMenuItem,
  MenuItemLabel,
  SidebarDivider,
} from '../pages/MyReservationsPage/MyReservationsPage.styles';

declare const __APP_VERSION__: string;

export default function UserSidebar() {
  const { t } = useTranslation('travelers');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarRoot>
      <UserCard>
        <UserAvatar>{user?.initials ?? '?'}</UserAvatar>
        <Box>
          <Text textVariant="bodySemibold">{user?.name}</Text>
          <Text textVariant="caption">{user?.email}</Text>
        </Box>
      </UserCard>

      <SidebarSectionTitle>{t('myReservations.sidebar.myAccount')}</SidebarSectionTitle>

      <Link to="/reservations" style={{ textDecoration: 'none' }}>
        <SidebarMenuItem active>
          <LuggageIcon sx={{ fontSize: 20 }} />
          <MenuItemLabel>{t('myReservations.sidebar.myReservations')}</MenuItemLabel>
        </SidebarMenuItem>
      </Link>

      <SidebarDivider />

      <SidebarMenuItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
        <LogoutIcon sx={{ fontSize: 20 }} />
        <MenuItemLabel>{t('myReservations.sidebar.logout')}</MenuItemLabel>
      </SidebarMenuItem>

      <Text textVariant="caption" sx={{ textAlign: 'center', opacity: 0.5 }}>
        v{__APP_VERSION__}
      </Text>
    </SidebarRoot>
  );
}
