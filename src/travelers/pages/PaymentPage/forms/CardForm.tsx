import { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import {
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
} from '../PaymentPage.styles';

export interface CardFormProps {
  rawCardDigits: string;
  onRawCardDigitsChange: (digits: string) => void;
  cardHolder: string;
  onCardHolderChange: (value: string) => void;
  expiry: string;
  onExpiryChange: (value: string) => void;
  cvv: string;
  onCvvChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
}

const MASKED_GROUP = '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022';
const HOLDER_PLACEHOLDER = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
const EXPIRY_PLACEHOLDER = '\u2022\u2022/\u2022\u2022';

const DOT = '\u2022';

function formatCardDisplay(digits: string, masked: boolean): string {
  if (!masked || digits.length <= 4) {
    // While focused or short input: show all digits with spaces
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }
  // On blur: mask all but last 4
  const maskedPart = DOT.repeat(digits.length - 4);
  const visible = digits.slice(-4);
  return (maskedPart + visible).replace(/(.{4})/g, '$1 ').trim();
}

export default function CardForm({
  rawCardDigits,
  onRawCardDigitsChange,
  cardHolder,
  onCardHolderChange,
  expiry,
  onExpiryChange,
  cvv,
  onCvvChange,
  onCurrencyChange,
}: CardFormProps) {
  const { t } = useTranslation('travelers');
  const [cardFocused, setCardFocused] = useState(false);

  const cardDisplayValue = formatCardDisplay(rawCardDigits, !cardFocused);
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const last4 = rawCardDigits.length >= 4 ? rawCardDigits.slice(-4) : '';
  const previewCardNumber =
    last4.length === 4 ? `${MASKED_GROUP} ${last4}` : `${MASKED_GROUP} \u2022\u2022\u2022\u2022`;
  const previewHolder = cardHolder.trim() ? cardHolder.toUpperCase() : HOLDER_PLACEHOLDER;
  const previewExpiry = isExpiryValid ? expiry : EXPIRY_PLACEHOLDER;

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextRaw = e.target.value.replace(/[^\d]/g, '').slice(0, 16);
    onRawCardDigitsChange(nextRaw);
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      const month = digits.slice(0, 2);
      const year = digits.slice(2);
      if (parseInt(month, 10) > 12) return;
      onExpiryChange(`${month}/${year}`);
      return;
    }
    if (digits.length === 2) {
      if (parseInt(digits, 10) > 12) return;
      onExpiryChange(digits);
      return;
    }
    onExpiryChange(digits);
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCvvChange(e.target.value.replace(/\D/g, '').slice(0, 3));
  };

  const handleCurrencyChange = (e: unknown) => {
    const val = (e as ChangeEvent<HTMLSelectElement>).target.value;
    const code = val.split(' ')[0] ?? 'COP';
    onCurrencyChange(code);
  };

  return (
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
        <div>
          <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
            {t('payment.form.cardNumber')}
          </Text>
          <FormInput
            component="input"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardDisplayValue}
            onChange={handleCardNumberChange}
            onFocus={() => setCardFocused(true)}
            onBlur={() => setCardFocused(false)}
            placeholder={t('payment.form.cardNumberPlaceholder')}
          />
        </div>

        <div>
          <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
            {t('payment.form.cardHolderName')}
          </Text>
          <FormInput
            component="input"
            value={cardHolder}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onCardHolderChange(e.target.value)}
          />
        </div>

        <FormRowThreeCol>
          <div>
            <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
              {t('payment.form.expiryDate')}
            </Text>
            <FormInput
              component="input"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder={t('payment.form.expiryPlaceholder')}
            />
          </div>
          <div>
            <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
              {t('payment.form.cvv')}
            </Text>
            <FormInput
              component="input"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="&bull;&bull;&bull;"
            />
          </div>
          <div>
            <Text textVariant="caption" sx={{ fontWeight: 500, mb: '6px', letterSpacing: '0.4px' }}>
              {t('payment.form.currency')}
            </Text>
            <FormSelect
              component="select"
              defaultValue={t('payment.form.currencies.cop')}
              onChange={handleCurrencyChange}
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
  );
}
