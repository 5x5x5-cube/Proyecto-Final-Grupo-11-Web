import { Box } from '@mui/material';
import {
  SuccessPillButton,
  ErrorPillButton,
  NeutralPillButton,
} from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import StatusChip from '@/design-system/components/StatusChip';
import SearchField from '@/design-system/components/SearchField';
import FilterChip from '@/design-system/components/FilterChip';
import { palette } from '@/design-system/theme/palette';
import { useHotelBookings, useUpdateBookingStatus } from '@/api/hooks/useHotelBookings';
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
  const navigate = useNavigate();
  const updateStatus = useUpdateBookingStatus();

  const { data, isLoading } = useHotelBookings();

  if (isLoading || !data) {
    return (
      <HotelAdminLayout
        activeNav="reservas"
        title={t('reservations.title')}
        subtitle={`Hotel Santa Clara Sofitel · ${formatDate('2026-02-01', 'monthYear')}`}
      >
        <ReservationsPageSkeleton />
      </HotelAdminLayout>
    );
  }

  const { reservations: hotelReservations, summary: reservationSummary } = data as any;

  return (
    <HotelAdminLayout
      activeNav="reservas"
      title={t('reservations.title')}
      subtitle={`Hotel Santa Clara Sofitel · ${formatDate('2026-02-01', 'monthYear')}`}
    >
      {/* Filter bar */}
      <FilterBar>
        <Box sx={{ maxWidth: 340, minWidth: 200 }}>
          <SearchField placeholder={t('reservations.searchPlaceholder')} />
        </Box>

        <FilterDivider />

        <FilterChip
          label={t('reservations.filterAll')}
          selected
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        />
        <FilterChip label={t('reservations.filterConfirmed')} />
        <FilterChip label={t('reservations.filterPending')} />
        <FilterChip label={t('reservations.filterCancelled')} />

        <FilterDivider />

        {/* Date filter */}
        <DateFilterPill>
          <CalendarTodayIcon sx={{ fontSize: 16, color: palette.primary }} />
          {formatDate('2026-02-01', 'short')} – {formatDate('2026-02-28', 'medium')}
        </DateFilterPill>

        {/* Clear filters */}
        <Box sx={{ marginLeft: 'auto', flexShrink: 0 }}>
          <ClearFiltersLink>{t('reservations.clearFilters')}</ClearFiltersLink>
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
          {t('reservations.showing', {
            from: 1,
            to: hotelReservations.length,
            total: reservationSummary.total,
          })}
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
                {/* Code */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <CodeBadge>{res.id}</CodeBadge>
                </TableCell>

                {/* Guest */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AvatarCircle
                      bgColor={avatarColorMap[res.avatarColor as keyof typeof avatarColorMap]}
                    >
                      {res.initials}
                    </AvatarCircle>
                    <Box>
                      <Text textVariant="bodyMedium">{res.guest}</Text>
                      <Text textVariant="caption">{res.email}</Text>
                    </Box>
                  </Box>
                </TableCell>

                {/* Room */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Text textVariant="bodyMedium">{res.room}</Text>
                  <Text textVariant="caption">{res.roomType}</Text>
                </TableCell>

                {/* Check-in */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  {formatDate(res.checkIn, 'medium')}
                </TableCell>

                {/* Check-out */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  {formatDate(res.checkOut, 'medium')}
                </TableCell>

                {/* Nights */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Text textVariant="hint">
                    {t('reservations.nightsCount', { count: res.nights })}
                  </Text>
                </TableCell>

                {/* Total */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <TotalPrice>{formatPrice(res.totalCop)}</TotalPrice>
                </TableCell>

                {/* Status */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <StatusChip status={res.status} />
                </TableCell>

                {/* Actions */}
                <TableCell component="td" isLast={index === hotelReservations.length - 1}>
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    {res.status === 'pending' ? (
                      <>
                        <SuccessPillButton
                          pillSize="xxs"
                          onClick={() =>
                            updateStatus.mutate({ bookingId: res.id, action: 'confirm' })
                          }
                        >
                          {t('reservations.confirm')}
                        </SuccessPillButton>
                        <ErrorPillButton
                          pillSize="xxs"
                          onClick={() =>
                            updateStatus.mutate({ bookingId: res.id, action: 'reject' })
                          }
                        >
                          {t('reservations.reject')}
                        </ErrorPillButton>
                      </>
                    ) : (
                      <NeutralPillButton
                        pillSize="xxs"
                        onClick={() => navigate(`/hotel/reservations/${res.id}`)}
                      >
                        {t('reservations.viewDetail')}
                      </NeutralPillButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </Box>
        </Box>

        {/* Pagination */}
        <PaginationBar>
          <Text textVariant="hint">
            {t('reservations.showing', {
              from: 1,
              to: hotelReservations.length,
              total: reservationSummary.total,
            })}
          </Text>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <NavButton>
              <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </NavButton>
            {[1, 2, 3, 4, 5].map(page => (
              <PageButton key={page} active={page === 1}>
                {page}
              </PageButton>
            ))}
            <NavButton>
              <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
            </NavButton>
          </Box>
        </PaginationBar>
      </TableCard>
    </HotelAdminLayout>
  );
}
