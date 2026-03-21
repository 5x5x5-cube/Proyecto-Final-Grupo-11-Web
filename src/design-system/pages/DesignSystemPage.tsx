import { useState } from 'react';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import { palette } from '../theme/palette';
import Brand from '../components/Brand';
import StatusChip from '../components/StatusChip';
import RatingBadge from '../components/RatingBadge';
import AmenityTag from '../components/AmenityTag';
import SectionCard from '../components/SectionCard';
import InfoGrid from '../components/InfoGrid';
import PriceBreakdown from '../components/PriceBreakdown';
import FilterChip from '../components/FilterChip';
import SearchField from '../components/SearchField';
import ModalOverlay from '../components/ModalOverlay';

/* ── helpers ─────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '32px',
        mb: '24px',
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface, mb: '20px' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ height: 56, backgroundColor: hex }} />
      <Box sx={{ padding: '8px 10px', backgroundColor: '#fff' }}>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurface, lineHeight: 1.3 }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mt: '2px' }}>{hex}</Typography>
      </Box>
    </Box>
  );
}

function SwatchGroup({ label, tokens }: { label: string; tokens: [string, string][] }) {
  return (
    <Box sx={{ mb: '20px' }}>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: palette.primary,
          mb: '10px',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '12px',
        }}
      >
        {tokens.map(([name, hex]) => (
          <Swatch key={name} name={name} hex={hex} />
        ))}
      </Box>
    </Box>
  );
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    height: 56,
    borderRadius: '4px',
    fontSize: 16,
    letterSpacing: '0.5px',
    color: palette.onSurface,
    '& fieldset': { borderColor: palette.outline },
    '&:hover fieldset': { borderColor: palette.outline },
    '&.Mui-focused fieldset': { borderColor: palette.primary },
  },
  '& .MuiInputLabel-root': {
    fontSize: 12,
    fontWeight: 400,
    color: palette.outline,
    letterSpacing: '0.4px',
  },
  '& .MuiInputLabel-shrink': { fontSize: 12, color: palette.outline },
  '& input::placeholder': { color: palette.onSurfaceVariant, opacity: 1 },
};

/* ── page ─────────────────────────────────────────────────── */

const amenityKeys: { icon: string; label: string }[] = [
  { icon: 'wifi', label: 'WiFi' },
  { icon: 'free_breakfast', label: 'Desayuno' },
  { icon: 'pool', label: 'Piscina' },
  { icon: 'ac_unit', label: 'A/C' },
  { icon: 'spa', label: 'Spa' },
  { icon: 'fitness_center', label: 'Gimnasio' },
  { icon: 'local_parking', label: 'Parking' },
  { icon: 'restaurant', label: 'Restaurante' },
  { icon: 'local_bar', label: 'Bar' },
  { icon: 'tv', label: 'TV' },
];

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterSelected, setFilterSelected] = useState<Record<string, boolean>>({
    price: true,
    rating: false,
    wifi: true,
    pool: false,
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: palette.background,
        py: '48px',
        px: '24px',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Page header */}
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: palette.onSurface, mb: '4px' }}>
          Design System
        </Typography>
        <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant, mb: '32px', maxWidth: 720 }}>
          Sistema de diseño de TravelHub basado en Material Design 3 (M3) de Google. Los tokens de color,
          tipografía y componentes siguen los lineamientos de M3 adaptados a la identidad visual de la
          plataforma.
        </Typography>

        {/* 1. Color Palette */}
        <Section title="Color Palette">
          <SwatchGroup
            label="Primary"
            tokens={[
              ['primary', palette.primary],
              ['onPrimary', palette.onPrimary],
              ['primaryContainer', palette.primaryContainer],
              ['onPrimaryContainer', palette.onPrimaryContainer],
            ]}
          />
          <SwatchGroup
            label="Secondary"
            tokens={[
              ['secondary', palette.secondary],
              ['secondaryContainer', palette.secondaryContainer],
            ]}
          />
          <SwatchGroup
            label="Surface"
            tokens={[
              ['surface', palette.surface],
              ['surfaceContainer', palette.surfaceContainer],
              ['surfaceContainerHigh', palette.surfaceContainerHigh],
              ['surfaceVariant', palette.surfaceVariant],
              ['onSurface', palette.onSurface],
              ['onSurfaceVariant', palette.onSurfaceVariant],
            ]}
          />
          <SwatchGroup
            label="Outline"
            tokens={[
              ['outline', palette.outline],
              ['outlineVariant', palette.outlineVariant],
            ]}
          />
          <SwatchGroup
            label="Semantic"
            tokens={[
              ['error', palette.error],
              ['errorContainer', palette.errorContainer],
              ['success', palette.success],
              ['successContainer', palette.successContainer],
              ['warning', palette.warning],
              ['warningContainer', palette.warningContainer],
            ]}
          />
          <SwatchGroup
            label="Other"
            tokens={[
              ['background', palette.background],
              ['star', palette.star],
            ]}
          />
        </Section>

        {/* 2. Typography */}
        <Section title="Typography">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '4px' }}>
                Heading — 18px / 700
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '4px' }}>
                Subheading — 16px / 600
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '4px' }}>
                Body — 14px / 400
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: palette.onSurface }}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '4px' }}>
                Caption — 12px / 400
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 400, color: palette.onSurfaceVariant }}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '4px' }}>
                Label — 11px / 500 uppercase
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: palette.onSurfaceVariant,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Box>
          </Box>
        </Section>

        {/* 3. Brand */}
        <Section title="Brand">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '8px' }}>
                variant="nav"
              </Typography>
              <Brand variant="nav" />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mb: '8px' }}>
                variant="hero"
              </Typography>
              <Brand variant="hero" />
            </Box>
          </Box>
        </Section>

        {/* 4. StatusChip */}
        <Section title="StatusChip">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <StatusChip status="confirmed" />
            <StatusChip status="pending" />
            <StatusChip status="cancelled" />
            <StatusChip status="past" />
          </Box>
        </Section>

        {/* 5. RatingBadge */}
        <Section title="RatingBadge">
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <RatingBadge rating={4.8} />
            <RatingBadge rating={3.5} />
            <RatingBadge rating={5.0} />
          </Box>
        </Section>

        {/* 6. AmenityTag */}
        <Section title="AmenityTag">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {amenityKeys.map((a) => (
              <AmenityTag key={a.icon} icon={a.icon} label={a.label} />
            ))}
          </Box>
        </Section>

        {/* 7. SectionCard */}
        <Section title="SectionCard">
          <SectionCard icon={<InfoOutlinedIcon sx={{ fontSize: 20 }} />} title="Detalles del hotel">
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
              Este es un ejemplo de contenido dentro de un SectionCard. Puede contener cualquier elemento
              React como texto, grids, formularios, etc.
            </Typography>
          </SectionCard>
        </Section>

        {/* 8. InfoGrid */}
        <Section title="InfoGrid">
          <InfoGrid
            columns={3}
            items={[
              { label: 'Check-in', value: '15 Mar 2026', sub: '3:00 PM' },
              { label: 'Check-out', value: '18 Mar 2026', sub: '12:00 PM' },
              { label: 'Huéspedes', value: '2 adultos', sub: '1 habitación' },
            ]}
          />
        </Section>

        {/* 9. PriceBreakdown */}
        <Section title="PriceBreakdown">
          <Box sx={{ maxWidth: 400 }}>
            <PriceBreakdown
              rows={[
                { label: '3 noches x $120.000', value: '$360.000' },
                { label: 'Impuestos y tasas', value: '$54.000' },
              ]}
              totalLabel="Total"
              totalValue="$414.000"
            />
          </Box>
        </Section>

        {/* 10. FilterChip */}
        <Section title="FilterChip">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <FilterChip
              label="Precio"
              selected={filterSelected.price}
              icon={<SortIcon sx={{ fontSize: 16 }} />}
              onClick={() => setFilterSelected((s) => ({ ...s, price: !s.price }))}
            />
            <FilterChip
              label="Rating"
              selected={filterSelected.rating}
              icon={<StarIcon sx={{ fontSize: 16 }} />}
              onClick={() => setFilterSelected((s) => ({ ...s, rating: !s.rating }))}
            />
            <FilterChip
              label="WiFi"
              selected={filterSelected.wifi}
              onClick={() => setFilterSelected((s) => ({ ...s, wifi: !s.wifi }))}
            />
            <FilterChip
              label="Piscina"
              selected={filterSelected.pool}
              onClick={() => setFilterSelected((s) => ({ ...s, pool: !s.pool }))}
            />
          </Box>
        </Section>

        {/* 11. SearchField */}
        <Section title="SearchField">
          <Box sx={{ maxWidth: 400 }}>
            <SearchField placeholder="Buscar destinos, hoteles..." />
          </Box>
        </Section>

        {/* 12. Inputs */}
        <Section title="Inputs">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Correo electrónico"
              placeholder="ejemplo@correo.com"
              type="email"
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Nombre completo"
              defaultValue="Juan Pérez"
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Deshabilitado"
              defaultValue="No editable"
              disabled
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Con error"
              defaultValue="texto inválido"
              error
              helperText="Este campo es requerido"
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Tipo de habitación"
              select
              defaultValue="doble"
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            >
              <MenuItem value="sencilla">Sencilla</MenuItem>
              <MenuItem value="doble">Doble</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
            </TextField>
          </Box>
        </Section>

        {/* 13. Buttons */}
        <Section title="Buttons">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Box>
        </Section>

        {/* 14. ModalOverlay */}
        <Section title="ModalOverlay">
          <Button variant="outlined" onClick={() => setModalOpen(true)}>
            Abrir Modal
          </Button>
          <ModalOverlay
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 22, color: palette.success }} />}
            iconBg={palette.successContainer}
            title="Reserva confirmada"
            subtitle="Tu reserva ha sido procesada exitosamente"
            footer={
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Aceptar
              </Button>
            }
          >
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
              Recibirás un correo electrónico con los detalles de tu reserva. Puedes consultar el estado
              en la sección "Mis Reservas".
            </Typography>
          </ModalOverlay>
        </Section>
      </Box>
    </Box>
  );
}
