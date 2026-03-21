import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BarChartIcon from '@mui/icons-material/BarChart';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';
import { palette } from '../../design-system/theme/palette';

export default function HotelLoginPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* LEFT: FORM SIDE */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 96px',
          gap: '40px',
        }}
      >
        {/* Brand */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 800,
              color: palette.primary,
              letterSpacing: '-0.5px',
            }}
          >
            <Box component="span" sx={{ fontWeight: 300 }}>Travel</Box>Hub
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: palette.primaryContainer,
              color: palette.primary,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '100px',
            }}
          >
            <HotelIcon sx={{ fontSize: 14 }} />
            Portal de Hoteles
          </Box>
        </Box>

        {/* Form */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: palette.onSurface,
              mb: '4px',
            }}
          >
            Bienvenido de vuelta
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              color: palette.onSurfaceVariant,
              mb: '16px',
            }}
          >
            Ingresa tus credenciales para acceder a tu portal de administracion.
          </Typography>

          {/* Email field */}
          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Correo electronico"
              placeholder="admin@mihotel.com"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '8px',
                  fontSize: 15,
                  color: palette.onSurface,
                  '& fieldset': { borderColor: palette.outline },
                  '&:hover fieldset': { borderColor: palette.outline },
                  '&.Mui-focused fieldset': { borderColor: palette.primary },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': { fontSize: 12, color: palette.outline },
                '& input::placeholder': { color: palette.onSurfaceVariant, opacity: 1 },
              }}
            />
          </Box>

          {/* Password field */}
          <Box sx={{ mb: '8px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contrasena"
              placeholder="••••••••"
              type="password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '8px',
                  fontSize: 15,
                  color: palette.onSurface,
                  '& fieldset': { borderColor: palette.outline },
                  '&:hover fieldset': { borderColor: palette.outline },
                  '&.Mui-focused fieldset': { borderColor: palette.primary },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': { fontSize: 12, color: palette.outline },
                '& input::placeholder': { color: palette.onSurfaceVariant, opacity: 1 },
              }}
            />
          </Box>

          {/* Forgot password */}
          <Typography
            sx={{
              textAlign: 'right',
              fontSize: 13,
              color: palette.primary,
              fontWeight: 500,
              cursor: 'pointer',
              mb: '8px',
            }}
          >
            Olvidaste tu contrasena?
          </Typography>

          {/* Login button */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => navigate('/hotel/dashboard')}
            sx={{
              height: 52,
              backgroundColor: palette.primary,
              color: '#fff',
              borderRadius: '100px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              textTransform: 'none',
              mt: '8px',
              '&:hover': { backgroundColor: palette.primary },
            }}
          >
            Iniciar sesion
          </Button>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', my: '4px' }}>
            <Divider sx={{ flex: 1, borderColor: palette.outlineVariant }} />
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, whiteSpace: 'nowrap' }}>
              Nuevo en TravelHub Hotels?
            </Typography>
            <Divider sx={{ flex: 1, borderColor: palette.outlineVariant }} />
          </Box>

          {/* Help text */}
          <Typography sx={{ textAlign: 'center', fontSize: 13, color: palette.onSurfaceVariant }}>
            Contactanos en{' '}
            <Box component="span" sx={{ color: palette.primary, fontWeight: 500, cursor: 'pointer' }}>
              partners@travelhub.com
            </Box>{' '}
            para registrar tu hotel.
          </Typography>
        </Box>

        {/* Trust badges */}
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: palette.background,
            borderRadius: '12px',
            width: '100%',
          }}
        >
          {[
            { icon: <LockIcon sx={{ fontSize: 16, color: palette.primary }} />, text: 'SSL cifrado' },
            { icon: <VerifiedUserIcon sx={{ fontSize: 16, color: palette.primary }} />, text: 'Acceso seguro' },
            { icon: <SupportAgentIcon sx={{ fontSize: 16, color: palette.primary }} />, text: 'Soporte 24/7' },
            { icon: <LanguageIcon sx={{ fontSize: 16, color: palette.primary }} />, text: '6 paises' },
          ].map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 12, color: palette.onSurfaceVariant }}>
              {item.icon}
              {item.text}
            </Box>
          ))}
        </Box>
      </Box>

      {/* RIGHT: VISUAL SIDE */}
      <Box
        sx={{
          background: 'linear-gradient(160deg, #001F24 0%, #006874 50%, #4A6267 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px',
          gap: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            top: -120,
            right: -120,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            bottom: -100,
            left: -80,
          }}
        />

        {/* Eyebrow */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '2px',
            color: palette.primaryContainer,
            textTransform: 'uppercase',
            zIndex: 1,
          }}
        >
          Panel de administracion
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontSize: 44,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 560,
            zIndex: 1,
          }}
        >
          Gestiona tu hotel con total control
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: 480,
            lineHeight: 1.6,
            zIndex: 1,
          }}
        >
          Supervisa reservas, ingresos, tarifas y descuentos desde un solo lugar. En tiempo real.
        </Typography>

        {/* Stats row */}
        <Box sx={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
          {[
            { num: '2.4k+', label: 'Hoteles registrados' },
            { num: '6', label: 'Paises' },
            { num: '98%', label: 'Satisfaccion' },
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '16px',
                padding: '20px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>
                {stat.num}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Feature list */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 480,
          }}
        >
          {[
            { icon: <DashboardIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />, text: 'Dashboard centralizado con metricas en tiempo real' },
            { icon: <EventAvailableIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />, text: 'Gestion completa de reservas: confirmar, rechazar, detalles' },
            { icon: <BarChartIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />, text: 'Reportes de ingresos mensuales con graficos descargables' },
            { icon: <SellIcon sx={{ fontSize: 18, color: palette.primaryContainer }} />, text: 'Control de tarifas y descuentos por habitacion' },
          ].map((feature, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </Box>
              <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                {feature.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
