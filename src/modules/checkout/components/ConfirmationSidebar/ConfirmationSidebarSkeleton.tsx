import React from 'react';
import { Box, Skeleton } from '@mui/material';

/** Skeleton for the hotel card + info grid section (cart data) */
export const CartDetailsSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Hotel card */}
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Skeleton variant="rounded" width={80} height={80} />
      <Box sx={{ flex: 1 }}>
        <Skeleton width={100} height={14} sx={{ mb: '6px' }} />
        <Skeleton width={180} height={20} sx={{ mb: '4px' }} />
        <Skeleton width={140} height={14} />
      </Box>
    </Box>

    {/* Info grid (2x2) */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      {Array.from({ length: 4 }, (_, i) => (
        <Box key={i}>
          <Skeleton width="60%" height={14} sx={{ mb: '4px' }} />
          <Skeleton width="80%" height={18} sx={{ mb: '2px' }} />
          <Skeleton width="50%" height={12} />
        </Box>
      ))}
    </Box>
  </Box>
);

/** Skeleton for the payment summary section (payment data) */
export const PaymentSummarySkeleton: React.FC = () => (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
      <Skeleton width={120} height={20} />
      <Skeleton width={100} height={24} />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Skeleton width={90} height={24} sx={{ borderRadius: '100px' }} />
    </Box>
  </Box>
);
