import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';
import type { GuestInfo } from '../../types';
import { CardRow, Avatar, GuestName, GuestContact } from './GuestInfoCard.styles';

interface Props {
  guest: GuestInfo;
}

export default function GuestInfoCard({ guest }: Props) {
  const { t } = useTranslation('travelers');

  return (
    <SectionCard
      icon={<PersonIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.guest.title')}
    >
      <CardRow>
        <Avatar>{guest.initials}</Avatar>
        <Box>
          <GuestName>{guest.name}</GuestName>
          <GuestContact>
            {guest.email} · {guest.phone}
          </GuestContact>
        </Box>
      </CardRow>
    </SectionCard>
  );
}
