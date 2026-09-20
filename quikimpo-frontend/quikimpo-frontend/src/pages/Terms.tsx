import Seo from "../components/Seo";
import { contact } from "../data/contact";

export default function Terms() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Seo title="Terms of Service" description="Terms governing use of QuikImpo Freight & Logistics services and website." path="/terms" />
      <h1 className="text-4xl font-extrabold text-ink">Terms of Service</h1>
      <p className="mt-3 text-sm text-text/50">Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
      <div className="mt-10 space-y-10">
        <section><h2 className="text-2xl font-bold text-ink">Acceptance of Terms</h2><p className="mt-3 text-text/70">By using this website or engaging QuikImpo Freight &amp; Logistics for freight forwarding, customs clearance, warehousing, or related services, you agree to these terms.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Our Services</h2><p className="mt-3 text-text/70">QuikImpo coordinates air, sea, and road freight, customs clearance, warehousing, and shipment tracking. Quotes are estimates, not binding contracts. Final rates, transit times, and requirements depend on each shipment and are confirmed directly with you.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Client Responsibilities</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-text/70"><li>Provide accurate cargo information, including its weight, dimensions, and nature.</li><li>Ensure goods are lawful and correctly declared, packaged, and labelled.</li><li>Provide required documentation for customs clearance in a timely manner.</li></ul></section>
        <section><h2 className="text-2xl font-bold text-ink">Limitation of Liability</h2><p className="mt-3 text-text/70">Third-party carrier performance, customs outcomes, and delays caused by weather, regulations, or availability are outside QuikImpo&apos;s direct control. Liability for a shipment is governed by the applicable service agreement and freight-forwarding regulations.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Website Use</h2><p className="mt-3 text-text/70">Do not misuse this website, disrupt its operation, submit false information, or use it for unlawful purposes.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Changes to These Terms</h2><p className="mt-3 text-text/70">We may update these terms from time to time. Continued use of this website after changes are posted constitutes acceptance of the updated terms.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Contact Us</h2><p className="mt-3 text-text/70">Questions about these terms can be sent to <a className="text-skyDark underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p></section>
      </div>
    </section>
  );
}