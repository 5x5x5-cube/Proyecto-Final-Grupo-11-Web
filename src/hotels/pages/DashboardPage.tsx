import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Remove';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaymentsIcon from '@mui/icons-material/Payments';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BarChartIcon from '@mui/icons-material/BarChart';
import SellIcon from '@mui/icons-material/Sell';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AppsIcon from '@mui/icons-material/Apps';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import StatusChip from '../../design-system/components/StatusChip';
import { palette } from '../../design-system/theme/palette';
import { useDashboard } from '../../api/hooks/useReports';
import DashboardPageSkeleton from './DashboardPage.skeleton';

const iconMap: Record<string, React.ElementType> = {
  luggage: LuggageIcon,
  payments: PaymentsIcon,
  schedule: ScheduleIcon,
  event_available: EventAvailableIcon,
  bar_chart: BarChartIcon,
  sell: SellIcon,
  local_offer: LocalOfferIcon,
  apps: AppsIcon,
};

const iconColorMap = {
  teal: { bg: palette.primaryContainer, color: palette.primary },
  green: { bg: palette.successContainer, color: palette.success },
  amber: { bg: palette.warningContainer, color: palette.warning },
  red: { bg: palette.errorContainer, color: palette.error },
  blue: { bg: '#E3F2FD', color: '#1565C0' },
} as const;

export default function DashboardPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const { data: dashboard, isLoading } = useDashboard();

  if (isLoading || !dashboard) {
    return (
      <HotelAdminLayout
        activeNav="dashboard"
        title={t('dashboard.title')}
        subtitle={`${formatDate('2026-02-27', 'mediumWithDay')} · Hotel Santa Clara Sofitel`}
      >
        <DashboardPageSkeleton />
      </HotelAdminLayout>
    );
  }

  const {
    stats: dashboardStats,
    recentReservations,
    revenueData,
    quickAccessItems,
  } = dashboard as any;

  const topbarActions = (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
        sx={{
          height: 38,
          borderRadius: '100px',
          borderColor: palette.outlineVariant,
          color: palette.onSurface,
          fontFamily: "'Roboto', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          textTransform: 'none',
          backgroundColor: '#fff',
          '&:hover': { borderColor: palette.outlineVariant, backgroundColor: '#fff' },
          '& .MuiButton-startIcon .MuiSvgIcon-root': { color: palette.primary },
        }}
      >
        {t('dashboard.export')}
      </Button>
      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon sx={{ fontSize: 16 }} />}
        disableElevation
        sx={{
          height: 38,
          borderRadius: '100px',
          backgroundColor: palette.primary,
          color: '#fff',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': { backgroundColor: palette.primary },
        }}
      >
        {t('dashboard.newRate')}
      </Button>
    </>
  );

  return (
    <HotelAdminLayout
      activeNav="dashboard"
      title={t('dashboard.title')}
      subtitle={`${formatDate('2026-02-27', 'mediumWithDay')} · Hotel Santa Clara Sofitel`}
      topbarActions={topbarActions}
    >
      {/* Stat cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          mb: '24px',
        }}
      >
        {dashboardStats.map((stat, index) => {
          const colors = iconColorMap[stat.iconColor];
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: '#fff',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: colors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {React.createElement(iconMap[stat.icon] || AppsIcon, {
                    sx: { fontSize: 22, color: colors.color },
                  })}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 12,
                    fontWeight: 500,
                    color:
                      stat.changeType === 'up'
                        ? palette.success
                        : (stat.changeType as string) === 'down'
                          ? palette.error
                          : palette.onSurfaceVariant,
                  }}
                >
                  {stat.changeType === 'up' && <ArrowUpwardIcon sx={{ fontSize: 14 }} />}
                  {stat.changeType === 'neutral' && <RemoveIcon sx={{ fontSize: 14 }} />}
                  {stat.change}
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 28, fontWeight: 700, color: palette.onSurface }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Content grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        {/* Recent reservations */}
        <Box
          sx={{
            backgroundColor: '#fff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              padding: '18px 24px',
              borderBottom: `1px solid ${palette.outlineVariant}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EventAvailableIcon sx={{ fontSize: 18, color: palette.primary }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface }}>
                {t('dashboard.recentReservations')}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: 13, fontWeight: 500, color: palette.primary, cursor: 'pointer' }}
            >
              {t('dashboard.viewAll')}
            </Typography>
          </Box>

          {/* Table */}
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {[
                  t('dashboard.tableHeaders.guest'),
                  t('dashboard.tableHeaders.room'),
                  t('dashboard.tableHeaders.checkIn'),
                  t('dashboard.tableHeaders.checkOut'),
                  t('dashboard.tableHeaders.total'),
                  t('dashboard.tableHeaders.status'),
                ].map(col => (
                  <Box
                    component="th"
                    key={col}
                    sx={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.onSurfaceVariant,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      backgroundColor: palette.background,
                    }}
                  >
                    {col}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {recentReservations.map((res, index) => (
                <Box
                  component="tr"
                  key={res.id}
                  sx={{
                    '&:hover td': { backgroundColor: '#fafefe' },
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      fontSize: 14,
                      color: palette.onSurface,
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: palette.secondaryContainer,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 600,
                          color: palette.primary,
                          flexShrink: 0,
                        }}
                      >
                        {res.initials}
                      </Box>
                      {res.guest}
                    </Box>
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      fontSize: 14,
                      color: palette.onSurface,
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    {res.room}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      fontSize: 14,
                      color: palette.onSurface,
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    {formatDate(res.checkIn, 'medium')}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      fontSize: 14,
                      color: palette.onSurface,
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    {formatDate(res.checkOut, 'medium')}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      fontSize: 14,
                      color: palette.onSurface,
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    {formatPrice(res.totalCop)}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: '14px 16px',
                      borderBottom:
                        index < recentReservations.length - 1
                          ? `1px solid ${palette.outlineVariant}`
                          : 'none',
                    }}
                  >
                    <StatusChip status={res.status} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Revenue mini chart */}
          <Box
            sx={{
              backgroundColor: '#fff',
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '18px 24px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChartIcon sx={{ fontSize: 18, color: palette.primary }} />
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface }}>
                  {t('dashboard.revenue2026')}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: 13, fontWeight: 500, color: palette.primary, cursor: 'pointer' }}
              >
                {t('dashboard.viewReport')}
              </Typography>
            </Box>

            {/* CSS Bar chart */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                height: 80,
                padding: '20px 24px 0',
              }}
            >
              {revenueData.map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${d.value}%`,
                    borderRadius: '4px 4px 0 0',
                    backgroundColor: d.highlight ? palette.primary : palette.primaryContainer,
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.85 },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: '8px', padding: '6px 24px 16px' }}>
              {revenueData.map((d, i) => (
                <Typography
                  key={i}
                  sx={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 10,
                    color: d.highlight ? palette.primary : palette.onSurfaceVariant,
                    fontWeight: d.highlight ? 600 : 400,
                  }}
                >
                  {formatDate(d.month, 'monthOnly')}
                </Typography>
              ))}
            </Box>
            <Typography
              sx={{ padding: '0 24px 16px', fontSize: 13, color: palette.onSurfaceVariant }}
            >
              {formatDate('2026-02-01', 'monthYear')}:{' '}
              <Box component="span" sx={{ color: palette.primary, fontSize: 18, fontWeight: 700 }}>
                {formatPrice(94200000)}
              </Box>
            </Typography>
          </Box>

          {/* Quick access */}
          <Box
            sx={{
              backgroundColor: '#fff',
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '18px 24px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AppsIcon sx={{ fontSize: 18, color: palette.primary }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface }}>
                {t('dashboard.quickAccess')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '20px',
              }}
            >
              {quickAccessItems.map((item, index) => {
                const colors = iconColorMap[item.iconColor];
                return (
                  <Box
                    key={index}
                    sx={{
                      border: `1px solid ${palette.outlineVariant}`,
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: palette.primary,
                        backgroundColor: '#f0fbfc',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: colors.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {React.createElement(iconMap[item.icon] || AppsIcon, {
                        sx: { fontSize: 24, color: colors.color },
                      })}
                    </Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                      {item.description}
                    </Typography>
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
