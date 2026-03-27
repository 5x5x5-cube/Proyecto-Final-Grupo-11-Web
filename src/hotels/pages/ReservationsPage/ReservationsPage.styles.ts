import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const FilterBar = styled(Box)({
  backgroundColor: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
});

export const FilterDivider = styled(Box)({
  width: '1px',
  height: 32,
  backgroundColor: palette.outlineVariant,
  flexShrink: 0,
});

export const DateFilterPill = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: 36,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '100px',
  padding: '0 16px',
  backgroundColor: palette.surface,
  cursor: 'pointer',
  fontSize: 13,
  color: palette.onSurfaceVariant,
  flexShrink: 0,
});

export const ClearFiltersLink = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
  color: palette.primary,
  cursor: 'pointer',
});

export const SummaryRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  marginBottom: '20px',
});

export const SummaryPill = styled(Box)<{
  pillBg?: string;
  pillBorder?: string;
  pillColor?: string;
}>(({ pillBg, pillBorder, pillColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  borderRadius: '100px',
  fontSize: 13,
  fontWeight: 500,
  border: `1px solid ${pillBorder ?? palette.outlineVariant}`,
  backgroundColor: pillBg ?? palette.surface,
  color: pillColor ?? palette.onSurface,
}));

export const SummaryCount = styled(Typography)({
  fontWeight: 700,
  fontSize: 14,
});

export const TableCard = styled(Box)({
  backgroundColor: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  overflow: 'hidden',
});

export const TableHeader = styled(Box)({
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 600,
  color: palette.onSurfaceVariant,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  backgroundColor: palette.background,
  borderBottom: `1px solid ${palette.outlineVariant}`,
  whiteSpace: 'nowrap',
});

export const TableCell = styled(Box)<{ isLast?: boolean }>(({ isLast }) => ({
  padding: '14px 16px',
  fontSize: 14,
  color: palette.onSurface,
  borderBottom: isLast ? 'none' : `1px solid ${palette.outlineVariant}`,
  verticalAlign: 'middle',
}));

export const TableRow = styled(Box)({
  '&:hover td': { backgroundColor: '#fafffe', cursor: 'pointer' },
});

export const CodeBadge = styled(Box)({
  fontSize: 12,
  fontWeight: 600,
  color: palette.onSurfaceVariant,
  backgroundColor: palette.background,
  padding: '3px 8px',
  borderRadius: '6px',
  display: 'inline-block',
});

export const AvatarCircle = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
  color: palette.primary,
  flexShrink: 0,
}));

export const TotalPrice = styled(Typography)({
  fontSize: 15,
  fontWeight: 600,
  color: palette.primary,
});

export const PaginationBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  borderTop: `1px solid ${palette.outlineVariant}`,
});

export const PageButton = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: 36,
  height: 36,
  borderRadius: '8px',
  border: `1px solid ${active ? palette.primary : palette.outlineVariant}`,
  backgroundColor: active ? palette.primary : palette.surface,
  color: active ? palette.onPrimary : palette.onSurfaceVariant,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: active ? 600 : 400,
}));

export const NavButton = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '8px',
  border: `1px solid ${palette.outlineVariant}`,
  backgroundColor: palette.surface,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
