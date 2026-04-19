import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import LocaleSelector from '@/design-system/components/LocaleSelector';
import {
  primary,
  onPrimary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  surfaceContainer,
} from '../theme/palette';

interface TravelerNavProps {
  variant?: 'home' | 'results' | 'detail' | 'reservations';
  searchSummary?: string;
}

const Brand = () => (
  <Link to="/" style={{ textDecoration: 'none' }}>
    <Typography
      sx={{
        fontSize: 22,
        fontWeight: 800,
        color: primary,
        letterSpacing: '-0.25px',
        whiteSpace: 'nowrap',
      }}
    >
      <Box component="span" sx={{ fontWeight: 300 }}>
        Travel
      </Box>
      Hub
    </Typography>
  </Link>
);

const TravelerNav: React.FC<TravelerNavProps> = ({ variant = 'home', searchSummary }) => {
  const height = 72;
  const { t } = useTranslation('common');

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.hotels'), path: '/results' },
    { label: t('nav.offers'), path: '/results' },
  ];

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${outlineVariant}`,
        display: 'flex',
        alignItems: 'center',
        px: '48px',
        gap: '40px',
        zIndex: 1000,
      }}
    >
      <Brand />

      {/* Home variant: nav links */}
      {variant === 'home' && (
        <Box sx={{ display: 'flex', gap: '32px', flex: 1 }}>
          {navLinks.map(link => (
            <Link key={link.path + link.label} to={link.path} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: link.path === '/' ? primary : onSurfaceVariant,
                  letterSpacing: '0.1px',
                  '&:hover': { color: primary },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      )}

      {/* Results variant: search bar */}
      {variant === 'results' && (
        <Box
          sx={{
            flex: 1,
            maxWidth: 600,
            backgroundColor: surfaceContainer,
            borderRadius: '28px',
            height: 48,
            display: 'flex',
            alignItems: 'center',
            px: '20px',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <SearchIcon sx={{ color: onSurfaceVariant, fontSize: 20 }} />
          <Typography sx={{ fontSize: 14, color: onSurfaceVariant }}>
            {searchSummary || t('nav.searchDestinations')}
          </Typography>
        </Box>
      )}

      {/* Detail variant: breadcrumb */}
      {variant === 'detail' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Link to="/results" style={{ textDecoration: 'none' }}>
            <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>
              {t('nav.hotels')}
            </Typography>
          </Link>
          <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>/</Typography>
          <Typography sx={{ fontSize: '13px', color: onSurface, fontWeight: 500 }}>
            {t('nav.detail')}
          </Typography>
        </Box>
      )}

      {/* Reservations variant: spacer */}
      {variant === 'reservations' && <Box sx={{ flex: 1 }} />}

      {/* Language & Currency selectors */}
      <LocaleSelector />

      {/* Right actions */}
      {variant === 'reservations' ? (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', ml: 'auto' }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: primary,
              color: onPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            C
          </Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 500, color: onSurface }}>
            Carlos Martinez
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', ml: 'auto' }}>
          <OutlinedPillButton pillSize="sm" component={Link} to="/reservations">
            {t('nav.myReservations')}
          </OutlinedPillButton>
          <PrimaryPillButton pillSize="sm" component={Link} to="/login">
            {t('nav.login')}
          </PrimaryPillButton>
        </Box>
      )}
    </Box>
  );
};

export default TravelerNav;
