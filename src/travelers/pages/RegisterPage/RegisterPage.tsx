import { Box, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useRegister } from '@/api/hooks/useAuth';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import {
  PageRoot,
  DecorativeSquare,
  DecorativeCircle,
  DecorativeSmallSquare,
  FormWrapper,
  FormCard,
  CardTitle,
  inputSx,
} from './RegisterPage.styles';
import { BrandLogo, BrandLight, BrandBold } from '@/travelers/pages/shared/AuthBrand.styles';

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

  return (
    <PageRoot>
      <DecorativeSquare />
      <DecorativeCircle />
      <DecorativeSmallSquare />

      <FormWrapper>
        <BrandLogo>
          <BrandLight>Travel</BrandLight>
          <BrandBold>Hub</BrandBold>
        </BrandLogo>

        <FormCard>
          <CardTitle>{t('register.title')}</CardTitle>

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

          <Text textVariant="body" sx={{ textAlign: 'center', mt: '8px' }}>
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
        </FormCard>
      </FormWrapper>
    </PageRoot>
  );
}
