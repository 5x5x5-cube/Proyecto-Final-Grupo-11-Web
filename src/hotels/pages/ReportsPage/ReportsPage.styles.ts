import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const KpiGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  marginBottom: '20px',
});

export const KpiCard = styled(Box)({
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const KpiCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const KpiIconBox = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const KpiValue = styled(Typography)({
  fontSize: 24,
  fontWeight: 700,
  color: palette.onSurface,
});

export const ChartTableCard = styled(Box)({
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  flex: 1,
  overflow: 'hidden',
});

export const CardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const CardTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: 14,
  fontWeight: 700,
  color: palette.onSurface,
});

export const ChartFilterChip = styled(Box)<{ ownerState?: { active?: boolean } }>(
  ({ ownerState }) => ({
    fontSize: 12,
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '100px',
    border: `1px solid ${ownerState?.active ? palette.primary : palette.outlineVariant}`,
    background: ownerState?.active ? palette.primary : 'transparent',
    color: ownerState?.active ? palette.onPrimary : palette.onSurfaceVariant,
    cursor: 'pointer',
  })
);

export const BarChartArea = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '10px',
  height: 180,
  padding: '0 8px',
});

export const BarColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  flex: 1,
});

export const Bar = styled(Box)({
  borderRadius: '4px 4px 0 0',
  width: 20,
  background: palette.primary,
});

export const BarLabel = styled(Typography)({
  fontSize: 10,
  color: palette.outline,
  fontWeight: 500,
});

export const TableWrapper = styled(Box)({
  overflow: 'hidden',
  flex: 1,
});

export const StyledTable = styled(Box)({
  width: '100%',
  borderCollapse: 'collapse',
});

export const TableHeaderCell = styled(Box)({
  fontSize: 11,
  fontWeight: 600,
  color: palette.outline,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  padding: '8px 12px',
  textAlign: 'left',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const TableRow = styled(Box)({
  '&:hover': { background: palette.background },
});

export const TableCellCode = styled(Box)({
  padding: '10px 12px',
  fontSize: 12,
  fontFamily: 'monospace',
  color: palette.primary,
  fontWeight: 600,
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const TableCell = styled(Box)({
  padding: '10px 12px',
  fontSize: 13,
  color: palette.onSurface,
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const TableCellBold = styled(Box)({
  padding: '10px 12px',
  fontSize: 13,
  fontWeight: 600,
  color: palette.onSurface,
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const TableCellStatus = styled(Box)({
  padding: '10px 12px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const GuestAvatar = styled(Box)({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: palette.secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const StatusChipBox = styled(Box)<{
  ownerState: { bg: string; color: string };
}>(({ ownerState }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  fontSize: 11,
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: '100px',
  background: ownerState.bg,
  color: ownerState.color,
}));

export const TrendChip = styled(Box)<{
  ownerState: { trendUp: boolean };
}>(({ ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: 11,
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: '100px',
  background: ownerState.trendUp ? palette.successContainer : palette.errorContainer,
  color: ownerState.trendUp ? palette.success : palette.error,
}));

/* Skeleton-specific grid rows */
export const SkeletonTableHeaderRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
  padding: '8px 12px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
  gap: '8px',
});

export const SkeletonTableRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1fr 0.6fr 1fr 0.8fr',
  padding: '10px 12px',
  alignItems: 'center',
  gap: '8px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});
