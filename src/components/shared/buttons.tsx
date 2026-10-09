import { THEME } from '@/lib/theme';

/* ---------------------------------------------------------------------- */
/*  Primary Button                                                         */
/* ---------------------------------------------------------------------- */

interface BtnPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function BtnPrimary({ children, style = {}, ...rest }: BtnPrimaryProps) {
  return (
    <button
      className="bf-btn"
      style={{
        background: THEME.brass,
        color: THEME.ink,
        border: `2px solid ${THEME.brass}`,
        borderRadius: 999,
        padding: '14px 28px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/*  Ghost Button                                                           */
/* ---------------------------------------------------------------------- */

interface BtnGhostProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: 'light' | 'dark';
}

export function BtnGhost({ children, style = {}, variant = 'light', ...rest }: BtnGhostProps) {
  const styles = variant === 'light' 
    ? {
        background: 'transparent',
        color: THEME.off,
        border: `2px solid rgba(244,239,227,0.35)`,
      }
    : {
        background: 'transparent',
        color: THEME.off,
        border: `2px solid rgba(244,239,227,0.35)`,
      };

  return (
    <button
      className="bf-btn"
      style={{
        ...styles,
        borderRadius: 999,
        padding: '14px 28px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/*  Outline Button                                                         */
/* ---------------------------------------------------------------------- */

interface BtnOutlineProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function BtnOutline({ children, style = {}, ...rest }: BtnOutlineProps) {
  return (
    <button
      className="bf-btn"
      style={{
        background: 'transparent',
        color: THEME.brass,
        border: `2px solid ${THEME.brass}`,
        borderRadius: 999,
        padding: '14px 28px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
