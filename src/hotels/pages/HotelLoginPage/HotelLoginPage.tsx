import { Box, Divider, CircularProgress } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BarChartIcon from '@mui/icons-material/BarChart';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useLogin } from '@/api/hooks/useAuth';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useHotelAuth } from '@/hotels/auth/HotelAuthContext';
import type { HotelAuthUser } from '@/hotels/auth/HotelAuthContext';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import {
  PageRoot,
  FormSide,
  BrandSection,
  BrandName,
  PortalBadge,
  FormTitle,
  FormSubtitle,
  StyledTextField,
  ForgotPasswordLink,
  TrustBadgesBar,
  TrustBadgeItem,
  VisualSide,
  DecorativeCircle,
  EyebrowText,
  HeroTitle,
  HeroSubtitle,
  StatCard,
  StatNumber,
  StatLabel,
  FeatureRow,
  FeatureIcon,
  FeatureText,
} from './HotelLoginPage.styles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HotelLoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('hotels');
  const { showError } = useSnackbar();
  const hotelAuth = useHotelAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const login = useLogin();

  const emailError = emailTouched && !EMAIL_REGEX.test(email);
  const isFormValid = EMAIL_REGEX.test(email) && password.length > 0;

  // Map any auth failure to a generic message — never leak backend details
  // (CA2: avoid user enumeration). 401 → invalid credentials, everything else → network.
  const mapAuthError = (err: unknown): string => {
    const status = (err as { status?: number } | null)?.status;
    if (status === 401 || status === 403) return t('login.errorInvalidCredentials');
    return t('login.errorNetwork');
  };

  // Narrow the backend response to the session shape we persist. The backend
  // contract (auth_service) is flat: { access_token, token_type, user_id,
  // email, name, role }. Any response missing access_token or with a role
  // other than `hotel_admin` is treated as a failed login — the admin must
  // never be signed in with a non-admin payload (CA2 / RBAC).
  const toHotelSession = (response: unknown): { token: string; user: HotelAuthUser } | null => {
    const r = response as {
      access_token?: unknown;
      user_id?: unknown;
      email?: unknown;
      name?: unknown;
      role?: unknown;
    } | null;
    if (!r || typeof r.access_token !== 'string') return null;
    const { user_id, email: userEmail, name, role } = r;
    if (typeof user_id !== 'string' || typeof name !== 'string' || typeof userEmail !== 'string') {
      return null;
    }
    if (role !== 'hotel_admin') return null;
    return {
      token: r.access_token,
      user: { id: user_id, name, email: userEmail, role: 'hotel_admin' },
    };
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!isFormValid || login.isPending) return;
    login.mutate(
      { email, password },
      {
        onSuccess: response => {
          const session = toHotelSession(response);
          if (!session) {
            showError(t('login.errorNetwork'));
            return;
          }
          hotelAuth.login(session);
          navigate('/hotel/dashboard');
        },
        onError: err => showError(mapAuthError(err)),
      }
    );
  };

  const trustBadges = [
    {
      icon: <LockIcon sx={{ fontSize: 16, color: palette.primary }} />,
      text: t('login.trustBadges.ssl'),
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 16, color: palette.primary }} />,
      text: t('login.trustBadges.secure'),
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 16, color: palette.primary }} />,
      text: t('login.trustBadges.support'),
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 16, color: palette.primary }} />,
      text: t('login.trustBadges.countries'),
    },
  ];

  const stats = [
    { num: '2.4k+', label: t('login.stats.hotels') },
    { num: '6', label: t('login.stats.countries') },
    { num: '98%', label: t('login.stats.satisfaction') },
  ];

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />,
      text: t('login.features.dashboard'),
    },
    {
      icon: <EventAvailableIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />,
      text: t('login.features.reservations'),
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />,
      text: t('login.features.reports'),
    },
    {
      icon: <SellIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />,
      text: t('login.features.rates'),
    },
  ];

  return (
    <PageRoot>
      {/* LEFT: FORM SIDE */}
      <FormSide>
        {/* Brand */}
        <BrandSection>
          <BrandName>
            <Box component="span" sx={{ fontWeight: 300 }}>
              Travel
            </Box>
            Hub
          </BrandName>
          <PortalBadge>
            <HotelIcon sx={{ fontSize: 14 }} />
            {t('login.portalBadge')}
          </PortalBadge>
        </BrandSection>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          aria-label={t('login.welcome')}
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <FormTitle>{t('login.welcome')}</FormTitle>
          <FormSubtitle>{t('login.subtitle')}</FormSubtitle>

          {/* Email field */}
          <Box sx={{ mb: '16px' }}>
            <StyledTextField
              fullWidth
              variant="outlined"
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
              helperText={emailError ? t('login.emailInvalid') : undefined}
            />
          </Box>

          {/* Password field */}
          <Box sx={{ mb: '8px' }}>
            <StyledTextField
              fullWidth
              variant="outlined"
              label={t('login.passwordLabel')}
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>

          {/* Forgot password */}
          <ForgotPasswordLink>{t('login.forgotPassword')}</ForgotPasswordLink>

          {/* Login button */}
          <PrimaryPillButton
            type="submit"
            pillSize="lg"
            fullWidth
            disabled={!isFormValid || login.isPending}
            sx={{ mt: '8px' }}
          >
            {login.isPending ? (
              <CircularProgress size={20} sx={{ color: palette.onPrimary }} />
            ) : (
              t('login.loginButton')
            )}
          </PrimaryPillButton>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', my: '4px' }}>
            <Divider sx={{ flex: 1, borderColor: palette.outlineVariant }} />
            <Text textVariant="caption" sx={{ whiteSpace: 'nowrap' }}>
              {t('login.newToTravelHub')}
            </Text>
            <Divider sx={{ flex: 1, borderColor: palette.outlineVariant }} />
          </Box>

          {/* Help text */}
          <Text textVariant="hint" sx={{ textAlign: 'center' }}>
            {t('login.contactUs')}{' '}
            <Box
              component="span"
              sx={{ color: palette.primary, fontWeight: 500, cursor: 'pointer' }}
            >
              partners@travelhub.com
            </Box>{' '}
            {t('login.contactSuffix')}
          </Text>
        </Box>

        {/* Trust badges */}
        <TrustBadgesBar>
          {trustBadges.map((item, index) => (
            <TrustBadgeItem key={index}>
              {item.icon}
              {item.text}
            </TrustBadgeItem>
          ))}
        </TrustBadgesBar>
      </FormSide>

      {/* RIGHT: VISUAL SIDE */}
      <VisualSide>
        {/* Decorative circles */}
        <DecorativeCircle size={600} top={-120} right={-120} variant="border" />
        <DecorativeCircle size={400} bottom={-100} left={-80} variant="fill" />

        {/* Eyebrow */}
        <EyebrowText>{t('login.adminPanel')}</EyebrowText>

        {/* Title */}
        <HeroTitle>{t('login.heroTitle')}</HeroTitle>

        {/* Subtitle */}
        <HeroSubtitle>{t('login.heroSubtitle')}</HeroSubtitle>

        {/* Stats row */}
        <Box sx={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.num}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </Box>

        {/* Feature list */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 480,
          }}
        >
          {features.map((feature, index) => (
            <FeatureRow key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureRow>
          ))}
        </Box>
      </VisualSide>
    </PageRoot>
  );
}
