import { CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
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
  ContinueButton,
  SecureNote,
  SecureText,
} from './CartSidebar.styles';

interface Props {
  cart: Cart;
  isPending: boolean;
  onContinue: () => void;
}

export default function CartSidebar({ cart, isPending, onContinue }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  return (
    <SidebarContainer>
      <SidebarTitle>{t('cart.sidebar.title')}</SidebarTitle>

      <BreakdownList>
        <BreakdownRow>
          <BreakdownLabel>
            {`${formatPrice(cart.pricePerNight)} x ${cart.nights} ${t('cart.sidebar.nightsLabel')}`}
          </BreakdownLabel>
          <BreakdownValue>{formatPrice(cart.subtotal)}</BreakdownValue>
        </BreakdownRow>
        {cart.vat != null && (
          <BreakdownRow>
            <BreakdownLabel>{t('cart.sidebar.vat')}</BreakdownLabel>
            <BreakdownValue>{formatPrice(cart.vat)}</BreakdownValue>
          </BreakdownRow>
        )}
        {cart.serviceFee != null && (
          <BreakdownRow>
            <BreakdownLabel>{t('cart.sidebar.serviceFee')}</BreakdownLabel>
            <BreakdownValue>{formatPrice(cart.serviceFee)}</BreakdownValue>
          </BreakdownRow>
        )}
        <Divider />
        <BreakdownRow>
          <TotalLabel>{t('cart.sidebar.totalToPay')}</TotalLabel>
          <TotalValue>{formatPrice(cart.total)}</TotalValue>
        </BreakdownRow>
      </BreakdownList>

      <ContinueButton
        variant="contained"
        disableElevation
        fullWidth
        onClick={onContinue}
        disabled={isPending}
      >
        {isPending ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : (
          t('cart.sidebar.continueToPayment')
        )}
      </ContinueButton>

      <SecureNote>
        <LockIcon sx={{ fontSize: 15, color: palette.primary }} />
        <SecureText>{t('cart.sidebar.securePayment')}</SecureText>
      </SecureNote>
    </SidebarContainer>
  );
}
