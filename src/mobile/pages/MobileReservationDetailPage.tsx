import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MobileShell from '../components/MobileShell';
import OfflineBanner from '../components/OfflineBanner';
import StatusChip from '../../design-system/components/StatusChip';
import InfoGrid from '../../design-system/components/InfoGrid';
import PriceBreakdown from '../../design-system/components/PriceBreakdown';
import { palette } from '../../design-system/theme/palette';
import { mockReservations } from '../../travelers/data/mockReservations';

export default function MobileReservationDetailPage() {
  const { t } = useTranslation('mobile');
  const { id } = useParams();
  const reservation = mockReservations.find((r) => r.id === Number(id)) || mockReservations[0];

  return (
    <MobileShell hideNav>
      <OfflineBanner />

      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          background: '#fff',
          borderBottom: `1px solid ${palette.outlineVariant}`,
        }}
      >
        <Box component={Link} to="/mobile/reservations" sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          {t('reservationDetail.title')}
        </Typography>
      </Box>

      <Box sx={{ px: '16px', pt: '16px', pb: '24px' }}>
        {/* Status + Code */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '16px' }}>
          <StatusChip status={reservation.status} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.outline }}>{reservation.code}</Typography>
        </Box>

        {/* Hotel Card */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '14px',
            overflow: 'hidden',
            border: `1px solid ${palette.outlineVariant}`,
            mb: '16px',
          }}
        >
          <Box sx={{ height: 120, background: reservation.gradient }} />
          <Box sx={{ p: '14px' }}>
            <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>
              {reservation.hotelType}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface, mt: '2px' }}>
              {reservation.hotelName}
            </Typography>
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mt: '2px' }}>
              {reservation.location}
            </Typography>
          </Box>
        </Box>

        {/* Info Grid */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <InfoGrid
            columns={2}
            items={[
              { label: t('reservationDetail.checkIn'), value: reservation.checkIn, sub: reservation.checkInTime },
              { label: t('reservationDetail.checkOut'), value: reservation.checkOut, sub: reservation.checkOutTime },
              { label: t('reservationDetail.duration'), value: t('reservationDetail.nights', { count: reservation.nights }) },
              { label: t('reservationDetail.guests'), value: reservation.guests },
            ]}
          />
        </Box>

        {/* Room */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, color: palette.primary, textTransform: 'uppercase', letterSpacing: 0.5, mb: '4px' }}>
            {t('reservationDetail.room')}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
            {reservation.room}
          </Typography>
        </Box>

        {/* Payment Summary */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '24px' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('reservationDetail.paymentSummary')}
          </Typography>
          <PriceBreakdown
            rows={[
              { label: t('reservationDetail.accommodation', { count: 5 }), value: 'COP 2.400.000' },
              { label: t('reservationDetail.taxes'), value: 'COP 264.000' },
            ]}
            totalLabel={t('reservationDetail.totalPaid')}
            totalValue={reservation.totalPrice}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box
            component={Link}
            to={`/mobile/reservations/${reservation.id}/qr`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: palette.primary,
              color: '#fff',
              borderRadius: '12px',
              py: '14px',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <QrCodeIcon sx={{ fontSize: 18 }} />
            {t('reservationDetail.showQR')}
          </Box>
          <Box
            component={Link}
            to={`/mobile/reservations/${reservation.id}/cancel`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1.5px solid ${palette.error}`,
              color: palette.error,
              borderRadius: '12px',
              py: '13px',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {t('reservationDetail.cancelReservation')}
          </Box>
        </Box>
      </Box>
    </MobileShell>
  );
}
