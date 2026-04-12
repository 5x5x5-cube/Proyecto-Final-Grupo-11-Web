import React from 'react';
import { Box, Skeleton, Divider } from '@mui/material';
import { outlineVariant, secondaryContainer } from '@/design-system/theme/palette';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import {
  ThreeColumnLayout,
  CenterPanel,
  MainContent,
  UserSidebarContainer,
  UserCard,
  SidebarDivider,
  RightSidebarContainer,
  PriceRowsList,
  PriceRow,
  CancelBox,
  CancelBoxHeader,
  RoomRow,
  PaymentRow,
  PaymentRightCol,
} from './ReservationDetailPage.styles';

const UserSidebarSkeleton: React.FC = () => (
  <UserSidebarContainer>
    {/* User card */}
    <UserCard>
      <Skeleton animation="wave" variant="circular" width={44} height={44} sx={{ flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton animation="wave" variant="text" width="70%" height={20} />
        <Skeleton animation="wave" variant="text" width="90%" height={16} />
      </Box>
    </UserCard>

    <Skeleton
      animation="wave"
      variant="text"
      width={90}
      height={16}
      sx={{ mb: '8px', ml: '12px' }}
    />

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

    <SidebarDivider />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
      <Skeleton animation="wave" variant="circular" width={20} height={20} />
      <Skeleton animation="wave" variant="text" width={60} height={20} />
    </Box>
  </UserSidebarContainer>
);

const RightSidebarSkeleton: React.FC = () => (
  <RightSidebarContainer>
    {/* Price summary title */}
    <Skeleton animation="wave" variant="text" width={150} height={26} />

    {/* Price rows */}
    <PriceRowsList>
      {[0, 1, 2].map(i => (
        <PriceRow key={i}>
          <Skeleton animation="wave" variant="text" width="55%" height={20} />
          <Skeleton animation="wave" variant="text" width="28%" height={20} />
        </PriceRow>
      ))}
      <Divider sx={{ borderColor: outlineVariant }} />
      <PriceRow>
        <Skeleton animation="wave" variant="text" width={90} height={24} />
        <Skeleton animation="wave" variant="text" width={110} height={30} />
      </PriceRow>
    </PriceRowsList>

    <Divider sx={{ borderColor: outlineVariant }} />

    {/* Cancel box */}
    <CancelBox>
      <CancelBoxHeader>
        <Skeleton animation="wave" variant="circular" width={18} height={18} />
        <Skeleton animation="wave" variant="text" width={130} height={22} />
      </CancelBoxHeader>
      <Skeleton animation="wave" variant="text" height={16} />
      <Skeleton animation="wave" variant="text" width="80%" height={16} />
      <Skeleton animation="wave" variant="text" width="50%" height={20} />
      <Skeleton animation="wave" variant="rounded" height={44} sx={{ borderRadius: '100px' }} />
    </CancelBox>

    {/* Download button */}
    <Skeleton animation="wave" variant="rounded" height={40} sx={{ borderRadius: '100px' }} />
  </RightSidebarContainer>
);

const ReservationDetailPageSkeleton: React.FC = () => (
  <TravelerLayout variant="reservations">
    <ThreeColumnLayout>
      {/* Left sidebar */}
      <UserSidebarSkeleton />

      {/* Center: main content + right sidebar */}
      <CenterPanel>
        {/* Main content */}
        <MainContent>
          {/* Page header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton animation="wave" variant="text" width={160} height={20} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Skeleton animation="wave" variant="text" width={260} height={38} />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={90}
                height={28}
                sx={{ borderRadius: '100px' }}
              />
            </Box>
            <Skeleton animation="wave" variant="text" width={220} height={20} />
            <Box sx={{ mt: '12px' }}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={160}
                height={34}
                sx={{ borderRadius: '100px' }}
              />
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
              <Skeleton
                animation="wave"
                variant="rounded"
                width={100}
                height={100}
                sx={{ borderRadius: '12px', flexShrink: 0 }}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton animation="wave" variant="text" width={60} height={16} />
                <Skeleton animation="wave" variant="text" width="55%" height={28} />
                <Skeleton animation="wave" variant="text" width="65%" height={18} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={40}
                    height={26}
                    sx={{ borderRadius: '6px' }}
                  />
                  <Skeleton animation="wave" variant="text" width={80} height={18} />
                  <Skeleton animation="wave" variant="text" width={70} height={16} />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: outlineVariant }} />

            {/* Info grid (4 columns) */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[0, 1, 2, 3].map(i => (
                <Box key={i}>
                  <Skeleton animation="wave" variant="text" width="70%" height={14} />
                  <Skeleton animation="wave" variant="text" width="85%" height={22} />
                  <Skeleton animation="wave" variant="text" width="50%" height={16} />
                </Box>
              ))}
            </Box>

            {/* Room row */}
            <RoomRow>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={56}
                height={56}
                sx={{ borderRadius: '10px', flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="40%"
                  height={22}
                  sx={{ mb: '4px' }}
                />
                <Skeleton animation="wave" variant="text" width="65%" height={18} />
                <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mt: '6px' }}>
                  {[70, 80, 60, 72, 65].map((w, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rounded"
                      width={w}
                      height={22}
                      sx={{ borderRadius: '100px' }}
                    />
                  ))}
                </Box>
              </Box>
            </RoomRow>
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

            <PaymentRow>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{ flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton animation="wave" variant="text" width="45%" height={20} />
                <Skeleton animation="wave" variant="text" width="35%" height={16} />
                <Skeleton animation="wave" variant="text" width="30%" height={16} />
              </Box>
              <PaymentRightCol>
                <Skeleton animation="wave" variant="text" width={110} height={24} />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={70}
                  height={22}
                  sx={{ borderRadius: '100px', ml: 'auto' }}
                />
              </PaymentRightCol>
            </PaymentRow>
          </Box>
        </MainContent>

        {/* Right sidebar */}
        <RightSidebarSkeleton />
      </CenterPanel>
    </ThreeColumnLayout>
  </TravelerLayout>
);

export default ReservationDetailPageSkeleton;
