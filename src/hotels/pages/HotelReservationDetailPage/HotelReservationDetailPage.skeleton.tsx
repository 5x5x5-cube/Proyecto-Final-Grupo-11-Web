import { Box, Skeleton, Divider } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export default function HotelReservationDetailPageSkeleton() {
  return (
    <>
      {/* Page header card — booking code + title + action buttons */}
      <Box
        sx={{
          backgroundColor: palette.surface,
          borderRadius: '16px',
          padding: '20px 24px',
          border: `1px solid ${palette.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Booking code badge */}
          <Skeleton
            animation="wave"
            variant="rounded"
            width={148}
            height={40}
            sx={{ borderRadius: '10px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton animation="wave" variant="text" width={240} height={28} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton animation="wave" variant="text" width={180} height={18} />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={130}
                height={26}
                sx={{ borderRadius: '100px' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={110}
            height={42}
            sx={{ borderRadius: '100px' }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={160}
            height={42}
            sx={{ borderRadius: '100px' }}
          />
        </Box>
      </Box>

      {/* Content grid — 1fr 340px matching real layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Guest info card */}
          <Box
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '16px 20px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={100} height={22} />
            </Box>
            <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Skeleton
                animation="wave"
                variant="circular"
                width={56}
                height={56}
                sx={{ flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton animation="wave" variant="text" width={200} height={24} />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={18}
                  sx={{ mb: '6px' }}
                />
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <Skeleton animation="wave" variant="text" width={160} height={18} />
                  <Skeleton animation="wave" variant="text" width={130} height={18} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Booking details card */}
          <Box
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '16px 20px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={130} height={22} />
            </Box>

            <Box sx={{ padding: '20px' }}>
              {/* InfoGrid — 4 columns */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                  mb: '16px',
                }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <Box key={i}>
                    <Skeleton animation="wave" variant="text" width={60} height={16} />
                    <Skeleton animation="wave" variant="text" width={90} height={22} />
                    <Skeleton animation="wave" variant="text" width={70} height={16} />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ borderColor: palette.outlineVariant, my: '16px' }} />

              {/* Reserved room section label */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '10px' }}>
                <Skeleton animation="wave" variant="circular" width={18} height={18} />
                <Skeleton animation="wave" variant="text" width={120} height={20} />
              </Box>

              {/* Room row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  backgroundColor: palette.background,
                  borderRadius: '12px',
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={56}
                  sx={{ borderRadius: '8px', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton animation="wave" variant="text" width={180} height={20} />
                  <Skeleton animation="wave" variant="text" width={140} height={16} />
                  <Box sx={{ display: 'flex', gap: '6px', mt: '4px' }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        animation="wave"
                        variant="rounded"
                        width={50}
                        height={20}
                        sx={{ borderRadius: '100px' }}
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Skeleton animation="wave" variant="text" width={110} height={24} />
                  <Skeleton animation="wave" variant="text" width={130} height={18} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Payment summary card */}
          <Box
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '16px 20px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={130} height={22} />
            </Box>

            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Price line items */}
              {Array.from({ length: 4 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Skeleton animation="wave" variant="text" width={120} height={18} />
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                </Box>
              ))}

              <Divider sx={{ borderColor: palette.outlineVariant, my: '4px' }} />

              {/* Total row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton animation="wave" variant="text" width={90} height={20} />
                <Skeleton animation="wave" variant="text" width={100} height={24} />
              </Box>

              {/* Payment method row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  backgroundColor: palette.background,
                  borderRadius: '10px',
                  mt: '2px',
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={32}
                  height={32}
                  sx={{ borderRadius: '8px', flexShrink: 0 }}
                />
                <Box>
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                  <Skeleton animation="wave" variant="text" width={100} height={16} />
                </Box>
                <Box sx={{ marginLeft: 'auto' }}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={70}
                    height={22}
                    sx={{ borderRadius: '100px' }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Cancellation policy card */}
          <Box
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                padding: '16px 20px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={150} height={22} />
            </Box>

            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Skeleton animation="wave" variant="text" width={140} height={18} />
                  <Skeleton animation="wave" variant="text" width={70} height={18} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
