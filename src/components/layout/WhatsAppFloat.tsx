import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl, getProductWhatsAppUrl } from "@/config/whatsapp";
import { useLocation, useParams } from "react-router-dom";
import { useProductBySlug } from "@/hooks/useProducts";

const WhatsAppFloat = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  
  // Check if we are on a product page
  const isProductPage = location.pathname.startsWith('/produk/') && !!slug;
  
  // Fetch product data if on product page (uses cache from ProductDetail)
  const { data: product } = useProductBySlug(isProductPage ? slug || "" : "");
  
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  // Determine the correct WhatsApp URL
  let href = getWhatsAppUrl(); // Default message
  
  if (isProductPage && product) {
     const productUrl = `${siteUrl}/produk/${product.slug}`;
     href = getProductWhatsAppUrl(product.name, productUrl);
  }

  return (
    <a
      href={href}
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
