import { Box, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useLogin } from '@/api/hooks/useAuth';
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
} from './LoginPage.styles';
import { BrandLogo, BrandLight, BrandBold } from '@/travelers/pages/shared/AuthBrand.styles';

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
          <CardTitle>{t('login.title')}</CardTitle>

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
              sx={inputSx}
            />
          </Box>

          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={inputSx}
            />
          </Box>

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

          <Text textVariant="body" sx={{ textAlign: 'center', mt: '8px' }}>
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
        </FormCard>
      </FormWrapper>
    </PageRoot>
  );
}
