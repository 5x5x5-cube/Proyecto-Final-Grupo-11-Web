import { Box, styled } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const TableCard = styled(Box)({
  background: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  overflow: 'hidden',
});

export const TableScroll = styled(Box)({
  overflowX: 'auto',
});

export const StyledTable = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
});

export const HeaderRow = styled('tr')({
  background: palette.surfaceVariant,
});

export const HeaderCell = styled('th')({
  textAlign: 'left',
  padding: '12px 16px',
  fontWeight: 600,
  fontSize: '12px',
  color: palette.onSurfaceVariant,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  whiteSpace: 'nowrap',
});

export const BodyRow = styled('tr', {
  shouldForwardProp: prop => prop !== '$clickable',
})<{ $clickable?: boolean }>(({ $clickable }) => ({
  borderTop: `1px solid ${palette.outlineVariant}`,
  cursor: $clickable ? 'pointer' : 'default',
  '&:hover': $clickable ? { background: palette.surfaceVariant } : {},
}));

export const BodyCell = styled('td')({
  padding: '12px 16px',
  color: palette.onSurface,
  whiteSpace: 'nowrap',
});

export const MonoCell = styled(BodyCell)({
  fontFamily: 'Consolas, Monaco, monospace',
  fontSize: '12px',
  color: palette.onSurfaceVariant,
});

export const AmountCell = styled(BodyCell)({
  fontWeight: 600,
  textAlign: 'right',
});

export const PaginationRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  borderTop: `1px solid ${palette.outlineVariant}`,
  gap: '12px',
  flexWrap: 'wrap',
});

export const PaginationInfo = styled(Box)({
  fontSize: '13px',
  color: palette.onSurfaceVariant,
});

interface StatusChipProps {
  $bg: string;
  $color: string;
}

export const StatusChipBox = styled(Box, {
  shouldForwardProp: prop => prop !== '$bg' && prop !== '$color',
})<StatusChipProps>(({ $bg, $color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '3px 10px',
  borderRadius: '100px',
  background: $bg,
  color: $color,
  fontSize: '12px',
  fontWeight: 500,
}));

export const EmptyTableBody = styled(Box)({
  textAlign: 'center',
  padding: '48px 24px',
  color: palette.onSurfaceVariant,
});
