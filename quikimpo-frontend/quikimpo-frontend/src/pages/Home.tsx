import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Globe2 } from "lucide-react";
import { services } from "../data/services";
import { useEffect, useState } from "react";
import { fetchFAQs } from "../services/api";
import { FAQ } from "../types";

const fallbackFaqs: FAQ[] = [
  {
    question: "How long does sea freight take from China to Kenya?",
    answer: "Typically 24–30 days port to port, depending on the shipping line and season, plus a few days for customs clearance in Mombasa.",
  },
  {
    question: "Do you handle customs clearance?",
    answer: "Yes — customs documentation, duty calculation, and clearance with Kenyan authorities are included as part of our forwarding service.",
  },
  {
    question: "Can I track my shipment online?",
    answer: "Yes, use the Track Shipment page with the tracking number sent to your email when your booking was confirmed.",
  },
  {
    question: "What documents do I need to ship cargo?",
    answer: "Typically a commercial invoice, packing list, and bill of lading or airway bill. We'll tell you exactly what's needed for your specific shipment.",
  },
];

export default function Home() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);

  useEffect(() => {
    fetchFAQs()
      .then((data) => data.length > 0 && setFaqs(data))
      .catch(() => {
        /* fall back to the static FAQs above if the API/table is empty */
      });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <picture>
          <source srcSet="/hero.webp" type="image/webp" media="(min-width: 640px)" />
          <source srcSet="/hero-mobile.webp" type="image/webp" media="(max-width: 639px)" />
          <source srcSet="/hero.jpg" type="image/jpeg" media="(min-width: 640px)" />
          <source srcSet="/hero-mobile.jpg" type="image/jpeg" media="(max-width: 639px)" />
          <img
            src="/hero.jpg"
            alt="QuikImpo freight forwarding"
            className="w-full h-[520px] md:h-[640px] object-cover"
          />
        </picture>

        <div className="absolute inset-0 bg-ink/80 flex items-center">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center text-white">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            QuikImpo Freight Forwarding &amp; Logistics
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Fast, reliable freight forwarding and customs clearance across
            Africa and worldwide. Your cargo, our commitment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/quote"
              className="flex items-center gap-2 rounded-md bg-sky px-6 py-3 font-bold text-ink transition hover:bg-skyDark hover:text-white"
            >
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <Link
              to="/tracking"
              className="rounded-md border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Track a Shipment
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white py-8">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 text-sm text-text/70 md:grid-cols-3">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={18} className="text-sky" /> Licensed &amp; insured freight forwarder
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock size={18} className="text-sky" /> Quote response within 2 hours
          </div>
          <div className="flex items-center justify-center gap-2">
            <Globe2 size={18} className="text-sky" /> East Africa, China, UAE &amp; global lanes
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-extrabold text-ink">Our Services</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-text/70">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-extrabold text-ink">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-line bg-paper p-5">
                <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
                <p className="mt-2 text-sm text-text/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
