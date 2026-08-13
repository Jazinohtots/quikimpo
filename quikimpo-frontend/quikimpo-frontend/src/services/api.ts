import {
  QuoteRequestPayload,
  ContactMessagePayload,
  Shipment,
  FAQ,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.detail ?? "Something went wrong.", res.status);
  }

  return res.json();
}

export function submitQuote(payload: QuoteRequestPayload) {
  return request<{ detail: string }>("/quote/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitContact(payload: ContactMessagePayload) {
  return request<{ detail: string }>("/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function trackShipment(trackingNumber: string): Promise<Shipment | null> {
  try {
    return await request<Shipment>(`/tracking/${encodeURIComponent(trackingNumber)}/`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export function fetchFAQs() {
  return request<FAQ[]>("/faqs/");
}

export function sendChatMessage(message: string) {
  return request<{ reply: string }>("/ai-chat/", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export { ApiError };
