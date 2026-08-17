// These mirror freight/serializers.py exactly — keep them in sync if you
// change a field on either side.

export interface QuoteRequestPayload {
  full_name: string;
  company?: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  shipment_type: "" | "air" | "sea" | "lcl" | "road" | "courier";
  cargo_type?: "" | "general" | "perishable" | "hazmat" | "oversized" | "electronics";
  weight?: string;
  dimensions?: string;
  notes?: string;
}

export interface ContactMessagePayload {
  full_name: string;
  email: string;
  phone?: string;
  subject: "" | "quote" | "tracking" | "customs" | "complaint" | "partnership" | "other";
  message: string;
}

export type ShipmentStatus =
  | "confirmed"
  | "picked_up"
  | "in_transit"
  | "customs"
  | "out_for_delivery"
  | "delivered";

export interface ShipmentEvent {
  status: ShipmentStatus;
  status_display: string;
  location: string;
  note: string;
  occurred_at: string; // ISO datetime
}

export interface Shipment {
  tracking_number: string;
  origin: string;
  destination: string;
  shipment_type: string;
  shipment_type_display: string;
  status: ShipmentStatus;
  status_display: string;
  step: number; // 1-6, matches Shipment.step on the backend
  eta: string | null;
  events: ShipmentEvent[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}
