import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  
  // Filter featured products
  const featuredProducts = products
    .filter((p) => p.is_featured && p.is_active)
    .slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-primary font-medium tracking-wider uppercase text-sm">
            Koleksi Pilihan
          </p>
          <h2 className="heading-section text-foreground">
            Produk Unggulan Kami
          </h2>
          <p className="text-muted-foreground">
            Temukan koleksi terbaik kami yang dipilih dengan cermat untuk 
            berbagai momen spesial Anda.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat produk...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada produk unggulan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/katalog">
            <Button
              variant="outline"
              size="lg"
              className="btn-outline-gold rounded-full px-8 gap-2 group"
            >
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
