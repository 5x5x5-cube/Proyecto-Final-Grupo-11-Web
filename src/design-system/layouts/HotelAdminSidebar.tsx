import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DiscountIcon from '@mui/icons-material/Discount';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useHotel } from '@/contexts/HotelContext';
import { onSurfaceVariant } from '../theme/palette';
import {
  SidebarRoot,
  BrandRow,
  BrandText,
  PortalBadge,
  HotelCard,
  HotelAvatar,
  HotelName,
  LocationRow,
  LocationText,
  SectionLabel,
  NavGroup,
  NavItemBox,
  NavItemLabel,
  BottomSection,
  VersionText,
} from './HotelAdminSidebar.styles';

declare const __APP_VERSION__: string;

interface HotelAdminSidebarProps {
  activeItem: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const HotelAdminSidebar: React.FC<HotelAdminSidebarProps> = ({ activeItem }) => {
  const { t } = useTranslation('common');
  const { hotel } = useHotel();

  const mainNavItems: NavItem[] = [
    {
      id: 'dashboard',
      label: t('sidebar.dashboard'),
      icon: DashboardIcon,
      path: '/hotel/dashboard',
    },
    {
      id: 'reservas',
      label: t('sidebar.reservations'),
      icon: BookOnlineIcon,
      path: '/hotel/reservations',
    },
    { id: 'reportes', label: t('sidebar.reports'), icon: AssessmentIcon, path: '/hotel/reports' },
  ];

  const managementNavItems: NavItem[] = [
    { id: 'tarifas', label: t('sidebar.rates'), icon: PriceChangeIcon, path: '/hotel/rates' },
    {
      id: 'descuentos',
      label: t('sidebar.discounts'),
      icon: DiscountIcon,
      path: '/hotel/discounts',
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: 'configuracion',
      label: t('sidebar.settings'),
      icon: SettingsIcon,
      path: '/hotel/settings',
    },
    { id: 'cerrar-sesion', label: t('sidebar.logout'), icon: LogoutIcon, path: '/hotel/login' },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = activeItem === item.id;
    const IconComp = item.icon;

    return (
      <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
        <NavItemBox $active={isActive}>
          <IconComp sx={{ fontSize: '20px', color: 'inherit' }} />
          <NavItemLabel $active={isActive}>{item.label}</NavItemLabel>
        </NavItemBox>
      </Link>
    );
  };

  return (
    <SidebarRoot>
      {/* Brand */}
      <BrandRow>
        <BrandText>
          <Box component="span" sx={{ fontWeight: 300 }}>
            Travel
          </Box>
          Hub
        </BrandText>
        <PortalBadge>{t('sidebar.hotelPortal')}</PortalBadge>
      </BrandRow>

      {/* Hotel card */}
      <HotelCard>
        <HotelAvatar>{hotel.initials}</HotelAvatar>
        <Box>
          <HotelName>{hotel.name}</HotelName>
          <LocationRow>
            <LocationOnIcon sx={{ fontSize: '12px', color: onSurfaceVariant }} />
            <LocationText>{hotel.location}</LocationText>
          </LocationRow>
        </Box>
      </HotelCard>

      {/* Main nav */}
      <SectionLabel>{t('sidebar.main')}</SectionLabel>
      <NavGroup>{mainNavItems.map(renderNavItem)}</NavGroup>

      {/* Management nav */}
      <SectionLabel>{t('sidebar.management')}</SectionLabel>
      <NavGroup>{managementNavItems.map(renderNavItem)}</NavGroup>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Bottom items */}
      <BottomSection>{bottomNavItems.map(renderNavItem)}</BottomSection>

      <VersionText>v{__APP_VERSION__}</VersionText>
    </SidebarRoot>
  );
};

export default HotelAdminSidebar;
