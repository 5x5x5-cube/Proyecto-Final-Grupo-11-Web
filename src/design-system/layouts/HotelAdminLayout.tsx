import React from 'react';
import { Box } from '@mui/material';
import HotelAdminSidebar from './HotelAdminSidebar';
import HotelAdminTopbar from './HotelAdminTopbar';

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
      </Box>
    </Box>
  );
};

export default HotelAdminLayout;
