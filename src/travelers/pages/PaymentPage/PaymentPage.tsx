import { CircularProgress } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import { useInitiatePayment } from '@/api/hooks/usePayments';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
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
  PaymentTabActive,
  PaymentTabInactive,
  PaymentTabEmoji,
  PaymentTabLabelActive,
  PaymentTabLabelInactive,
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
        disabled={!isFormValid || payment.isPending}
        onClick={handlePay}
        sx={{ height: 56, display: 'flex', alignItems: 'center', gap: '8px' }}
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
      <SecureNote>
        <VerifiedUserIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Text textVariant="caption">{t('payment.sidebar.secureTransaction')}</Text>
      </SecureNote>
    </SidebarContainer>
  );

  return (
    <CheckoutLayout currentStep={3} sidebar={<PaymentSidebar />}>
      <CardList>
        <SectionCard
          icon={<PaymentsIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('payment.method.title')}
        >
          <FormFieldsContainer>
            {/* Payment method tabs */}
            <PaymentTabsRow>
              <PaymentTabActive>
                <PaymentTabEmoji>&#128179;</PaymentTabEmoji>
                <PaymentTabLabelActive>{t('payment.method.card')}</PaymentTabLabelActive>
              </PaymentTabActive>
              <PaymentTabInactive>
                <PaymentTabEmoji>&#128241;</PaymentTabEmoji>
                <PaymentTabLabelInactive>
                  {t('payment.method.digitalWallet')}
                </PaymentTabLabelInactive>
              </PaymentTabInactive>
              <PaymentTabInactive>
                <PaymentTabEmoji>&#127974;</PaymentTabEmoji>
                <PaymentTabLabelInactive>{t('payment.method.transfer')}</PaymentTabLabelInactive>
              </PaymentTabInactive>
            </PaymentTabsRow>

            {/* Card preview */}
            <CardPreview>
              <CardPreviewHeader>
                <CardChip />
                <CardBrand>VISA</CardBrand>
              </CardPreviewHeader>
              <CardNumber>
                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
              </CardNumber>
              <CardPreviewFooter>
                <div>
                  <CardFieldLabel>{t('payment.cardPreview.cardHolder')}</CardFieldLabel>
                  <CardFieldValue>CARLOS MARTINEZ</CardFieldValue>
                </div>
                <div>
                  <CardFieldLabelRight>{t('payment.cardPreview.expires')}</CardFieldLabelRight>
                  <CardFieldValue>12/28</CardFieldValue>
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
                  value={cardNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
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
                  <FormSelect component="select" defaultValue={t('payment.form.currencies.cop')}>
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
          </FormFieldsContainer>
        </SectionCard>
      </CardList>
    </CheckoutLayout>
  );
}
