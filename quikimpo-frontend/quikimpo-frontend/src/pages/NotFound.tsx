import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
      <Seo title="Page Not Found" description="The page you are looking for does not exist or has moved." path="/404" noindex />
      <p className="text-sm font-bold uppercase tracking-wide text-skyDark">404 error</p>
      <h1 className="mt-3 text-4xl font-extrabold text-ink md:text-5xl">This page went off course.</h1>
      <p className="mt-4 max-w-md text-text/70">The page you are looking for does not exist or may have moved. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="inline-flex items-center gap-2 rounded-md bg-sky px-7 py-3.5 font-bold text-ink transition hover:bg-skyDark hover:text-white">Back to Home <ArrowRight size={18} /></Link>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-line px-7 py-3.5 font-bold text-ink transition hover:bg-line/30">Contact Us</Link>
      </div>
    </section>
  );
}