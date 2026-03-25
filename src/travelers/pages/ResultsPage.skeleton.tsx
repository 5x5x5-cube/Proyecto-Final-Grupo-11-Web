import { Box, Skeleton } from '@mui/material';
import { palette } from '../../design-system/theme/palette';

const FilterSidebarSkeleton = () => (
  <Box
    sx={{
      width: 280,
      minWidth: 280,
      maxWidth: 280,
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      borderRight: `1px solid ${palette.outlineVariant}`,
      padding: '20px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      maxHeight: 'calc(100vh - 72px)',
      position: 'sticky',
      top: 0,
    }}
  >
    {/* Title */}
    <Skeleton animation="wave" variant="text" width={80} height={28} />

    {/* Price range section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton animation="wave" variant="text" width={100} height={18} />
      <Skeleton animation="wave" variant="rounded" height={44} />
      <Skeleton animation="wave" variant="rounded" height={44} />
    </Box>

    {/* Property type section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton animation="wave" variant="text" width={110} height={18} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
      </Box>
    </Box>

    {/* Star rating section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton animation="wave" variant="text" width={90} height={18} />
      <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
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
      </Box>
    </Box>

    {/* Amenities section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton animation="wave" variant="text" width={80} height={18} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Skeleton key={i} animation="wave" variant="text" height={20} />
      ))}
    </Box>
  </Box>
);

const HotelCardSkeleton = () => (
  <Box
    sx={{
      backgroundColor: '#ffffff',
      border: `1px solid ${palette.outlineVariant}`,
      borderRadius: '16px',
      display: 'flex',
      overflow: 'hidden',
      height: 180,
    }}
  >
    {/* Image area */}
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={240}
      height={180}
      sx={{ flexShrink: 0 }}
    />

    {/* Info section */}
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
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
    </Box>

    {/* Price column */}
    <Box
      sx={{
        width: 200,
        flexShrink: 0,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderLeft: `1px solid ${palette.outlineVariant}`,
      }}
    >
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
    </Box>
  </Box>
);

export default function ResultsPageSkeleton() {
  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: palette.background,
        fontFamily: "'Roboto', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* PAGE BODY — nav is rendered by the page, we only render the body area */}
      <Box
        sx={{
          display: 'flex',
          minHeight: 'calc(100vh - 72px)',
          overflow: 'hidden',
          maxWidth: '100vw',
        }}
      >
        {/* Sidebar skeleton */}
        <FilterSidebarSkeleton />

        {/* Results area skeleton */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Results header row */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Skeleton animation="wave" variant="text" width={260} height={24} />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={180}
              height={40}
              sx={{ borderRadius: '8px' }}
            />
          </Box>

          {/* Hotel card skeletons */}
          {[0, 1, 2, 3].map(i => (
            <HotelCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
