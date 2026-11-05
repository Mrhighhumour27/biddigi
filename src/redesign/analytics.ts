export function installAnalytics() {
  if (typeof window === "undefined") return;
  const send = (detail: Record<string, string>) => {
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
      keepalive: true,
    }).catch(() => {});
  };
  window.addEventListener("biddigi:analytics", (e) => {
    const d = (e as CustomEvent).detail;
    if (d.event === "platform_selection")
      send({ event: d.event, platform: d.platform });
    if (["enquiry_start", "enquiry_error"].includes(d.event))
      send({ event: d.event, role: d.role });
  });
  document.addEventListener("click", (e) => {
    const link = (e.target as Element)?.closest?.("a[href]");
    if (!link) return;
    const url = new URL(link.getAttribute("href")!, location.origin);
    if (url.origin !== location.origin) return;
    const role =
      url.searchParams.get("role") ||
      (
        { "/publishers": "publisher", "/advertisers": "advertiser" } as Record<
          string,
          string
        >
      )[url.pathname];
    if (role) send({ event: "journey_selection", role });
  });
  void fetch("/api/config")
    .then((r) => r.json())
    .then((c) => {
      if (c.analyticsToken) {
        const s = document.createElement("script");
        s.src = "https://static.cloudflareinsights.com/beacon.min.js";
        s.defer = true;
        s.dataset.cfBeacon = JSON.stringify({
          token: c.analyticsToken,
          spa: false,
        });
        document.head.appendChild(s);
      }
    })
    .catch(() => {});
}
