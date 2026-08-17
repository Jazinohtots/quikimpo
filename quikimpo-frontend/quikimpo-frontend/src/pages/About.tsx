export default function About() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-extrabold text-ink">About QuikImpo</h1>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-ink">Who We Are</h2>
          <p className="mt-3 text-text/70">
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
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Our Mission</h2>
          <p className="mt-3 text-text/70">
           To make cross-border trade simple, transparent, and fair for
           every business that relies on it — whether that's a
           first-time importer bringing in a single container or an
           established trader moving cargo every week. We do this by
           pairing honest, upfront pricing with hands-on customs and
           logistics expertise. Every shipment is an opportunity for
           us to earn trust, solve problems, and make international
           trade feel more accessible.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Our Vision</h2>
          <p className="mt-3 text-text/70">
            Our vision is to become a trusted logistics partner connecting
            businesses across Africa and beyond to opportunities around the world.
            We envision a future where moving goods across borders is no longer
            defined by uncertainty, delays, or complicated processes, but by visibility,
            reliability, and confidence.
            Through technology, strong partnerships, local expertise, and a deep
            understanding of our clients' needs, we aim to build a logistics network that
            helps businesses grow beyond their borders
            and makes global trade more accessible from Africa.
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
          <ol className="mt-3 grid list-[upper-roman] gap-3 pl-6 text-text/70 sm:grid-cols-2">
            <li className="pl-2">Air Freight</li>
            <li className="pl-2">Sea Freight (FCL &amp; LCL)</li>
            <li className="pl-2">Road Freight</li>
            <li className="pl-2">Customs Clearance</li>
            <li className="pl-2">Warehousing</li>
            <li className="pl-2">Shipment Tracking</li>
          </ol>
          <p className="mt-4 text-text/70">
            Explore the{" "}
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
