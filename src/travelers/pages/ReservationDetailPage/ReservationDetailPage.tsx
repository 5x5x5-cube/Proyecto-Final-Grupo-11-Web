import React, { useState, useEffect } from 'react';
import BookingNextSteps from '@/travelers/components/BookingNextSteps';
import { useBookingDetail, useCancelBooking } from '@/api/hooks/useBookings';
import { useHotelDetail } from '@/api/hooks/useSearch';
import { usePaymentStatus } from '@/api/hooks/usePayments';
import { Box, Divider, Skeleton } from '@mui/material';
import Text from '@/design-system/components/Text';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HotelIcon from '@mui/icons-material/Hotel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import LocalBarIcon from '@mui/icons-material/LocalBar';

import ScheduleIcon from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import StatusChip from '@/design-system/components/StatusChip';
import UserSidebar from '@/travelers/components/UserSidebar';
import ReservationDetailPageSkeleton from './ReservationDetailPage.skeleton';
import SectionCard from '@/design-system/components/SectionCard';
import InfoGrid from '@/design-system/components/InfoGrid';
import RatingBadge from '@/design-system/components/RatingBadge';
import ModalOverlay from '@/design-system/components/ModalOverlay';
import {
  ErrorOutlinedPillButton,
  ErrorPillButton,
  NeutralOutlinedPillButton,
} from '@/design-system/components/PillButton';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  success,
  successContainer,
  warning,
  warningContainer,
  error,
  errorContainer,
} from '@/design-system/theme/palette';
import {
  ThreeColumnLayout,
  CenterPanel,
  MainContent,
  RightSidebarContainer,
  PriceSummaryTitle,
  PriceRowsList,
  PriceRow,
  PriceRowValue,
  CancelBox,
  CancelBoxHeader,
  CancelBoxTitle,
  BackLink,
  PageHeaderRow,
  PageTitle,
  BookingCodeRow,
  HotelRow,
  HotelThumbnail,
  HotelInfoColumn,
  HotelRatingRow,
  LocationRow,
  RoomRow,
  RoomThumbnail,
  RoomAmenityTag,
  PaymentRow,
  PaymentIcon,
  PaymentAmount,
  PaymentBadge,
  PaymentRightCol,
  ModalSummarySection,
  ModalSectionLabel,
  ModalRow,
  CancelModalRowValue,
  RefundTotalBox,
  RefundTotalLabel,
  RefundTotalValue,
  RefundMethodBox,
  RefundMethodIcon,
  RefundMethodTitle,
  RefundMethodCaption,
  TimelineRow,
} from './ReservationDetailPage.styles';

/* ─── Main Page ─── */
const ReservationDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: booking, isLoading: isBookingLoading } = useBookingDetail(id);
  const payment = usePaymentStatus(booking?.paymentId ?? '');
  const paymentData = payment.data;
  const isPaymentsLoading = payment.isLoading;
  const { data: hotelData } = useHotelDetail(booking?.hotelId ?? '');

  const [cancelOpen, setCancelOpen] = useState(false);
  const { t } = useTranslation('travelers');
  const { formatFixedPrice, formatDate } = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modal = params.get('modal');
    if (modal === 'cancel') setCancelOpen(true);
  }, []);

  if (isBookingLoading || !booking) return <ReservationDetailPageSkeleton />;

  const nights =
    booking.nights ??
    Math.max(
      1,
      Math.round(
        (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000
      )
    );

  const fp = (amount: number) => formatFixedPrice(amount, booking.currency);

  const breakdown = booking.priceBreakdown;
  const pricePerNight = breakdown?.pricePerNight ?? Math.round(booking.totalPrice / nights);
  const basePrice = breakdown?.basePrice ?? booking.totalPrice;
  const vat = breakdown?.vat ?? 0;
  const serviceFee = breakdown?.serviceFee ?? 0;

  /* ─── Right Sidebar ─── */
  const RightSidebar: React.FC = () => (
    <RightSidebarContainer>
      {/* Price summary */}
      <PriceSummaryTitle>{t('reservationDetail.priceSummary.title')}</PriceSummaryTitle>

      <PriceRowsList>
        {[
          {
            label: `${fp(pricePerNight)} \u00D7 ${nights} ${t('reservationDetail.priceSummary.nightsLabel')}`,
            value: fp(basePrice),
          },
          ...(vat > 0 ? [{ label: t('reservationDetail.priceSummary.vat'), value: fp(vat) }] : []),
          ...(serviceFee > 0
            ? [
                {
                  label: t('reservationDetail.priceSummary.tourismTax'),
                  value: fp(serviceFee),
                },
              ]
            : []),
        ].map(row => (
          <PriceRow key={row.label}>
            <Text textVariant="body">{row.label}</Text>
            <PriceRowValue>{row.value}</PriceRowValue>
          </PriceRow>
        ))}
        <Divider sx={{ borderColor: outlineVariant }} />
        <PriceRow>
          <Text textVariant="panelTitle">{t('reservationDetail.priceSummary.totalPaid')}</Text>
          <Text textVariant="price">{fp(booking.totalPrice)}</Text>
        </PriceRow>
      </PriceRowsList>

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Next steps */}
      <BookingNextSteps
        status={booking.status}
        hotelName={booking.hotelName ?? undefined}
        roomName={booking.roomName ?? undefined}
      />

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Cancel box */}
      <CancelBox>
        <CancelBoxHeader>
          <CancelIcon sx={{ fontSize: 18, color: error }} />
          <CancelBoxTitle>{t('reservationDetail.cancelBox.title')}</CancelBoxTitle>
        </CancelBoxHeader>
        <Text
          textVariant="hint"
          sx={{ lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: t('reservationDetail.cancelBox.description') }}
        />
        <Text textVariant="bodyMedium">
          {t('reservationDetail.cancelBox.estimatedRefund')}{' '}
          <strong>{fp(booking.totalPrice)}</strong>
        </Text>
        <ErrorOutlinedPillButton
          onClick={() => setCancelOpen(true)}
          pillSize="md"
          sx={{ width: '100%' }}
        >
          {t('reservationDetail.cancelBox.cancelButton')}
        </ErrorOutlinedPillButton>
      </CancelBox>

      {/* Download button */}
    </RightSidebarContainer>
  );

  /* ─── Cancel Modal ─── */
  const ReservationCancelModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => {
    const cancelBooking = useCancelBooking();
    const navigate = useNavigate();

    const handleConfirm = () => {
      cancelBooking.mutate(id, {
        onSuccess: () => {
          onClose();
          navigate('/reservations');
        },
      });
    };

    return (
      <ModalOverlay
        open={open}
        onClose={onClose}
        icon={<CancelIcon sx={{ fontSize: 24, color: error }} />}
        iconBg={errorContainer}
        title={t('reservationDetail.cancelModal.title')}
        subtitle={t('reservationDetail.cancelModal.subtitle')}
        footer={
          <>
            <NeutralOutlinedPillButton
              onClick={onClose}
              disabled={cancelBooking.isPending}
              pillSize="xs"
            >
              {t('reservationDetail.cancelModal.goBack')}
            </NeutralOutlinedPillButton>
            <ErrorPillButton
              onClick={handleConfirm}
              disabled={cancelBooking.isPending}
              pillSize="xs"
              sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CancelIcon sx={{ fontSize: 16 }} />
              {t('reservationDetail.cancelModal.confirmCancellation')}
            </ErrorPillButton>
          </>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Cancellation policy section */}
          <ModalSummarySection>
            <ModalSectionLabel>
              {t('reservationDetail.cancelModal.policyApplied')}
            </ModalSectionLabel>
            {[
              {
                label: t('reservationDetail.cancelModal.cancellationType'),
                value: t('reservationDetail.cancelModal.cancellationTypeValue'),
                color: success,
              },
              {
                label: t('reservationDetail.cancelModal.deadlineLabel'),
                value: formatDate('2026-03-12', 'medium'),
                color: onSurface,
              },
              {
                label: t('reservationDetail.cancelModal.currentDateLabel'),
                value: formatDate('2026-03-05', 'medium'),
                color: onSurface,
              },
              {
                label: t('reservationDetail.cancelModal.penaltyApplied'),
                value: t('reservationDetail.cancelModal.penaltyValue'),
                color: success,
              },
            ].map(row => (
              <ModalRow key={row.label}>
                <Text textVariant="hint">{row.label}</Text>
                <CancelModalRowValue color={row.color}>{row.value}</CancelModalRowValue>
              </ModalRow>
            ))}
          </ModalSummarySection>

          {/* Refund breakdown section */}
          <ModalSummarySection>
            <ModalSectionLabel>
              {t('reservationDetail.cancelModal.refundBreakdown')}
            </ModalSectionLabel>
            {[
              {
                label: t('reservationDetail.cancelModal.originalAmount'),
                value: fp(booking.totalPrice),
                color: onSurface,
              },
              {
                label: t('reservationDetail.cancelModal.cancellationPenalty'),
                value: `-${fp(0)}`,
                color: success,
              },
            ].map(row => (
              <ModalRow key={row.label}>
                <Text textVariant="hint">{row.label}</Text>
                <CancelModalRowValue color={row.color}>{row.value}</CancelModalRowValue>
              </ModalRow>
            ))}
            <Divider sx={{ borderColor: outlineVariant, my: '4px' }} />
            <RefundTotalBox>
              <RefundTotalLabel>{t('reservationDetail.cancelModal.totalRefund')}</RefundTotalLabel>
              <RefundTotalValue>{fp(booking.totalPrice)}</RefundTotalValue>
            </RefundTotalBox>
          </ModalSummarySection>

          {/* Refund method */}
          <RefundMethodBox>
            <RefundMethodIcon>
              <CreditCardIcon sx={{ fontSize: 16, color: '#fff' }} />
            </RefundMethodIcon>
            <div>
              <RefundMethodTitle>
                {t('reservationDetail.cancelModal.refundMethod')}
              </RefundMethodTitle>
              <RefundMethodCaption>
                {t('reservationDetail.cancelModal.samePaymentMethod')}
              </RefundMethodCaption>
            </div>
          </RefundMethodBox>

          {/* Timeline */}
          <TimelineRow>
            <ScheduleIcon sx={{ fontSize: 16, color: primary }} />
            <Text
              textVariant="caption"
              dangerouslySetInnerHTML={{ __html: t('reservationDetail.cancelModal.estimatedTime') }}
            />
          </TimelineRow>
        </Box>
      </ModalOverlay>
    );
  };

  const roomAmenities = [
    { icon: <WifiIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.wifi') },
    {
      icon: <FreeBreakfastIcon sx={{ fontSize: 12 }} />,
      label: t('reservationDetail.roomAmenities.breakfast'),
    },
    { icon: <AcUnitIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.ac') },
    { icon: <TvIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.smartTv') },
    {
      icon: <LocalBarIcon sx={{ fontSize: 12 }} />,
      label: t('reservationDetail.roomAmenities.minibar'),
    },
  ];

  return (
    <TravelerLayout variant="reservations">
      <ThreeColumnLayout>
        {/* Left sidebar */}
        <UserSidebar />

        {/* Center: main content + right sidebar */}
        <CenterPanel>
          {/* Main content */}
          <MainContent>
            {/* Page header */}
            <div>
              <BackLink component={Link} to="/reservations">
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                {t('reservationDetail.backToReservations')}
              </BackLink>

              <PageHeaderRow>
                <PageTitle>{t('reservationDetail.title')}</PageTitle>
                <StatusChip status={booking.status} />
              </PageHeaderRow>

              <BookingCodeRow>
                <Text textVariant="body">
                  {t('reservationDetail.bookingCode')} <strong>{booking.code}</strong>
                </Text>
              </BookingCodeRow>
            </div>

            {/* Hotel info section */}
            <SectionCard
              icon={<HotelIcon sx={{ color: primary }} />}
              title={t('reservationDetail.accommodation')}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Hotel row */}
                <HotelRow>
                  <HotelThumbnail $imageUrl={(hotelData as any)?.image_url} />
                  <HotelInfoColumn>
                    <Text textVariant="overline">{t('reservationDetail.hotelType')}</Text>
                    <Text textVariant="sectionTitle">{booking.hotelName ?? '—'}</Text>
                    <LocationRow>
                      <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                      <Text textVariant="hint">{booking.location ?? '—'}</Text>
                    </LocationRow>
                    {(hotelData as any)?.rating && (
                      <HotelRatingRow>
                        <RatingBadge rating={(hotelData as any).rating} showStars="single" />
                      </HotelRatingRow>
                    )}
                  </HotelInfoColumn>
                </HotelRow>

                <Divider sx={{ borderColor: outlineVariant }} />

                {/* Info grid */}
                <InfoGrid
                  columns={4}
                  items={[
                    {
                      label: t('reservationDetail.infoGrid.checkIn'),
                      value: formatDate(booking.checkIn, 'mediumWithDay'),
                      sub: '3:00 PM',
                    },
                    {
                      label: t('reservationDetail.infoGrid.checkOut'),
                      value: formatDate(booking.checkOut, 'mediumWithDay'),
                      sub: '12:00 PM',
                    },
                    {
                      label: t('reservationDetail.infoGrid.duration'),
                      value: t('reservationDetail.infoGrid.nightsCount', { count: nights }),
                      sub: `${formatDate(booking.checkIn, 'medium')} — ${formatDate(booking.checkOut, 'medium')}`,
                    },
                    {
                      label: t('reservationDetail.infoGrid.guests'),
                      value: t('reservationDetail.infoGrid.guestsCount', {
                        count: booking.guests,
                      }),
                      sub: booking.guestName
                        ? `${booking.guestName} ${t('reservationDetail.infoGrid.holderSuffix')}`
                        : undefined,
                    },
                  ]}
                />

                {/* Room row */}
                <RoomRow>
                  <RoomThumbnail $imageUrl={(hotelData as any)?.image_url} />
                  <Box sx={{ flex: 1 }}>
                    <Text textVariant="cardSubheading" sx={{ mb: '4px' }}>
                      {booking.roomName ?? '—'}
                    </Text>
                    <Text textVariant="hint">{t('reservationDetail.roomFeatures')}</Text>
                    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mt: '6px' }}>
                      {roomAmenities.map(amenity => (
                        <RoomAmenityTag key={amenity.label}>
                          {amenity.icon}
                          {amenity.label}
                        </RoomAmenityTag>
                      ))}
                    </Box>
                  </Box>
                </RoomRow>
              </Box>
            </SectionCard>

            {/* Payment history section */}
            <SectionCard
              icon={<ReceiptLongIcon sx={{ color: primary }} />}
              title={t('reservationDetail.paymentHistory.title')}
            >
              {isPaymentsLoading ? (
                <PaymentRow>
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton animation="wave" variant="text" width={200} height={20} />
                    <Skeleton animation="wave" variant="text" width={140} height={16} />
                    <Skeleton animation="wave" variant="text" width={100} height={16} />
                  </Box>
                  <PaymentRightCol>
                    <Skeleton animation="wave" variant="text" width={80} height={24} />
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={70}
                      height={20}
                      sx={{ borderRadius: '100px' }}
                    />
                  </PaymentRightCol>
                </PaymentRow>
              ) : !booking.paymentId || (!isPaymentsLoading && !paymentData) ? (
                <Box sx={{ padding: '14px 0' }}>
                  <Text textVariant="hint" sx={{ color: onSurfaceVariant }}>
                    {t('reservationDetail.paymentHistory.pendingPayment')}
                  </Text>
                </Box>
              ) : (
                <Box sx={{ gap: 0, padding: '0' }}>
                  <PaymentRow>
                    <PaymentIcon>
                      {paymentData?.status === 'declined' ? (
                        <CancelIcon sx={{ fontSize: 20, color: error }} />
                      ) : paymentData?.status === 'processing' ? (
                        <ScheduleIcon sx={{ fontSize: 20, color: warning }} />
                      ) : (
                        <CheckCircleIcon sx={{ fontSize: 20, color: success }} />
                      )}
                    </PaymentIcon>
                    <Box sx={{ flex: 1 }}>
                      <Text textVariant="bodyMedium">
                        {t('reservationDetail.paymentHistory.bookingPayment')}
                      </Text>
                      <Text textVariant="caption">
                        {paymentData?.processedAt
                          ? formatDate(paymentData.processedAt, 'medium')
                          : booking.createdAt
                            ? formatDate(booking.createdAt, 'medium')
                            : '—'}
                      </Text>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CreditCardIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                        <Text textVariant="caption">
                          {paymentData?.paymentMethod?.displayLabel ?? '—'}
                        </Text>
                      </Box>
                    </Box>
                    <PaymentRightCol>
                      <PaymentAmount>
                        {paymentData
                          ? formatFixedPrice(paymentData.amount, paymentData.currency)
                          : fp(booking.totalPrice)}
                      </PaymentAmount>
                      {paymentData?.status === 'approved' && (
                        <PaymentBadge sx={{ background: successContainer, color: success }}>
                          {t('reservationDetail.paymentHistory.approved')}
                        </PaymentBadge>
                      )}
                      {paymentData?.status === 'processing' && (
                        <PaymentBadge sx={{ background: warningContainer, color: warning }}>
                          {t('reservationDetail.paymentHistory.processing')}
                        </PaymentBadge>
                      )}
                      {paymentData?.status === 'declined' && (
                        <PaymentBadge sx={{ background: errorContainer, color: error }}>
                          {t('reservationDetail.paymentHistory.declined')}
                        </PaymentBadge>
                      )}
                    </PaymentRightCol>
                  </PaymentRow>
                </Box>
              )}
            </SectionCard>
          </MainContent>

          {/* Right sidebar */}
          <RightSidebar />
        </CenterPanel>
      </ThreeColumnLayout>

      {/* Modals */}
      <ReservationCancelModal open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </TravelerLayout>
  );
};

export default ReservationDetailPage;
