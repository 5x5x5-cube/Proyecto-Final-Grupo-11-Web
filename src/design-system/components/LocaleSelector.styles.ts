import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { onSurfaceVariant, outlineVariant, surfaceContainer } from '../theme/palette';

export const SelectorRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const SelectorPill = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 10px',
  borderRadius: '8px',
  border: `1px solid ${outlineVariant}`,
  cursor: 'pointer',
  '&:hover': { backgroundColor: surfaceContainer },
});

export const SelectorLabel = styled(Typography)({
  fontSize: 12,
  color: onSurfaceVariant,
});
