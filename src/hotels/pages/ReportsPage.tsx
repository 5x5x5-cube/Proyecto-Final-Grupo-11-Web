import { Box, Typography, Skeleton } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import { palette } from '../../design-system/theme/palette';
import { useReportKpis, useRevenue, useReportTransactions } from '../../api/hooks/useReports';

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '100px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              color: palette.onSurface,
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 18, color: palette.primary }} />
            {formatDate('2026-01-01', 'monthOnly')} - {formatDate('2026-02-01', 'monthYear')}
            <ExpandMoreIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              background: palette.primary,
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <DownloadIcon sx={{ fontSize: 16 }} />
            {t('reports.downloadPdf')}
          </Box>
        </>
      }
    >

      {/* KPI cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', mb: '20px' }}>
        {kpisLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  background: palette.surface,
                  borderRadius: '16px',
                  border: `1px solid ${palette.outlineVariant}`,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Skeleton animation="wave" variant="rounded" width={40} height={40} sx={{ borderRadius: '12px' }} />
                  <Skeleton animation="wave" variant="rounded" width={52} height={22} sx={{ borderRadius: '100px' }} />
                </Box>
                <Skeleton animation="wave" variant="text" width={120} height={36} />
                <Skeleton animation="wave" variant="text" width={150} height={18} />
              </Box>
            ))
          : kpiCards.map((kpi: any) => {
              const KpiIcon = kpi.icon;
              return (
                <Box
                  key={kpi.label}
                  sx={{
                    background: palette.surface,
                    borderRadius: '16px',
                    border: `1px solid ${palette.outlineVariant}`,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: kpi.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <KpiIcon sx={{ fontSize: 20, color: kpi.iconColor }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: kpi.trendUp ? palette.successContainer : palette.errorContainer,
                        color: kpi.trendUp ? palette.success : palette.error,
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 13 }} />
                      {kpi.trend}
                    </Box>
                  </Box>
                  <Typography sx={{ fontSize: 24, fontWeight: 700, color: palette.onSurface }}>
                    {kpi.value}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    {kpi.label}
                  </Typography>
                </Box>
              );
            })}
      </Box>

      {/* Chart + table card */}
      <Box
        sx={{
          background: palette.surface,
          borderRadius: '16px',
          border: `1px solid ${palette.outlineVariant}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Card header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 14, fontWeight: 700, color: palette.onSurface }}>
            <BarChartIcon sx={{ fontSize: 18, color: palette.primary }} />
            {t('reports.revenueByWeek')}
          </Box>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            {chartFilters.map((filter, i) => (
              <Box
                key={filter}
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  border: `1px solid ${i === 0 ? palette.primary : palette.outlineVariant}`,
                  background: i === 0 ? palette.primary : 'transparent',
                  color: i === 0 ? '#fff' : palette.onSurfaceVariant,
                  cursor: 'pointer',
                }}
              >
                {filter}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bar chart */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: 180, padding: '0 8px' }}>
          {revenueLoading
            ? Array.from({ length: 8 }).map((_, idx) => {
                const heights = [90, 112, 98, 140, 125, 156, 144, 132];
                return (
                  <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      sx={{ width: 20, height: heights[idx], borderRadius: '4px 4px 0 0', transform: 'none' }}
                    />
                    <Skeleton animation="wave" variant="text" width={28} height={14} />
                  </Box>
                );
              })
            : barData.map((bar: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    flex: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: 156 }}>
                    <Box
                      sx={{
                        borderRadius: '4px 4px 0 0',
                        width: 20,
                        height: bar.height,
                        background: palette.primary,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 10, color: palette.outline, fontWeight: 500 }}>
                    {`S${bar.week} ${formatDate(bar.month, 'monthOnly')}`}
                  </Typography>
                </Box>
              ))}
        </Box>

        {/* Transactions table */}
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          {transactionsLoading ? (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
                  padding: '8px 12px',
                  borderBottom: `1px solid ${palette.outlineVariant}`,
                  gap: '8px',
                }}
              >
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} animation="wave" variant="text" width={55} height={16} />
                ))}
              </Box>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
                    padding: '10px 12px',
                    alignItems: 'center',
                    gap: '8px',
                    borderBottom: `1px solid ${palette.outlineVariant}`,
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={110} height={18} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Skeleton animation="wave" variant="circular" width={28} height={28} sx={{ flexShrink: 0 }} />
                    <Skeleton animation="wave" variant="text" width={90} height={18} />
                  </Box>
                  <Skeleton animation="wave" variant="text" width={110} height={18} />
                  <Skeleton animation="wave" variant="text" width={75} height={18} />
                  <Skeleton animation="wave" variant="text" width={20} height={18} />
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                  <Skeleton animation="wave" variant="rounded" width={80} height={22} sx={{ borderRadius: '100px' }} />
                </Box>
              ))}
            </>
          ) : (
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
              <Box component="thead">
                <Box component="tr">
                  {[t('reports.tableHeaders.code'), t('reports.tableHeaders.guest'), t('reports.tableHeaders.room'), t('reports.tableHeaders.checkIn'), t('reports.tableHeaders.nights'), t('reports.tableHeaders.total'), t('reports.tableHeaders.status')].map((header) => (
                    <Box
                      component="th"
                      key={header}
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.outline,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '8px 12px',
                        textAlign: 'left',
                        borderBottom: `1px solid ${palette.outlineVariant}`,
                      }}
                    >
                      {header}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {transactions.map((tx: any) => {
                  const StatusIcon = tx.statusIcon;
                  const chipStyle = statusChipStyles[tx.status];
                  return (
                    <Box
                      component="tr"
                      key={tx.code}
                      sx={{
                        '&:hover': { background: palette.background },
                      }}
                    >
                      <Box
                        component="td"
                        sx={{
                          padding: '10px 12px',
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: palette.primary,
                          fontWeight: 600,
                          borderBottom: `1px solid ${palette.outlineVariant}`,
                        }}
                      >
                        {tx.code}
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', fontSize: 13, color: palette.onSurface, borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              background: palette.secondaryContainer,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <PersonIcon sx={{ fontSize: 14, color: palette.primary }} />
                          </Box>
                          {tx.guest}
                        </Box>
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', fontSize: 13, color: palette.onSurface, borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        {tx.room}
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', fontSize: 13, color: palette.onSurface, borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        {formatDate(tx.checkin, 'medium')}
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', fontSize: 13, color: palette.onSurface, borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        {tx.nights}
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: palette.onSurface, borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        {tx.total}
                      </Box>
                      <Box component="td" sx={{ padding: '10px 12px', borderBottom: `1px solid ${palette.outlineVariant}` }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '100px',
                            background: chipStyle.bg,
                            color: chipStyle.color,
                          }}
                        >
                          <StatusIcon sx={{ fontSize: 12 }} />
                          {tx.statusLabel}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
