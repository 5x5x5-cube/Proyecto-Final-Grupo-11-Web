import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';
import SearchField from '@/design-system/components/SearchField';
import FilterChip from '@/design-system/components/FilterChip';
import { palette } from '@/design-system/theme/palette';
import {
  FilterBar,
  FilterDivider,
  DateFilterPill,
  ClearFiltersLink,
} from '@/hotels/pages/ReservationsPage/ReservationsPage.styles';

interface Props {
  activeStatus: string;
  searchCode: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export default function ReservationFilterBar({
  activeStatus,
  searchCode,
  onStatusChange,
  onSearchChange,
  onClear,
}: Props) {
  const { t } = useTranslation('hotels');

  return (
    <FilterBar>
      <Box sx={{ maxWidth: 340, minWidth: 200 }}>
        <SearchField
          placeholder={t('reservations.searchPlaceholder')}
          value={searchCode}
          onChange={e => onSearchChange(e.target.value)}
        />
      </Box>

      <FilterDivider />

      <FilterChip
        label={t('reservations.filterAll')}
        selected={activeStatus === ''}
        icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        onClick={() => onStatusChange('')}
      />
      <FilterChip
        label={t('reservations.filterConfirmed')}
        selected={activeStatus === 'confirmed'}
        onClick={() => onStatusChange('confirmed')}
      />
      <FilterChip
        label={t('reservations.filterPending')}
        selected={activeStatus === 'pending'}
        onClick={() => onStatusChange('pending')}
      />
      <FilterChip
        label={t('reservations.filterCancelled')}
        selected={activeStatus === 'cancelled'}
        onClick={() => onStatusChange('cancelled')}
      />

      <FilterDivider />

      <DateFilterPill>
        <CalendarTodayIcon sx={{ fontSize: 16, color: palette.primary }} />
        {t('reservations.allDates')}
      </DateFilterPill>

      <Box sx={{ marginLeft: 'auto', flexShrink: 0 }}>
        <ClearFiltersLink onClick={onClear}>{t('reservations.clearFilters')}</ClearFiltersLink>
      </Box>
    </FilterBar>
  );
}
