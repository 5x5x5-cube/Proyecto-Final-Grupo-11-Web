import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  marginBottom: '24px',
});

export const StatCard = styled(Box)({
  backgroundColor: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const StatCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const IconBadge = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 44,
  height: 44,
  borderRadius: '12px',
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StatValue = styled(Typography)({
  fontSize: 28,
  fontWeight: 700,
  color: palette.onSurface,
});

export const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: '20px',
});

export const SectionPanel = styled(Box)({
  backgroundColor: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  overflow: 'hidden',
});

export const SectionHeader = styled(Box)({
  padding: '18px 24px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const SectionHeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const ViewAllLink = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
  color: palette.primary,
  cursor: 'pointer',
});

export const TableHeader = styled(Box)({
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 600,
  color: palette.onSurfaceVariant,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  backgroundColor: palette.background,
});

export const TableCell = styled(Box)<{ isLast?: boolean }>(({ isLast }) => ({
  padding: '14px 16px',
  fontSize: 14,
  color: palette.onSurface,
  borderBottom: isLast ? 'none' : `1px solid ${palette.outlineVariant}`,
}));

export const AvatarCircle = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: palette.secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  fontWeight: 600,
  color: palette.primary,
  flexShrink: 0,
});

export const TableRow = styled(Box)({
  '&:hover td': { backgroundColor: '#fafefe' },
  cursor: 'pointer',
});

export const BarChartContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  height: 80,
  padding: '20px 24px 0',
});

export const Bar = styled(Box)<{ barHeight: string; highlight?: boolean }>(
  ({ barHeight, highlight }) => ({
    flex: 1,
    height: barHeight,
    borderRadius: '4px 4px 0 0',
    backgroundColor: highlight ? palette.primary : palette.primaryContainer,
    cursor: 'pointer',
    '&:hover': { opacity: 0.85 },
  })
);

export const MonthLabel = styled(Typography)<{ highlight?: boolean }>(({ highlight }) => ({
  flex: 1,
  textAlign: 'center',
  fontSize: 10,
  color: highlight ? palette.primary : palette.onSurfaceVariant,
  fontWeight: highlight ? 600 : 400,
}));

export const QuickAccessGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
  padding: '20px',
});

export const QuickAccessCard = styled(Box)({
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '14px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  cursor: 'pointer',
  '&:hover': {
    borderColor: palette.primary,
    backgroundColor: palette.surfaceContainer,
  },
});

export const QuickAccessIcon = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ChangeIndicator = styled(Box)<{ changeColor: string }>(({ changeColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: 12,
  fontWeight: 500,
  color: changeColor,
}));
