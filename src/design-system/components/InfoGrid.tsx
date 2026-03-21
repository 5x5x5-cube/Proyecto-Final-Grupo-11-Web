import React from 'react';
import { Box, Typography } from '@mui/material';
import { primary, onSurface, onSurfaceVariant } from '../theme/palette';

interface InfoGridItem {
  label: string;
  value: string;
  sub?: string;
}

interface InfoGridProps {
  columns?: number;
  items: InfoGridItem[];
}

const InfoGrid: React.FC<InfoGridProps> = ({ columns = 3, items }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
      }}
    >
      {items.map((item, index) => (
        <Box key={index}>
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: primary,
              letterSpacing: '0.5px',
              marginBottom: '4px',
            }}
          >
            {item.label}
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 500,
              color: onSurface,
            }}
          >
            {item.value}
          </Typography>
          {item.sub && (
            <Typography
              sx={{
                fontSize: '12px',
                color: onSurfaceVariant,
                marginTop: '2px',
              }}
            >
              {item.sub}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default InfoGrid;
