import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{t(`reservationDetail.${key}.title`)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(`reservationDetail.${key}.message`, { code: bookingCode })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {t(`reservationDetail.${key}.cancel`)}
        </Button>
        <Button
          onClick={onConfirm}
          color={action === 'confirm' ? 'primary' : 'error'}
          variant="contained"
          disabled={loading}
        >
          {t(`reservationDetail.${key}.confirm`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
