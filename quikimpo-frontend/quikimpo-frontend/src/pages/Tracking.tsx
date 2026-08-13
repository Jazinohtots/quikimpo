import { useState } from "react";
import { trackShipment } from "../services/api";
import { Shipment } from "../types";

const steps = [
  "Order Confirmed",
  "Picked Up",
  "In Transit",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
];

export default function Tracking() {
  const [input, setInput] = useState("");
  const [shipment, setShipment] = useState<Shipment | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    const number = input.trim().toUpperCase();
    if (!number) return;
    setLoading(true);
    setShipment(undefined);
    try {
      const result = await trackShipment(number);
      setShipment(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-ink py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-4xl font-extrabold">Track Your Shipment</h1>
          <p className="mt-3 text-white/70">
            Enter your tracking number below to get real-time updates on your cargo.
          </p>

          <div className="mt-8 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="Enter tracking number e.g. QKI-2026-00123"
              maxLength={30}
              className="flex-1 rounded-md border-none px-4 py-3 text-sm text-ink outline-none"
            />
            <button
              onClick={handleTrack}
              className="rounded-md bg-sky px-6 py-3 font-bold text-ink transition hover:bg-skyDark hover:text-white"
            >
              Track Now →
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {shipment === undefined && !loading && (
          <div className="rounded-lg border border-line bg-white p-10 text-center">
            <div className="text-5xl">📦</div>
            <h3 className="mt-4 text-lg font-bold text-ink">Enter your tracking number above</h3>
            <p className="mt-2 text-sm text-text/70">
              Your tracking number was sent to your email when your booking was confirmed.
              <br />
              Format: <strong>QKI-YEAR-XXXXX</strong> e.g. QKI-2026-00123
            </p>
          </div>
        )}

        {loading && <p className="text-center text-text/60">Looking up shipment…</p>}

        {shipment === null && !loading && (
          <div className="rounded-lg border border-line bg-white p-10 text-center">
            <div className="text-5xl">❌</div>
            <h3 className="mt-4 text-lg font-bold text-ink">Tracking number not found</h3>
            <p className="mt-2 text-sm text-text/70">
              Please check the number and try again, or{" "}
              <a href="/contact" className="text-sky underline">contact our support team</a>.
            </p>
          </div>
        )}

        {shipment && !loading && (
          <div className="space-y-10">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-line bg-white p-6 sm:grid-cols-3">
              <SummaryItem label="Tracking No." value={shipment.tracking_number} />
              <SummaryItem label="Status" value={shipment.status_display} badge />
              <SummaryItem label="Origin" value={shipment.origin} />
              <SummaryItem label="Destination" value={shipment.destination} />
              <SummaryItem label="Est. Delivery" value={shipment.eta ?? "—"} />
              <SummaryItem label="Shipment Type" value={shipment.shipment_type_display} />
            </div>

            {/* Progress */}
            <div>
              <h3 className="mb-6 text-lg font-bold text-ink">Shipment Progress</h3>
              <div className="flex items-start justify-between">
                {steps.map((label, i) => {
                  const stepNum = i + 1;
                  const done = stepNum < shipment.step;
                  const active = stepNum === shipment.step;
                  return (
                    <div key={label} className="flex flex-1 flex-col items-center text-center">
                      <div
                        className={`h-4 w-4 rounded-full border-2 ${
                          done ? "border-sky bg-sky" : active ? "border-sky bg-white" : "border-line bg-white"
                        }`}
                      />
                      <p className={`mt-2 text-[11px] font-semibold ${done || active ? "text-ink" : "text-text/40"}`}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-ink">Shipment History</h3>
              <div className="space-y-4">
                {shipment.events.map((event, i) => (
                  <div key={i} className="rounded-lg border border-line bg-white p-4">
                    <div className="text-xs text-text/50">
                      {new Date(event.occurred_at).toLocaleString()}
                    </div>
                    <div className="mt-1 font-semibold text-ink">{event.status_display}</div>
                    {event.note && <div className="text-sm text-text/70">{event.note}</div>}
                    <div className="mt-1 text-sm text-text/50">📍 {event.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function SummaryItem({ label, value, badge }: { label: string; value: string; badge?: boolean }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-text/40">{label}</div>
      <div className={badge ? "mt-1 inline-block rounded-full bg-sky/15 px-3 py-1 text-sm font-semibold text-skyDark" : "mt-1 text-sm text-ink"}>
        {value}
      </div>
    </div>
  );
}
