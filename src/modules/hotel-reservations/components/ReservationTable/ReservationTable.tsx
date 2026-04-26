import { Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/contexts/LocaleContext';
import { NeutralPillButton } from '@/design-system/components/PillButton';
import Text from '@/design-system/components/Text';
import StatusChip from '@/design-system/components/StatusChip';
import { palette } from '@/design-system/theme/palette';
import type { HotelBooking } from '@/api/hooks/useHotelBookings';
import {
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
} from '@/hotels/pages/ReservationsPage/ReservationsPage.styles';

const avatarColorMap = {
  teal: palette.primaryContainer,
  green: palette.successContainer,
  amber: palette.warningContainer,
  red: palette.errorContainer,
  blue: '#E3F2FD',
} as const;

interface Props {
  reservations: HotelBooking[];
  currentPage: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function ReservationTable({
  reservations,
  currentPage,
  totalPages,
  total,
  itemsPerPage,
  onPageChange,
}: Props) {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();
  const navigate = useNavigate();

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, total);

  const pageNumbers: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const headers = [
    t('reservations.tableHeaders.code'),
    t('reservations.tableHeaders.guest'),
    t('reservations.tableHeaders.room'),
    t('reservations.tableHeaders.checkIn'),
    t('reservations.tableHeaders.checkOut'),
    t('reservations.tableHeaders.nights'),
    t('reservations.tableHeaders.total'),
    t('reservations.tableHeaders.status'),
    t('reservations.tableHeaders.actions'),
  ];

  return (
    <TableCard>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <Box component="thead">
          <Box component="tr">
            {headers.map(col => (
              <TableHeader component="th" key={col}>
                {col}
              </TableHeader>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {reservations.map((res, index) => (
            <TableRow component="tr" key={res.id}>
              <TableCell component="td" isLast={index === reservations.length - 1}>
                <CodeBadge>{res.code}</CodeBadge>
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
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

              <TableCell component="td" isLast={index === reservations.length - 1}>
                <Text textVariant="bodyMedium">{res.room}</Text>
                {res.roomType && <Text textVariant="caption">{res.roomType}</Text>}
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
                {formatDate(res.checkIn, 'medium')}
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
                {formatDate(res.checkOut, 'medium')}
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
                <Text textVariant="hint">
                  {t('reservations.nightsCount', { count: res.nights })}
                </Text>
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
                <TotalPrice>{formatPrice(res.totalCop)}</TotalPrice>
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
                <StatusChip
                  status={res.status as 'confirmed' | 'pending' | 'cancelled' | 'rejected' | 'past'}
                />
              </TableCell>

              <TableCell component="td" isLast={index === reservations.length - 1}>
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

      <PaginationBar>
        <Text textVariant="hint">{t('reservations.showing', { from, to, total })}</Text>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <NavButton
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            sx={{
              opacity: currentPage === 1 ? 0.3 : 1,
              pointerEvents: currentPage === 1 ? 'none' : 'auto',
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
          </NavButton>
          {pageNumbers.map(page => (
            <PageButton key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
              {page}
            </PageButton>
          ))}
          <NavButton
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
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
  );
}
