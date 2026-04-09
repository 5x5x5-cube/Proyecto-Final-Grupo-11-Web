import { styled, Box, Typography } from '@mui/material';
import { palette } from '@/design-system/theme/palette';

export const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const HotelInfoRow = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
});

export const HotelImagePlaceholder = styled(Box)({
  width: 120,
  height: 90,
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #003740, #006874)',
  flexShrink: 0,
});

export const HotelDetails = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const HotelType = styled(Typography)({
  fontSize: 11,
  fontWeight: 500,
  color: palette.primary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const HotelName = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: palette.onSurface,
});

export const LocationRow = styled(Box)({
  fontSize: 13,
  color: palette.onSurfaceVariant,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const RatingRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const Stars = styled(Typography)({
  color: palette.star,
  fontSize: 13,
});

export const ReviewCount = styled(Typography)({
  fontSize: 12,
  color: palette.onSurfaceVariant,
});

export const RoomRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  backgroundColor: palette.background,
  borderRadius: '12px',
});

export const RoomImagePlaceholder = styled(Box)({
  width: 48,
  height: 48,
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #006874, #4A9FAA)',
  flexShrink: 0,
});

export const RoomName = styled(Typography)({
  fontSize: 15,
  fontWeight: 600,
  color: palette.onSurface,
});

export const RoomFeatures = styled(Typography)({
  fontSize: 13,
  color: palette.onSurfaceVariant,
});

export const RoomPrice = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: palette.primary,
});

export const PerNightLabel = styled(Typography)({
  fontSize: 12,
  color: palette.onSurfaceVariant,
});
