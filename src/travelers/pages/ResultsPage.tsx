import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import TravelerNav from '../../design-system/layouts/TravelerNav';
import AmenityTag from '../../design-system/components/AmenityTag';
import RatingBadge from '../../design-system/components/RatingBadge';
import { palette } from '../../design-system/theme/palette';
import { mockHotels } from '../data/mockHotels';

const propertyTypes = ['Hotel', 'Hostal', 'Apartamento', 'Resort', 'Cabana'];
const starOptions = [
  { label: '5', value: 5, selected: false },
  { label: '4+', value: 4, selected: true },
  { label: '3+', value: 3, selected: false },
  { label: 'Todos', value: 0, selected: false },
];
const amenitiesFilter = [
  { label: 'Wi-Fi gratuito', checked: true },
  { label: 'Desayuno incluido', checked: true },
  { label: 'Piscina', checked: false },
  { label: 'Estacionamiento', checked: false },
  { label: 'Mascotas permitidas', checked: false },
  { label: 'Aire acondicionado', checked: false },
];

const FilterSidebar = () => (
  <Box
    sx={{
      width: 280,
      minWidth: 280,
      maxWidth: 280,
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      borderRight: `1px solid ${palette.outlineVariant}`,
      padding: '20px',
      overflowY: 'auto',
      overflowX: 'hidden',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      maxHeight: 'calc(100vh - 72px)',
      position: 'sticky',
      top: 0,
    }}
  >
    <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface }}>
      Filtros
    </Typography>

    {/* Price range */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: palette.onSurfaceVariant,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Precio por noche
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>Minimo</Typography>
        <Box
          component="input"
          defaultValue="COP 0"
          sx={{
            width: '100%',
            height: 44,
            border: `1px solid ${palette.outline}`,
            borderRadius: '8px',
            padding: '0 12px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            color: palette.onSurface,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>Maximo</Typography>
        <Box
          component="input"
          defaultValue="COP 800.000"
          sx={{
            width: '100%',
            height: 44,
            border: `1px solid ${palette.outline}`,
            borderRadius: '8px',
            padding: '0 12px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            color: palette.onSurface,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </Box>
    </Box>

    {/* Property type */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: palette.onSurfaceVariant,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Tipo de alojamiento
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {propertyTypes.map((type, i) => (
          <Box
            key={type}
            sx={{
              height: 32,
              px: '16px',
              border: `1px solid ${i === 0 ? palette.primaryContainer : palette.outlineVariant}`,
              borderRadius: '8px',
              fontSize: 13,
              fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? palette.onPrimaryContainer : palette.onSurfaceVariant,
              backgroundColor: i === 0 ? palette.primaryContainer : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {type}
          </Box>
        ))}
      </Box>
    </Box>

    {/* Star rating */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: palette.onSurfaceVariant,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Calificacion
      </Typography>
      <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {starOptions.map((opt) => (
          <Box
            key={opt.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              border: `1px solid ${opt.selected ? palette.primaryContainer : palette.outlineVariant}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: 13,
              color: opt.selected ? palette.onPrimaryContainer : palette.onSurfaceVariant,
              backgroundColor: opt.selected ? palette.primaryContainer : 'transparent',
              fontWeight: opt.selected ? 500 : 400,
            }}
          >
            {opt.value > 0 && <StarIcon sx={{ color: palette.star, fontSize: 14 }} />}
            {opt.label}
          </Box>
        ))}
      </Box>
    </Box>

    {/* Amenities */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: palette.onSurfaceVariant,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Servicios
      </Typography>
      {amenitiesFilter.map((amenity) => (
        <FormControlLabel
          key={amenity.label}
          control={
            <Checkbox
              defaultChecked={amenity.checked}
              sx={{
                color: palette.outline,
                '&.Mui-checked': { color: palette.primary },
                padding: '0 10px 0 0',
              }}
              size="small"
            />
          }
          label={amenity.label}
          sx={{
            ml: 0,
            '& .MuiFormControlLabel-label': {
              fontSize: 14,
              color: palette.onSurface,
            },
          }}
        />
      ))}
    </Box>
  </Box>
);

export default function ResultsPage() {
  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: palette.background,
        fontFamily: "'Roboto', sans-serif",
        overflow: 'hidden',
      }}
    >
      <TravelerNav variant="results" searchSummary="Cartagena · 15 mar -- 20 mar · 2 huespedes" />

      {/* PAGE BODY */}
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 72px)', mt: '72px', overflow: 'hidden', maxWidth: '100vw' }}>
        {/* SIDEBAR FILTERS */}
        <FilterSidebar />

        {/* RESULTS AREA */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            padding: '24px 32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Results header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <Typography sx={{ fontSize: 16, color: palette.onSurface, minWidth: 0 }} noWrap>
              <Box component="span" sx={{ fontWeight: 600 }}>
                247 alojamientos
              </Box>{' '}
              encontrados en Cartagena · 15--20 mar · 2 huespedes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
                Ordenar por
              </Typography>
              <Box
                component="select"
                defaultValue="Recomendados"
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 14,
                  color: palette.onSurface,
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option>Recomendados</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Calificacion</option>
                <option>Popularidad</option>
              </Box>
            </Box>
          </Box>

          {/* Hotel cards */}
          {mockHotels.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/property/${hotel.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '16px',
                  display: 'flex',
                  overflow: 'hidden',
                  height: 180,
                  cursor: 'pointer',
                  '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
                }}
              >
                {/* Image area */}
                <Box
                  sx={{
                    width: 240,
                    flexShrink: 0,
                    background: hotel.gradient,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: '100px',
                    }}
                  >
                    {hotel.photoCount} fotos
                  </Box>
                </Box>

                {/* Info section */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: palette.primary,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {hotel.type}
                  </Typography>
                  <Typography sx={{ fontSize: 17, fontWeight: 600, color: palette.onSurface }}>
                    {hotel.name}
                  </Typography>
                  <Box
                    sx={{
                      fontSize: 13,
                      color: palette.onSurfaceVariant,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <PlaceIcon sx={{ fontSize: 14 }} />
                    {hotel.location}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      mt: '4px',
                    }}
                  >
                    <RatingBadge rating={hotel.rating} />
                    <Typography sx={{ color: palette.star, fontSize: 14, letterSpacing: '1px' }}>
                      {hotel.starsText}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                      ({hotel.reviewCount} resenas)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '8px',
                      mt: '4px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {hotel.amenities.map((amenity) => (
                      <AmenityTag key={amenity.label} icon={amenity.icon} label={amenity.label} />
                    ))}
                  </Box>
                </Box>

                {/* Price column */}
                <Box
                  sx={{
                    width: 200,
                    flexShrink: 0,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    borderLeft: `1px solid ${palette.outlineVariant}`,
                  }}
                >
                  <Typography
                    sx={{ fontSize: 11, color: palette.onSurfaceVariant, textAlign: 'right' }}
                  >
                    desde
                  </Typography>
                  <Box>
                    <Typography sx={{ fontSize: 26, fontWeight: 700, color: palette.primary }}>
                      {hotel.pricePerNightDisplay}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, color: palette.onSurfaceVariant, textAlign: 'right' }}
                    >
                      por noche
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    {hotel.totalPriceDisplay}
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      width: '100%',
                      height: 40,
                      backgroundColor: palette.primary,
                      borderRadius: '100px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: palette.primary },
                    }}
                  >
                    Ver habitaciones
                  </Button>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
