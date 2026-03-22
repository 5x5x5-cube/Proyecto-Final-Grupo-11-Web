import { Box, Typography, Button } from '@mui/material';
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

export default function MobileProfilePage() {
  const { t } = useTranslation('mobile');

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
          <ProfileMenuRow icon={<LanguageIcon sx={{ fontSize: 20 }} />} label={t('profile.language')} />
          <Box sx={{ borderTop: `1px solid ${palette.outlineVariant}` }} />
          <ProfileMenuRow icon={<AttachMoneyIcon sx={{ fontSize: 20 }} />} label={t('profile.currency')} />
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
