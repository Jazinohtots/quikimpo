import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Globe2 } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { services } from "../data/services";
import { contact } from "../data/contact";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Fast, reliable freight forwarding and customs clearance across
            Africa and worldwide. Your cargo, our commitment.
          </p>
          <div className="mt-4 rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="marquee">
              <div className="marquee-content text-sm font-medium text-white/80">
                <span className="flex items-center gap-3 pr-8">
                  <Globe2 size={16} className="shrink-0" />
                  <span>Kenya</span>
                  <span className="text-white/40">•</span>
                  <span>China</span>
                  <span className="text-white/40">•</span>
                  <span>India</span>
                  <span className="text-white/40">•</span>
                  <span>UAE</span>
                  <span className="text-white/40">•</span>
                  <span>Thailand</span>
                  <span className="text-white/40">•</span>
                  <span>Singapore</span>
                  <span className="text-white/40">•</span>
                  <span>Malaysia</span>
                  <span className="text-white/40">•</span>
                  <span>USA</span>
                  <span className="text-white/40">•</span>
                  <span>UK</span>
                  <span className="text-white/40">•</span>
                  <span>Germany</span>
                  <span className="text-white/40">•</span>
                  <span>Tanzania</span>
                  <span className="text-white/40">•</span>
                  <span>Uganda</span>
                  <span className="text-white/40">•</span>
                  <span>Rwanda</span>
                  <span className="text-white/40">•</span>
                  <span>Ethiopia</span>
                  <span className="text-white/40">•</span>
                  <span>Global</span>
                </span>
                <span className="flex items-center gap-3 pr-8">
                  <Globe2 size={16} className="shrink-0" />
                  <span>Kenya</span>
                  <span className="text-white/40">•</span>
                  <span>China</span>
                  <span className="text-white/40">•</span>
                  <span>India</span>
                  <span className="text-white/40">•</span>
                  <span>UAE</span>
                  <span className="text-white/40">•</span>
                  <span>Thailand</span>
                  <span className="text-white/40">•</span>
                  <span>Singapore</span>
                  <span className="text-white/40">•</span>
                  <span>Malaysia</span>
                  <span className="text-white/40">•</span>
                  <span>USA</span>
                  <span className="text-white/40">•</span>
                  <span>UK</span>
                  <span className="text-white/40">•</span>
                  <span>Germany</span>
                  <span className="text-white/40">•</span>
                  <span>Tanzania</span>
                  <span className="text-white/40">•</span>
                  <span>Uganda</span>
                  <span className="text-white/40">•</span>
                  <span>Rwanda</span>
                  <span className="text-white/40">•</span>
                  <span>Ethiopia</span>
                  <span className="text-white/40">•</span>
                  <span>Global</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-white/20 p-2 hover:border-sky hover:text-sky"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 hover:border-sky hover:text-sky"
            >
              <Facebook size={16} />
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-white/20 p-2 hover:border-sky hover:text-sky"
            >
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-sky">Home</Link></li>
            <li><Link to="/about" className="hover:text-sky">About Us</Link></li>
            <li><Link to="/services" className="hover:text-sky">Our Services</Link></li>
            <li><Link to="/reviews" className="hover:text-sky">Reviews</Link></li>
            <li><Link to="/tracking" className="hover:text-sky">Track Shipment</Link></li>
            <li><Link to="/quote" className="hover:text-sky">Get a Quote</Link></li>
            <li><Link to="/contact" className="hover:text-sky">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services?service=${s.slug}`} className="hover:text-sky">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href={`tel:${contact.whatsappNumber}`} className="hover:text-sky">
                {contact.whatsappNumber}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href={`mailto:${contact.email}`} className="hover:text-sky">{contact.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon size={16} />
              <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-sky">
                {contact.whatsappNumber}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={16} />
              <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky">
                {contact.linkedinLabel}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook size={16} />
              <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky">
                {contact.facebookLabel}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} /> Mon–Sat, 8am–6pm EAT
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} QuikImpo Freight & Logistics. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
