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
            Making every shipment simpler, smarter, and more reliable. We help businesses move cargo across borders with confidence through local expertise, technology, and dependable logistics.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Our Vision</h2>
          <p className="mt-3 text-text/70">
            Connecting Africa to opportunity, one shipment at a time. We aim to make global trade more accessible, visible, and seamless for African businesses.
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
