import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileShell from '../components/MobileShell';
import InfoGrid from '../../design-system/components/InfoGrid';
import PriceBreakdown from '../../design-system/components/PriceBreakdown';
import { palette } from '../../design-system/theme/palette';
import { mockHotels } from '../../travelers/data/mockHotels';

const hotel = mockHotels[0];

export default function MobileReservationSummaryPage() {
  const { t } = useTranslation('mobile');
  const { formatPrice, formatDate } = useLocale();

  return (
    <MobileShell hideNav>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          borderBottom: `1px solid ${palette.outlineVariant}`,
          background: '#fff',
        }}
      >
        <Box component={Link} to={`/mobile/property/${hotel.id}`} sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          {t('summary.title')}
        </Typography>
      </Box>

      <Box sx={{ px: '16px', pt: '16px', pb: '90px' }}>
        {/* Hotel Card */}
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '12px',
            mb: '20px',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '10px',
              background: hotel.gradient,
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>{hotel.name}</Typography>
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>{hotel.location}</Typography>
            <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, mt: '2px' }}>
              {t('summary.roomInfo')}
            </Typography>
          </Box>
        </Box>

        {/* Info Grid */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <InfoGrid
            columns={2}
            items={[
              { label: t('summary.checkIn'), value: formatDate('2026-03-15', 'shortWithDay'), sub: '15:00' },
              { label: t('summary.checkOut'), value: formatDate('2026-03-20', 'shortWithDay'), sub: '12:00' },
              { label: t('summary.duration'), value: t('summary.nights', { count: 5 }) },
              { label: t('summary.guests'), value: t('summary.guestsValue', { count: 2 }) },
            ]}
          />
        </Box>

        {/* Price Breakdown */}
        <Box sx={{ background: '#fff', borderRadius: '12px', border: `1px solid ${palette.outlineVariant}`, p: '16px', mb: '16px' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('summary.priceDetail')}
          </Typography>
          <PriceBreakdown
            rows={[
              { label: t('summary.nightsBreakdown', { count: 5 }), value: formatPrice(2400000) },
              { label: t('summary.taxes', { percent: 11 }), value: formatPrice(264000) },
            ]}
            totalLabel={t('summary.total')}
            totalValue={formatPrice(2664000)}
          />
        </Box>

        {/* Cancellation Policy */}
        <Box sx={{ background: palette.successContainer, borderRadius: '12px', p: '14px', mb: '16px' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.success, mb: '4px' }}>
            {t('summary.freeCancellation')}
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.success, lineHeight: 1.5 }}>
            {t('summary.cancellationPolicy')}
          </Typography>
        </Box>
      </Box>

      {/* Sticky Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: `1px solid ${palette.outlineVariant}`,
          px: '16px',
          py: '12px',
        }}
      >
        <Box
          component={Link}
          to="/mobile/checkout/payment"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: palette.primary,
            color: '#fff',
            borderRadius: '12px',
            py: '14px',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
            width: '100%',
          }}
        >
          {t('summary.continueToPayment')}
        </Box>
      </Box>
    </MobileShell>
  );
}
