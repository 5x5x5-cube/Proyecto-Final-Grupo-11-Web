import React from 'react';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
import { useHotelAuth } from '@/hotels/auth/HotelAuthContext';
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

// A nav item is either a link (has `path`) or an action (has `onClick`).
// Using a discriminated union keeps the render code honest — there is no
// legal state where both or neither are set.
type NavItem =
  | { id: string; label: string; icon: React.ElementType; path: string }
  | { id: string; label: string; icon: React.ElementType; onClick: () => void };

const HotelAdminSidebar: React.FC<HotelAdminSidebarProps> = ({ activeItem }) => {
  const { t } = useTranslation('common');
  const { hotel } = useHotel();
  const navigate = useNavigate();
  const hotelAuth = useHotelAuth();

  const handleLogout = () => {
    hotelAuth.logout();
    // replace so the admin cannot press "back" into the authenticated page
    // they were just on (the guard would redirect again, but this avoids the
    // round-trip and the brief flash).
    navigate('/hotel/login', { replace: true });
  };

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
    { id: 'cerrar-sesion', label: t('sidebar.logout'), icon: LogoutIcon, onClick: handleLogout },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = activeItem === item.id;
    const IconComp = item.icon;

    const content = (
      <NavItemBox $active={isActive}>
        <IconComp sx={{ fontSize: '20px', color: 'inherit' }} />
        <NavItemLabel $active={isActive}>{item.label}</NavItemLabel>
      </NavItemBox>
    );

    // Action item (e.g. logout): rendered as a button for proper semantics
    // and keyboard support. The icon + label are visual, so we surface the
    // label via aria-label for assistive tech and tests — Typography inside
    // a <button> does not participate in accessible-name calculation.
    if ('onClick' in item) {
      return (
        <Box
          key={item.id}
          component="button"
          type="button"
          aria-label={item.label}
          onClick={item.onClick}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            '&:focus-visible': {
              outline: '2px solid',
              outlineOffset: '2px',
              borderRadius: '10px',
            },
          }}
        >
          {content}
        </Box>
      );
    }

    // Link item: standard router navigation.
    return (
      <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
        {content}
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
