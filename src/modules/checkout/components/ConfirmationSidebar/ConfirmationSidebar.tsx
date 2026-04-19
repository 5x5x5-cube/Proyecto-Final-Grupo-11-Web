import { Box, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { usePaymentStatus } from '@/api/hooks/usePayments';
import { useBookingByPaymentId } from '@/api/hooks/useBookings';
import { useHotelDetail } from '@/api/hooks/useSearch';
import InfoGrid from '@/design-system/components/InfoGrid';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import {
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
} from './ConfirmationSidebar.styles';
import { CartDetailsSkeleton, PaymentSummarySkeleton } from './ConfirmationSidebarSkeleton';

interface Props {
  paymentId: string;
}

export default function ConfirmationSidebar({ paymentId }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();
  const { data: payment } = usePaymentStatus(paymentId);
  const { data: booking } = useBookingByPaymentId(paymentId);
  const { data: hotel } = useHotelDetail(booking?.hotelId ?? '') as {
    data: { name?: string; city?: string; country?: string; rating?: number } | undefined;
  };

  const bookingLoaded = !!booking && !!hotel;
  const paymentLoaded = !!payment;

  const nights =
    booking?.checkIn && booking?.checkOut
      ? Math.ceil(
          (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const location =
    hotel?.city && hotel?.country ? `${hotel.city}, ${hotel.country}` : (hotel?.city ?? '');

  const steps = [
    {
      num: '1',
      label: t('confirmation.sidebar.step1Label'),
      bold: t('confirmation.sidebar.step1Bold'),
      suffix: t('confirmation.sidebar.step1Suffix'),
    },
    {
      num: '2',
      label: t('confirmation.sidebar.step2Label'),
      bold: t('confirmation.sidebar.step2Bold'),
    },
    {
      num: '3',
      label: t('confirmation.sidebar.step3Label'),
      bold: t('confirmation.sidebar.step3Bold'),
      suffix: t('confirmation.sidebar.step3Suffix'),
    },
  ];

  return (
    <SidebarRoot>
      <SidebarTitle>{t('confirmation.sidebar.title')}</SidebarTitle>

      {bookingLoaded ? (
        <>
          <HotelMiniCard>
            <HotelThumbnail />
            <Box>
              <HotelTypeLabel>{t('confirmation.sidebar.hotelType')}</HotelTypeLabel>
              <HotelNameText>{hotel.name}</HotelNameText>
              {location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PlaceIcon sx={{ fontSize: 14, color: palette.onSurfaceVariant }} />
                  <Text textVariant="hint">{location}</Text>
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
                value: formatDate(booking.checkIn, 'mediumWithDay'),
                sub: t('confirmation.sidebar.checkInSub'),
              },
              {
                label: t('confirmation.sidebar.checkOut'),
                value: formatDate(booking.checkOut, 'mediumWithDay'),
                sub: t('confirmation.sidebar.checkOutSub'),
              },
              {
                label: t('confirmation.sidebar.room'),
                value: t('confirmation.sidebar.room'),
                sub: '',
              },
              {
                label: t('confirmation.sidebar.guests'),
                value: t('confirmation.sidebar.guestsCount', { count: booking.guests }),
                sub: t('confirmation.sidebar.nightsCount', { count: nights }),
              },
            ]}
          />
        </>
      ) : (
        <CartDetailsSkeleton />
      )}

      <Divider sx={{ borderColor: palette.outlineVariant }} />

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

      <Box>
        <Text textVariant="bodySemibold" sx={{ mb: '12px' }}>
          {t('confirmation.sidebar.nextSteps')}
        </Text>
        <StepsList>
          {steps.map(step => (
            <Box key={step.num} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StepCircle>
                <StepNumber>{step.num}</StepNumber>
              </StepCircle>
              <Text textVariant="hint" sx={{ lineHeight: 1.4 }}>
                {step.label} <strong>{step.bold}</strong>
                {step.suffix ? ` ${step.suffix}` : '.'}
              </Text>
            </Box>
          ))}
        </StepsList>
      </Box>
    </SidebarRoot>
  );
}
