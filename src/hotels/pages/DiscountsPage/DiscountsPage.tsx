import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
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
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { palette } from '@/design-system/theme/palette';
import { useDiscounts } from '@/api/hooks/useDiscounts';
import {
  ContentLayout,
  DiscountGrid,
  DiscountCard,
  CardHeader,
  DiscountValue,
  DiscountPercent,
  TypeChip,
  CardBody,
  CardTitle,
  DetailRow,
  DetailStrong,
  CardFooter,
  StatusBadge,
  SmallActionButton,
  FormPanel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  PanelBody,
  FloatingLabel,
  FormInput,
  ToggleButton,
  RoomCheckbox,
  CheckboxBox,
  RoomName,
  RoomSub,
  PanelFooter,
} from './DiscountsPage.styles';

const typeChipStyles: Record<string, { bg: string; color: string }> = {
  early: { bg: '#E8F0FE', color: '#1A73E8' },
  lastmin: { bg: palette.warningContainer, color: palette.warning },
  code: { bg: palette.successContainer, color: palette.success },
  seasonal: { bg: '#F3E8FF', color: '#7B1FA2' },
};

export default function DiscountsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const { isLoading } = useDiscounts();

  if (isLoading) {
    return (
      <HotelAdminLayout
        activeNav="descuentos"
        title={t('discounts.title')}
        subtitle={t('discounts.subtitle')}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      </HotelAdminLayout>
    );
  }

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
      validityStart: '2026-01-01',
      validityEnd: '2026-12-31',
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
      validityStart: '2026-03-01',
      validityEnd: '2026-04-30',
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
      validityStart: '2026-04-07',
      validityEnd: '2026-04-28',
      rooms: t('discounts.allRooms'),
      startsIn: '38 dias',
      status: 'scheduled',
      expired: false,
    },
  ];

  const statusStyles: Record<
    string,
    { bg: string; color: string; icon: React.ElementType; label: string }
  > = {
    active: {
      bg: palette.successContainer,
      color: palette.success,
      icon: CheckCircleIcon,
      label: t('discounts.statusActive'),
    },
    scheduled: {
      bg: '#E8F0FE',
      color: '#1A73E8',
      icon: ScheduleIcon,
      label: t('discounts.statusScheduled'),
    },
    expired: {
      bg: palette.errorContainer,
      color: palette.error,
      icon: CancelIcon,
      label: t('discounts.statusExpired'),
    },
  };

  return (
    <HotelAdminLayout
      activeNav="descuentos"
      title={t('discounts.title')}
      subtitle={t('discounts.subtitle')}
      topbarActions={
        <PrimaryPillButton pillSize="sm" startIcon={<AddIcon sx={{ fontSize: 16 }} />}>
          {t('discounts.newDiscount')}
        </PrimaryPillButton>
      }
    >
      {/* Content layout: discount cards + form panel */}
      <ContentLayout>
        {/* Left: discount grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          <DiscountGrid>
            {discountCards.map(card => {
              const TypeIcon = card.typeIcon;
              const chipStyle = typeChipStyles[card.typeChipClass];
              const status = statusStyles[card.status];
              const StatusIcon = status.icon;

              return (
                <DiscountCard key={card.id} ownerState={{ expired: card.expired }}>
                  {/* Card header */}
                  <CardHeader>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <DiscountValue ownerState={{ expired: card.expired }}>
                        {card.value}
                      </DiscountValue>
                      <DiscountPercent ownerState={{ expired: card.expired }}>%</DiscountPercent>
                    </Box>
                    <TypeChip ownerState={chipStyle}>
                      <TypeIcon sx={{ fontSize: 13 }} />
                      {card.typeLabel}
                    </TypeChip>
                  </CardHeader>

                  {/* Card body */}
                  <CardBody>
                    <CardTitle>{card.name}</CardTitle>
                    <Text textVariant="caption" sx={{ lineHeight: 1.4 }}>
                      {card.desc}
                    </Text>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <DetailRow>
                        <CalendarTodayIcon sx={{ fontSize: 13, color: palette.outline }} />
                        {t('discounts.validity')}{' '}
                        <DetailStrong component="strong">
                          {card.validityStart && card.validityEnd
                            ? `${formatDate(card.validityStart, 'short')} - ${formatDate(card.validityEnd, 'medium')}`
                            : card.validity}
                        </DetailStrong>
                      </DetailRow>
                      {card.rooms && (
                        <DetailRow>
                          <BedIcon sx={{ fontSize: 13, color: palette.outline }} />
                          {t('discounts.appliesTo')}{' '}
                          <DetailStrong component="strong">{card.rooms}</DetailStrong>
                        </DetailRow>
                      )}
                      {card.startsIn && (
                        <DetailRow>
                          <ScheduleIcon sx={{ fontSize: 13, color: palette.outline }} />
                          {t('discounts.startsIn')}{' '}
                          <DetailStrong component="strong">{card.startsIn}</DetailStrong>
                        </DetailRow>
                      )}
                    </Box>
                  </CardBody>

                  {/* Card footer */}
                  <CardFooter>
                    <StatusBadge ownerState={{ bg: status.bg, color: status.color }}>
                      <StatusIcon sx={{ fontSize: 12 }} />
                      {status.label}
                    </StatusBadge>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <SmallActionButton>
                        <EditIcon sx={{ fontSize: 13 }} />
                        {t('discounts.edit')}
                      </SmallActionButton>
                      <SmallActionButton>
                        <DeleteOutlineIcon sx={{ fontSize: 13 }} />
                        {t('discounts.delete')}
                      </SmallActionButton>
                    </Box>
                  </CardFooter>
                </DiscountCard>
              );
            })}
          </DiscountGrid>
        </Box>

        {/* Right: form panel */}
        <FormPanel>
          {/* Panel header */}
          <PanelHeader>
            <PanelTitle>
              <AddCircleIcon sx={{ fontSize: 18 }} />
              {t('discounts.panelTitle')}
            </PanelTitle>
            <CloseButton>
              <CloseIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
            </CloseButton>
          </PanelHeader>

          {/* Panel body */}
          <PanelBody>
            {/* Discount name */}
            <Box sx={{ position: 'relative' }}>
              <FloatingLabel>{t('discounts.discountName')}</FloatingLabel>
              <FormInput component="input" placeholder={t('discounts.discountNamePlaceholder')} />
            </Box>

            {/* Discount value */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('discounts.discountValue')}
            </Text>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ToggleButton ownerState={{ active: true }}>{t('discounts.percentage')}</ToggleButton>
              <ToggleButton ownerState={{ active: false }}>
                {t('discounts.fixedValue')}
              </ToggleButton>
            </Box>
            <Box sx={{ position: 'relative', mt: '8px' }}>
              <FloatingLabel>{t('discounts.discountPercentage')}</FloatingLabel>
              <FormInput component="input" placeholder={t('discounts.percentagePlaceholder')} />
            </Box>

            {/* Validity */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('discounts.validityLabel')}
            </Text>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('discounts.startDate')}</FloatingLabel>
                <FormInput component="input" placeholder="dd/mm/yyyy" />
              </Box>
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('discounts.endDate')}</FloatingLabel>
                <FormInput component="input" placeholder="dd/mm/yyyy" />
              </Box>
            </Box>

            {/* Applicable rooms */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('discounts.applicableRooms')}
            </Text>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {roomCheckboxes.map(room => (
                <RoomCheckbox key={room.name} ownerState={{ checked: room.checked }}>
                  <CheckboxBox ownerState={{ checked: room.checked }}>
                    {room.checked && <CheckIcon sx={{ fontSize: 13, color: palette.onPrimary }} />}
                  </CheckboxBox>
                  <Box>
                    <RoomName>{room.name}</RoomName>
                    <RoomSub>{room.sub}</RoomSub>
                  </Box>
                </RoomCheckbox>
              ))}
            </Box>
          </PanelBody>

          {/* Panel footer */}
          <PanelFooter>
            <OutlinedPillButton pillSize="xs">{t('discounts.cancel')}</OutlinedPillButton>
            <PrimaryPillButton
              pillSize="xs"
              startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
              sx={{ flex: 1 }}
            >
              {t('discounts.createDiscount')}
            </PrimaryPillButton>
          </PanelFooter>
        </FormPanel>
      </ContentLayout>
    </HotelAdminLayout>
  );
}
