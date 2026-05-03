import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TransactionsFilters } from '@/modules/hotel-transactions/types';
import type { PaymentStatus, PaymentMethodType } from '@/api/hooks/useAdminPayments';
import { FilterBar, ClearLink } from './TransactionsFilterBar.styles';

interface Props {
  filters: TransactionsFilters;
  onChange: (next: TransactionsFilters) => void;
  onClear: () => void;
}

const STATUS_OPTIONS: PaymentStatus[] = ['approved', 'declined', 'processing', 'refunded'];
const METHOD_OPTIONS: PaymentMethodType[] = [
  'credit_card',
  'debit_card',
  'digital_wallet',
  'transfer',
];

const STATUS_KEY: Record<PaymentStatus, string> = {
  approved: 'transactions.status.approved',
  declined: 'transactions.status.declined',
  processing: 'transactions.status.processing',
  refunded: 'transactions.status.refunded',
};

const METHOD_KEY: Record<PaymentMethodType, string> = {
  credit_card: 'transactions.method.creditCard',
  debit_card: 'transactions.method.debitCard',
  digital_wallet: 'transactions.method.digitalWallet',
  transfer: 'transactions.method.transfer',
};

/**
 * Parse an "amount" text input to a number filter value.
 * Empty string / NaN → undefined so the filter is effectively cleared.
 */
function parseAmount(raw: string): number | undefined {
  if (raw === '') return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export default function TransactionsFilterBar({ filters, onChange, onClear }: Props) {
  const { t } = useTranslation('hotels');

  const update = (patch: Partial<TransactionsFilters>) => {
    onChange({ ...filters, ...patch });
  };

  const hasAny =
    filters.status !== undefined ||
    filters.method !== undefined ||
    filters.dateFrom !== undefined ||
    filters.dateTo !== undefined ||
    filters.amountMin !== undefined ||
    filters.amountMax !== undefined;

  return (
    <FilterBar>
      <TextField
        select
        fullWidth
        size="small"
        label={t('transactions.filters.status')}
        value={filters.status ?? ''}
        onChange={e => update({ status: (e.target.value || undefined) as PaymentStatus })}
      >
        <MenuItem value="">{t('transactions.filters.all')}</MenuItem>
        {STATUS_OPTIONS.map(s => (
          <MenuItem key={s} value={s}>
            {t(STATUS_KEY[s])}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        size="small"
        label={t('transactions.filters.method')}
        value={filters.method ?? ''}
        onChange={e => update({ method: (e.target.value || undefined) as PaymentMethodType })}
      >
        <MenuItem value="">{t('transactions.filters.all')}</MenuItem>
        {METHOD_OPTIONS.map(m => (
          <MenuItem key={m} value={m}>
            {t(METHOD_KEY[m])}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="date"
        fullWidth
        size="small"
        label={t('transactions.filters.dateFrom')}
        value={filters.dateFrom ?? ''}
        onChange={e => update({ dateFrom: e.target.value || undefined })}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        type="date"
        fullWidth
        size="small"
        label={t('transactions.filters.dateTo')}
        value={filters.dateTo ?? ''}
        onChange={e => update({ dateTo: e.target.value || undefined })}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        type="number"
        fullWidth
        size="small"
        label={t('transactions.filters.amountMin')}
        value={filters.amountMin ?? ''}
        onChange={e => update({ amountMin: parseAmount(e.target.value) })}
        inputProps={{ min: 0 }}
      />

      <TextField
        type="number"
        fullWidth
        size="small"
        label={t('transactions.filters.amountMax')}
        value={filters.amountMax ?? ''}
        onChange={e => update({ amountMax: parseAmount(e.target.value) })}
        inputProps={{ min: 0 }}
      />

      <ClearLink type="button" onClick={onClear} disabled={!hasAny}>
        {t('transactions.filters.clear')}
      </ClearLink>
    </FilterBar>
  );
}
