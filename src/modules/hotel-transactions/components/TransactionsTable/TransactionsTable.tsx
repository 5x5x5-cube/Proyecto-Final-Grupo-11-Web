import { Skeleton, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { useLocale } from '@/contexts/LocaleContext';
import type { PaymentListItem } from '@/api/hooks/useAdminPayments';
import {
  TableCard,
  TableScroll,
  StyledTable,
  HeaderRow,
  HeaderCell,
  BodyRow,
  BodyCell,
  MonoCell,
  AmountCell,
  PaginationRow,
  PaginationInfo,
  StatusChipBox,
  EmptyTableBody,
} from './TransactionsTable.styles';

interface Props {
  items: PaymentListItem[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Future hook for the detail panel (commit 6). */
  onRowClick?: (item: PaymentListItem) => void;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  approved: { bg: palette.successContainer, color: palette.success },
  declined: { bg: palette.errorContainer, color: palette.error },
  processing: { bg: palette.warningContainer, color: palette.warning },
  refunded: { bg: palette.primaryContainer, color: palette.primary },
};

const STATUS_KEY: Record<string, string> = {
  approved: 'transactions.status.approved',
  declined: 'transactions.status.declined',
  processing: 'transactions.status.processing',
  refunded: 'transactions.status.refunded',
};

const HEADER_KEYS = [
  'transactions.tableHeaders.id',
  'transactions.tableHeaders.date',
  'transactions.tableHeaders.user',
  'transactions.tableHeaders.method',
  'transactions.tableHeaders.amount',
  'transactions.tableHeaders.status',
];

const SKELETON_ROWS = 8;

/**
 * Truncate a UUID to its first 8 chars for display. Mirrors what most admin
 * tables do with long ids — full id is still available in the detail panel.
 */
function shortId(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}

export default function TransactionsTable({
  items,
  isLoading,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onRowClick,
}: Props) {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const showingFrom = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, total);

  return (
    <TableCard>
      <TableScroll>
        <StyledTable>
          <thead>
            <HeaderRow>
              {HEADER_KEYS.map(key => (
                <HeaderCell key={key}>{t(key)}</HeaderCell>
              ))}
            </HeaderRow>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <BodyRow key={`skeleton-${i}`}>
                  {HEADER_KEYS.map((_, j) => (
                    <BodyCell key={j}>
                      <Skeleton animation="wave" variant="text" width="80%" />
                    </BodyCell>
                  ))}
                </BodyRow>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={HEADER_KEYS.length}>
                  <EmptyTableBody>{t('transactions.empty')}</EmptyTableBody>
                </td>
              </tr>
            ) : (
              items.map(item => {
                const statusStyle = STATUS_STYLE[item.status] ?? {
                  bg: palette.surfaceVariant,
                  color: palette.onSurfaceVariant,
                };
                const statusLabel = STATUS_KEY[item.status]
                  ? t(STATUS_KEY[item.status])
                  : item.status;
                return (
                  <BodyRow
                    key={item.id}
                    $clickable={!!onRowClick}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  >
                    <MonoCell>{shortId(item.id)}</MonoCell>
                    <BodyCell>{formatDate(item.createdAt, 'medium')}</BodyCell>
                    <MonoCell>{shortId(item.userId)}</MonoCell>
                    <BodyCell>{item.methodLabel}</BodyCell>
                    <AmountCell>{formatPrice(item.amount)}</AmountCell>
                    <BodyCell>
                      <StatusChipBox $bg={statusStyle.bg} $color={statusStyle.color}>
                        {statusLabel}
                      </StatusChipBox>
                    </BodyCell>
                  </BodyRow>
                );
              })
            )}
          </tbody>
        </StyledTable>
      </TableScroll>

      <PaginationRow>
        <PaginationInfo>
          {t('reservations.showing', { from: showingFrom, to: showingTo, total })}
        </PaginationInfo>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            size="small"
            shape="rounded"
            color="primary"
          />
        )}
      </PaginationRow>
    </TableCard>
  );
}
