import { CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import type { CartPriceBreakdown } from '../../types';
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
  priceBreakdown: CartPriceBreakdown;
  isPending: boolean;
  onContinue: () => void;
}

export default function CartSidebar({ priceBreakdown, isPending, onContinue }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  return (
    <SidebarContainer>
      <SidebarTitle>{t('cart.sidebar.title')}</SidebarTitle>

      <BreakdownList>
        <BreakdownRow>
          <BreakdownLabel>
            {`${formatPrice(priceBreakdown.pricePerNight)} x ${priceBreakdown.nights} ${t('cart.sidebar.nightsLabel')}`}
          </BreakdownLabel>
          <BreakdownValue>{formatPrice(priceBreakdown.basePrice)}</BreakdownValue>
        </BreakdownRow>
        <BreakdownRow>
          <BreakdownLabel>{t('cart.sidebar.vat')}</BreakdownLabel>
          <BreakdownValue>{formatPrice(priceBreakdown.vat)}</BreakdownValue>
        </BreakdownRow>
        <BreakdownRow>
          <BreakdownLabel>{t('cart.sidebar.serviceFee')}</BreakdownLabel>
          <BreakdownValue>{formatPrice(priceBreakdown.serviceFee)}</BreakdownValue>
        </BreakdownRow>
        <Divider />
        <BreakdownRow>
          <TotalLabel>{t('cart.sidebar.totalToPay')}</TotalLabel>
          <TotalValue>{formatPrice(priceBreakdown.totalPrice)}</TotalValue>
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
