import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PlaceIcon from '@mui/icons-material/Place';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import CheckoutLayout from '../../design-system/layouts/CheckoutLayout';
import InfoGrid from '../../design-system/components/InfoGrid';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  success,
  successContainer,
  background,
} from '../../design-system/theme/palette';

/* ─── Main Content ─── */
const ConfirmationPage: React.FC = () => {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  /* ─── Sidebar ─── */
  const Sidebar = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: onSurface }}>
        {t('confirmation.sidebar.title')}
      </Typography>

      {/* Hotel mini card */}
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #003740, #006874)',
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 500,
              color: primary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              mb: '4px',
            }}
          >
            {t('confirmation.sidebar.hotelType')}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: onSurface, mb: '4px' }}>
            Hotel Santa Clara Sofitel
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
            <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
              Centro Hist&oacute;rico, Cartagena
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Info grid */}
      <InfoGrid
        columns={2}
        items={[
          {
            label: t('confirmation.sidebar.checkIn'),
            value: formatDate('2026-03-15', 'mediumWithDay'),
            sub: '3:00 PM',
          },
          {
            label: t('confirmation.sidebar.checkOut'),
            value: formatDate('2026-03-20', 'mediumWithDay'),
            sub: '12:00 PM',
          },
          {
            label: t('confirmation.sidebar.room'),
            value: t('confirmation.sidebar.roomValue'),
            sub: t('confirmation.sidebar.roomSub'),
          },
          {
            label: t('confirmation.sidebar.guests'),
            value: t('confirmation.sidebar.guestsValue'),
            sub: t('confirmation.sidebar.guestsSub'),
          },
        ]}
      />

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Payment summary */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CreditCardIcon sx={{ fontSize: 16, color: primary }} />
            <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
              VISA &bull;&bull;&bull;&bull; 4242
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: primary }}>
            {formatPrice(2664000)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: successContainer,
              padding: '4px 12px',
              borderRadius: '100px',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 14, color: success }} />
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: success }}>
              {t('confirmation.sidebar.paymentSuccess')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Next steps */}
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: onSurface, mb: '12px' }}>
          {t('confirmation.sidebar.nextSteps')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '1', text: t('confirmation.sidebar.step1') },
            { num: '2', text: t('confirmation.sidebar.step2') },
            { num: '3', text: t('confirmation.sidebar.step3') },
          ].map(step => (
            <Box key={step.num} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: background,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: primary }}>
                  {step.num}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: 13, color: onSurfaceVariant, lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <CheckoutLayout currentStep={4} sidebar={<Sidebar />}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '20px',
          maxWidth: 520,
          margin: '0 auto',
          height: '100%',
        }}
      >
        {/* Success icon */}
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: successContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 52, color: success }} />
        </Box>

        {/* Title */}
        <Typography sx={{ fontSize: 36, fontWeight: 700, color: onSurface }}>
          {t('confirmation.title')}
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ fontSize: 16, color: onSurfaceVariant, lineHeight: 1.6 }}>
          {t('confirmation.subtitle')}
        </Typography>

        {/* Booking code */}
        <Box
          sx={{
            background: '#fff',
            border: `2px solid ${primary}`,
            borderRadius: '12px',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: onSurfaceVariant,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {t('confirmation.bookingNumber')}
          </Typography>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: primary,
              letterSpacing: '2px',
            }}
          >
            TH-2026-48291
          </Typography>
        </Box>

        {/* Email notice */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: successContainer,
            padding: '14px 20px',
            borderRadius: '100px',
          }}
        >
          <MarkEmailReadIcon sx={{ fontSize: 20, color: success }} />
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: success }}>
            {t('confirmation.emailSent')}
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '12px', width: '100%' }}>
          <PrimaryPillButton component={Link} to="/reservations" pillSize="md" sx={{ flex: 1 }}>
            {t('confirmation.viewReservations')}
          </PrimaryPillButton>
          <OutlinedPillButton component={Link} to="/" pillSize="md" sx={{ flex: 1 }}>
            {t('confirmation.downloadReceipt')}
          </OutlinedPillButton>
        </Box>
      </Box>
    </CheckoutLayout>
  );
};

export default ConfirmationPage;
