import { useState } from "react";
import { submitContact } from "../services/api";
import { ContactMessagePayload } from "../types";

const initialForm: ContactMessagePayload = {
  full_name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactMessagePayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const update = <K extends keyof ContactMessagePayload>(key: K, value: ContactMessagePayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await submitContact(form);
      setFeedback(`✅ ${res.detail}`);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setFeedback("⚠ Could not send message. Please email us directly.");
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-4xl font-extrabold text-ink">Contact Us</h1>
      <p className="mt-3 text-text/70">Questions about a shipment, a quote, or anything else — reach out.</p>

      {feedback && (
        <p className={`mt-6 rounded-md p-4 text-sm ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {feedback}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          <label className="mb-1 block text-sm font-semibold text-ink">Email *</label>
          <input
            type="email" required placeholder="you@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Phone</label>
          <input
            type="tel" placeholder="+254 7XX XXX XXX"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Subject *</label>
          <select
            required value={form.subject}
            onChange={(e) => update("subject", e.target.value as ContactMessagePayload["subject"])}
            className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-sky"
          >
            <option value="">-- Select Subject --</option>
            <option value="quote">Request a Quote</option>
            <option value="tracking">Shipment Tracking</option>
            <option value="customs">Customs Clearance</option>
            <option value="complaint">Complaint / Issue</option>
            <option value="partnership">Business Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Message *</label>
          <textarea
            rows={5} required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none focus:border-sky"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-sky py-3 font-bold text-ink transition hover:bg-skyDark hover:text-white disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </section>
  );
}
