import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Track Shipment", to: "/tracking" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar — mirrors templates/base.html .topbar */}
      <div className="hidden bg-ink text-xs text-white/70 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone size={12} /> +254 700 000 000
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} /> quotes@quikimpo.com
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> Mon–Sat 8am–6pm EAT
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 bg-ink shadow-lg shadow-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold text-white/90 transition hover:text-sky"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className="rounded-md bg-sky px-4 py-2 text-sm font-bold text-ink transition hover:bg-skyDark hover:text-white"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            className="text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 md:hidden">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold text-white/90"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className="rounded-md bg-sky px-4 py-2 text-center text-sm font-bold text-ink"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
