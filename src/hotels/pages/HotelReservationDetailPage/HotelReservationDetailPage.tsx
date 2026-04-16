import { useState } from 'react';
import { Divider, Icon } from '@mui/material';
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
import StatusChip from '@/design-system/components/StatusChip';
import { palette } from '@/design-system/theme/palette';
import { useHotelBookingDetail, useUpdateBookingStatus } from '@/api/hooks/useHotelBookings';
import HotelReservationDetailPageSkeleton from './HotelReservationDetailPage.skeleton';
import {
  HeaderCard,
  BookingCodeBadge,
  HeaderTitle,
  HeaderMeta,
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
  HeaderRow,
  HeaderInfo,
  ActionButtons,
  ColumnStack,
  GuestRow,
  ContactsRow,
  RoomLabelRow,
  AmenitiesRow,
  RoomPriceBox,
  PriceBreakdownStack,
  PriceRow,
  PolicyRow,
  PolicyStack,
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
    { label: booking?.code ?? id ?? '' },
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
        <HeaderRow>
          <BookingCodeBadge>{booking.code}</BookingCodeBadge>
          <HeaderInfo>
            <HeaderTitle>
              {t('reservationDetail.reservationOf', { name: 'Carlos Mendoza' })}
            </HeaderTitle>
            <HeaderMeta>
              <Icon sx={{ fontSize: 14 }}>calendar_today</Icon>
              {t('reservationDetail.receivedOn', {
                date: `${formatDate('2026-02-24', 'medium')}, 10:32 am`,
              })}
              <span>&middot;</span>
              <StatusChip status={booking.status as any} />
            </HeaderMeta>
          </HeaderInfo>
        </HeaderRow>

        {/* Action buttons — only for pending bookings */}
        {booking.status === 'pending' && (
          <ActionButtons>
            <ErrorOutlinedPillButton
              pillSize="sm"
              startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
              disabled={updateStatus.isPending}
              onClick={() => setDialogAction('reject')}
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
          </ActionButtons>
        )}
      </HeaderCard>

      {/* Content grid */}
      <ContentGrid>
        {/* Left column */}
        <ColumnStack>
          {/* Guest info card */}
          <SectionCard
            icon={<PersonIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.guestInfo')}
          >
            <GuestRow>
              <GuestAvatar>
                <PersonIcon sx={{ fontSize: 28, color: palette.primary }} />
              </GuestAvatar>
              <div>
                <GuestName>Carlos Andres Mendoza Lopez</GuestName>
                <Text textVariant="caption" sx={{ mb: '6px' }}>
                  Colombia · CC 1020303040
                </Text>
                <ContactsRow>
                  <ContactRow>
                    <EmailIcon sx={{ fontSize: 14, color: palette.primary }} />
                    carlos.mendoza@email.com
                  </ContactRow>
                  <ContactRow>
                    <PhoneIcon sx={{ fontSize: 14, color: palette.primary }} />
                    +57 310 456 7890
                  </ContactRow>
                </ContactsRow>
              </div>
            </GuestRow>
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
            <RoomLabelRow>
              <Icon sx={{ fontSize: 18, color: palette.primary }}>bed</Icon>
              <RoomSectionLabel>{t('reservationDetail.reservedRoom')}</RoomSectionLabel>
            </RoomLabelRow>

            <RoomRow>
              <RoomImage>
                <KingBedIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }} />
              </RoomImage>

              <div>
                <RoomTitle>Suite Deluxe King — Piso 4</RoomTitle>
                <RoomSubtitle>1 cama King · Vista al mar · 45 m2</RoomSubtitle>
                <AmenitiesRow>
                  {['WiFi', 'A/C', 'Desayuno', 'Jacuzzi', 'Cancelacion gratuita'].map(amenity => (
                    <AmenityChip key={amenity}>{amenity}</AmenityChip>
                  ))}
                </AmenitiesRow>
              </div>

              <RoomPriceBox>
                <Text textVariant="priceSmall">
                  {formatPrice(888000)}
                  {t('reservationDetail.perNight')}
                </Text>
                <Text textVariant="caption">
                  {t('reservationDetail.nightsTotal', { nights: 3, total: formatPrice(2664000) })}
                </Text>
              </RoomPriceBox>
            </RoomRow>
          </SectionCard>
        </ColumnStack>

        {/* Right column */}
        <ColumnStack>
          {/* Payment summary card */}
          <SectionCard
            icon={<ReceiptLongIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.paymentSummary')}
          >
            <PriceBreakdownStack>
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
                <PriceRow key={index}>
                  <Text textVariant="hint">{row.label}</Text>
                  <PriceLineLabel sx={{ color: row.color }}>{row.value}</PriceLineLabel>
                </PriceRow>
              ))}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              <PriceRow>
                <PriceLineLabel sx={{ fontWeight: 700, color: palette.onSurface }}>
                  {t('reservationDetail.totalCharged')}
                </PriceLineLabel>
                <Text textVariant="priceSmall">{formatPrice(3149160)}</Text>
              </PriceRow>
            </PriceBreakdownStack>

            {/* Payment method */}
            <PaymentMethodRow>
              <PaymentMethodIcon>
                <CreditCardIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
              </PaymentMethodIcon>
              <div>
                <PaymentMethodName>Visa Credito</PaymentMethodName>
                <PaymentMethodNumber>**** **** **** 4821</PaymentMethodNumber>
              </div>
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
            <PolicyStack>
              <PolicyRow>
                <Text textVariant="caption">{t('reservationDetail.freeCancellationUntil')}</Text>
                <PolicyValue valueColor={palette.success}>
                  {formatDate('2026-03-12', 'medium')}
                </PolicyValue>
              </PolicyRow>
              <PolicyRow>
                <Text textVariant="caption">{t('reservationDetail.penaltyAfter')}</Text>
                <PolicyValue valueColor={palette.warning}>
                  {t('reservationDetail.fiftyPercent')}
                </PolicyValue>
              </PolicyRow>
              <PolicyRow>
                <Text textVariant="caption">No-show</Text>
                <PolicyValue valueColor={palette.error}>
                  {t('reservationDetail.hundredPercent')}
                </PolicyValue>
              </PolicyRow>
            </PolicyStack>
          </SectionCard>
        </ColumnStack>
      </ContentGrid>

      <StatusConfirmDialog
        open={dialogAction !== null}
        action={dialogAction ?? 'confirm'}
        bookingCode={booking.code}
        loading={updateStatus.isPending}
        onConfirm={handleDialogConfirm}
        onCancel={() => setDialogAction(null)}
      />
    </HotelAdminLayout>
  );
}
