import { Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import SectionCard from '@/design-system/components/SectionCard';
import InfoGrid from '@/design-system/components/InfoGrid';
import RatingBadge from '@/design-system/components/RatingBadge';
import { palette } from '@/design-system/theme/palette';
import type { NormalizedCart } from '../../types';
import {
  ContentWrapper,
  HotelInfoRow,
  HotelImagePlaceholder,
  HotelDetails,
  HotelType,
  HotelName,
  LocationRow,
  RatingRow,
  Stars,
  ReviewCount,
  RoomRow,
  RoomImagePlaceholder,
  RoomName,
  RoomFeatures,
  RoomPrice,
  PerNightLabel,
} from './HotelSummaryCard.styles';

interface Props {
  cart: NormalizedCart;
}

export default function HotelSummaryCard({ cart }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const { nights, pricePerNight } = cart.pricing;

  return (
    <SectionCard
      icon={<HotelIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.accommodation.title')}
    >
      <ContentWrapper>
        <HotelInfoRow>
          <HotelImagePlaceholder />
          <HotelDetails>
            {cart.hotelType && <HotelType>{cart.hotelType}</HotelType>}
            <HotelName>{cart.hotelName}</HotelName>
            {cart.location && (
              <LocationRow>
                <PlaceIcon sx={{ fontSize: 14 }} />
                {cart.location}
              </LocationRow>
            )}
            {cart.rating != null && (
              <RatingRow>
                <RatingBadge rating={cart.rating} />
                <Stars>
                  {'★'.repeat(Math.round(cart.rating))}
                  {'☆'.repeat(5 - Math.round(cart.rating))}
                </Stars>
                {cart.reviewCount != null && (
                  <ReviewCount>
                    {cart.reviewCount} {t('cart.accommodation.reviews')}
                  </ReviewCount>
                )}
              </RatingRow>
            )}
          </HotelDetails>
        </HotelInfoRow>

        <InfoGrid
          columns={3}
          items={[
            {
              label: t('cart.accommodation.checkIn'),
              value: formatDate(cart.checkIn, 'mediumWithDay'),
              sub: '3:00 PM',
            },
            {
              label: t('cart.accommodation.checkOut'),
              value: formatDate(cart.checkOut, 'mediumWithDay'),
              sub: '12:00 PM',
            },
            {
              label: t('cart.accommodation.duration'),
              value: t('cart.accommodation.nightsCount', { count: nights }),
              sub: t('cart.accommodation.guestsCount', { count: cart.guests }),
            },
          ]}
        />

        <RoomRow>
          <RoomImagePlaceholder />
          <Box sx={{ flex: 1 }}>
            <RoomName>{cart.roomName}</RoomName>
            {cart.roomFeatures && <RoomFeatures>{cart.roomFeatures}</RoomFeatures>}
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <RoomPrice>{formatPrice(pricePerNight)}</RoomPrice>
            <PerNightLabel>{t('cart.accommodation.perNight')}</PerNightLabel>
          </Box>
        </RoomRow>
      </ContentWrapper>
    </SectionCard>
  );
}
