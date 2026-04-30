import React from 'react';
import { Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import SectionCard from '@/design-system/components/SectionCard';
import { success, star, error } from '@/design-system/theme/palette';
import {
  NextStepRow,
  NextStepIcon,
} from '@/travelers/pages/ReservationDetailPage/ReservationDetailPage.styles';

interface BookingNextStepsProps {
  status: string;
  hotelName?: string;
  roomName?: string;
}

interface StepConfig {
  icon: React.ReactNode;
  iconColor: string;
  text: string;
}

const BookingNextSteps: React.FC<BookingNextStepsProps> = ({ status, hotelName, roomName }) => {
  const { t } = useTranslation('travelers');

  const getSteps = (): StepConfig[] => {
    switch (status) {
      case 'pending':
        return [
          {
            icon: <EmailIcon sx={{ fontSize: 14, color: success }} />,
            iconColor: success,
            text: t('reservationDetail.nextSteps.voucherSent'),
          },
          {
            icon: <ScheduleIcon sx={{ fontSize: 14, color: star }} />,
            iconColor: star,
            text: `<strong>${t('reservationDetail.nextSteps.pendingTitle')}</strong> — ${t('reservationDetail.nextSteps.pendingDescription')}`,
          },
        ];

      case 'confirmed':
        return [
          {
            icon: <EmailIcon sx={{ fontSize: 14, color: success }} />,
            iconColor: success,
            text: t('reservationDetail.nextSteps.voucherSent'),
          },
          {
            icon: <MeetingRoomIcon sx={{ fontSize: 14, color: success }} />,
            iconColor: success,
            text: `<strong>${t('reservationDetail.nextSteps.confirmedTitle')}</strong> — ${t('reservationDetail.nextSteps.confirmedDescription', { room: roomName ?? '', hotel: hotelName ?? '' })}`,
          },
        ];

      case 'rejected':
        return [
          {
            icon: <CancelIcon sx={{ fontSize: 14, color: error }} />,
            iconColor: error,
            text: `<strong>${t('reservationDetail.nextSteps.rejectedTitle')}</strong> — ${t('reservationDetail.nextSteps.rejectedDescription')}`,
          },
        ];

      case 'cancelled':
        return [
          {
            icon: <CancelIcon sx={{ fontSize: 14, color: error }} />,
            iconColor: error,
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
    <SectionCard
      icon={<ScheduleIcon sx={{ color: star }} />}
      title={t('reservationDetail.nextSteps.title')}
    >
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
