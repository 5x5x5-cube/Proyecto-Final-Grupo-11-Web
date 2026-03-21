import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { onSurface, onSurfaceVariant, outlineVariant } from '../theme/palette';

interface PriceRow {
  label: string;
  value: string;
}

interface PriceBreakdownProps {
  rows: PriceRow[];
  totalLabel: string;
  totalValue: string;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ rows, totalLabel, totalValue }) => {
  return (
    <Box>
      {rows.map((row, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: onSurfaceVariant,
            }}
          >
            {row.label}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: onSurface,
            }}
          >
            {row.value}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ borderColor: outlineVariant, my: '12px' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: onSurface,
          }}
        >
          {totalLabel}
        </Typography>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: onSurface,
          }}
        >
          {totalValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceBreakdown;
