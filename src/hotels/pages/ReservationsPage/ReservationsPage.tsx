import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHotel } from '@/contexts/HotelContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';
import { useHotelBookings } from '@/api/hooks/useHotelBookings';
import ReservationFilterBar from '@/hotels/components/ReservationFilterBar/ReservationFilterBar';
import ReservationTable from '@/hotels/components/ReservationTable/ReservationTable';
import ReservationsPageSkeleton from './ReservationsPage.skeleton';
import { SummaryRow, SummaryPill, SummaryCount } from './ReservationsPage.styles';

const ITEMS_PER_PAGE = 10;

export default function ReservationsPage() {
  const { t } = useTranslation('hotels');
  const { hotel } = useHotel();

  const [activeStatus, setActiveStatus] = useState<string>('');
  const [searchCode, setSearchCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useHotelBookings({
    status: activeStatus || undefined,
    code: searchCode || undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchCode(value);
    setCurrentPage(1);
  };

  if (isLoading || !data) {
    return (
      <HotelAdminLayout activeNav="reservas" title={t('reservations.title')} subtitle={hotel.name}>
        <ReservationsPageSkeleton />
      </HotelAdminLayout>
    );
  }

  const { reservations, summary, total } = data as any;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  return (
    <HotelAdminLayout activeNav="reservas" title={t('reservations.title')} subtitle={hotel.name}>
      <ReservationFilterBar
        activeStatus={activeStatus}
        searchCode={searchCode}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearch}
        onClear={() => {
          handleStatusChange('');
          setSearchCode('');
        }}
      />

      <SummaryRow>
        <SummaryPill>
          <SummaryCount>{summary.total}</SummaryCount>
          {t('reservations.total')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.successContainer}
          pillBorder={palette.successContainer}
          pillColor={palette.success}
        >
          <SummaryCount>{summary.confirmed}</SummaryCount>
          {t('reservations.confirmed')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.warningContainer}
          pillBorder={palette.warningContainer}
          pillColor={palette.warning}
        >
          <SummaryCount>{summary.pending}</SummaryCount>
          {t('reservations.pending')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.errorContainer}
          pillBorder={palette.errorContainer}
          pillColor={palette.error}
        >
          <SummaryCount>{summary.cancelled}</SummaryCount>
          {t('reservations.cancelled')}
        </SummaryPill>
        <Text textVariant="hint" sx={{ marginLeft: 'auto' }}>
          {t('reservations.showing', {
            from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
            to: Math.min(currentPage * ITEMS_PER_PAGE, total),
            total,
          })}
        </Text>
      </SummaryRow>

      <ReservationTable
        reservations={reservations}
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </HotelAdminLayout>
  );
}
