import React from 'react';
import { Box, styled } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import SectionCard from '@/design-system/components/SectionCard';
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

const SectionIcon = styled(ScheduleIcon)({
  color: palette.star,
});

interface StepConfig {
  icon: React.ReactNode;
  text: string;
}

const BookingNextSteps: React.FC<BookingNextStepsProps> = ({ status, hotelName, roomName }) => {
  const { t } = useTranslation('travelers');

  const getSteps = (): StepConfig[] => {
    switch (status) {
      case 'pending':
        return [
          {
            icon: (
              <StepIconSmall $color={palette.success}>
                <EmailIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            text: t('reservationDetail.nextSteps.voucherSent'),
          },
          {
            icon: (
              <StepIconSmall $color={palette.star}>
                <ScheduleIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            text: `<strong>${t('reservationDetail.nextSteps.pendingTitle')}</strong> — ${t('reservationDetail.nextSteps.pendingDescription')}`,
          },
        ];

      case 'confirmed':
        return [
          {
            icon: (
              <StepIconSmall $color={palette.success}>
                <EmailIcon fontSize="inherit" />
              </StepIconSmall>
            ),
            text: t('reservationDetail.nextSteps.voucherSent'),
          },
          {
            icon: (
              <StepIconSmall $color={palette.success}>
                <MeetingRoomIcon fontSize="inherit" />
              </StepIconSmall>
            ),
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
    <SectionCard icon={<SectionIcon />} title={t('reservationDetail.nextSteps.title')}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {steps.map((step, i) => (
          <NextStepRow key={i}>
            <NextStepIcon>{step.icon}</NextStepIcon>
            <Text
              textVariant="hint"
              sx={{ lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: step.text }}
            />
          </NextStepRow>
        ))}
      </Box>
    </SectionCard>
  );
};

export default BookingNextSteps;
