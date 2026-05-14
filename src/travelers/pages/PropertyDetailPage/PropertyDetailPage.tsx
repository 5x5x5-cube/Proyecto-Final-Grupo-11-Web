import { useState } from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import DeskIcon from '@mui/icons-material/Desk';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PoolIcon from '@mui/icons-material/Pool';
import ParkIcon from '@mui/icons-material/Park';
import BalconyIcon from '@mui/icons-material/Balcony';
import HotTubIcon from '@mui/icons-material/HotTub';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DynamicCancellationPolicyCard from '@/modules/checkout/components/CancellationPolicyCard/CancellationPolicyCard';
import { useLocale } from '@/contexts/LocaleContext';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import RatingBadge from '@/design-system/components/RatingBadge';
import { palette } from '@/design-system/theme/palette';
import PropertyDetailPageSkeleton from './PropertyDetailPage.skeleton';
import { useHotelDetail, useHotelReviews, useHotelRooms } from '@/api/hooks/useSearch';
import { saveCartSelection } from '@/modules/checkout/cartStorage';
import {
  SidebarWrapper,
  PriceCard,
  PriceHeadline,
  PricePerNightLabel,
  DateFieldsGrid,
  DateField,
  FieldTopLabel,
  FieldValue,
  GuestsField,
  PriceBreakdown,
  PriceRow,
  PriceTotalRow,
  SecureBadge,
  ContentColumn,
  GalleryGrid,
  GalleryMainImage,
  HeaderRow,
  HeaderInfo,
  HotelTypeLabel,
  HotelTitle,
  LocationRow,
  RatingRow,
  ActionButtons,
  ActionIconButton,
  AmenitiesGrid,
  AmenityChip,
  RoomsList,
  RoomCard,
  RoomThumbnail,
  ReviewsRow,
  ReviewCard,
  ReviewSkeletonCard,
  ReviewAuthorRow,
  ReviewAvatar,
  ReviewStars,
} from './PropertyDetailPage.styles';

const ICON_MAP: Record<string, React.ReactNode> = {
  wifi: <WifiIcon fontSize="inherit" />,
  ac: <AcUnitIcon fontSize="inherit" />,
  tv: <TvIcon fontSize="inherit" />,
  minibar: <LocalBarIcon fontSize="inherit" />,
  balcony: <BalconyIcon fontSize="inherit" />,
  jacuzzi: <HotTubIcon fontSize="inherit" />,
  desk: <DeskIcon fontSize="inherit" />,
  kitchen: <KitchenIcon fontSize="inherit" />,
  private_pool: <PoolIcon fontSize="inherit" />,
  garden_view: <ParkIcon fontSize="inherit" />,
};

const ROOM_GRADIENTS = [
  'linear-gradient(135deg, #006874, #4A9FAA)',
  'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
  'linear-gradient(135deg, #5B5EA6, #8E91CC)',
  'linear-gradient(135deg, #B5451B, #E07050)',
  'linear-gradient(135deg, #7B4F00, #C89030)',
];

function calcNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const diff =
    new Date(checkOut + 'T00:00:00').getTime() - new Date(checkIn + 'T00:00:00').getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function PropertyDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1) || 1;

  const { data: hotelRaw, isLoading: isHotelLoading } = useHotelDetail(id);
  const { data: roomsData, isLoading: isRoomsLoading } = useHotelRooms(id, checkIn || undefined);
  const { data: reviewsData, isLoading: isReviewsLoading } = useHotelReviews(id);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const hotel = hotelRaw as
    | {
        id?: string;
        name?: string;
        description?: string;
        city?: string;
        country?: string;
        rating?: number;
        image_url?: string;
        images?: string[];
      }
    | null
    | undefined;

  const allRooms = (Array.isArray(roomsData) ? roomsData : []) as Array<{
    id: string;
    roomType: string;
    capacity: number;
    pricePerNight: number;
    taxRate: number;
    description: string;
    amenities: Array<{ icon: string; label: string }>;
    images: string[];
  }>;

  // Only show rooms with enough capacity for the number of guests
  const rooms = allRooms.filter(r => r.capacity >= guests);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) ?? rooms[0] ?? null;

  const handleReserve = useDebouncedCallback(() => {
    if (!selectedRoom) return;

    const selection = {
      roomId: selectedRoom.id,
      hotelId: hotel?.id ?? id,
      checkIn,
      checkOut,
      guests,
    };

    saveCartSelection(selection);
    navigate('/checkout/cart');
  });

  if (isHotelLoading || isRoomsLoading) return <PropertyDetailPageSkeleton />;

  const reviews = (reviewsData ?? []) as Array<{
    initial: string;
    name: string;
    date: string;
    stars: number;
    text: string;
  }>;

  // Aggregate unique amenities from all rooms
  const amenityMap = new Map<string, { icon: string; label: string }>();
  for (const room of rooms) {
    for (const amenity of room.amenities) {
      if (!amenityMap.has(amenity.label)) {
        amenityMap.set(amenity.label, amenity);
      }
    }
  }
  const hotelAmenities = Array.from(amenityMap.values());

  const nights = calcNights(checkIn, checkOut);
  const pricePerNight = selectedRoom?.pricePerNight ?? 0;
  const taxRate = selectedRoom?.taxRate ?? 0.19;
  const subtotal = pricePerNight * nights;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  const hotelName = hotel?.name ?? '';
  const hotelCity = hotel?.city ?? '';
  const hotelCountry = hotel?.country ?? '';
  const hotelRating = hotel?.rating ?? 0;
  const hotelDescription = hotel?.description ?? '';

  const GALLERY_FALLBACK_GRADIENTS = [
    'linear-gradient(135deg, #003740, #006874)',
    'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
    'linear-gradient(135deg, #5B5EA6, #8E91CC)',
    'linear-gradient(135deg, #B5451B, #E07050)',
    'linear-gradient(135deg, #7B4F00, #C89030)',
  ];
  const hotelImages = hotel?.images ?? [];
  const galleryItems = Array.from({ length: 5 }, (_, i) => ({
    url: hotelImages[i] ?? '',
    gradient: GALLERY_FALLBACK_GRADIENTS[i],
  }));

  const BookingSidebar = () => (
    <SidebarWrapper>
      <PriceCard>
        <div>
          <Text textVariant="caption">{t('propertyDetail.booking.from')}</Text>
          <PriceHeadline>
            {formatPrice(pricePerNight)}{' '}
            <PricePerNightLabel component="span">
              {t('propertyDetail.booking.perNight')}
            </PricePerNightLabel>
          </PriceHeadline>
        </div>

        <DateFieldsGrid>
          <DateField>
            <FieldTopLabel>{t('propertyDetail.booking.checkIn')}</FieldTopLabel>
            <FieldValue>{checkIn ? formatDate(checkIn, 'shortWithDay') : '—'}</FieldValue>
          </DateField>
          <DateField>
            <FieldTopLabel>{t('propertyDetail.booking.checkOut')}</FieldTopLabel>
            <FieldValue>{checkOut ? formatDate(checkOut, 'shortWithDay') : '—'}</FieldValue>
          </DateField>
        </DateFieldsGrid>

        <GuestsField>
          <div>
            <FieldTopLabel>{t('propertyDetail.booking.guests')}</FieldTopLabel>
            <FieldValue>{t('home.search.guestsCount', { count: guests })}</FieldValue>
          </div>
          <ExpandMoreIcon sx={{ color: palette.onSurfaceVariant, fontSize: 20 }} />
        </GuestsField>

        {pricePerNight > 0 && (
          <PriceBreakdown>
            <PriceRow>
              <Text textVariant="body">
                {formatPrice(pricePerNight)} x {nights} {t('propertyDetail.booking.nights')}
              </Text>
              <Text textVariant="body">{formatPrice(subtotal)}</Text>
            </PriceRow>
            <PriceRow>
              <Text textVariant="body">{t('propertyDetail.booking.taxesAndFees')}</Text>
              <Text textVariant="body">{formatPrice(taxes)}</Text>
            </PriceRow>
            <PriceTotalRow>
              <Text textVariant="bodySemibold">{t('propertyDetail.booking.total')}</Text>
              <Text textVariant="bodySemibold">{formatPrice(total)}</Text>
            </PriceTotalRow>
          </PriceBreakdown>
        )}

        <PrimaryPillButton
          pillSize="lg"
          fullWidth
          loading={false}
          onClick={handleReserve}
          disabled={!selectedRoom}
        >
          {t('propertyDetail.booking.reserveNow')}
        </PrimaryPillButton>

        <SecureBadge>
          <LockIcon sx={{ fontSize: 16, color: palette.primary }} />
          <Text textVariant="caption">{t('propertyDetail.booking.securePayment')}</Text>
        </SecureBadge>
      </PriceCard>

      <div>{checkIn && <DynamicCancellationPolicyCard checkIn={checkIn} />}</div>
    </SidebarWrapper>
  );

  return (
    <TravelerLayout variant="detail" sidebar={<BookingSidebar />}>
      <ContentColumn>
        {/* Gallery */}
        <GalleryGrid>
          <GalleryMainImage
            sx={
              galleryItems[0].url
                ? { backgroundImage: `url(${galleryItems[0].url})` }
                : { background: galleryItems[0].gradient }
            }
          />
          {[1, 2, 3].map(i => (
            <Box
              key={i}
              sx={
                galleryItems[i].url
                  ? {
                      backgroundImage: `url(${galleryItems[i].url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : { background: galleryItems[i].gradient }
              }
            />
          ))}
          <Box
            sx={
              galleryItems[4].url
                ? {
                    backgroundImage: `url(${galleryItems[4].url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { background: galleryItems[4].gradient }
            }
          />
        </GalleryGrid>

        {/* Header */}
        <HeaderRow>
          <HeaderInfo>
            <HotelTypeLabel>{t('propertyDetail.hotelType')}</HotelTypeLabel>
            <HotelTitle component="h1">{hotelName}</HotelTitle>
            <LocationRow>
              <PlaceIcon sx={{ fontSize: 16 }} />
              {[hotelCity, hotelCountry].filter(Boolean).join(', ')}
            </LocationRow>
            <RatingRow>
              <RatingBadge rating={hotelRating} showStars="full" />
              {reviews.length > 0 && (
                <Text textVariant="hint">
                  {reviews.length} {t('propertyDetail.reviews')}
                </Text>
              )}
            </RatingRow>
          </HeaderInfo>
          <ActionButtons>
            <ActionIconButton>
              <FavoriteBorderIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
            </ActionIconButton>
            <ActionIconButton>
              <ShareIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
            </ActionIconButton>
          </ActionButtons>
        </HeaderRow>

        {/* Description */}
        {hotelDescription && (
          <div>
            <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
              {t('propertyDetail.description')}
            </Text>
            <Text textVariant="body" sx={{ lineHeight: 1.6, maxWidth: 860 }}>
              {hotelDescription}
            </Text>
          </div>
        )}

        {/* Amenities */}
        {hotelAmenities.length > 0 && (
          <div>
            <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
              {t('propertyDetail.amenities.title')}
            </Text>
            <AmenitiesGrid>
              {hotelAmenities.map(amenity => (
                <AmenityChip key={amenity.label}>
                  <Box sx={{ fontSize: 16, color: palette.primary, display: 'inline-flex' }}>
                    {ICON_MAP[amenity.icon] ?? <WifiIcon fontSize="inherit" />}
                  </Box>
                  {amenity.label}
                </AmenityChip>
              ))}
            </AmenitiesGrid>
          </div>
        )}

        {/* Rooms */}
        <div>
          <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
            {t('propertyDetail.rooms.title')}
          </Text>
          {rooms.length === 0 ? (
            <Box sx={{ py: '24px', textAlign: 'center', color: palette.onSurfaceVariant }}>
              <Text textVariant="body">{t('propertyDetail.rooms.noRooms')}</Text>
            </Box>
          ) : (
            <RoomsList>
              {rooms.map((room, idx) => {
                const isSelected = selectedRoomId ? room.id === selectedRoomId : idx === 0;
                return (
                  <RoomCard key={room.id}>
                    <RoomThumbnail
                      $imageUrl={room.images?.[0] ?? ''}
                      $gradient={ROOM_GRADIENTS[idx % ROOM_GRADIENTS.length]}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Text textVariant="cardSubheading" sx={{ mb: '4px' }}>
                        {room.roomType}
                      </Text>
                      <Text textVariant="hint">{room.description}</Text>
                      <Text textVariant="hint" sx={{ mt: '2px', color: palette.onSurfaceVariant }}>
                        {t('propertyDetail.rooms.capacity', { count: room.capacity })}
                      </Text>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Text textVariant="price">{formatPrice(room.pricePerNight)}</Text>
                      <Text textVariant="caption">{t('propertyDetail.rooms.perNight')}</Text>
                    </Box>
                    {isSelected ? (
                      <PrimaryPillButton
                        pillSize="xs"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => setSelectedRoomId(room.id)}
                      >
                        {t('propertyDetail.rooms.select')}
                      </PrimaryPillButton>
                    ) : (
                      <OutlinedPillButton
                        pillSize="xs"
                        variant="outlined"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => setSelectedRoomId(room.id)}
                      >
                        {t('propertyDetail.rooms.select')}
                      </OutlinedPillButton>
                    )}
                  </RoomCard>
                );
              })}
            </RoomsList>
          )}
        </div>

        {/* Reviews — hidden when no reviews and not loading */}
        {(isReviewsLoading || reviews.length > 0) && (
          <div>
            <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
              {t('propertyDetail.guestReviews')}
            </Text>
            {isReviewsLoading ? (
              <ReviewsRow>
                {[0, 1, 2].map(i => (
                  <ReviewSkeletonCard key={i}>
                    <Skeleton animation="wave" variant="rounded" height={36} />
                    <Skeleton animation="wave" variant="text" width={80} />
                    <Skeleton animation="wave" variant="rounded" height={60} />
                  </ReviewSkeletonCard>
                ))}
              </ReviewsRow>
            ) : (
              <ReviewsRow>
                {reviews.map(review => (
                  <ReviewCard key={review.name}>
                    <ReviewAuthorRow>
                      <ReviewAvatar>{review.initial}</ReviewAvatar>
                      <div>
                        <Text textVariant="bodyMedium">{review.name}</Text>
                        <Text textVariant="caption">{review.date}</Text>
                      </div>
                    </ReviewAuthorRow>
                    <ReviewStars>
                      {'★'.repeat(review.stars)}
                      {'☆'.repeat(5 - review.stars)}
                    </ReviewStars>
                    <Text textVariant="hint" sx={{ lineHeight: 1.5 }}>
                      {review.text}
                    </Text>
                  </ReviewCard>
                ))}
              </ReviewsRow>
            )}
          </div>
        )}
      </ContentColumn>
    </TravelerLayout>
  );
}
