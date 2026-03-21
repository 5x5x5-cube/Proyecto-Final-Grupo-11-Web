import { Box, Typography, Button, Divider, Icon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PolicyIcon from '@mui/icons-material/Policy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KingBedIcon from '@mui/icons-material/KingBed';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import SectionCard from '../../design-system/components/SectionCard';
import InfoGrid from '../../design-system/components/InfoGrid';
import { palette } from '../../design-system/theme/palette';

const breadcrumbs = [
  { label: 'Dashboard', href: '/hotel/dashboard' },
  { label: 'Reservas', href: '/hotel/reservations' },
  { label: 'TH-2026-00483' },
];

export default function HotelReservationDetailPage() {
  return (
    <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
      {/* Page header card */}
      <Box
        sx={{
          backgroundColor: palette.surface,
          borderRadius: '16px',
          padding: '20px 24px',
          border: `1px solid ${palette.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Booking code badge */}
          <Box
            sx={{
              backgroundColor: palette.primaryContainer,
              color: palette.primary,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '8px 16px',
              borderRadius: '10px',
            }}
          >
            TH-2026-00483
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.onSurface }}>
              Reserva de Carlos Mendoza
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13, color: palette.onSurfaceVariant }}>
              <Icon sx={{ fontSize: 14 }}>calendar_today</Icon>
              Recibida el 24 feb 2026, 10:32 am
              <Box component="span" sx={{ mx: '4px' }}>&middot;</Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  backgroundColor: palette.warningContainer,
                  color: palette.warning,
                }}
              >
                <Icon sx={{ fontSize: 14 }}>schedule</Icon>
                Pendiente de confirmacion
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
            sx={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: `1px solid ${palette.error}`,
              backgroundColor: palette.errorContainer,
              color: palette.error,
              fontFamily: "'Roboto', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { backgroundColor: palette.errorContainer, border: `1px solid ${palette.error}` },
            }}
          >
            Rechazar
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            disableElevation
            sx={{
              padding: '10px 24px',
              borderRadius: '100px',
              backgroundColor: palette.primary,
              color: '#fff',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { backgroundColor: palette.primary },
            }}
          >
            Confirmar reserva
          </Button>
        </Box>
      </Box>

      {/* Content grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Guest info card */}
          <SectionCard icon={<PersonIcon sx={{ fontSize: 18, color: palette.primary }} />} title="Informacion del huesped">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${palette.primaryContainer}, ${palette.secondaryContainer})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PersonIcon sx={{ fontSize: 28, color: palette.primary }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.onSurface }}>
                  Carlos Andres Mendoza Lopez
                </Typography>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '6px' }}>
                  Colombia · CC 1020303040
                </Typography>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12, color: palette.onSurfaceVariant }}>
                    <EmailIcon sx={{ fontSize: 14, color: palette.primary }} />
                    carlos.mendoza@email.com
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12, color: palette.onSurfaceVariant }}>
                    <PhoneIcon sx={{ fontSize: 14, color: palette.primary }} />
                    +57 310 456 7890
                  </Box>
                </Box>
              </Box>
            </Box>
          </SectionCard>

          {/* Booking details card */}
          <SectionCard icon={<EventAvailableIcon sx={{ fontSize: 18, color: palette.primary }} />} title="Detalle de la reserva">
            <InfoGrid
              columns={4}
              items={[
                { label: 'Check-in', value: 'Mar 15, 2026', sub: 'Desde las 3:00 PM' },
                { label: 'Check-out', value: 'Mar 18, 2026', sub: 'Hasta las 12:00 PM' },
                { label: 'Duracion', value: '3 noches', sub: '72 horas' },
                { label: 'Huespedes', value: '2 adultos', sub: 'Sin menores' },
              ]}
            />

            <Divider sx={{ borderColor: palette.outlineVariant, my: '16px' }} />

            {/* Room info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '10px' }}>
              <Icon sx={{ fontSize: 18, color: palette.primary }}>bed</Icon>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.onSurface }}>
                Habitacion reservada
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: palette.background,
                borderRadius: '12px',
              }}
            >
              {/* Room image placeholder */}
              <Box
                sx={{
                  width: 80,
                  height: 56,
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${palette.primary} 0%, #4A6267 100%)`,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <KingBedIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }} />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>
                  Suite Deluxe King — Piso 4
                </Typography>
                <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>
                  1 cama King · Vista al mar · 45 m2
                </Typography>
                <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
                  {['WiFi', 'A/C', 'Desayuno', 'Jacuzzi', 'Cancelacion gratuita'].map((amenity) => (
                    <Box
                      key={amenity}
                      sx={{
                        fontSize: 10,
                        color: palette.onSurfaceVariant,
                        backgroundColor: palette.surfaceVariant,
                        padding: '2px 8px',
                        borderRadius: '100px',
                      }}
                    >
                      {amenity}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.primary }}>
                  COP 888.000/noche
                </Typography>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                  3 noches = COP 2.664.000
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Payment summary card */}
          <SectionCard icon={<ReceiptLongIcon sx={{ fontSize: 18, color: palette.primary }} />} title="Resumen de pago">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Habitacion (3 noches)', value: 'COP 2.664.000', color: palette.onSurface },
                { label: 'Impuestos (19% IVA)', value: 'COP 505.160', color: palette.onSurface },
                { label: 'Cargo de servicio', value: 'COP 80.000', color: palette.onSurface },
                { label: 'Descuento aplicado', value: '-COP 100.000', color: palette.success },
              ].map((row, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                    {row.label}
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: row.color }}>
                    {row.value}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: palette.onSurface, fontSize: 13 }}>
                  Total cobrado
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.primary }}>
                  COP 3.149.160
                </Typography>
              </Box>
            </Box>

            {/* Payment method */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: palette.background,
                borderRadius: '10px',
                mt: '12px',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #006874, #004F58)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCardIcon sx={{ fontSize: 16, color: '#fff' }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurface }}>
                  Visa Credito
                </Typography>
                <Typography sx={{ fontSize: 11, color: palette.outline }}>
                  **** **** **** 4821
                </Typography>
              </Box>
              <Box
                sx={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: palette.successContainer,
                  color: palette.success,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '100px',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 13 }} />
                Aprobado
              </Box>
            </Box>
          </SectionCard>

          {/* Cancellation policy card */}
          <SectionCard icon={<PolicyIcon sx={{ fontSize: 18, color: palette.primary }} />} title="Politica de cancelacion">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  Cancelacion gratuita hasta
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.success, fontSize: 12 }}>
                  Mar 12, 2026
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  Penalidad despues
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.warning, fontSize: 12 }}>
                  50% del total
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  No-show
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.error, fontSize: 12 }}>
                  100% del total
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
