import React from 'react';
import { Box, Typography } from '@mui/material';
import { outlineVariant, onSurface } from '../theme/palette';

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        border: `1px solid ${outlineVariant}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '18px',
          borderBottom: `1px solid ${outlineVariant}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: onSurface }}>{icon}</Box>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: onSurface,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Body */}
      <Box sx={{ padding: '24px' }}>{children}</Box>
    </Box>
  );
};

export default SectionCard;
