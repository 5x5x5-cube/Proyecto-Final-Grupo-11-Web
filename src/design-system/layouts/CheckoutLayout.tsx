import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckoutStepper from './CheckoutStepper';
import { primary, outlineVariant } from '../theme/palette';

interface CheckoutLayoutProps {
  currentStep: number;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ currentStep, sidebar, children }) => {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: `1px solid ${outlineVariant}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 48px',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            height: 72,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Brand (left) */}
          <Box sx={{ position: 'absolute', left: 0 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: primary,
                  letterSpacing: '-0.25px',
                }}
              >
                <Box component="span" sx={{ fontWeight: 300 }}>
                  Travel
                </Box>
                Hub
              </Typography>
            </Link>
          </Box>

          {/* Stepper (centered) */}
          <CheckoutStepper currentStep={currentStep} />
        </Box>
      </Box>

      {/* Body */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px 48px',
          }}
        >
          {children}
        </Box>

        {/* Sidebar */}
        <Box
          sx={{
            width: 480,
            flexShrink: 0,
            backgroundColor: '#ffffff',
            borderLeft: `1px solid ${outlineVariant}`,
            overflowY: 'auto',
            padding: '32px',
          }}
        >
          {sidebar}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutLayout;
