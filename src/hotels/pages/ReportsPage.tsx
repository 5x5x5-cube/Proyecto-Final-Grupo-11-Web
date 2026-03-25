import { Box, Typography } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import { palette } from '../../design-system/theme/palette';

const barData = [
  { week: 1, month: '2026-01-01', height: 90 },
  { week: 2, month: '2026-01-01', height: 112 },
  { week: 3, month: '2026-01-01', height: 98 },
  { week: 4, month: '2026-01-01', height: 140 },
  { week: 1, month: '2026-02-01', height: 125 },
  { week: 2, month: '2026-02-01', height: 156 },
  { week: 3, month: '2026-02-01', height: 144 },
  { week: 4, month: '2026-02-01', height: 132 },
];

const statusChipStyles: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: palette.successContainer, color: palette.success },
  pending: { bg: palette.warningContainer, color: palette.warning },
  cancelled: { bg: palette.errorContainer, color: palette.error },
};

export default function ReportsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const kpiCards = [
    {
      icon: PaymentsIcon,
      iconBg: palette.primaryContainer,
      iconColor: palette.primary,
      trend: '+18%',
      trendUp: true,
      value: formatPrice(94200000),
      label: t('reports.totalRevenue'),
    },
    {
      icon: EventAvailableIcon,
      iconBg: palette.successContainer,
      iconColor: palette.success,
      trend: '+12%',
      trendUp: true,
      value: '127',
      label: t('reports.completedReservations'),
    },
    {
      icon: ConfirmationNumberIcon,
      iconBg: palette.warningContainer,
      iconColor: palette.warning,
      trend: '+5%',
      trendUp: true,
      value: formatPrice(741000),
      label: t('reports.averageTicket'),
    },
  ];

  const transactions = [
    {
      code: 'TH-2026-00483',
      guest: 'Carlos Mendoza',
      room: 'Suite Deluxe King',
      checkin: '2026-03-15',
      nights: 3,
      total: formatPrice(3149160),
      status: 'pending',
      statusLabel: t('reports.statusPending'),
      statusIcon: ScheduleIcon,
    },
    {
      code: 'TH-2026-00471',
      guest: 'Ana Torres',
      room: 'Habitacion Estandar',
      checkin: '2026-03-10',
      nights: 2,
      total: formatPrice(980000),
      status: 'confirmed',
      statusLabel: t('reports.statusConfirmed'),
      statusIcon: CheckCircleIcon,
    },
    {
      code: 'TH-2026-00459',
      guest: 'Luis Herrera',
      room: 'Junior Suite',
      checkin: '2026-03-05',
      nights: 4,
      total: formatPrice(2240000),
      status: 'confirmed',
      statusLabel: t('reports.statusConfirmed'),
      statusIcon: CheckCircleIcon,
    },
    {
      code: 'TH-2026-00445',
      guest: 'Maria Gomez',
      room: 'Suite Deluxe King',
      checkin: '2026-02-28',
      nights: 1,
      total: formatPrice(888000),
      status: 'cancelled',
      statusLabel: t('reports.statusCancelled'),
      statusIcon: CancelIcon,
    },
    {
      code: 'TH-2026-00432',
      guest: 'Jorge Ruiz',
      room: 'Habitacion Doble',
      checkin: '2026-02-22',
      nights: 5,
      total: formatPrice(3500000),
      status: 'confirmed',
      statusLabel: t('reports.statusConfirmed'),
      statusIcon: CheckCircleIcon,
    },
  ];

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
        {kpiCards.map((kpi) => {
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
          {barData.map((bar, idx) => (
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
              {transactions.map((tx) => {
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
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
