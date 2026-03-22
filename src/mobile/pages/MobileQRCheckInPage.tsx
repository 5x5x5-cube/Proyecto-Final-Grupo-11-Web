import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import MobileShell from '../components/MobileShell';
import { palette } from '../../design-system/theme/palette';
import { mockReservations } from '../../travelers/data/mockReservations';

function QRCodePlaceholder() {
  const size = 240;
  const cellSize = 8;
  const cols = Math.floor(size / cellSize);

  // Deterministic pattern that looks like a QR code
  const pattern: boolean[][] = [];
  for (let r = 0; r < cols; r++) {
    pattern[r] = [];
    for (let c = 0; c < cols; c++) {
      // Finder patterns (top-left, top-right, bottom-left 7x7 squares)
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= cols - 7;
      const inBottomLeft = r >= cols - 7 && c < 7;

      if (inTopLeft || inTopRight || inBottomLeft) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6 ||
          (inTopRight && (c === cols - 7 || c === cols - 1)) ||
          (inBottomLeft && (r === cols - 7 || r === cols - 1));
        const isInner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
          (inTopRight && r >= 2 && r <= 4 && c >= cols - 5 && c <= cols - 3) ||
          (inBottomLeft && r >= cols - 5 && r <= cols - 3 && c >= 2 && c <= 4);
        pattern[r][c] = isOuter || isInner;
      } else {
        // Pseudo-random data pattern
        pattern[r][c] = ((r * 7 + c * 13 + r * c) % 3) === 0;
      }
    }
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${cols}, ${cellSize}px)`,
        margin: '0 auto',
      }}
    >
      {pattern.flat().map((filled, i) => (
        <Box
          key={i}
          sx={{
            background: filled ? '#000' : '#fff',
          }}
        />
      ))}
    </Box>
  );
}

export default function MobileQRCheckInPage() {
  const { t } = useTranslation('mobile');
  const { id } = useParams();
  const reservation = mockReservations.find((r) => r.id === Number(id)) || mockReservations[0];

  return (
    <MobileShell hideNav>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          background: '#fff',
          borderBottom: `1px solid ${palette.outlineVariant}`,
        }}
      >
        <Box component={Link} to={`/mobile/reservations/${reservation.id}`} sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          {t('qrCheckIn.title')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: '24px',
          pt: '32px',
          pb: '24px',
        }}
      >
        {/* QR Code */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '16px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '20px',
            mb: '20px',
          }}
        >
          <QRCodePlaceholder />
        </Box>

        {/* Reservation Code */}
        <Box
          sx={{
            background: palette.primaryContainer,
            borderRadius: '10px',
            px: '20px',
            py: '8px',
            mb: '24px',
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: palette.onPrimaryContainer, letterSpacing: 1 }}>
            {reservation.code}
          </Typography>
        </Box>

        {/* Hotel Info */}
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: palette.onSurface, textAlign: 'center', mb: '4px' }}>
          {reservation.hotelName}
        </Typography>
        <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center', mb: '4px' }}>
          {reservation.checkIn} — {reservation.checkOut}
        </Typography>
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant, textAlign: 'center', mb: '8px' }}>
          {reservation.room} · {reservation.guests}
        </Typography>

        {/* Instruction */}
        <Box
          sx={{
            background: palette.surfaceContainer,
            borderRadius: '10px',
            px: '16px',
            py: '12px',
            mb: '28px',
            width: '100%',
          }}
        >
          <Typography sx={{ fontSize: 13, color: palette.onSurfaceVariant, textAlign: 'center', lineHeight: 1.5 }}>
            {t('qrCheckIn.instruction')}
          </Typography>
        </Box>

        {/* Download Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: `1.5px solid ${palette.primary}`,
            color: palette.primary,
            borderRadius: '12px',
            py: '13px',
            fontSize: 14,
            fontWeight: 600,
            width: '100%',
            cursor: 'pointer',
          }}
        >
          <DownloadIcon sx={{ fontSize: 18 }} />
          {t('qrCheckIn.downloadQR')}
        </Box>
      </Box>
    </MobileShell>
  );
}
