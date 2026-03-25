import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileShell from '../components/MobileShell';
import InfoGrid from '../../design-system/components/InfoGrid';
import PriceBreakdown from '../../design-system/components/PriceBreakdown';
import { palette } from '../../design-system/theme/palette';
import { mockHotels } from '../../travelers/data/mockHotels';

const hotel = mockHotels[0];

export default function MobileReservationSummaryPage() {
  return (
    <MobileShell hideNav>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          borderBottom: `1px solid ${palette.outlineVariant}`,
          background: '#fff',
        }}
      >
        <Box component={Link} to={`/mobile/property/${hotel.id}`} sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          Resumen de reserva
        </Typography>
      </Box>

      <Box sx={{ px: '16px', pt: '16px', pb: '90px' }}>
        {/* Hotel Card */}
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '12px',
            mb: '20px',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '10px',
              background: hotel.gradient,
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>{hotel.name}</Typography>
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>{hotel.location}</Typography>
            <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mt: '2px' }}>
              Habitacion Superior · 1 cama King
            </Typography>
          </Box>
        </Box>

        {/* Info Grid */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <InfoGrid
            columns={2}
            items={[
              { label: 'Check-in', value: 'Sab, 15 mar', sub: '15:00' },
              { label: 'Check-out', value: 'Jue, 20 mar', sub: '12:00' },
              { label: 'Duracion', value: '5 noches' },
              { label: 'Huespedes', value: '2 adultos' },
            ]}
          />
        </Box>

        {/* Price Breakdown */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            Detalle del precio
          </Typography>
          <PriceBreakdown
            rows={[
              { label: 'COP 480k × 5 noches', value: 'COP 2.400.000' },
              { label: 'Impuestos (11%)', value: 'COP 264.000' },
            ]}
            totalLabel="Total"
            totalValue="COP 2.664.000"
          />
        </Box>

        {/* Cancellation Policy */}
        <Box sx={{ background: palette.successContainer, borderRadius: '12px', p: '14px', mb: '16px' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.success, mb: '4px' }}>
            Cancelacion gratuita
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.success, lineHeight: 1.5 }}>
            Cancelacion gratuita hasta 48 horas antes del check-in. Despues se cobra el 50% de la primera noche.
          </Typography>
        </Box>
      </Box>

      {/* Sticky Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: `1px solid ${palette.outlineVariant}`,
          px: '16px',
          py: '12px',
        }}
      >
        <Box
          component={Link}
          to="/mobile/checkout/payment"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: palette.primary,
            color: '#fff',
            borderRadius: '12px',
            py: '14px',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
            width: '100%',
          }}
        >
          Continuar al pago
        </Box>
      </Box>
    </MobileShell>
  );
}
