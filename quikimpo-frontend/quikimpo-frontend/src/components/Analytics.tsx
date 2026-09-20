import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent } from "./CookieConsent";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gaLoaded = false;

function loadGaScript() {
  if (!GA_ID || gaLoaded) return;
  gaLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
}

function trackPageView(path: string) {
  if (!GA_ID || !gaLoaded || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}

export default function Analytics() {
  const location = useLocation();
  const pagePath = location.pathname + location.search;

  useEffect(() => {
    const tryLoad = () => {
      if (hasAnalyticsConsent()) {
        loadGaScript();
        trackPageView(window.location.pathname + window.location.search);
      }
    };
    tryLoad();
    window.addEventListener("quikimpo-consent-updated", tryLoad);
    return () => window.removeEventListener("quikimpo-consent-updated", tryLoad);
  }, []);

  useEffect(() => {
    trackPageView(pagePath);
  }, [pagePath]);

  return null;
}