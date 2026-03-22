import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileShell from '../components/MobileShell';
import OfflineBanner from '../components/OfflineBanner';
import StatusChip from '../../design-system/components/StatusChip';
import { palette } from '../../design-system/theme/palette';
import { mockReservations } from '../../travelers/data/mockReservations';

const pastReservations = [
  {
    id: 10,
    hotelName: 'Hotel Caribe by Faranda',
    location: 'El Laguito, Cartagena',
    checkIn: 'Lun, 5 ene 2026',
    checkOut: 'Vie, 9 ene 2026',
    status: 'past' as const,
    code: 'TH-2026-31205',
    totalPrice: 'COP 1.750.000',
    gradient: 'linear-gradient(135deg, #5B5EA6, #8E91CC)',
  },
];

const cancelledReservations = [
  {
    id: 20,
    hotelName: 'Casa Quero Boutique',
    location: 'Getsemani, Cartagena',
    checkIn: 'Mar, 3 feb 2026',
    checkOut: 'Jue, 5 feb 2026',
    status: 'cancelled' as const,
    code: 'TH-2026-39102',
    totalPrice: 'COP 440.000',
    gradient: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
  },
];

type Tab = 'active' | 'past' | 'cancelled';

export default function MobileMyReservationsPage() {
  const { t } = useTranslation('mobile');
  const [tab, setTab] = useState<Tab>('active');

  const tabData: Record<Tab, typeof mockReservations> = {
    active: mockReservations,
    past: pastReservations as any,
    cancelled: cancelledReservations as any,
  };

  const currentList = tabData[tab];

  return (
    <MobileShell activeTab="reservations">
      <OfflineBanner />

      <Box sx={{ px: '16px', pt: '16px' }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.onSurface, mb: '16px' }}>
          {t('myReservations.title')}
        </Typography>

        {/* Tabs */}
        <Box sx={{ display: 'flex', gap: '0', mb: '16px', borderBottom: `2px solid ${palette.outlineVariant}` }}>
          {[
            { key: 'active' as Tab, label: t('myReservations.active'), count: 2 },
            { key: 'past' as Tab, label: t('myReservations.past'), count: 1 },
            { key: 'cancelled' as Tab, label: t('myReservations.cancelled'), count: 1 },
          ].map((tabItem) => (
            <Box
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              sx={{
                flex: 1,
                textAlign: 'center',
                pb: '10px',
                cursor: 'pointer',
                borderBottom: tab === tabItem.key ? `2px solid ${palette.primary}` : '2px solid transparent',
                mb: '-2px',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: tab === tabItem.key ? 600 : 400,
                  color: tab === tabItem.key ? palette.primary : palette.onSurfaceVariant,
                }}
              >
                {tabItem.label} ({tabItem.count})
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Reservation Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', pb: '20px' }}>
          {currentList.map((res) => (
            <Box
              key={res.id}
              component={Link}
              to={`/mobile/reservations/${res.id}`}
              sx={{
                background: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                textDecoration: 'none',
                border: `1px solid ${palette.outlineVariant}`,
              }}
            >
              {/* Image */}
              <Box sx={{ height: 100, background: res.gradient }} />

              {/* Info */}
              <Box sx={{ p: '14px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '4px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>
                    {res.hotelName}
                  </Typography>
                  <StatusChip status={res.status} />
                </Box>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '8px' }}>
                  {res.location}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    {res.checkIn} → {res.checkOut}
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.primary }}>
                    {res.totalPrice}
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: 11, color: palette.outline, mt: '6px' }}>
                  {res.code}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </MobileShell>
  );
}
