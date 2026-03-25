import { Box, Skeleton } from '@mui/material';
import { palette } from '../../design-system/theme/palette';

export default function ReportsPageSkeleton() {
  return (
    <>
      {/* KPI cards row — 3 columns matching real grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', mb: '20px' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              background: palette.surface,
              borderRadius: '16px',
              border: `1px solid ${palette.outlineVariant}`,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Skeleton animation="wave" variant="rounded" width={40} height={40} sx={{ borderRadius: '12px' }} />
              <Skeleton animation="wave" variant="rounded" width={52} height={22} sx={{ borderRadius: '100px' }} />
            </Box>
            <Skeleton animation="wave" variant="text" width={120} height={36} />
            <Skeleton animation="wave" variant="text" width={150} height={18} />
          </Box>
        ))}
      </Box>

      {/* Chart + table card */}
      <Box
        sx={{
          background: palette.surface,
          borderRadius: '16px',
          border: `1px solid ${palette.outlineVariant}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Card header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={18} height={18} />
            <Skeleton animation="wave" variant="text" width={160} height={22} />
          </Box>
          <Skeleton animation="wave" variant="rounded" width={90} height={28} sx={{ borderRadius: '100px' }} />
        </Box>

        {/* Bar chart area — 8 bars matching real barData length */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: 180, padding: '0 8px' }}>
          {Array.from({ length: 8 }).map((_, idx) => {
            const heights = [90, 112, 98, 140, 125, 156, 144, 132];
            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  flex: 1,
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    width: 20,
                    height: heights[idx],
                    borderRadius: '4px 4px 0 0',
                    transform: 'none',
                  }}
                />
                <Skeleton animation="wave" variant="text" width={28} height={14} />
              </Box>
            );
          })}
        </Box>

        {/* Transactions table */}
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          {/* Table header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
              padding: '8px 12px',
              borderBottom: `1px solid ${palette.outlineVariant}`,
              gap: '8px',
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} animation="wave" variant="text" width={55} height={16} />
            ))}
          </Box>

          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
                padding: '10px 12px',
                alignItems: 'center',
                gap: '8px',
                borderBottom: `1px solid ${palette.outlineVariant}`,
              }}
            >
              {/* Booking code */}
              <Skeleton animation="wave" variant="text" width={110} height={18} />

              {/* Guest with avatar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton animation="wave" variant="circular" width={28} height={28} sx={{ flexShrink: 0 }} />
                <Skeleton animation="wave" variant="text" width={90} height={18} />
              </Box>

              {/* Room */}
              <Skeleton animation="wave" variant="text" width={110} height={18} />

              {/* Check-in date */}
              <Skeleton animation="wave" variant="text" width={75} height={18} />

              {/* Nights */}
              <Skeleton animation="wave" variant="text" width={20} height={18} />

              {/* Total */}
              <Skeleton animation="wave" variant="text" width={80} height={18} />

              {/* Status chip */}
              <Skeleton animation="wave" variant="rounded" width={80} height={22} sx={{ borderRadius: '100px' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
