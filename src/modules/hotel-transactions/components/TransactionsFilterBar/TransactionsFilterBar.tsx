import { Box, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TransactionsFilters } from '@/modules/hotel-transactions/types';
import type { PaymentStatus, PaymentMethodType } from '@/api/hooks/useAdminPayments';
import { FilterBar, FilterFieldLabel, ClearLink } from './TransactionsFilterBar.styles';

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
      <Box>
        <FilterFieldLabel htmlFor="tx-status">{t('transactions.filters.status')}</FilterFieldLabel>
        <TextField
          id="tx-status"
          select
          fullWidth
          size="small"
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
      </Box>

      <Box>
        <FilterFieldLabel htmlFor="tx-method">{t('transactions.filters.method')}</FilterFieldLabel>
        <TextField
          id="tx-method"
          select
          fullWidth
          size="small"
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
      </Box>

      <Box>
        <FilterFieldLabel htmlFor="tx-date-from">
          {t('transactions.filters.dateFrom')}
        </FilterFieldLabel>
        <TextField
          id="tx-date-from"
          type="date"
          fullWidth
          size="small"
          value={filters.dateFrom ?? ''}
          onChange={e => update({ dateFrom: e.target.value || undefined })}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box>
        <FilterFieldLabel htmlFor="tx-date-to">{t('transactions.filters.dateTo')}</FilterFieldLabel>
        <TextField
          id="tx-date-to"
          type="date"
          fullWidth
          size="small"
          value={filters.dateTo ?? ''}
          onChange={e => update({ dateTo: e.target.value || undefined })}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box>
        <FilterFieldLabel htmlFor="tx-amount-min">
          {t('transactions.filters.amountMin')}
        </FilterFieldLabel>
        <TextField
          id="tx-amount-min"
          type="number"
          fullWidth
          size="small"
          value={filters.amountMin ?? ''}
          onChange={e => update({ amountMin: parseAmount(e.target.value) })}
          inputProps={{ min: 0 }}
        />
      </Box>

      <Box>
        <FilterFieldLabel htmlFor="tx-amount-max">
          {t('transactions.filters.amountMax')}
        </FilterFieldLabel>
        <TextField
          id="tx-amount-max"
          type="number"
          fullWidth
          size="small"
          value={filters.amountMax ?? ''}
          onChange={e => update({ amountMax: parseAmount(e.target.value) })}
          inputProps={{ min: 0 }}
        />
      </Box>

      <ClearLink type="button" onClick={onClear} disabled={!hasAny}>
        {t('transactions.filters.clear')}
      </ClearLink>
    </FilterBar>
  );
}
