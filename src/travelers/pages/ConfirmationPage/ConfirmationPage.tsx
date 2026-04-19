import React from 'react';
import { Box, CircularProgress, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { usePaymentStatus } from '@/api/hooks/usePayments';
import { useBookingByPaymentId } from '@/api/hooks/useBookings';
import { useCart } from '@/api/hooks/useCart';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import InfoGrid from '@/design-system/components/InfoGrid';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
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
import { CartDetailsSkeleton, PaymentSummarySkeleton } from './ConfirmationSidebarSkeleton';

/* --- Sidebar --- */
const Sidebar: React.FC<{ paymentId: string }> = ({ paymentId }) => {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();
  const { data: payment } = usePaymentStatus(paymentId);
  const { data: cart, pricing } = useCart();

  const cartLoaded = !!cart?.id;
  const paymentLoaded = !!payment;

  return (
    <SidebarRoot>
      <SidebarTitle>{t('confirmation.sidebar.title')}</SidebarTitle>

      {/* Hotel + stay details — depends on cart */}
      {cartLoaded ? (
        <>
          <HotelMiniCard>
            <HotelThumbnail />
            <Box>
              <HotelTypeLabel>{t('confirmation.sidebar.hotelType')}</HotelTypeLabel>
              <HotelNameText>{cart.hotelName || 'Hotel'}</HotelNameText>
              {cart.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PlaceIcon sx={{ fontSize: 14, color: palette.onSurfaceVariant }} />
                  <Text textVariant="hint">{cart.location}</Text>
                </Box>
              )}
            </Box>
          </HotelMiniCard>

          <Divider sx={{ borderColor: palette.outlineVariant }} />

          <InfoGrid
            columns={2}
            items={[
              {
                label: t('confirmation.sidebar.checkIn'),
                value: formatDate(cart.checkIn, 'mediumWithDay'),
                sub: '3:00 PM',
              },
              {
                label: t('confirmation.sidebar.checkOut'),
                value: formatDate(cart.checkOut, 'mediumWithDay'),
                sub: '12:00 PM',
              },
              {
                label: t('confirmation.sidebar.room'),
                value: cart.roomName || t('confirmation.sidebar.roomValue'),
                sub: cart.roomFeatures || '',
              },
              {
                label: t('confirmation.sidebar.guests'),
                value: `${cart.guests} adultos`,
                sub: `${pricing.nights} noches`,
              },
            ]}
          />
        </>
      ) : (
        <CartDetailsSkeleton />
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

      {/* Payment summary — depends on payment */}
      {paymentLoaded ? (
        <PaymentRow>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCardIcon sx={{ fontSize: 16, color: palette.primary }} />
              <Text textVariant="hint">{payment.paymentMethod?.displayLabel}</Text>
            </Box>
            <PaymentAmount>{formatPrice(payment.amount)}</PaymentAmount>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PaymentSuccessPill>
              <CheckCircleIcon sx={{ fontSize: 14, color: palette.success }} />
              <PaymentSuccessText>{t('confirmation.sidebar.paymentSuccess')}</PaymentSuccessText>
            </PaymentSuccessPill>
          </Box>
        </PaymentRow>
      ) : (
        <PaymentSummarySkeleton />
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

      {/* Next steps — always visible */}
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
  const { data: booking } = useBookingByPaymentId(paymentId ?? '');

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
          <BookingCodeValue>
            {booking?.code ? (
              booking.code
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CircularProgress size={18} />
                Generando...
              </Box>
            )}
          </BookingCodeValue>
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
