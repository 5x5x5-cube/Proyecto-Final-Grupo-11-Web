import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaceIcon from '@mui/icons-material/Place';
import BedIcon from '@mui/icons-material/Bed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import TravelerLayout from '../../design-system/layouts/TravelerLayout';
import StatusChip from '../../design-system/components/StatusChip';
import FilterChip from '../../design-system/components/FilterChip';
import SearchField from '../../design-system/components/SearchField';
import MyReservationsPageSkeleton from './MyReservationsPage.skeleton';
import { useBookings } from '../../api/hooks/useBookings';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outlineVariant,
  background,
  secondaryContainer,
} from '../../design-system/theme/palette';

/* ─── Main ─── */
const MyReservationsPage: React.FC = () => {
  const { data: bookingsData, isLoading } = useBookings();

  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  if (isLoading || !bookingsData) return <MyReservationsPageSkeleton />;

  const mockReservations = bookingsData as Array<{
    id: string | number;
    gradient: string;
    hotelType: string;
    hotelName: string;
    location: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: string;
    room: string;
    status: string;
    code: string;
    totalPriceCop: number;
  }>;

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

  /* ─── Sidebar (left, 280px) ─── */
  const UserSidebar: React.FC = () => {
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
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: secondaryContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: primary,
              flexShrink: 0,
            }}
          >
            C
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: onSurface }}>
              Carlos Mart&iacute;nez
            </Typography>
            <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
              carlos.m@email.com
            </Typography>
          </Box>
        </Box>

        {/* Section title */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: onSurfaceVariant,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '0 12px',
            mb: '8px',
          }}
        >
          {t('myReservations.sidebar.myAccount')}
        </Typography>

        {/* Menu items */}
        {menuItems.map(item => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: item.active ? primary : onSurfaceVariant,
              background: item.active ? secondaryContainer : 'transparent',
              '&:hover': {
                background: item.active ? secondaryContainer : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'inherit' }}>
              {item.label}
            </Typography>
            {item.badge && (
              <Box
                sx={{
                  ml: 'auto',
                  background: primary,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '100px',
                }}
              >
                {item.badge}
              </Box>
            )}
          </Box>
        ))}

        {/* Divider */}
        <Box sx={{ height: 1, background: outlineVariant, my: '12px' }} />

        {/* Bottom items */}
        {bottomItems.map(item => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '100px',
              cursor: 'pointer',
              color: onSurfaceVariant,
              '&:hover': { background: 'rgba(0,0,0,0.04)' },
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <TravelerLayout variant="reservations">
      <Box sx={{ display: 'flex', margin: '-32px -48px', minHeight: 'calc(100vh - 64px)' }}>
        {/* Left sidebar */}
        <UserSidebar />

        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            padding: '36px 48px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Page header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: onSurface }}>
              {t('myReservations.title')}
            </Typography>
          </Box>

          {/* Tabs */}
          <Box
            sx={{
              display: 'flex',
              gap: 0,
              borderBottom: `1px solid ${outlineVariant}`,
            }}
          >
            {tabs.map((tab, index) => (
              <Box
                key={tab}
                onClick={() => setActiveTab(index)}
                sx={{
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: activeTab === index ? primary : onSurfaceVariant,
                  cursor: 'pointer',
                  borderBottom: `2px solid ${activeTab === index ? primary : 'transparent'}`,
                  mb: '-1px',
                }}
              >
                {tab}
              </Box>
            ))}
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          </Box>

          {/* Reservation cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockReservations.map(res => (
              <Box
                key={res.id}
                sx={{
                  background: '#fff',
                  border: `1px solid ${outlineVariant}`,
                  borderRadius: '16px',
                  display: 'flex',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: '0 4px 16px rgba(0,104,116,0.12)' },
                }}
              >
                {/* Thumbnail */}
                <Box sx={{ width: 180, flexShrink: 0 }}>
                  <Box sx={{ width: '100%', height: '100%', background: res.gradient }} />
                </Box>

                {/* Body */}
                <Box
                  sx={{
                    flex: 1,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: primary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {res.hotelType}
                    </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: onSurface }}>
                      {res.hotelName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                      <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
                        {res.location}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Dates */}
                  <Box sx={{ display: 'flex', gap: '24px', mt: '4px' }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: primary,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {t('myReservations.card.checkIn')}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: onSurface }}>
                        {formatDate(res.checkIn, 'mediumWithDay')}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
                        Check-in{' '}
                        {new Date(res.checkIn).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: primary,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {t('myReservations.card.checkOut')}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: onSurface }}>
                        {formatDate(res.checkOut, 'mediumWithDay')}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
                        Check-out{' '}
                        {new Date(res.checkOut).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: primary,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {t('myReservations.card.duration')}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: onSurface }}>
                        {res.nights} {t('myReservations.card.nights')}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
                        {res.guests}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Room meta */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', mt: '4px' }}>
                    <BedIcon sx={{ fontSize: 15, color: onSurfaceVariant }} />
                    <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
                      {res.room}
                    </Typography>
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '6px',
                    }}
                  >
                    <StatusChip status={res.status} />
                    <Typography sx={{ fontSize: 11, color: onSurfaceVariant }}>
                      {res.code}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 11, color: onSurfaceVariant }}>
                      {t('myReservations.card.totalPaid')}
                    </Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 700, color: primary }}>
                      {formatPrice(res.totalPriceCop)}
                    </Typography>
                  </Box>

                  <PrimaryPillButton
                    component={Link}
                    to={`/reservations/${res.id}`}
                    pillSize="xs"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t('myReservations.card.viewDetail')}
                  </PrimaryPillButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </TravelerLayout>
  );
};

export default MyReservationsPage;
