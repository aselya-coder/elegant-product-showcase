import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import { citiesByIsland } from "@/data/citiesByIsland";

const Katalog = () => {
  const CITIES = Object.values(citiesByIsland).flat();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("kategori") || "all"
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("kategori") || "all");
  }, [searchParams]);

  /* ===== SEARCH KOTA ===== */
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const filteredProducts = getProductsByCategory(selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: categoryId });
    }
  };

  const citySuggestions = CITIES.filter(
    (city) =>
      city.toLowerCase().includes(cityQuery.toLowerCase()) &&
      city !== selectedCity
  );

  return (
    <Layout>
      {/* HERO */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom text-center space-y-6">
          <p className="text-primary font-medium uppercase text-sm">
            Katalog Produk
          </p>
          <h1 className="heading-display">
            Koleksi <span className="text-primary">Premium</span> Kami
          </h1>
          <p className="text-muted-foreground text-lg">
            Produk dapat dipesan & dikirim ke seluruh Indonesia
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding">
        <div className="container-custom">

          {/* SEARCH KOTA */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

            <input
              type="text"
              value={cityQuery}
              onFocus={() => setShowSuggestion(true)}
              onChange={(e) => {
                setCityQuery(e.target.value);
                setSelectedCity("");
              }}
              placeholder="Cari kota pengiriman"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          
            {/* AUTOCOMPLETE */}
            {showSuggestion && cityQuery && !selectedCity && (
              <div className="absolute z-20 w-full mt-2 bg-background border border-border rounded-xl shadow-soft max-h-60 overflow-auto">
                {citySuggestions.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityQuery(city);
                      setShowSuggestion(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-accent transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}

            {selectedCity && (
              <p className="text-sm text-center text-muted-foreground mt-2">
                Pengiriman ke <strong>{selectedCity}</strong>
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="flex flex-wrap justify-center gap-3 mt-14 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* COUNT */}
          <p className="text-center mt-12 text-muted-foreground">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Katalog;
