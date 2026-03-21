import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import StatusChip from '../../design-system/components/StatusChip';
import SearchField from '../../design-system/components/SearchField';
import FilterChip from '../../design-system/components/FilterChip';
import { palette } from '../../design-system/theme/palette';
import { hotelReservations, reservationSummary } from '../data/mockHotelReservations';

const avatarColorMap = {
  teal: palette.primaryContainer,
  green: palette.successContainer,
  amber: palette.warningContainer,
  red: palette.errorContainer,
  blue: '#E3F2FD',
} as const;

export default function ReservationsPage() {
  return (
    <HotelAdminLayout
      activeNav="reservas"
      title="Listado de reservas"
      subtitle="Hotel Santa Clara Sofitel · Febrero 2026"
    >

      {/* Filter bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          border: `1px solid ${palette.outlineVariant}`,
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          mb: '20px',
        }}
      >
        <Box sx={{ maxWidth: 340, minWidth: 200 }}>
          <SearchField placeholder="Buscar por huesped, codigo o habitacion..." />
        </Box>

        <Box sx={{ width: '1px', height: 32, backgroundColor: palette.outlineVariant, flexShrink: 0 }} />

        <FilterChip
          label="Todas"
          selected
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        />
        <FilterChip label="Confirmadas" />
        <FilterChip label="Pendientes" />
        <FilterChip label="Canceladas" />

        <Box sx={{ width: '1px', height: 32, backgroundColor: palette.outlineVariant, flexShrink: 0 }} />

        {/* Date filter */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: 36,
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '100px',
            padding: '0 16px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: 13,
            color: palette.onSurfaceVariant,
            flexShrink: 0,
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 16, color: palette.primary }} />
          1 feb – 28 feb 2026
        </Box>

        {/* Clear filters */}
        <Box sx={{ marginLeft: 'auto', flexShrink: 0 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: palette.primary,
              cursor: 'pointer',
            }}
          >
            Limpiar filtros
          </Typography>
        </Box>
      </Box>

      {/* Summary row */}
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', mb: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: 13,
            fontWeight: 500,
            border: `1px solid ${palette.outlineVariant}`,
            backgroundColor: '#fff',
            color: palette.onSurface,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{reservationSummary.total}</Typography>
          Total
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: 13,
            fontWeight: 500,
            border: `1px solid ${palette.successContainer}`,
            backgroundColor: palette.successContainer,
            color: palette.success,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{reservationSummary.confirmed}</Typography>
          Confirmadas
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: 13,
            fontWeight: 500,
            border: `1px solid ${palette.warningContainer}`,
            backgroundColor: palette.warningContainer,
            color: palette.warning,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{reservationSummary.pending}</Typography>
          Pendientes
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: 13,
            fontWeight: 500,
            border: `1px solid ${palette.errorContainer}`,
            backgroundColor: palette.errorContainer,
            color: palette.error,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{reservationSummary.cancelled}</Typography>
          Canceladas
        </Box>
        <Typography sx={{ marginLeft: 'auto', fontSize: 13, color: palette.onSurfaceVariant }}>
          Mostrando 1–{hotelReservations.length} de {reservationSummary.total} reservas
        </Typography>
      </Box>

      {/* Table card */}
      <Box
        sx={{
          backgroundColor: '#fff',
          border: `1px solid ${palette.outlineVariant}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              {['Codigo', 'Huesped', 'Habitacion', 'Llegada', 'Salida', 'Noches', 'Total', 'Estado', 'Acciones'].map(
                (col) => (
                  <Box
                    component="th"
                    key={col}
                    sx={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.onSurfaceVariant,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      backgroundColor: palette.background,
                      borderBottom: `1px solid ${palette.outlineVariant}`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col}
                  </Box>
                )
              )}
            </Box>
          </Box>
          <Box component="tbody">
            {hotelReservations.map((res, index) => (
              <Box
                component="tr"
                key={res.id}
                sx={{
                  '&:hover td': { backgroundColor: '#fafffe', cursor: 'pointer' },
                }}
              >
                {/* Code */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    fontSize: 14,
                    color: palette.onSurface,
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: palette.onSurfaceVariant,
                      backgroundColor: palette.background,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-block',
                    }}
                  >
                    {res.id}
                  </Box>
                </Box>

                {/* Guest */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: avatarColorMap[res.avatarColor],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 600,
                        color: palette.primary,
                        flexShrink: 0,
                      }}
                    >
                      {res.initials}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
                        {res.guest}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                        {res.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Room */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
                    {res.room}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    {res.roomType}
                  </Typography>
                </Box>

                {/* Check-in */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    fontSize: 14,
                    color: palette.onSurface,
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  {res.checkIn}
                </Box>

                {/* Check-out */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    fontSize: 14,
                    color: palette.onSurface,
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  {res.checkOut}
                </Box>

                {/* Nights */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                    {res.nights} noches
                  </Typography>
                </Box>

                {/* Total */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.primary }}>
                    {res.total}
                  </Typography>
                </Box>

                {/* Status */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <StatusChip status={res.status} />
                </Box>

                {/* Actions */}
                <Box
                  component="td"
                  sx={{
                    padding: '14px 16px',
                    borderBottom:
                      index < hotelReservations.length - 1
                        ? `1px solid ${palette.outlineVariant}`
                        : 'none',
                    verticalAlign: 'middle',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    {res.status === 'pending' ? (
                      <>
                        <Button
                          size="small"
                          disableElevation
                          sx={{
                            height: 32,
                            padding: '0 14px',
                            borderRadius: '100px',
                            fontSize: 12,
                            fontWeight: 500,
                            textTransform: 'none',
                            backgroundColor: palette.successContainer,
                            color: palette.success,
                            '&:hover': { backgroundColor: palette.successContainer },
                          }}
                        >
                          Confirmar
                        </Button>
                        <Button
                          size="small"
                          disableElevation
                          sx={{
                            height: 32,
                            padding: '0 14px',
                            borderRadius: '100px',
                            fontSize: 12,
                            fontWeight: 500,
                            textTransform: 'none',
                            backgroundColor: palette.errorContainer,
                            color: palette.error,
                            '&:hover': { backgroundColor: palette.errorContainer },
                          }}
                        >
                          Rechazar
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="small"
                        disableElevation
                        sx={{
                          height: 32,
                          padding: '0 14px',
                          borderRadius: '100px',
                          fontSize: 12,
                          fontWeight: 500,
                          textTransform: 'none',
                          backgroundColor: palette.background,
                          color: palette.primary,
                          '&:hover': { backgroundColor: palette.background },
                        }}
                      >
                        Ver detalle
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderTop: `1px solid ${palette.outlineVariant}`,
          }}
        >
          <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
            Mostrando 1–{hotelReservations.length} de {reservationSummary.total} reservas
          </Typography>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                border: `1px solid ${palette.outlineVariant}`,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </Box>
            {[1, 2, 3, 4, 5].map((page) => (
              <Box
                key={page}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  border: `1px solid ${page === 1 ? palette.primary : palette.outlineVariant}`,
                  backgroundColor: page === 1 ? palette.primary : '#fff',
                  color: page === 1 ? '#fff' : palette.onSurfaceVariant,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: page === 1 ? 600 : 400,
                }}
              >
                {page}
              </Box>
            ))}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                border: `1px solid ${palette.outlineVariant}`,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
