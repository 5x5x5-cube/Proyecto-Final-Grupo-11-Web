import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MobileShell from '../components/MobileShell';
import Brand from '../../design-system/components/Brand';
import { palette } from '../../design-system/theme/palette';
import LanguagePill from '../../design-system/components/LanguagePill';

export default function MobileRegisterPage() {
  const { t } = useTranslation('mobile');

  return (
    <MobileShell hideNav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: '24px',
          pt: '36px',
        }}
      >
        {/* Language selector */}
        <Box sx={{ alignSelf: 'flex-end', mb: '16px' }}>
          <LanguagePill />
        </Box>

        {/* Brand */}
        <Box sx={{ mb: '8px' }}>
          <Brand size={28} variant="nav" />
        </Box>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, mb: '32px' }}>
          {t('register.subtitle')}
        </Typography>

        {/* Register Card */}
        <Box
          sx={{
            width: '100%',
            background: '#fff',
            borderRadius: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '24px',
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface, mb: '20px' }}>
            {t('register.title')}
          </Typography>

          {/* Nombre completo */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('register.fullName')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                Juan Perez
              </Typography>
            </Box>
          </Box>

          {/* Email */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('register.email')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <EmailOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                viajero@email.com
              </Typography>
            </Box>
          </Box>

          {/* Telefono */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('register.phone')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                +57 300 123 4567
              </Typography>
            </Box>
          </Box>

          {/* Contrasena */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('register.password')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                ••••••••
              </Typography>
            </Box>
          </Box>

          {/* Confirmar contrasena */}
          <Box sx={{ mb: '24px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('register.confirmPassword')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                ••••••••
              </Typography>
            </Box>
          </Box>

          {/* Register Button */}
          <Box
            component={Link}
            to="/mobile/login"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: palette.primary,
              color: '#fff',
              borderRadius: '12px',
              py: '14px',
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 600,
              width: '100%',
              mb: '16px',
            }}
          >
            {t('register.button')}
          </Box>

          <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center' }}>
            {t('register.hasAccount')}{' '}
            <Link to="/mobile/login" style={{ color: palette.primary, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              {t('register.login')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </MobileShell>
  );
}
