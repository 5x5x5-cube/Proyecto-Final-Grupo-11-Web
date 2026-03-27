import { Box, Skeleton } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export default function DashboardPageSkeleton() {
  return (
    <>
      {/* Stat cards row — 3 columns matching real grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          mb: '24px',
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                width={44}
                height={44}
                sx={{ borderRadius: '12px' }}
              />
              <Skeleton animation="wave" variant="text" width={48} height={18} />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={100} height={38} />
              <Skeleton animation="wave" variant="text" width={140} height={20} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Content grid — matches real 1fr 380px layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        {/* Recent reservations table */}
        <Box
          sx={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <Box
            sx={{
              padding: '18px 24px',
              borderBottom: `1px solid ${palette.outlineVariant}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={160} height={22} />
            </Box>
            <Skeleton animation="wave" variant="text" width={60} height={20} />
          </Box>

          {/* Column headers */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
              padding: '12px 16px',
              backgroundColor: palette.background,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} animation="wave" variant="text" width={60} height={16} />
            ))}
          </Box>

          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                padding: '14px 16px',
                alignItems: 'center',
                borderBottom: i < 4 ? `1px solid ${palette.outlineVariant}` : 'none',
              }}
            >
              {/* Guest with avatar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={32}
                  height={32}
                  sx={{ flexShrink: 0 }}
                />
                <Skeleton animation="wave" variant="text" width={110} height={20} />
              </Box>
              <Skeleton animation="wave" variant="text" width={70} height={20} />
              <Skeleton animation="wave" variant="text" width={80} height={20} />
              <Skeleton animation="wave" variant="text" width={80} height={20} />
              <Skeleton animation="wave" variant="text" width={90} height={20} />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={80}
                height={24}
                sx={{ borderRadius: '100px' }}
              />
            </Box>
          ))}
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Revenue mini chart */}
          <Box
            sx={{
              backgroundColor: palette.surface,
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Chart card header */}
            <Box
              sx={{
                padding: '18px 24px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton animation="wave" variant="circular" width={18} height={18} />
                <Skeleton animation="wave" variant="text" width={130} height={22} />
              </Box>
              <Skeleton animation="wave" variant="text" width={80} height={20} />
            </Box>

            {/* Bar chart area */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                height: 80,
                padding: '20px 24px 0',
              }}
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                  key={i}
                  animation="wave"
                  variant="rounded"
                  sx={{
                    flex: 1,
                    height: `${40 + Math.round((i * 13) % 50)}%`,
                    borderRadius: '4px 4px 0 0',
                    transform: 'none',
                  }}
                />
              ))}
            </Box>

            {/* Month labels */}
            <Box sx={{ display: 'flex', gap: '8px', padding: '6px 24px 12px' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} animation="wave" variant="text" sx={{ flex: 1 }} height={14} />
              ))}
            </Box>

            {/* Revenue total line */}
            <Box sx={{ padding: '0 24px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Skeleton animation="wave" variant="text" width={60} height={20} />
              <Skeleton animation="wave" variant="text" width={120} height={28} />
            </Box>
          </Box>

          {/* Quick access grid */}
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
                padding: '18px 24px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Skeleton animation="wave" variant="circular" width={18} height={18} />
              <Skeleton animation="wave" variant="text" width={110} height={22} />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '20px',
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    border: `1px solid ${palette.outlineVariant}`,
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={48}
                    height={48}
                    sx={{ borderRadius: '12px' }}
                  />
                  <Skeleton animation="wave" variant="text" width={90} height={20} />
                  <Skeleton animation="wave" variant="text" width={110} height={16} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
