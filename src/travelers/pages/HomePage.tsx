import { Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import TravelerNav from '../../design-system/layouts/TravelerNav';
import { palette } from '../../design-system/theme/palette';
import { mockDestinations } from '../data/mockDestinations';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: palette.background,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <TravelerNav variant="home" />

      {/* HERO */}
      <Box
        sx={{
          mt: '72px',
          height: 560,
          position: 'relative',
          background: 'linear-gradient(135deg, #003740 0%, #006874 45%, #4A6267 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            top: -120,
            right: -80,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.04)',
            bottom: -80,
            left: 60,
          },
        }}
      >
        {/* Eyebrow */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '1.5px',
            color: palette.primaryContainer,
            textTransform: 'uppercase',
          }}
        >
          6 paises · Hoteles y hospedajes
        </Typography>

        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontSize: 57,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.25px',
            maxWidth: 720,
          }}
        >
          Tu proxima aventura comienza aqui
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            maxWidth: 560,
            lineHeight: 1.5,
          }}
        >
          Reserva hoteles y hostales en Colombia, Peru, Ecuador, Mexico, Chile y Argentina.
        </Typography>

        {/* Search card */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 32px rgba(0,104,116,0.18)',
            p: '8px',
            display: 'flex',
            alignItems: 'stretch',
            width: 880,
            maxWidth: '90%',
            mt: '16px',
          }}
        >
          {/* Destino */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              Destino
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400, color: palette.outline }}>
              Ciudad o hotel
            </Typography>
          </Box>

          {/* Llegada */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              Llegada
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400, color: palette.outline }}>
              Selecciona fecha
            </Typography>
          </Box>

          {/* Salida */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              Salida
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400, color: palette.outline }}>
              Selecciona fecha
            </Typography>
          </Box>

          {/* Huespedes */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              Huespedes
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 400, color: palette.outline }}>
              1 adulto
            </Typography>
          </Box>

          {/* Buscar button */}
          <Button
            variant="contained"
            disableElevation
            startIcon={<SearchIcon sx={{ fontSize: '20px !important' }} />}
            onClick={() => navigate('/results')}
            sx={{
              minWidth: 120,
              backgroundColor: palette.primary,
              borderRadius: '12px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: '#ffffff',
              textTransform: 'none',
              letterSpacing: '0.1px',
              px: '24px',
              flexShrink: 0,
              '&:hover': {
                backgroundColor: palette.primary,
              },
            }}
          >
            Buscar
          </Button>
        </Box>
      </Box>

      {/* POPULAR DESTINATIONS */}
      <Box sx={{ padding: '40px 48px 0' }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: palette.onSurface,
            mb: '20px',
          }}
        >
          Destinos populares
        </Typography>

        <Box sx={{ display: 'flex', gap: '16px' }}>
          {mockDestinations.map((dest) => (
            <Box
              key={dest.name}
              onClick={() => navigate('/results')}
              sx={{
                flex: 1,
                height: 164,
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Gradient background */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: dest.gradient,
                }}
              />
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  {dest.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {dest.country} - {dest.hotelCount} hoteles
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
