import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import type { WalletProvider } from '@/modules/checkout/types';
import { FormFieldsGrid, FormInput, FormSelect, FieldError } from './FormStyles';

export interface WalletFormProps {
  walletProvider: WalletProvider | '';
  onWalletProviderChange: (value: WalletProvider | '') => void;
  walletEmail: string;
  onWalletEmailChange: (value: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROVIDER_OPTIONS: { value: WalletProvider; labelKey: string }[] = [
  { value: 'paypal', labelKey: 'payment.form.walletProviders.paypal' },
  { value: 'google_pay', labelKey: 'payment.form.walletProviders.googlePay' },
  { value: 'apple_pay', labelKey: 'payment.form.walletProviders.applePay' },
];

export default function WalletForm({
  walletProvider,
  onWalletProviderChange,
  walletEmail,
  onWalletEmailChange,
}: WalletFormProps) {
  const { t } = useTranslation('travelers');
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(walletEmail);
  const showEmailError = emailTouched && walletEmail.length > 0 && !isEmailValid;

  const handleProviderChange = (e: unknown) => {
    const val = (e as ChangeEvent<HTMLSelectElement>).target.value;
    onWalletProviderChange((val as WalletProvider) || '');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onWalletEmailChange(e.target.value.trim());
  };

  return (
    <FormFieldsGrid>
      <div>
        <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
          {t('payment.form.walletProvider')}
        </Text>
        <FormSelect component="select" value={walletProvider} onChange={handleProviderChange}>
          <option value="">{t('payment.form.walletProviderPlaceholder')}</option>
          {PROVIDER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </FormSelect>
      </div>

      <div>
        <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
          {t('payment.form.walletEmail')}
        </Text>
        <FormInput
          component="input"
          type="email"
          value={walletEmail}
          onChange={handleEmailChange}
          onBlur={() => setEmailTouched(true)}
          placeholder={t('payment.form.walletEmailPlaceholder')}
          aria-invalid={showEmailError}
        />
        {showEmailError && <FieldError>{t('payment.form.walletEmailInvalid')}</FieldError>}
      </div>
    </FormFieldsGrid>
  );
}
