import { useState } from 'react';
import { Box, Divider, Icon } from '@mui/material';
import StatusConfirmDialog from '@/modules/hotel-reservations/components/StatusConfirmDialog/StatusConfirmDialog';
import Text from '@/design-system/components/Text';
import { ErrorOutlinedPillButton, PrimaryPillButton } from '@/design-system/components/PillButton';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PolicyIcon from '@mui/icons-material/Policy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KingBedIcon from '@mui/icons-material/KingBed';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import SectionCard from '@/design-system/components/SectionCard';
import InfoGrid from '@/design-system/components/InfoGrid';
import { palette } from '@/design-system/theme/palette';
import { useHotelBookingDetail, useUpdateBookingStatus } from '@/api/hooks/useHotelBookings';
import HotelReservationDetailPageSkeleton from './HotelReservationDetailPage.skeleton';
import {
  HeaderCard,
  BookingCodeBadge,
  HeaderTitle,
  HeaderMeta,
  PendingBadge,
  ContentGrid,
  GuestAvatar,
  GuestName,
  ContactRow,
  RoomSectionLabel,
  RoomRow,
  RoomImage,
  RoomTitle,
  RoomSubtitle,
  AmenityChip,
  PriceLineLabel,
  PaymentMethodRow,
  PaymentMethodIcon,
  PaymentMethodName,
  PaymentMethodNumber,
  ApprovedBadge,
  PolicyValue,
} from './HotelReservationDetailPage.styles';

export default function HotelReservationDetailPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();
  const { id } = useParams<{ id: string }>();

  const { data: booking, isLoading } = useHotelBookingDetail(id!);
  const updateStatus = useUpdateBookingStatus();
  const [dialogAction, setDialogAction] = useState<'confirm' | 'reject' | null>(null);

  const handleDialogConfirm = () => {
    if (dialogAction) {
      updateStatus.mutate({ bookingId: id!, action: dialogAction });
    }
    setDialogAction(null);
  };

  const breadcrumbs = [
    { label: t('reservationDetail.breadcrumbs.dashboard'), href: '/hotel/dashboard' },
    { label: t('reservationDetail.breadcrumbs.reservations'), href: '/hotel/reservations' },
    { label: booking?.code ?? id },
  ];

  if (isLoading || !booking) {
    return (
      <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
        <HotelReservationDetailPageSkeleton />
      </HotelAdminLayout>
    );
  }

  return (
    <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
      {/* Page header card */}
      <HeaderCard>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Booking code badge */}
          <BookingCodeBadge>{booking?.code ?? id}</BookingCodeBadge>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <HeaderTitle>
              {t('reservationDetail.reservationOf', { name: 'Carlos Mendoza' })}
            </HeaderTitle>
            <HeaderMeta>
              <Icon sx={{ fontSize: 14 }}>calendar_today</Icon>
              {t('reservationDetail.receivedOn', {
                date: `${formatDate('2026-02-24', 'medium')}, 10:32 am`,
              })}
              <Box component="span" sx={{ mx: '4px' }}>
                &middot;
              </Box>
              <PendingBadge>
                <Icon sx={{ fontSize: 14 }}>schedule</Icon>
                {t('reservationDetail.pendingConfirmation')}
              </PendingBadge>
            </HeaderMeta>
          </Box>
        </Box>

        {/* Action buttons — only for pending bookings */}
        {booking?.status === 'pending' && (
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ErrorOutlinedPillButton
              pillSize="sm"
              startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
              disabled={updateStatus.isPending}
              onClick={() => setDialogAction('reject')}
              sx={{
                backgroundColor: palette.errorContainer,
                '&:hover': { backgroundColor: palette.errorContainer },
              }}
            >
              {t('reservationDetail.reject')}
            </ErrorOutlinedPillButton>
            <PrimaryPillButton
              pillSize="sm"
              startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
              disabled={updateStatus.isPending}
              onClick={() => setDialogAction('confirm')}
            >
              {t('reservationDetail.confirmReservation')}
            </PrimaryPillButton>
          </Box>
        )}
      </HeaderCard>

      {/* Content grid */}
      <ContentGrid>
        {/* Left column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Guest info card */}
          <SectionCard
            icon={<PersonIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.guestInfo')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GuestAvatar>
                <PersonIcon sx={{ fontSize: 28, color: palette.primary }} />
              </GuestAvatar>
              <Box>
                <GuestName>Carlos Andres Mendoza Lopez</GuestName>
                <Text textVariant="caption" sx={{ mb: '6px' }}>
                  Colombia · CC 1020303040
                </Text>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <ContactRow>
                    <EmailIcon sx={{ fontSize: 14, color: palette.primary }} />
                    carlos.mendoza@email.com
                  </ContactRow>
                  <ContactRow>
                    <PhoneIcon sx={{ fontSize: 14, color: palette.primary }} />
                    +57 310 456 7890
                  </ContactRow>
                </Box>
              </Box>
            </Box>
          </SectionCard>

          {/* Booking details card */}
          <SectionCard
            icon={<EventAvailableIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.bookingDetails')}
          >
            <InfoGrid
              columns={4}
              items={[
                {
                  label: t('reservationDetail.checkIn'),
                  value: formatDate('2026-03-15', 'medium'),
                  sub: t('reservationDetail.from', { time: '3:00 PM' }),
                },
                {
                  label: t('reservationDetail.checkOut'),
                  value: formatDate('2026-03-18', 'medium'),
                  sub: t('reservationDetail.until', { time: '12:00 PM' }),
                },
                {
                  label: t('reservationDetail.duration'),
                  value: t('reservationDetail.nightsCount', { count: 3 }),
                  sub: t('reservationDetail.hours', { count: 72 }),
                },
                {
                  label: t('reservationDetail.guests'),
                  value: t('reservationDetail.adults', { count: 2 }),
                  sub: t('reservationDetail.noMinors'),
                },
              ]}
            />

            <Divider sx={{ borderColor: palette.outlineVariant, my: '16px' }} />

            {/* Room info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '10px' }}>
              <Icon sx={{ fontSize: 18, color: palette.primary }}>bed</Icon>
              <RoomSectionLabel>{t('reservationDetail.reservedRoom')}</RoomSectionLabel>
            </Box>

            <RoomRow>
              {/* Room image placeholder */}
              <RoomImage>
                <KingBedIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }} />
              </RoomImage>

              <Box>
                <RoomTitle>Suite Deluxe King — Piso 4</RoomTitle>
                <RoomSubtitle>1 cama King · Vista al mar · 45 m2</RoomSubtitle>
                <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
                  {['WiFi', 'A/C', 'Desayuno', 'Jacuzzi', 'Cancelacion gratuita'].map(amenity => (
                    <AmenityChip key={amenity}>{amenity}</AmenityChip>
                  ))}
                </Box>
              </Box>

              <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                <Text textVariant="priceSmall">
                  {formatPrice(888000)}
                  {t('reservationDetail.perNight')}
                </Text>
                <Text textVariant="caption">
                  {t('reservationDetail.nightsTotal', { nights: 3, total: formatPrice(2664000) })}
                </Text>
              </Box>
            </RoomRow>
          </SectionCard>
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Payment summary card */}
          <SectionCard
            icon={<ReceiptLongIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.paymentSummary')}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  label: t('reservationDetail.roomNights', { count: 3 }),
                  value: formatPrice(2664000),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.taxIVA'),
                  value: formatPrice(505160),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.serviceCharge'),
                  value: formatPrice(80000),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.discountApplied'),
                  value: `-${formatPrice(100000)}`,
                  color: palette.success,
                },
              ].map((row, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Text textVariant="hint">{row.label}</Text>
                  <PriceLineLabel sx={{ color: row.color }}>{row.value}</PriceLineLabel>
                </Box>
              ))}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <PriceLineLabel sx={{ fontWeight: 700, color: palette.onSurface }}>
                  {t('reservationDetail.totalCharged')}
                </PriceLineLabel>
                <Text textVariant="priceSmall">{formatPrice(3149160)}</Text>
              </Box>
            </Box>

            {/* Payment method */}
            <PaymentMethodRow>
              <PaymentMethodIcon>
                <CreditCardIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
              </PaymentMethodIcon>
              <Box>
                <PaymentMethodName>Visa Credito</PaymentMethodName>
                <PaymentMethodNumber>**** **** **** 4821</PaymentMethodNumber>
              </Box>
              <ApprovedBadge>
                <CheckCircleIcon sx={{ fontSize: 13 }} />
                {t('reservationDetail.approved')}
              </ApprovedBadge>
            </PaymentMethodRow>
          </SectionCard>

          {/* Cancellation policy card */}
          <SectionCard
            icon={<PolicyIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.cancellationPolicy')}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Text textVariant="caption">{t('reservationDetail.freeCancellationUntil')}</Text>
                <PolicyValue valueColor={palette.success}>
                  {formatDate('2026-03-12', 'medium')}
                </PolicyValue>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Text textVariant="caption">{t('reservationDetail.penaltyAfter')}</Text>
                <PolicyValue valueColor={palette.warning}>
                  {t('reservationDetail.fiftyPercent')}
                </PolicyValue>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Text textVariant="caption">No-show</Text>
                <PolicyValue valueColor={palette.error}>
                  {t('reservationDetail.hundredPercent')}
                </PolicyValue>
              </Box>
            </Box>
          </SectionCard>
        </Box>
      </ContentGrid>

      <StatusConfirmDialog
        open={dialogAction !== null}
        action={dialogAction ?? 'confirm'}
        bookingCode={booking?.code ?? id!}
        loading={updateStatus.isPending}
        onConfirm={handleDialogConfirm}
        onCancel={() => setDialogAction(null)}
      />
    </HotelAdminLayout>
  );
}
