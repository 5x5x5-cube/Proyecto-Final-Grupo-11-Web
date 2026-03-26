import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useRegister } from '@/api/hooks/useAuth';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const register = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const nameError = nameTouched && name.trim().length === 0;
  const emailError = emailTouched && !EMAIL_REGEX.test(email);
  const passwordError = passwordTouched && password.length < 6;
  const confirmPasswordError = confirmPasswordTouched && confirmPassword !== password;

  const isFormValid =
    name.trim().length > 0 &&
    EMAIL_REGEX.test(email) &&
    password.length >= 6 &&
    confirmPassword === password;

  const handleSubmit = () => {
    if (!isFormValid || register.isPending) return;
    register.mutate({ name, email, password }, { onSuccess: () => navigate('/login') });
  };

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
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              error={nameError}
              helperText={nameError ? t('register.nameRequired', 'Name is required') : undefined}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
              helperText={
                emailError ? t('register.emailInvalid', 'Invalid email address') : undefined
              }
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              error={passwordError}
              helperText={
                passwordError
                  ? t('register.passwordMinLength', 'Password must be at least 6 characters')
                  : undefined
              }
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
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() => setConfirmPasswordTouched(true)}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError
                  ? t('register.passwordMismatch', 'Passwords do not match')
                  : undefined
              }
              sx={inputSx}
            />
          </Box>

          <PrimaryPillButton
            pillSize="md"
            fullWidth
            disabled={!isFormValid || register.isPending}
            onClick={handleSubmit}
            sx={{ mt: '8px' }}
          >
            {register.isPending ? (
              <CircularProgress size={20} sx={{ color: '#fff' }} />
            ) : (
              t('register.submitButton')
            )}
          </PrimaryPillButton>

          <Text
            textVariant="body"
            sx={{
              textAlign: 'center',
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
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
