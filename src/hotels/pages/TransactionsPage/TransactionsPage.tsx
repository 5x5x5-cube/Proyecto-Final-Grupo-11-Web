import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import Text from '@/design-system/components/Text';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import { usePaymentsSummary } from '@/api/hooks/useAdminPayments';
import type { PaymentsSummary } from '@/api/hooks/useAdminPayments';
import {
  SectionCard,
  EmptyState,
  KpiGrid,
  KpiCard,
  KpiCardHeader,
  KpiIconBox,
  KpiValue,
  KpiLabel,
  KpiSubtext,
} from './TransactionsPage.styles';

const KPI_CARD_COUNT = 4;

/**
 * Format a 0..1 fraction as a localized percentage with no decimals.
 * Falls back to "—" when no decided transactions exist (avoid showing 0%
 * which would look like every transaction was rejected).
 */
function formatApprovalRate(summary: PaymentsSummary | undefined): string {
  if (!summary) return '—';
  const decided = summary.approvedCount + summary.declinedCount;
  if (decided === 0) return '—';
  return `${Math.round(summary.approvalRate * 100)}%`;
}

/**
 * Admin transactions monitoring page (HU4.4).
 *
 * This commit lands the summary cards backed by GET /payments/summary.
 * The filterable table, detail panel and CSV export follow next.
 */
export default function TransactionsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice } = useLocale();
  const { data: summary, isLoading } = usePaymentsSummary();

  const kpis = summary
    ? [
        {
          key: 'totalProcessed',
          icon: AccountBalanceWalletIcon,
          iconBg: palette.primaryContainer,
          iconColor: palette.primary,
          label: t('transactions.summary.totalProcessed'),
          value: formatPrice(summary.totalProcessed),
          subtext: t('transactions.summary.transactionCount', {
            count: summary.approvedCount,
          }),
        },
        {
          key: 'approvalRate',
          icon: CheckCircleIcon,
          iconBg: palette.successContainer,
          iconColor: palette.success,
          label: t('transactions.summary.approvalRate'),
          value: formatApprovalRate(summary),
          subtext: t('transactions.summary.transactionCount', {
            count: summary.transactionCount,
          }),
        },
        {
          key: 'totalDeclined',
          icon: CancelIcon,
          iconBg: palette.errorContainer,
          iconColor: palette.error,
          label: t('transactions.summary.totalDeclined'),
          value: formatPrice(summary.totalDeclined),
          subtext: t('transactions.summary.transactionCount', {
            count: summary.declinedCount,
          }),
        },
        {
          key: 'totalRefunded',
          icon: ReplayIcon,
          iconBg: palette.warningContainer,
          iconColor: palette.warning,
          label: t('transactions.summary.totalRefunded'),
          value: formatPrice(summary.totalRefunded),
          subtext: t('transactions.summary.transactionCount', {
            count: summary.refundedCount,
          }),
        },
      ]
    : [];

  return (
    <HotelAdminLayout
      activeNav="transacciones"
      title={t('transactions.title')}
      subtitle={t('transactions.subtitle')}
    >
      <KpiGrid>
        {isLoading
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

      <SectionCard>
        <EmptyState>
          <Text textVariant="body">{t('transactions.empty')}</Text>
        </EmptyState>
      </SectionCard>
    </HotelAdminLayout>
  );
}
