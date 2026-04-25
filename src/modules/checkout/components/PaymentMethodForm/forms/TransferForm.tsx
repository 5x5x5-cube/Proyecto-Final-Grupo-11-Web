import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import { FormFieldsGrid, FormInput, FormSelect, FieldError } from './FormStyles';

export interface TransferFormProps {
  bankCode: string;
  onBankCodeChange: (value: string) => void;
  accountNumber: string;
  onAccountNumberChange: (value: string) => void;
  accountHolder: string;
  onAccountHolderChange: (value: string) => void;
}

const BANK_OPTIONS: { value: string; labelKey: string }[] = [
  { value: '007', labelKey: 'payment.form.banks.bancolombia' },
  { value: '001', labelKey: 'payment.form.banks.bogota' },
  { value: '051', labelKey: 'payment.form.banks.davivienda' },
  { value: '013', labelKey: 'payment.form.banks.bbva' },
  { value: '002', labelKey: 'payment.form.banks.popular' },
];

const MIN_ACCOUNT_DIGITS = 6;

export default function TransferForm({
  bankCode,
  onBankCodeChange,
  accountNumber,
  onAccountNumberChange,
  accountHolder,
  onAccountHolderChange,
}: TransferFormProps) {
  const { t } = useTranslation('travelers');
  const [accountTouched, setAccountTouched] = useState(false);

  const isAccountValid = accountNumber.length >= MIN_ACCOUNT_DIGITS;
  const showAccountError = accountTouched && accountNumber.length > 0 && !isAccountValid;

  const handleBankChange = (e: unknown) => {
    const val = (e as ChangeEvent<HTMLSelectElement>).target.value;
    onBankCodeChange(val);
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 20);
    onAccountNumberChange(digits);
  };

  const handleHolderChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAccountHolderChange(e.target.value);
  };

  return (
    <FormFieldsGrid>
      <div>
        <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
          {t('payment.form.bank')}
        </Text>
        <FormSelect component="select" value={bankCode} onChange={handleBankChange}>
          <option value="">{t('payment.form.bankPlaceholder')}</option>
          {BANK_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </FormSelect>
      </div>

      <div>
        <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
          {t('payment.form.accountNumber')}
        </Text>
        <FormInput
          component="input"
          inputMode="numeric"
          value={accountNumber}
          onChange={handleAccountChange}
          onBlur={() => setAccountTouched(true)}
          placeholder={t('payment.form.accountNumberPlaceholder')}
          aria-invalid={showAccountError}
        />
        {showAccountError && <FieldError>{t('payment.form.accountNumberInvalid')}</FieldError>}
      </div>

      <div>
        <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
          {t('payment.form.accountHolder')}
        </Text>
        <FormInput
          component="input"
          value={accountHolder}
          onChange={handleHolderChange}
          placeholder={t('payment.form.accountHolderPlaceholder')}
        />
      </div>
    </FormFieldsGrid>
  );
}
