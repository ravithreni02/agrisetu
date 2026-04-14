import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VoiceCommand = () => {
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not supported", description: "Your browser doesn't support voice commands.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      toast({ title: "Error", description: "Could not recognize speech. Try again." });
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      toast({ title: "🎙️ Heard", description: text });

      if (text.includes("machine") || text.includes("equipment") || text.includes("tractor")) {
        navigate("/equipment");
      } else if (text.includes("labor") || text.includes("worker") || text.includes("hire")) {
        navigate("/labor");
      } else if (text.includes("community") || text.includes("post")) {
        navigate("/community");
      } else if (text.includes("finance") || text.includes("loan")) {
        navigate("/finance");
      } else if (text.includes("home")) {
        navigate("/");
      } else if (text.includes("dashboard") || text.includes("profile")) {
        navigate("/dashboard");
      } else {
        toast({ title: "Try saying", description: '"Show machinery", "Hire labor", "Open community"' });
      }
    };

    recognition.start();
  };

  return (
    <button
      onClick={handleVoice}
      className={`fixed bottom-20 md:bottom-6 left-4 z-50 h-12 w-12 rounded-full shadow-xl flex items-center justify-center transition-all ${
        listening 
          ? "bg-destructive text-destructive-foreground animate-pulse" 
          : "bg-card border border-border text-foreground hover:bg-accent"
      }`}
      title="Voice Command"
    >
      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  );
};

export default VoiceCommand;
