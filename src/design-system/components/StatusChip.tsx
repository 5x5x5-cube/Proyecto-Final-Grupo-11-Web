import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import { palette } from '../theme/palette';

type Status = 'confirmed' | 'pending' | 'cancelled' | 'past';

const statusConfig: Record<Status, { bg: string; color: string; icon: React.ReactNode; label: string }> = {
  confirmed: { bg: palette.successContainer, color: palette.success, icon: <CheckCircleIcon sx={{ fontSize: 14 }} />, label: 'Confirmada' },
  pending: { bg: palette.warningContainer, color: palette.warning, icon: <ScheduleIcon sx={{ fontSize: 14 }} />, label: 'Pendiente' },
  cancelled: { bg: palette.errorContainer, color: palette.error, icon: <CancelIcon sx={{ fontSize: 14 }} />, label: 'Cancelada' },
  past: { bg: palette.outlineVariant, color: palette.onSurfaceVariant, icon: null, label: 'Pasada' },
};

export default function StatusChip({ status, label }: { status: Status; label?: string }) {
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
