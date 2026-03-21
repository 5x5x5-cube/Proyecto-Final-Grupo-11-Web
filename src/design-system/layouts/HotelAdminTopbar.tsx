import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  onPrimary,
} from '../theme/palette';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HotelAdminTopbarProps {
  breadcrumbs?: Breadcrumb[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const HotelAdminTopbar: React.FC<HotelAdminTopbarProps> = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        marginBottom: '8px',
      }}
    >
      {/* Left: breadcrumbs + title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Typography sx={{ fontSize: '13px', color: onSurfaceVariant }}>/</Typography>
                )}
                {crumb.href ? (
                  <Link to={crumb.href} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: onSurfaceVariant,
                        '&:hover': { color: primary },
                      }}
                    >
                      {crumb.label}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: onSurface,
                    }}
                  >
                    {crumb.label}
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
        {title && (
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: onSurface }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography sx={{ fontSize: 14, color: onSurfaceVariant }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Right: page actions + global actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {actions}

        {/* Language selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
          }}
        >
          <LanguageIcon sx={{ fontSize: '16px', color: onSurfaceVariant }} />
          <Typography sx={{ fontSize: '12px', color: onSurfaceVariant }}>ES</Typography>
        </Box>

        {/* Currency selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: '8px',
            border: `1px solid ${outlineVariant}`,
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontSize: '12px', color: onSurfaceVariant }}>COP</Typography>
        </Box>

        {/* Notification bell */}
        <IconButton
          size="small"
          sx={{
            border: `1px solid ${outlineVariant}`,
            borderRadius: '8px',
            width: 32,
            height: 32,
          }}
        >
          <NotificationsNoneIcon sx={{ fontSize: '18px', color: onSurfaceVariant }} />
        </IconButton>

        {/* Avatar */}
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: primary,
            color: onPrimary,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          AD
        </Avatar>
      </Box>
    </Box>
  );
};

export default HotelAdminTopbar;
