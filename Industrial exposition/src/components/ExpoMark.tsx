import type { CSSProperties } from "react";

type MarkProps = { className?: string; style?: CSSProperties };

// Shapes traced from the official LINDEX poster. Overlapping letters use
// mix-blend-mode: multiply so their intersections darken like overprinted ink.
const overprint: CSSProperties = { mixBlendMode: "multiply" };

// E + X, 620 × 390
function EXShapes() {
  return (
    <>
      <path
        fill="var(--color-blue)"
        fillRule="evenodd"
        d="M0 0H390V390H0Z M248 72H390V158H248Z M248 232H390V322H248Z"
      />
      <g fill="var(--color-accent)" style={overprint}>
        <polygon points="235,0 620,0 427,195" />
        <polygon points="235,390 620,390 427,195" />
      </g>
    </>
  );
}

// P + O, 632 × 385
function POShapes() {
  return (
    <>
      <path fill="var(--color-yellow)" d="M0 0H190A150 150 0 0 1 190 300H150V385H0Z" />
      <path
        fill="var(--color-green)"
        fillRule="evenodd"
        style={overprint}
        d="M440 0A192 192 0 1 1 440 384A192 192 0 1 1 440 0Z M440 147A45 45 0 1 0 440 237A45 45 0 1 0 440 147Z"
      />
    </>
  );
}

export function ExpoMarkEX({ className = "", style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 620 390"
      className={className}
      style={{ isolation: "isolate", ...style }}
      aria-hidden="true"
    >
      <EXShapes />
    </svg>
  );
}

export function ExpoMarkPO({ className = "", style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 640 385"
      className={className}
      style={{ isolation: "isolate", ...style }}
      aria-hidden="true"
    >
      <POShapes />
    </svg>
  );
}

export function ExpoWordmark({ className = "", style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 1282 390"
      className={className}
      style={{ isolation: "isolate", aspectRatio: "1282 / 390", ...style }}
      aria-hidden="true"
    >
      <EXShapes />
      <g transform="translate(650 3)">
        <POShapes />
      </g>
    </svg>
  );
}
