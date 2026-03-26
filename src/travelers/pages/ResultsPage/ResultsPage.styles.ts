import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

/* ─── Page Shell ─── */

export const PageRoot = styled(Box)({
  width: '100vw',
  maxWidth: '100vw',
  minHeight: '100vh',
  backgroundColor: palette.background,
  fontFamily: "'Roboto', sans-serif",
  overflow: 'hidden',
});

export const PageBody = styled(Box)({
  display: 'flex',
  minHeight: 'calc(100vh - 72px)',
  marginTop: '72px',
  overflow: 'hidden',
  maxWidth: '100vw',
});

/* ─── Filter Sidebar ─── */

export const FilterSidebarContainer = styled(Box)({
  width: 280,
  minWidth: 280,
  maxWidth: 280,
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  borderRight: `1px solid ${palette.outlineVariant}`,
  padding: '20px',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  maxHeight: 'calc(100vh - 72px)',
  position: 'sticky',
  top: 0,
});

export const FilterSectionLabel = styled(Typography)({
  fontSize: 13,
  fontWeight: 500,
  color: palette.onSurfaceVariant,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
});

export const FilterSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const FilterInputGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const filterInputBase = {
  width: '100%',
  height: 44,
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '0 12px',
  fontFamily: "'Roboto', sans-serif",
  fontSize: 14,
  color: palette.onSurface,
  outline: 'none',
  boxSizing: 'border-box' as const,
};

export const FilterInput = styled(Box)(filterInputBase);

export const PropertyTypeTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

export const PropertyTypeTag = styled(Box)<{
  active?: boolean;
}>(({ active }) => ({
  height: 32,
  paddingLeft: '16px',
  paddingRight: '16px',
  border: `1px solid ${active ? palette.primaryContainer : palette.outlineVariant}`,
  borderRadius: '8px',
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  color: active ? palette.onPrimaryContainer : palette.onSurfaceVariant,
  backgroundColor: active ? palette.primaryContainer : 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}));

export const StarRatingTags = styled(Box)({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
});

export const StarTag = styled(Box)<{
  active?: boolean;
}>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 10px',
  border: `1px solid ${active ? palette.primaryContainer : palette.outlineVariant}`,
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: 13,
  color: active ? palette.onPrimaryContainer : palette.onSurfaceVariant,
  backgroundColor: active ? palette.primaryContainer : 'transparent',
  fontWeight: active ? 500 : 400,
}));

/* ─── Results Area ─── */

export const ResultsArea = styled(Box)({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  padding: '24px 32px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const ResultsHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
});

export const ResultsCountText = styled(Typography)({
  fontSize: 16,
  color: palette.onSurface,
  minWidth: 0,
});

export const SortRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
});

export const SortSelect = styled(Box)({
  fontFamily: "'Roboto', sans-serif",
  fontSize: 14,
  color: palette.onSurface,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '8px',
  padding: '8px 12px',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  outline: 'none',
});

/* ─── Hotel Card ─── */

export const HotelCard = styled(Box)({
  backgroundColor: '#ffffff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '16px',
  display: 'flex',
  overflow: 'hidden',
  height: 180,
  cursor: 'pointer',
  '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
});

export const HotelCardImage = styled(Box)<{ gradient: string }>(({ gradient }) => ({
  width: 240,
  flexShrink: 0,
  background: gradient,
  display: 'flex',
  alignItems: 'flex-end',
  padding: '12px',
  position: 'relative',
}));

export const PhotoCountBadge = styled(Box)({
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: 'white',
  fontSize: 11,
  padding: '3px 8px',
  borderRadius: '100px',
});

export const HotelCardInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const HotelCardName = styled(Typography)({
  fontSize: 17,
  fontWeight: 600,
  color: palette.onSurface,
});

export const HotelCardLocation = styled(Box)({
  fontSize: 13,
  color: palette.onSurfaceVariant,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const HotelCardRatingRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '4px',
});

export const HotelCardStars = styled(Typography)({
  color: palette.star,
  fontSize: 14,
  letterSpacing: '1px',
});

export const HotelCardAmenities = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: '4px',
  flexWrap: 'wrap',
});

export const HotelCardPriceColumn = styled(Box)({
  width: 200,
  flexShrink: 0,
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  borderLeft: `1px solid ${palette.outlineVariant}`,
});

export const HotelCardFromLabel = styled(Typography)({
  fontSize: 11,
  color: palette.onSurfaceVariant,
  textAlign: 'right',
});

export const HotelCardPrice = styled(Typography)({
  fontSize: 26,
  fontWeight: 700,
  color: palette.primary,
  whiteSpace: 'nowrap',
});
