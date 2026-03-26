import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import TravelerNav from '@/design-system/layouts/TravelerNav';
import AmenityTag from '@/design-system/components/AmenityTag';
import RatingBadge from '@/design-system/components/RatingBadge';
import { palette } from '@/design-system/theme/palette';
import { useSearchHotels } from '@/api/hooks/useSearch';
import ResultsPageSkeleton from './ResultsPage.skeleton';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import {
  PageRoot,
  PageBody,
  FilterSidebarContainer,
  FilterSectionLabel,
  FilterSection,
  FilterInputGroup,
  FilterInput,
  PropertyTypeTags,
  PropertyTypeTag,
  StarRatingTags,
  StarTag,
  ResultsArea,
  ResultsHeader,
  ResultsCountText,
  SortRow,
  SortSelect,
  HotelCard,
  HotelCardImage,
  PhotoCountBadge,
  HotelCardInfo,
  HotelCardName,
  HotelCardLocation,
  HotelCardRatingRow,
  HotelCardStars,
  HotelCardAmenities,
  HotelCardPriceColumn,
  HotelCardFromLabel,
  HotelCardPrice,
} from './ResultsPage.styles';

const starOptions = [
  { label: '5', value: 5, selected: false },
  { label: '4+', value: 4, selected: true },
  { label: '3+', value: 3, selected: false },
];

export default function ResultsPage() {
  const { data: hotels, isLoading } = useSearchHotels();

  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  if (isLoading || !hotels) return <ResultsPageSkeleton />;

  const mockHotels = hotels as Array<{
    id: number;
    type: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    starsText: string;
    pricePerNight: number;
    totalPrice: number;
    gradient: string;
    amenities: Array<{ icon: string; label: string }>;
    photoCount: number;
  }>;

  const propertyTypes = [
    t('results.filters.propertyTypes.hotel'),
    t('results.filters.propertyTypes.hostel'),
    t('results.filters.propertyTypes.apartment'),
    t('results.filters.propertyTypes.resort'),
    t('results.filters.propertyTypes.cabin'),
  ];

  const amenitiesFilter = [
    { label: t('results.filters.freeWifi'), checked: true },
    { label: t('results.filters.breakfastIncluded'), checked: true },
    { label: t('results.filters.pool'), checked: false },
    { label: t('results.filters.parking'), checked: false },
    { label: t('results.filters.petsAllowed'), checked: false },
    { label: t('results.filters.airConditioning'), checked: false },
  ];

  const FilterSidebar = () => (
    <FilterSidebarContainer>
      <Text textVariant="sectionTitle">{t('results.filters.title')}</Text>

      {/* Price range */}
      <FilterSection>
        <FilterSectionLabel>{t('results.filters.pricePerNight')}</FilterSectionLabel>
        <FilterInputGroup>
          <Text textVariant="caption">{t('results.filters.minimum')}</Text>
          <FilterInput component="input" defaultValue={formatPrice(0)} />
          <Text textVariant="caption">{t('results.filters.maximum')}</Text>
          <FilterInput component="input" defaultValue={formatPrice(800000)} />
        </FilterInputGroup>
      </FilterSection>

      {/* Property type */}
      <FilterSection>
        <FilterSectionLabel>{t('results.filters.propertyType')}</FilterSectionLabel>
        <PropertyTypeTags>
          {propertyTypes.map((type, i) => (
            <PropertyTypeTag key={type} active={i === 0}>
              {type}
            </PropertyTypeTag>
          ))}
        </PropertyTypeTags>
      </FilterSection>

      {/* Star rating */}
      <FilterSection>
        <FilterSectionLabel>{t('results.filters.rating')}</FilterSectionLabel>
        <StarRatingTags>
          {starOptions.map(opt => (
            <StarTag key={opt.label} active={opt.selected}>
              {opt.value > 0 && <StarIcon sx={{ color: palette.star, fontSize: 14 }} />}
              {opt.label}
            </StarTag>
          ))}
          <StarTag>{t('results.filters.all')}</StarTag>
        </StarRatingTags>
      </FilterSection>

      {/* Amenities */}
      <FilterSection>
        <FilterSectionLabel>{t('results.filters.amenities')}</FilterSectionLabel>
        {amenitiesFilter.map(amenity => (
          <FormControlLabel
            key={amenity.label}
            control={
              <Checkbox
                defaultChecked={amenity.checked}
                sx={{
                  color: palette.outline,
                  '&.Mui-checked': { color: palette.primary },
                  padding: '0 10px 0 0',
                }}
                size="small"
              />
            }
            label={amenity.label}
            sx={{
              ml: 0,
              '& .MuiFormControlLabel-label': {
                fontSize: 14,
                color: palette.onSurface,
              },
            }}
          />
        ))}
      </FilterSection>
    </FilterSidebarContainer>
  );

  return (
    <PageRoot>
      <TravelerNav variant="results" searchSummary={t('results.searchSummary')} />

      {/* PAGE BODY */}
      <PageBody>
        {/* SIDEBAR FILTERS */}
        <FilterSidebar />

        {/* RESULTS AREA */}
        <ResultsArea>
          {/* Results header */}
          <ResultsHeader>
            <ResultsCountText noWrap>
              <Box component="span" sx={{ fontWeight: 600 }}>
                {t('results.header.accommodationsFound', { count: 247 })}
              </Box>{' '}
              {t('results.header.foundIn')}
            </ResultsCountText>
            <SortRow>
              <Text textVariant="body">{t('results.header.sortBy')}</Text>
              <SortSelect component="select" defaultValue={t('results.header.recommended')}>
                <option>{t('results.header.recommended')}</option>
                <option>{t('results.header.priceLowToHigh')}</option>
                <option>{t('results.header.priceHighToLow')}</option>
                <option>{t('results.header.ratingSort')}</option>
                <option>{t('results.header.popularity')}</option>
              </SortSelect>
            </SortRow>
          </ResultsHeader>

          {/* Hotel cards */}
          {mockHotels.map(hotel => (
            <Link
              key={hotel.id}
              to={`/property/${hotel.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <HotelCard>
                {/* Image area */}
                <HotelCardImage gradient={hotel.gradient}>
                  <PhotoCountBadge>
                    {t('results.card.photos', { count: hotel.photoCount })}
                  </PhotoCountBadge>
                </HotelCardImage>

                {/* Info section */}
                <HotelCardInfo>
                  <Text textVariant="overline">{hotel.type}</Text>
                  <HotelCardName>{hotel.name}</HotelCardName>
                  <HotelCardLocation>
                    <PlaceIcon sx={{ fontSize: 14 }} />
                    {hotel.location}
                  </HotelCardLocation>
                  <HotelCardRatingRow>
                    <RatingBadge rating={hotel.rating} />
                    <HotelCardStars>{hotel.starsText}</HotelCardStars>
                    <Text textVariant="caption">
                      ({hotel.reviewCount} {t('results.card.reviews')})
                    </Text>
                  </HotelCardRatingRow>
                  <HotelCardAmenities>
                    {hotel.amenities.map(amenity => (
                      <AmenityTag key={amenity.label} icon={amenity.icon} label={amenity.label} />
                    ))}
                  </HotelCardAmenities>
                </HotelCardInfo>

                {/* Price column */}
                <HotelCardPriceColumn>
                  <HotelCardFromLabel>{t('results.card.from')}</HotelCardFromLabel>
                  <div>
                    <HotelCardPrice>{formatPrice(hotel.pricePerNight)}</HotelCardPrice>
                    <Text textVariant="caption" sx={{ textAlign: 'right' }}>
                      {t('results.card.perNight')}
                    </Text>
                  </div>
                  <Text textVariant="caption">
                    {`${formatPrice(hotel.totalPrice)} ${t('results.card.total')}`}
                  </Text>
                  <PrimaryPillButton pillSize="sm" sx={{ width: '100%' }}>
                    {t('results.card.viewRooms')}
                  </PrimaryPillButton>
                </HotelCardPriceColumn>
              </HotelCard>
            </Link>
          ))}
        </ResultsArea>
      </PageBody>
    </PageRoot>
  );
}
