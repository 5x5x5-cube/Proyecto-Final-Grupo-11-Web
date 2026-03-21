import { Typography } from '@mui/material';
import { palette } from '../theme/palette';

interface BrandProps {
  size?: number;
  variant?: 'nav' | 'hero';
}

export default function Brand({ size = 22, variant = 'nav' }: BrandProps) {
  return (
    <Typography
      sx={{
        fontSize: size,
        fontWeight: 800,
        color: variant === 'hero' ? palette.onSurface : palette.primary,
        letterSpacing: '-0.25px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontWeight: 300 }}>Travel</span>Hub
    </Typography>
  );
}
