import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { sendChatMessage } from "../services/api";
import { ChatHistoryMessage, ChatMessage } from "../types";
import { contact } from "../data/contact";

const quickActions = [
  { label: "Get a Freight Quote", message: "I want to prepare a freight quote." },
  { label: "Which Service Do I Need?", message: "Which QuikImpo freight service is best for my shipment?" },
  { label: "What Documents Do I Need?", message: "What import or export documents might I need?" },
  { label: "How Does Customs Work?", message: "How does customs clearance work in Kenya?" },
  { label: "Track My Shipment", message: "I want to track my shipment." },
];

export default function ChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I'm the QuikImpo Logistics Assistant. I can help you understand our services, prepare a quote, or explain your shipment journey. What do you need?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async (message = input) => {
    const text = message.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const history: ChatHistoryMessage[] = messages.map((message) => ({
        role: message.role === "bot" ? "assistant" : "user",
        content: message.text,
      }));
      const { reply } = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `I'm temporarily unable to process that request. Please contact QuikImpo on WhatsApp at ${contact.whatsappNumber} or email ${contact.email}.`,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const runQuickAction = (action: (typeof quickActions)[number]) => {
    if (action.label === "Get a Freight Quote") {
      setOpen(false);
      navigate("/quote");
      return;
    }
    if (action.label === "Track My Shipment") {
      setOpen(false);
      navigate("/tracking");
      return;
    }
    void handleSend(action.message);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open QuikImpo Logistics Assistant"
        title="Open QuikImpo Logistics Assistant"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sky text-ink shadow-lg transition hover:bg-skyDark hover:text-white"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-line bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-sm font-semibold text-white">
            <span>QuikImpo Logistics Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "bot"
                    ? "bg-paper text-text"
                    : "ml-auto bg-sky text-ink"
                }`}
              >
                {m.text}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] rounded-lg bg-paper px-3 py-2 text-sm text-text/50">
                Typing…
              </div>
            )}
          </div>

          <div className="border-t border-line bg-paper px-3 py-3">
            <p className="mb-2 text-xs font-semibold text-text/60">Quick actions</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => runQuickAction(action)}
                  disabled={sending}
                  className="rounded-full border border-line bg-white px-2.5 py-1.5 text-left text-xs font-semibold text-ink transition hover:border-sky hover:text-sky disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-sky hover:text-sky"
              >
                Talk to QuikImpo <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="flex gap-2 border-t border-line p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about shipping, rates, customs..."
              className="flex-1 rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-sky"
            />
            <button
              onClick={() => void handleSend()}
              disabled={sending}
              className="rounded-md bg-ink p-2 text-white transition hover:bg-sky hover:text-ink disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
