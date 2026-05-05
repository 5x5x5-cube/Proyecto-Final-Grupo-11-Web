import React from 'react';
import { Box, styled } from '@mui/material';
import { primary, onPrimary, star as starColor, outlineVariant } from '../theme/palette';

type StarDisplay = 'none' | 'single' | 'full';

interface RatingBadgeProps {
  rating: number;
  showStars?: StarDisplay;
}

const Container = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
});

const Badge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: primary,
  color: onPrimary,
  borderRadius: 6,
  padding: '2px 8px',
  minWidth: 32,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.4,
});

const StarsContainer = styled('span')({
  display: 'inline-flex',
  gap: 1,
  lineHeight: 1,
});

const FullStar = styled('span')({
  color: starColor,
  fontSize: 14,
});

const EmptyStar = styled('span')({
  color: outlineVariant,
  fontSize: 14,
});

const PartialStarWrapper = styled('span')({
  position: 'relative',
  display: 'inline-block',
  fontSize: 14,
});

const PartialStarBg = styled('span')({
  color: outlineVariant,
});

const PartialStarFill = styled('span')<{ $width: number }>(({ $width }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  overflow: 'hidden',
  width: `${$width}%`,
  color: starColor,
}));

function renderStars(rating: number, maxStars = 5): React.ReactNode {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = maxStars - full - (partial > 0 ? 1 : 0);

  return (
    <StarsContainer>
      {Array.from({ length: full }, (_, i) => (
        <FullStar key={`full-${i}`}>★</FullStar>
      ))}
      {partial > 0 && (
        <PartialStarWrapper key="partial">
          <PartialStarBg>★</PartialStarBg>
          <PartialStarFill $width={Math.round(partial * 100)}>★</PartialStarFill>
        </PartialStarWrapper>
      )}
      {Array.from({ length: empty }, (_, i) => (
        <EmptyStar key={`empty-${i}`}>★</EmptyStar>
      ))}
    </StarsContainer>
  );
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, showStars = 'none' }) => {
  return (
    <Container>
      <Badge>{rating.toFixed(1)}</Badge>
      {showStars === 'single' && (
        <StarsContainer>
          <FullStar>★</FullStar>
        </StarsContainer>
      )}
      {showStars === 'full' && renderStars(rating)}
    </Container>
  );
};

export default RatingBadge;
