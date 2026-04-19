import { CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import type { CartPricing, NormalizedCart } from '../../types';
import {
  SidebarContainer,
  SidebarTitle,
  BookingMiniCard,
  BookingThumbnail,
  PriceBreakdownList,
  PriceRow,
  PriceRowValue,
  Divider,
  TotalPrice,
  SecureNote,
} from './PaymentSidebar.styles';

interface Props {
  cart: NormalizedCart | undefined;
  pricing: CartPricing;
  isFormValid: boolean;
  isProcessing: boolean;
  onPay: () => void;
}

export default function PaymentSidebar({ cart, pricing, isFormValid, isProcessing, onPay }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate } = useLocale();

  const { pricePerNight, nights, subtotal, taxes, total } = pricing;

  return (
    <SidebarContainer>
      <SidebarTitle>{t('payment.sidebar.title')}</SidebarTitle>

      <BookingMiniCard>
        <BookingThumbnail />
        <div>
          <Text textVariant="bodySemibold" sx={{ mb: '4px' }}>
            {cart?.hotelName || '...'}
          </Text>
          <Text textVariant="caption" sx={{ mb: '2px' }}>
            {cart?.checkIn && cart?.checkOut
              ? `${formatDate(cart.checkIn, 'short')} – ${formatDate(cart.checkOut, 'medium')} · ${nights} ${t('payment.sidebar.nightsLabel')}`
              : '...'}
          </Text>
          <Text textVariant="caption">
            {cart?.roomName
              ? `${cart.roomName} · ${cart.guests} adultos`
              : t('payment.sidebar.room')}
          </Text>
        </div>
      </BookingMiniCard>

      <PriceBreakdownList>
        <PriceRow>
          <Text textVariant="body">
            {`${formatPrice(pricePerNight)} x ${nights} ${t('payment.sidebar.nightsLabel')}`}
          </Text>
          <PriceRowValue>{formatPrice(subtotal)}</PriceRowValue>
        </PriceRow>
        {taxes > 0 && (
          <PriceRow>
            <Text textVariant="body">{t('payment.sidebar.taxesAndFees')}</Text>
            <PriceRowValue>{formatPrice(taxes)}</PriceRowValue>
          </PriceRow>
        )}
        <Divider />
        <PriceRow>
          <Text textVariant="panelTitle">{t('payment.sidebar.totalToPay')}</Text>
          <TotalPrice>{formatPrice(total)}</TotalPrice>
        </PriceRow>
      </PriceBreakdownList>

      <PrimaryPillButton
        fullWidth
        pillSize="lg"
        disabled={!isFormValid || isProcessing}
        onClick={onPay}
        sx={{ height: 56, display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {isProcessing ? (
          <CircularProgress size={20} sx={{ color: '#fff' }} />
        ) : (
          <>
            <LockIcon sx={{ fontSize: 20 }} />
            {`${t('payment.sidebar.payLabel')} ${formatPrice(total)}`}
          </>
        )}
      </PrimaryPillButton>

      <SecureNote>
        <VerifiedUserIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Text textVariant="caption">{t('payment.sidebar.secureTransaction')}</Text>
      </SecureNote>
    </SidebarContainer>
  );
}
