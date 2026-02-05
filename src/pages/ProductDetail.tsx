import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, MessageCircle, Truck, Shield, RefreshCw, ZoomIn } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useProductBySlug, useProducts, useProductsByCategory } from "@/hooks/useProducts";
import { getProductWhatsAppUrl, getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // 1. Try to fetch product directly (FAST path)
  const { data: directProduct, isLoading: isLoadingDirect, isError: isDirectError } = useProductBySlug(slug || "");
  
  // 2. Fallback: Fetch all products only if direct fetch failed (SLOW path for legacy/dirty slugs)
  // We enable this query ONLY if direct fetch finished AND didn't return a product
  const shouldFetchFallback = !isLoadingDirect && !directProduct;
  const { data: allProducts = [], isLoading: isLoadingFallback } = useProducts();
  
  // 3. Helper to clean slug (handling legacy data issues where slug might be a full URL)
  const getCleanSlug = (s: string) => {
    if (s.includes('/') || s.startsWith('http')) {
      return s.split('/').filter(Boolean).pop() || s;
    }
    return s;
  };

  // 4. Resolve the final product
  const product = directProduct || (shouldFetchFallback ? allProducts.find(p => getCleanSlug(p.slug) === slug) : null);
  
  // 5. Fetch related products (Optimized: fetch by category instead of filtering all)
  const category = product?.category;
  const { data: relatedProductsData = [], isLoading: isLoadingRelated } = useProductsByCategory(
    category || "", 
    4,
    !!category // Only fetch if we have a category
  );
  
  // Use optimized related products if available, otherwise fallback to filtering all (if all loaded)
  const relatedProducts = relatedProductsData.length > 0 
    ? relatedProductsData.filter(p => p.id !== product?.id).slice(0, 4)
    : (allProducts.length > 0 && product ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) : []);

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  // Loading state: 
  // - If we are fetching direct, we are loading.
  // - If direct finished but no product, and we are fetching fallback, we are loading.
  const isLoading = isLoadingDirect || (shouldFetchFallback && isLoadingFallback && !product);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Memuat produk...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return <Navigate to="/katalog" replace />;
  }

  const discount = (product.original_price || 0) > 0
    ? Math.round((((product.original_price || 0) - product.price) / (product.original_price || 1)) * 100)
    : 0; 

  const isBestSeller = product.is_best_seller;
  const isExclusive = product.is_exclusive;
  const isPremium = product.is_premium;

  const images = product.images || (product.image_url ? [product.image_url] : []);
  const mainImage = images[0] || '/placeholder.svg';

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 py-4">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Beranda
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/katalog" className="text-muted-foreground hover:text-foreground transition-colors">
              Katalog
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-card cursor-pointer group relative">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 bg-white/90 px-4 py-2 rounded-full text-sm font-medium transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2 shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                        Klik untuk memperbesar
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none ring-0 focus:ring-0">
                   <div className="relative w-full h-[80vh] flex items-center justify-center">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                   </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <p className="text-primary font-medium tracking-wider uppercase text-sm">
                {product.category.replace("-", " ")}
              </p>

              {/* Title */}
              <h1 className="heading-section text-foreground">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {isBestSeller && (
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">
                    Hemat {discount}%
                  </span>
                )}
                {isExclusive && (
                  <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                    Exclusive
                  </span>
                )}
                {isPremium && (
                  <span className="bg-yellow-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-3xl md:text-4xl font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                {(product.original_price || 0) > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.original_price || 0)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={product.product_url || getProductWhatsAppUrl(product.name, `${siteUrl}/produk/${product.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full btn-primary rounded-full py-6 gap-2 text-base">
                    <ShoppingBag className="w-5 h-5" />
                    {product.product_url ? "Beli Sekarang" : "Pesan Sekarang"}
                  </Button>
                </a>
                <a
                  href={getWhatsAppUrl(WHATSAPP_CONFIG.consultationMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full btn-outline-gold rounded-full py-6 gap-2 text-base"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Tanya Dulu
                  </Button>
                </a>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Same-day Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Garansi Kualitas</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Free Revisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary/50">
          <div className="container-custom">
            <h2 className="heading-section text-foreground text-center mb-12">
              Produk Serupa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
