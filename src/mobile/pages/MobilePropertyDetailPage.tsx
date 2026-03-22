import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MobileShell from '../components/MobileShell';
import AmenityTag from '../../design-system/components/AmenityTag';
import { palette } from '../../design-system/theme/palette';
import { mockHotels } from '../../travelers/data/mockHotels';

export default function MobilePropertyDetailPage() {
  const { t } = useTranslation('mobile');
  const { formatPrice } = useLocale();
  const { id } = useParams();
  const hotel = mockHotels.find((h) => h.id === Number(id)) || mockHotels[0];

  const rooms = [
    { name: t('propertyDetail.rooms.superior'), bed: t('propertyDetail.rooms.bedKing'), price: formatPrice(480000), perNight: true },
    { name: t('propertyDetail.rooms.double'), bed: t('propertyDetail.rooms.bedDouble'), price: formatPrice(520000), perNight: true },
    { name: t('propertyDetail.rooms.juniorSuite'), bed: t('propertyDetail.rooms.bedKingSuite'), price: formatPrice(720000), perNight: true },
  ];

  const reviews = [
    { name: 'Maria G.', rating: 5, text: t('propertyDetail.reviewTexts.review1') },
    { name: 'Carlos M.', rating: 4, text: t('propertyDetail.reviewTexts.review2') },
    { name: 'Ana L.', rating: 5, text: t('propertyDetail.reviewTexts.review3') },
  ];

  return (
    <MobileShell hideNav>
      {/* Hero Image */}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 200,
            background: hotel.gradient,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            p: '12px',
          }}
        >
          <Box
            sx={{
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '8px',
              px: '10px',
              py: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <PhotoLibraryIcon sx={{ fontSize: 14, color: '#fff' }} />
            <Typography sx={{ color: '#fff', fontSize: 12 }}>{t('propertyDetail.photos', { count: hotel.photoCount })}</Typography>
          </Box>
        </Box>

        {/* Back button */}
        <Box
          component={Link}
          to="/mobile/results"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: '16px', pt: '16px', pb: '90px' }}>
        {/* Header */}
        <Box sx={{ mb: '4px' }}>
          <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>
            {hotel.type}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.onSurface, mb: '4px' }}>
          {hotel.name}
        </Typography>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, mb: '8px' }}>
          {hotel.location}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mb: '16px' }}>
          <Box
            sx={{
              background: palette.primary,
              color: '#fff',
              borderRadius: '6px',
              px: '8px',
              py: '2px',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {hotel.rating}
          </Box>
          <StarIcon sx={{ fontSize: 14, color: palette.star }} />
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
            {t('propertyDetail.reviews', { count: hotel.reviewCount })}
          </Typography>
        </Box>

        {/* Description */}
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, lineHeight: 1.6, mb: '20px' }}>
          {t('propertyDetail.description')}
        </Typography>

        {/* Amenities */}
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '10px' }}>
          {t('propertyDetail.includedServices')}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px', mb: '24px' }}>
          {hotel.amenities.map((a) => (
            <AmenityTag key={a.label} icon={a.icon} label={a.label} />
          ))}
        </Box>

        {/* Rooms */}
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '10px' }}>
          {t('propertyDetail.availableRooms')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: '24px' }}>
          {rooms.map((room) => (
            <Box
              key={room.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: '12px',
                border: `1px solid ${palette.outlineVariant}`,
                p: '12px',
                gap: '12px',
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '8px',
                  background: hotel.gradient,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>{room.name}</Typography>
                <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>{room.bed}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: palette.primary }}>{room.price}</Typography>
                <Typography sx={{ fontSize: 10, color: palette.onSurfaceVariant }}>{t('propertyDetail.perNight')}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '10px' }}>
          {t('propertyDetail.guestReviews')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            mx: '-16px',
            px: '16px',
            pb: '4px',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {reviews.map((r) => (
            <Box
              key={r.name}
              sx={{
                minWidth: 220,
                background: '#fff',
                borderRadius: '12px',
                border: `1px solid ${palette.outlineVariant}`,
                p: '12px',
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mb: '6px' }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: palette.primaryContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    color: palette.primary,
                  }}
                >
                  {r.name[0]}
                </Box>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: palette.onSurface }}>{r.name}</Typography>
                <Box sx={{ display: 'flex', ml: 'auto', gap: '1px' }}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 12, color: palette.star }} />
                  ))}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, lineHeight: 1.5 }}>
                {r.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Sticky Bottom Bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: `1px solid ${palette.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '16px',
          py: '12px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.primary }}>
            {formatPrice(hotel.pricePerNight)}
          </Typography>
          <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>{t('propertyDetail.perNight')}</Typography>
        </Box>
        <Box
          component={Link}
          to="/mobile/checkout"
          sx={{
            background: palette.primary,
            color: '#fff',
            borderRadius: '12px',
            px: '24px',
            py: '12px',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {t('propertyDetail.bookNow')}
        </Box>
      </Box>
    </MobileShell>
  );
}
