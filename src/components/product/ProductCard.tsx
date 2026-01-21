import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { getProductWhatsAppUrl } from "@/config/whatsapp";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group card-premium">
      {/* Image Container */}
      <Link to={`/produk/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category.replace("-", " ")}
        </p>
        <Link to={`/produk/${product.slug}`}>
          <h3 className="font-heading text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-heading text-xl font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <a
          href={getProductWhatsAppUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="block pt-2"
        >
          <Button className="w-full btn-primary rounded-full gap-2">
            <ShoppingBag className="w-4 h-4" />
            Pesan Sekarang
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
