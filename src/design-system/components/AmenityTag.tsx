import React from 'react';
import { Box, Typography } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PoolIcon from '@mui/icons-material/Pool';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import TvIcon from '@mui/icons-material/Tv';
import { surfaceContainer, onSurfaceVariant } from '../theme/palette';

const iconMap: Record<string, React.ElementType> = {
  wifi: WifiIcon,
  free_breakfast: FreeBreakfastIcon,
  pool: PoolIcon,
  ac_unit: AcUnitIcon,
  spa: SpaIcon,
  fitness_center: FitnessCenterIcon,
  local_parking: LocalParkingIcon,
  restaurant: RestaurantIcon,
  local_bar: LocalBarIcon,
  tv: TvIcon,
};

interface AmenityTagProps {
  icon: string;
  label: string;
}

const AmenityTag: React.FC<AmenityTagProps> = ({ icon, label }) => {
  const IconComponent = iconMap[icon];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: surfaceContainer,
        borderRadius: '100px',
        padding: '4px 10px',
      }}
    >
      {IconComponent && (
        <IconComponent
          sx={{
            fontSize: '14px',
            color: onSurfaceVariant,
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: '11px',
          color: onSurfaceVariant,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default AmenityTag;
