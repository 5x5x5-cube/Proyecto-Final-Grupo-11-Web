import { Box, Skeleton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import SearchField from '../../design-system/components/SearchField';
import FilterChip from '../../design-system/components/FilterChip';
import { palette } from '../../design-system/theme/palette';

export default function ReservationsPageSkeleton() {
  const { t } = useTranslation('hotels');
  const { formatDate } = useLocale();

  return (
    <>
      {/* Filter bar — always visible, no skeletons */}
      <Box
        sx={{
          backgroundColor: '#fff',
          border: `1px solid ${palette.outlineVariant}`,
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          mb: '20px',
        }}
      >
        <Box sx={{ maxWidth: 340, minWidth: 200 }}>
          <SearchField placeholder={t('reservations.searchPlaceholder')} />
        </Box>

        <Box
          sx={{ width: '1px', height: 32, backgroundColor: palette.outlineVariant, flexShrink: 0 }}
        />

        <FilterChip
          label={t('reservations.filterAll')}
          selected
          icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        />
        <FilterChip label={t('reservations.filterConfirmed')} />
        <FilterChip label={t('reservations.filterPending')} />
        <FilterChip label={t('reservations.filterCancelled')} />

        <Box
          sx={{ width: '1px', height: 32, backgroundColor: palette.outlineVariant, flexShrink: 0 }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: 36,
            border: `1px solid ${palette.outlineVariant}`,
            borderRadius: '100px',
            padding: '0 16px',
            backgroundColor: '#fff',
            fontSize: 13,
            color: palette.onSurfaceVariant,
            flexShrink: 0,
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 16, color: palette.primary }} />
          {formatDate('2026-02-01', 'short')} – {formatDate('2026-02-28', 'medium')}
        </Box>

        <Box sx={{ marginLeft: 'auto', flexShrink: 0 }}>
          <Skeleton animation="wave" variant="text" width={80} height={20} />
        </Box>
      </Box>

      {/* Summary row — skeleton pills */}
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', mb: '20px' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            animation="wave"
            variant="rounded"
            width={i === 0 ? 100 : 120}
            height={34}
            sx={{ borderRadius: '100px' }}
          />
        ))}
        <Box sx={{ marginLeft: 'auto' }}>
          <Skeleton animation="wave" variant="text" width={140} height={20} />
        </Box>
      </Box>

      {/* Table card */}
      <Box
        sx={{
          backgroundColor: '#fff',
          border: `1px solid ${palette.outlineVariant}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Column header row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.8fr 1.2fr 1fr 1fr 0.6fr 1fr 0.8fr 1.2fr',
            padding: '14px 16px',
            backgroundColor: palette.background,
            borderBottom: `1px solid ${palette.outlineVariant}`,
            gap: '8px',
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} animation="wave" variant="text" width={50} height={16} />
          ))}
        </Box>

        {/* Data rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.8fr 1.2fr 1fr 1fr 0.6fr 1fr 0.8fr 1.2fr',
              padding: '14px 16px',
              alignItems: 'center',
              gap: '8px',
              borderBottom: i < 5 ? `1px solid ${palette.outlineVariant}` : 'none',
            }}
          >
            {/* Code badge */}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={80}
              height={24}
              sx={{ borderRadius: '6px' }}
            />

            {/* Guest with avatar + two lines */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton
                animation="wave"
                variant="circular"
                width={36}
                height={36}
                sx={{ flexShrink: 0 }}
              />
              <Box>
                <Skeleton animation="wave" variant="text" width={100} height={20} />
                <Skeleton animation="wave" variant="text" width={130} height={16} />
              </Box>
            </Box>

            {/* Room + type */}
            <Box>
              <Skeleton animation="wave" variant="text" width={70} height={20} />
              <Skeleton animation="wave" variant="text" width={90} height={16} />
            </Box>

            {/* Check-in */}
            <Skeleton animation="wave" variant="text" width={80} height={20} />

            {/* Check-out */}
            <Skeleton animation="wave" variant="text" width={80} height={20} />

            {/* Nights */}
            <Skeleton animation="wave" variant="text" width={40} height={20} />

            {/* Total */}
            <Skeleton animation="wave" variant="text" width={90} height={22} />

            {/* Status chip */}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={80}
              height={24}
              sx={{ borderRadius: '100px' }}
            />

            {/* Action button(s) */}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={90}
              height={32}
              sx={{ borderRadius: '100px' }}
            />
          </Box>
        ))}

        {/* Pagination row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderTop: `1px solid ${palette.outlineVariant}`,
          }}
        >
          <Skeleton animation="wave" variant="text" width={160} height={20} />
          <Box sx={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                animation="wave"
                variant="rounded"
                width={36}
                height={36}
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
