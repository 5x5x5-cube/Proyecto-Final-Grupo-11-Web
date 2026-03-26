import { Box, Skeleton } from '@mui/material';
import {
  PageRoot,
  PageBody,
  FilterSidebarContainer,
  FilterSection,
  PropertyTypeTags,
  StarRatingTags,
  ResultsArea,
  ResultsHeader,
  HotelCard,
  HotelCardInfo,
  HotelCardPriceColumn,
} from './ResultsPage.styles';

const FilterSidebarSkeleton = () => (
  <FilterSidebarContainer>
    {/* Title */}
    <Skeleton animation="wave" variant="text" width={80} height={28} />

    {/* Price range section */}
    <FilterSection>
      <Skeleton animation="wave" variant="text" width={100} height={18} />
      <Skeleton animation="wave" variant="rounded" height={44} />
      <Skeleton animation="wave" variant="rounded" height={44} />
    </FilterSection>

    {/* Property type section */}
    <FilterSection>
      <Skeleton animation="wave" variant="text" width={110} height={18} />
      <PropertyTypeTags>
        {[60, 52, 80, 56, 50].map((w, i) => (
          <Skeleton
            key={i}
            animation="wave"
            variant="rounded"
            width={w}
            height={32}
            sx={{ borderRadius: '8px' }}
          />
        ))}
      </PropertyTypeTags>
    </FilterSection>

    {/* Star rating section */}
    <FilterSection>
      <Skeleton animation="wave" variant="text" width={90} height={18} />
      <StarRatingTags>
        {[44, 48, 48, 44].map((w, i) => (
          <Skeleton
            key={i}
            animation="wave"
            variant="rounded"
            width={w}
            height={32}
            sx={{ borderRadius: '8px' }}
          />
        ))}
      </StarRatingTags>
    </FilterSection>

    {/* Amenities section */}
    <FilterSection>
      <Skeleton animation="wave" variant="text" width={80} height={18} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Skeleton key={i} animation="wave" variant="text" height={20} />
      ))}
    </FilterSection>
  </FilterSidebarContainer>
);

const HotelCardSkeleton = () => (
  <HotelCard>
    {/* Image area */}
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={240}
      height={180}
      sx={{ flexShrink: 0 }}
    />

    {/* Info section */}
    <HotelCardInfo>
      <Skeleton animation="wave" variant="text" width={60} height={16} />
      <Skeleton animation="wave" variant="text" width="70%" height={24} />
      <Skeleton animation="wave" variant="text" width="50%" height={18} />
      <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          width={40}
          height={24}
          sx={{ borderRadius: '6px' }}
        />
        <Skeleton animation="wave" variant="text" width={80} height={20} />
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', mt: '4px' }}>
        {[70, 80, 60].map((w, i) => (
          <Skeleton
            key={i}
            animation="wave"
            variant="rounded"
            width={w}
            height={24}
            sx={{ borderRadius: '100px' }}
          />
        ))}
      </Box>
    </HotelCardInfo>

    {/* Price column */}
    <HotelCardPriceColumn>
      <Skeleton animation="wave" variant="text" width={40} height={16} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
        <Skeleton animation="wave" variant="text" width={110} height={36} />
        <Skeleton animation="wave" variant="text" width={60} height={16} />
      </Box>
      <Skeleton animation="wave" variant="text" width={100} height={16} />
      <Skeleton
        animation="wave"
        variant="rounded"
        width={152}
        height={40}
        sx={{ borderRadius: '100px' }}
      />
    </HotelCardPriceColumn>
  </HotelCard>
);

export default function ResultsPageSkeleton() {
  return (
    <PageRoot>
      {/* PAGE BODY -- nav is rendered by the page, we only render the body area */}
      <PageBody>
        {/* Sidebar skeleton */}
        <FilterSidebarSkeleton />

        {/* Results area skeleton */}
        <ResultsArea>
          {/* Results header row */}
          <ResultsHeader>
            <Skeleton animation="wave" variant="text" width={260} height={24} />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={180}
              height={40}
              sx={{ borderRadius: '8px' }}
            />
          </ResultsHeader>

          {/* Hotel card skeletons */}
          {[0, 1, 2, 3].map(i => (
            <HotelCardSkeleton key={i} />
          ))}
        </ResultsArea>
      </PageBody>
    </PageRoot>
  );
}
