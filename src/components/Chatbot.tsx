import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface Message {
  from: "bot" | "user";
  text: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("machine") || lower.includes("tractor") || lower.includes("equipment")) {
      setTimeout(() => navigate("/equipment"), 1000);
      return "Taking you to the Equipment Marketplace! 🚜";
    }
    if (lower.includes("labor") || lower.includes("worker") || lower.includes("hire")) {
      setTimeout(() => navigate("/labor"), 1000);
      return "Taking you to the Labor Marketplace! 👷";
    }
    if (lower.includes("community") || lower.includes("post") || lower.includes("chat")) {
      setTimeout(() => navigate("/community"), 1000);
      return "Taking you to Community! 💬";
    }
    if (lower.includes("loan") || lower.includes("finance") || lower.includes("money")) {
      setTimeout(() => navigate("/finance"), 1000);
      return "Taking you to Finance! 💰";
    }
    if (lower.includes("home")) {
      setTimeout(() => navigate("/"), 1000);
      return "Taking you Home! 🏠";
    }
    if (lower.includes("help") || lower.includes("hi") || lower.includes("hello")) {
      return t("chatbotHelp");
    }
    return "I can help you navigate AgriSetu. Try saying 'show machinery', 'hire labor', 'open community', or 'finance'.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input };
    const botMsg: Message = { from: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ from: "bot", text: t("chatbotGreeting") }]);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 md:bottom-6 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 w-80 max-h-[70vh] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-2xl">
            <span className="font-semibold text-sm">🤖 AgriSetu Assistant</span>
            <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-60">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-2.5 rounded-xl max-w-[85%] whitespace-pre-line ${
                m.from === "bot" 
                  ? "bg-muted text-foreground" 
                  : "bg-primary text-primary-foreground ml-auto"
              }`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/50 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="rounded-xl h-10 text-sm"
            />
            <Button size="sm" className="rounded-xl h-10 px-3" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
