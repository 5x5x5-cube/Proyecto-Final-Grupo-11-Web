import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  primaryContainer,
  onPrimaryContainer,
  surfaceVariant,
  onSurfaceVariant,
  outlineVariant,
} from '../theme/palette';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, selected = false, icon, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '100px',
        cursor: 'pointer',
        border: `1px solid ${selected ? primaryContainer : outlineVariant}`,
        backgroundColor: selected ? primaryContainer : 'transparent',
        color: selected ? onPrimaryContainer : onSurfaceVariant,
        transition: 'all 0.15s ease',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: selected ? primaryContainer : surfaceVariant,
        },
      }}
    >
      {icon && (
        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
          {icon}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: '13px',
          fontWeight: selected ? 600 : 400,
          color: 'inherit',
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default FilterChip;
