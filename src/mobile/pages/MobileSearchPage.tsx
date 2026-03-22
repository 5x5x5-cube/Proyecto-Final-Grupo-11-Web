import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MobileShell from '../components/MobileShell';
import Brand from '../../design-system/components/Brand';
import { palette } from '../../design-system/theme/palette';
import { mockDestinations } from '../../travelers/data/mockDestinations';

export default function MobileSearchPage() {
  const { t } = useTranslation('mobile');

  return (
    <MobileShell activeTab="search">
      {/* Brand */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '12px', pb: '8px' }}>
        <Brand size={20} variant="nav" />
      </Box>

      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
          borderRadius: '0 0 24px 24px',
          px: '20px',
          pt: '24px',
          pb: '28px',
        }}
      >
        <Typography sx={{ color: '#fff', fontSize: 26, fontWeight: 700, lineHeight: 1.2, mb: '4px' }}>
          {t('search.heroLine1')}
        </Typography>
        <Typography sx={{ color: '#fff', fontSize: 26, fontWeight: 700, lineHeight: 1.2, mb: '16px' }}>
          {t('search.heroLine2')}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, mb: '20px' }}>
          {t('search.heroSubtitle')}
        </Typography>

        {/* Search Form */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Destination */}
          <Box sx={fieldSx}>
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>Cartagena, Colombia</Typography>
          </Box>

          {/* Dates row */}
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box sx={{ ...fieldSx, flex: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>15 mar</Typography>
            </Box>
            <Box sx={{ ...fieldSx, flex: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>20 mar</Typography>
            </Box>
          </Box>

          {/* Guests */}
          <Box sx={fieldSx}>
            <PersonOutlineIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{t('search.guests', { count: 2 })}</Typography>
          </Box>

          {/* Search Button */}
          <Box
            component={Link}
            to="/mobile/results"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: palette.primaryContainer,
              color: palette.onPrimaryContainer,
              borderRadius: '12px',
              py: '14px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            <SearchIcon sx={{ fontSize: 18 }} />
            {t('search.searchButton')}
          </Box>
        </Box>
      </Box>

      {/* Popular Destinations */}
      <Box sx={{ px: '20px', pt: '24px', pb: '16px' }}>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: palette.onSurface, mb: '14px' }}>
          {t('search.popularDestinations')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            pb: '4px',
            mx: '-20px',
            px: '20px',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {mockDestinations.map((dest) => (
            <Box
              key={dest.name}
              sx={{
                minWidth: 130,
                height: 100,
                borderRadius: '14px',
                background: dest.gradient,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: '12px',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{dest.name}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>
                {t('search.hotels', { count: dest.hotelCount })}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </MobileShell>
  );
}

const fieldSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#fff',
  borderRadius: '12px',
  px: '14px',
  py: '12px',
};
