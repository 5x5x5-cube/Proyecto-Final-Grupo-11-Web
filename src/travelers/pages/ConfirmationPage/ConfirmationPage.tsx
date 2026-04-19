import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useBookingByPaymentId } from '@/api/hooks/useBookings';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import { palette } from '@/design-system/theme/palette';
import ConfirmationSidebar from '@/modules/checkout/components/ConfirmationSidebar/ConfirmationSidebar';
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
} from './ConfirmationPage.styles';

const ConfirmationPage: React.FC = () => {
  const { t } = useTranslation('travelers');
  const { user } = useAuth();
  const { paymentId } = useParams<{ paymentId: string }>();
  const { data: booking } = useBookingByPaymentId(paymentId ?? '');

  return (
    <CheckoutLayout currentStep={4} sidebar={<ConfirmationSidebar paymentId={paymentId ?? ''} />}>
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
                {t('confirmation.generating')}
              </Box>
            )}
          </BookingCodeValue>
        </BookingCodeCard>

        <EmailNoticePill>
          <MarkEmailReadIcon sx={{ fontSize: 20, color: palette.success }} />
          <EmailNoticeText>{t('confirmation.emailSent', { email: user.email })}</EmailNoticeText>
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
