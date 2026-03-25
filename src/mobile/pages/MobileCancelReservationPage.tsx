import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MobileShell from '../components/MobileShell';
import { palette } from '../../design-system/theme/palette';
import { mockReservations } from '../../travelers/data/mockReservations';

export default function MobileCancelReservationPage() {
  const { id } = useParams();
  const reservation = mockReservations.find((r) => r.id === Number(id)) || mockReservations[0];

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
          background: '#fff',
          borderBottom: `1px solid ${palette.outlineVariant}`,
        }}
      >
        <Box component={Link} to={`/mobile/reservations/${reservation.id}`} sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          Cancelar reserva
        </Typography>
      </Box>

      <Box sx={{ px: '16px', pt: '24px', pb: '24px' }}>
        {/* Warning Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '16px' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: palette.errorContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WarningAmberIcon sx={{ fontSize: 32, color: palette.error }} />
          </Box>
        </Box>

        <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface, textAlign: 'center', mb: '4px' }}>
          Cancelar reserva
        </Typography>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center', mb: '24px' }}>
          {reservation.code}
        </Typography>

        {/* Cancellation Policy */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '16px',
            mb: '14px',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface, mb: '8px' }}>
            Politica de cancelacion
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, lineHeight: 1.6 }}>
            Al cancelar con mas de 48 horas de anticipacion, recibiras un reembolso del 100%.
            Cancelaciones tardias reciben el 50% de reembolso.
          </Typography>
        </Box>

        {/* Refund Breakdown */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '16px',
            mb: '14px',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface, mb: '10px' }}>
            Detalle del reembolso
          </Typography>
          <Row label="Monto pagado" value={reservation.totalPrice} />
          <Row label="Reembolso (100%)" value={reservation.totalPrice} highlight />
          <Box
            sx={{
              borderTop: `1px solid ${palette.outlineVariant}`,
              mt: '8px',
              pt: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.success }}>Total reembolso</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.success }}>
              {reservation.totalPrice}
            </Typography>
          </Box>
        </Box>

        {/* Refund Method */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '16px',
            mb: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <CreditCardIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurface }}>VISA ****4242</Typography>
            <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>Reembolso en 5-10 dias habiles</Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box
            component={Link}
            to={`/mobile/reservations/${reservation.id}`}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1.5px solid ${palette.outlineVariant}`,
              color: palette.onSurface,
              borderRadius: '12px',
              py: '13px',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Volver
          </Box>
          <Box
            component={Link}
            to="/mobile/reservations"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: palette.error,
              color: '#fff',
              borderRadius: '12px',
              py: '14px',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Confirmar
          </Box>
        </Box>
      </Box>
    </MobileShell>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '6px' }}>
      <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>{label}</Typography>
      <Typography sx={{ fontSize: 12, fontWeight: highlight ? 600 : 400, color: highlight ? palette.success : palette.onSurface }}>
        {value}
      </Typography>
    </Box>
  );
}
