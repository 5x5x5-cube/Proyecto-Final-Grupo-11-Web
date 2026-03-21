import { Box, Typography, Button } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import CheckoutLayout from '../../design-system/layouts/CheckoutLayout';
import SectionCard from '../../design-system/components/SectionCard';
import { palette } from '../../design-system/theme/palette';

const PaymentSidebar = ({ onPay }: { onPay: () => void }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
      Resumen de reserva
    </Typography>

    {/* Booking mini card */}
    <Box
      sx={{
        backgroundColor: palette.background,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #003740, #006874)',
          flexShrink: 0,
        }}
      />
      <Box>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface, mb: '4px' }}
        >
          Hotel Santa Clara Sofitel
        </Typography>
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '2px' }}>
          15 mar -- 20 mar 2026 · 5 noches
        </Typography>
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
          Habitacion Superior · 2 adultos
        </Typography>
      </Box>
    </Box>

    {/* Price breakdown */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
          COP 480.000 x 5 noches
        </Typography>
        <Typography sx={{ fontSize: 14, color: palette.onSurface }}>COP 2.400.000</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
          Impuestos y tasas
        </Typography>
        <Typography sx={{ fontSize: 14, color: palette.onSurface }}>COP 264.000</Typography>
      </Box>
      <Box sx={{ height: 1, backgroundColor: palette.outlineVariant }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          Total a pagar
        </Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 700, color: palette.primary }}>
          COP 2.664.000
        </Typography>
      </Box>
    </Box>

    {/* Pay button */}
    <Button
      variant="contained"
      disableElevation
      fullWidth
      onClick={onPay}
      sx={{
        height: 56,
        backgroundColor: palette.primary,
        borderRadius: '100px',
        fontFamily: "'Roboto', sans-serif",
        fontSize: 16,
        fontWeight: 600,
        color: '#fff',
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        '&:hover': { backgroundColor: palette.primary },
      }}
    >
      <LockIcon sx={{ fontSize: 20 }} />
      Pagar COP 2.664.000
    </Button>

    {/* Secure note */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
      <VerifiedUserIcon sx={{ fontSize: 15, color: palette.primary }} />
      <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
        Transaccion protegida con cifrado SSL
      </Typography>
    </Box>

  </Box>
);

export default function PaymentPage() {
  const navigate = useNavigate();

  return (
    <CheckoutLayout currentStep={3} sidebar={<PaymentSidebar onPay={() => navigate('/checkout/confirmation')} />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <SectionCard
          icon={<PaymentsIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title="Metodo de pago"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Payment method tabs */}
            <Box sx={{ display: 'flex', gap: '12px' }}>
              {/* Tarjeta - active */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.primary}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f0fbfc',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>💳</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.primary }}>
                  Tarjeta
                </Typography>
              </Box>
              {/* Billetera digital */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>📱</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurfaceVariant }}>
                  Billetera digital
                </Typography>
              </Box>
              {/* Transferencia */}
              <Box
                sx={{
                  flex: 1,
                  padding: '16px',
                  border: `2px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography sx={{ fontSize: 28 }}>🏦</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: palette.onSurfaceVariant }}>
                  Transferencia
                </Typography>
              </Box>
            </Box>

            {/* Card preview */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #003740 0%, #006874 60%, #4A9FAA 100%)',
                borderRadius: '16px',
                padding: '24px',
                width: 340,
                height: 200,
                mx: 'auto',
                aspectRatio: '1.586 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 28,
                    background: 'linear-gradient(135deg, #C89030, #F4A020)',
                    borderRadius: '4px',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.9)',
                    fontStyle: 'italic',
                  }}
                >
                  VISA
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '3px',
                }}
              >
                •••• •••• •••• 4242
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.5px',
                      mb: '2px',
                    }}
                  >
                    TITULAR
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
                    CARLOS MARTINEZ
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.5px',
                      mb: '2px',
                      textAlign: 'right',
                    }}
                  >
                    VENCE
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
                    12/28
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Card form */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card number */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.onSurfaceVariant,
                    mb: '6px',
                    letterSpacing: '0.4px',
                  }}
                >
                  Numero de tarjeta
                </Typography>
                <Box
                  component="input"
                  defaultValue="•••• •••• •••• 4242"
                  placeholder="1234 5678 9012 3456"
                  sx={{
                    width: '100%',
                    height: 52,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 15,
                    color: palette.onSurface,
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    '&:focus': { borderColor: palette.primary },
                  }}
                />
              </Box>

              {/* Card holder name */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: palette.onSurfaceVariant,
                    mb: '6px',
                    letterSpacing: '0.4px',
                  }}
                >
                  Nombre del titular
                </Typography>
                <Box
                  component="input"
                  defaultValue="Carlos Martinez"
                  sx={{
                    width: '100%',
                    height: 52,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 15,
                    color: palette.onSurface,
                    backgroundColor: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    '&:focus': { borderColor: palette.primary },
                  }}
                />
              </Box>

              {/* Row: Expiry, CVV, Currency */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    Fecha de vencimiento
                  </Typography>
                  <Box
                    component="input"
                    defaultValue="12/28"
                    placeholder="MM/AA"
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      '&:focus': { borderColor: palette.primary },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    CVV
                  </Typography>
                  <Box
                    component="input"
                    defaultValue="•••"
                    placeholder="•••"
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      '&:focus': { borderColor: palette.primary },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: palette.onSurfaceVariant,
                      mb: '6px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    Moneda
                  </Typography>
                  <Box
                    component="select"
                    defaultValue="COP – Peso colombiano"
                    sx={{
                      width: '100%',
                      height: 52,
                      border: `1px solid ${palette.outline}`,
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 15,
                      color: palette.onSurface,
                      backgroundColor: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option>COP -- Peso colombiano</option>
                    <option>USD -- Dolar americano</option>
                    <option>MXN -- Peso mexicano</option>
                    <option>ARS -- Peso argentino</option>
                    <option>CLP -- Peso chileno</option>
                    <option>PEN -- Sol peruano</option>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </SectionCard>
      </Box>
    </CheckoutLayout>
  );
}
