import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  padding: '14px 20px',
  marginBottom: '20px',
});

export const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '100px',
  padding: '8px 16px',
  background: palette.background,
  fontSize: 13,
  color: palette.onSurfaceVariant,
  minWidth: 240,
});

export const FilterDivider = styled(Box)({
  width: '1px',
  height: 24,
  background: palette.outlineVariant,
  margin: '0 4px',
  flexShrink: 0,
});

export const FilterChip = styled(Box)<{ ownerState?: { active?: boolean } }>(({ ownerState }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: '6px 14px',
  borderRadius: '100px',
  border: `1px solid ${ownerState?.active ? palette.primary : palette.outlineVariant}`,
  background: ownerState?.active ? palette.primary : 'transparent',
  color: ownerState?.active ? palette.onPrimary : palette.onSurfaceVariant,
  cursor: 'pointer',
}));

export const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: '20px',
  flex: 1,
  overflow: 'hidden',
});

export const TableCard = styled(Box)({
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const TableCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const TableCardTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: 14,
  fontWeight: 700,
  color: palette.onSurface,
});

export const StyledTable = styled(Box)<{ component?: React.ElementType }>({
  width: '100%',
  borderCollapse: 'collapse',
});

export const TableHeaderCell = styled(Box)<{ component?: React.ElementType }>({
  fontSize: 11,
  fontWeight: 600,
  color: palette.outline,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  padding: '10px 16px',
  textAlign: 'left',
  background: palette.background,
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const RateRow = styled(Box)<{
  ownerState?: { selected?: boolean };
  component?: React.ElementType;
}>(({ ownerState }) => ({
  borderBottom: `1px solid ${palette.outlineVariant}`,
  background: ownerState?.selected ? palette.surfaceContainer : 'transparent',
  '&:hover': {
    background: ownerState?.selected ? palette.surfaceContainer : palette.background,
  },
}));

export const RateCell = styled(Box)<{ component?: React.ElementType }>({
  padding: '12px 16px',
  fontSize: 13,
  color: palette.onSurface,
  verticalAlign: 'middle',
});

export const RoomIconBox = styled(Box)({
  width: 44,
  height: 32,
  borderRadius: '6px',
  background: 'linear-gradient(135deg, #006874, #4A6267)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const RoomName = styled(Typography)({
  fontSize: 13,
  fontWeight: 600,
  color: palette.onSurface,
});

export const RoomLocation = styled(Typography)({
  fontSize: 11,
  color: palette.onSurfaceVariant,
});

export const TypeChip = styled(Box)<{ ownerState: { bg: string; color: string } }>(
  ({ ownerState }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '100px',
    background: ownerState.bg,
    color: ownerState.color,
  })
);

export const PriceText = styled(Typography)({
  fontSize: 15,
  fontWeight: 700,
  color: palette.onSurface,
});

export const PriceUnit = styled(Box)<{ component?: React.ElementType }>({
  fontSize: 11,
  color: palette.outline,
  fontWeight: 400,
});

export const ValidityText = styled(Box)<{ component?: React.ElementType }>({
  padding: '12px 16px',
  fontSize: 12,
  color: palette.onSurfaceVariant,
  verticalAlign: 'middle',
});

export const ActionButton = styled(Box)<{ ownerState?: { active?: boolean } }>(
  ({ ownerState }) => ({
    width: 32,
    height: 32,
    borderRadius: '8px',
    border: ownerState?.active ? 'none' : `1px solid ${palette.outlineVariant}`,
    background: ownerState?.active ? palette.primary : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      background: ownerState?.active ? palette.primary : palette.background,
    },
  })
);

export const DeleteButton = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: '8px',
  border: `1px solid ${palette.outlineVariant}`,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': { background: palette.background },
  '&:hover .delete-icon': { color: palette.error },
});

export const PaginationBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderTop: `1px solid ${palette.outlineVariant}`,
  fontSize: 12,
  color: palette.onSurfaceVariant,
  marginTop: 'auto',
});

export const PageButton = styled(Box)<{ ownerState?: { active?: boolean } }>(({ ownerState }) => ({
  width: 32,
  height: 32,
  borderRadius: '8px',
  border: `1px solid ${ownerState?.active ? palette.primary : palette.outlineVariant}`,
  background: ownerState?.active ? palette.primary : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 500,
  color: ownerState?.active ? palette.onPrimary : palette.onSurfaceVariant,
}));

export const EditPanel = styled(Box)({
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const EditPanelHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
  background: palette.primary,
});

export const EditPanelTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: 14,
  fontWeight: 700,
  color: palette.onPrimary,
});

export const CloseButton = styled(Box)({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const PanelBody = styled(Box)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'auto',
  flex: 1,
});

export const FloatingLabel = styled(Typography)({
  position: 'absolute',
  top: '-9px',
  left: '12px',
  background: palette.surface,
  padding: '0 4px',
  fontSize: 11,
  color: palette.outline,
  letterSpacing: '0.4px',
  zIndex: 1,
});

export const FormSelect = styled('select')({
  width: '100%',
  height: 48,
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '0 12px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 13,
  color: palette.onSurface,
  outline: 'none',
  background: palette.surface,
  boxSizing: 'border-box',
});

export const RateTypeOption = styled(Box)<{ ownerState?: { selected?: boolean } }>(
  ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '10px 12px',
    borderRadius: '10px',
    border: `2px solid ${ownerState?.selected ? palette.primary : palette.outlineVariant}`,
    background: ownerState?.selected ? palette.surfaceContainer : 'transparent',
    cursor: 'pointer',
  })
);

export const RateTypeLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: palette.onSurface,
});

export const RateTypeDesc = styled(Typography)({
  fontSize: 10,
  color: palette.outline,
});

export const CurrencyPrefix = styled(Box)({
  height: 48,
  padding: '0 12px',
  background: palette.background,
  border: `1px solid ${palette.outline}`,
  borderRight: 'none',
  borderRadius: '8px 0 0 8px',
  display: 'flex',
  alignItems: 'center',
  fontSize: 13,
  fontWeight: 600,
  color: palette.onSurfaceVariant,
});

export const FormInput = styled('input')({
  width: '100%',
  height: 48,
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '0 12px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 13,
  color: palette.onSurface,
  outline: 'none',
  background: palette.surface,
  boxSizing: 'border-box',
});

export const PriceInput = styled('input')({
  flex: 1,
  height: 48,
  border: `1px solid ${palette.outline}`,
  borderLeft: `1px solid ${palette.outlineVariant}`,
  borderRadius: '0 8px 8px 0',
  padding: '0 12px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 13,
  color: palette.onSurface,
  outline: 'none',
  background: palette.surface,
  boxSizing: 'border-box',
});

export const PanelFooter = styled(Box)({
  padding: '16px 20px',
  borderTop: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  gap: '10px',
});
