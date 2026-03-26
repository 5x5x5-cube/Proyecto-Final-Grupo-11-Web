import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../contexts/LocaleContext';
import SectionCard from '../../../design-system/components/SectionCard';
import InfoGrid from '../../../design-system/components/InfoGrid';
import RatingBadge from '../../../design-system/components/RatingBadge';
import { palette } from '../../../design-system/theme/palette';
import { CartItem } from '../types';

interface Props {
  item: CartItem;
}

export default function HotelSummaryCard({ item }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  return (
    <SectionCard
      icon={<HotelIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.accommodation.title')}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Hotel info row */}
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 120,
              height: 90,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #003740, #006874)',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {item.hotel.type}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
              {item.hotel.name}
            </Typography>
            <Box
              sx={{
                fontSize: 13,
                color: palette.onSurfaceVariant,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <PlaceIcon sx={{ fontSize: 14 }} />
              {item.hotel.location}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RatingBadge rating={item.hotel.rating} />
              <Typography sx={{ color: palette.star, fontSize: 13 }}>
                {'★'.repeat(Math.round(item.hotel.rating))}
                {'☆'.repeat(5 - Math.round(item.hotel.rating))}
              </Typography>
              <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                {item.hotel.reviewCount} {t('cart.accommodation.reviews')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Date/duration info */}
        <InfoGrid
          columns={3}
          items={[
            {
              label: t('cart.accommodation.checkIn'),
              value: formatDate(item.checkIn, 'mediumWithDay'),
              sub: '3:00 PM',
            },
            {
              label: t('cart.accommodation.checkOut'),
              value: formatDate(item.checkOut, 'mediumWithDay'),
              sub: '12:00 PM',
            },
            {
              label: t('cart.accommodation.duration'),
              value: t('cart.accommodation.nightsCount', { count: item.nights }),
              sub: t('cart.accommodation.guestsCount', { count: item.guests }),
            },
          ]}
        />

        {/* Room row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            backgroundColor: palette.background,
            borderRadius: '12px',
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #006874, #4A9FAA)',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface }}>
              {item.room.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
              {item.room.features}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.primary }}>
              {formatPrice(item.room.pricePerNight)}
            </Typography>
            <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
              {t('cart.accommodation.perNight')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionCard>
  );
}
