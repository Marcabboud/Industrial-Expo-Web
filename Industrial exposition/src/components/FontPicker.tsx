"use client";

import { useState } from "react";

// Temporary dev-only helper for choosing the hero title font. Delete once chosen.
const options = [
  { label: "Unica One", value: "var(--font-unica-one)" },
  { label: "Squada One", value: "var(--font-squada-one)" },
  { label: "Bungee", value: "var(--font-bungee)" },
  { label: "Russo One", value: "var(--font-russo-one)" },
];

export default function FontPicker() {
  const [active, setActive] = useState(options[0].label);

  return (
    <div className="fixed bottom-4 right-4 z-[200] border border-border-strong bg-surface p-3 text-xs shadow-lg">
      <p className="mb-2 font-bold uppercase tracking-widest text-ink-muted">
        Title font (dev only)
      </p>
      <div className="flex flex-col gap-1">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => {
              document.documentElement.style.setProperty("--title-font", option.value);
              setActive(option.label);
            }}
            className={`px-3 py-1.5 text-left text-sm ${
              active === option.label ? "bg-primary text-white" : "hover:bg-surface-alt"
            }`}
            style={{ fontFamily: option.value }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
