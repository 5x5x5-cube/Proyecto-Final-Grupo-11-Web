import React from 'react';
import { Box } from '@mui/material';
import { palette } from '../../design-system/theme/palette';
import BottomNav from './BottomNav';

interface MobileShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
  activeTab?: 'search' | 'reservations' | 'profile';
}

export default function MobileShell({ children, hideNav = false, activeTab = 'search' }: MobileShellProps) {
  return (
    <Box
      sx={{
        width: 375,
        margin: '0 auto',
        minHeight: '100vh',
        position: 'relative',
        background: palette.surface,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          pb: hideNav ? 0 : '56px',
        }}
      >
        {children}
      </Box>

      {/* Bottom Nav */}
      {!hideNav && <BottomNav active={activeTab} />}
    </Box>
  );
}
