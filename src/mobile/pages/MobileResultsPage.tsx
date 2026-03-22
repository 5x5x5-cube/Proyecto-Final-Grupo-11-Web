import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';
import StarIcon from '@mui/icons-material/Star';
import MobileShell from '../components/MobileShell';
import FilterChip from '../../design-system/components/FilterChip';
import { palette } from '../../design-system/theme/palette';
import { mockHotels } from '../../travelers/data/mockHotels';
import { useLocale } from '../../contexts/LocaleContext';

export default function MobileResultsPage() {
  const { t } = useTranslation('mobile');
  const { formatPrice } = useLocale();

  return (
    <MobileShell activeTab="search">
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          borderBottom: `1px solid ${palette.outlineVariant}`,
          background: '#fff',
        }}
      >
        <Box component={Link} to="/mobile/search" sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
          Cartagena · 15-20 mar · 2
        </Typography>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          px: '16px',
          py: '10px',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <FilterChip label={t('results.filterPrice')} />
        <FilterChip label={t('results.filterType')} />
        <FilterChip label={t('results.filterRating')} selected />
        <FilterChip label={t('results.filterServices')} />
        <Box sx={{ display: 'flex', alignItems: 'center', pl: '4px' }}>
          <SortIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
        </Box>
      </Box>

      {/* Results count */}
      <Box sx={{ px: '16px', pb: '8px' }}>
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
          {t('results.propertiesFound', { count: mockHotels.length })}
        </Typography>
      </Box>

      {/* Hotel Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px', px: '16px', pb: '20px' }}>
        {mockHotels.map((hotel) => (
          <Box
            key={hotel.id}
            component={Link}
            to={`/mobile/property/${hotel.id}`}
            sx={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              textDecoration: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {/* Image */}
            <Box
              sx={{
                height: 140,
                background: hotel.gradient,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                p: '10px',
              }}
            >
              <Box
                sx={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '6px',
                  px: '8px',
                  py: '2px',
                }}
              >
                <Typography sx={{ color: '#fff', fontSize: 11 }}>{hotel.type}</Typography>
              </Box>
              <Box
                sx={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '6px',
                  px: '8px',
                  py: '2px',
                }}
              >
                <Typography sx={{ color: '#fff', fontSize: 11 }}>{t('results.photos', { count: hotel.photoCount })}</Typography>
              </Box>
            </Box>

            {/* Info */}
            <Box sx={{ p: '14px' }}>
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '2px' }}>
                {hotel.name}
              </Typography>
              <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, mb: '8px' }}>
                {hotel.location}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <StarIcon sx={{ fontSize: 14, color: palette.star }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>
                    {hotel.rating}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>
                    ({hotel.reviewCount})
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.primary, whiteSpace: 'nowrap' }}>
                    {formatPrice(hotel.pricePerNight)}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>{t('results.perNight')}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </MobileShell>
  );
}
