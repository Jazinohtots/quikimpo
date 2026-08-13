export default function About() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-extrabold text-ink">About QuikImpo</h1>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-ink">Who We Are</h2>
          <p className="mt-3 text-text/70">
            QuikImpo is a freight forwarding and logistics company based in
            Nairobi, Kenya, moving cargo by air, sea, and road across East
            Africa and beyond. We handle the coordination, documentation,
            and customs clearance so your goods arrive on time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Our Mission</h2>
          <p className="mt-3 text-text/70">
            To make international shipping simple and transparent for
            businesses of every size — from first-time importers to
            established trading companies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Why Choose Us</h2>
          <ul className="mt-3 grid gap-3 text-text/70 sm:grid-cols-2">
            <li>✔ Quote response within 2 hours</li>
            <li>✔ End-to-end customs clearance</li>
            <li>✔ Real-time shipment tracking</li>
            <li>✔ Dedicated account support</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-ink">Our Services</h3>
          <p className="mt-3 text-text/70">
            Air freight, sea freight (FCL &amp; LCL), road transport, customs
            clearance, warehousing, and express courier — see the{" "}
            <a href="/services" className="text-sky underline">
              Services
            </a>{" "}
            page for details.
          </p>
        </div>
      </div>
    </section>
  );
}
