import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import { PolicyList, PolicyRow, PolicyText } from './CancellationPolicyCard.styles';

interface Props {
  checkIn: string;
  halfChargePercent?: number;
}

function addDays(dateStr: string, days: number): Date {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d;
}

export default function CancellationPolicyCard({ checkIn, halfChargePercent = 50 }: Props) {
  const { t } = useTranslation('travelers');
  const { formatDate } = useLocale();

  const freeCancelUntil = formatDate(addDays(checkIn, -3), 'mediumWithDay');
  const halfChargeStart = formatDate(addDays(checkIn, -3), 'short');
  const halfChargeEnd = formatDate(addDays(checkIn, -1), 'short');
  const noRefundFrom = formatDate(new Date(checkIn + 'T00:00:00'), 'mediumWithDay');

  return (
    <SectionCard
      icon={<PolicyIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.cancellation.title')}
    >
      <PolicyList>
        <PolicyRow>
          <CheckCircleIcon sx={{ color: '#1A6B4F', fontSize: 18 }} />
          <PolicyText>
            {t('cart.cancellation.freeLabel')} <strong>{freeCancelUntil}</strong>
          </PolicyText>
        </PolicyRow>
        <PolicyRow>
          <InfoIcon sx={{ color: '#F4A020', fontSize: 18 }} />
          <PolicyText>
            {t('cart.cancellation.halfChargeLabel', { percent: halfChargePercent })}{' '}
            <strong>
              {halfChargeStart}–{halfChargeEnd}
            </strong>
          </PolicyText>
        </PolicyRow>
        <PolicyRow>
          <CancelIcon sx={{ color: '#B5451B', fontSize: 18 }} />
          <PolicyText>
            <strong>{t('cart.cancellation.noRefundLabel')}</strong>{' '}
            {t('cart.cancellation.fromDate', { date: noRefundFrom })}
          </PolicyText>
        </PolicyRow>
      </PolicyList>
    </SectionCard>
  );
}
