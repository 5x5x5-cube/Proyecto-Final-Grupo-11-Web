import { Box, styled } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

/**
 * Bar containing the filter controls. Matches the visual language of
 * `ReservationFilterBar` (rounded surface card with horizontal layout).
 */
export const FilterBar = styled(Box)({
  background: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  padding: '16px 20px',
  marginBottom: '20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '12px',
  alignItems: 'end',
});

export const ClearLink = styled('button')({
  background: 'transparent',
  border: 'none',
  color: palette.primary,
  cursor: 'pointer',
  fontSize: '13px',
  textDecoration: 'underline',
  padding: '6px 0',
  alignSelf: 'end',
  '&:hover': { opacity: 0.8 },
  '&:disabled': { color: palette.onSurfaceVariant, cursor: 'not-allowed', opacity: 0.6 },
});
