import { Box, Skeleton } from '@mui/material';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import {
  SidebarWrapper,
  PriceCard,
  DateFieldsGrid,
  PriceBreakdown,
  PriceTotalRow,
  SecureBadge,
  CancellationPolicyCard,
  CancellationRow,
  ContentColumn,
  GalleryGrid,
  HeaderRow,
  HeaderInfo,
  RatingRow,
  ActionButtons,
  AmenitiesGrid,
  RoomsList,
  RoomCard,
  ReviewsRow,
  ReviewCard,
  ReviewAuthorRow,
} from './PropertyDetailPage.styles';

const BookingSidebarSkeleton = () => (
  <SidebarWrapper>
    {/* Price card */}
    <PriceCard>
      {/* From / price */}
      <div>
        <Skeleton animation="wave" variant="text" width={40} height={16} />
        <Skeleton animation="wave" variant="text" width={160} height={48} />
      </div>

      {/* Date fields */}
      <DateFieldsGrid>
        <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />
        <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />
      </DateFieldsGrid>

      {/* Guests */}
      <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />

      {/* Price breakdown */}
      <PriceBreakdown>
        {[0, 1].map(i => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton animation="wave" variant="text" width="55%" height={20} />
            <Skeleton animation="wave" variant="text" width="30%" height={20} />
          </Box>
        ))}
        <PriceTotalRow>
          <Skeleton animation="wave" variant="text" width={50} height={22} />
          <Skeleton animation="wave" variant="text" width={90} height={22} />
        </PriceTotalRow>
      </PriceBreakdown>

      {/* Reserve button */}
      <Skeleton animation="wave" variant="rounded" height={52} sx={{ borderRadius: '100px' }} />

      {/* Secure badge */}
      <SecureBadge>
        <Skeleton animation="wave" variant="text" width={140} height={18} />
      </SecureBadge>
    </PriceCard>

    {/* Cancellation policy card */}
    <div>
      <Skeleton animation="wave" variant="text" width={140} height={22} sx={{ mb: '12px' }} />
      <CancellationPolicyCard>
        {[0, 1, 2].map(i => (
          <CancellationRow key={i}>
            <Skeleton animation="wave" variant="circular" width={18} height={18} />
            <Skeleton animation="wave" variant="text" width="80%" height={18} />
          </CancellationRow>
        ))}
      </CancellationPolicyCard>
    </div>
  </SidebarWrapper>
);

export default function PropertyDetailPageSkeleton() {
  return (
    <TravelerLayout variant="detail" sidebar={<BookingSidebarSkeleton />}>
      <ContentColumn>
        {/* Gallery skeleton */}
        <GalleryGrid>
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}
          />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
        </GalleryGrid>

        {/* Header */}
        <HeaderRow>
          <HeaderInfo>
            <Skeleton animation="wave" variant="text" width={80} height={18} />
            <Skeleton animation="wave" variant="text" width={360} height={44} />
            <Skeleton animation="wave" variant="text" width={240} height={22} />
            <RatingRow>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={40}
                height={28}
                sx={{ borderRadius: '6px' }}
              />
              <Skeleton animation="wave" variant="text" width={90} height={22} />
              <Skeleton animation="wave" variant="text" width={70} height={18} />
            </RatingRow>
          </HeaderInfo>
          <ActionButtons>
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </ActionButtons>
        </HeaderRow>

        {/* Description */}
        <div>
          <Skeleton animation="wave" variant="text" width={120} height={28} sx={{ mb: '12px' }} />
          <Skeleton animation="wave" variant="text" height={18} />
          <Skeleton animation="wave" variant="text" height={18} />
          <Skeleton animation="wave" variant="text" width="75%" height={18} />
        </div>

        {/* Amenities */}
        <div>
          <Skeleton animation="wave" variant="text" width={100} height={28} sx={{ mb: '12px' }} />
          <AmenitiesGrid>
            {[90, 70, 110, 80, 60, 90, 100, 80, 70].map((w, i) => (
              <Skeleton
                key={i}
                animation="wave"
                variant="rounded"
                width={w}
                height={36}
                sx={{ borderRadius: '100px' }}
              />
            ))}
          </AmenitiesGrid>
        </div>

        {/* Rooms */}
        <div>
          <Skeleton animation="wave" variant="text" width={140} height={28} sx={{ mb: '12px' }} />
          <RoomsList>
            {[0, 1].map(i => (
              <RoomCard key={i}>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={72}
                  height={72}
                  sx={{ borderRadius: '10px', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width="50%"
                    height={22}
                    sx={{ mb: '4px' }}
                  />
                  <Skeleton animation="wave" variant="text" width="75%" height={18} />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Skeleton animation="wave" variant="text" width={100} height={28} />
                  <Skeleton animation="wave" variant="text" width={60} height={16} />
                </Box>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={90}
                  height={36}
                  sx={{ borderRadius: '100px' }}
                />
              </RoomCard>
            ))}
          </RoomsList>
        </div>

        {/* Reviews */}
        <div>
          <Skeleton animation="wave" variant="text" width={160} height={28} sx={{ mb: '12px' }} />
          <ReviewsRow>
            {[0, 1, 2].map(i => (
              <ReviewCard key={i}>
                <ReviewAuthorRow>
                  <Skeleton animation="wave" variant="circular" width={36} height={36} />
                  <div>
                    <Skeleton animation="wave" variant="text" width={100} height={20} />
                    <Skeleton animation="wave" variant="text" width={70} height={16} />
                  </div>
                </ReviewAuthorRow>
                <Skeleton animation="wave" variant="text" width={70} height={18} />
                <Skeleton animation="wave" variant="text" height={16} />
                <Skeleton animation="wave" variant="text" height={16} />
                <Skeleton animation="wave" variant="text" width="60%" height={16} />
              </ReviewCard>
            ))}
          </ReviewsRow>
        </div>
      </ContentColumn>
    </TravelerLayout>
  );
}
