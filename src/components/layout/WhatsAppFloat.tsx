import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-wa"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
    </a>
  );
};

export default WhatsAppFloat;
