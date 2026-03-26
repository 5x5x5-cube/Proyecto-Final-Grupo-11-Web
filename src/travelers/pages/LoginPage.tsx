import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useLogin } from '@/api/hooks/useAuth';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && !EMAIL_REGEX.test(email);
  const isFormValid = EMAIL_REGEX.test(email) && password.length > 0;

  const handleSubmit = () => {
    if (!isFormValid || login.isPending) return;
    login.mutate({ email, password }, { onSuccess: () => navigate('/') });
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

      {/* Login wrapper */}
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
          {/* Card title */}
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 500,
              color: palette.onSurface,
              mb: '16px',
            }}
          >
            {t('login.title')}
          </Typography>

          {/* Email field */}
          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
              helperText={emailError ? t('login.emailInvalid', 'Invalid email address') : undefined}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '4px',
                  fontSize: 16,
                  letterSpacing: '0.5px',
                  color: palette.onSurface,
                  '& fieldset': {
                    borderColor: palette.outline,
                  },
                  '&:hover fieldset': {
                    borderColor: palette.outline,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  fontWeight: 400,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': {
                  fontSize: 12,
                  color: palette.outline,
                },
                '& input::placeholder': {
                  color: palette.onSurfaceVariant,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Password field */}
          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '4px',
                  fontSize: 16,
                  letterSpacing: '0.5px',
                  color: palette.onSurface,
                  '& fieldset': {
                    borderColor: palette.outline,
                  },
                  '&:hover fieldset': {
                    borderColor: palette.outline,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  fontWeight: 400,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': {
                  fontSize: 12,
                  color: palette.outline,
                },
                '& input::placeholder': {
                  color: palette.onSurfaceVariant,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Iniciar sesion button */}
          <PrimaryPillButton
            pillSize="md"
            fullWidth
            disabled={!isFormValid || login.isPending}
            onClick={handleSubmit}
            sx={{ mt: '8px' }}
          >
            {login.isPending ? (
              <CircularProgress size={20} sx={{ color: '#fff' }} />
            ) : (
              t('login.submitButton')
            )}
          </PrimaryPillButton>

          {/* Footer link */}
          <Text
            textVariant="body"
            sx={{
              textAlign: 'center',
              mt: '8px',
            }}
          >
            {t('login.noAccount')}{' '}
            <Link
              to="/register"
              style={{
                color: palette.primary,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {t('login.register')}
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
