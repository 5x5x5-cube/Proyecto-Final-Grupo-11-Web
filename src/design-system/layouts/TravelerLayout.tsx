import React from 'react';
import { Box } from '@mui/material';
import TravelerNav from './TravelerNav';
import { outlineVariant } from '../theme/palette';

interface TravelerLayoutProps {
  variant?: 'home' | 'results' | 'detail' | 'reservations';
  searchSummary?: string;
  sidebar?: React.ReactNode;
  noPadding?: boolean;
  children: React.ReactNode;
}

const TravelerLayout: React.FC<TravelerLayoutProps> = ({
  variant = 'home',
  searchSummary,
  sidebar,
  noPadding,
  children,
}) => {
  const navHeight = 72;

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <TravelerNav variant={variant} searchSummary={searchSummary} />

      <Box
        sx={{
          display: 'flex',
          marginTop: `${navHeight}px`,
          minHeight: `calc(100vh - ${navHeight}px)`,
        }}
      >
        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            ...(noPadding ? {} : { padding: '32px 48px' }),
          }}
        >
          {children}
        </Box>

        {/* Optional sidebar */}
        {sidebar && (
          <Box
            sx={{
              width: 360,
              flexShrink: 0,
              backgroundColor: '#ffffff',
              borderLeft: `1px solid ${outlineVariant}`,
              overflowY: 'auto',
            }}
          >
            {sidebar}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TravelerLayout;
