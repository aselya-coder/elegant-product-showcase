import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product as ApiProduct } from "@/lib/api";
import { Product as DataProduct } from "@/data/products";
import { getProductWhatsAppUrl } from "@/config/whatsapp";

interface ProductCardProps {
  product: ApiProduct | DataProduct;
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
  // Handle both API and data product types
  const images = 'images' in product && product.images ? product.images : ['image_url' in product ? product.image_url : ''];
  const imageUrl = images[0] || '/placeholder.svg';
  const shortDescription = 'shortDescription' in product ? product.shortDescription : product.description?.substring(0, 100);
  const originalPrice = 'originalPrice' in product ? product.originalPrice : ('original_price' in product ? product.original_price : undefined);
  const bestSeller = 'bestSeller' in product ? product.bestSeller : ('best_seller' in product ? product.best_seller : false);
  const exclusive = 'exclusive' in product ? product.exclusive : false;
  const premium = 'premium' in product ? product.premium : false;
  const productUrl = 'productUrl' in product ? product.productUrl : ('product_url' in product ? product.product_url : '');
  
  // Helper to clean slug if it contains a full URL (handling legacy data issues)
  const getCleanSlug = (slug: string) => {
    if (slug.includes('bloomgift.com')) {
      return slug.split('/').pop() || slug;
    }
    if (slug.startsWith('http')) {
      const parts = slug.split('/');
      return parts[parts.length - 1] || slug;
    }
    return slug;
  };

  const cleanSlug = getCleanSlug(product.slug);

  return (
    <div className="group card-premium">
      {/* Image Container */}
      <Link to={`/produk/${cleanSlug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {bestSeller && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Best Seller
            </span>
          )}
          {originalPrice && (
            <span className="bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">
              Sale
            </span>
          )}
          {exclusive && (
            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
              Exclusive
            </span>
          )}
          {premium && (
            <span className="bg-yellow-900 text-white text-xs font-medium px-3 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category.replace("-", " ")}
        </p>
        <Link to={`/produk/${cleanSlug}`}>
          <h3 className="font-heading text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {shortDescription}
          </p>
        )}
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-heading text-xl font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <a
          href={getProductWhatsAppUrl(product.name, productUrl)}
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
