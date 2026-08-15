import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Clock, ChevronDown, Linkedin, Facebook } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { services } from "../data/services";
import { contact } from "../data/contact";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Track Shipment", to: "/tracking" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
              <Mail size={12} /> {contact.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> Mon–Sat 8am–6pm EAT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Linkedin size={13} /> LinkedIn
            </a>
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Facebook size={13} /> Facebook
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <WhatsAppIcon size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 bg-ink shadow-lg shadow-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link to="/" className="text-sm font-semibold text-white/90 transition hover:text-sky">
              Home
            </Link>
            <Link to="/about" className="text-sm font-semibold text-white/90 transition hover:text-sky">
              About
            </Link>

            {/* Services dropdown */}
            <div className="group relative">
              <Link
                to="/services"
                className="flex items-center gap-1 text-sm font-semibold text-white/90 transition hover:text-sky"
              >
                Services <ChevronDown size={14} />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded-md border border-white/10 bg-ink py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services#${s.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-sky"
                  >
                    <span>{s.icon}</span> {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {links.slice(2).map((link) => (
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
            <Link to="/" className="text-sm font-semibold text-white/90" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="text-sm font-semibold text-white/90" onClick={() => setOpen(false)}>
              About
            </Link>

            <div>
              <button
                className="flex w-full items-center justify-between text-sm font-semibold text-white/90"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDown size={16} className={mobileServicesOpen ? "rotate-180 transition" : "transition"} />
              </button>
              {mobileServicesOpen && (
                <div className="mt-3 flex flex-col gap-3 pl-3">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services#${s.slug}`}
                      className="text-sm text-white/70 hover:text-sky"
                      onClick={() => setOpen(false)}
                    >
                      {s.icon} {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.slice(2).map((link) => (
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
