import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import { PrimaryPillButton } from '@/design-system/components/PillButton';
import HoldCountdown from '../HoldCountdown/HoldCountdown';
import type { NormalizedCart } from '../../types';
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
  cart: NormalizedCart;
  onContinue: () => void;
  onHoldExpired?: () => void;
}

export default function CartSidebar({ cart, onContinue, onHoldExpired }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  const { pricePerNight, nights, subtotal, taxes, total } = cart.pricing;

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
        {taxes > 0 && (
          <BreakdownRow>
            <BreakdownLabel>{t('cart.sidebar.taxesAndFees')}</BreakdownLabel>
            <BreakdownValue>{formatPrice(taxes)}</BreakdownValue>
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
