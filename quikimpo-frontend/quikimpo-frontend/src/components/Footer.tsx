import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";

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
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-sky">Home</Link></li>
            <li><Link to="/about" className="hover:text-sky">About Us</Link></li>
            <li><Link to="/services" className="hover:text-sky">Our Services</Link></li>
            <li><Link to="/tracking" className="hover:text-sky">Track Shipment</Link></li>
            <li><Link to="/quote" className="hover:text-sky">Get a Quote</Link></li>
            <li><Link to="/contact" className="hover:text-sky">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-sky">Air Freight</Link></li>
            <li><Link to="/services" className="hover:text-sky">Sea Freight (FCL/LCL)</Link></li>
            <li><Link to="/services" className="hover:text-sky">Road Transport</Link></li>
            <li><Link to="/services" className="hover:text-sky">Customs Clearance</Link></li>
            <li><Link to="/services" className="hover:text-sky">Warehousing</Link></li>
            <li><Link to="/services" className="hover:text-sky">Express Courier</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              Westlands Business Park, Nairobi, Kenya
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +254 700 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> quotes@quikimpo.com
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
