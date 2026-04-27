import React from 'react';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaceIcon from '@mui/icons-material/Place';
import BedIcon from '@mui/icons-material/Bed';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import StatusChip from '@/design-system/components/StatusChip';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import { useReservationTabs } from './useReservationTabs';
import type { ReservationTab } from './useReservationTabs';
import MyReservationsPageSkeleton from './MyReservationsPage.skeleton';
import {
  SidebarRoot,
  UserCard,
  UserAvatar,
  SidebarSectionTitle,
  SidebarMenuItem,
  MenuItemLabel,
  SidebarDivider,
  PageLayout,
  MainContent,
  PageTitle,
  TabsBar,
  Tab,
  CardList,
  ReservationCard,
  CardThumbnail,
  CardBody,
  HotelName,
  DatesRow,
  CardRightPanel,
  StatusGroup,
  BookingCode,
  TotalLabel,
} from './MyReservationsPage.styles';

/* --- User Sidebar --- */
const UserSidebar: React.FC = () => {
  const { t } = useTranslation('travelers');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarRoot>
      <UserCard>
        <UserAvatar>{user?.initials ?? '?'}</UserAvatar>
        <Box>
          <Text textVariant="bodySemibold">{user?.name}</Text>
          <Text textVariant="caption">{user?.email}</Text>
        </Box>
      </UserCard>

      <SidebarSectionTitle>{t('myReservations.sidebar.myAccount')}</SidebarSectionTitle>

      <SidebarMenuItem active>
        <LuggageIcon sx={{ fontSize: 20 }} />
        <MenuItemLabel>{t('myReservations.sidebar.myReservations')}</MenuItemLabel>
      </SidebarMenuItem>

      <SidebarDivider />

      <SidebarMenuItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
        <LogoutIcon sx={{ fontSize: 20 }} />
        <MenuItemLabel>{t('myReservations.sidebar.logout')}</MenuItemLabel>
      </SidebarMenuItem>

      <Text textVariant="caption" sx={{ textAlign: 'center', opacity: 0.5 }}>
        v{__APP_VERSION__}
      </Text>
    </SidebarRoot>
  );
};

/* --- Main --- */
const MyReservationsPage: React.FC = () => {
  const { tab, setTab, bookings, isLoading } = useReservationTabs();
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const tabKeys: ReservationTab[] = ['active', 'past', 'cancelled'];
  const activeTab = tabKeys.indexOf(tab);

  if (isLoading) return <MyReservationsPageSkeleton />;

  const tabs = [
    t('myReservations.tabs.active'),
    t('myReservations.tabs.past'),
    t('myReservations.tabs.cancelled'),
  ];
  return (
    <TravelerLayout variant="reservations">
      <PageLayout>
        <UserSidebar />

        <MainContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PageTitle>{t('myReservations.title')}</PageTitle>
          </Box>

          <TabsBar>
            {tabs.map((tabLabel, index) => (
              <Tab
                key={tabLabel}
                active={activeTab === index}
                onClick={() => setTab(tabKeys[index])}
              >
                {tabLabel}
              </Tab>
            ))}
          </TabsBar>

          <CardList>
            {bookings.map(b => {
              const nights =
                b.nights ??
                Math.max(
                  1,
                  Math.round(
                    (new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / 86400000
                  )
                );

              return (
                <ReservationCard key={b.id}>
                  <CardThumbnail
                    sx={{
                      background: 'linear-gradient(135deg, #006874 0%, #4A9FAA 100%)',
                      borderRadius: '12px 0 0 12px',
                    }}
                  />

                  <CardBody>
                    <Box>
                      <HotelName>{b.hotelName ?? '—'}</HotelName>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <PlaceIcon sx={{ fontSize: 14, color: palette.onSurfaceVariant }} />
                        <Text textVariant="hint">{b.location ?? '—'}</Text>
                      </Box>
                    </Box>

                    <DatesRow>
                      <Box>
                        <Text textVariant="overline">{t('myReservations.card.checkIn')}</Text>
                        <Text textVariant="bodyMedium">
                          {formatDate(b.checkIn, 'mediumWithDay')}
                        </Text>
                      </Box>
                      <Box>
                        <Text textVariant="overline">{t('myReservations.card.checkOut')}</Text>
                        <Text textVariant="bodyMedium">
                          {formatDate(b.checkOut, 'mediumWithDay')}
                        </Text>
                      </Box>
                      <Box>
                        <Text textVariant="overline">{t('myReservations.card.duration')}</Text>
                        <Text textVariant="bodyMedium">
                          {t('myReservations.card.nightsCount', { count: nights })}
                        </Text>
                        <Text textVariant="caption">
                          {t('myReservations.card.guestsCount', { count: b.guests })}
                        </Text>
                      </Box>
                    </DatesRow>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', mt: '4px' }}>
                      <BedIcon sx={{ fontSize: 15, color: palette.onSurfaceVariant }} />
                      <Text textVariant="hint">{b.roomName ?? '—'}</Text>
                    </Box>
                  </CardBody>

                  <CardRightPanel>
                    <StatusGroup>
                      <StatusChip status={b.status} />
                      <BookingCode>{b.code}</BookingCode>
                    </StatusGroup>

                    <Box sx={{ textAlign: 'right' }}>
                      <TotalLabel>{t('myReservations.card.totalPaid')}</TotalLabel>
                      <Text textVariant="price">{formatPrice(b.totalPrice)}</Text>
                    </Box>

                    <PrimaryPillButton
                      component={Link}
                      to={`/reservations/${b.id}`}
                      pillSize="xs"
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      {t('myReservations.card.viewDetail')}
                    </PrimaryPillButton>
                  </CardRightPanel>
                </ReservationCard>
              );
            })}
          </CardList>
        </MainContent>
      </PageLayout>
    </TravelerLayout>
  );
};

export default MyReservationsPage;
