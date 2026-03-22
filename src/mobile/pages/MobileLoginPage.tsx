import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MobileShell from '../components/MobileShell';
import Brand from '../../design-system/components/Brand';
import { palette } from '../../design-system/theme/palette';

export default function MobileLoginPage() {
  const { t } = useTranslation('mobile');

  return (
    <MobileShell hideNav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: '24px',
          pt: '48px',
        }}
      >
        {/* Brand */}
        <Box sx={{ mb: '8px' }}>
          <Brand size={28} variant="nav" />
        </Box>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, mb: '40px' }}>
          {t('login.subtitle')}
        </Typography>

        {/* Login Card */}
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
            {t('login.title')}
          </Typography>

          {/* Email */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('login.email')}
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

          {/* Password */}
          <Box sx={{ mb: '24px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              {t('login.password')}
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

          {/* Login Button */}
          <Box
            component={Link}
            to="/mobile/reservations"
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
            {t('login.button')}
          </Box>

          <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center' }}>
            {t('login.noAccount')}{' '}
            <Link to="/mobile/register" style={{ color: palette.primary, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              {t('login.register')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </MobileShell>
  );
}
