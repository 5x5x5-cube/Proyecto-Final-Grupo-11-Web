import React from 'react';
import { Box, Skeleton, Divider } from '@mui/material';
import {
  outlineVariant,
  background,
  secondaryContainer,
  errorContainer,
} from '../../design-system/theme/palette';
import TravelerLayout from '../../design-system/layouts/TravelerLayout';

const UserSidebarSkeleton: React.FC = () => (
  <Box
    sx={{
      width: 280,
      flexShrink: 0,
      background: '#fff',
      borderRight: `1px solid ${outlineVariant}`,
      padding: '32px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    {/* User card */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 12px',
        background: background,
        borderRadius: '12px',
        mb: '16px',
      }}
    >
      <Skeleton animation="wave" variant="circular" width={44} height={44} sx={{ flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton animation="wave" variant="text" width="70%" height={20} />
        <Skeleton animation="wave" variant="text" width="90%" height={16} />
      </Box>
    </Box>

    <Skeleton animation="wave" variant="text" width={90} height={16} sx={{ mb: '8px', ml: '12px' }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '100px', background: secondaryContainer }}>
      <Skeleton animation="wave" variant="circular" width={20} height={20} />
      <Skeleton animation="wave" variant="text" width={110} height={20} />
      <Skeleton animation="wave" variant="rounded" width={24} height={20} sx={{ ml: 'auto', borderRadius: '100px' }} />
    </Box>

    <Box sx={{ height: 1, background: outlineVariant, my: '12px' }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
      <Skeleton animation="wave" variant="circular" width={20} height={20} />
      <Skeleton animation="wave" variant="text" width={60} height={20} />
    </Box>
  </Box>
);

const RightSidebarSkeleton: React.FC = () => (
  <Box
    sx={{
      width: 380,
      flexShrink: 0,
      background: '#fff',
      borderLeft: `1px solid ${outlineVariant}`,
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}
  >
    {/* Price summary title */}
    <Skeleton animation="wave" variant="text" width={150} height={26} />

    {/* Price rows */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[0, 1, 2].map((i) => (
        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton animation="wave" variant="text" width="55%" height={20} />
          <Skeleton animation="wave" variant="text" width="28%" height={20} />
        </Box>
      ))}
      <Divider sx={{ borderColor: outlineVariant }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton animation="wave" variant="text" width={90} height={24} />
        <Skeleton animation="wave" variant="text" width={110} height={30} />
      </Box>
    </Box>

    <Divider sx={{ borderColor: outlineVariant }} />

    {/* Cancel box */}
    <Box
      sx={{
        background: errorContainer,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Skeleton animation="wave" variant="circular" width={18} height={18} />
        <Skeleton animation="wave" variant="text" width={130} height={22} />
      </Box>
      <Skeleton animation="wave" variant="text" height={16} />
      <Skeleton animation="wave" variant="text" width="80%" height={16} />
      <Skeleton animation="wave" variant="text" width="50%" height={20} />
      <Skeleton animation="wave" variant="rounded" height={44} sx={{ borderRadius: '100px' }} />
    </Box>

    {/* Download button */}
    <Skeleton animation="wave" variant="rounded" height={40} sx={{ borderRadius: '100px' }} />
  </Box>
);

const ReservationDetailPageSkeleton: React.FC = () => (
  <TravelerLayout variant="reservations">
    <Box sx={{ display: 'flex', margin: '-32px -48px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Left sidebar */}
      <UserSidebarSkeleton />

      {/* Center: main content + right sidebar */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            padding: '36px 48px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Page header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton animation="wave" variant="text" width={160} height={20} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Skeleton animation="wave" variant="text" width={260} height={38} />
              <Skeleton animation="wave" variant="rounded" width={90} height={28} sx={{ borderRadius: '100px' }} />
            </Box>
            <Skeleton animation="wave" variant="text" width={220} height={20} />
            <Box sx={{ mt: '12px' }}>
              <Skeleton animation="wave" variant="rounded" width={160} height={34} sx={{ borderRadius: '100px' }} />
            </Box>
          </Box>

          {/* Accommodation section card */}
          <Box
            sx={{
              background: '#fff',
              border: `1px solid ${outlineVariant}`,
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Section header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton animation="wave" variant="circular" width={24} height={24} />
              <Skeleton animation="wave" variant="text" width={160} height={24} />
            </Box>

            {/* Hotel info row */}
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <Skeleton animation="wave" variant="rounded" width={100} height={100} sx={{ borderRadius: '12px', flexShrink: 0 }} />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton animation="wave" variant="text" width={60} height={16} />
                <Skeleton animation="wave" variant="text" width="55%" height={28} />
                <Skeleton animation="wave" variant="text" width="65%" height={18} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Skeleton animation="wave" variant="rounded" width={40} height={26} sx={{ borderRadius: '6px' }} />
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                  <Skeleton animation="wave" variant="text" width={70} height={16} />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: outlineVariant }} />

            {/* Info grid (4 columns) */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[0, 1, 2, 3].map((i) => (
                <Box key={i}>
                  <Skeleton animation="wave" variant="text" width="70%" height={14} />
                  <Skeleton animation="wave" variant="text" width="85%" height={22} />
                  <Skeleton animation="wave" variant="text" width="50%" height={16} />
                </Box>
              ))}
            </Box>

            {/* Room row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '14px 18px',
                background: background,
                borderRadius: '12px',
              }}
            >
              <Skeleton animation="wave" variant="rounded" width={56} height={56} sx={{ borderRadius: '10px', flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton animation="wave" variant="text" width="40%" height={22} sx={{ mb: '4px' }} />
                <Skeleton animation="wave" variant="text" width="65%" height={18} />
                <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mt: '6px' }}>
                  {[70, 80, 60, 72, 65].map((w, i) => (
                    <Skeleton key={i} animation="wave" variant="rounded" width={w} height={22} sx={{ borderRadius: '100px' }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Payment history section card */}
          <Box
            sx={{
              background: '#fff',
              border: `1px solid ${outlineVariant}`,
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Skeleton animation="wave" variant="circular" width={24} height={24} />
              <Skeleton animation="wave" variant="text" width={140} height={24} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0' }}>
              <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton animation="wave" variant="text" width="45%" height={20} />
                <Skeleton animation="wave" variant="text" width="35%" height={16} />
                <Skeleton animation="wave" variant="text" width="30%" height={16} />
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Skeleton animation="wave" variant="text" width={110} height={24} />
                <Skeleton animation="wave" variant="rounded" width={70} height={22} sx={{ borderRadius: '100px', ml: 'auto' }} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right sidebar */}
        <RightSidebarSkeleton />
      </Box>
    </Box>
  </TravelerLayout>
);

export default ReservationDetailPageSkeleton;
