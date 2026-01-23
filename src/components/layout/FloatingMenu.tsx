import { Link } from "react-router-dom";
import { Gift, TreePine } from "lucide-react";

const FloatingMenu = () => {
  return (
    <div className="fixed bottom-24 right-3 z-50 flex flex-col items-end gap-2">
      
      {/* Papan Duka Cita */}
      <Link
        to="/katalog?kategori=papan-duka"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full shadow-md transition"
      >
        <span className="text-xs font-semibold whitespace-nowrap">
          Papan Duka Cita
        </span>
        <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
          <TreePine className="w-4 h-4" />
        </div>
      </Link>

      {/* Katalog Parsel Natal */}
      <Link
        to="/katalog?kategori=parsel-natal"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full shadow-md transition"
      >
        <span className="text-xs font-semibold whitespace-nowrap">
          Katalog Parsel Natal
        </span>
        <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
          <Gift className="w-4 h-4" />
        </div>
      </Link>

    </div>
  );
};

export default FloatingMenu;
