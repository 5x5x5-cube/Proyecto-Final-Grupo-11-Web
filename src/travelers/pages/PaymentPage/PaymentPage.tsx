import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '@/contexts/SnackbarContext';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import { useTokenize, useInitiatePayment, usePaymentStatus } from '@/api/hooks/usePayments';
import type { TokenizeRequest } from '@/api/hooks/usePayments';
import { useCart } from '@/api/hooks/useCart';
import type { PaymentMethod, WalletProvider } from '@/modules/checkout/types';
import PaymentSidebar from '@/modules/checkout/components/PaymentSidebar/PaymentSidebar';
import ProcessingOverlay from '@/modules/checkout/components/ProcessingOverlay/ProcessingOverlay';
import {
  CardList,
  FormFieldsContainer,
  PaymentTabsRow,
  PaymentTab,
  PaymentTabEmoji,
  PaymentTabLabel,
} from './PaymentPage.styles';
import CardForm from './forms/CardForm';
import WalletForm from './forms/WalletForm';
import TransferForm from './forms/TransferForm';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { showError } = useSnackbar();

  const tokenize = useTokenize();
  const initiate = useInitiatePayment();
  const { data: cart, pricing } = useCart();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [rawCardDigits, setRawCardDigits] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [, setCurrency] = useState('COP');
  const [walletProvider, setWalletProvider] = useState<WalletProvider | ''>('');
  const [walletEmail, setWalletEmail] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentStatus = usePaymentStatus(paymentId);

  const isCardNumberValid = rawCardDigits.length === 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isCvvValid = cvv.length === 3;
  const isCardHolderValid = cardHolder.trim().length > 0;

  const isCardFormValid = isCardNumberValid && isExpiryValid && isCvvValid && isCardHolderValid;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isWalletFormValid = walletProvider !== '' && EMAIL_REGEX.test(walletEmail);

  const MIN_ACCOUNT_DIGITS = 6;
  const isTransferFormValid =
    bankCode !== '' &&
    accountNumber.length >= MIN_ACCOUNT_DIGITS &&
    accountHolder.trim().length > 0;

  const isFormValid =
    (selectedMethod === 'credit_card' && isCardFormValid) ||
    (selectedMethod === 'digital_wallet' && isWalletFormValid) ||
    (selectedMethod === 'transfer' && isTransferFormValid);

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
      navigate(`/checkout/confirmation/${paymentId}`);
    } else if (paymentStatus.data.status === 'declined') {
      setIsProcessing(false);
      setPaymentId('');
      showPaymentError();
    }
  }, [paymentStatus.data, navigate, showPaymentError]);

  const buildTokenizePayload = (): TokenizeRequest | null => {
    if (selectedMethod === 'credit_card') {
      return {
        method: 'credit_card',
        cardNumber: rawCardDigits,
        cardHolder,
        expiry,
        cvv,
      };
    }
    if (selectedMethod === 'digital_wallet' && walletProvider !== '') {
      return {
        method: 'digital_wallet',
        walletProvider,
        walletEmail,
      };
    }
    if (selectedMethod === 'transfer') {
      return {
        method: 'transfer',
        bankCode,
        accountNumber,
        accountHolder,
      };
    }
    return null;
  };

  const handlePay = () => {
    if (!isFormValid || isProcessing) return;

    const payload = buildTokenizePayload();
    if (!payload) return;

    setIsProcessing(true);

    tokenize.mutate(payload, {
      onSuccess: tokenData => {
        initiate.mutate(
          {
            token: tokenData.token,
            cartId: cart?.id ?? '',
            method: selectedMethod,
          },
          {
            onSuccess: paymentData => {
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
    });
  };

  return (
    <CheckoutLayout
      currentStep={3}
      sidebar={
        <PaymentSidebar
          cart={cart}
          pricing={pricing}
          isFormValid={isFormValid}
          isProcessing={isProcessing}
          onPay={handlePay}
        />
      }
    >
      <ProcessingOverlay visible={isProcessing} />

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
              <TransferForm
                bankCode={bankCode}
                onBankCodeChange={setBankCode}
                accountNumber={accountNumber}
                onAccountNumberChange={setAccountNumber}
                accountHolder={accountHolder}
                onAccountHolderChange={setAccountHolder}
              />
            )}
          </FormFieldsContainer>
        </SectionCard>
      </CardList>
    </CheckoutLayout>
  );
}
