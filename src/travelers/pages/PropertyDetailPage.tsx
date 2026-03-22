import { Box, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import TravelerLayout from '../../design-system/layouts/TravelerLayout';
import RatingBadge from '../../design-system/components/RatingBadge';
import { palette } from '../../design-system/theme/palette';

const reviews = [
  {
    initial: 'M',
    name: 'Maria Gonzalez',
    date: 'Febrero 2026',
    stars: 5,
    text: '"Experiencia increible. El personal fue amabilisimo y las instalaciones son impecables. Sin duda regresare."',
  },
  {
    initial: 'J',
    name: 'Juan Perez',
    date: 'Enero 2026',
    stars: 5,
    text: '"La ubicacion es perfecta, en pleno centro historico. El desayuno fue excelente y la piscina una delicia."',
  },
  {
    initial: 'A',
    name: 'Andrea Rios',
    date: 'Enero 2026',
    stars: 4,
    text: '"Muy buena experiencia en general. Las habitaciones son hermosas y el spa es de primera. Recomendado."',
  },
];

export default function PropertyDetailPage() {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  const amenities = [
    { icon: <WifiIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.freeWifi') },
    { icon: <PoolIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.pool') },
    { icon: <FreeBreakfastIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.breakfastIncluded') },
    { icon: <SpaIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.spaWellness') },
    { icon: <FitnessCenterIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.gym') },
    { icon: <LocalParkingIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.parking') },
    { icon: <AcUnitIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.airConditioning') },
    { icon: <RestaurantIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.restaurant') },
    { icon: <LocalBarIcon sx={{ fontSize: 16, color: palette.primary }} />, label: t('propertyDetail.amenities.bar') },
  ];

  const rooms = [
    {
      name: t('propertyDetail.rooms.superiorRoom'),
      features: t('propertyDetail.rooms.superiorFeatures'),
      price: formatPrice(480000),
      gradient: 'linear-gradient(135deg, #006874, #4A9FAA)',
      active: true,
    },
    {
      name: t('propertyDetail.rooms.juniorSuite'),
      features: t('propertyDetail.rooms.juniorFeatures'),
      price: formatPrice(680000),
      gradient: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
      active: false,
    },
  ];

  const BookingSidebar = () => (
    <Box sx={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Price card */}
      <Box
        sx={{
          backgroundColor: palette.background,
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Price */}
        <Box>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>{t('propertyDetail.booking.from')}</Typography>
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: palette.primary }}>
            {formatPrice(480000)}{' '}
            <Typography component="span" sx={{ fontSize: 16, fontWeight: 400, color: palette.onSurfaceVariant }}>
              {t('propertyDetail.booking.perNight')}
            </Typography>
          </Typography>
        </Box>

        {/* Date fields */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <Box
            sx={{
              border: `1px solid ${palette.outline}`,
              borderRadius: '8px',
              padding: '10px 14px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '2px',
              }}
            >
              {t('propertyDetail.booking.checkIn')}
            </Typography>
            <Typography sx={{ fontSize: 14, color: palette.onSurface }}>Sab, 15 mar</Typography>
          </Box>
          <Box
            sx={{
              border: `1px solid ${palette.outline}`,
              borderRadius: '8px',
              padding: '10px 14px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '2px',
              }}
            >
              {t('propertyDetail.booking.checkOut')}
            </Typography>
            <Typography sx={{ fontSize: 14, color: palette.onSurface }}>Jue, 20 mar</Typography>
          </Box>
        </Box>

        {/* Guests */}
        <Box
          sx={{
            border: `1px solid ${palette.outline}`,
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '2px',
              }}
            >
              {t('propertyDetail.booking.guests')}
            </Typography>
            <Typography sx={{ fontSize: 14, color: palette.onSurface }}>{t('propertyDetail.booking.defaultGuests')}</Typography>
          </Box>
          <ExpandMoreIcon sx={{ color: palette.onSurfaceVariant, fontSize: 20 }} />
        </Box>

        {/* Price breakdown */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: palette.onSurfaceVariant }}>
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{formatPrice(480000)} x 5 {t('propertyDetail.booking.nights')}</Typography>
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{formatPrice(2400000)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: palette.onSurfaceVariant }}>
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{t('propertyDetail.booking.taxesAndFees')}</Typography>
            <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{formatPrice(264000)}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
              color: palette.onSurface,
              borderTop: `1px solid ${palette.outlineVariant}`,
              pt: '10px',
              mt: '4px',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>{t('propertyDetail.booking.total')}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: palette.onSurface }}>{formatPrice(2664000)}</Typography>
          </Box>
        </Box>

        {/* Reserve button */}
        <Link to="/checkout/cart" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            sx={{
              height: 52,
              backgroundColor: palette.primary,
              borderRadius: '100px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              textTransform: 'none',
              '&:hover': { backgroundColor: palette.primary },
            }}
          >
            {t('propertyDetail.booking.reserveNow')}
          </Button>
        </Link>

        {/* Secure badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            justifyContent: 'center',
          }}
        >
          <LockIcon sx={{ fontSize: 16, color: palette.primary }} />
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
            {t('propertyDetail.booking.securePayment')}
          </Typography>
        </Box>
      </Box>

      {/* Cancellation policy */}
      <Box>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
          {t('propertyDetail.cancellation.title')}
        </Typography>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircleIcon sx={{ color: '#1A6B4F', fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, color: palette.onSurface }}>
              {t('propertyDetail.cancellation.freeCancellation')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoIcon sx={{ color: palette.star, fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
              {t('propertyDetail.cancellation.halfCharge')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CancelIcon sx={{ color: '#B5451B', fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
              {t('propertyDetail.cancellation.noRefund')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <TravelerLayout
      variant="detail"
      sidebar={<BookingSidebar />}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Gallery */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '260px 130px',
            gap: '8px',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              gridColumn: '1 / 2',
              gridRow: '1 / 3',
              background: 'linear-gradient(135deg, #003740, #006874)',
            }}
          />
          <Box sx={{ background: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)' }} />
          <Box sx={{ background: 'linear-gradient(135deg, #5B5EA6, #8E91CC)' }} />
          <Box sx={{ background: 'linear-gradient(135deg, #B5451B, #E07050)' }} />
          <Box
            sx={{
              background: 'linear-gradient(135deg, #7B4F00, #C89030)',
              position: 'relative',
              '&::after': {
                content: `"${t('propertyDetail.morePhotos')}"`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          />
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {t('propertyDetail.hotelType')}
            </Typography>
            <Typography
              component="h1"
              sx={{ fontSize: 30, fontWeight: 700, color: palette.onSurface }}
            >
              Hotel Santa Clara Sofitel
            </Typography>
            <Box
              sx={{
                fontSize: 15,
                color: palette.onSurfaceVariant,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <PlaceIcon sx={{ fontSize: 16 }} />
              Centro Historico, Cartagena, Colombia
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RatingBadge rating={4.8} />
              <Typography sx={{ color: palette.star, fontSize: 16 }}>★★★★★</Typography>
              <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                312 {t('propertyDetail.reviews')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: `1px solid ${palette.outlineVariant}`,
                backgroundColor: '#fff',
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
            </IconButton>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: `1px solid ${palette.outlineVariant}`,
                backgroundColor: '#fff',
              }}
            >
              <ShareIcon sx={{ fontSize: 20, color: palette.onSurfaceVariant }} />
            </IconButton>
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('propertyDetail.description')}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: palette.onSurfaceVariant,
              lineHeight: 1.6,
              maxWidth: 860,
            }}
          >
            {t('propertyDetail.descriptionText')}
          </Typography>
        </Box>

        {/* Amenities */}
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('propertyDetail.amenities.title')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {amenities.map((amenity) => (
              <Box
                key={amenity.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '100px',
                  fontSize: 13,
                  color: palette.onSurfaceVariant,
                  backgroundColor: '#fff',
                }}
              >
                {amenity.icon}
                {amenity.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Rooms */}
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('propertyDetail.rooms.title')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rooms.map((room) => (
              <Box
                key={room.name}
                sx={{
                  backgroundColor: '#fff',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '10px',
                    flexShrink: 0,
                    background: room.gradient,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, mb: '4px' }}>
                    {room.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                    {room.features}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: palette.primary }}>
                    {room.price}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    {t('propertyDetail.rooms.perNight')}
                  </Typography>
                </Box>
                <Button
                  variant={room.active ? 'contained' : 'outlined'}
                  disableElevation
                  sx={{
                    height: 36,
                    px: '20px',
                    borderRadius: '100px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    ...(room.active
                      ? {
                          backgroundColor: palette.primary,
                          color: '#fff',
                          '&:hover': { backgroundColor: palette.primary },
                        }
                      : {
                          borderColor: palette.primary,
                          color: palette.primary,
                        }),
                  }}
                >
                  {t('propertyDetail.rooms.select')}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Reviews */}
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface, mb: '12px' }}>
            {t('propertyDetail.guestReviews')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px', overflow: 'hidden' }}>
            {reviews.map((review) => (
              <Box
                key={review.name}
                sx={{
                  flex: 1,
                  backgroundColor: '#fff',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: palette.secondaryContainer,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: palette.primary,
                    }}
                  >
                    {review.initial}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
                      {review.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: palette.star, fontSize: 13 }}>
                  {'★'.repeat(review.stars)}
                  {'☆'.repeat(5 - review.stars)}
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: palette.onSurfaceVariant, lineHeight: 1.5 }}
                >
                  {review.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </TravelerLayout>
  );
}
