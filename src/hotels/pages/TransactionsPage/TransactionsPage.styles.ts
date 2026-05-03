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

// ── KPI summary cards ──

export const KpiGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
  marginBottom: '20px',
});

export const KpiCard = styled(Box)({
  background: palette.surface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  padding: '18px 20px',
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
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const KpiValue = styled(Box)({
  fontSize: '24px',
  fontWeight: 600,
  color: palette.onSurface,
  lineHeight: 1.2,
});

export const KpiLabel = styled(Box)({
  fontSize: '13px',
  color: palette.onSurfaceVariant,
});

export const KpiSubtext = styled(Box)({
  fontSize: '12px',
  color: palette.onSurfaceVariant,
  marginTop: '4px',
});
