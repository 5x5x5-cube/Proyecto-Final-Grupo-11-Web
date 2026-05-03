import { Box, styled } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

/**
 * Section card used to wrap content blocks (summary, filters, table, etc.).
 * Matches the visual language of the other admin pages (DiscountsPage,
 * ReportsPage) without forcing them to share a component yet.
 */
export const SectionCard = styled(Box)({
  background: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  padding: '20px',
  marginBottom: '20px',
});

export const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '48px 24px',
  color: palette.onSurfaceVariant,
});
