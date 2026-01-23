import { Link } from "react-router-dom";
import { Gift, TreePine } from "lucide-react";

const FloatingMenu = () => {
  return (
    <div className="fixed bottom-28 right-4 z-50 flex flex-col items-end gap-3">
      
      {/* Papan Duka Cita */}
      <Link
        to="/katalog?kategori=papan-duka"
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        <span className="text-sm font-semibold whitespace-nowrap">
          Papan Duka Cita
        </span>
        <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center">
          <TreePine className="w-5 h-5" />
        </div>
      </Link>

      {/* Katalog Parsel Natal */}
      <Link
        to="/katalog?kategori=parsel-natal"
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        <span className="text-sm font-semibold whitespace-nowrap">
          Katalog Parsel Natal
        </span>
        <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center">
          <Gift className="w-5 h-5" />
        </div>
      </Link>

    </div>
  );
};

export default FloatingMenu;
