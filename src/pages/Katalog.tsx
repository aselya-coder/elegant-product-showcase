import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";

const Katalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredProducts = getProductsByCategory(selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: categoryId });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-primary font-medium tracking-wider uppercase text-sm">
              Katalog Produk
            </p>
            <h1 className="heading-display text-foreground">
              Koleksi <span className="text-primary">Premium</span> Kami
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Temukan berbagai pilihan buket bunga, hampers, kue, dan dekorasi 
              untuk setiap momen spesial Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Tidak ada produk dalam kategori ini.
              </p>
            </div>
          )}

          {/* Product Count */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Katalog;
