import React from 'react';
import { Box } from '@mui/material';
import HotelAdminSidebar from './HotelAdminSidebar';
import HotelAdminTopbar from './HotelAdminTopbar';
import { onSurfaceVariant, outlineVariant } from '../theme/palette';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HotelAdminLayoutProps {
  activeNav: string;
  breadcrumbs?: Breadcrumb[];
  title?: string;
  subtitle?: string;
  topbarActions?: React.ReactNode;
  children: React.ReactNode;
}

const HotelAdminLayout: React.FC<HotelAdminLayoutProps> = ({
  activeNav,
  breadcrumbs,
  title,
  subtitle,
  topbarActions,
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <HotelAdminSidebar activeItem={activeNav} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 32px 28px',
        }}
      >
        <HotelAdminTopbar
          breadcrumbs={breadcrumbs}
          title={title}
          subtitle={subtitle}
          actions={topbarActions}
        />
        {children}

        <Box
          component="footer"
          sx={{
            borderTop: `1px solid ${outlineVariant}`,
            padding: '8px 48px',
            textAlign: 'right',
            fontSize: '11px',
            color: onSurfaceVariant,
            marginTop: '16px',
          }}
        >
          v{__APP_VERSION__}
        </Box>
      </Box>
    </Box>
  );
};

export default HotelAdminLayout;
