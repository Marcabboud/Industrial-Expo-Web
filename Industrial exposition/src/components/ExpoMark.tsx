import type { CSSProperties } from "react";

type MarkProps = { className?: string; style?: CSSProperties };

export function ExpoMarkEX({ className = "", style }: MarkProps) {
  return (
    <svg viewBox="0 0 200 100" className={className} style={style} aria-hidden="true">
      <g fill="var(--color-blue)">
        <rect x="0" y="0" width="22" height="100" />
        <rect x="0" y="0" width="70" height="26" />
        <rect x="0" y="37" width="55" height="26" />
        <rect x="0" y="74" width="70" height="26" />
      </g>
      <polygon points="100,0 200,0 150,50" fill="var(--color-accent)" />
      <polygon points="100,100 200,100 150,50" fill="var(--color-accent-dark)" />
    </svg>
  );
}

export function ExpoMarkPO({ className = "", style }: MarkProps) {
  return (
    <svg viewBox="0 0 200 100" className={className} style={style} aria-hidden="true">
      <g fill="var(--color-yellow)">
        <rect x="0" y="0" width="22" height="100" />
        <rect x="0" y="0" width="70" height="55" rx="20" />
      </g>
      <circle cx="46" cy="27" r="13" fill="var(--color-primary)" />
      <circle cx="150" cy="50" r="48" fill="var(--color-green)" />
      <circle cx="150" cy="50" r="26" fill="var(--color-primary)" />
    </svg>
  );
}
