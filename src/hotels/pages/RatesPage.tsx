import { Box, Typography } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import KingBedIcon from '@mui/icons-material/KingBed';
import HotelIcon from '@mui/icons-material/Hotel';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import StarIcon from '@mui/icons-material/Star';
import WeekendIcon from '@mui/icons-material/Weekend';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import { palette } from '../../design-system/theme/palette';

const rates = [
  {
    id: 1,
    name: 'Suite Deluxe King',
    location: 'Piso 4 · Vista al mar',
    icon: KingBedIcon,
    type: 'standard',
    typeLabel: 'Estandar',
    typeIcon: StarIcon,
    price: 'COP 888.000',
    validity: 'Todo el ano',
    selected: true,
  },
  {
    id: 2,
    name: 'Suite Deluxe King',
    location: 'Piso 4 · Vista al mar',
    icon: KingBedIcon,
    type: 'weekend',
    typeLabel: 'Fin de semana',
    typeIcon: WeekendIcon,
    price: 'COP 1.050.000',
    validity: 'Todo el ano',
    selected: false,
  },
  {
    id: 3,
    name: 'Suite Deluxe King',
    location: 'Piso 4 · Vista al mar',
    icon: KingBedIcon,
    type: 'season',
    typeLabel: 'Temporada alta',
    typeIcon: WbSunnyIcon,
    price: 'COP 1.280.000',
    validity: 'Dic 20 - Ene 10',
    selected: false,
  },
  {
    id: 4,
    name: 'Junior Suite',
    location: 'Piso 3 · Vista jardin',
    icon: HotelIcon,
    type: 'standard',
    typeLabel: 'Estandar',
    typeIcon: StarIcon,
    price: 'COP 560.000',
    validity: 'Todo el ano',
    selected: false,
  },
  {
    id: 5,
    name: 'Junior Suite',
    location: 'Piso 3 · Vista jardin',
    icon: HotelIcon,
    type: 'promo',
    typeLabel: 'Promocional',
    typeIcon: LocalOfferIcon,
    price: 'COP 420.000',
    validity: 'Mar 1 - Mar 31',
    selected: false,
  },
  {
    id: 6,
    name: 'Habitacion Estandar',
    location: 'Piso 2 · Vista interior',
    icon: SingleBedIcon,
    type: 'standard',
    typeLabel: 'Estandar',
    typeIcon: StarIcon,
    price: 'COP 320.000',
    validity: 'Todo el ano',
    selected: false,
  },
];

const typeChipStyles: Record<string, { bg: string; color: string }> = {
  standard: { bg: palette.primaryContainer, color: palette.primary },
  weekend: { bg: palette.warningContainer, color: palette.warning },
  season: { bg: '#E8F0FE', color: '#1A73E8' },
  promo: { bg: palette.successContainer, color: palette.success },
};

const filterChips = ['Todas', 'Estandar', 'Fin de semana', 'Temporada', 'Promocional'];

const rateTypeOptions = [
  { icon: StarIcon, label: 'Estandar', desc: 'Precio base regular', selected: true },
  { icon: WeekendIcon, label: 'Fin de semana', desc: 'Vie, Sab, Dom', selected: false },
  { icon: WbSunnyIcon, label: 'Temporada alta', desc: 'Rango de fechas', selected: false },
  { icon: LocalOfferIcon, label: 'Promocional', desc: 'Descuento especial', selected: false },
];

export default function RatesPage() {
  return (
    <HotelAdminLayout
      activeNav="tarifas"
      title="Gestion de Tarifas"
      subtitle="Configura precios por habitacion, temporada y tipo de dia"
      topbarActions={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            borderRadius: '100px',
            border: 'none',
            background: palette.primary,
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          Nueva tarifa
        </Box>
      }
    >

      {/* Filter bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: palette.surface,
          borderRadius: '16px',
          border: `1px solid ${palette.outlineVariant}`,
          padding: '14px 20px',
          mb: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '100px',
            padding: '8px 16px',
            background: palette.background,
            fontSize: 13,
            color: palette.onSurfaceVariant,
            minWidth: 240,
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: palette.outline }} />
          Buscar tarifa o habitacion...
        </Box>

        <Box sx={{ width: '1px', height: 24, background: palette.outlineVariant, mx: '4px', flexShrink: 0 }} />

        <Box sx={{ display: 'flex', gap: '8px' }}>
          {filterChips.map((chip, i) => (
            <Box
              key={chip}
              sx={{
                fontSize: 12,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: '100px',
                border: `1px solid ${i === 0 ? palette.primary : palette.outlineVariant}`,
                background: i === 0 ? palette.primary : 'transparent',
                color: i === 0 ? '#fff' : palette.onSurfaceVariant,
                cursor: 'pointer',
              }}
            >
              {chip}
            </Box>
          ))}
        </Box>

      </Box>

      {/* Content layout: table + edit panel */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', flex: 1, overflow: 'hidden' }}>
        {/* Rates table card */}
        <Box
          sx={{
            background: palette.surface,
            borderRadius: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Card header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: `1px solid ${palette.outlineVariant}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 14, fontWeight: 700, color: palette.onSurface }}>
              <SellIcon sx={{ fontSize: 18, color: palette.primary }} />
              Tarifas configuradas
            </Box>
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
              12 tarifas · 4 habitaciones
            </Typography>
          </Box>

          {/* Table */}
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {['Habitacion', 'Tipo de tarifa', 'Precio / noche', 'Vigencia', 'Acciones'].map((header) => (
                  <Box
                    component="th"
                    key={header}
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.outline,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '10px 16px',
                      textAlign: 'left',
                      background: palette.background,
                      borderBottom: `1px solid ${palette.outlineVariant}`,
                    }}
                  >
                    {header}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {rates.map((rate) => {
                const IconComp = rate.icon;
                const TypeIcon = rate.typeIcon;
                const chipStyle = typeChipStyles[rate.type];
                return (
                  <Box
                    component="tr"
                    key={rate.id}
                    sx={{
                      borderBottom: `1px solid ${palette.outlineVariant}`,
                      background: rate.selected ? '#E8F6F8' : 'transparent',
                      '&:hover': { background: rate.selected ? '#E8F6F8' : palette.background },
                    }}
                  >
                    {/* Room cell */}
                    <Box component="td" sx={{ padding: '12px 16px', fontSize: 13, color: palette.onSurface, verticalAlign: 'middle' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 32,
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #006874, #4A6267)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <IconComp sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>{rate.name}</Typography>
                          <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>{rate.location}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* Type chip */}
                    <Box component="td" sx={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: chipStyle.bg,
                          color: chipStyle.color,
                        }}
                      >
                        <TypeIcon sx={{ fontSize: 13 }} />
                        {rate.typeLabel}
                      </Box>
                    </Box>
                    {/* Price */}
                    <Box component="td" sx={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                      <Typography sx={{ fontSize: 15, fontWeight: 700, color: palette.onSurface }}>
                        {rate.price}{' '}
                        <Box component="span" sx={{ fontSize: 11, color: palette.outline, fontWeight: 400 }}>/ noche</Box>
                      </Typography>
                    </Box>
                    {/* Validity */}
                    <Box component="td" sx={{ padding: '12px 16px', fontSize: 12, color: palette.onSurfaceVariant, verticalAlign: 'middle' }}>
                      {rate.validity}
                    </Box>
                    {/* Actions */}
                    <Box component="td" sx={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                      <Box sx={{ display: 'flex', gap: '4px' }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            border: rate.selected ? 'none' : `1px solid ${palette.outlineVariant}`,
                            background: rate.selected ? palette.primary : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { background: rate.selected ? palette.primary : palette.background },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 16, color: rate.selected ? '#fff' : palette.onSurfaceVariant }} />
                        </Box>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            border: `1px solid ${palette.outlineVariant}`,
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { background: palette.background },
                            '&:hover .delete-icon': { color: palette.error },
                          }}
                        >
                          <DeleteOutlineIcon className="delete-icon" sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderTop: `1px solid ${palette.outlineVariant}`,
              fontSize: 12,
              color: palette.onSurfaceVariant,
              mt: 'auto',
            }}
          >
            <span>Mostrando 1-6 de 12 tarifas</span>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: `1px solid ${palette.outlineVariant}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </Box>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: `1px solid ${palette.primary}`,
                  background: palette.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#fff',
                }}
              >
                1
              </Box>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: `1px solid ${palette.outlineVariant}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  color: palette.onSurfaceVariant,
                }}
              >
                2
              </Box>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: `1px solid ${palette.outlineVariant}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Edit panel */}
        <Box
          sx={{
            background: palette.surface,
            borderRadius: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Panel header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: `1px solid ${palette.outlineVariant}`,
              background: palette.primary,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 14, fontWeight: 700, color: '#fff' }}>
              <EditIcon sx={{ fontSize: 18 }} />
              Editar tarifa
            </Box>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <CloseIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          </Box>

          {/* Panel body */}
          <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
            {/* Room section */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              Habitacion
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '-9px',
                  left: '12px',
                  background: palette.surface,
                  padding: '0 4px',
                  fontSize: 11,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                  zIndex: 1,
                }}
              >
                Habitacion
              </Typography>
              <Box
                component="select"
                defaultValue="Suite Deluxe King — Piso 4"
                sx={{
                  width: '100%',
                  height: 48,
                  border: `1px solid ${palette.outline}`,
                  borderRadius: '8px',
                  padding: '0 12px',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 13,
                  color: palette.onSurface,
                  outline: 'none',
                  background: palette.surface,
                  boxSizing: 'border-box',
                }}
              >
                <option>Suite Deluxe King -- Piso 4</option>
              </Box>
            </Box>

            {/* Rate type section */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              Tipo de tarifa
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {rateTypeOptions.map((opt) => {
                const OptIcon = opt.icon;
                return (
                  <Box
                    key={opt.label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `2px solid ${opt.selected ? palette.primary : palette.outlineVariant}`,
                      background: opt.selected ? '#E8F6F8' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <OptIcon sx={{ fontSize: 18, color: palette.primary, mb: '2px' }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurface }}>{opt.label}</Typography>
                    <Typography sx={{ fontSize: 10, color: palette.outline }}>{opt.desc}</Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Price section */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              Precio
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '-9px',
                  left: '12px',
                  background: palette.surface,
                  padding: '0 4px',
                  fontSize: 11,
                  color: palette.outline,
                  letterSpacing: '0.4px',
                  zIndex: 1,
                }}
              >
                Precio por noche
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    height: 48,
                    padding: '0 12px',
                    background: palette.background,
                    border: `1px solid ${palette.outline}`,
                    borderRight: 'none',
                    borderRadius: '8px 0 0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    color: palette.onSurfaceVariant,
                  }}
                >
                  COP
                </Box>
                <Box
                  component="input"
                  defaultValue="888.000"
                  sx={{
                    flex: 1,
                    height: 48,
                    border: `1px solid ${palette.outline}`,
                    borderLeft: `1px solid ${palette.outlineVariant}`,
                    borderRadius: '0 8px 8px 0',
                    padding: '0 12px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 13,
                    color: palette.onSurface,
                    outline: 'none',
                    background: palette.surface,
                    boxSizing: 'border-box',
                  }}
                />
              </Box>
            </Box>

            {/* Validity section */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              Vigencia
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Box sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '-9px',
                    left: '12px',
                    background: palette.surface,
                    padding: '0 4px',
                    fontSize: 11,
                    color: palette.outline,
                    letterSpacing: '0.4px',
                    zIndex: 1,
                  }}
                >
                  Fecha inicio
                </Typography>
                <Box
                  component="input"
                  defaultValue="01/01/2026"
                  sx={{
                    width: '100%',
                    height: 48,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 12px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 13,
                    color: palette.onSurface,
                    outline: 'none',
                    background: palette.surface,
                    boxSizing: 'border-box',
                  }}
                />
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '-9px',
                    left: '12px',
                    background: palette.surface,
                    padding: '0 4px',
                    fontSize: 11,
                    color: palette.outline,
                    letterSpacing: '0.4px',
                    zIndex: 1,
                  }}
                >
                  Fecha fin
                </Typography>
                <Box
                  component="input"
                  defaultValue="31/12/2026"
                  sx={{
                    width: '100%',
                    height: 48,
                    border: `1px solid ${palette.outline}`,
                    borderRadius: '8px',
                    padding: '0 12px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 13,
                    color: palette.onSurface,
                    outline: 'none',
                    background: palette.surface,
                    boxSizing: 'border-box',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Panel footer */}
          <Box
            sx={{
              padding: '16px 20px',
              borderTop: `1px solid ${palette.outlineVariant}`,
              display: 'flex',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                height: 44,
                padding: '0 20px',
                borderRadius: '100px',
                border: `1px solid ${palette.outline}`,
                background: 'transparent',
                fontSize: 13,
                fontWeight: 500,
                color: palette.onSurfaceVariant,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Cancelar
            </Box>
            <Box
              sx={{
                flex: 1,
                height: 44,
                borderRadius: '100px',
                border: 'none',
                background: palette.primary,
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <SaveIcon sx={{ fontSize: 16 }} />
              Guardar tarifa
            </Box>
          </Box>
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
