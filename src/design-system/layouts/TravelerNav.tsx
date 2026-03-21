import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
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

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Hoteles', path: '/results' },
  { label: 'Ofertas', path: '/results' },
];

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

const NavActions = () => (
  <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', ml: 'auto' }}>
    <Button
      variant="text"
      component={Link}
      to="/reservations"
      sx={{
        height: 40,
        px: '16px',
        borderRadius: '100px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: 14,
        fontWeight: 500,
        color: primary,
        textTransform: 'none',
        letterSpacing: '0.1px',
      }}
    >
      Mis reservas
    </Button>
    <Button
      variant="contained"
      disableElevation
      component={Link}
      to="/login"
      sx={{
        height: 40,
        px: '20px',
        backgroundColor: primary,
        borderRadius: '100px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: 14,
        fontWeight: 500,
        color: '#ffffff',
        textTransform: 'none',
        letterSpacing: '0.1px',
        '&:hover': { backgroundColor: primary },
      }}
    >
      Iniciar sesion
    </Button>
  </Box>
);

const UserAvatar = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', ml: 'auto' }}>
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
);

const TravelerNav: React.FC<TravelerNavProps> = ({ variant = 'home', searchSummary }) => {
  const height = 72;

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
          {navLinks.map((link) => (
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
            {searchSummary || 'Buscar destinos'}
          </Typography>
        </Box>
      )}

      {/* Detail variant: breadcrumb */}
      {variant === 'detail' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Link to="/results" style={{ textDecoration: 'none' }}>
            <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>Hoteles</Typography>
          </Link>
          <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>/</Typography>
          <Typography sx={{ fontSize: '13px', color: onSurface, fontWeight: 500 }}>
            Detalle
          </Typography>
        </Box>
      )}

      {/* Reservations variant: spacer */}
      {variant === 'reservations' && <Box sx={{ flex: 1 }} />}

      {/* Language & Currency selectors */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
          }}
        >
          <LanguageIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
          <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>ES</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>COP</Typography>
        </Box>
      </Box>

      {/* Right actions */}
      {variant === 'reservations' ? <UserAvatar /> : <NavActions />}
    </Box>
  );
};

export default TravelerNav;
