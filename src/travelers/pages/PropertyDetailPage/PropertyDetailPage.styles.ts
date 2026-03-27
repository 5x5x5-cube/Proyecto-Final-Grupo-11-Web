import { styled, Box, Typography, IconButton } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

/* ─── Sidebar ─── */

export const SidebarWrapper = styled(Box)({
  padding: '32px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const PriceCard = styled(Box)({
  backgroundColor: palette.background,
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const PriceHeadline = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: palette.primary,
});

export const PricePerNightLabel = styled(Typography)({
  fontSize: 16,
  fontWeight: 400,
  color: palette.onSurfaceVariant,
});

export const DateFieldsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
});

export const DateField = styled(Box)({
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '10px 14px',
  cursor: 'pointer',
});

export const FieldTopLabel = styled(Typography)({
  fontSize: 10,
  fontWeight: 500,
  color: palette.primary,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  marginBottom: '2px',
});

export const FieldValue = styled(Typography)({
  fontSize: 14,
  color: palette.onSurface,
});

export const GuestsField = styled(Box)({
  border: `1px solid ${palette.outline}`,
  borderRadius: '8px',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
});

export const PriceBreakdown = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const PriceRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 14,
  color: palette.onSurfaceVariant,
});

export const PriceTotalRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 600,
  color: palette.onSurface,
  borderTop: `1px solid ${palette.outlineVariant}`,
  paddingTop: '10px',
  marginTop: '4px',
});

export const SecureBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
});

export const CancellationPolicyCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '16px',
  border: `1px solid ${palette.outlineVariant}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CancellationRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

/* ─── Main Content ─── */

export const ContentColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
});

export const GalleryGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '260px 130px',
  gap: '8px',
  borderRadius: '16px',
  overflow: 'hidden',
});

export const GalleryMainImage = styled(Box)({
  gridColumn: '1 / 2',
  gridRow: '1 / 3',
  background: 'linear-gradient(135deg, #003740, #006874)',
});

export const GalleryMorePhotosOverlay = styled(Box)({
  background: 'linear-gradient(135deg, #7B4F00, #C89030)',
  position: 'relative',
});

export const HeaderRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '24px',
});

export const HeaderInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const HotelTypeLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: palette.primary,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
});

export const HotelTitle = styled(Typography)({
  fontSize: 30,
  fontWeight: 700,
  color: palette.onSurface,
});

export const LocationRow = styled(Box)({
  fontSize: 15,
  color: palette.onSurfaceVariant,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const RatingRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const StarsText = styled(Typography)({
  color: palette.star,
  fontSize: 16,
});

export const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '10px',
});

export const ActionIconButton = styled(IconButton)({
  width: 40,
  height: 40,
  border: `1px solid ${palette.outlineVariant}`,
  backgroundColor: '#fff',
});

export const AmenitiesGrid = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

export const AmenityChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '100px',
  fontSize: 13,
  color: palette.onSurfaceVariant,
  backgroundColor: '#fff',
});

export const RoomsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const RoomCard = styled(Box)({
  backgroundColor: '#fff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '12px',
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const RoomThumbnail = styled(Box)<{ gradient: string }>(({ gradient }) => ({
  width: 72,
  height: 72,
  borderRadius: '10px',
  flexShrink: 0,
  background: gradient,
}));

export const ReviewsRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  overflow: 'hidden',
});

export const ReviewCard = styled(Box)({
  flex: 1,
  backgroundColor: '#fff',
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ReviewSkeletonCard = styled(Box)({
  flex: 1,
  border: `1px solid ${palette.outlineVariant}`,
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const ReviewAuthorRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const ReviewAvatar = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: palette.secondaryContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
  color: palette.primary,
});

export const ReviewStars = styled(Typography)({
  color: palette.star,
  fontSize: 13,
});
