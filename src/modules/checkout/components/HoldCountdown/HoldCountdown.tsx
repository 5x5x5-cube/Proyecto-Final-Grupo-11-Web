import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { palette } from '@/design-system/theme/palette';

interface Props {
  expiresAt: string;
  onExpired: () => void;
}

function getRemainingSeconds(expiresAt: string): number {
  const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
  return Math.max(0, diff);
}

function formatCountdown(seconds: number): string {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function HoldCountdown({ expiresAt, onExpired }: Props) {
  const [remaining, setRemaining] = useState(() => getRemainingSeconds(expiresAt));

  useEffect(() => {
    if (remaining <= 0) {
      onExpired();
      return;
    }

    const interval = setInterval(() => {
      const secs = getRemainingSeconds(expiresAt);
      setRemaining(secs);
      if (secs <= 0) {
        clearInterval(interval);
        onExpired();
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  const isWarning = remaining < 2 * 60;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '10px',
        backgroundColor: isWarning ? palette.warningContainer : palette.surfaceContainer,
        border: `1px solid ${isWarning ? palette.warning : palette.outlineVariant}`,
        width: 'fit-content',
      }}
    >
      <AccessTimeIcon
        sx={{
          fontSize: 18,
          color: isWarning ? palette.warning : palette.primary,
        }}
      />
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: isWarning ? palette.warning : palette.primary,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatCountdown(remaining)}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: isWarning ? palette.warning : palette.onSurfaceVariant,
        }}
      >
        para completar tu reserva
      </Typography>
    </Box>
  );
}
