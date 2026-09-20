import Seo from "../components/Seo";
import { contact } from "../data/contact";

export default function CookiePolicy() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Seo title="Cookie Policy" description="How QuikImpo Freight & Logistics uses cookies and similar technologies." path="/cookie-policy" />
      <h1 className="text-4xl font-extrabold text-ink">Cookie Policy</h1>
      <p className="mt-3 text-sm text-text/50">Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
      <div className="mt-10 space-y-10">
        <section><h2 className="text-2xl font-bold text-ink">What Are Cookies</h2><p className="mt-3 text-text/70">Cookies are small text files stored on your device that help websites function and, where enabled, help us understand how visitors use them.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">How We Use Cookies</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-text/70"><li><strong>Essential cookies</strong> are required for the website to work, including remembering your cookie-consent choice.</li><li><strong>Analytics cookies</strong> help us understand site use and are loaded only after you give consent through the cookie banner.</li></ul></section>
        <section><h2 className="text-2xl font-bold text-ink">Managing Cookies</h2><p className="mt-3 text-text/70">You can accept or decline analytics cookies with the banner shown on your first visit. You can also clear cookies in your browser settings at any time to reset your preference.</p></section>
        <section><h2 className="text-2xl font-bold text-ink">Contact Us</h2><p className="mt-3 text-text/70">Questions about cookies can be sent to <a className="text-skyDark underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p></section>
      </div>
    </section>
  );
}