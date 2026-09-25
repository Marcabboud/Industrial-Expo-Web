"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TICKIT_ORIGIN = "https://tickit.co";
const EVENT_PREFIX = "tickit:embed:";
const MIN_HEIGHT = 700;
const READY_TIMEOUT_MS = 10_000;

// Keep in sync with --color-accent in src/app/globals.css.
const BRAND_ACCENT = "#e03327";

const EMBED_CONFIG = {
  hideHeader: true,
  hideFooter: true,
  primary: BRAND_ACCENT,
  flyerImage: "ticket",
};

// Payload fields may arrive flat or nested under `payload`; accept both.
type TickitMessage = {
  type: string;
  height?: number;
  receiptId?: string;
  payload?: { height?: number; receiptId?: string };
};

type EmbedStatus = "loading" | "ready" | "unavailable";

function TicketEmbed({
  eventId,
  onClose,
}: {
  eventId: string;
  onClose: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<EmbedStatus>("loading");
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (event.origin !== TICKIT_ORIGIN || event.source !== iframeWindow) return;

      const data = event.data as TickitMessage | null;
      if (typeof data?.type !== "string" || !data.type.startsWith(EVENT_PREFIX)) return;

      switch (data.type) {
        case "tickit:embed:ready":
          setStatus("ready");
          iframeWindow?.postMessage(
            { type: "tickit:embed:configure", ...EMBED_CONFIG },
            TICKIT_ORIGIN,
          );
          break;
        case "tickit:embed:resize": {
          const next = Number(data.height ?? data.payload?.height);
          if (Number.isFinite(next)) setHeight(Math.max(MIN_HEIGHT, next));
          break;
        }
        case "tickit:embed:checkout:complete":
          // TODO: send conversion to analytics.
          console.log(
            "[TICKIT] checkout complete",
            data.receiptId ?? data.payload?.receiptId,
          );
          break;
        case "tickit:embed:checkout:receipt:closed":
        case "tickit:embed:checkout:dismissed":
          onClose();
          break;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClose]);

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = setTimeout(() => setStatus("unavailable"), READY_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [status]);

  const ready = status === "ready";

  return (
    <>
      {!ready && (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 border border-border bg-surface p-8 text-center">
          {status === "loading" ? (
            <p className="text-sm font-medium uppercase tracking-wide text-ink-muted">
              Loading ticketing&hellip;
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-primary">
                Ticketing is temporarily unavailable.
              </p>
              <p className="text-sm text-ink-muted">
                Please try again shortly or{" "}
                <Link href="/contact" className="font-semibold text-accent hover:text-accent-dark">
                  contact us
                </Link>
                .
              </p>
            </>
          )}
        </div>
      )}

      <div
        aria-hidden={!ready}
        className={ready ? "" : "invisible h-0 overflow-hidden"}
      >
        <iframe
          ref={iframeRef}
          src={`${TICKIT_ORIGIN}/embed/events/${encodeURIComponent(eventId)}`}
          title="Buy tickets"
          allow="payment"
          className="block w-full border-0"
          style={{ minHeight: MIN_HEIGHT, height }}
        />
      </div>
    </>
  );
}

export default function TicketWidget({ eventId }: { eventId: string }) {
  const [session, setSession] = useState(0);
  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <div className="flex flex-col items-center gap-4 border border-border bg-surface p-8 text-center">
        <p className="text-sm text-ink-muted">Checkout closed.</p>
        <button
          type="button"
          onClick={() => {
            setSession((s) => s + 1);
            setClosed(false);
          }}
          className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
        >
          Buy Tickets
        </button>
      </div>
    );
  }

  return (
    <TicketEmbed key={session} eventId={eventId} onClose={() => setClosed(true)} />
  );
}
