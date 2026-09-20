import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "quikimpo-cookie-consent";

type ConsentValue = "accepted" | "declined";

function getStoredConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "accepted";
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The banner remains functional when storage is unavailable.
    }
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("quikimpo-consent-updated"));
    }
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-text/70">We use essential cookies to run this site and, with your consent, analytics cookies to understand how it&apos;s used. See our <Link to="/cookie-policy" className="text-skyDark underline">Cookie Policy</Link> for details.</p>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => choose("declined")} className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-line/30">Decline</button>
          <button onClick={() => choose("accepted")} className="rounded-md bg-sky px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-skyDark hover:text-white">Accept</button>
        </div>
      </div>
    </div>
  );
}