import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import type { PaymentListItem } from '@/api/hooks/useAdminPayments';
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  Section,
  SectionLabel,
  Field,
  FieldLabel,
  FieldValue,
  MonoValue,
  ErrorBox,
  HistoryList,
  HistoryItem,
  HistoryDot,
  HistoryText,
  HistoryEvent,
  HistoryTime,
} from './TransactionDetailDrawer.styles';

interface Props {
  item: PaymentListItem | null;
  open: boolean;
  onClose: () => void;
}

const STATUS_KEY: Record<string, string> = {
  approved: 'transactions.status.approved',
  declined: 'transactions.status.declined',
  processing: 'transactions.status.processing',
  refunded: 'transactions.status.refunded',
};

const METHOD_KEY: Record<string, string> = {
  credit_card: 'transactions.method.creditCard',
  debit_card: 'transactions.method.debitCard',
  digital_wallet: 'transactions.method.digitalWallet',
  transfer: 'transactions.method.transfer',
};

/**
 * Right-side panel showing the full detail of a payment (HU4.4 CA3).
 *
 * The "status history" is derived from the timestamps the backend already
 * stores: `createdAt` (always = first state, processing) and `processedAt`
 * (the final decision, when present). A dedicated event-log table would be
 * needed to surface intermediate transitions — out of scope for HU4.4.
 */
export default function TransactionDetailDrawer({ item, open, onClose }: Props) {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <DrawerContent role="dialog" aria-label={t('transactions.detail.title')}>
        <DrawerHeader>
          <DrawerTitle>{t('transactions.detail.title')}</DrawerTitle>
          <IconButton onClick={onClose} aria-label={t('transactions.detail.close')} size="small">
            <CloseIcon sx={{ color: palette.onSurfaceVariant }} />
          </IconButton>
        </DrawerHeader>

        {item && (
          <DrawerBody>
            <Section>
              <SectionLabel>{t('transactions.detail.title')}</SectionLabel>
              <Field>
                <FieldLabel>{t('transactions.detail.id')}</FieldLabel>
                <MonoValue>{item.id}</MonoValue>
              </Field>
              <Field>
                <FieldLabel>{t('transactions.detail.user')}</FieldLabel>
                <MonoValue>{item.userId}</MonoValue>
              </Field>
              <Field>
                <FieldLabel>{t('transactions.detail.amount')}</FieldLabel>
                <FieldValue>
                  {formatPrice(item.amount)} <small>({item.currency})</small>
                </FieldValue>
              </Field>
              <Field>
                <FieldLabel>{t('transactions.detail.method')}</FieldLabel>
                <FieldValue>
                  {item.methodLabel}{' '}
                  {METHOD_KEY[item.method] ? <small>· {t(METHOD_KEY[item.method])}</small> : null}
                </FieldValue>
              </Field>
              <Field>
                <FieldLabel>{t('transactions.detail.status')}</FieldLabel>
                <FieldValue>
                  {STATUS_KEY[item.status] ? t(STATUS_KEY[item.status]) : item.status}
                </FieldValue>
              </Field>
              {item.transactionId && (
                <Field>
                  <FieldLabel>{t('transactions.detail.transactionRef')}</FieldLabel>
                  <MonoValue>{item.transactionId}</MonoValue>
                </Field>
              )}
            </Section>

            {item.status === 'declined' && (
              <ErrorBox>
                <strong>{t('transactions.detail.errorCode')}: </strong>
                {item.errorCode || t('transactions.detail.noErrorCode')}
              </ErrorBox>
            )}

            <Section>
              <SectionLabel>{t('transactions.detail.history')}</SectionLabel>
              <HistoryList>
                <HistoryItem>
                  <HistoryDot />
                  <HistoryText>
                    <HistoryEvent>{t('transactions.status.processing')}</HistoryEvent>
                    <HistoryTime>{formatDate(item.createdAt, 'medium')}</HistoryTime>
                  </HistoryText>
                </HistoryItem>
                {item.processedAt && item.status !== 'processing' && (
                  <HistoryItem>
                    <HistoryDot />
                    <HistoryText>
                      <HistoryEvent>
                        {STATUS_KEY[item.status] ? t(STATUS_KEY[item.status]) : item.status}
                      </HistoryEvent>
                      <HistoryTime>{formatDate(item.processedAt, 'medium')}</HistoryTime>
                    </HistoryText>
                  </HistoryItem>
                )}
              </HistoryList>
            </Section>
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
}
