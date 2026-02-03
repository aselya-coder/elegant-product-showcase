import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/config/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-10 right-4 z-50
        flex items-center gap-2
        bg-green-500 hover:bg-green-600
        text-white text-xs font-semibold
        px-3 py-1.5
        rounded-full
        shadow-md
        transition-all duration-300
      "
    >

      {/* Text */}
      <span>Kami Hadir 24 Jam</span>


      {/* WhatsApp Icon */}
      <span className="
        flex items-center justify-center
        w-8 h-8
        bg-white text-green-500
        rounded-full
      ">
        <FaWhatsapp size={18} />
      </span>
    </a>
  );
};

export default WhatsAppFloat;
