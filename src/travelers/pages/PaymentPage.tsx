import { Box, Typography, CircularProgress } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import CheckoutLayout from '../../design-system/layouts/CheckoutLayout';
import SectionCard from '../../design-system/components/SectionCard';
import { palette } from '../../design-system/theme/palette';
import { useInitiatePayment } from '../../api/hooks/usePayments';
import { PrimaryPillButton } from '@/design-system/components/PillButton';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();
  const payment = useInitiatePayment();

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      const month = digits.slice(0, 2);
      const year = digits.slice(2);
      if (parseInt(month, 10) > 12) return expiry;
      return `${month}/${year}`;
    }
    if (digits.length === 2) {
      if (parseInt(digits, 10) > 12) return expiry;
      return digits;
    }
    return digits;
  };

  const isCardNumberValid = cardNumber.replace(/\s/g, '').length === 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isCvvValid = cvv.length === 3;
  const isCardHolderValid = cardHolder.trim().length > 0;

  const isFormValid = isCardNumberValid && isExpiryValid && isCvvValid && isCardHolderValid;

  const handlePay = () => {
    if (!isFormValid || payment.isPending) return;
    payment.mutate(
      { cardNumber, cardHolder, expiry, cvv },
      { onSuccess: () => navigate('/checkout/confirmation') }
    );
  };

  const PaymentSidebar = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
        {t('payment.sidebar.title')}
      </Typography>

      {/* Booking mini card */}
      <Box
        sx={{
          backgroundColor: palette.background,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #003740, #006874)',
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface, mb: '4px' }}>
            Hotel Santa Clara Sofitel
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '2px' }}>
            {`${formatDate('2026-03-15', 'short')} – ${formatDate('2026-03-20', 'medium')} · 5 ${t('payment.sidebar.nightsLabel')}`}
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
            {t('payment.sidebar.room')}
          </Typography>
        </Box>
      </Box>

      {/* Price breakdown */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {`${formatPrice(480000)} x 5 ${t('payment.sidebar.nightsLabel')}`}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
            {formatPrice(2400000)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {t('payment.sidebar.taxesAndFees')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
            {formatPrice(264000)}
          </Typography>
        </Box>
        <Box sx={{ height: 1, backgroundColor: palette.outlineVariant }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
            {t('payment.sidebar.totalToPay')}
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: palette.primary }}>
            {formatPrice(2664000)}
          </Typography>
        </Box>
      </Box>

      {/* Pay button */}
      <PrimaryPillButton
        fullWidth
        pillSize="lg"
        disabled={!isFormValid || payment.isPending}
        onClick={handlePay}
        sx={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {payment.isPending ? (
          <CircularProgress size={20} sx={{ color: '#fff' }} />
        ) : (
          <>
            <LockIcon sx={{ fontSize: 20 }} />
            {`${t('payment.sidebar.payLabel')} ${formatPrice(2664000)}`}
          </>
        )}
      </PrimaryPillButton>

      {/* Secure note */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
        <VerifiedUserIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
          {t('payment.sidebar.secureTransaction')}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <CheckoutLayout currentStep={3} sidebar={<PaymentSidebar />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <SectionCard
          icon={<PaymentsIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('payment.method.title')}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Payment method tabs */}
            <Box sx={{ display: 'flex', gap: '12px' }}>
              {/* Tarjeta - active */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.primary}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f0fbfc',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>💳</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.primary }}>
                  {t('payment.method.card')}
                </Typography>
              </Box>
              {/* Billetera digital */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>📱</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurfaceVariant }}>
                  {t('payment.method.digitalWallet')}
                </Typography>
              </Box>
              {/* Transferencia */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>🏦</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurfaceVariant }}>
                  {t('payment.method.transfer')}
                </Typography>
              </Box>
            </Box>

            {/* Card preview */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #003740 0%, #006874 60%, #4A9FAA 100%)',
                borderRadius: '16px',
                padding: '24px',
                width: 340,
                height: 200,
                mx: 'auto',
                aspectRatio: '1.586 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 28,
                    background: 'linear-gradient(135deg, #C89030, #F4A020)',
                    borderRadius: '4px',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.9)',
                    fontStyle: 'italic',
                  }}
                >
                  VISA
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '3px',
                }}
              >
                •••• •••• •••• 4242
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.5px',
                      mb: '2px',
                    }}
                  >
                    {t('payment.cardPreview.cardHolder')}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
                    CARLOS MARTINEZ
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.5px',
                      mb: '2px',
                      textAlign: 'right',
                    }}
                  >
                    {t('payment.cardPreview.expires')}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
                    12/28
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Card form */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card number */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.onSurfaceVariant,
                    mb: '6px',
                    letterSpacing: '0.4px',
                  }}
                >
                  {t('payment.form.cardNumber')}
                </Typography>
                <Box
                  component="input"
                  value={cardNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder={t('payment.form.cardNumberPlaceholder')}
                  sx={{
                    width: '100%',
                    height: 52,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 15,
                    color: palette.onSurface,
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    '&:focus': { borderColor: palette.primary },
                  }}
                />
              </Box>

              {/* Card holder name */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.onSurfaceVariant,
                    mb: '6px',
                    letterSpacing: '0.4px',
                  }}
                >
                  {t('payment.form.cardHolderName')}
                </Typography>
                <Box
                  component="input"
                  value={cardHolder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCardHolder(e.target.value)
                  }
                  sx={{
                    width: '100%',
                    height: 52,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 15,
                    color: palette.onSurface,
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    '&:focus': { borderColor: palette.primary },
                  }}
                />
              </Box>

              {/* Row: Expiry, CVV, Currency */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {t('payment.form.expiryDate')}
                  </Typography>
                  <Box
                    component="input"
                    value={expiry}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setExpiry(formatExpiry(e.target.value))
                    }
                    placeholder={t('payment.form.expiryPlaceholder')}
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      '&:focus': { borderColor: palette.primary },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {t('payment.form.cvv')}
                  </Typography>
                  <Box
                    component="input"
                    value={cvv}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                    }
                    placeholder="•••"
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      '&:focus': { borderColor: palette.primary },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {t('payment.form.currency')}
                  </Typography>
                  <Box
                    component="select"
                    defaultValue={t('payment.form.currencies.cop')}
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option>{t('payment.form.currencies.cop')}</option>
                    <option>{t('payment.form.currencies.usd')}</option>
                    <option>{t('payment.form.currencies.mxn')}</option>
                    <option>{t('payment.form.currencies.ars')}</option>
                    <option>{t('payment.form.currencies.clp')}</option>
                    <option>{t('payment.form.currencies.pen')}</option>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </SectionCard>
      </Box>
    </CheckoutLayout>
  );
}
