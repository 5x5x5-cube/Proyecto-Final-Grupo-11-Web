import { useState, useImperativeHandle, forwardRef } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import type { PaymentMethod, WalletProvider } from '../../types';
import { isValidLuhn } from '../../utils/luhn';
import type { TokenizeRequest } from '@/api/hooks/usePayments';
import CardForm from '@/travelers/pages/PaymentPage/forms/CardForm';
import WalletForm from '@/travelers/pages/PaymentPage/forms/WalletForm';
import TransferForm from '@/travelers/pages/PaymentPage/forms/TransferForm';
import {
  CardList,
  FormFieldsContainer,
  PaymentTabsRow,
  PaymentTab,
  PaymentTabEmoji,
  PaymentTabLabel,
} from './PaymentMethodForm.styles';

const METHOD_OPTIONS: { value: PaymentMethod; labelKey: string; emoji: string }[] = [
  { value: 'credit_card', labelKey: 'payment.method.card', emoji: '💳' },
  { value: 'digital_wallet', labelKey: 'payment.method.digitalWallet', emoji: '📱' },
  { value: 'transfer', labelKey: 'payment.method.transfer', emoji: '🏦' },
];

export interface PaymentMethodFormHandle {
  isFormValid: boolean;
  selectedMethod: PaymentMethod;
  buildTokenizePayload: () => TokenizeRequest | null;
}

interface Props {
  onValidityChange: (isValid: boolean) => void;
}

const PaymentMethodForm = forwardRef<PaymentMethodFormHandle, Props>(
  ({ onValidityChange }, ref) => {
    const { t } = useTranslation('travelers');

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');

    // Card fields
    const [rawCardDigits, setRawCardDigits] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [, setCurrency] = useState('COP');

    // Wallet fields
    const [walletProvider, setWalletProvider] = useState<WalletProvider | ''>('');
    const [walletEmail, setWalletEmail] = useState('');

    // Transfer fields
    const [bankCode, setBankCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');

    // Validation
    const isCardNumberComplete = rawCardDigits.length === 16;
    const isCardNumberValid = isCardNumberComplete && isValidLuhn(rawCardDigits);

    const isExpiryFormatValid = /^\d{2}\/\d{2}$/.test(expiry);
    const isExpiryNotExpired = (() => {
      if (!isExpiryFormatValid) return true; // Don't show expired error until format is valid
      const [mm, yy] = expiry.split('/').map(Number);
      const expiryDate = new Date(2000 + yy, mm); // First day of month after expiry
      return expiryDate > new Date();
    })();
    const isExpiryValid = isExpiryFormatValid && isExpiryNotExpired;

    const isCardFormValid =
      isCardNumberValid && isExpiryValid && cvv.length === 3 && cardHolder.trim().length > 0;

    const isWalletFormValid =
      walletProvider !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(walletEmail);

    const isTransferFormValid =
      bankCode !== '' && accountNumber.length >= 6 && accountHolder.trim().length > 0;

    const isFormValid =
      (selectedMethod === 'credit_card' && isCardFormValid) ||
      (selectedMethod === 'digital_wallet' && isWalletFormValid) ||
      (selectedMethod === 'transfer' && isTransferFormValid);

    // Notify parent of validity changes
    const prevValid = { current: false };
    if (isFormValid !== prevValid.current) {
      prevValid.current = isFormValid;
      // Use microtask to avoid setState-during-render
      queueMicrotask(() => onValidityChange(isFormValid));
    }

    const buildTokenizePayload = (): TokenizeRequest | null => {
      if (selectedMethod === 'credit_card') {
        return { method: 'credit_card', cardNumber: rawCardDigits, cardHolder, expiry, cvv };
      }
      if (selectedMethod === 'digital_wallet' && walletProvider !== '') {
        return { method: 'digital_wallet', walletProvider, walletEmail };
      }
      if (selectedMethod === 'transfer') {
        return { method: 'transfer', bankCode, accountNumber, accountHolder };
      }
      return null;
    };

    useImperativeHandle(ref, () => ({
      isFormValid,
      selectedMethod,
      buildTokenizePayload,
    }));

    return (
      <CardList>
        <SectionCard
          icon={<PaymentsIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('payment.method.title')}
        >
          <FormFieldsContainer>
            <PaymentTabsRow role="radiogroup" aria-label={t('payment.method.ariaLabel')}>
              {METHOD_OPTIONS.map(option => {
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
                cardNumberError={isCardNumberComplete && !isCardNumberValid}
                expiryError={isExpiryFormatValid && !isExpiryNotExpired}
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
    );
  }
);

PaymentMethodForm.displayName = 'PaymentMethodForm';
export default PaymentMethodForm;
