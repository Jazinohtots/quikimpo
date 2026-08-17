import { Link } from "react-router-dom";
import { services } from "../data/services";

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-center text-4xl font-extrabold text-ink">Our Services</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-text/70">
        Whatever you're shipping and wherever it's going, QuikImpo handles the
        full journey — booking, documentation, customs, and delivery.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <a key={s.slug} href={`#${s.slug}`} className="overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:shadow-md">
            <img src={s.image} alt={s.title} className="h-36 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-text/70">{s.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 space-y-16">
        {services.map((s, i) => (
          <div
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-24 grid items-center gap-8 md:grid-cols-2 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <img src={s.detailImage} alt={`${s.title} service`} className="h-72 w-full rounded-lg object-cover shadow-sm" loading="lazy" />
            <div>
              <div className="text-3xl">{s.icon}</div>
              <h2 className="mt-2 text-2xl font-bold text-ink">{s.title}</h2>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-text/70">
                {s.longDescription.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link
                to="/quote"
                className="mt-5 inline-block rounded-md bg-sky px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-skyDark hover:text-white"
              >
                Get a Quote for {s.title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-ink px-8 py-10 text-center text-white">
        <h2 className="text-2xl font-bold">Need a custom shipping solution?</h2>
        <p className="mt-2 text-white/70">Tell us what you're moving and we'll put together a plan.</p>
        <Link
          to="/quote"
          className="mt-6 inline-block rounded-md bg-sky px-6 py-3 font-bold text-ink transition hover:bg-skyDark hover:text-white"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
