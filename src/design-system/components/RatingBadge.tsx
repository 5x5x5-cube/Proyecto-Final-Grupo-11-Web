import React from 'react';
import { Box, Typography } from '@mui/material';
import { primary, onPrimary } from '../theme/palette';

interface RatingBadgeProps {
  rating: number;
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        color: onPrimary,
        borderRadius: '6px',
        padding: '2px 8px',
        minWidth: 32,
      }}
    >
      <Typography
        sx={{
          fontSize: '13px',
          fontWeight: 700,
          lineHeight: 1.4,
          color: 'inherit',
        }}
      >
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default RatingBadge;
