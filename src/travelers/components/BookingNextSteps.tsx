import React from 'react';
import { Box, styled } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import type { BookingStatus } from '@/types/booking';
import {
  NextStepRow,
  NextStepIcon,
} from '@/travelers/pages/ReservationDetailPage/ReservationDetailPage.styles';

interface BookingNextStepsProps {
  status: BookingStatus;
  hotelName?: string;
  roomName?: string;
}

const StepIconSmall = styled('span')<{ $color: string }>(({ $color }) => ({
  fontSize: 14,
  color: $color,
  display: 'inline-flex',
}));

const Container = styled(Box)({
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: 16,
  padding: '16px 20px',
});

const Title = styled(Text)({
  fontWeight: 600,
  fontSize: 14,
  color: palette.onSurface,
  marginBottom: 8,
});

interface StepConfig {
  icon: React.ReactNode;
  iconBg: string;
  text: string;
}

const BookingNextSteps: React.FC<BookingNextStepsProps> = ({ status, hotelName, roomName }) => {
  const { t } = useTranslation('travelers');

  const getSteps = (): StepConfig[] => {
    const emailStep: StepConfig = {
      icon: (
        <StepIconSmall $color={palette.success}>
          <EmailIcon fontSize="inherit" />
        </StepIconSmall>
      ),
      iconBg: palette.successContainer,
      text: t('reservationDetail.nextSteps.emailSent'),
    };

    switch (status) {
      case 'pending':
        return [
          emailStep,
          {
            icon: (
              <StepIconSmall $color={palette.warning}>
                <ScheduleIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            iconBg: palette.warningContainer,
            text: `<strong>${t('reservationDetail.nextSteps.pendingTitle')}</strong> — ${t('reservationDetail.nextSteps.pendingDescription')}`,
          },
        ];

      case 'confirmed':
        return [
          emailStep,
          {
            icon: (
              <StepIconSmall $color={palette.success}>
                <MeetingRoomIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            iconBg: palette.successContainer,
            text: `<strong>${t('reservationDetail.nextSteps.confirmedTitle')}</strong> — ${t('reservationDetail.nextSteps.confirmedDescription', { room: roomName ?? '', hotel: hotelName ?? '' })}`,
          },
        ];

      case 'rejected':
        return [
          {
            icon: (
              <StepIconSmall $color={palette.error}>
                <CancelIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            iconBg: palette.errorContainer,
            text: `<strong>${t('reservationDetail.nextSteps.rejectedTitle')}</strong> — ${t('reservationDetail.nextSteps.rejectedDescription')}`,
          },
        ];

      case 'cancelled':
        return [
          {
            icon: (
              <StepIconSmall $color={palette.error}>
                <CancelIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            iconBg: palette.errorContainer,
            text: `<strong>${t('reservationDetail.nextSteps.cancelledTitle')}</strong> — ${t('reservationDetail.nextSteps.cancelledDescription')}`,
          },
        ];

      default:
        return [];
    }
  };

  const steps = getSteps();

  if (steps.length === 0) return null;

  return (
    <Container>
      <Title>{t('reservationDetail.nextSteps.title')}</Title>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {steps.map((step, i) => (
          <NextStepRow key={i}>
            <NextStepIcon $bg={step.iconBg}>{step.icon}</NextStepIcon>
            <Text
              textVariant="hint"
              sx={{ lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: step.text }}
            />
          </NextStepRow>
        ))}
      </Box>
    </Container>
  );
};

export default BookingNextSteps;
