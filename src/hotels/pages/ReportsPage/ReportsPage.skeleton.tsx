import { Box, Skeleton } from '@mui/material';
import {
  KpiGrid,
  KpiCard,
  KpiCardHeader,
  ChartTableCard,
  CardHeader,
  BarChartArea,
  BarColumn,
  TableWrapper,
  SkeletonTableHeaderRow,
  SkeletonTableRow,
} from './ReportsPage.styles';

export default function ReportsPageSkeleton() {
  return (
    <>
      {/* KPI cards row */}
      <KpiGrid>
        {Array.from({ length: 3 }).map((_, i) => (
          <KpiCard key={i}>
            <KpiCardHeader>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={40}
                height={40}
                sx={{ borderRadius: '12px' }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={52}
                height={22}
                sx={{ borderRadius: '100px' }}
              />
            </KpiCardHeader>
            <Skeleton animation="wave" variant="text" width={120} height={36} />
            <Skeleton animation="wave" variant="text" width={150} height={18} />
          </KpiCard>
        ))}
      </KpiGrid>

      {/* Chart + table card */}
      <ChartTableCard>
        {/* Card header */}
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skeleton animation="wave" variant="circular" width={18} height={18} />
            <Skeleton animation="wave" variant="text" width={160} height={22} />
          </Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={90}
            height={28}
            sx={{ borderRadius: '100px' }}
          />
        </CardHeader>

        {/* Bar chart area */}
        <BarChartArea>
          {Array.from({ length: 8 }).map((_, idx) => {
            const heights = [90, 112, 98, 140, 125, 156, 144, 132];
            return (
              <BarColumn key={idx}>
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
              </BarColumn>
            );
          })}
        </BarChartArea>

        {/* Transactions table */}
        <TableWrapper>
          <SkeletonTableHeaderRow>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} animation="wave" variant="text" width={55} height={16} />
            ))}
          </SkeletonTableHeaderRow>

          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTableRow key={i}>
              <Skeleton animation="wave" variant="text" width={110} height={18} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={28}
                  height={28}
                  sx={{ flexShrink: 0 }}
                />
                <Skeleton animation="wave" variant="text" width={90} height={18} />
              </Box>
              <Skeleton animation="wave" variant="text" width={110} height={18} />
              <Skeleton animation="wave" variant="text" width={75} height={18} />
              <Skeleton animation="wave" variant="text" width={20} height={18} />
              <Skeleton animation="wave" variant="text" width={80} height={18} />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={80}
                height={22}
                sx={{ borderRadius: '100px' }}
              />
            </SkeletonTableRow>
          ))}
        </TableWrapper>
      </ChartTableCard>
    </>
  );
}
