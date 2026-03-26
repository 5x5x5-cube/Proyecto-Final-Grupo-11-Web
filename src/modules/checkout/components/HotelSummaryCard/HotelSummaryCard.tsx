import { Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import SectionCard from '@/design-system/components/SectionCard';
import InfoGrid from '@/design-system/components/InfoGrid';
import RatingBadge from '@/design-system/components/RatingBadge';
import { palette } from '@/design-system/theme/palette';
import type { CartItem } from '../../types';
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
      <ContentWrapper>
        <HotelInfoRow>
          <HotelImagePlaceholder />
          <HotelDetails>
            <HotelType>{item.hotel.type}</HotelType>
            <HotelName>{item.hotel.name}</HotelName>
            <LocationRow>
              <PlaceIcon sx={{ fontSize: 14 }} />
              {item.hotel.location}
            </LocationRow>
            <RatingRow>
              <RatingBadge rating={item.hotel.rating} />
              <Stars>
                {'★'.repeat(Math.round(item.hotel.rating))}
                {'☆'.repeat(5 - Math.round(item.hotel.rating))}
              </Stars>
              <ReviewCount>
                {item.hotel.reviewCount} {t('cart.accommodation.reviews')}
              </ReviewCount>
            </RatingRow>
          </HotelDetails>
        </HotelInfoRow>

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

        <RoomRow>
          <RoomImagePlaceholder />
          <Box sx={{ flex: 1 }}>
            <RoomName>{item.room.name}</RoomName>
            <RoomFeatures>{item.room.features}</RoomFeatures>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <RoomPrice>{formatPrice(item.room.pricePerNight)}</RoomPrice>
            <PerNightLabel>{t('cart.accommodation.perNight')}</PerNightLabel>
          </Box>
        </RoomRow>
      </ContentWrapper>
    </SectionCard>
  );
}
