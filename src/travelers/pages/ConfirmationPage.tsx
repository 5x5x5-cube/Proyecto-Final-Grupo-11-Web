import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckoutLayout from '../../design-system/layouts/CheckoutLayout';
import InfoGrid from '../../design-system/components/InfoGrid';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outline,
  outlineVariant,
  success,
  successContainer,
  background,
} from '../../design-system/theme/palette';

/* ─── Sidebar ─── */
const Sidebar = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <Typography sx={{ fontSize: 18, fontWeight: 700, color: onSurface }}>
      Detalle de tu reserva
    </Typography>

    {/* Hotel mini card */}
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #003740, #006874)',
          flexShrink: 0,
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 500,
            color: primary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: '4px',
          }}
        >
          Hotel &middot; 5 estrellas
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: onSurface, mb: '4px' }}>
          Hotel Santa Clara Sofitel
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
          <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
            Centro Hist&oacute;rico, Cartagena
          </Typography>
        </Box>
      </Box>
    </Box>

    <Divider sx={{ borderColor: outlineVariant }} />

    {/* Info grid */}
    <InfoGrid
      columns={2}
      items={[
        { label: 'Llegada', value: 'S\u00e1b, 15 mar 2026', sub: 'Check-in desde las 15:00' },
        { label: 'Salida', value: 'Jue, 20 mar 2026', sub: 'Check-out hasta las 12:00' },
        { label: 'Habitaci\u00f3n', value: 'Habitaci\u00f3n Superior', sub: '1 cama King \u00B7 32 m\u00B2' },
        { label: 'Hu\u00e9spedes', value: '2 adultos', sub: '5 noches' },
      ]}
    />

    <Divider sx={{ borderColor: outlineVariant }} />

    {/* Payment summary */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CreditCardIcon sx={{ fontSize: 16, color: primary }} />
          <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>VISA &bull;&bull;&bull;&bull; 4242</Typography>
        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: primary }}>COP 2.664.000</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: successContainer,
            padding: '4px 12px',
            borderRadius: '100px',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 14, color: success }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: success }}>Pago exitoso</Typography>
        </Box>
      </Box>
    </Box>

    <Divider sx={{ borderColor: outlineVariant }} />

    {/* Next steps */}
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: onSurface, mb: '12px' }}>
        Pr&oacute;ximos pasos
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          {
            num: '1',
            text: (
              <>
                Revisa tu correo para el <strong>voucher de confirmaci&oacute;n</strong> con todos los detalles.
              </>
            ),
          },
          {
            num: '2',
            text: (
              <>
                El hotel confirmar&aacute; tu reserva en las pr&oacute;ximas <strong>24 horas</strong>.
              </>
            ),
          },
          {
            num: '3',
            text: (
              <>
                Puedes gestionar tu reserva en <strong>&quot;Mis reservas&quot;</strong> en cualquier momento.
              </>
            ),
          },
        ].map((step) => (
          <Box key={step.num} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primary }}>{step.num}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: onSurfaceVariant, lineHeight: 1.4 }}>
              {step.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

/* ─── Main Content ─── */
const ConfirmationPage: React.FC = () => {
  return (
    <CheckoutLayout currentStep={4} sidebar={<Sidebar />}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '20px',
          maxWidth: 520,
          margin: '0 auto',
          height: '100%',
        }}
      >
        {/* Success icon */}
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: successContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 52, color: success }} />
        </Box>

        {/* Title */}
        <Typography sx={{ fontSize: 36, fontWeight: 700, color: onSurface }}>
          &iexcl;Reserva confirmada!
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ fontSize: 16, color: onSurfaceVariant, lineHeight: 1.6 }}>
          Tu reserva ha sido procesada exitosamente. Recibir&aacute;s todos los detalles en tu correo
          electr&oacute;nico.
        </Typography>

        {/* Booking code */}
        <Box
          sx={{
            background: '#fff',
            border: `2px solid ${primary}`,
            borderRadius: '12px',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: onSurfaceVariant,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            N&uacute;mero de reserva
          </Typography>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: primary,
              letterSpacing: '2px',
            }}
          >
            TH-2026-48291
          </Typography>
        </Box>

        {/* Email notice */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: successContainer,
            padding: '14px 20px',
            borderRadius: '100px',
          }}
        >
          <MarkEmailReadIcon sx={{ fontSize: 20, color: success }} />
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: success }}>
            Confirmaci&oacute;n enviada a carlos.martinez@email.com
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '12px', width: '100%' }}>
          <Button
            component={Link}
            to="/reservations"
            sx={{
              flex: 1,
              height: 48,
              background: primary,
              borderRadius: '100px',
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              textTransform: 'none',
              '&:hover': { background: primary, opacity: 0.9 },
            }}
          >
            Ver mis reservas
          </Button>
          <Button
            component={Link}
            to="/"
            sx={{
              flex: 1,
              height: 48,
              background: 'transparent',
              border: `1px solid ${outline}`,
              borderRadius: '100px',
              fontSize: 15,
              fontWeight: 500,
              color: primary,
              textTransform: 'none',
              '&:hover': { background: 'rgba(0,104,116,0.04)' },
            }}
          >
            Descargar comprobante
          </Button>
        </Box>
      </Box>
    </CheckoutLayout>
  );
};

export default ConfirmationPage;
