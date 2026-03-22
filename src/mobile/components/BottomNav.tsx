import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { palette } from '../../design-system/theme/palette';

export default function BottomNav({ active }: { active: string }) {
  const { t } = useTranslation('common');

  const tabs = [
    { key: 'search', label: t('bottomNav.search'), icon: SearchIcon, to: '/mobile/search' },
    { key: 'reservations', label: t('bottomNav.myReservations'), icon: EventNoteIcon, to: '/mobile/reservations' },
    { key: 'profile', label: t('bottomNav.profile'), icon: PersonOutlineIcon, to: '/mobile/profile' },
  ] as const;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        background: '#fff',
        borderTop: `1px solid ${palette.outlineVariant}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <Box
            key={tab.key}
            component={Link}
            to={tab.to}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              textDecoration: 'none',
              flex: 1,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 28,
                borderRadius: '100px',
                background: isActive ? palette.primaryContainer : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon sx={{ fontSize: 20, color: isActive ? palette.primary : palette.onSurfaceVariant }} />
            </Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? palette.primary : palette.onSurfaceVariant,
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
