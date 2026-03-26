import { Box, Typography, Divider, Icon } from '@mui/material';
import { ErrorOutlinedPillButton, PrimaryPillButton } from '@/design-system/components/PillButton';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PolicyIcon from '@mui/icons-material/Policy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KingBedIcon from '@mui/icons-material/KingBed';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import HotelAdminLayout from '../../design-system/layouts/HotelAdminLayout';
import SectionCard from '../../design-system/components/SectionCard';
import InfoGrid from '../../design-system/components/InfoGrid';
import { palette } from '../../design-system/theme/palette';
import {
  useHotelBookingDetail,
  useConfirmBooking,
  useRejectBooking,
} from '../../api/hooks/useHotelBookings';
import HotelReservationDetailPageSkeleton from './HotelReservationDetailPage.skeleton';

export default function HotelReservationDetailPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const { data: booking, isLoading } = useHotelBookingDetail('TH-48291');
  const confirmBooking = useConfirmBooking();
  const rejectBooking = useRejectBooking();

  const breadcrumbs = [
    { label: t('reservationDetail.breadcrumbs.dashboard'), href: '/hotel/dashboard' },
    { label: t('reservationDetail.breadcrumbs.reservations'), href: '/hotel/reservations' },
    { label: 'TH-2026-00483' },
  ];

  if (isLoading || !booking) {
    return (
      <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
        <HotelReservationDetailPageSkeleton />
      </HotelAdminLayout>
    );
  }

  return (
    <HotelAdminLayout activeNav="reservas" breadcrumbs={breadcrumbs}>
      {/* Page header card */}
      <Box
        sx={{
          backgroundColor: palette.surface,
          borderRadius: '16px',
          padding: '20px 24px',
          border: `1px solid ${palette.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Booking code badge */}
          <Box
            sx={{
              backgroundColor: palette.primaryContainer,
              color: palette.primary,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '8px 16px',
              borderRadius: '10px',
            }}
          >
            TH-2026-00483
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.onSurface }}>
              {t('reservationDetail.reservationOf', { name: 'Carlos Mendoza' })}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 13,
                color: palette.onSurfaceVariant,
              }}
            >
              <Icon sx={{ fontSize: 14 }}>calendar_today</Icon>
              {t('reservationDetail.receivedOn', {
                date: `${formatDate('2026-02-24', 'medium')}, 10:32 am`,
              })}
              <Box component="span" sx={{ mx: '4px' }}>
                &middot;
              </Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  backgroundColor: palette.warningContainer,
                  color: palette.warning,
                }}
              >
                <Icon sx={{ fontSize: 14 }}>schedule</Icon>
                {t('reservationDetail.pendingConfirmation')}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ErrorOutlinedPillButton
            pillSize="sm"
            startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
            disabled={rejectBooking.isPending}
            onClick={() => rejectBooking.mutate('TH-48291')}
            sx={{
              backgroundColor: palette.errorContainer,
              '&:hover': { backgroundColor: palette.errorContainer },
            }}
          >
            {t('reservationDetail.reject')}
          </ErrorOutlinedPillButton>
          <PrimaryPillButton
            pillSize="sm"
            startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            disabled={confirmBooking.isPending}
            onClick={() => confirmBooking.mutate('TH-48291')}
          >
            {t('reservationDetail.confirmReservation')}
          </PrimaryPillButton>
        </Box>
      </Box>

      {/* Content grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Guest info card */}
          <SectionCard
            icon={<PersonIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.guestInfo')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${palette.primaryContainer}, ${palette.secondaryContainer})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PersonIcon sx={{ fontSize: 28, color: palette.primary }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.onSurface }}>
                  Carlos Andres Mendoza Lopez
                </Typography>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '6px' }}>
                  Colombia · CC 1020303040
                </Typography>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 12,
                      color: palette.onSurfaceVariant,
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 14, color: palette.primary }} />
                    carlos.mendoza@email.com
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 12,
                      color: palette.onSurfaceVariant,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 14, color: palette.primary }} />
                    +57 310 456 7890
                  </Box>
                </Box>
              </Box>
            </Box>
          </SectionCard>

          {/* Booking details card */}
          <SectionCard
            icon={<EventAvailableIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.bookingDetails')}
          >
            <InfoGrid
              columns={4}
              items={[
                {
                  label: t('reservationDetail.checkIn'),
                  value: formatDate('2026-03-15', 'medium'),
                  sub: t('reservationDetail.from', { time: '3:00 PM' }),
                },
                {
                  label: t('reservationDetail.checkOut'),
                  value: formatDate('2026-03-18', 'medium'),
                  sub: t('reservationDetail.until', { time: '12:00 PM' }),
                },
                {
                  label: t('reservationDetail.duration'),
                  value: t('reservationDetail.nightsCount', { count: 3 }),
                  sub: t('reservationDetail.hours', { count: 72 }),
                },
                {
                  label: t('reservationDetail.guests'),
                  value: t('reservationDetail.adults', { count: 2 }),
                  sub: t('reservationDetail.noMinors'),
                },
              ]}
            />

            <Divider sx={{ borderColor: palette.outlineVariant, my: '16px' }} />

            {/* Room info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '10px' }}>
              <Icon sx={{ fontSize: 18, color: palette.primary }}>bed</Icon>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.onSurface }}>
                {t('reservationDetail.reservedRoom')}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: palette.background,
                borderRadius: '12px',
              }}
            >
              {/* Room image placeholder */}
              <Box
                sx={{
                  width: 80,
                  height: 56,
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${palette.primary} 0%, #4A6267 100%)`,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <KingBedIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }} />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>
                  Suite Deluxe King — Piso 4
                </Typography>
                <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>
                  1 cama King · Vista al mar · 45 m2
                </Typography>
                <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
                  {['WiFi', 'A/C', 'Desayuno', 'Jacuzzi', 'Cancelacion gratuita'].map(amenity => (
                    <Box
                      key={amenity}
                      sx={{
                        fontSize: 10,
                        color: palette.onSurfaceVariant,
                        backgroundColor: palette.surfaceVariant,
                        padding: '2px 8px',
                        borderRadius: '100px',
                      }}
                    >
                      {amenity}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.primary }}>
                  {formatPrice(888000)}
                  {t('reservationDetail.perNight')}
                </Typography>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                  {t('reservationDetail.nightsTotal', { nights: 3, total: formatPrice(2664000) })}
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Payment summary card */}
          <SectionCard
            icon={<ReceiptLongIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.paymentSummary')}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  label: t('reservationDetail.roomNights', { count: 3 }),
                  value: formatPrice(2664000),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.taxIVA'),
                  value: formatPrice(505160),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.serviceCharge'),
                  value: formatPrice(80000),
                  color: palette.onSurface,
                },
                {
                  label: t('reservationDetail.discountApplied'),
                  value: `-${formatPrice(100000)}`,
                  color: palette.success,
                },
              ].map((row, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                    {row.label}
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: row.color }}>
                    {row.value}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, color: palette.onSurface, fontSize: 13 }}>
                  {t('reservationDetail.totalCharged')}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.primary }}>
                  {formatPrice(3149160)}
                </Typography>
              </Box>
            </Box>

            {/* Payment method */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: palette.background,
                borderRadius: '10px',
                mt: '12px',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #006874, #004F58)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCardIcon sx={{ fontSize: 16, color: '#fff' }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurface }}>
                  Visa Credito
                </Typography>
                <Typography sx={{ fontSize: 11, color: palette.outline }}>
                  **** **** **** 4821
                </Typography>
              </Box>
              <Box
                sx={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: palette.successContainer,
                  color: palette.success,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '100px',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 13 }} />
                {t('reservationDetail.approved')}
              </Box>
            </Box>
          </SectionCard>

          {/* Cancellation policy card */}
          <SectionCard
            icon={<PolicyIcon sx={{ fontSize: 18, color: palette.primary }} />}
            title={t('reservationDetail.cancellationPolicy')}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  {t('reservationDetail.freeCancellationUntil')}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.success, fontSize: 12 }}>
                  {formatDate('2026-03-12', 'medium')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  {t('reservationDetail.penaltyAfter')}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.warning, fontSize: 12 }}>
                  {t('reservationDetail.fiftyPercent')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <Typography sx={{ color: palette.onSurfaceVariant, fontSize: 12 }}>
                  No-show
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.error, fontSize: 12 }}>
                  {t('reservationDetail.hundredPercent')}
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Box>
      </Box>
    </HotelAdminLayout>
  );
}
