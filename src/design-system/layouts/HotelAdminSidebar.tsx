import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
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
import {
  primary,
  onPrimary,
  secondaryContainer,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  outline,
} from '../theme/palette';

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

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: DashboardIcon, path: '/hotel/dashboard' },
    { id: 'reservas', label: t('sidebar.reservations'), icon: BookOnlineIcon, path: '/hotel/reservations' },
    { id: 'reportes', label: t('sidebar.reports'), icon: AssessmentIcon, path: '/hotel/reports' },
  ];

  const managementNavItems: NavItem[] = [
    { id: 'tarifas', label: t('sidebar.rates'), icon: PriceChangeIcon, path: '/hotel/rates' },
    { id: 'descuentos', label: t('sidebar.discounts'), icon: DiscountIcon, path: '/hotel/discounts' },
  ];

  const bottomNavItems: NavItem[] = [
    { id: 'configuracion', label: t('sidebar.settings'), icon: SettingsIcon, path: '/hotel/settings' },
    { id: 'cerrar-sesion', label: t('sidebar.logout'), icon: LogoutIcon, path: '/hotel/login' },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = activeItem === item.id;
    const IconComp = item.icon;

    return (
      <Link
        key={item.id}
        to={item.path}
        style={{ textDecoration: 'none' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 16px',
            borderRadius: '10px',
            backgroundColor: isActive ? primary : 'transparent',
            color: isActive ? onPrimary : onSurface,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            '&:hover': {
              backgroundColor: isActive ? primary : 'rgba(0,0,0,0.04)',
            },
          }}
        >
          <IconComp sx={{ fontSize: '20px', color: 'inherit' }} />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              color: 'inherit',
            }}
          >
            {item.label}
          </Typography>
        </Box>
      </Link>
    );
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: secondaryContainer,
        borderRadius: '0 24px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '8px', px: '8px' }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            color: primary,
            letterSpacing: '-0.25px',
          }}
        >
          <Box component="span" sx={{ fontWeight: 300 }}>Travel</Box>Hub
        </Typography>
        <Box
          sx={{
            backgroundColor: primary,
            color: onPrimary,
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '10px',
            fontWeight: 600,
          }}
        >
          {t('sidebar.hotelPortal')}
        </Box>
      </Box>

      {/* Hotel card */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          mb: '24px',
          mt: '16px',
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: primary,
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          HC
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: onSurface,
            }}
          >
            Hotel Caribe
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <LocationOnIcon sx={{ fontSize: '12px', color: onSurfaceVariant }} />
            <Typography
              sx={{
                fontSize: '12px',
                color: onSurfaceVariant,
              }}
            >
              Cartagena, Colombia
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main nav section */}
      <Typography
        sx={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: outline,
          letterSpacing: '0.5px',
          px: '16px',
          mb: '8px',
        }}
      >
        {t('sidebar.main')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mb: '24px' }}>
        {mainNavItems.map(renderNavItem)}
      </Box>

      {/* Management nav section */}
      <Typography
        sx={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: outline,
          letterSpacing: '0.5px',
          px: '16px',
          mb: '8px',
        }}
      >
        {t('sidebar.management')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mb: '24px' }}>
        {managementNavItems.map(renderNavItem)}
      </Box>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Bottom items */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          borderTop: `1px solid ${outlineVariant}`,
          paddingTop: '16px',
        }}
      >
        {bottomNavItems.map(renderNavItem)}
      </Box>
    </Box>
  );
};

export default HotelAdminSidebar;
