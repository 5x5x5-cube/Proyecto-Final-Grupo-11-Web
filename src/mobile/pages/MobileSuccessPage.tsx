import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MobileShell from '../components/MobileShell';
import { palette } from '../../design-system/theme/palette';

export default function MobileSuccessPage() {
  return (
    <MobileShell hideNav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: '24px',
          pt: '48px',
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: palette.successContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '20px',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 40, color: palette.success }} />
        </Box>

        <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.onSurface, textAlign: 'center', mb: '8px' }}>
          Reserva creada exitosamente
        </Typography>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center', mb: '24px' }}>
          Hemos enviado la confirmacion a tu correo electronico
        </Typography>

        {/* Reservation Code */}
        <Box
          sx={{
            background: palette.primaryContainer,
            borderRadius: '12px',
            px: '20px',
            py: '10px',
            mb: '24px',
          }}
        >
          <Typography sx={{ fontSize: 11, color: palette.primary, fontWeight: 600, textAlign: 'center', mb: '2px' }}>
            CODIGO DE RESERVA
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onPrimaryContainer, textAlign: 'center' }}>
            TH-2026-48291
          </Typography>
        </Box>

        {/* Summary Card */}
        <Box
          sx={{
            width: '100%',
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '16px',
            mb: '32px',
          }}
        >
          <Row label="Hotel" value="Hotel Santa Clara Sofitel" />
          <Row label="Fechas" value="15 - 20 mar 2026" />
          <Row label="Habitacion" value="Superior · 1 cama King" />
          <Row label="Huespedes" value="2 adultos" />
          <Box
            sx={{
              borderTop: `1px solid ${palette.outlineVariant}`,
              mt: '12px',
              pt: '12px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: palette.onSurface }}>Total</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: palette.primary }}>COP 2.664.000</Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box
          component={Link}
          to="/mobile/reservations"
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
            mb: '12px',
          }}
        >
          Ver mis reservas
        </Box>
        <Box
          component={Link}
          to="/mobile/search"
          sx={{
            fontSize: 14,
            color: palette.primary,
            textDecoration: 'none',
            fontWeight: 500,
            pb: '24px',
          }}
        >
          Volver al inicio
        </Box>
      </Box>
    </MobileShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
      <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>{label}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurface }}>{value}</Typography>
    </Box>
  );
}
