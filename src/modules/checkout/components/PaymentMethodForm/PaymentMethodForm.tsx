import { useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import type { PaymentMethod } from '../../types';
import type { TokenizeRequest } from '@/api/hooks/usePayments';
import { usePaymentMethodForm } from '../../hooks/usePaymentMethodForm';
import CardForm from './forms/CardForm';
import WalletForm from './forms/WalletForm';
import TransferForm from './forms/TransferForm';
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
    const form = usePaymentMethodForm();

    const prevValidRef = useRef(false);
    useEffect(() => {
      if (form.isFormValid !== prevValidRef.current) {
        prevValidRef.current = form.isFormValid;
        onValidityChange(form.isFormValid);
      }
    }, [form.isFormValid, onValidityChange]);

    useImperativeHandle(ref, () => ({
      isFormValid: form.isFormValid,
      selectedMethod: form.selectedMethod,
      buildTokenizePayload: form.buildTokenizePayload,
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
                const isActive = form.selectedMethod === option.value;
                return (
                  <PaymentTab
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    $active={isActive}
                    onClick={() => form.setSelectedMethod(option.value)}
                  >
                    <PaymentTabEmoji>{option.emoji}</PaymentTabEmoji>
                    <PaymentTabLabel $active={isActive}>{t(option.labelKey)}</PaymentTabLabel>
                  </PaymentTab>
                );
              })}
            </PaymentTabsRow>

            {form.selectedMethod === 'credit_card' && (
              <CardForm
                rawCardDigits={form.rawCardDigits}
                onRawCardDigitsChange={form.setRawCardDigits}
                cardHolder={form.cardHolder}
                onCardHolderChange={form.setCardHolder}
                expiry={form.expiry}
                onExpiryChange={form.setExpiry}
                cvv={form.cvv}
                onCvvChange={form.setCvv}
                onCurrencyChange={form.setCurrency}
                cardNumberError={form.cardNumberError}
                expiryError={form.expiryError}
              />
            )}

            {form.selectedMethod === 'digital_wallet' && (
              <WalletForm
                walletProvider={form.walletProvider}
                onWalletProviderChange={form.setWalletProvider}
                walletEmail={form.walletEmail}
                onWalletEmailChange={form.setWalletEmail}
              />
            )}

            {form.selectedMethod === 'transfer' && (
              <TransferForm
                bankCode={form.bankCode}
                onBankCodeChange={form.setBankCode}
                accountNumber={form.accountNumber}
                onAccountNumberChange={form.setAccountNumber}
                accountHolder={form.accountHolder}
                onAccountHolderChange={form.setAccountHolder}
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
