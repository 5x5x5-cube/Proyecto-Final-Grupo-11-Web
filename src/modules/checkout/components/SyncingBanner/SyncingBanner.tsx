import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { palette } from '@/design-system/theme/palette';
import { BannerRoot, BannerText } from './SyncingBanner.styles';

interface Props {
  visible: boolean;
}

export default function SyncingBanner({ visible }: Props) {
  const { t } = useTranslation('travelers');

  if (!visible) return null;

  return (
    <BannerRoot>
      <CircularProgress size={14} thickness={5} sx={{ color: palette.primary }} />
      <BannerText>{t('cart.syncing', 'Sincronizando...')}</BannerText>
    </BannerRoot>
  );
}
