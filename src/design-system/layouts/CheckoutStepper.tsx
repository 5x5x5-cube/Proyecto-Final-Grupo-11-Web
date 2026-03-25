import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import {
  primary,
  onPrimary,
  success,
  successContainer,
  outlineVariant,
  onSurface,
  onSurfaceVariant,
} from '../theme/palette';

interface CheckoutStepperProps {
  currentStep: number; // 1-4
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  const { t } = useTranslation('common');

  const steps = [
    t('checkout.accommodation'),
    t('checkout.confirm'),
    t('checkout.payment'),
    t('checkout.confirmation'),
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
      }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <React.Fragment key={step}>
            {/* Step circle + label */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDone ? successContainer : isActive ? primary : outlineVariant,
                  color: isDone ? success : isActive ? onPrimary : onSurfaceVariant,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {isDone ? <CheckIcon sx={{ fontSize: '16px' }} /> : stepNumber}
              </Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isDone ? success : isActive ? onSurface : onSurfaceVariant,
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </Typography>
            </Box>

            {/* Connector */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 40,
                  height: 2,
                  backgroundColor: isDone ? successContainer : outlineVariant,
                  mx: '8px',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CheckoutStepper;
