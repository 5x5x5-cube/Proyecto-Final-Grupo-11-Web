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
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import { palette } from '../../design-system/theme/palette';

const kpiCards = [
  {
    icon: PaymentsIcon,
    iconClass: 'teal',
    iconBg: palette.primaryContainer,
    iconColor: palette.primary,
    trend: '+18%',
    trendUp: true,
    value: 'COP 94.2M',
    label: 'Ingresos totales',
  },
  {
    icon: EventAvailableIcon,
    iconClass: 'green',
    iconBg: palette.successContainer,
    iconColor: palette.success,
    trend: '+12%',
    trendUp: true,
    value: '127',
    label: 'Reservas completadas',
  },
  {
    icon: ConfirmationNumberIcon,
    iconClass: 'amber',
    iconBg: palette.warningContainer,
    iconColor: palette.warning,
    trend: '+5%',
    trendUp: true,
    value: 'COP 741K',
    label: 'Ticket promedio',
  },
];

const barData = [
  { label: 'S1 Ene', height: 90 },
  { label: 'S2 Ene', height: 112 },
  { label: 'S3 Ene', height: 98 },
  { label: 'S4 Ene', height: 140 },
  { label: 'S1 Feb', height: 125 },
  { label: 'S2 Feb', height: 156 },
  { label: 'S3 Feb', height: 144 },
  { label: 'S4 Feb', height: 132 },
];

const chartFilters = ['Ingresos'];

const transactions = [
  {
    code: 'TH-2026-00483',
    guest: 'Carlos Mendoza',
    room: 'Suite Deluxe King',
    checkin: '15 Mar 2026',
    nights: 3,
    total: 'COP 3.149.160',
    status: 'pending',
    statusLabel: 'Pendiente',
    statusIcon: ScheduleIcon,
  },
  {
    code: 'TH-2026-00471',
    guest: 'Ana Torres',
    room: 'Habitacion Estandar',
    checkin: '10 Mar 2026',
    nights: 2,
    total: 'COP 980.000',
    status: 'confirmed',
    statusLabel: 'Confirmada',
    statusIcon: CheckCircleIcon,
  },
  {
    code: 'TH-2026-00459',
    guest: 'Luis Herrera',
    room: 'Junior Suite',
    checkin: '05 Mar 2026',
    nights: 4,
    total: 'COP 2.240.000',
    status: 'confirmed',
    statusLabel: 'Confirmada',
    statusIcon: CheckCircleIcon,
  },
  {
    code: 'TH-2026-00445',
    guest: 'Maria Gomez',
    room: 'Suite Deluxe King',
    checkin: '28 Feb 2026',
    nights: 1,
    total: 'COP 888.000',
    status: 'cancelled',
    statusLabel: 'Cancelada',
    statusIcon: CancelIcon,
  },
  {
    code: 'TH-2026-00432',
    guest: 'Jorge Ruiz',
    room: 'Habitacion Doble',
    checkin: '22 Feb 2026',
    nights: 5,
    total: 'COP 3.500.000',
    status: 'confirmed',
    statusLabel: 'Confirmada',
    statusIcon: CheckCircleIcon,
  },
];

const statusChipStyles: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: palette.successContainer, color: palette.success },
  pending: { bg: palette.warningContainer, color: palette.warning },
  cancelled: { bg: palette.errorContainer, color: palette.error },
};

export default function ReportsPage() {
  return (
    <HotelAdminLayout
      activeNav="reportes"
      title="Reporte de Ingresos"
      subtitle="Hotel Boutique El Patio · Periodo: Enero - Febrero 2026"
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
            Ene - Feb 2026
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
            Descargar PDF
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
            Ingresos por semana · Ene-Feb 2026
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
          {barData.map((bar) => (
            <Box
              key={bar.label}
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
                {bar.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Transactions table */}
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {['Codigo', 'Huesped', 'Habitacion', 'Check-in', 'Noches', 'Total', 'Estado'].map((header) => (
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
                      {tx.checkin}
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
