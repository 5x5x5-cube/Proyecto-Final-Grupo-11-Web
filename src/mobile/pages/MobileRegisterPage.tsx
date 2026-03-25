import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MobileShell from '../components/MobileShell';
import Brand from '../../design-system/components/Brand';
import { palette } from '../../design-system/theme/palette';

export default function MobileRegisterPage() {
  return (
    <MobileShell hideNav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: '24px',
          pt: '36px',
        }}
      >
        {/* Brand */}
        <Box sx={{ mb: '8px' }}>
          <Brand size={28} variant="nav" />
        </Box>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, mb: '32px' }}>
          Crea tu cuenta para comenzar a reservar
        </Typography>

        {/* Register Card */}
        <Box
          sx={{
            width: '100%',
            background: '#fff',
            borderRadius: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '24px',
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface, mb: '20px' }}>
            Crear cuenta
          </Typography>

          {/* Nombre completo */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              Nombre completo
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                Juan Perez
              </Typography>
            </Box>
          </Box>

          {/* Email */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              Correo electronico
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <EmailOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                viajero@email.com
              </Typography>
            </Box>
          </Box>

          {/* Telefono */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              Telefono
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                +57 300 123 4567
              </Typography>
            </Box>
          </Box>

          {/* Contrasena */}
          <Box sx={{ mb: '14px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              Contrasena
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                ••••••••
              </Typography>
            </Box>
          </Box>

          {/* Confirmar contrasena */}
          <Box sx={{ mb: '24px' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurfaceVariant, mb: '6px' }}>
              Confirmar contrasena
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${palette.outlineVariant}`,
                borderRadius: '10px',
                px: '12px',
                py: '12px',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                ••••••••
              </Typography>
            </Box>
          </Box>

          {/* Register Button */}
          <Box
            component={Link}
            to="/mobile/login"
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
              mb: '16px',
            }}
          >
            Crear cuenta
          </Box>

          <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/mobile/login" style={{ color: palette.primary, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              Inicia sesion
            </Link>
          </Typography>
        </Box>
      </Box>
    </MobileShell>
  );
}
