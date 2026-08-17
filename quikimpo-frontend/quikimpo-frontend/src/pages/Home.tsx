import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Globe2,
  FileCheck2,
  Handshake,
  Eye,
  Ship,
  Truck,
  ClipboardCheck,
} from "lucide-react";
import { services } from "../data/services";
import { useEffect, useState } from "react";
import { fetchFAQs } from "../services/api";
import { FAQ } from "../types";

const fallbackFaqs: FAQ[] = [
  {
    question: "How long does sea freight take from China to Kenya?",
    answer: "Transit times vary depending on the shipping line, route, port conditions, and season. We provide shipment-specific timelines and keep clients informed throughout the process.",
  },
  {
    question: "Do you handle customs clearance?",
    answer: "Yes. QuikImpo coordinates customs documentation and clearance requirements as part of our freight-forwarding services, helping clients navigate the process more efficiently.",
  },
  {
    question: "Can I track my shipment?",
    answer: "Yes. Once your shipment has been booked and tracking information is available, you can use our shipment tracking service to follow its progress.",
  },
  {
    question: "What documents do I need to ship cargo?",
    answer: "Requirements vary depending on the type of cargo, origin, destination, and mode of transport. Common documents include a commercial invoice, packing list, and bill of lading or airway bill. Our team can guide you through the requirements for your shipment.",
  },
];

const whyQuikImpo = [
  {
    icon: <Eye size={22} />,
    title: "Clear Communication",
    description: "We keep clients informed about important shipment milestones, requirements, and changes so there are fewer surprises along the way.",
  },
  {
    icon: <Handshake size={22} />,
    title: "End-to-End Coordination",
    description: "From quotation and booking to documentation, customs, transportation, and delivery, we help coordinate the moving parts of your shipment.",
  },
  {
    icon: <Globe2 size={22} />,
    title: "Regional Expertise",
    description: "Our Nairobi base gives us a practical understanding of the East African logistics environment while connecting clients to international trade routes.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Practical Solutions",
    description: "We focus on finding freight solutions that fit the cargo, destination, timeline, and requirements of each shipment.",
  },
];

const processSteps = [
  { number: "01", title: "Request a Quote", description: "Tell us what you are shipping, where it is coming from, and where it needs to go.", icon: <ClipboardCheck size={22} /> },
  { number: "02", title: "Plan the Shipment", description: "We assess the shipment requirements and coordinate the appropriate freight and logistics arrangements.", icon: <FileCheck2 size={22} /> },
  { number: "03", title: "Move Your Cargo", description: "Our team coordinates bookings, documentation, customs processes, and transportation.", icon: <Ship size={22} /> },
  { number: "04", title: "Deliver With Confidence", description: "We keep you informed through the important stages until your cargo reaches its destination.", icon: <Truck size={22} /> },
];

const tradeCorridors = [
  { from: "China", to: "Kenya", description: "International sourcing and imports" },
  { from: "UAE", to: "Kenya", description: "Regional and international trade" },
  { from: "Kenya", to: "East Africa", description: "Regional distribution" },
  { from: "Global", to: "Kenya", description: "International freight solutions" },
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
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/80" />
        <div className="relative mx-auto grid min-h-[620px] max-w-6xl items-center gap-12 px-6 py-20 md:min-h-[680px] md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="max-w-3xl text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Globe2 size={16} /> Kenya • East Africa • China • UAE • Global
              </div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Move Your Cargo<span className="block text-sky">With Confidence.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                From anywhere in the world, QuikImpo coordinates freight forwarding, customs clearance, transportation, and shipment logistics with clear communication at every important stage.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/quote" className="inline-flex items-center gap-2 rounded-md bg-sky px-7 py-3.5 font-bold text-ink transition hover:bg-skyDark hover:text-white">
                  Get a Free Quote <ArrowRight size={18} />
                </Link>
                <Link to="/tracking" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 font-bold text-white transition hover:bg-white/10">
                  Track a Shipment
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-sky" /> End-to-end coordination</span>
                <span className="flex items-center gap-2"><Clock3 size={16} className="text-sky" /> Clear shipment communication</span>
                <span className="flex items-center gap-2"><Globe2 size={16} className="text-sky" /> International trade routes</span>
              </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl md:ml-auto">
            <img
              src="/Home1.png"
              alt="Global shipping routes connecting businesses around the world"
              className="h-[280px] w-full rounded-2xl border border-white/15 object-cover shadow-2xl shadow-black/30 sm:h-[360px] md:h-[440px]"
              onError={(event) => { event.currentTarget.src = "/hero.jpg"; }}
            />
            <div className="absolute inset-0 rounded-2xl bg-sky/10 mix-blend-screen" />
            <p className="absolute bottom-5 left-5 rounded-md bg-ink/75 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              Connecting markets. Moving Possibilities
            </p>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-paper py-20 md:py-24"><div className="mx-auto max-w-6xl px-6"><div className="grid gap-6 md:grid-cols-2"><div className="rounded-xl border border-line bg-white p-8 md:p-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Our Mission</p><h2 className="mt-3 text-2xl font-extrabold text-ink md:text-3xl">Making global trade easier to navigate.</h2><p className="mt-5 leading-relaxed text-text/70">Our mission is to simplify the movement of goods across Kenya, Africa, and the world by building logistics solutions around the people and businesses we serve. We combine local knowledge, dependable partnerships, technology, and disciplined execution to help our clients move cargo efficiently, navigate complex processes, and stay informed throughout the journey. Every shipment is an opportunity for us to earn trust, solve problems, and make international trade feel more accessible.</p></div><div className="rounded-xl bg-ink p-8 text-white md:p-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Our Vision</p><h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Connecting African enterprise to the world.</h2><p className="mt-5 leading-relaxed text-white/70">We envision QuikImpo as a bridge between African enterprise and the global marketplace—a logistics partner that helps ideas, products, and opportunities move beyond borders. Our ambition is to build a smarter and more connected freight network where businesses can ship with greater visibility, respond to change with confidence, and reach new markets without logistics becoming a barrier to growth.</p></div></div></div></section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-0 px-6 md:grid-cols-3">
          <div className="flex items-center gap-4 border-b border-line py-7 md:border-b-0 md:border-r md:pr-8">
            <div className="rounded-full bg-sky/10 p-3 text-sky"><ShieldCheck size={22} /></div>
            <div><h3 className="font-bold text-ink">End-to-End Coordination</h3><p className="mt-1 text-sm text-text/60">One team coordinating the important stages of your shipment.</p></div>
          </div>
          <div className="flex items-center gap-4 border-b border-line py-7 md:border-b-0 md:border-r md:px-8">
            <div className="rounded-full bg-sky/10 p-3 text-sky"><Clock3 size={22} /></div>
            <div><h3 className="font-bold text-ink">Clear Communication</h3><p className="mt-1 text-sm text-text/60">Know what is happening with your cargo at important stages.</p></div>
          </div>
          <div className="flex items-center gap-4 py-7 md:pl-8">
            <div className="rounded-full bg-sky/10 p-3 text-sky"><Globe2 size={22} /></div>
            <div><h3 className="font-bold text-ink">Regional &amp; Global Connections</h3><p className="mt-1 text-sm text-text/60">Freight solutions connecting East Africa to international markets.</p></div>
          </div>
        </div>
      </section>

      {/* About Us / Mission / Vision */}
      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">About QuikImpo</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink md:text-4xl">Freight forwarding built around <span className="text-sky">confidence and clarity.</span></h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-text/70">
                <p>
                QuikImpo was built around a simple belief: moving goods
                should be straightforward, transparent, and dependable.
                Based in Nairobi, Kenya, we are a freight forwarding and
                logistics company helping businesses move cargo by air, sea,
                and road across East Africa, China, the UAE, and beyond.
                We understand the challenges that come with international
                trade—unclear costs, changing timelines, complex documentation,
                and customs processes—so we bring the different pieces of a shipment
                together and make the journey easier to manage. Whether you are importing,
                exporting, handling a single shipment, or building a growing supply chain,
                we combine local knowledge, trusted logistics partnerships, and responsive
                service to provide practical solutions that help you move your cargo with
                greater confidence.
                </p>
                <p>We know that when a shipment is delayed, costs are unclear, or communication breaks down, the impact can reach far beyond the cargo itself. That is why our approach is built around clear communication, careful coordination, and taking responsibility for the journey from origin to destination.</p>
              </div>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 font-bold text-sky transition hover:text-skyDark">Learn More About QuikImpo <ArrowRight size={18} /></Link>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img src="/about-freight.jpg" alt="QuikImpo freight forwarding and logistics" className="h-[360px] w-full object-cover md:h-[420px]" loading="lazy" onError={(event) => { event.currentTarget.src = "/hero.jpg"; }} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20"><p className="text-lg font-bold text-white">“We do more than arrange transportation—we stay involved.”</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why QuikImpo */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Why QuikImpo</p><h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">A logistics partner that stays involved.</h2><p className="mt-4 leading-relaxed text-text/70">Freight forwarding involves many moving parts. Our role is to help bring those parts together while giving you the information and support needed to make confident decisions.</p></div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyQuikImpo.map((item) => <div key={item.title} className="rounded-xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:shadow-md"><div className="inline-flex rounded-lg bg-sky/10 p-3 text-sky">{item.icon}</div><h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-text/65">{item.description}</p></div>)}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Our Services</p><h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Freight solutions for every stage of the journey.</h2><p className="mt-4 max-w-2xl leading-relaxed text-text/70">From international freight to customs and inland transportation, QuikImpo helps coordinate the logistics required to move your cargo.</p></div><Link to="/services" className="inline-flex shrink-0 items-center gap-2 font-bold text-sky hover:text-skyDark">View All Services <ArrowRight size={18} /></Link></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services?service=${s.slug}`}
              className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden"><img src={s.image} alt={s.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
              <div className="p-6">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="mt-3 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text/65">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky">Explore Service <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink py-20 text-white md:py-24"><div className="mx-auto max-w-6xl px-6"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">How It Works</p><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">From quotation to delivery, we stay involved.</h2><p className="mt-4 leading-relaxed text-white/65">We help coordinate the important stages of your shipment so you can spend less time chasing cargo and more time running your business.</p></div><div className="mt-14 grid gap-8 md:grid-cols-4">{processSteps.map((step) => <div key={step.number}><div className="mb-5 flex items-center justify-between"><span className="text-3xl font-extrabold text-sky/40">{step.number}</span><div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sky">{step.icon}</div></div><h3 className="text-lg font-bold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p></div>)}</div></div></section>

      {/* Trade corridors */}
      <section className="bg-white py-20 md:py-24"><div className="mx-auto max-w-6xl px-6"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Trade Corridors</p><h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Connecting businesses to key markets.</h2><p className="mt-4 leading-relaxed text-text/70">Our logistics solutions support businesses moving goods into, out of, and across East Africa through important international trade routes.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{tradeCorridors.map((corridor) => <div key={`${corridor.from}-${corridor.to}`} className="rounded-xl border border-line bg-paper p-6"><div className="flex items-center gap-3"><span className="font-bold text-ink">{corridor.from}</span><ArrowRight size={18} className="text-sky" /><span className="font-bold text-ink">{corridor.to}</span></div><p className="mt-3 text-sm text-text/60">{corridor.description}</p></div>)}</div></div></section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">Frequently Asked Questions</p><h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Questions about shipping?</h2><p className="mt-4 text-text/65">Here are some common questions about freight forwarding and moving cargo with QuikImpo.</p></div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-line bg-paper p-5 transition hover:border-sky/40">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-ink"><div className="flex items-center justify-between gap-4"><span>{faq.question}</span><span className="text-xl text-sky transition-transform group-open:rotate-45">+</span></div></summary>
                <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-text/65">{faq.answer}</p>
              </details>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-sky py-16"><div className="mx-auto max-w-5xl px-6 text-center"><h2 className="text-3xl font-extrabold text-ink md:text-4xl">Ready to move your cargo?</h2><p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink/70">Tell us where your shipment is coming from, where it needs to go, and what you are moving. Our team can help you determine the right freight solution.</p><div className="mt-7 flex flex-wrap justify-center gap-4"><Link to="/quote" className="inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-ink/90">Get a Free Quote <ArrowRight size={18} /></Link><Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-ink/20 px-7 py-3.5 font-bold text-ink transition hover:bg-white/30">Talk to QuikImpo</Link></div></div></section>
    </>
  );
}
