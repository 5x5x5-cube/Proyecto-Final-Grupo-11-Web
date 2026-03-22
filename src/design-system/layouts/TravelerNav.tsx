import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { useLocale, currencyNames, languageNames } from '../../contexts/LocaleContext';
import type { Language, Currency } from '../../contexts/LocaleContext';
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

const languages: Language[] = ['ES', 'EN'];
const currencies: Currency[] = ['COP', 'USD', 'MXN', 'ARS', 'CLP', 'PEN'];

const TravelerNav: React.FC<TravelerNavProps> = ({ variant = 'home', searchSummary }) => {
  const height = 72;
  const { t } = useTranslation('common');
  const { language, currency, setLanguage, setCurrency } = useLocale();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [curAnchor, setCurAnchor] = useState<null | HTMLElement>(null);

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
            {searchSummary || t('nav.searchDestinations')}
          </Typography>
        </Box>
      )}

      {/* Detail variant: breadcrumb */}
      {variant === 'detail' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Link to="/results" style={{ textDecoration: 'none' }}>
            <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>{t('nav.hotels')}</Typography>
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Language selector */}
        <Box
          onClick={(e) => setLangAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
            '&:hover': { backgroundColor: surfaceContainer },
          }}
        >
          <LanguageIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
          <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>{language}</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
        </Box>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
          slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 180 } } }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang}
              selected={lang === language}
              onClick={() => { setLanguage(lang); setLangAnchor(null); }}
              sx={{ fontSize: 13 }}
            >
              {lang} — {languageNames[lang]}
            </MenuItem>
          ))}
        </Menu>

        {/* Currency selector */}
        <Box
          onClick={(e) => setCurAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
            '&:hover': { backgroundColor: surfaceContainer },
          }}
        >
          <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>{currency}</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
        </Box>
        <Menu
          anchorEl={curAnchor}
          open={Boolean(curAnchor)}
          onClose={() => setCurAnchor(null)}
          slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 220 } } }}
        >
          {currencies.map((cur) => (
            <MenuItem
              key={cur}
              selected={cur === currency}
              onClick={() => { setCurrency(cur); setCurAnchor(null); }}
              sx={{ fontSize: 13 }}
            >
              {cur} — {currencyNames[cur]}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Right actions */}
      {variant === 'reservations' ? (
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
      ) : (
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
            {t('nav.myReservations')}
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
            {t('nav.login')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TravelerNav;
