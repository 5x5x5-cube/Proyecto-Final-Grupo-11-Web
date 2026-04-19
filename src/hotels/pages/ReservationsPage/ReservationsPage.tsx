import { useState } from 'react';
import { Box } from '@mui/material';
import { NeutralPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import { useHotel } from '@/contexts/HotelContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import StatusChip from '@/design-system/components/StatusChip';
import SearchField from '@/design-system/components/SearchField';
import FilterChip from '@/design-system/components/FilterChip';
import { palette } from '@/design-system/theme/palette';
import { useHotelBookings } from '@/api/hooks/useHotelBookings';
import ReservationsPageSkeleton from './ReservationsPage.skeleton';
import {
  FilterBar,
  FilterDivider,
  DateFilterPill,
  ClearFiltersLink,
  SummaryRow,
  SummaryPill,
  SummaryCount,
  TableCard,
  TableHeader,
  TableCell,
  TableRow,
  CodeBadge,
  AvatarCircle,
  TotalPrice,
  PaginationBar,
  PageButton,
  NavButton,
} from './ReservationsPage.styles';

const ITEMS_PER_PAGE = 10;

const avatarColorMap = {
  teal: palette.primaryContainer,
  green: palette.successContainer,
  amber: palette.warningContainer,
  red: palette.errorContainer,
  blue: '#E3F2FD',
} as const;

export default function ReservationsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();
  const { hotel } = useHotel();
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState<string>('');
  const [searchCode, setSearchCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useHotelBookings({
    status: activeStatus || undefined,
    code: searchCode || undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const subtitle = hotel.name;

  if (isLoading || !data) {
    return (
      <HotelAdminLayout activeNav="reservas" title={t('reservations.title')} subtitle={subtitle}>
        <ReservationsPageSkeleton />
      </HotelAdminLayout>
    );
  }

  const { reservations: hotelReservations, summary: reservationSummary, total } = data as any;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const from = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, total);

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchCode(value);
    setCurrentPage(1);
  };

  // Build page numbers: show up to 5 around current page
  const pageNumbers: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <HotelAdminLayout activeNav="reservas" title={t('reservations.title')} subtitle={subtitle}>
      {/* Filter bar */}
      <FilterBar>
        <Box sx={{ maxWidth: 340, minWidth: 200 }}>
          <SearchField
            placeholder={t('reservations.searchPlaceholder')}
            value={searchCode}
            onChange={e => handleSearch(e.target.value)}
          />
        </Box>

        <FilterDivider />

        <FilterChip
          label={t('reservations.filterAll')}
          selected={activeStatus === ''}
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
          onClick={() => handleStatusChange('')}
        />
        <FilterChip
          label={t('reservations.filterConfirmed')}
          selected={activeStatus === 'confirmed'}
          onClick={() => handleStatusChange('confirmed')}
        />
        <FilterChip
          label={t('reservations.filterPending')}
          selected={activeStatus === 'pending'}
          onClick={() => handleStatusChange('pending')}
        />
        <FilterChip
          label={t('reservations.filterCancelled')}
          selected={activeStatus === 'cancelled'}
          onClick={() => handleStatusChange('cancelled')}
        />

        <FilterDivider />

        <DateFilterPill>
          <CalendarTodayIcon sx={{ fontSize: 16, color: palette.primary }} />
          {t('reservations.allDates')}
        </DateFilterPill>

        <Box sx={{ marginLeft: 'auto', flexShrink: 0 }}>
          <ClearFiltersLink
            onClick={() => {
              handleStatusChange('');
              setSearchCode('');
            }}
          >
            {t('reservations.clearFilters')}
          </ClearFiltersLink>
        </Box>
      </FilterBar>

      {/* Summary row */}
      <SummaryRow>
        <SummaryPill>
          <SummaryCount>{reservationSummary.total}</SummaryCount>
          {t('reservations.total')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.successContainer}
          pillBorder={palette.successContainer}
          pillColor={palette.success}
        >
          <SummaryCount>{reservationSummary.confirmed}</SummaryCount>
          {t('reservations.confirmed')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.warningContainer}
          pillBorder={palette.warningContainer}
          pillColor={palette.warning}
        >
          <SummaryCount>{reservationSummary.pending}</SummaryCount>
          {t('reservations.pending')}
        </SummaryPill>
        <SummaryPill
          pillBg={palette.errorContainer}
          pillBorder={palette.errorContainer}
          pillColor={palette.error}
        >
          <SummaryCount>{reservationSummary.cancelled}</SummaryCount>
          {t('reservations.cancelled')}
        </SummaryPill>
        <Text textVariant="hint" sx={{ marginLeft: 'auto' }}>
          {t('reservations.showing', { from, to, total })}
        </Text>
      </SummaryRow>

      {/* Table card */}
      <TableCard>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              {[
                t('reservations.tableHeaders.code'),
                t('reservations.tableHeaders.guest'),
                t('reservations.tableHeaders.room'),
                t('reservations.tableHeaders.checkIn'),
                t('reservations.tableHeaders.checkOut'),
                t('reservations.tableHeaders.nights'),
                t('reservations.tableHeaders.total'),
                t('reservations.tableHeaders.status'),
                t('reservations.tableHeaders.actions'),
              ].map(col => (
                <TableHeader component="th" key={col}>
                  {col}
                </TableHeader>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {hotelReservations.map((res: any, index: number) => (
              <TableRow component="tr" key={res.id}>
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <CodeBadge>{res.code}</CodeBadge>
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AvatarCircle
                      bgColor={avatarColorMap[res.avatarColor as keyof typeof avatarColorMap]}
                    >
                      {res.initials}
                    </AvatarCircle>
                    <Box>
                      <Text textVariant="bodyMedium">{res.guest}</Text>
                      {res.email && <Text textVariant="caption">{res.email}</Text>}
                    </Box>
                  </Box>
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Text textVariant="bodyMedium">{res.room}</Text>
                  {res.roomType && <Text textVariant="caption">{res.roomType}</Text>}
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  {formatDate(res.checkIn, 'medium')}
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  {formatDate(res.checkOut, 'medium')}
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Text textVariant="hint">
                    {t('reservations.nightsCount', { count: res.nights })}
                  </Text>
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <TotalPrice>{formatPrice(res.totalCop)}</TotalPrice>
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <StatusChip status={res.status} />
                </TableCell>

                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <NeutralPillButton
                    pillSize="xxs"
                    onClick={() => navigate(`/hotel/reservations/${res.id}`)}
                  >
                    {t('reservations.viewDetail')}
                  </NeutralPillButton>
                </TableCell>
              </TableRow>
            ))}
          </Box>
        </Box>

        {/* Pagination */}
        <PaginationBar>
          <Text textVariant="hint">{t('reservations.showing', { from, to, total })}</Text>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <NavButton
              onClick={() => currentPage > 1 && setCurrentPage(p => p - 1)}
              sx={{
                opacity: currentPage === 1 ? 0.3 : 1,
                pointerEvents: currentPage === 1 ? 'none' : 'auto',
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </NavButton>
            {pageNumbers.map(page => (
              <PageButton
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageButton>
            ))}
            <NavButton
              onClick={() => currentPage < totalPages && setCurrentPage(p => p + 1)}
              sx={{
                opacity: currentPage === totalPages ? 0.3 : 1,
                pointerEvents: currentPage === totalPages ? 'none' : 'auto',
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </NavButton>
          </Box>
        </PaginationBar>
      </TableCard>
    </HotelAdminLayout>
  );
}
