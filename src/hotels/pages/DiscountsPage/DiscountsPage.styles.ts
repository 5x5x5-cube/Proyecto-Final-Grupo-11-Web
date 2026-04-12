import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const ContentLayout = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: '20px',
  flex: 1,
  overflow: 'hidden',
});

export const DiscountGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '14px',
  overflow: 'hidden',
});

export const DiscountCard = styled(Box)<{ ownerState?: { expired?: boolean } }>(
  ({ ownerState }) => ({
    background: palette.surface,
    borderRadius: '16px',
    border: `1px solid ${palette.outlineVariant}`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    opacity: ownerState?.expired ? 0.6 : 1,
  })
);

export const CardHeader = styled(Box)({
  padding: '14px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const DiscountValue = styled(Typography)<{ ownerState?: { expired?: boolean } }>(
  ({ ownerState }) => ({
    fontSize: 22,
    fontWeight: 800,
    color: ownerState?.expired ? palette.outline : palette.primary,
  })
);

export const DiscountPercent = styled(Typography)<{ ownerState?: { expired?: boolean } }>(
  ({ ownerState }) => ({
    fontSize: 14,
    fontWeight: 600,
    color: ownerState?.expired ? palette.outline : palette.primary,
  })
);

export const TypeChip = styled(Box)<{ ownerState: { bg: string; color: string } }>(
  ({ ownerState }) => ({
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: ownerState.bg,
    color: ownerState.color,
  })
);

export const CardBody = styled(Box)({
  padding: '14px 16px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CardTitle = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
  color: palette.onSurface,
});

export const DetailRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 11,
  color: palette.onSurfaceVariant,
});

export const DetailStrong = styled(Box)<{ component?: React.ElementType }>({
  color: palette.onSurface,
  fontWeight: 600,
});

export const CardFooter = styled(Box)({
  padding: '10px 16px',
  borderTop: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const StatusBadge = styled(Box)<{ ownerState: { bg: string; color: string } }>(
  ({ ownerState }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '100px',
    background: ownerState.bg,
    color: ownerState.color,
  })
);

export const SmallActionButton = styled(Box)({
  height: 28,
  padding: '0 10px',
  borderRadius: '100px',
  border: `1px solid ${palette.outlineVariant}`,
  background: 'transparent',
  fontSize: 11,
  fontWeight: 500,
  color: palette.onSurfaceVariant,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const FormPanel = styled(Box)({
  background: palette.surface,
  borderRadius: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const PanelHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
  background: 'linear-gradient(135deg, #006874, #004F58)',
});

export const PanelTitle = styled(Box)({
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
  gap: '14px',
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

export const FormInput = styled(Box)<{
  component?: React.ElementType;
  placeholder?: string;
}>({
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

export const ToggleButton = styled(Box)<{ ownerState?: { active?: boolean } }>(
  ({ ownerState }) => ({
    height: 48,
    padding: '0 16px',
    borderRadius: '8px',
    border: `1px solid ${ownerState?.active ? palette.primary : palette.outline}`,
    background: ownerState?.active ? palette.primary : 'transparent',
    fontSize: 13,
    fontWeight: 500,
    color: ownerState?.active ? palette.onPrimary : palette.onSurfaceVariant,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  })
);

export const RoomCheckbox = styled(Box)<{ ownerState?: { checked?: boolean } }>(
  ({ ownerState }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: `1px solid ${ownerState?.checked ? palette.primary : palette.outlineVariant}`,
    background: ownerState?.checked ? palette.surfaceContainer : 'transparent',
    cursor: 'pointer',
  })
);

export const CheckboxBox = styled(Box)<{ ownerState?: { checked?: boolean } }>(
  ({ ownerState }) => ({
    width: 18,
    height: 18,
    borderRadius: '4px',
    flexShrink: 0,
    border: `2px solid ${ownerState?.checked ? palette.primary : palette.outline}`,
    background: ownerState?.checked ? palette.primary : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const RoomName = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: palette.onSurface,
});

export const RoomSub = styled(Typography)({
  fontSize: 10,
  color: palette.outline,
});

export const PanelFooter = styled(Box)({
  padding: '16px 20px',
  borderTop: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  gap: '10px',
});
