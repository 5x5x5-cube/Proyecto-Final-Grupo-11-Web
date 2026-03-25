import { Box, Skeleton } from '@mui/material';
import { palette } from '../../design-system/theme/palette';
import TravelerLayout from '../../design-system/layouts/TravelerLayout';

const BookingSidebarSkeleton = () => (
  <Box sx={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Price card */}
    <Box
      sx={{
        backgroundColor: palette.background,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* From / price */}
      <Box>
        <Skeleton animation="wave" variant="text" width={40} height={16} />
        <Skeleton animation="wave" variant="text" width={160} height={48} />
      </Box>

      {/* Date fields */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />
        <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />
      </Box>

      {/* Guests */}
      <Skeleton animation="wave" variant="rounded" height={60} sx={{ borderRadius: '8px' }} />

      {/* Price breakdown */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[0, 1].map(i => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton animation="wave" variant="text" width="55%" height={20} />
            <Skeleton animation="wave" variant="text" width="30%" height={20} />
          </Box>
        ))}
        <Box
          sx={{
            borderTop: `1px solid ${palette.outlineVariant}`,
            pt: '10px',
            mt: '4px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton animation="wave" variant="text" width={50} height={22} />
          <Skeleton animation="wave" variant="text" width={90} height={22} />
        </Box>
      </Box>

      {/* Reserve button */}
      <Skeleton animation="wave" variant="rounded" height={52} sx={{ borderRadius: '100px' }} />

      {/* Secure badge */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton animation="wave" variant="text" width={140} height={18} />
      </Box>
    </Box>

    {/* Cancellation policy card */}
    <Box>
      <Skeleton animation="wave" variant="text" width={140} height={22} sx={{ mb: '12px' }} />
      <Box
        sx={{
          borderRadius: '12px',
          padding: '16px',
          border: `1px solid ${palette.outlineVariant}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {[0, 1, 2].map(i => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={18} height={18} />
            <Skeleton animation="wave" variant="text" width="80%" height={18} />
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default function PropertyDetailPageSkeleton() {
  return (
    <TravelerLayout variant="detail" sidebar={<BookingSidebarSkeleton />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Gallery skeleton */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '260px 130px',
            gap: '8px',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}
          />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
          <Skeleton animation="wave" variant="rectangular" />
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton animation="wave" variant="text" width={80} height={18} />
            <Skeleton animation="wave" variant="text" width={360} height={44} />
            <Skeleton animation="wave" variant="text" width={240} height={22} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={40}
                height={28}
                sx={{ borderRadius: '6px' }}
              />
              <Skeleton animation="wave" variant="text" width={90} height={22} />
              <Skeleton animation="wave" variant="text" width={70} height={18} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Skeleton animation="wave" variant="text" width={120} height={28} sx={{ mb: '12px' }} />
          <Skeleton animation="wave" variant="text" height={18} />
          <Skeleton animation="wave" variant="text" height={18} />
          <Skeleton animation="wave" variant="text" width="75%" height={18} />
        </Box>

        {/* Amenities */}
        <Box>
          <Skeleton animation="wave" variant="text" width={100} height={28} sx={{ mb: '12px' }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
          </Box>
        </Box>

        {/* Rooms */}
        <Box>
          <Skeleton animation="wave" variant="text" width={140} height={28} sx={{ mb: '12px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[0, 1].map(i => (
              <Box
                key={i}
                sx={{
                  backgroundColor: '#fff',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
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
              </Box>
            ))}
          </Box>
        </Box>

        {/* Reviews */}
        <Box>
          <Skeleton animation="wave" variant="text" width={160} height={28} sx={{ mb: '12px' }} />
          <Box sx={{ display: 'flex', gap: '16px' }}>
            {[0, 1, 2].map(i => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  backgroundColor: '#fff',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Skeleton animation="wave" variant="circular" width={36} height={36} />
                  <Box>
                    <Skeleton animation="wave" variant="text" width={100} height={20} />
                    <Skeleton animation="wave" variant="text" width={70} height={16} />
                  </Box>
                </Box>
                <Skeleton animation="wave" variant="text" width={70} height={18} />
                <Skeleton animation="wave" variant="text" height={16} />
                <Skeleton animation="wave" variant="text" height={16} />
                <Skeleton animation="wave" variant="text" width="60%" height={16} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </TravelerLayout>
  );
}
