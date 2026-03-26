import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { palette } from '../theme/palette';

type PillSize = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

const sizeMap: Record<
  PillSize,
  { height: number; fontSize: number; fontWeight: number; px: number }
> = {
  lg: { height: 52, fontSize: 16, fontWeight: 600, px: 24 },
  md: { height: 48, fontSize: 14, fontWeight: 500, px: 24 },
  sm: { height: 40, fontSize: 14, fontWeight: 500, px: 20 },
  xs: { height: 36, fontSize: 13, fontWeight: 500, px: 20 },
  xxs: { height: 32, fontSize: 12, fontWeight: 500, px: 14 },
};

interface PillButtonProps extends Omit<ButtonProps, 'size'> {
  pillSize?: PillSize;
}

const PillButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'pillSize',
})<PillButtonProps>(({ pillSize = 'lg' }) => {
  const s = sizeMap[pillSize];
  return {
    height: s.height,
    paddingLeft: s.px,
    paddingRight: s.px,
    borderRadius: '100px',
    fontFamily: "'Roboto', sans-serif",
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    textTransform: 'none' as const,
    letterSpacing: '0.1px',
  };
});

export default PillButton;

export const PrimaryPillButton = styled(PillButton)({
  backgroundColor: palette.primary,
  color: '#fff',
  '&:hover': { backgroundColor: palette.primary },
});

export const OutlinedPillButton = styled(PillButton)({
  backgroundColor: 'transparent',
  border: `1px solid ${palette.outline}`,
  color: palette.primary,
  '&:hover': { backgroundColor: 'transparent', border: `1px solid ${palette.outline}` },
});

export const ErrorPillButton = styled(PillButton)({
  backgroundColor: palette.error,
  color: '#fff',
  '&:hover': { backgroundColor: palette.error },
});

export const ErrorOutlinedPillButton = styled(PillButton)({
  backgroundColor: 'transparent',
  border: `1.5px solid ${palette.error}`,
  color: palette.error,
  '&:hover': { backgroundColor: 'rgba(179,38,30,0.04)', border: `1.5px solid ${palette.error}` },
});

export const SuccessPillButton = styled(PillButton)({
  backgroundColor: palette.successContainer,
  color: palette.success,
  '&:hover': { backgroundColor: palette.successContainer },
});

export const NeutralPillButton = styled(PillButton)({
  backgroundColor: palette.background,
  color: palette.primary,
  '&:hover': { backgroundColor: palette.background },
});

export const NeutralOutlinedPillButton = styled(PillButton)({
  backgroundColor: '#fff',
  border: `1px solid ${palette.outlineVariant}`,
  color: palette.onSurface,
  '&:hover': { backgroundColor: '#fff', border: `1px solid ${palette.outlineVariant}` },
});
