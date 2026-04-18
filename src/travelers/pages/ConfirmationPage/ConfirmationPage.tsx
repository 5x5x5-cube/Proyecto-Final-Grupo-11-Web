import React from 'react';
import { Box, CircularProgress, Divider, Skeleton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import InfoGrid from '@/design-system/components/InfoGrid';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import { usePaymentStatus } from '@/api/hooks/usePayments';
import { useBookingByPaymentId } from '@/api/hooks/useBookings';
import { useCart } from '@/api/hooks/useCart';
import {
  ContentWrapper,
  SuccessIconCircle,
  ConfirmationTitle,
  ConfirmationSubtitle,
  BookingCodeCard,
  BookingCodeLabel,
  BookingCodeValue,
  EmailNoticePill,
  EmailNoticeText,
  ActionButtonsRow,
  SidebarRoot,
  SidebarTitle,
  HotelMiniCard,
  HotelThumbnail,
  HotelTypeLabel,
  HotelNameText,
  PaymentRow,
  PaymentAmount,
  PaymentSuccessPill,
  PaymentSuccessText,
  StepsList,
  StepCircle,
  StepNumber,
} from './ConfirmationPage.styles';

/* --- Sidebar --- */
interface SidebarProps {
  paymentId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ paymentId }) => {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const { data: cart, isLoading: isCartLoading } = useCart();
  const { data: paymentData, isLoading: isPaymentLoading } = usePaymentStatus(paymentId);
  const { data: bookingData } = useBookingByPaymentId(paymentId);

  const booking = bookingData?.data?.[0];

  const hotelName = cart?.hotelName || booking?.hotelName || '';
  const hotelType = cart?.hotelType || t('confirmation.sidebar.hotelType');
  const location = cart?.location || '';
  const checkIn = cart?.checkIn || '';
  const checkOut = cart?.checkOut || '';
  const roomName = cart?.roomName || t('confirmation.sidebar.roomValue');
  const roomFeatures = cart?.roomFeatures || t('confirmation.sidebar.roomSub');
  const guests = cart?.guests ?? 2;
  const nights = cart?.nights ?? 0;

  const paymentLabel = paymentData?.paymentMethod?.displayLabel || '';
  const totalAmount = paymentData?.amount ?? cart?.total ?? 0;

  const isLoading = isCartLoading || isPaymentLoading;

  return (
    <SidebarRoot>
      <SidebarTitle>{t('confirmation.sidebar.title')}</SidebarTitle>

      {/* Hotel mini card */}
      {isLoading ? (
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <Skeleton variant="rounded" width={80} height={80} sx={{ borderRadius: '12px' }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" height={16} sx={{ mb: '8px' }} />
            <Skeleton width="80%" height={20} sx={{ mb: '6px' }} />
            <Skeleton width="50%" height={14} />
          </Box>
        </Box>
      ) : (
        <HotelMiniCard>
          <HotelThumbnail />
          <Box>
            <HotelTypeLabel>{hotelType}</HotelTypeLabel>
            <HotelNameText>{hotelName}</HotelNameText>
            {location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <PlaceIcon sx={{ fontSize: 14, color: palette.onSurfaceVariant }} />
                <Text textVariant="hint">{location}</Text>
              </Box>
            )}
          </Box>
        </HotelMiniCard>
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

      {/* Info grid */}
      {isLoading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Box key={i}>
              <Skeleton width="50%" height={12} sx={{ mb: '4px' }} />
              <Skeleton width="80%" height={16} sx={{ mb: '2px' }} />
              <Skeleton width="40%" height={12} />
            </Box>
          ))}
        </Box>
      ) : (
        <InfoGrid
          columns={2}
          items={[
            {
              label: t('confirmation.sidebar.checkIn'),
              value: checkIn ? formatDate(checkIn, 'mediumWithDay') : '--',
              sub: '3:00 PM',
            },
            {
              label: t('confirmation.sidebar.checkOut'),
              value: checkOut ? formatDate(checkOut, 'mediumWithDay') : '--',
              sub: '12:00 PM',
            },
            {
              label: t('confirmation.sidebar.room'),
              value: roomName,
              sub: roomFeatures,
            },
            {
              label: t('confirmation.sidebar.guests'),
              value: `${guests} adultos`,
              sub: nights ? `${nights} noches` : '',
            },
          ]}
        />
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

      {/* Payment summary */}
      {isPaymentLoading ? (
        <Box>
          <Skeleton width="100%" height={24} sx={{ mb: '8px' }} />
          <Skeleton width="40%" height={16} />
        </Box>
      ) : (
        <PaymentRow>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCardIcon sx={{ fontSize: 16, color: palette.primary }} />
              <Text textVariant="hint">{paymentLabel}</Text>
            </Box>
            <PaymentAmount>{formatPrice(totalAmount)}</PaymentAmount>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PaymentSuccessPill>
              <CheckCircleIcon sx={{ fontSize: 14, color: palette.success }} />
              <PaymentSuccessText>{t('confirmation.sidebar.paymentSuccess')}</PaymentSuccessText>
            </PaymentSuccessPill>
          </Box>
        </PaymentRow>
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

      {/* Next steps */}
      <Box>
        <Text textVariant="bodySemibold" sx={{ mb: '12px' }}>
          {t('confirmation.sidebar.nextSteps')}
        </Text>
        <StepsList>
          {[
            { num: '1', text: t('confirmation.sidebar.step1') },
            { num: '2', text: t('confirmation.sidebar.step2') },
            { num: '3', text: t('confirmation.sidebar.step3') },
          ].map(step => (
            <Box key={step.num} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StepCircle>
                <StepNumber>{step.num}</StepNumber>
              </StepCircle>
              <Text
                textVariant="hint"
                sx={{ lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            </Box>
          ))}
        </StepsList>
      </Box>
    </SidebarRoot>
  );
};

/* --- Main Content --- */
const ConfirmationPage: React.FC = () => {
  const { t } = useTranslation('travelers');
  const { paymentId } = useParams<{ paymentId: string }>();

  const { data: bookingData } = useBookingByPaymentId(paymentId ?? '');

  const booking = bookingData?.data?.[0];
  const bookingCode = booking?.code;
  const isBookingLoading = !bookingCode;

  return (
    <CheckoutLayout currentStep={4} sidebar={<Sidebar paymentId={paymentId ?? ''} />}>
      <ContentWrapper>
        <SuccessIconCircle>
          <CheckCircleIcon sx={{ fontSize: 52, color: palette.success }} />
        </SuccessIconCircle>

        <ConfirmationTitle>{t('confirmation.title')}</ConfirmationTitle>

        <ConfirmationSubtitle>{t('confirmation.subtitle')}</ConfirmationSubtitle>

        <BookingCodeCard>
          <BookingCodeLabel>{t('confirmation.bookingNumber')}</BookingCodeLabel>
          {isBookingLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CircularProgress size={18} sx={{ color: palette.primary }} />
              <BookingCodeValue sx={{ fontSize: 18, letterSpacing: 0 }}>
                Generando...
              </BookingCodeValue>
            </Box>
          ) : (
            <BookingCodeValue>{bookingCode}</BookingCodeValue>
          )}
        </BookingCodeCard>

        <EmailNoticePill>
          <MarkEmailReadIcon sx={{ fontSize: 20, color: palette.success }} />
          <EmailNoticeText>{t('confirmation.emailSent')}</EmailNoticeText>
        </EmailNoticePill>

        <ActionButtonsRow>
          <PrimaryPillButton component={Link} to="/reservations" pillSize="md" sx={{ flex: 1 }}>
            {t('confirmation.viewReservations')}
          </PrimaryPillButton>
          <OutlinedPillButton component={Link} to="/" pillSize="md" sx={{ flex: 1 }}>
            {t('confirmation.downloadReceipt')}
          </OutlinedPillButton>
        </ActionButtonsRow>
      </ContentWrapper>
    </CheckoutLayout>
  );
};

export default ConfirmationPage;
