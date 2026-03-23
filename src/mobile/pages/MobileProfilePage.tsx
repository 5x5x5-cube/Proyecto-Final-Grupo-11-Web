import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileShell from '../components/MobileShell';
import ProfileMenuRow from '../../design-system/components/ProfileMenuRow';
import { palette } from '../../design-system/theme/palette';
import { useLocale, languageNames, currencyNames } from '../../contexts/LocaleContext';
import type { Language, Currency } from '../../contexts/LocaleContext';

const languages: Language[] = ['ES', 'EN'];
const currencies: Currency[] = ['COP', 'USD', 'MXN', 'ARS', 'CLP', 'PEN'];

export default function MobileProfilePage() {
  const { t } = useTranslation('mobile');
  const { language, currency, setLanguage, setCurrency } = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const open = params.get('open');
    if (open === 'language') setLangOpen(true);
    if (open === 'currency') setCurOpen(true);
  }, []);

  return (
    <MobileShell activeTab="profile">
      <Box sx={{ px: '16px', pt: '20px', pb: '16px' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px', mb: '24px' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: palette.primary,
              color: palette.onPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            CM
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.onSurface }}>
              Carlos Martinez
            </Typography>
            <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
              carlos.martinez@email.com
            </Typography>
          </Box>
        </Box>

        {/* Informacion personal */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            px: '16px',
            mb: '12px',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.onSurface, pt: '14px', pb: '4px' }}>
            {t('profile.personalInfo')}
          </Typography>
          <ProfileMenuRow icon={<PersonOutlineIcon sx={{ fontSize: 20 }} />} label={t('profile.name')} />
          <Box sx={{ borderTop: `1px solid ${palette.outlineVariant}` }} />
          <ProfileMenuRow icon={<EmailOutlinedIcon sx={{ fontSize: 20 }} />} label={t('profile.email')} />
          <Box sx={{ borderTop: `1px solid ${palette.outlineVariant}` }} />
          <ProfileMenuRow icon={<PhoneOutlinedIcon sx={{ fontSize: 20 }} />} label={t('profile.phone')} />
        </Box>

        {/* Preferencias */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            px: '16px',
            mb: '12px',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.onSurface, pt: '14px', pb: '4px' }}>
            {t('profile.preferences')}
          </Typography>
          <Box ref={langRef}>
            <ProfileMenuRow
              icon={<LanguageIcon sx={{ fontSize: 20 }} />}
              label={t('profile.language')}
              value={`${language} — ${languageNames[language]}`}
              onClick={() => setLangOpen(true)}
            />
          </Box>
          <Menu
            anchorEl={langRef.current}
            open={langOpen}
            onClose={() => setLangOpen(false)}
            slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 200 } } }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang}
                selected={lang === language}
                onClick={() => { setLanguage(lang); setLangOpen(false); }}
                sx={{ fontSize: 14 }}
              >
                {lang} — {languageNames[lang]}
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ borderTop: `1px solid ${palette.outlineVariant}` }} />
          <Box ref={curRef}>
            <ProfileMenuRow
              icon={<AttachMoneyIcon sx={{ fontSize: 20 }} />}
              label={t('profile.currency')}
              value={`${currency} — ${currencyNames[currency]}`}
              onClick={() => setCurOpen(true)}
            />
          </Box>
          <Menu
            anchorEl={curRef.current}
            open={curOpen}
            onClose={() => setCurOpen(false)}
            slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 240 } } }}
          >
            {currencies.map((cur) => (
              <MenuItem
                key={cur}
                selected={cur === currency}
                onClick={() => { setCurrency(cur); setCurOpen(false); }}
                sx={{ fontSize: 14 }}
              >
                {cur} — {currencyNames[cur]}
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ borderTop: `1px solid ${palette.outlineVariant}` }} />
          <ProfileMenuRow icon={<NotificationsNoneIcon sx={{ fontSize: 20 }} />} label={t('profile.notifications')} />
        </Box>

        {/* Logout */}
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to="/mobile/login"
          startIcon={<LogoutIcon />}
          sx={{
            borderColor: palette.error,
            color: palette.error,
            borderRadius: '12px',
            py: '12px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 14,
            '&:hover': { borderColor: palette.error, backgroundColor: palette.errorContainer },
          }}
        >
          {t('profile.logout')}
        </Button>
      </Box>
    </MobileShell>
  );
}
