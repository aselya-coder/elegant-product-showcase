import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, MessageCircle, Truck, Shield, RefreshCw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, products } from "@/data/products";
import { getProductWhatsAppUrl, getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";

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
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/katalog" replace />;
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-card">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
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
                {product.bestSeller && (
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">
                    Hemat {discount}%
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-3xl md:text-4xl font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
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
                  href={getProductWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full btn-primary rounded-full py-6 gap-2 text-base">
                    <ShoppingBag className="w-5 h-5" />
                    Pesan Sekarang
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
