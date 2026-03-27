import { Box, Skeleton } from '@mui/material';
import Text from '@/design-system/components/Text';
import {
  PrimaryPillButton,
  NeutralOutlinedPillButton,
} from '@/design-system/components/PillButton';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { palette } from '@/design-system/theme/palette';
import { useReportKpis, useRevenue, useReportTransactions } from '@/api/hooks/useReports';
import {
  KpiGrid,
  KpiCard,
  KpiCardHeader,
  KpiIconBox,
  KpiValue,
  ChartTableCard,
  CardHeader,
  CardTitle,
  ChartFilterChip,
  BarChartArea,
  BarColumn,
  Bar,
  BarLabel,
  TableWrapper,
  StyledTable,
  TableHeaderCell,
  TableRow,
  TableCellCode,
  TableCell,
  TableCellBold,
  TableCellStatus,
  GuestAvatar,
  StatusChipBox,
  TrendChip,
  SkeletonTableHeaderRow,
  SkeletonTableRow,
} from './ReportsPage.styles';

const statusChipStyles: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: palette.successContainer, color: palette.success },
  pending: { bg: palette.warningContainer, color: palette.warning },
  cancelled: { bg: palette.errorContainer, color: palette.error },
};

export default function ReportsPage() {
  const { t } = useTranslation('hotels');
  const { formatDate } = useLocale();

  const { data: kpisData, isLoading: kpisLoading } = useReportKpis();
  const { data: revenueData, isLoading: revenueLoading } = useRevenue();
  const { data: transactionsData, isLoading: transactionsLoading } = useReportTransactions();

  const kpiCards = (kpisData as any) ?? [];
  const barData = (revenueData as any) ?? [];
  const transactions = (transactionsData as any) ?? [];

  const chartFilters = [t('reports.revenueFilter')];

  return (
    <HotelAdminLayout
      activeNav="reportes"
      title={t('reports.title')}
      subtitle={`Hotel Boutique El Patio · Periodo: ${formatDate('2026-01-01', 'monthOnly')} - ${formatDate('2026-02-01', 'monthYear')}`}
      topbarActions={
        <>
          <NeutralOutlinedPillButton
            pillSize="sm"
            startIcon={<CalendarMonthIcon sx={{ fontSize: 18, color: palette.primary }} />}
            endIcon={<ExpandMoreIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />}
          >
            {formatDate('2026-01-01', 'monthOnly')} - {formatDate('2026-02-01', 'monthYear')}
          </NeutralOutlinedPillButton>
          <PrimaryPillButton pillSize="sm" startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}>
            {t('reports.downloadPdf')}
          </PrimaryPillButton>
        </>
      }
    >
      {/* KPI cards */}
      <KpiGrid>
        {kpisLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <KpiCard key={i}>
                <KpiCardHeader>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={40}
                    height={40}
                    sx={{ borderRadius: '12px' }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={52}
                    height={22}
                    sx={{ borderRadius: '100px' }}
                  />
                </KpiCardHeader>
                <Skeleton animation="wave" variant="text" width={120} height={36} />
                <Skeleton animation="wave" variant="text" width={150} height={18} />
              </KpiCard>
            ))
          : kpiCards.map((kpi: any) => {
              const KpiIcon = kpi.icon;
              return (
                <KpiCard key={kpi.label}>
                  <KpiCardHeader>
                    <KpiIconBox sx={{ background: kpi.iconBg }}>
                      <KpiIcon sx={{ fontSize: 20, color: kpi.iconColor }} />
                    </KpiIconBox>
                    <TrendChip ownerState={{ trendUp: kpi.trendUp }}>
                      <TrendingUpIcon sx={{ fontSize: 13 }} />
                      {kpi.trend}
                    </TrendChip>
                  </KpiCardHeader>
                  <KpiValue>{kpi.value}</KpiValue>
                  <Text textVariant="caption">{kpi.label}</Text>
                </KpiCard>
              );
            })}
      </KpiGrid>

      {/* Chart + table card */}
      <ChartTableCard>
        {/* Card header */}
        <CardHeader>
          <CardTitle>
            <BarChartIcon sx={{ fontSize: 18, color: palette.primary }} />
            {t('reports.revenueByWeek')}
          </CardTitle>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            {chartFilters.map((filter, i) => (
              <ChartFilterChip key={filter} ownerState={{ active: i === 0 }}>
                {filter}
              </ChartFilterChip>
            ))}
          </Box>
        </CardHeader>

        {/* Bar chart */}
        <BarChartArea>
          {revenueLoading
            ? Array.from({ length: 8 }).map((_, idx) => {
                const heights = [90, 112, 98, 140, 125, 156, 144, 132];
                return (
                  <BarColumn key={idx}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      sx={{
                        width: 20,
                        height: heights[idx],
                        borderRadius: '4px 4px 0 0',
                        transform: 'none',
                      }}
                    />
                    <Skeleton animation="wave" variant="text" width={28} height={14} />
                  </BarColumn>
                );
              })
            : barData.map((bar: any, idx: number) => (
                <BarColumn key={idx}>
                  <Box sx={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: 156 }}>
                    <Bar sx={{ height: bar.height }} />
                  </Box>
                  <BarLabel>{`S${bar.week} ${formatDate(bar.month, 'monthOnly')}`}</BarLabel>
                </BarColumn>
              ))}
        </BarChartArea>

        {/* Transactions table */}
        <TableWrapper>
          {transactionsLoading ? (
            <>
              <SkeletonTableHeaderRow>
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} animation="wave" variant="text" width={55} height={16} />
                ))}
              </SkeletonTableHeaderRow>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonTableRow key={i}>
                  <Skeleton animation="wave" variant="text" width={110} height={18} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={28}
                      height={28}
                      sx={{ flexShrink: 0 }}
                    />
                    <Skeleton animation="wave" variant="text" width={90} height={18} />
                  </Box>
                  <Skeleton animation="wave" variant="text" width={110} height={18} />
                  <Skeleton animation="wave" variant="text" width={75} height={18} />
                  <Skeleton animation="wave" variant="text" width={20} height={18} />
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={80}
                    height={22}
                    sx={{ borderRadius: '100px' }}
                  />
                </SkeletonTableRow>
              ))}
            </>
          ) : (
            <StyledTable component="table">
              <Box component="thead">
                <Box component="tr">
                  {[
                    t('reports.tableHeaders.code'),
                    t('reports.tableHeaders.guest'),
                    t('reports.tableHeaders.room'),
                    t('reports.tableHeaders.checkIn'),
                    t('reports.tableHeaders.nights'),
                    t('reports.tableHeaders.total'),
                    t('reports.tableHeaders.status'),
                  ].map(header => (
                    <TableHeaderCell component="th" key={header}>
                      {header}
                    </TableHeaderCell>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {transactions.map((tx: any) => {
                  const StatusIcon = tx.statusIcon;
                  const chipStyle = statusChipStyles[tx.status];
                  return (
                    <TableRow component="tr" key={tx.code}>
                      <TableCellCode component="td">{tx.code}</TableCellCode>
                      <TableCell component="td">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GuestAvatar>
                            <PersonIcon sx={{ fontSize: 14, color: palette.primary }} />
                          </GuestAvatar>
                          {tx.guest}
                        </Box>
                      </TableCell>
                      <TableCell component="td">{tx.room}</TableCell>
                      <TableCell component="td">{formatDate(tx.checkin, 'medium')}</TableCell>
                      <TableCell component="td">{tx.nights}</TableCell>
                      <TableCellBold component="td">{tx.total}</TableCellBold>
                      <TableCellStatus component="td">
                        <StatusChipBox ownerState={chipStyle}>
                          <StatusIcon sx={{ fontSize: 12 }} />
                          {tx.statusLabel}
                        </StatusChipBox>
                      </TableCellStatus>
                    </TableRow>
                  );
                })}
              </Box>
            </StyledTable>
          )}
        </TableWrapper>
      </ChartTableCard>
    </HotelAdminLayout>
  );
}
