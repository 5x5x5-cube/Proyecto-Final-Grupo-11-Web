import { Box, CircularProgress } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import { useTokenizeCard, useInitiatePayment, usePaymentStatus } from '@/api/hooks/usePayments';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import type { PaymentMethod, WalletProvider } from '@/modules/checkout/types';
import {
  SidebarContainer,
  SidebarTitle,
  BookingMiniCard,
  BookingThumbnail,
  PriceBreakdownList,
  PriceRow,
  PriceRowValue,
  Divider,
  TotalPrice,
  SecureNote,
  CardList,
  FormFieldsContainer,
  PaymentTabsRow,
  PaymentTab,
  PaymentTabEmoji,
  PaymentTabLabel,
  MethodPlaceholder,
} from './PaymentPage.styles';
import CardForm from './forms/CardForm';
import WalletForm from './forms/WalletForm';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();
  const { showError } = useSnackbar();

  const tokenize = useTokenizeCard();
  const initiate = useInitiatePayment();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [rawCardDigits, setRawCardDigits] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [currency, setCurrency] = useState('COP');
  const [walletProvider, setWalletProvider] = useState<WalletProvider | ''>('');
  const [walletEmail, setWalletEmail] = useState('');

  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentStatus = usePaymentStatus(paymentId);

  const isCardNumberValid = rawCardDigits.length === 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isCvvValid = cvv.length === 3;
  const isCardHolderValid = cardHolder.trim().length > 0;

  const isCardFormValid = isCardNumberValid && isExpiryValid && isCvvValid && isCardHolderValid;
  const isFormValid = selectedMethod === 'credit_card' && isCardFormValid;

  const methodOptions: {
    value: PaymentMethod;
    labelKey: string;
    emoji: string;
  }[] = [
    { value: 'credit_card', labelKey: 'payment.method.card', emoji: '\uD83D\uDCB3' },
    { value: 'digital_wallet', labelKey: 'payment.method.digitalWallet', emoji: '\uD83D\uDCF1' },
    { value: 'transfer', labelKey: 'payment.method.transfer', emoji: '\uD83C\uDFE6' },
  ];

  const showPaymentError = useCallback(() => {
    showError(t('payment.errors.declined'));
  }, [showError, t]);

  // Watch polling results
  useEffect(() => {
    if (!paymentStatus.data) return;

    if (paymentStatus.data.status === 'approved') {
      setIsProcessing(false);
      navigate('/checkout/confirmation', {
        state: { bookingCode: paymentStatus.data.bookingCode },
      });
    } else if (paymentStatus.data.status === 'declined') {
      setIsProcessing(false);
      setPaymentId('');
      showPaymentError();
    }
  }, [paymentStatus.data, navigate, showPaymentError]);

  const handlePay = () => {
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);

    // Step 1: Tokenize card
    tokenize.mutate(
      {
        cardNumber: rawCardDigits,
        cardHolder,
        expiry,
        cvv,
      },
      {
        onSuccess: tokenData => {
          // Step 2: Initiate payment with token
          initiate.mutate(
            {
              token: tokenData.token,
              bookingId: 'booking-mock-001',
              amount: 2664000,
              currency,
              method: 'card',
            },
            {
              onSuccess: paymentData => {
                // Step 3: Start polling
                setPaymentId(paymentData.paymentId);
              },
              onError: () => {
                setIsProcessing(false);
                showError(t('payment.errors.generic'));
              },
            }
          );
        },
        onError: () => {
          setIsProcessing(false);
          showError(t('payment.errors.tokenFailed'));
        },
      }
    );
  };

  const PaymentSidebar = () => (
    <SidebarContainer>
      <SidebarTitle>{t('payment.sidebar.title')}</SidebarTitle>

      {/* Booking mini card */}
      <BookingMiniCard>
        <BookingThumbnail />
        <div>
          <Text textVariant="bodySemibold" sx={{ mb: '4px' }}>
            Hotel Santa Clara Sofitel
          </Text>
          <Text textVariant="caption" sx={{ mb: '2px' }}>
            {`${formatDate('2026-03-15', 'short')} – ${formatDate('2026-03-20', 'medium')} · 5 ${t('payment.sidebar.nightsLabel')}`}
          </Text>
          <Text textVariant="caption">{t('payment.sidebar.room')}</Text>
        </div>
      </BookingMiniCard>

      {/* Price breakdown */}
      <PriceBreakdownList>
        <PriceRow>
          <Text textVariant="body">
            {`${formatPrice(480000)} x 5 ${t('payment.sidebar.nightsLabel')}`}
          </Text>
          <PriceRowValue>{formatPrice(2400000)}</PriceRowValue>
        </PriceRow>
        <PriceRow>
          <Text textVariant="body">{t('payment.sidebar.taxesAndFees')}</Text>
          <PriceRowValue>{formatPrice(264000)}</PriceRowValue>
        </PriceRow>
        <Divider />
        <PriceRow>
          <Text textVariant="panelTitle">{t('payment.sidebar.totalToPay')}</Text>
          <TotalPrice>{formatPrice(2664000)}</TotalPrice>
        </PriceRow>
      </PriceBreakdownList>

      {/* Pay button */}
      <PrimaryPillButton
        fullWidth
        pillSize="lg"
        disabled={!isFormValid || isProcessing}
        onClick={handlePay}
        sx={{ height: 56, display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {isProcessing ? (
          <CircularProgress size={20} sx={{ color: '#fff' }} />
        ) : (
          <>
            <LockIcon sx={{ fontSize: 20 }} />
            {`${t('payment.sidebar.payLabel')} ${formatPrice(2664000)}`}
          </>
        )}
      </PrimaryPillButton>

      {/* Secure note */}
      <SecureNote>
        <VerifiedUserIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Text textVariant="caption">{t('payment.sidebar.secureTransaction')}</Text>
      </SecureNote>
    </SidebarContainer>
  );

  return (
    <CheckoutLayout currentStep={3} sidebar={<PaymentSidebar />}>
      {/* Processing overlay */}
      {isProcessing && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <CircularProgress size={48} sx={{ color: palette.primary }} />
          <Text textVariant="panelTitle" sx={{ color: palette.onSurface }}>
            {t('payment.processing')}
          </Text>
          <Text textVariant="caption" sx={{ color: palette.onSurfaceVariant }}>
            {t('payment.processingSubtext')}
          </Text>
        </Box>
      )}

      <CardList>
        <SectionCard
          icon={<PaymentsIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('payment.method.title')}
        >
          <FormFieldsContainer>
            {/* Payment method selector */}
            <PaymentTabsRow role="radiogroup" aria-label={t('payment.method.ariaLabel')}>
              {methodOptions.map(option => {
                const isActive = selectedMethod === option.value;
                return (
                  <PaymentTab
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    $active={isActive}
                    onClick={() => setSelectedMethod(option.value)}
                  >
                    <PaymentTabEmoji>{option.emoji}</PaymentTabEmoji>
                    <PaymentTabLabel $active={isActive}>{t(option.labelKey)}</PaymentTabLabel>
                  </PaymentTab>
                );
              })}
            </PaymentTabsRow>

            {selectedMethod === 'credit_card' && (
              <CardForm
                rawCardDigits={rawCardDigits}
                onRawCardDigitsChange={setRawCardDigits}
                cardHolder={cardHolder}
                onCardHolderChange={setCardHolder}
                expiry={expiry}
                onExpiryChange={setExpiry}
                cvv={cvv}
                onCvvChange={setCvv}
                onCurrencyChange={setCurrency}
              />
            )}

            {selectedMethod === 'digital_wallet' && (
              <WalletForm
                walletProvider={walletProvider}
                onWalletProviderChange={setWalletProvider}
                walletEmail={walletEmail}
                onWalletEmailChange={setWalletEmail}
              />
            )}

            {selectedMethod === 'transfer' && (
              <MethodPlaceholder>
                <Text textVariant="body">{t('payment.method.comingSoon')}</Text>
              </MethodPlaceholder>
            )}
          </FormFieldsContainer>
        </SectionCard>
      </CardList>
    </CheckoutLayout>
  );
}
