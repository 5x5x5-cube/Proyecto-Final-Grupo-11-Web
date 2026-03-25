import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { palette } from '../theme/palette';

type Status = 'confirmed' | 'pending' | 'cancelled' | 'past';

export default function StatusChip({ status, label }: { status: Status; label?: string }) {
  const { t } = useTranslation('common');

  const statusConfig: Record<
    Status,
    { bg: string; color: string; icon: React.ReactNode; label: string }
  > = {
    confirmed: {
      bg: palette.successContainer,
      color: palette.success,
      icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
      label: t('status.confirmed'),
    },
    pending: {
      bg: palette.warningContainer,
      color: palette.warning,
      icon: <ScheduleIcon sx={{ fontSize: 14 }} />,
      label: t('status.pending'),
    },
    cancelled: {
      bg: palette.errorContainer,
      color: palette.error,
      icon: <CancelIcon sx={{ fontSize: 14 }} />,
      label: t('status.cancelled'),
    },
    past: {
      bg: palette.outlineVariant,
      color: palette.onSurfaceVariant,
      icon: null,
      label: t('status.past'),
    },
  };

  const config = statusConfig[status];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: 12,
        fontWeight: 600,
        background: config.bg,
        color: config.color,
      }}
    >
      {config.icon}
      {label || config.label}
    </Box>
  );
}
