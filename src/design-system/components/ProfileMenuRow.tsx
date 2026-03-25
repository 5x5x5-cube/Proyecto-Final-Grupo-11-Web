import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { palette } from '../theme/palette';

interface ProfileMenuRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}

export default function ProfileMenuRow({ icon, label, value, onClick }: ProfileMenuRowProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        py: '12px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Box sx={{ color: palette.onSurfaceVariant, display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Typography sx={{ fontSize: 14, color: palette.onSurface, flex: 1 }}>
        {label}
      </Typography>
      {value && (
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
          {value}
        </Typography>
      )}
      <ChevronRightIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
    </Box>
  );
}
