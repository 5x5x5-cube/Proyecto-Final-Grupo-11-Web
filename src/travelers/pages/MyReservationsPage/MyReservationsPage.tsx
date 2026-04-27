import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaceIcon from '@mui/icons-material/Place';
import BedIcon from '@mui/icons-material/Bed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import TravelerLayout from '@/design-system/layouts/TravelerLayout';
import StatusChip from '@/design-system/components/StatusChip';
import FilterChip from '@/design-system/components/FilterChip';
import SearchField from '@/design-system/components/SearchField';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import { useBookings } from '@/api/hooks/useBookings';
import MyReservationsPageSkeleton from './MyReservationsPage.skeleton';
import {
  SidebarRoot,
  UserCard,
  UserAvatar,
  SidebarSectionTitle,
  SidebarMenuItem,
  MenuItemLabel,
  MenuBadge,
  SidebarDivider,
  PageLayout,
  MainContent,
  PageTitle,
  TabsBar,
  Tab,
  FiltersRow,
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

  const menuItems = [
    {
      icon: <LuggageIcon sx={{ fontSize: 20 }} />,
      label: t('myReservations.sidebar.myReservations'),
      active: true,
      badge: '3',
    },
  ];

  const bottomItems = [
    { icon: <LogoutIcon sx={{ fontSize: 20 }} />, label: t('myReservations.sidebar.logout') },
  ];

  return (
    <SidebarRoot>
      <UserCard>
        <UserAvatar>C</UserAvatar>
        <Box>
          <Text textVariant="bodySemibold">Carlos Mart&iacute;nez</Text>
          <Text textVariant="caption">carlos.m@email.com</Text>
        </Box>
      </UserCard>

      <SidebarSectionTitle>{t('myReservations.sidebar.myAccount')}</SidebarSectionTitle>

      {menuItems.map(item => (
        <SidebarMenuItem key={item.label} active={item.active}>
          {item.icon}
          <MenuItemLabel>{item.label}</MenuItemLabel>
          {item.badge && <MenuBadge>{item.badge}</MenuBadge>}
        </SidebarMenuItem>
      ))}

      <SidebarDivider />

      {bottomItems.map(item => (
        <SidebarMenuItem key={item.label}>
          {item.icon}
          <MenuItemLabel>{item.label}</MenuItemLabel>
        </SidebarMenuItem>
      ))}

      <Text textVariant="caption" sx={{ textAlign: 'center', opacity: 0.5 }}>
        v{__APP_VERSION__}
      </Text>
    </SidebarRoot>
  );
};

/* --- Main --- */
const MyReservationsPage: React.FC = () => {
  const { data: bookingsData, isLoading } = useBookings();
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  if (isLoading || !bookingsData) return <MyReservationsPageSkeleton />;

  const bookings = bookingsData;

  const tabs = [
    t('myReservations.tabs.active'),
    t('myReservations.tabs.past'),
    t('myReservations.tabs.cancelled'),
  ];
  const filters = [
    {
      label: t('myReservations.filters.all'),
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />,
      selected: true,
    },
    { label: t('myReservations.filters.confirmed') },
    { label: t('myReservations.filters.pending') },
    { label: t('myReservations.filters.date'), icon: <CalendarTodayIcon sx={{ fontSize: 16 }} /> },
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
            {tabs.map((tab, index) => (
              <Tab key={tab} active={activeTab === index} onClick={() => setActiveTab(index)}>
                {tab}
              </Tab>
            ))}
          </TabsBar>

          <FiltersRow>
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <SearchField placeholder={t('myReservations.filters.searchPlaceholder')} />
            </Box>
            {filters.map((filter, index) => (
              <FilterChip
                key={filter.label}
                label={filter.label}
                selected={activeFilter === index}
                icon={filter.icon}
                onClick={() => setActiveFilter(index)}
              />
            ))}
          </FiltersRow>

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
                  <CardThumbnail>
                    <Box sx={{ width: '100%', height: '100%' }} />
                  </CardThumbnail>

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
