import { Box, styled } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const DrawerContent = styled(Box)({
  width: '440px',
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: palette.surface,
});

export const DrawerHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 24px',
  borderBottom: `1px solid ${palette.outlineVariant}`,
});

export const DrawerTitle = styled(Box)({
  fontSize: '17px',
  fontWeight: 600,
  color: palette.onSurface,
});

export const DrawerBody = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const SectionLabel = styled(Box)({
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: palette.onSurfaceVariant,
});

export const Field = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const FieldLabel = styled(Box)({
  fontSize: '12px',
  color: palette.onSurfaceVariant,
});

export const FieldValue = styled(Box)({
  fontSize: '14px',
  color: palette.onSurface,
  wordBreak: 'break-all',
});

export const MonoValue = styled(FieldValue)({
  fontFamily: 'Consolas, Monaco, monospace',
  fontSize: '13px',
});

export const ErrorBox = styled(Box)({
  padding: '12px 14px',
  borderRadius: '12px',
  background: palette.errorContainer,
  color: palette.error,
  fontSize: '13px',
  fontWeight: 500,
});

export const HistoryList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const HistoryItem = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
});

export const HistoryDot = styled(Box)({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: palette.primary,
  marginTop: '6px',
  flexShrink: 0,
});

export const HistoryText = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const HistoryEvent = styled(Box)({
  fontSize: '14px',
  color: palette.onSurface,
  fontWeight: 500,
});

export const HistoryTime = styled(Box)({
  fontSize: '12px',
  color: palette.onSurfaceVariant,
});
