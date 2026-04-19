import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocale, currencyNames, languageNames } from '@/contexts/LocaleContext';
import type { Language, Currency } from '@/contexts/LocaleContext';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  onPrimary,
  surfaceContainer,
} from '../theme/palette';

const languages: Language[] = ['ES', 'EN'];
const currencies: Currency[] = ['COP', 'USD', 'MXN', 'ARS', 'CLP', 'PEN'];

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HotelAdminTopbarProps {
  breadcrumbs?: Breadcrumb[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const HotelAdminTopbar: React.FC<HotelAdminTopbarProps> = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
}) => {
  const { language, currency, setLanguage, setCurrency } = useLocale();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [curAnchor, setCurAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        marginBottom: '8px',
      }}
    >
      {/* Left: breadcrumbs + title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>/</Typography>
                )}
                {crumb.href ? (
                  <Link to={crumb.href} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: onSurfaceVariant,
                        '&:hover': { color: primary },
                      }}
                    >
                      {crumb.label}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: onSurface,
                    }}
                  >
                    {crumb.label}
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
        {title && (
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: onSurface }}>{title}</Typography>
        )}
        {subtitle && (
          <Typography sx={{ fontSize: 14, color: onSurfaceVariant }}>{subtitle}</Typography>
        )}
      </Box>

      {/* Right: page actions + global actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {actions}

        {/* Language selector */}
        <Box
          onClick={e => setLangAnchor(e.currentTarget)}
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
          <LanguageIcon sx={{ fontSize: '16px', color: onSurfaceVariant }} />
          <Typography sx={{ fontSize: '12px', color: onSurfaceVariant }}>{language}</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
        </Box>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
          slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 180 } } }}
        >
          {languages.map(lang => (
            <MenuItem
              key={lang}
              selected={lang === language}
              onClick={() => {
                setLanguage(lang);
                setLangAnchor(null);
              }}
              sx={{ fontSize: 13 }}
            >
              {lang} — {languageNames[lang]}
            </MenuItem>
          ))}
        </Menu>

        {/* Currency selector */}
        <Box
          onClick={e => setCurAnchor(e.currentTarget)}
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
          <Typography sx={{ fontSize: '12px', color: onSurfaceVariant }}>{currency}</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
        </Box>
        <Menu
          anchorEl={curAnchor}
          open={Boolean(curAnchor)}
          onClose={() => setCurAnchor(null)}
          slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 220 } } }}
        >
          {currencies.map(cur => (
            <MenuItem
              key={cur}
              selected={cur === currency}
              onClick={() => {
                setCurrency(cur);
                setCurAnchor(null);
              }}
              sx={{ fontSize: 13 }}
            >
              {cur} — {currencyNames[cur]}
            </MenuItem>
          ))}
        </Menu>

        {/* Notification bell */}
        <IconButton
          size="small"
          sx={{
            border: `1px solid ${outlineVariant}`,
            borderRadius: '8px',
            width: 32,
            height: 32,
          }}
        >
          <NotificationsNoneIcon sx={{ fontSize: '18px', color: onSurfaceVariant }} />
        </IconButton>

        {/* Avatar */}
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: primary,
            color: onPrimary,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          AD
        </Avatar>
      </Box>
    </Box>
  );
};

export default HotelAdminTopbar;
