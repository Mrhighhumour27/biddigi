import { useEffect, useRef } from "react";
type Widget = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
export function Verification({
  revision,
  onToken,
  onReady,
}: {
  revision: number;
  onToken: (token: string) => void;
  onReady: (ready: boolean) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let active = true,
      id: string | undefined;
    onToken("");
    void fetch("/api/config")
      .then((r) => r.json())
      .then(async (c) => {
        if (!active) return;
        if (!c.enquiriesReady) {
          onReady(false);
          return;
        }
        if (!(window as unknown as { turnstile?: Widget }).turnstile) {
          await new Promise<void>((resolve, reject) => {
            let s = document.querySelector<HTMLScriptElement>(
              "script[data-turnstile]",
            );
            if (!s) {
              s = document.createElement("script");
              s.dataset.turnstile = "true";
              s.src =
                "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
              document.head.appendChild(s);
            }
            s.addEventListener("load", () => resolve(), { once: true });
            s.addEventListener("error", reject, { once: true });
            setTimeout(() => reject(Error("timeout")), 15000);
          });
        }
        if (!active || !host.current) return;
        const widget = (window as unknown as { turnstile: Widget }).turnstile;
        id = widget.render(host.current, {
          sitekey: c.turnstileSiteKey,
          action: "enquiry",
          callback: onToken,
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
        onReady(true);
      })
      .catch(() => {
        if (active) onReady(false);
      });
    return () => {
      active = false;
      if (id)
        (window as unknown as { turnstile?: Widget }).turnstile?.remove(id);
    };
  }, [revision, onToken, onReady]);
  return <div ref={host} aria-label="Enquiry verification" />;
}
