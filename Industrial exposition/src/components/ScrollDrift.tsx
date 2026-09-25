"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollDriftProps = {
  /** Pixels moved per pixel scrolled (negative = up / left). */
  x?: number;
  y?: number;
  /** Degrees rotated per pixel scrolled. */
  rotate?: number;
  className?: string;
  children: ReactNode;
};

// Moves and rotates its children in proportion to the page scroll position.
export default function ScrollDrift({ x = 0, y = 0, rotate = 0, className = "", children }: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const s = window.scrollY;
      el.style.transform = `translate3d(${s * x}px, ${s * y}px, 0) rotate(${s * rotate}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [x, y, rotate]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
