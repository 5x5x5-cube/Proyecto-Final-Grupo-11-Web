import { Box, Skeleton } from '@mui/material';
import { palette } from '@/design-system/theme/palette';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';

const CartSidebarSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Title */}
    <Skeleton animation="wave" variant="text" width={140} height={28} />

    {/* Price breakdown rows */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[0, 1, 2, 3].map(i => (
        <Box
          key={i}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Skeleton animation="wave" variant="text" width="55%" height={20} />
          <Skeleton animation="wave" variant="text" width="28%" height={20} />
        </Box>
      ))}
      <Box sx={{ height: 1, backgroundColor: palette.outlineVariant }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton animation="wave" variant="text" width={90} height={24} />
        <Skeleton animation="wave" variant="text" width={120} height={34} />
      </Box>
    </Box>

    {/* Continue button */}
    <Skeleton animation="wave" variant="rounded" height={52} sx={{ borderRadius: '100px' }} />

    {/* Secure note */}
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Skeleton animation="wave" variant="text" width={160} height={18} />
    </Box>
  </Box>
);

export default function CartPageSkeleton() {
  return (
    <CheckoutLayout currentStep={2} sidebar={<CartSidebarSkeleton />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Accommodation section card */}
        <Box
          sx={{
            background: '#fff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Card header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={24} height={24} />
            <Skeleton animation="wave" variant="text" width={180} height={24} />
          </Box>

          {/* Hotel info row */}
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={120}
              height={90}
              sx={{ borderRadius: '12px', flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton animation="wave" variant="text" width={60} height={16} />
              <Skeleton animation="wave" variant="text" width="55%" height={28} />
              <Skeleton animation="wave" variant="text" width="45%" height={18} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={40}
                  height={26}
                  sx={{ borderRadius: '6px' }}
                />
                <Skeleton animation="wave" variant="text" width={80} height={18} />
                <Skeleton animation="wave" variant="text" width={70} height={16} />
              </Box>
            </Box>
          </Box>

          {/* Date/duration info grid (3 cols) */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[0, 1, 2].map(i => (
              <Box key={i}>
                <Skeleton animation="wave" variant="text" width="70%" height={14} />
                <Skeleton animation="wave" variant="text" width="85%" height={22} />
                <Skeleton animation="wave" variant="text" width="50%" height={16} />
              </Box>
            ))}
          </Box>

          {/* Room row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              backgroundColor: palette.background,
              borderRadius: '12px',
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              width={48}
              height={48}
              sx={{ borderRadius: '10px', flexShrink: 0 }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                height={22}
                sx={{ mb: '4px' }}
              />
              <Skeleton animation="wave" variant="text" width="65%" height={18} />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Skeleton animation="wave" variant="text" width={100} height={28} />
              <Skeleton animation="wave" variant="text" width={60} height={16} />
            </Box>
          </Box>
        </Box>

        {/* Guest info section card */}
        <Box
          sx={{
            background: '#fff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={24} height={24} />
            <Skeleton animation="wave" variant="text" width={130} height={24} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '12px',
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              sx={{ flexShrink: 0 }}
            />
            <Box>
              <Skeleton animation="wave" variant="text" width={130} height={20} />
              <Skeleton animation="wave" variant="text" width={200} height={16} />
            </Box>
          </Box>
        </Box>

        {/* Cancellation policy section card */}
        <Box
          sx={{
            background: '#fff',
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={24} height={24} />
            <Skeleton animation="wave" variant="text" width={160} height={24} />
          </Box>

          {[0, 1, 2].map(i => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width="75%" height={18} />
            </Box>
          ))}
        </Box>
      </Box>
    </CheckoutLayout>
  );
}
