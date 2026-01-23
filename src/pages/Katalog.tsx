import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";

const CITIES = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Solo",
  "Malang",
  "Denpasar",
  "Medan",
  "Palembang",
  "Pekanbaru",
  "Padang",
  "Batam",
  "Pontianak",
  "Banjarmasin",
  "Balikpapan",
  "Samarinda",
  "Makassar",
  "Manado",
  "Jayapura",
];

const Katalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const kategoriFromUrl = searchParams.get("kategori") || "all";
    setSelectedCategory(kategoriFromUrl);
  }, [searchParams]);
  

  // === SEARCH KOTA (TIDAK TERKAIT PRODUK) ===
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const filteredProducts = getProductsByCategory(selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: categoryId });
    }
  };

  const citySuggestions = CITIES.filter((city) =>
    city.toLowerCase().includes(cityQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* ================= HERO ================= */}
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
              Produk dapat dipesan dan dikirim ke seluruh wilayah Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="section-padding bg-background">
        <div className="container-custom">

          {/* ================= SEARCH KOTA ================= */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari kota pengiriman (Jakarta, Bandung, dll)"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setSelectedCity("");
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* AUTOCOMPLETE */}
            {cityQuery && !selectedCity && citySuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-background border border-border rounded-xl shadow-soft overflow-hidden">
                {citySuggestions.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityQuery(city);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-accent transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}

            {selectedCity && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                Produk akan dikirim ke <strong>{selectedCity}</strong>
              </p>
            )}
          </div>

          {/* ================= CATEGORY FILTER ================= */}
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

          {/* ================= PRODUCTS GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Tidak ada produk dalam kategori ini.
              </p>
            </div>
          )}

          {/* COUNT */}
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
