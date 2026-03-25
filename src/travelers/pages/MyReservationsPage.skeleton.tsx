import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { outlineVariant, background, secondaryContainer } from '../../design-system/theme/palette';
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

    {/* Section label */}
    <Skeleton
      animation="wave"
      variant="text"
      width={90}
      height={16}
      sx={{ mb: '8px', ml: '12px' }}
    />

    {/* Menu item */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderRadius: '100px',
        background: secondaryContainer,
      }}
    >
      <Skeleton animation="wave" variant="circular" width={20} height={20} />
      <Skeleton animation="wave" variant="text" width={110} height={20} />
      <Skeleton
        animation="wave"
        variant="rounded"
        width={24}
        height={20}
        sx={{ ml: 'auto', borderRadius: '100px' }}
      />
    </Box>

    {/* Divider */}
    <Box sx={{ height: 1, background: outlineVariant, my: '12px' }} />

    {/* Bottom item */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
      <Skeleton animation="wave" variant="circular" width={20} height={20} />
      <Skeleton animation="wave" variant="text" width={60} height={20} />
    </Box>
  </Box>
);

const ReservationCardSkeleton: React.FC = () => (
  <Box
    sx={{
      background: '#fff',
      border: `1px solid ${outlineVariant}`,
      borderRadius: '16px',
      display: 'flex',
      overflow: 'hidden',
      height: 160,
    }}
  >
    {/* Thumbnail */}
    <Skeleton animation="wave" variant="rectangular" width={180} sx={{ flexShrink: 0 }} />

    {/* Body */}
    <Box
      sx={{
        flex: 1,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box>
        <Skeleton animation="wave" variant="text" width={60} height={16} />
        <Skeleton animation="wave" variant="text" width="55%" height={26} />
        <Skeleton animation="wave" variant="text" width="40%" height={18} />
      </Box>

      <Box sx={{ display: 'flex', gap: '24px' }}>
        {[0, 1, 2].map(i => (
          <Box key={i}>
            <Skeleton animation="wave" variant="text" width={60} height={14} />
            <Skeleton animation="wave" variant="text" width={80} height={20} />
            <Skeleton animation="wave" variant="text" width={55} height={16} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Skeleton animation="wave" variant="text" width={150} height={18} />
      </Box>
    </Box>

    {/* Right panel */}
    <Box
      sx={{
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderLeft: `1px solid ${outlineVariant}`,
        width: 220,
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          width={80}
          height={24}
          sx={{ borderRadius: '100px' }}
        />
        <Skeleton animation="wave" variant="text" width={110} height={16} />
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Skeleton animation="wave" variant="text" width={70} height={16} />
        <Skeleton animation="wave" variant="text" width={120} height={30} />
      </Box>

      <Skeleton
        animation="wave"
        variant="rounded"
        width={120}
        height={36}
        sx={{ borderRadius: '100px' }}
      />
    </Box>
  </Box>
);

const MyReservationsPageSkeleton: React.FC = () => (
  <TravelerLayout variant="reservations">
    <Box sx={{ display: 'flex', margin: '-32px -48px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Left sidebar */}
      <UserSidebarSkeleton />

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          padding: '36px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Page title */}
        <Skeleton animation="wave" variant="text" width={240} height={40} />

        {/* Tabs — always visible, rendered as skeleton to avoid layout shift */}
        <Box sx={{ display: 'flex', gap: 0, borderBottom: `1px solid ${outlineVariant}` }}>
          {[80, 70, 80].map((w, i) => (
            <Box key={i} sx={{ padding: '12px 24px' }}>
              <Skeleton animation="wave" variant="text" width={w} height={20} />
            </Box>
          ))}
        </Box>

        {/* Filters row */}
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={400}
            height={40}
            sx={{ borderRadius: '8px' }}
          />
          {[70, 90, 80, 70].map((w, i) => (
            <Skeleton
              key={i}
              animation="wave"
              variant="rounded"
              width={w}
              height={36}
              sx={{ borderRadius: '100px' }}
            />
          ))}
        </Box>

        {/* Reservation card skeletons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[0, 1, 2, 3].map(i => (
            <ReservationCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  </TravelerLayout>
);

export default MyReservationsPageSkeleton;
