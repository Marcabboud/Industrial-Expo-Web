"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const accents = [
  { bg: "hover:bg-blue", border: "hover:border-blue" },
  { bg: "hover:bg-accent", border: "hover:border-accent" },
  { bg: "hover:bg-yellow", border: "hover:border-yellow" },
  { bg: "hover:bg-green", border: "hover:border-green" },
];

export default function CategoryChips({ categories }: { categories: string[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className="mt-10 flex flex-wrap gap-3">
      {categories.map((category, i) => {
        const accent = accents[i % accents.length];
        return (
          <li
            key={category}
            className="transition-all duration-500 ease-out"
            style={{
              transitionDelay: `${i * 40}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.75rem)",
            }}
          >
            <Link
              href={`/exhibitors?category=${encodeURIComponent(category)}`}
              className={`inline-block border-2 border-border-strong bg-surface px-4 py-2 text-sm font-bold uppercase tracking-wide text-ink transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:text-white hover:shadow-lg ${accent.bg} ${accent.border}`}
            >
              {category}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
