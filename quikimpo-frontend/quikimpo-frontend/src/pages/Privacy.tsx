import Seo from "../components/Seo";
import { contact } from "../data/contact";

export default function Privacy() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Seo title="Privacy Policy" description="How QuikImpo Freight & Logistics collects, uses, and protects personal information." path="/privacy" />
      <h1 className="text-4xl font-extrabold text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-text/50">Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
      <div className="mt-10 space-y-10">
        <section><h2 className="text-2xl font-bold text-ink">Overview</h2><p className="mt-3 text-text/70">QuikImpo Freight &amp; Logistics respects your privacy. This policy explains what information we collect when you use our website and services, how we use it, and the choices you have.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Information We Collect</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-text/70"><li>Contact details submitted through our quote or contact forms, including name, company, email, and phone number.</li><li>Shipment details provided for quotes or tracking, including origin, destination, cargo type, weight, and dimensions.</li><li>Messages you send through our AI chat assistant.</li><li>Basic usage data through analytics only where you consent to non-essential cookies.</li></ul></section>
        <section><h2 className="text-2xl font-bold text-ink">How We Use Information</h2><p className="mt-3 text-text/70">We use information to respond to requests, provide shipment support, improve our services, and meet legal and regulatory freight-forwarding obligations. We do not sell personal information.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Sharing and Retention</h2><p className="mt-3 text-text/70">We may share shipment-related information with logistics partners, customs authorities, and carriers when necessary to move cargo or comply with law. We retain quote requests, contact messages, and shipment records only for as long as needed to provide services and meet legal, accounting, or reporting requirements.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Your Rights</h2><p className="mt-3 text-text/70">You may request access to, correction of, or deletion of your personal information by contacting us.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Contact Us</h2><p className="mt-3 text-text/70">Questions about this policy can be sent to <a className="text-skyDark underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p></section>
      </div>
    </section>
  );
}