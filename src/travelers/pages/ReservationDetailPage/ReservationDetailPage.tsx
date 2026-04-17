import React, { useState, useEffect } from 'react';
import { useBookingDetail, useBookingPayments } from '@/api/hooks/useBookings';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import Text from '@/design-system/components/Text';
import { Link } from 'react-router-dom';
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
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import StatusChip from '@/design-system/components/StatusChip';
import ReservationDetailPageSkeleton from './ReservationDetailPage.skeleton';
import SectionCard from '@/design-system/components/SectionCard';
import InfoGrid from '@/design-system/components/InfoGrid';
import RatingBadge from '@/design-system/components/RatingBadge';
import ModalOverlay from '@/design-system/components/ModalOverlay';
import {
  PrimaryPillButton,
  OutlinedPillButton,
  ErrorOutlinedPillButton,
  ErrorPillButton,
  SuccessPillButton,
  NeutralOutlinedPillButton,
} from '@/design-system/components/PillButton';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  success,
  successContainer,
  error,
  star,
  errorContainer,
} from '@/design-system/theme/palette';
import {
  ThreeColumnLayout,
  CenterPanel,
  MainContent,
  UserSidebarContainer,
  UserCard,
  UserAvatar,
  SidebarSectionTitle,
  SidebarMenuItem,
  MenuItemLabel,
  MenuItemBadge,
  SidebarDivider,
  SidebarBottomItem,
  RightSidebarContainer,
  PriceSummaryTitle,
  PriceRowsList,
  PriceRow,
  PriceRowValue,
  CancelBox,
  CancelBoxHeader,
  CancelBoxTitle,
  PageHeaderRow,
  PageTitle,
  BookingCodeRow,
  ModalTriggerRow,
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
  ModalEmailBanner,
  ModalEmailTitle,
  ModalSummarySection,
  ModalSectionLabel,
  ModalRow,
  ModalRowValue,
  ModalTotalLabel,
  ModalTotalValue,
  NextStepRow,
  NextStepIcon,
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
  const { isLoading: isBookingLoading } = useBookingDetail(1);
  const { isLoading: isPaymentsLoading } = useBookingPayments(1);

  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate, language } = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modal = params.get('modal');
    if (modal === 'confirmation') setConfirmedOpen(true);
    if (modal === 'cancel') setCancelOpen(true);
  }, []);

  if (isBookingLoading) return <ReservationDetailPageSkeleton />;

  /* ─── Left Sidebar ─── */
  const UserSidebar: React.FC = () => {
    const menuItems = [
      {
        icon: <LuggageIcon sx={{ fontSize: 20 }} />,
        label: t('myReservations.sidebar.myReservations'),
        active: true,
        badge: '3',
      },
    ];

    const bottomItems = [
      { icon: <LogoutIcon sx={{ fontSize: 20 }} />, label: t('myReservations.sidebar.logout') },
    ];

    return (
      <UserSidebarContainer>
        {/* User card */}
        <UserCard>
          <UserAvatar>C</UserAvatar>
          <div>
            <Text textVariant="bodySemibold">Carlos Mart&iacute;nez</Text>
            <Text textVariant="caption">carlos.m@email.com</Text>
          </div>
        </UserCard>

        {/* Section title */}
        <SidebarSectionTitle>{t('myReservations.sidebar.myAccount')}</SidebarSectionTitle>

        {/* Menu items */}
        {menuItems.map(item => (
          <SidebarMenuItem
            key={item.label}
            active={item.active}
            component={item.active ? Link : 'div'}
            {...(item.active ? { to: '/reservations' } : {})}
          >
            {item.icon}
            <MenuItemLabel>{item.label}</MenuItemLabel>
            {item.badge && <MenuItemBadge>{item.badge}</MenuItemBadge>}
          </SidebarMenuItem>
        ))}

        {/* Divider */}
        <SidebarDivider />

        {/* Bottom items */}
        {bottomItems.map(item => (
          <SidebarBottomItem key={item.label}>
            {item.icon}
            <MenuItemLabel>{item.label}</MenuItemLabel>
          </SidebarBottomItem>
        ))}

        <Text textVariant="caption" sx={{ textAlign: 'center', opacity: 0.5 }}>
          v{__APP_VERSION__}
        </Text>
      </UserSidebarContainer>
    );
  };

  /* ─── Right Sidebar ─── */
  const RightSidebar: React.FC = () => (
    <RightSidebarContainer>
      {/* Price summary */}
      <PriceSummaryTitle>{t('reservationDetail.priceSummary.title')}</PriceSummaryTitle>

      <PriceRowsList>
        {[
          {
            label: `${formatPrice(480000)} \u00D7 5 ${t('reservationDetail.priceSummary.nightsLabel')}`,
            value: formatPrice(2400000),
          },
          { label: t('reservationDetail.priceSummary.tourismTax'), value: formatPrice(96000) },
          { label: t('reservationDetail.priceSummary.vat'), value: formatPrice(168000) },
        ].map(row => (
          <PriceRow key={row.label}>
            <Text textVariant="body">{row.label}</Text>
            <PriceRowValue>{row.value}</PriceRowValue>
          </PriceRow>
        ))}
        <Divider sx={{ borderColor: outlineVariant }} />
        <PriceRow>
          <Text textVariant="panelTitle">{t('reservationDetail.priceSummary.totalPaid')}</Text>
          <Text textVariant="price">{formatPrice(2664000)}</Text>
        </PriceRow>
      </PriceRowsList>

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
          <strong style={{ color: success }}>{formatPrice(2664000)}</strong>
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
      <OutlinedPillButton
        pillSize="sm"
        sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <DownloadIcon sx={{ fontSize: 16 }} />
        {t('reservationDetail.downloadReceipt')}
      </OutlinedPillButton>
    </RightSidebarContainer>
  );

  /* ─── Confirmed Modal ─── */
  const ReservationConfirmedModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => (
    <ModalOverlay
      open={open}
      onClose={onClose}
      icon={<CheckCircleIcon sx={{ fontSize: 24, color: success }} />}
      iconBg={successContainer}
      title={t('reservationDetail.confirmedModal.title')}
      subtitle={t('reservationDetail.confirmedModal.subtitle')}
      footer={
        <>
          <NeutralOutlinedPillButton onClick={onClose} pillSize="xs">
            {t('reservationDetail.confirmedModal.close')}
          </NeutralOutlinedPillButton>
          <PrimaryPillButton
            component={Link}
            to="/reservations"
            pillSize="xs"
            sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LuggageIcon sx={{ fontSize: 16 }} />
            {t('reservationDetail.confirmedModal.viewReservations')}
          </PrimaryPillButton>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Email banner */}
        <ModalEmailBanner>
          <MarkEmailReadIcon sx={{ fontSize: 22, color: primary }} />
          <div>
            <ModalEmailTitle>{t('reservationDetail.confirmedModal.emailSent')}</ModalEmailTitle>
            <Text textVariant="caption">carlos.mendoza@email.com</Text>
          </div>
        </ModalEmailBanner>

        {/* Booking summary section */}
        <ModalSummarySection>
          <ModalSectionLabel>
            {t('reservationDetail.confirmedModal.bookingSummary')}
          </ModalSectionLabel>
          {[
            {
              label: t('reservationDetail.confirmedModal.hotel'),
              value: 'Hotel Santa Clara Sofitel',
            },
            {
              label: t('reservationDetail.confirmedModal.checkIn'),
              value: `${formatDate('2026-03-15T15:00:00', 'mediumWithDay')} \u2014 ${new Date('2026-03-15T15:00:00').toLocaleTimeString(language === 'ES' ? 'es' : 'en', { hour: 'numeric', minute: '2-digit' })}`,
            },
            {
              label: t('reservationDetail.confirmedModal.checkOut'),
              value: `${formatDate('2026-03-20T12:00:00', 'mediumWithDay')} \u2014 ${new Date('2026-03-20T12:00:00').toLocaleTimeString(language === 'ES' ? 'es' : 'en', { hour: 'numeric', minute: '2-digit' })}`,
            },
            { label: t('reservationDetail.confirmedModal.duration'), value: '5 noches' },
            {
              label: t('reservationDetail.confirmedModal.room'),
              value: 'Habitaci\u00f3n Superior',
            },
            { label: t('reservationDetail.confirmedModal.guests'), value: '2 adultos' },
          ].map(row => (
            <ModalRow key={row.label}>
              <Text textVariant="hint">{row.label}</Text>
              <ModalRowValue>{row.value}</ModalRowValue>
            </ModalRow>
          ))}
          <Divider sx={{ borderColor: outlineVariant, my: '4px' }} />
          <ModalRow>
            <ModalTotalLabel>{t('reservationDetail.confirmedModal.total')}</ModalTotalLabel>
            <ModalTotalValue>{formatPrice(2664000)}</ModalTotalValue>
          </ModalRow>
        </ModalSummarySection>

        {/* Next steps */}
        <ModalSummarySection>
          <ModalSectionLabel>{t('reservationDetail.confirmedModal.whatsNext')}</ModalSectionLabel>
          {[
            {
              icon: <EmailIcon sx={{ fontSize: 14, color: success }} />,
              text: t('reservationDetail.confirmedModal.voucherSent'),
            },
            {
              icon: <MeetingRoomIcon sx={{ fontSize: 14, color: success }} />,
              text: t('reservationDetail.confirmedModal.roomReserved'),
            },
          ].map((step, i) => (
            <NextStepRow key={i}>
              <NextStepIcon>{step.icon}</NextStepIcon>
              <Text
                textVariant="hint"
                sx={{ lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            </NextStepRow>
          ))}
        </ModalSummarySection>
      </Box>
    </ModalOverlay>
  );

  /* ─── Cancel Modal ─── */
  const ReservationCancelModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => (
    <ModalOverlay
      open={open}
      onClose={onClose}
      icon={<CancelIcon sx={{ fontSize: 24, color: error }} />}
      iconBg={errorContainer}
      title={t('reservationDetail.cancelModal.title')}
      subtitle={t('reservationDetail.cancelModal.subtitle')}
      footer={
        <>
          <NeutralOutlinedPillButton onClick={onClose} pillSize="xs">
            {t('reservationDetail.cancelModal.goBack')}
          </NeutralOutlinedPillButton>
          <ErrorPillButton pillSize="xs" sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CancelIcon sx={{ fontSize: 16 }} />
            {t('reservationDetail.cancelModal.confirmCancellation')}
          </ErrorPillButton>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Cancellation policy section */}
        <ModalSummarySection>
          <ModalSectionLabel>{t('reservationDetail.cancelModal.policyApplied')}</ModalSectionLabel>
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
              value: formatPrice(2664000),
              color: onSurface,
            },
            {
              label: t('reservationDetail.cancelModal.cancellationPenalty'),
              value: `-${formatPrice(0)}`,
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
            <RefundTotalValue>{formatPrice(2664000)}</RefundTotalValue>
          </RefundTotalBox>
        </ModalSummarySection>

        {/* Refund method */}
        <RefundMethodBox>
          <RefundMethodIcon>
            <CreditCardIcon sx={{ fontSize: 16, color: '#fff' }} />
          </RefundMethodIcon>
          <div>
            <RefundMethodTitle>{t('reservationDetail.cancelModal.refundMethod')}</RefundMethodTitle>
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
              <Link
                to="/reservations"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 14,
                  color: primary,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                {t('reservationDetail.backToReservations')}
              </Link>

              <PageHeaderRow>
                <PageTitle>{t('reservationDetail.title')}</PageTitle>
                <StatusChip status="confirmed" />
              </PageHeaderRow>

              <BookingCodeRow>
                <Text textVariant="body">
                  {t('reservationDetail.bookingCode')}{' '}
                  <strong style={{ color: primary, fontWeight: 600 }}>TH-2026-48291</strong>
                </Text>
              </BookingCodeRow>

              {/* Trigger buttons for modals */}
              <ModalTriggerRow>
                <SuccessPillButton onClick={() => setConfirmedOpen(true)} pillSize="xxs">
                  <CheckCircleIcon sx={{ fontSize: 14, mr: '4px' }} />
                  {t('reservationDetail.viewConfirmation')}
                </SuccessPillButton>
              </ModalTriggerRow>
            </div>

            {/* Hotel info section */}
            <SectionCard
              icon={<HotelIcon sx={{ color: primary }} />}
              title={t('reservationDetail.accommodation')}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Hotel row */}
                <HotelRow>
                  <HotelThumbnail />
                  <HotelInfoColumn>
                    <Text textVariant="overline">{t('reservationDetail.hotelType')}</Text>
                    <Text textVariant="sectionTitle">Hotel Santa Clara Sofitel</Text>
                    <LocationRow>
                      <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                      <Text textVariant="hint">
                        Calle del Torno #39-29, Centro Hist&oacute;rico, Cartagena
                      </Text>
                    </LocationRow>
                    <HotelRatingRow>
                      <RatingBadge rating={4.8} />
                      <Typography sx={{ color: star, fontSize: 13 }}>
                        &#9733;&#9733;&#9733;&#9733;&#9733;
                      </Typography>
                      <Text textVariant="caption">312 {t('reservationDetail.reviews')}</Text>
                    </HotelRatingRow>
                  </HotelInfoColumn>
                </HotelRow>

                <Divider sx={{ borderColor: outlineVariant }} />

                {/* Info grid */}
                <InfoGrid
                  columns={4}
                  items={[
                    {
                      label: t('reservationDetail.infoGrid.checkIn'),
                      value: formatDate('2026-03-15', 'mediumWithDay'),
                      sub: '3:00 PM',
                    },
                    {
                      label: t('reservationDetail.infoGrid.checkOut'),
                      value: formatDate('2026-03-20', 'mediumWithDay'),
                      sub: '12:00 PM',
                    },
                    {
                      label: t('reservationDetail.infoGrid.duration'),
                      value: t('reservationDetail.infoGrid.durationValue'),
                      sub: t('reservationDetail.infoGrid.durationSub'),
                    },
                    {
                      label: t('reservationDetail.infoGrid.guests'),
                      value: t('reservationDetail.infoGrid.guestsValue'),
                      sub: t('reservationDetail.infoGrid.guestsSub'),
                    },
                  ]}
                />

                {/* Room row */}
                <RoomRow>
                  <RoomThumbnail />
                  <Box sx={{ flex: 1 }}>
                    <Text textVariant="cardSubheading" sx={{ mb: '4px' }}>
                      Habitaci&oacute;n Superior
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
              ) : (
                <Box sx={{ gap: 0, padding: '0' }}>
                  <PaymentRow>
                    <PaymentIcon>
                      <CheckCircleIcon sx={{ fontSize: 20, color: success }} />
                    </PaymentIcon>
                    <Box sx={{ flex: 1 }}>
                      <Text textVariant="bodyMedium">
                        {t('reservationDetail.paymentHistory.bookingPayment')}
                      </Text>
                      <Text textVariant="caption">
                        {formatDate('2026-02-15', 'medium')} &middot; 10:34 a.m.
                      </Text>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CreditCardIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                        <Text textVariant="caption">VISA &bull;&bull;&bull;&bull; 4242</Text>
                      </Box>
                    </Box>
                    <PaymentRightCol>
                      <PaymentAmount>{formatPrice(2664000)}</PaymentAmount>
                      <PaymentBadge>{t('reservationDetail.paymentHistory.approved')}</PaymentBadge>
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
      <ReservationConfirmedModal open={confirmedOpen} onClose={() => setConfirmedOpen(false)} />
      <ReservationCancelModal open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </TravelerLayout>
  );
};

export default ReservationDetailPage;
