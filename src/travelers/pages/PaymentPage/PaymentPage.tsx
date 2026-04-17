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
import type { PaymentMethod } from '@/modules/checkout/types';
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
  CardPreview,
  CardPreviewHeader,
  CardChip,
  CardBrand,
  CardNumber,
  CardPreviewFooter,
  CardFieldLabel,
  CardFieldLabelRight,
  CardFieldValue,
  FormFieldsGrid,
  FormRowThreeCol,
  FormInput,
  FormSelect,
} from './PaymentPage.styles';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();
  const { showError } = useSnackbar();

  const tokenize = useTokenizeCard();
  const initiate = useInitiatePayment();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [rawCardDigits, setRawCardDigits] = useState('');
  const [cardDisplayValue, setCardDisplayValue] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [currency, setCurrency] = useState('COP');

  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentStatus = usePaymentStatus(paymentId);

  // Format card number for display with masking: first 12 digits become dots, last 4 visible
  const formatCardDisplay = (digits: string): string => {
    if (digits.length <= 12) {
      // No masking yet, show formatted digits
      return digits.replace(/(.{4})/g, '$1 ').trim();
    }
    // Mask first 12, show last 4
    const masked =
      '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ' +
      digits.slice(12);
    return masked;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract raw digits from what user types
    const inputValue = e.target.value;
    // If user is deleting, work from raw digits
    const currentRaw = inputValue.replace(/[^\d]/g, '').slice(0, 16);
    setRawCardDigits(currentRaw);
    setCardDisplayValue(formatCardDisplay(currentRaw));
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

  const last4 = rawCardDigits.length >= 4 ? rawCardDigits.slice(-4) : '';
  const previewCardNumber =
    last4.length === 4
      ? `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${last4}`
      : '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022';
  const previewHolder = cardHolder.trim()
    ? cardHolder.toUpperCase()
    : '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
  const previewExpiry = isExpiryValid ? expiry : '\u2022\u2022/\u2022\u2022';

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

            {selectedMethod !== 'credit_card' && (
              <MethodPlaceholder>
                <Text textVariant="body">{t('payment.method.comingSoon')}</Text>
              </MethodPlaceholder>
            )}

            {selectedMethod === 'credit_card' && (
              <>
                {/* Card preview */}
                <CardPreview>
                  <CardPreviewHeader>
                    <CardChip />
                    <CardBrand>VISA</CardBrand>
                  </CardPreviewHeader>
                  <CardNumber>{previewCardNumber}</CardNumber>
                  <CardPreviewFooter>
                    <div>
                      <CardFieldLabel>{t('payment.cardPreview.cardHolder')}</CardFieldLabel>
                      <CardFieldValue>{previewHolder}</CardFieldValue>
                    </div>
                    <div>
                      <CardFieldLabelRight>{t('payment.cardPreview.expires')}</CardFieldLabelRight>
                      <CardFieldValue>{previewExpiry}</CardFieldValue>
                    </div>
                  </CardPreviewFooter>
                </CardPreview>

                {/* Card form */}
                <FormFieldsGrid>
                  {/* Card number */}
                  <div>
                    <Text
                      textVariant="caption"
                      sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}
                    >
                      {t('payment.form.cardNumber')}
                    </Text>
                    <FormInput
                      component="input"
                      value={cardDisplayValue}
                      onChange={handleCardNumberChange}
                      placeholder={t('payment.form.cardNumberPlaceholder')}
                    />
                  </div>

                  {/* Card holder name */}
                  <div>
                    <Text
                      textVariant="caption"
                      sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}
                    >
                      {t('payment.form.cardHolderName')}
                    </Text>
                    <FormInput
                      component="input"
                      value={cardHolder}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCardHolder(e.target.value)
                      }
                    />
                  </div>

                  {/* Row: Expiry, CVV, Currency */}
                  <FormRowThreeCol>
                    <div>
                      <Text
                        textVariant="caption"
                        sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}
                      >
                        {t('payment.form.expiryDate')}
                      </Text>
                      <FormInput
                        component="input"
                        value={expiry}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        placeholder={t('payment.form.expiryPlaceholder')}
                      />
                    </div>
                    <div>
                      <Text
                        textVariant="caption"
                        sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}
                      >
                        {t('payment.form.cvv')}
                      </Text>
                      <FormInput
                        component="input"
                        value={cvv}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                        }
                        placeholder="&bull;&bull;&bull;"
                      />
                    </div>
                    <div>
                      <Text
                        textVariant="caption"
                        sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}
                      >
                        {t('payment.form.currency')}
                      </Text>
                      <FormSelect
                        component="select"
                        defaultValue={t('payment.form.currencies.cop')}
                        onChange={(e: unknown) => {
                          const val = (e as React.ChangeEvent<HTMLSelectElement>).target.value;
                          const code = val.split(' ')[0] ?? 'COP';
                          setCurrency(code);
                        }}
                      >
                        <option>{t('payment.form.currencies.cop')}</option>
                        <option>{t('payment.form.currencies.usd')}</option>
                        <option>{t('payment.form.currencies.mxn')}</option>
                        <option>{t('payment.form.currencies.ars')}</option>
                        <option>{t('payment.form.currencies.clp')}</option>
                        <option>{t('payment.form.currencies.pen')}</option>
                      </FormSelect>
                    </div>
                  </FormRowThreeCol>
                </FormFieldsGrid>
              </>
            )}
          </FormFieldsContainer>
        </SectionCard>
      </CardList>
    </CheckoutLayout>
  );
}
