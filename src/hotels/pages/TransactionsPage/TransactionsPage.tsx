import { useTranslation } from 'react-i18next';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import Text from '@/design-system/components/Text';
import { SectionCard, EmptyState } from './TransactionsPage.styles';

/**
 * Admin transactions monitoring page (HU4.4).
 *
 * This commit lands the scaffold only — sidebar entry, route guard, page
 * shell. The summary cards, filterable table, detail panel and CSV export
 * follow in subsequent commits.
 */
export default function TransactionsPage() {
  const { t } = useTranslation('hotels');

  return (
    <HotelAdminLayout
      activeNav="transacciones"
      title={t('transactions.title')}
      subtitle={t('transactions.subtitle')}
    >
      <SectionCard>
        <EmptyState>
          <Text textVariant="body">{t('transactions.empty')}</Text>
        </EmptyState>
      </SectionCard>
    </HotelAdminLayout>
  );
}
