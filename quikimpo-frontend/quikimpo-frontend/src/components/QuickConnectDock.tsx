import { type ReactNode, useId, useState } from "react";
import { Facebook, Linkedin, Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { contact } from "../data/contact";

type QuickConnectDockProps = {
  className?: string;
  dockClassName?: string;
  socialClassName?: string;
  middleAction?: ReactNode;
};

export default function QuickConnectDock({
  className = "",
  dockClassName = "",
  socialClassName = "flex items-center gap-2",
  middleAction,
}: QuickConnectDockProps) {
  const [isDockOpen, setIsDockOpen] = useState(false);
  const dockId = useId();

  const toggleDock = () => setIsDockOpen((isOpen) => !isOpen);

  return (
    <div className={`w-full ${className}`}>
      <div className={socialClassName}>
        <button
          type="button"
          onClick={toggleDock}
          aria-label="Open Quick Connect"
          aria-expanded={isDockOpen}
          aria-controls={dockId}
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 ease-in-out hover:border-sky hover:bg-white/10 hover:text-sky focus-visible:outline-none"
        >
          <Facebook size={17} aria-hidden="true" />
        </button>
        {middleAction}
        <button
          type="button"
          onClick={toggleDock}
          aria-label="Open Quick Connect"
          aria-expanded={isDockOpen}
          aria-controls={dockId}
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 ease-in-out hover:border-sky hover:bg-white/10 hover:text-sky focus-visible:outline-none"
        >
          <Linkedin size={17} aria-hidden="true" />
        </button>
      </div>

      <div
        id={dockId}
        aria-hidden={!isDockOpen}
        className={`grid transition-all duration-300 ease-in-out ${dockClassName} ${
          isDockOpen
            ? "mt-3 grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border border-white/20 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 ease-in-out sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0" aria-label="Online">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm font-medium text-white">
                QuikImpo Dispatch &amp; Support - Active Online
              </p>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isDockOpen ? 0 : -1}
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-emerald-500 px-4 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-emerald-400 focus-visible:outline-none"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:quikimpofreightlogistics@gmail.com"
                tabIndex={isDockOpen ? 0 : -1}
                className="inline-flex min-h-10 items-center justify-center gap-2 px-3 text-sm font-semibold text-white/80 transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white focus-visible:outline-none"
              >
                <Mail size={16} />
                Email Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
