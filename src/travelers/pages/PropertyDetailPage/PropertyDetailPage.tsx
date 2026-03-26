import { Skeleton } from '@mui/material';
import { Box, Typography } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import RatingBadge from '@/design-system/components/RatingBadge';
import { palette } from '@/design-system/theme/palette';
import PropertyDetailPageSkeleton from './PropertyDetailPage.skeleton';
import { useHotelDetail, useHotelReviews } from '@/api/hooks/useSearch';
import { useSetCart } from '@/api/hooks/useCart';
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
  CancellationPolicyCard,
  CancellationRow,
  ContentColumn,
  GalleryGrid,
  GalleryMainImage,
  GalleryMorePhotosOverlay,
  HeaderRow,
  HeaderInfo,
  HotelTypeLabel,
  HotelTitle,
  LocationRow,
  RatingRow,
  StarsText,
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

export default function PropertyDetailPage() {
  const { isLoading: isHotelLoading } = useHotelDetail(1);
  const { data: reviewsData, isLoading: isReviewsLoading } = useHotelReviews(1);
  const setCart = useSetCart();
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const handleReserve = useDebouncedCallback(() => {
    if (setCart.isPending) return;

    const selection = {
      roomId: 'b1000000-0000-0000-0000-000000000001',
      hotelId: 'a1000000-0000-0000-0000-000000000001',
      checkIn: '2026-03-15',
      checkOut: '2026-03-20',
      guests: 2,
    };

    saveCartSelection(selection);
    navigate('/checkout/cart');
    setCart.mutate(selection);
  });

  if (isHotelLoading) return <PropertyDetailPageSkeleton />;

  const reviews = (reviewsData ?? []) as Array<{
    initial: string;
    name: string;
    date: string;
    stars: number;
    text: string;
  }>;

  const amenities = [
    {
      icon: <WifiIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.freeWifi'),
    },
    {
      icon: <PoolIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.pool'),
    },
    {
      icon: <FreeBreakfastIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.breakfastIncluded'),
    },
    {
      icon: <SpaIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.spaWellness'),
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.gym'),
    },
    {
      icon: <LocalParkingIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.parking'),
    },
    {
      icon: <AcUnitIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.airConditioning'),
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.restaurant'),
    },
    {
      icon: <LocalBarIcon sx={{ fontSize: 16, color: palette.primary }} />,
      label: t('propertyDetail.amenities.bar'),
    },
  ];

  const rooms = [
    {
      name: t('propertyDetail.rooms.superiorRoom'),
      features: t('propertyDetail.rooms.superiorFeatures'),
      price: formatPrice(480000),
      gradient: 'linear-gradient(135deg, #006874, #4A9FAA)',
      active: true,
    },
    {
      name: t('propertyDetail.rooms.juniorSuite'),
      features: t('propertyDetail.rooms.juniorFeatures'),
      price: formatPrice(680000),
      gradient: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
      active: false,
    },
  ];

  const BookingSidebar = () => (
    <SidebarWrapper>
      {/* Price card */}
      <PriceCard>
        {/* Price */}
        <div>
          <Text textVariant="caption">{t('propertyDetail.booking.from')}</Text>
          <PriceHeadline>
            {formatPrice(480000)}{' '}
            <PricePerNightLabel component="span">
              {t('propertyDetail.booking.perNight')}
            </PricePerNightLabel>
          </PriceHeadline>
        </div>

        {/* Date fields */}
        <DateFieldsGrid>
          <DateField>
            <FieldTopLabel>{t('propertyDetail.booking.checkIn')}</FieldTopLabel>
            <FieldValue>{formatDate('2026-03-15', 'shortWithDay')}</FieldValue>
          </DateField>
          <DateField>
            <FieldTopLabel>{t('propertyDetail.booking.checkOut')}</FieldTopLabel>
            <FieldValue>{formatDate('2026-03-20', 'shortWithDay')}</FieldValue>
          </DateField>
        </DateFieldsGrid>

        {/* Guests */}
        <GuestsField>
          <div>
            <FieldTopLabel>{t('propertyDetail.booking.guests')}</FieldTopLabel>
            <FieldValue>{t('propertyDetail.booking.defaultGuests')}</FieldValue>
          </div>
          <ExpandMoreIcon sx={{ color: palette.onSurfaceVariant, fontSize: 20 }} />
        </GuestsField>

        {/* Price breakdown */}
        <PriceBreakdown>
          <PriceRow>
            <Text textVariant="body">
              {formatPrice(480000)} x 5 {t('propertyDetail.booking.nights')}
            </Text>
            <Text textVariant="body">{formatPrice(2400000)}</Text>
          </PriceRow>
          <PriceRow>
            <Text textVariant="body">{t('propertyDetail.booking.taxesAndFees')}</Text>
            <Text textVariant="body">{formatPrice(264000)}</Text>
          </PriceRow>
          <PriceTotalRow>
            <Text textVariant="bodySemibold">{t('propertyDetail.booking.total')}</Text>
            <Text textVariant="bodySemibold">{formatPrice(2664000)}</Text>
          </PriceTotalRow>
        </PriceBreakdown>

        {/* Reserve button */}
        <PrimaryPillButton
          pillSize="lg"
          fullWidth
          loading={setCart.isPending}
          onClick={handleReserve}
        >
          {t('propertyDetail.booking.reserveNow')}
        </PrimaryPillButton>

        {/* Secure badge */}
        <SecureBadge>
          <LockIcon sx={{ fontSize: 16, color: palette.primary }} />
          <Text textVariant="caption">{t('propertyDetail.booking.securePayment')}</Text>
        </SecureBadge>
      </PriceCard>

      {/* Cancellation policy */}
      <div>
        <Text textVariant="cardSubheading" sx={{ mb: '12px' }}>
          {t('propertyDetail.cancellation.title')}
        </Text>
        <CancellationPolicyCard>
          <CancellationRow>
            <CheckCircleIcon sx={{ color: '#1A6B4F', fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, color: palette.onSurface }}>
              {t('propertyDetail.cancellation.freeCancellation')}
            </Typography>
          </CancellationRow>
          <CancellationRow>
            <InfoIcon sx={{ color: palette.star, fontSize: 18 }} />
            <Text textVariant="hint">{t('propertyDetail.cancellation.halfCharge')}</Text>
          </CancellationRow>
          <CancellationRow>
            <CancelIcon sx={{ color: '#B5451B', fontSize: 18 }} />
            <Text textVariant="hint">{t('propertyDetail.cancellation.noRefund')}</Text>
          </CancellationRow>
        </CancellationPolicyCard>
      </div>
    </SidebarWrapper>
  );

  return (
    <TravelerLayout variant="detail" sidebar={<BookingSidebar />}>
      <ContentColumn>
        {/* Gallery */}
        <GalleryGrid>
          <GalleryMainImage />
          <Box sx={{ background: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)' }} />
          <Box sx={{ background: 'linear-gradient(135deg, #5B5EA6, #8E91CC)' }} />
          <Box sx={{ background: 'linear-gradient(135deg, #B5451B, #E07050)' }} />
          <GalleryMorePhotosOverlay
            sx={{
              '&::after': {
                content: `"${t('propertyDetail.morePhotos')}"`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          />
        </GalleryGrid>

        {/* Header */}
        <HeaderRow>
          <HeaderInfo>
            <HotelTypeLabel>{t('propertyDetail.hotelType')}</HotelTypeLabel>
            <HotelTitle component="h1">Hotel Santa Clara Sofitel</HotelTitle>
            <LocationRow>
              <PlaceIcon sx={{ fontSize: 16 }} />
              Centro Historico, Cartagena, Colombia
            </LocationRow>
            <RatingRow>
              <RatingBadge rating={4.8} />
              <StarsText>&#9733;&#9733;&#9733;&#9733;&#9733;</StarsText>
              <Text textVariant="hint">312 {t('propertyDetail.reviews')}</Text>
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
        <div>
          <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
            {t('propertyDetail.description')}
          </Text>
          <Text textVariant="body" sx={{ lineHeight: 1.6, maxWidth: 860 }}>
            {t('propertyDetail.descriptionText')}
          </Text>
        </div>

        {/* Amenities */}
        <div>
          <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
            {t('propertyDetail.amenities.title')}
          </Text>
          <AmenitiesGrid>
            {amenities.map(amenity => (
              <AmenityChip key={amenity.label}>
                {amenity.icon}
                {amenity.label}
              </AmenityChip>
            ))}
          </AmenitiesGrid>
        </div>

        {/* Rooms */}
        <div>
          <Text textVariant="sectionTitle" sx={{ mb: '12px' }}>
            {t('propertyDetail.rooms.title')}
          </Text>
          <RoomsList>
            {rooms.map(room => (
              <RoomCard key={room.name}>
                <RoomThumbnail gradient={room.gradient} />
                <Box sx={{ flex: 1 }}>
                  <Text textVariant="cardSubheading" sx={{ mb: '4px' }}>
                    {room.name}
                  </Text>
                  <Text textVariant="hint">{room.features}</Text>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Text textVariant="price">{room.price}</Text>
                  <Text textVariant="caption">{t('propertyDetail.rooms.perNight')}</Text>
                </Box>
                {room.active ? (
                  <PrimaryPillButton pillSize="xs" sx={{ whiteSpace: 'nowrap' }}>
                    {t('propertyDetail.rooms.select')}
                  </PrimaryPillButton>
                ) : (
                  <OutlinedPillButton
                    pillSize="xs"
                    variant="outlined"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t('propertyDetail.rooms.select')}
                  </OutlinedPillButton>
                )}
              </RoomCard>
            ))}
          </RoomsList>
        </div>

        {/* Reviews */}
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
      </ContentColumn>
    </TravelerLayout>
  );
}
