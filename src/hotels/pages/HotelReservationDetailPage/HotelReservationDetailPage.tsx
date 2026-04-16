import { useState } from 'react';
import { Divider, Icon } from '@mui/material';
import StatusConfirmDialog from '@/modules/hotel-reservations/components/StatusConfirmDialog/StatusConfirmDialog';
import Text from '@/design-system/components/Text';
import { ErrorOutlinedPillButton, PrimaryPillButton } from '@/design-system/components/PillButton';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
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
  PriceLineLabel,
  ApprovedBadge,
  HeaderRow,
  HeaderInfo,
  ActionButtons,
  ColumnStack,
  GuestRow,
  ContactsRow,
  PriceBreakdownStack,
  PriceRow,
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

  const pb = booking.priceBreakdown;

  return (
    <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
      {/* Page header card */}
      <HeaderCard>
        <HeaderRow>
          <BookingCodeBadge>{booking.code}</BookingCodeBadge>
          <HeaderInfo>
            <HeaderTitle>
              {t('reservationDetail.reservationOf', {
                name: booking.guestName || '—',
              })}
            </HeaderTitle>
            <HeaderMeta>
              <Icon sx={{ fontSize: 14 }}>calendar_today</Icon>
              {booking.createdAt
                ? t('reservationDetail.receivedOn', {
                    date: `${formatDate(booking.createdAt, 'medium')}`,
                  })
                : ''}
              <span>&middot;</span>
              <StatusChip status={booking.status as any} />
            </HeaderMeta>
          </HeaderInfo>
        </HeaderRow>

        {/* Botones de acción solo para reservas pendientes */}
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
                <GuestName>{booking.guestName || '—'}</GuestName>
                <ContactsRow>
                  {booking.guestEmail && (
                    <ContactRow>
                      <EmailIcon sx={{ fontSize: 14, color: palette.primary }} />
                      {booking.guestEmail}
                    </ContactRow>
                  )}
                  {booking.guestPhone && (
                    <ContactRow>
                      <PhoneIcon sx={{ fontSize: 14, color: palette.primary }} />
                      {booking.guestPhone}
                    </ContactRow>
                  )}
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
                  value: formatDate(booking.checkIn, 'medium'),
                  sub: t('reservationDetail.from', { time: '3:00 PM' }),
                },
                {
                  label: t('reservationDetail.checkOut'),
                  value: formatDate(booking.checkOut, 'medium'),
                  sub: t('reservationDetail.until', { time: '12:00 PM' }),
                },
                {
                  label: t('reservationDetail.duration'),
                  value: t('reservationDetail.nightsCount', { count: booking.nights }),
                  sub: t('reservationDetail.hours', { count: booking.nights * 24 }),
                },
                {
                  label: t('reservationDetail.guests'),
                  value: t('reservationDetail.adults', { count: booking.guests }),
                  sub: t('reservationDetail.noMinors'),
                },
              ]}
            />
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
              {pb ? (
                <>
                  <PriceRow>
                    <Text textVariant="hint">
                      {t('reservationDetail.roomNights', { count: pb.nights })}
                    </Text>
                    <PriceLineLabel sx={{ color: palette.onSurface }}>
                      {formatPrice(pb.basePrice)}
                    </PriceLineLabel>
                  </PriceRow>
                  {pb.vat > 0 && (
                    <PriceRow>
                      <Text textVariant="hint">{t('reservationDetail.taxIVA')}</Text>
                      <PriceLineLabel sx={{ color: palette.onSurface }}>
                        {formatPrice(pb.vat)}
                      </PriceLineLabel>
                    </PriceRow>
                  )}
                  {pb.serviceFee > 0 && (
                    <PriceRow>
                      <Text textVariant="hint">{t('reservationDetail.serviceCharge')}</Text>
                      <PriceLineLabel sx={{ color: palette.onSurface }}>
                        {formatPrice(pb.serviceFee)}
                      </PriceLineLabel>
                    </PriceRow>
                  )}
                </>
              ) : null}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              <PriceRow>
                <PriceLineLabel sx={{ fontWeight: 700, color: palette.onSurface }}>
                  {t('reservationDetail.totalCharged')}
                </PriceLineLabel>
                <Text textVariant="priceSmall">
                  {formatPrice(pb ? pb.totalPrice : booking.totalPrice)}
                </Text>
              </PriceRow>
            </PriceBreakdownStack>

            {booking.status === 'confirmed' && (
              <ApprovedBadge sx={{ mt: '12px' }}>
                <CheckCircleIcon sx={{ fontSize: 13 }} />
                {t('reservationDetail.approved')}
              </ApprovedBadge>
            )}
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
