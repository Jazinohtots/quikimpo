import { useState } from "react";
import { submitQuote } from "../services/api";
import { QuoteRequestPayload } from "../types";

const initialForm: QuoteRequestPayload = {
  full_name: "",
  company: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  shipment_type: "",
  cargo_type: "",
  weight: "",
  dimensions: "",
  notes: "",
};

export default function Quote() {
  const [form, setForm] = useState<QuoteRequestPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const update = <K extends keyof QuoteRequestPayload>(key: K, value: QuoteRequestPayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await submitQuote(form);
      setFeedback(`✅ ${res.detail}`);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setFeedback("⚠ Submission failed. Please email us directly at joashodhiamboreagan@gmail.com");
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-extrabold text-ink">Request a Quote</h1>
      <p className="mt-3 text-text/70">
        Tell us what you're shipping and we'll get back to you within 2 hours.
      </p>

      {feedback && (
        <p className={`mt-6 rounded-md p-4 text-sm ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {feedback}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Full Name *</label>
            <input
              type="text" required placeholder="John Mwangi"
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Company</label>
            <input
              type="text" placeholder="ABC Imports Ltd"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Email *</label>
            <input
              type="email" required placeholder="you@company.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Phone *</label>
            <input
              type="tel" required placeholder="+254 7XX XXX XXX"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Origin *</label>
            <input
              type="text" required placeholder="e.g. China"
              value={form.origin}
              onChange={(e) => update("origin", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Destination *</label>
            <input
              type="text" required placeholder="e.g. Kenya"
              value={form.destination}
              onChange={(e) => update("destination", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Shipment Type *</label>
            <select
              required value={form.shipment_type}
              onChange={(e) => update("shipment_type", e.target.value as QuoteRequestPayload["shipment_type"])}
              className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-sky"
            >
              <option value="">-- Select --</option>
              <option value="air">Air Freight</option>
              <option value="sea">Sea Freight (FCL)</option>
              <option value="lcl">Sea Freight (LCL)</option>
              <option value="road">Road Transport</option>
              <option value="courier">Express Courier</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Cargo Type</label>
            <select
              value={form.cargo_type}
              onChange={(e) => update("cargo_type", e.target.value as QuoteRequestPayload["cargo_type"])}
              className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-sky"
            >
              <option value="">-- Select --</option>
              <option value="general">General Cargo</option>
              <option value="perishable">Perishable Goods</option>
              <option value="hazmat">Hazardous Materials</option>
              <option value="oversized">Oversized / Heavy</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Estimated Weight (kg)</label>
            <input
              type="number" placeholder="e.g. 500"
              value={form.weight}
              onChange={(e) => update("weight", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">Dimensions (L x W x H cm)</label>
            <input
              type="text" placeholder="e.g. 120 x 80 x 100"
              value={form.dimensions}
              onChange={(e) => update("dimensions", e.target.value)}
              className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Additional Notes</label>
          <textarea
            rows={4} placeholder="Any special handling requirements, incoterms preference, deadline, etc."
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-sky py-3 font-bold text-ink transition hover:bg-skyDark hover:text-white disabled:opacity-50"
        >
          {status === "sending" ? "Submitting…" : "Submit Quote Request →"}
        </button>
      </form>
    </section>
  );
}
