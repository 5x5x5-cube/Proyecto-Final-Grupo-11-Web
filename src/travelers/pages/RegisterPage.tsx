import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { palette } from '../../design-system/theme/palette';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      height: 56,
      borderRadius: '4px',
      fontSize: 16,
      letterSpacing: '0.5px',
      color: palette.onSurface,
      '& fieldset': { borderColor: palette.outline },
      '&:hover fieldset': { borderColor: palette.outline },
      '&.Mui-focused fieldset': { borderColor: palette.primary },
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
      fontWeight: 400,
      color: palette.outline,
      letterSpacing: '0.4px',
    },
    '& .MuiInputLabel-shrink': { fontSize: 12, color: palette.outline },
    '& input::placeholder': { color: palette.onSurfaceVariant, opacity: 1 },
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: palette.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Roboto', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: 'fixed',
          width: 220,
          height: 220,
          backgroundColor: palette.primary,
          borderRadius: '12px',
          opacity: 0.18,
          top: -60,
          left: -60,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          width: 140,
          height: 140,
          backgroundColor: palette.primary,
          borderRadius: '50%',
          opacity: 0.18,
          bottom: 80,
          right: 120,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          width: 80,
          height: 80,
          backgroundColor: palette.secondary,
          borderRadius: '12px',
          opacity: 0.18,
          top: 120,
          right: 300,
        }}
      />

      {/* Register wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Brand */}
        <Typography
          sx={{
            fontSize: 57,
            letterSpacing: '-0.25px',
            lineHeight: '64px',
            color: palette.onSurface,
          }}
        >
          <Box component="span" sx={{ fontWeight: 300 }}>
            Travel
          </Box>
          <Box component="span" sx={{ fontWeight: 800 }}>
            Hub
          </Box>
        </Typography>

        {/* Card */}
        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '12px',
            padding: '40px 32px',
            width: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 500,
              color: palette.onSurface,
              mb: '16px',
            }}
          >
            {t('register.title')}
          </Typography>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('register.fullNameLabel')}
              placeholder={t('register.fullNamePlaceholder')}
              sx={inputSx}
            />
          </Box>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('register.emailLabel')}
              placeholder={t('register.emailPlaceholder')}
              type="email"
              sx={inputSx}
            />
          </Box>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('register.phoneLabel')}
              placeholder={t('register.phonePlaceholder')}
              type="tel"
              sx={inputSx}
            />
          </Box>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('register.passwordLabel')}
              placeholder={t('register.passwordPlaceholder')}
              type="password"
              sx={inputSx}
            />
          </Box>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('register.confirmPasswordLabel')}
              placeholder={t('register.confirmPasswordPlaceholder')}
              type="password"
              sx={inputSx}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => navigate('/login')}
            sx={{
              height: 48,
              backgroundColor: palette.primary,
              color: palette.onPrimary,
              borderRadius: '100px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.1px',
              textTransform: 'none',
              mt: '8px',
              '&:hover': { backgroundColor: palette.primary },
            }}
          >
            {t('register.submitButton')}
          </Button>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 14,
              color: palette.onSurfaceVariant,
              mt: '8px',
            }}
          >
            {t('register.hasAccount')}{' '}
            <Link
              to="/login"
              style={{
                color: palette.primary,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {t('register.login')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
