import React from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BoltIcon from '@mui/icons-material/Bolt';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BedIcon from '@mui/icons-material/Bed';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import { palette } from '../../design-system/theme/palette';

const typeChipStyles: Record<string, { bg: string; color: string }> = {
  early: { bg: '#E8F0FE', color: '#1A73E8' },
  lastmin: { bg: palette.warningContainer, color: palette.warning },
  code: { bg: palette.successContainer, color: palette.success },
  seasonal: { bg: '#F3E8FF', color: '#7B1FA2' },
};

export default function DiscountsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice } = useLocale();

  const roomCheckboxes = [
    { name: 'Suite Deluxe King', sub: `Piso 4 · ${formatPrice(888000)}/noche`, checked: true },
    { name: 'Junior Suite', sub: `Piso 3 · ${formatPrice(560000)}/noche`, checked: true },
    { name: 'Habitacion Estandar', sub: `Piso 2 · ${formatPrice(320000)}/noche`, checked: false },
    { name: 'Habitacion Doble', sub: `Piso 1 · ${formatPrice(280000)}/noche`, checked: false },
  ];

  const discountCards = [
    {
      id: 1,
      value: '20',
      typeChipClass: 'early',
      typeIcon: EventAvailableIcon,
      typeLabel: t('discounts.typeEarlyBird'),
      name: 'Early Bird -- 30 dias antes',
      desc: 'Aplica para reservas realizadas con al menos 30 dias de anticipacion.',
      validity: 'Ene 1 - Dic 31, 2026',
      rooms: t('discounts.allRooms'),
      startsIn: null,
      status: 'active',
      expired: false,
    },
    {
      id: 2,
      value: '15',
      typeChipClass: 'lastmin',
      typeIcon: BoltIcon,
      typeLabel: t('discounts.typeLastMinute'),
      name: 'Last Minute -- 48 horas',
      desc: 'Descuento automatico para disponibilidad dentro de las proximas 48 horas.',
      validity: t('discounts.permanent'),
      rooms: 'Habitacion Estandar, Doble',
      startsIn: null,
      status: 'active',
      expired: false,
    },
    {
      id: 3,
      value: '10',
      typeChipClass: 'code',
      typeIcon: VpnKeyIcon,
      typeLabel: t('discounts.typePromoCode'),
      name: 'Codigo -- TravelHub Spring',
      desc: 'Codigo exclusivo para la campana de primavera en app TravelHub.',
      validity: 'Mar 1 - Abr 30, 2026',
      rooms: null,
      startsIn: null,
      status: 'active',
      expired: false,
    },
    {
      id: 4,
      value: '25',
      typeChipClass: 'seasonal',
      typeIcon: CelebrationIcon,
      typeLabel: t('discounts.typeSeasonal'),
      name: 'Semana de Descanso -- Abril',
      desc: 'Promocion especial para incentivar reservas durante temporada baja de abril.',
      validity: 'Abr 7 - Abr 28, 2026',
      rooms: t('discounts.allRooms'),
      startsIn: '38 dias',
      status: 'scheduled',
      expired: false,
    },
  ];

  const statusStyles: Record<string, { bg: string; color: string; icon: React.ElementType; label: string }> = {
    active: { bg: palette.successContainer, color: palette.success, icon: CheckCircleIcon, label: t('discounts.statusActive') },
    scheduled: { bg: '#E8F0FE', color: '#1A73E8', icon: ScheduleIcon, label: t('discounts.statusScheduled') },
    expired: { bg: palette.errorContainer, color: palette.error, icon: CancelIcon, label: t('discounts.statusExpired') },
  };

  return (
    <HotelAdminLayout
      activeNav="descuentos"
      title={t('discounts.title')}
      subtitle={t('discounts.subtitle')}
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
          {t('discounts.newDiscount')}
        </Box>
      }
    >

      {/* Content layout: discount cards + form panel */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px', flex: 1, overflow: 'hidden' }}>
        {/* Left: discount grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', overflow: 'hidden' }}>
            {discountCards.map((card) => {
              const TypeIcon = card.typeIcon;
              const chipStyle = typeChipStyles[card.typeChipClass];
              const status = statusStyles[card.status];
              const StatusIcon = status.icon;

              return (
                <Box
                  key={card.id}
                  sx={{
                    background: palette.surface,
                    borderRadius: '16px',
                    border: `1px solid ${palette.outlineVariant}`,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: card.expired ? 0.6 : 1,
                  }}
                >
                  {/* Card header */}
                  <Box
                    sx={{
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `1px solid ${palette.outlineVariant}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <Typography sx={{ fontSize: 22, fontWeight: 800, color: card.expired ? palette.outline : palette.primary }}>
                        {card.value}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: card.expired ? palette.outline : palette.primary }}>
                        %
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: chipStyle.bg,
                        color: chipStyle.color,
                      }}
                    >
                      <TypeIcon sx={{ fontSize: 13 }} />
                      {card.typeLabel}
                    </Box>
                  </Box>

                  {/* Card body */}
                  <Box sx={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: palette.onSurface }}>
                      {card.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, lineHeight: 1.4 }}>
                      {card.desc}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 11, color: palette.onSurfaceVariant }}>
                        <CalendarTodayIcon sx={{ fontSize: 13, color: palette.outline }} />
                        {t('discounts.validity')} <Box component="strong" sx={{ color: palette.onSurface, fontWeight: 600 }}>{card.validity}</Box>
                      </Box>
                      {card.rooms && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 11, color: palette.onSurfaceVariant }}>
                          <BedIcon sx={{ fontSize: 13, color: palette.outline }} />
                          {t('discounts.appliesTo')} <Box component="strong" sx={{ color: palette.onSurface, fontWeight: 600 }}>{card.rooms}</Box>
                        </Box>
                      )}
                      {card.startsIn && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 11, color: palette.onSurfaceVariant }}>
                          <ScheduleIcon sx={{ fontSize: 13, color: palette.outline }} />
                          {t('discounts.startsIn')} <Box component="strong" sx={{ color: palette.onSurface, fontWeight: 600 }}>{card.startsIn}</Box>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Card footer */}
                  <Box
                    sx={{
                      padding: '10px 16px',
                      borderTop: `1px solid ${palette.outlineVariant}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '100px',
                        background: status.bg,
                        color: status.color,
                      }}
                    >
                      <StatusIcon sx={{ fontSize: 12 }} />
                      {status.label}
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <Box
                        sx={{
                          height: 28,
                          padding: '0 10px',
                          borderRadius: '100px',
                          border: `1px solid ${palette.outlineVariant}`,
                          background: 'transparent',
                          fontSize: 11,
                          fontWeight: 500,
                          color: palette.onSurfaceVariant,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <EditIcon sx={{ fontSize: 13 }} />
                        {t('discounts.edit')}
                      </Box>
                      <Box
                        sx={{
                          height: 28,
                          padding: '0 10px',
                          borderRadius: '100px',
                          border: `1px solid ${palette.outlineVariant}`,
                          background: 'transparent',
                          fontSize: 11,
                          fontWeight: 500,
                          color: palette.onSurfaceVariant,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 13 }} />
                        {t('discounts.delete')}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Right: form panel */}
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
              background: 'linear-gradient(135deg, #006874, #004F58)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 14, fontWeight: 700, color: '#fff' }}>
              <AddCircleIcon sx={{ fontSize: 18 }} />
              {t('discounts.panelTitle')}
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
          <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }}>
            {/* Discount name */}
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
                {t('discounts.discountName')}
              </Typography>
              <Box
                component="input"
                placeholder={t('discounts.discountNamePlaceholder')}
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

            {/* Discount value */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              {t('discounts.discountValue')}
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Box
                sx={{
                  height: 48,
                  padding: '0 16px',
                  borderRadius: '8px',
                  border: `1px solid ${palette.primary}`,
                  background: palette.primary,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {t('discounts.percentage')}
              </Box>
              <Box
                sx={{
                  height: 48,
                  padding: '0 16px',
                  borderRadius: '8px',
                  border: `1px solid ${palette.outline}`,
                  background: 'transparent',
                  fontSize: 13,
                  fontWeight: 500,
                  color: palette.onSurfaceVariant,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {t('discounts.fixedValue')}
              </Box>
            </Box>
            <Box sx={{ position: 'relative', mt: '8px' }}>
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
                {t('discounts.discountPercentage')}
              </Typography>
              <Box
                component="input"
                placeholder={t('discounts.percentagePlaceholder')}
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

            {/* Validity */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              {t('discounts.validityLabel')}
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
                  {t('discounts.startDate')}
                </Typography>
                <Box
                  component="input"
                  placeholder="dd/mm/yyyy"
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
                  {t('discounts.endDate')}
                </Typography>
                <Box
                  component="input"
                  placeholder="dd/mm/yyyy"
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

            {/* Applicable rooms */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: palette.outline, mb: '-4px' }}>
              {t('discounts.applicableRooms')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {roomCheckboxes.map((room) => (
                <Box
                  key={room.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: `1px solid ${room.checked ? palette.primary : palette.outlineVariant}`,
                    background: room.checked ? '#E8F6F8' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '4px',
                      flexShrink: 0,
                      border: `2px solid ${room.checked ? palette.primary : palette.outline}`,
                      background: room.checked ? palette.primary : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {room.checked && <CheckIcon sx={{ fontSize: 13, color: '#fff' }} />}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: palette.onSurface }}>{room.name}</Typography>
                    <Typography sx={{ fontSize: 10, color: palette.outline }}>{room.sub}</Typography>
                  </Box>
                </Box>
              ))}
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
              {t('discounts.cancel')}
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
              <CheckCircleIcon sx={{ fontSize: 16 }} />
              {t('discounts.createDiscount')}
            </Box>
          </Box>
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
