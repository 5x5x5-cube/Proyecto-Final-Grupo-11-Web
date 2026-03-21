import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { palette } from '../../design-system/theme/palette';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: palette.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Roboto', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: 'fixed',
          width: 220,
          height: 220,
          backgroundColor: palette.primary,
          borderRadius: '12px',
          opacity: 0.18,
          top: -60,
          left: -60,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          width: 140,
          height: 140,
          backgroundColor: palette.primary,
          borderRadius: '50%',
          opacity: 0.18,
          bottom: 80,
          right: 120,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          width: 80,
          height: 80,
          backgroundColor: palette.secondary,
          borderRadius: '12px',
          opacity: 0.18,
          top: 120,
          right: 300,
        }}
      />

      {/* Login wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Brand */}
        <Typography
          sx={{
            fontSize: 57,
            letterSpacing: '-0.25px',
            lineHeight: '64px',
            color: palette.onSurface,
          }}
        >
          <Box component="span" sx={{ fontWeight: 300 }}>
            Travel
          </Box>
          <Box component="span" sx={{ fontWeight: 800 }}>
            Hub
          </Box>
        </Typography>

        {/* Card */}
        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '12px',
            padding: '40px 32px',
            width: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Card title */}
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 500,
              color: palette.onSurface,
              mb: '16px',
            }}
          >
            Iniciar sesion
          </Typography>

          {/* Email field */}
          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Correo electronico"
              placeholder="ejemplo@correo.com"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '4px',
                  fontSize: 16,
                  letterSpacing: '0.5px',
                  color: palette.onSurface,
                  '& fieldset': {
                    borderColor: palette.outline,
                  },
                  '&:hover fieldset': {
                    borderColor: palette.outline,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  fontWeight: 400,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': {
                  fontSize: 12,
                  color: palette.outline,
                },
                '& input::placeholder': {
                  color: palette.onSurfaceVariant,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Password field */}
          <Box sx={{ mb: '16px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contrasena"
              placeholder="Ingresa tu contrasena"
              type="password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: '4px',
                  fontSize: 16,
                  letterSpacing: '0.5px',
                  color: palette.onSurface,
                  '& fieldset': {
                    borderColor: palette.outline,
                  },
                  '&:hover fieldset': {
                    borderColor: palette.outline,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: 12,
                  fontWeight: 400,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                },
                '& .MuiInputLabel-shrink': {
                  fontSize: 12,
                  color: palette.outline,
                },
                '& input::placeholder': {
                  color: palette.onSurfaceVariant,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Iniciar sesion button */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => navigate('/')}
            sx={{
              height: 48,
              backgroundColor: palette.primary,
              color: palette.onPrimary,
              borderRadius: '100px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.1px',
              textTransform: 'none',
              mt: '8px',
              '&:hover': {
                backgroundColor: palette.primary,
              },
            }}
          >
            Iniciar sesion
          </Button>

          {/* Footer link */}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 14,
              color: palette.onSurfaceVariant,
              mt: '8px',
            }}
          >
            No tienes cuenta?{' '}
            <Link
              to="/"
              style={{
                color: palette.primary,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Registrate
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
