import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import ModalOverlay from '@/design-system/components/ModalOverlay';
import Text from '@/design-system/components/Text';
import {
  PrimaryPillButton,
  ErrorOutlinedPillButton,
  NeutralPillButton,
} from '@/design-system/components/PillButton';
import { palette } from '@/design-system/theme/palette';

interface Props {
  open: boolean;
  action: 'confirm' | 'reject';
  bookingCode: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function StatusConfirmDialog({
  open,
  action,
  bookingCode,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation('hotels');
  const key = action === 'confirm' ? 'confirmDialog' : 'rejectDialog';

  const icon =
    action === 'confirm' ? (
      <CheckCircleIcon sx={{ fontSize: 20, color: palette.success }} />
    ) : (
      <CloseIcon sx={{ fontSize: 20, color: palette.error }} />
    );

  const iconBg = action === 'confirm' ? palette.successContainer : palette.errorContainer;

  const footer = (
    <>
      <NeutralPillButton pillSize="sm" onClick={onCancel} disabled={loading}>
        {t(`reservationDetail.${key}.cancel`)}
      </NeutralPillButton>
      {action === 'confirm' ? (
        <PrimaryPillButton pillSize="sm" onClick={onConfirm} disabled={loading}>
          {t(`reservationDetail.${key}.confirm`)}
        </PrimaryPillButton>
      ) : (
        <ErrorOutlinedPillButton
          pillSize="sm"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            backgroundColor: palette.errorContainer,
            '&:hover': { backgroundColor: palette.errorContainer },
          }}
        >
          {t(`reservationDetail.${key}.confirm`)}
        </ErrorOutlinedPillButton>
      )}
    </>
  );

  return (
    <ModalOverlay
      open={open}
      onClose={onCancel}
      icon={icon}
      iconBg={iconBg}
      title={t(`reservationDetail.${key}.title`)}
      footer={footer}
    >
      <Text textVariant="body">{t(`reservationDetail.${key}.message`, { code: bookingCode })}</Text>
    </ModalOverlay>
  );
}
