import { useState } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import SearchOffIcon from '@mui/icons-material/SearchOff';
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
  EmptyStateBox,
} from './ResultsPage.styles';

function formatShortDate(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  return new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' }).format(d);
}

function calcNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const diff =
    new Date(checkOut + 'T00:00:00').getTime() - new Date(checkIn + 'T00:00:00').getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

const STAR_OPTIONS = [
  { label: '5', value: 5 },
  { label: '4+', value: 4 },
  { label: '3+', value: 3 },
  { label: '2+', value: 2 },
  { label: '1+', value: 1 },
];

// Keys match backend amenity names directly
const AMENITY_KEYS = [
  'wifi',
  'ac',
  'tv',
  'minibar',
  'balcony',
  'jacuzzi',
  'desk',
  'kitchen',
  'private_pool',
  'garden_view',
] as const;
type AmenityKey = (typeof AMENITY_KEYS)[number];

const DEFAULT_AMENITIES: Record<AmenityKey, boolean> = {
  wifi: false,
  ac: false,
  tv: false,
  minibar: false,
  balcony: false,
  jacuzzi: false,
  desk: false,
  kitchen: false,
  private_pool: false,
  garden_view: false,
};

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') ?? '';
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1) || 1;

  // Filter state
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [checkedAmenities, setCheckedAmenities] =
    useState<Record<AmenityKey, boolean>>(DEFAULT_AMENITIES);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const { data: hotels, isLoading } = useSearchHotels(
    destination
      ? { destination, checkIn, checkOut, guests, ...(minRating ? { minRating } : {}) }
      : undefined
  );

  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  if (isLoading) return <ResultsPageSkeleton />;

  const nights = calcNights(checkIn, checkOut);
  const datesLabel =
    checkIn && checkOut ? `${formatShortDate(checkIn)} – ${formatShortDate(checkOut)}` : '';
  const guestsLabel = t('home.search.guestsCount', { count: guests });
  const navSummary = destination
    ? [destination, datesLabel, guestsLabel].filter(Boolean).join(' · ')
    : t('results.searchSummary');

  const hotelList = (Array.isArray(hotels) ? hotels : []) as Array<{
    id: string;
    type: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    starsText: string;
    pricePerNight: number;
    gradient: string;
    amenities: Array<{ key: string; icon: string; label: string }>;
    photoCount: number;
  }>;

  // ── Client-side filter + sort ──────────────────────────────────────────────
  let displayList = [...hotelList];

  const minP = parseFloat(minPrice);
  const maxP = parseFloat(maxPrice);
  if (!isNaN(minP) && minP > 0) displayList = displayList.filter(h => h.pricePerNight >= minP);
  if (!isNaN(maxP) && maxP > 0) displayList = displayList.filter(h => h.pricePerNight <= maxP);

  if (selectedType) displayList = displayList.filter(h => h.type === selectedType);

  const activeAmenities = AMENITY_KEYS.filter(k => checkedAmenities[k]);
  if (activeAmenities.length > 0) {
    displayList = displayList.filter(h =>
      activeAmenities.every(k => h.amenities.some(a => a.key === k))
    );
  }

  if (sortBy === 'priceLowToHigh') displayList.sort((a, b) => a.pricePerNight - b.pricePerNight);
  else if (sortBy === 'priceHighToLow')
    displayList.sort((a, b) => b.pricePerNight - a.pricePerNight);
  else if (sortBy === 'ratingSort' || sortBy === 'popularity')
    displayList.sort((a, b) => b.rating - a.rating);
  // ──────────────────────────────────────────────────────────────────────────

  const propertyTypes = [
    t('results.filters.propertyTypes.hotel'),
    t('results.filters.propertyTypes.hostel'),
    t('results.filters.propertyTypes.apartment'),
    t('results.filters.propertyTypes.resort'),
    t('results.filters.propertyTypes.cabin'),
  ];

  const amenitiesFilter: Array<{ key: AmenityKey; label: string }> = [
    { key: 'wifi', label: t('results.filters.wifi') },
    { key: 'ac', label: t('results.filters.ac') },
    { key: 'tv', label: t('results.filters.tv') },
    { key: 'minibar', label: t('results.filters.minibar') },
    { key: 'balcony', label: t('results.filters.balcony') },
    { key: 'jacuzzi', label: t('results.filters.jacuzzi') },
    { key: 'desk', label: t('results.filters.desk') },
    { key: 'kitchen', label: t('results.filters.kitchen') },
    { key: 'private_pool', label: t('results.filters.private_pool') },
    { key: 'garden_view', label: t('results.filters.garden_view') },
  ];

  const toggleAmenity = (key: AmenityKey) =>
    setCheckedAmenities(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleRating = (value: number) => setMinRating(prev => (prev === value ? null : value));

  const toggleType = (type: string) => setSelectedType(prev => (prev === type ? null : type));

  return (
    <PageRoot>
      <TravelerNav variant="results" searchSummary={navSummary} />

      <PageBody>
        {/* SIDEBAR FILTERS */}
        <FilterSidebarContainer>
          <Text textVariant="sectionTitle">{t('results.filters.title')}</Text>

          {/* Price range */}
          <FilterSection>
            <FilterSectionLabel>{t('results.filters.pricePerNight')}</FilterSectionLabel>
            <FilterInputGroup>
              <Text textVariant="caption">{t('results.filters.minimum')}</Text>
              <FilterInput
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
              />
              <Text textVariant="caption">{t('results.filters.maximum')}</Text>
              <FilterInput
                type="number"
                placeholder="800000"
                value={maxPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
              />
            </FilterInputGroup>
          </FilterSection>

          {/* Property type */}
          <FilterSection>
            <FilterSectionLabel>{t('results.filters.propertyType')}</FilterSectionLabel>
            <PropertyTypeTags>
              {propertyTypes.map(type => (
                <PropertyTypeTag
                  key={type}
                  active={selectedType === type}
                  onClick={() => toggleType(type)}
                >
                  {type}
                </PropertyTypeTag>
              ))}
            </PropertyTypeTags>
          </FilterSection>

          {/* Star rating — wired to backend min_rating param */}
          <FilterSection>
            <FilterSectionLabel>{t('results.filters.rating')}</FilterSectionLabel>
            <StarRatingTags>
              {STAR_OPTIONS.map(opt => (
                <StarTag
                  key={opt.label}
                  active={minRating === opt.value}
                  onClick={() => toggleRating(opt.value)}
                >
                  <StarIcon sx={{ color: palette.star, fontSize: 14 }} />
                  {opt.label}
                </StarTag>
              ))}
              <StarTag active={minRating === null} onClick={() => setMinRating(null)}>
                {t('results.filters.all')}
              </StarTag>
            </StarRatingTags>
          </FilterSection>

          {/* Amenities */}
          <FilterSection>
            <FilterSectionLabel>{t('results.filters.amenities')}</FilterSectionLabel>
            {amenitiesFilter.map(amenity => (
              <FormControlLabel
                key={amenity.key}
                control={
                  <Checkbox
                    checked={checkedAmenities[amenity.key]}
                    onChange={() => toggleAmenity(amenity.key)}
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
                  '& .MuiFormControlLabel-label': { fontSize: 14, color: palette.onSurface },
                }}
              />
            ))}
          </FilterSection>
        </FilterSidebarContainer>

        {/* RESULTS AREA */}
        <ResultsArea>
          {/* Results header */}
          <ResultsHeader>
            <ResultsCountText noWrap>
              <Box component="span" sx={{ fontWeight: 600 }}>
                {t('results.header.accommodationsFound', { count: displayList.length })}
              </Box>
              {destination && (
                <>
                  {' '}
                  {t('results.header.foundIn', {
                    destination,
                    dates: datesLabel,
                    guests: guestsLabel,
                  })}
                </>
              )}
            </ResultsCountText>
            <SortRow>
              <Text textVariant="body">{t('results.header.sortBy')}</Text>
              <SortSelect
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
              >
                <option value="recommended">{t('results.header.recommended')}</option>
                <option value="priceLowToHigh">{t('results.header.priceLowToHigh')}</option>
                <option value="priceHighToLow">{t('results.header.priceHighToLow')}</option>
                <option value="ratingSort">{t('results.header.ratingSort')}</option>
                <option value="popularity">{t('results.header.popularity')}</option>
              </SortSelect>
            </SortRow>
          </ResultsHeader>

          {/* Empty state */}
          {displayList.length === 0 && (
            <EmptyStateBox>
              <SearchOffIcon sx={{ fontSize: 56, color: palette.outline }} />
              <Text textVariant="sectionTitle">{t('results.noResults.title')}</Text>
              <Text textVariant="body" sx={{ color: palette.onSurfaceVariant, maxWidth: 400 }}>
                {t('results.noResults.subtitle')}
              </Text>
            </EmptyStateBox>
          )}

          {/* Hotel cards */}
          {displayList.map(hotel => {
            const totalPrice = hotel.pricePerNight * nights;
            return (
              <Link
                key={hotel.id}
                to={`/property/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <HotelCard>
                  {/* Image area */}
                  <HotelCardImage gradient={hotel.gradient}>
                    {hotel.photoCount > 0 && (
                      <PhotoCountBadge>
                        {t('results.card.photos', { count: hotel.photoCount })}
                      </PhotoCountBadge>
                    )}
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
                      {hotel.reviewCount > 0 && (
                        <Text textVariant="caption">
                          ({hotel.reviewCount} {t('results.card.reviews')})
                        </Text>
                      )}
                    </HotelCardRatingRow>
                    {hotel.amenities.length > 0 && (
                      <HotelCardAmenities>
                        {hotel.amenities.map(amenity => (
                          <AmenityTag
                            key={amenity.label}
                            icon={amenity.icon}
                            label={amenity.label}
                          />
                        ))}
                      </HotelCardAmenities>
                    )}
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
                    {nights > 1 && (
                      <Text textVariant="caption">
                        {`${formatPrice(totalPrice)} ${t('results.card.total')}`}
                      </Text>
                    )}
                    <PrimaryPillButton pillSize="sm" sx={{ width: '100%' }}>
                      {t('results.card.viewRooms')}
                    </PrimaryPillButton>
                  </HotelCardPriceColumn>
                </HotelCard>
              </Link>
            );
          })}
        </ResultsArea>
      </PageBody>
    </PageRoot>
  );
}
