import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import CheckoutLayout from '../../design-system/layouts/CheckoutLayout';
import SectionCard from '../../design-system/components/SectionCard';
import InfoGrid from '../../design-system/components/InfoGrid';
import RatingBadge from '../../design-system/components/RatingBadge';
import { palette } from '../../design-system/theme/palette';

export default function CartPage() {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  const CartSidebar = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
        {t('cart.sidebar.title')}
      </Typography>

      {/* Price breakdown */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {`${formatPrice(480000)} x 5 ${t('cart.sidebar.nightsLabel')}`}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>{formatPrice(2400000)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {t('cart.sidebar.tourismTax')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>{formatPrice(96000)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>{t('cart.sidebar.vat')}</Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>{formatPrice(168000)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {t('cart.sidebar.serviceFee')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>{formatPrice(0)}</Typography>
        </Box>
        <Box sx={{ height: 1, backgroundColor: palette.outlineVariant }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
            {t('cart.sidebar.totalToPay')}
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: palette.primary }}>
            {formatPrice(2664000)}
          </Typography>
        </Box>
      </Box>

      {/* Continue button */}
      <Link to="/checkout/payment" style={{ textDecoration: 'none' }}>
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
          {t('cart.sidebar.continueToPayment')}
        </Button>
      </Link>

      {/* Secure note */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
        <LockIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
          {t('cart.sidebar.securePayment')}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <CheckoutLayout currentStep={2} sidebar={<CartSidebar />}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Hotel Summary */}
        <SectionCard
          icon={<HotelIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('cart.accommodation.title')}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Hotel info row */}
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 120,
                  height: 90,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #003740, #006874)',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: palette.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {t('cart.accommodation.hotelType')}
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
                  Hotel Santa Clara Sofitel
                </Typography>
                <Box
                  sx={{
                    fontSize: 13,
                    color: palette.onSurfaceVariant,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <PlaceIcon sx={{ fontSize: 14 }} />
                  Centro Historico, Cartagena
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RatingBadge rating={4.8} />
                  <Typography sx={{ color: palette.star, fontSize: 13 }}>★★★★★</Typography>
                  <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                    312 {t('cart.accommodation.reviews')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Date/duration info */}
            <InfoGrid
              columns={3}
              items={[
                { label: t('cart.accommodation.checkIn'), value: t('cart.accommodation.checkInDate'), sub: t('cart.accommodation.checkInSub') },
                { label: t('cart.accommodation.checkOut'), value: t('cart.accommodation.checkOutDate'), sub: t('cart.accommodation.checkOutSub') },
                { label: t('cart.accommodation.duration'), value: t('cart.accommodation.durationValue'), sub: t('cart.accommodation.durationSub') },
              ]}
            />

            {/* Room row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: palette.background,
                borderRadius: '12px',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #006874, #4A9FAA)',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface }}>
                  {t('cart.accommodation.roomName')}
                </Typography>
                <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant }}>
                  {t('cart.accommodation.roomFeatures')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.primary }}>
                  {formatPrice(480000)}
                </Typography>
                <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                  {t('cart.accommodation.perNight')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </SectionCard>

        {/* Guest Info */}
        <SectionCard
          icon={<PersonIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('cart.guest.title')}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: '#fff',
              border: `1px solid ${palette.outlineVariant}`,
              borderRadius: '12px',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: palette.secondaryContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 600,
                color: palette.primary,
                flexShrink: 0,
              }}
            >
              C
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
                Carlos Martinez
              </Typography>
              <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
                carlos.martinez@email.com · +57 310 000 0000
              </Typography>
            </Box>
          </Box>
        </SectionCard>

        {/* Cancellation Policy */}
        <SectionCard
          icon={<PolicyIcon sx={{ color: palette.primary, fontSize: 20 }} />}
          title={t('cart.cancellation.title')}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircleIcon sx={{ color: '#1A6B4F', fontSize: 18 }} />
              <Typography sx={{ fontSize: 13, color: palette.onSurface }} dangerouslySetInnerHTML={{ __html: t('cart.cancellation.free') }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <InfoIcon sx={{ color: '#F4A020', fontSize: 18 }} />
              <Typography sx={{ fontSize: 13, color: palette.onSurface }} dangerouslySetInnerHTML={{ __html: t('cart.cancellation.halfCharge') }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CancelIcon sx={{ color: '#B5451B', fontSize: 18 }} />
              <Typography sx={{ fontSize: 13, color: palette.onSurface }} dangerouslySetInnerHTML={{ __html: t('cart.cancellation.noRefund') }} />
            </Box>
          </Box>
        </SectionCard>
      </Box>
    </CheckoutLayout>
  );
}
