import React from 'react';
import { Box } from '@mui/material';
import Text from '@/design-system/components/Text';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import {
  NeutralOutlinedPillButton,
  PrimaryPillButton,
} from '@/design-system/components/PillButton';
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
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import StatusChip from '@/design-system/components/StatusChip';
import { palette } from '@/design-system/theme/palette';
import { useDashboard } from '@/api/hooks/useReports';
import DashboardPageSkeleton from './DashboardPage.skeleton';
import {
  StatsGrid,
  StatCard,
  StatCardHeader,
  IconBadge,
  StatValue,
  ContentGrid,
  SectionPanel,
  SectionHeader,
  SectionHeaderLeft,
  ViewAllLink,
  TableHeader,
  TableCell,
  AvatarCircle,
  TableRow,
  BarChartContainer,
  Bar,
  MonthLabel,
  QuickAccessGrid,
  QuickAccessCard,
  QuickAccessIcon,
  ChangeIndicator,
} from './DashboardPage.styles';

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
      <NeutralOutlinedPillButton
        pillSize="xxs"
        startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
        sx={{ '& .MuiButton-startIcon .MuiSvgIcon-root': { color: palette.primary } }}
      >
        {t('dashboard.export')}
      </NeutralOutlinedPillButton>
      <PrimaryPillButton pillSize="xxs" startIcon={<AddIcon sx={{ fontSize: 16 }} />}>
        {t('dashboard.newRate')}
      </PrimaryPillButton>
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
      <StatsGrid>
        {dashboardStats.map((stat: any, index: number) => {
          const colors = iconColorMap[stat.iconColor as keyof typeof iconColorMap];
          return (
            <StatCard key={index}>
              <StatCardHeader>
                <IconBadge bgColor={colors.bg}>
                  {React.createElement(iconMap[stat.icon] || AppsIcon, {
                    sx: { fontSize: 22, color: colors.color },
                  })}
                </IconBadge>
                <ChangeIndicator
                  changeColor={
                    stat.changeType === 'up'
                      ? palette.success
                      : (stat.changeType as string) === 'down'
                        ? palette.error
                        : palette.onSurfaceVariant
                  }
                >
                  {stat.changeType === 'up' && <ArrowUpwardIcon sx={{ fontSize: 14 }} />}
                  {stat.changeType === 'neutral' && <RemoveIcon sx={{ fontSize: 14 }} />}
                  {stat.change}
                </ChangeIndicator>
              </StatCardHeader>
              <Box>
                <StatValue>
                  {stat.numericValue ? formatPrice(stat.numericValue) : stat.value}
                </StatValue>
                <Text textVariant="hint">{stat.label}</Text>
              </Box>
            </StatCard>
          );
        })}
      </StatsGrid>

      {/* Content grid */}
      <ContentGrid>
        {/* Recent reservations */}
        <SectionPanel>
          {/* Header */}
          <SectionHeader>
            <SectionHeaderLeft>
              <EventAvailableIcon sx={{ fontSize: 18, color: palette.primary }} />
              <Text textVariant="cardSubheading">{t('dashboard.recentReservations')}</Text>
            </SectionHeaderLeft>
            <ViewAllLink>{t('dashboard.viewAll')}</ViewAllLink>
          </SectionHeader>

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
                  <TableHeader component="th" key={col}>
                    {col}
                  </TableHeader>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {recentReservations.map((res: any, index: number) => (
                <TableRow component="tr" key={res.id}>
                  <TableCell component="td" isLast={index === recentReservations.length - 1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <AvatarCircle>{res.initials}</AvatarCircle>
                      {res.guest}
                    </Box>
                  </TableCell>
                  <TableCell component="td" isLast={index === recentReservations.length - 1}>
                    {res.room}
                  </TableCell>
                  <TableCell component="td" isLast={index === recentReservations.length - 1}>
                    {formatDate(res.checkIn, 'medium')}
                  </TableCell>
                  <TableCell component="td" isLast={index === recentReservations.length - 1}>
                    {formatDate(res.checkOut, 'medium')}
                  </TableCell>
                  <TableCell component="td" isLast={index === recentReservations.length - 1}>
                    {formatPrice(res.totalCop)}
                  </TableCell>
                  <TableCell
                    component="td"
                    isLast={index === recentReservations.length - 1}
                    sx={{ fontSize: 'inherit', color: 'inherit' }}
                  >
                    <StatusChip status={res.status} />
                  </TableCell>
                </TableRow>
              ))}
            </Box>
          </Box>
        </SectionPanel>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Revenue mini chart */}
          <SectionPanel>
            <SectionHeader>
              <SectionHeaderLeft>
                <BarChartIcon sx={{ fontSize: 18, color: palette.primary }} />
                <Text textVariant="cardSubheading">{t('dashboard.revenue2026')}</Text>
              </SectionHeaderLeft>
              <ViewAllLink>{t('dashboard.viewReport')}</ViewAllLink>
            </SectionHeader>

            {/* CSS Bar chart */}
            <BarChartContainer>
              {revenueData.map((d: any, i: number) => (
                <Bar key={i} barHeight={`${d.value}%`} highlight={d.highlight} />
              ))}
            </BarChartContainer>
            <Box sx={{ display: 'flex', gap: '8px', padding: '6px 24px 16px' }}>
              {revenueData.map((d: any, i: number) => (
                <MonthLabel key={i} highlight={d.highlight}>
                  {formatDate(d.month, 'monthOnly')}
                </MonthLabel>
              ))}
            </Box>
            <Text textVariant="hint" sx={{ padding: '0 24px 16px' }}>
              {formatDate('2026-02-01', 'monthYear')}:{' '}
              <Box component="span" sx={{ color: palette.primary, fontSize: 18, fontWeight: 700 }}>
                {formatPrice(94200000)}
              </Box>
            </Text>
          </SectionPanel>

          {/* Quick access */}
          <SectionPanel>
            <SectionHeader sx={{ justifyContent: 'flex-start' }}>
              <SectionHeaderLeft>
                <AppsIcon sx={{ fontSize: 18, color: palette.primary }} />
                <Text textVariant="cardSubheading">{t('dashboard.quickAccess')}</Text>
              </SectionHeaderLeft>
            </SectionHeader>
            <QuickAccessGrid>
              {quickAccessItems.map((item: any, index: number) => {
                const colors = iconColorMap[item.iconColor as keyof typeof iconColorMap];
                return (
                  <QuickAccessCard key={index}>
                    <QuickAccessIcon bgColor={colors.bg}>
                      {React.createElement(iconMap[item.icon] || AppsIcon, {
                        sx: { fontSize: 24, color: colors.color },
                      })}
                    </QuickAccessIcon>
                    <Text textVariant="bodySemibold">{item.label}</Text>
                    <Text textVariant="caption">{item.description}</Text>
                  </QuickAccessCard>
                );
              })}
            </QuickAccessGrid>
          </SectionPanel>
        </Box>
      </ContentGrid>
    </HotelAdminLayout>
  );
}
