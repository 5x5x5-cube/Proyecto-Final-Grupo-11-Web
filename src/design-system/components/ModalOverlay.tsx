import React from 'react';
import { Dialog, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { onSurface, onSurfaceVariant, outlineVariant } from '../theme/palette';

interface ModalOverlayProps {
  open: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  open,
  onClose,
  icon,
  iconBg,
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '24px 24px 16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              backgroundColor: iconBg,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: onSurface,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                sx={{
                  fontSize: '13px',
                  color: onSurfaceVariant,
                  marginTop: '2px',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: onSurfaceVariant }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ padding: '0 24px 24px' }}>
        {children}
      </Box>

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            padding: '16px 24px',
            borderTop: `1px solid ${outlineVariant}`,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          {footer}
        </Box>
      )}
    </Dialog>
  );
};

export default ModalOverlay;
