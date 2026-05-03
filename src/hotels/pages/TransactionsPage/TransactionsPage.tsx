import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import DownloadIcon from '@mui/icons-material/Download';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import { useLocale } from '@/contexts/LocaleContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { palette } from '@/design-system/theme/palette';
import {
  usePaymentsSummary,
  usePaymentsList,
  exportPaymentsCsv,
} from '@/api/hooks/useAdminPayments';
import type { PaymentsSummary, PaymentListItem } from '@/api/hooks/useAdminPayments';
import TransactionsFilterBar from '@/modules/hotel-transactions/components/TransactionsFilterBar';
import TransactionsTable from '@/modules/hotel-transactions/components/TransactionsTable';
import TransactionDetailDrawer from '@/modules/hotel-transactions/components/TransactionDetailDrawer';
import type { TransactionsFilters } from '@/modules/hotel-transactions/types';
import { EMPTY_FILTERS } from '@/modules/hotel-transactions/types';
import {
  KpiGrid,
  KpiCard,
  KpiCardHeader,
  KpiIconBox,
  KpiValue,
  KpiLabel,
  KpiSubtext,
} from './TransactionsPage.styles';

const KPI_CARD_COUNT = 4;
const PAGE_SIZE = 20;

/**
 * Translate the date inputs (YYYY-MM-DD) into the ISO datetimes the backend
 * expects. The "to" boundary covers the full day so a same-day filter still
 * matches transactions created late in the afternoon.
 */
function buildDateRange(filters: TransactionsFilters): {
  dateFrom?: string;
  dateTo?: string;
} {
  return {
    dateFrom: filters.dateFrom ? `${filters.dateFrom}T00:00:00` : undefined,
    dateTo: filters.dateTo ? `${filters.dateTo}T23:59:59` : undefined,
  };
}

function formatApprovalRate(summary: PaymentsSummary | undefined): string {
  if (!summary) return '—';
  const decided = summary.approvedCount + summary.declinedCount;
  if (decided === 0) return '—';
  return `${Math.round(summary.approvalRate * 100)}%`;
}

/**
 * Admin transactions monitoring page (HU4.4).
 *
 * Wires the summary cards (commit 4) with the filterable, paginated table
 * (commit 5). Filters are owned here and fan out to both the summary and
 * the listing queries so the metrics always reflect the visible rows.
 */
export default function TransactionsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice } = useLocale();
  const { showError, showSuccess } = useSnackbar();

  const [filters, setFilters] = useState<TransactionsFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<PaymentListItem | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const dateRange = buildDateRange(filters);
  const summaryParams = { dateFrom: dateRange.dateFrom, dateTo: dateRange.dateTo };
  const listParams = {
    status: filters.status,
    method: filters.method,
    dateFrom: dateRange.dateFrom,
    dateTo: dateRange.dateTo,
    amountMin: filters.amountMin,
    amountMax: filters.amountMax,
    page,
    pageSize: PAGE_SIZE,
  };

  const { data: summary, isLoading: isSummaryLoading } = usePaymentsSummary(summaryParams);
  const { data: list, isLoading: isListLoading } = usePaymentsList(listParams);

  const handleFiltersChange = (next: TransactionsFilters) => {
    setFilters(next);
    setPage(1); // any filter change resets to the first page
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await exportPaymentsCsv({
        status: filters.status,
        method: filters.method,
        dateFrom: dateRange.dateFrom,
        dateTo: dateRange.dateTo,
        amountMin: filters.amountMin,
        amountMax: filters.amountMax,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Stamp the filename with the date so repeated exports don't overwrite.
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `transactions_${stamp}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showSuccess(t('transactions.exportSuccess'));
    } catch {
      showError(t('transactions.errors.exportFailed'));
    } finally {
      setIsExporting(false);
    }
  };

  const kpis = summary
    ? [
        {
          key: 'totalProcessed',
          icon: AccountBalanceWalletIcon,
          iconBg: palette.primaryContainer,
          iconColor: palette.primary,
          label: t('transactions.summary.totalProcessed'),
          value: formatPrice(summary.totalProcessed),
          subtext: t('transactions.summary.transactionCount', { count: summary.approvedCount }),
        },
        {
          key: 'approvalRate',
          icon: CheckCircleIcon,
          iconBg: palette.successContainer,
          iconColor: palette.success,
          label: t('transactions.summary.approvalRate'),
          value: formatApprovalRate(summary),
          subtext: t('transactions.summary.transactionCount', { count: summary.transactionCount }),
        },
        {
          key: 'totalDeclined',
          icon: CancelIcon,
          iconBg: palette.errorContainer,
          iconColor: palette.error,
          label: t('transactions.summary.totalDeclined'),
          value: formatPrice(summary.totalDeclined),
          subtext: t('transactions.summary.transactionCount', { count: summary.declinedCount }),
        },
        {
          key: 'totalRefunded',
          icon: ReplayIcon,
          iconBg: palette.warningContainer,
          iconColor: palette.warning,
          label: t('transactions.summary.totalRefunded'),
          value: formatPrice(summary.totalRefunded),
          subtext: t('transactions.summary.transactionCount', { count: summary.refundedCount }),
        },
      ]
    : [];

  return (
    <HotelAdminLayout
      activeNav="transacciones"
      title={t('transactions.title')}
      subtitle={t('transactions.subtitle')}
      topbarActions={
        <PrimaryPillButton
          pillSize="sm"
          startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
          onClick={handleExport}
          disabled={isExporting || isListLoading}
        >
          {t('transactions.exportButton')}
        </PrimaryPillButton>
      }
    >
      <KpiGrid>
        {isSummaryLoading
          ? Array.from({ length: KPI_CARD_COUNT }).map((_, i) => (
              <KpiCard key={i}>
                <KpiCardHeader>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={36}
                    height={36}
                    sx={{ borderRadius: '10px' }}
                  />
                </KpiCardHeader>
                <Skeleton animation="wave" variant="text" width={120} height={32} />
                <Skeleton animation="wave" variant="text" width={140} height={16} />
              </KpiCard>
            ))
          : kpis.map(kpi => {
              const Icon = kpi.icon;
              return (
                <KpiCard key={kpi.key}>
                  <KpiCardHeader>
                    <KpiIconBox sx={{ background: kpi.iconBg }}>
                      <Icon sx={{ fontSize: 20, color: kpi.iconColor }} />
                    </KpiIconBox>
                  </KpiCardHeader>
                  <KpiValue>{kpi.value}</KpiValue>
                  <KpiLabel>{kpi.label}</KpiLabel>
                  <KpiSubtext>{kpi.subtext}</KpiSubtext>
                </KpiCard>
              );
            })}
      </KpiGrid>

      <TransactionsFilterBar
        filters={filters}
        onChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      <TransactionsTable
        items={list?.items ?? []}
        isLoading={isListLoading}
        page={list?.page ?? page}
        pageSize={list?.pageSize ?? PAGE_SIZE}
        total={list?.total ?? 0}
        totalPages={list?.totalPages ?? 0}
        onPageChange={setPage}
        onRowClick={setSelectedItem}
      />

      <TransactionDetailDrawer
        item={selectedItem}
        open={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      />
    </HotelAdminLayout>
  );
}
