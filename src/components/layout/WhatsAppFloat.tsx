import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/config/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        bg-green-500 hover:bg-green-600
        text-white font-semibold
        px-5 py-3
        rounded-full
        shadow-lg
        transition-all duration-300
        hover:scale-105
      "
    >
      {/* Text */}
      <span className="whitespace-nowrap">
        Kami Hadir 24 Jam
      </span>

      {/* WhatsApp Icon ASLI */}
      <span className="
        flex items-center justify-center
        w-10 h-10
        bg-white text-green-500
        rounded-full
      ">
        <FaWhatsapp size={24} />
      </span>
    </a>
  );
};

export default WhatsAppFloat;
