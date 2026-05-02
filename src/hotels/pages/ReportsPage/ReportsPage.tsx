import { useState } from 'react';
import { Box, Skeleton, Menu, MenuItem } from '@mui/material';
import Text from '@/design-system/components/Text';
import {
  PrimaryPillButton,
  NeutralOutlinedPillButton,
} from '@/design-system/components/PillButton';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { palette } from '@/design-system/theme/palette';
import {
  useMonthlyRevenue,
  useAvailablePeriods,
  downloadRevenueReport,
} from '@/api/hooks/useReports';
import {
  KpiGrid,
  KpiCard,
  KpiCardHeader,
  KpiIconBox,
  KpiValue,
  ChartTableCard,
  CardHeader,
  CardTitle,
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
  const { formatDate, formatPrice } = useLocale();

  // Estado para el periodo seleccionado
  const currentDate = new Date();
  const [selectedPeriod, setSelectedPeriod] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Obtener datos del backend
  const { data: periodsData } = useAvailablePeriods();
  const { data: reportData, isLoading } = useMonthlyRevenue(selectedPeriod);

  const periods = (periodsData as any)?.periods ?? [];
  const report = reportData as any;
  const summary = report?.summary;
  const transactions = report?.transactions ?? [];

  // Función para manejar descarga
  const handleDownload = async (format: 'pdf' | 'excel') => {
    setDownloading(true);
    try {
      const blob = await downloadRevenueReport(selectedPeriod.month, selectedPeriod.year, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_ingresos_${selectedPeriod.month}_${selectedPeriod.year}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Error al descargar el reporte');
    } finally {
      setDownloading(false);
    }
  };

  // KPIs desde el summary del backend
  const kpiCards = summary
    ? [
        {
          label: 'Ingresos Brutos',
          value: formatPrice(Number(summary.gross_revenue)),
          icon: AttachMoneyIcon,
          iconBg: palette.primaryContainer,
          iconColor: palette.primary,
          trend: '+12%',
          trendUp: true,
        },
        {
          label: 'Cancelaciones',
          value: formatPrice(Number(summary.cancellations_amount)),
          icon: CancelIcon,
          iconBg: palette.errorContainer,
          iconColor: palette.error,
          trend: '-5%',
          trendUp: false,
        },
        {
          label: 'Ingreso Neto',
          value: formatPrice(Number(summary.net_revenue)),
          icon: CheckCircleIcon,
          iconBg: palette.successContainer,
          iconColor: palette.success,
          trend: '+8%',
          trendUp: true,
        },
      ]
    : [];

  const selectedPeriodLabel =
    periods.find((p: any) => p.month === selectedPeriod.month && p.year === selectedPeriod.year)
      ?.label || `${selectedPeriod.month}/${selectedPeriod.year}`;

  return (
    <HotelAdminLayout
      activeNav="reportes"
      title={t('reports.title')}
      subtitle={`Periodo: ${selectedPeriodLabel}`}
      topbarActions={
        <>
          <NeutralOutlinedPillButton
            pillSize="sm"
            startIcon={<CalendarMonthIcon sx={{ fontSize: 18, color: palette.primary }} />}
            endIcon={<ExpandMoreIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            {selectedPeriodLabel}
          </NeutralOutlinedPillButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {periods.map((period: any) => (
              <MenuItem
                key={`${period.year}-${period.month}`}
                onClick={() => {
                  setSelectedPeriod({ month: period.month, year: period.year });
                  setAnchorEl(null);
                }}
                selected={
                  period.month === selectedPeriod.month && period.year === selectedPeriod.year
                }
              >
                {period.label} ({period.booking_count} reservas)
              </MenuItem>
            ))}
          </Menu>
          <PrimaryPillButton
            pillSize="sm"
            startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
            onClick={() => handleDownload('pdf')}
            disabled={downloading || !summary}
          >
            {downloading ? 'Descargando...' : t('reports.downloadPdf')}
          </PrimaryPillButton>
          <PrimaryPillButton
            pillSize="sm"
            startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
            onClick={() => handleDownload('excel')}
            disabled={downloading || !summary}
          >
            Excel
          </PrimaryPillButton>
        </>
      }
    >
      {/* KPI cards */}
      <KpiGrid>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
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
        ) : kpiCards.length > 0 ? (
          kpiCards.map((kpi: any) => {
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
          })
        ) : (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            <Text textVariant="body">No hay datos disponibles para este periodo</Text>
          </Box>
        )}
      </KpiGrid>

      {/* Estadísticas adicionales */}
      {summary && (
        <Box sx={{ mb: 3, p: 2, bgcolor: palette.surfaceVariant, borderRadius: 2 }}>
          <Text textVariant="body" sx={{ mb: 1, fontSize: 16, fontWeight: 600 }}>
            Estadísticas del Periodo
          </Text>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Text textVariant="body">
              Total Reservas: <strong>{summary.total_bookings}</strong>
            </Text>
            <Text textVariant="body">
              Confirmadas: <strong>{summary.confirmed_bookings}</strong>
            </Text>
            <Text textVariant="body">
              Canceladas: <strong>{summary.cancelled_bookings}</strong>
            </Text>
            <Text textVariant="body">
              Pendientes: <strong>{summary.pending_bookings}</strong>
            </Text>
          </Box>
        </Box>
      )}

      {/* Transactions table */}
      <ChartTableCard>
        <CardHeader>
          <CardTitle>
            <BarChartIcon sx={{ fontSize: 18, color: palette.primary }} />
            Detalle de Transacciones
          </CardTitle>
        </CardHeader>
        <TableWrapper>
          {isLoading ? (
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
          ) : transactions.length > 0 ? (
            <StyledTable component="table">
              <Box component="thead">
                <Box component="tr">
                  {['Código', 'Huésped', 'Check-in', 'Check-out', 'Noches', 'Total', 'Estado'].map(
                    header => (
                      <TableHeaderCell component="th" key={header}>
                        {header}
                      </TableHeaderCell>
                    )
                  )}
                </Box>
              </Box>
              <Box component="tbody">
                {transactions.map((tx: any) => {
                  const chipStyle = statusChipStyles[tx.status] || statusChipStyles.pending;
                  const StatusIcon =
                    tx.status === 'confirmed'
                      ? CheckCircleIcon
                      : tx.status === 'cancelled'
                        ? CancelIcon
                        : PersonIcon;
                  return (
                    <TableRow component="tr" key={tx.booking_code}>
                      <TableCellCode component="td">{tx.booking_code}</TableCellCode>
                      <TableCell component="td">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GuestAvatar>
                            <PersonIcon sx={{ fontSize: 14, color: palette.primary }} />
                          </GuestAvatar>
                          {tx.guest_name}
                        </Box>
                      </TableCell>
                      <TableCell component="td">{formatDate(tx.check_in, 'medium')}</TableCell>
                      <TableCell component="td">{formatDate(tx.check_out, 'medium')}</TableCell>
                      <TableCell component="td">{tx.nights}</TableCell>
                      <TableCellBold component="td">{formatPrice(Number(tx.amount))}</TableCellBold>
                      <TableCellStatus component="td">
                        <StatusChipBox ownerState={chipStyle}>
                          <StatusIcon sx={{ fontSize: 12 }} />
                          {tx.status}
                        </StatusChipBox>
                      </TableCellStatus>
                    </TableRow>
                  );
                })}
              </Box>
            </StyledTable>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Text textVariant="body">No hay transacciones para este periodo</Text>
            </Box>
          )}
        </TableWrapper>
      </ChartTableCard>
    </HotelAdminLayout>
  );
}
