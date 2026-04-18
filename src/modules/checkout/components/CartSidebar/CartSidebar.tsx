import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import HoldCountdown from '../HoldCountdown/HoldCountdown';
import type { Cart } from '../../types';
import {
  SidebarContainer,
  SidebarTitle,
  BreakdownList,
  BreakdownRow,
  BreakdownLabel,
  BreakdownValue,
  Divider,
  TotalLabel,
  TotalValue,
  SecureNote,
  SecureText,
} from './CartSidebar.styles';

interface Props {
  cart: Cart;
  onContinue: () => void;
  onHoldExpired?: () => void;
}

export default function CartSidebar({ cart, onContinue, onHoldExpired }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  // Parse a value that might be a string decimal (e.g. "250000.00") into a number
  const num = (v: number | string | undefined | null): number => {
    if (v == null) return 0;
    return typeof v === 'string' ? parseFloat(v) || 0 : v;
  };

  // Read from priceBreakdown (backend) with fallback to top-level fields (mock)
  const pb = cart.priceBreakdown;
  const pricePerNight = num(pb?.pricePerNight ?? pb?.basePrice ?? cart.pricePerNight);
  const nights = pb?.nights ?? cart.nights ?? 0;
  const subtotal = num(pb?.subtotal ?? cart.subtotal);
  const vat = num(pb?.vat ?? cart.vat);
  const serviceFee = num(pb?.serviceFee ?? cart.serviceFee);
  const total = num(pb?.total ?? pb?.totalPrice ?? cart.total);

  return (
    <SidebarContainer>
      {cart.holdExpiresAt && onHoldExpired && (
        <HoldCountdown expiresAt={cart.holdExpiresAt} onExpired={onHoldExpired} />
      )}

      <SidebarTitle>{t('cart.sidebar.title')}</SidebarTitle>

      <BreakdownList>
        <BreakdownRow>
          <BreakdownLabel>
            {`${formatPrice(pricePerNight)} x ${nights} ${t('cart.sidebar.nightsLabel')}`}
          </BreakdownLabel>
          <BreakdownValue>{formatPrice(subtotal)}</BreakdownValue>
        </BreakdownRow>
        {vat > 0 && (
          <BreakdownRow>
            <BreakdownLabel>{t('cart.sidebar.vat')}</BreakdownLabel>
            <BreakdownValue>{formatPrice(vat)}</BreakdownValue>
          </BreakdownRow>
        )}
        {serviceFee > 0 && (
          <BreakdownRow>
            <BreakdownLabel>{t('cart.sidebar.serviceFee')}</BreakdownLabel>
            <BreakdownValue>{formatPrice(serviceFee)}</BreakdownValue>
          </BreakdownRow>
        )}
        <Divider />
        <BreakdownRow>
          <TotalLabel>{t('cart.sidebar.totalToPay')}</TotalLabel>
          <TotalValue>{formatPrice(total)}</TotalValue>
        </BreakdownRow>
      </BreakdownList>

      <PrimaryPillButton pillSize="lg" fullWidth onClick={onContinue} disabled={!cart.id}>
        {t('cart.sidebar.continueToPayment')}
      </PrimaryPillButton>

      <SecureNote>
        <LockIcon sx={{ fontSize: 15, color: palette.primary }} />
        <SecureText>{t('cart.sidebar.securePayment')}</SecureText>
      </SecureNote>
    </SidebarContainer>
  );
}
