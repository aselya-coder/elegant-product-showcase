import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, X, MapPin } from "lucide-react";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import { citiesByIsland } from "@/data/citiesByIsland";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

// Gabungkan semua kota dari seluruh pulau
const ALL_CITIES = Object.values(citiesByIsland).flat();

const Katalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("kategori") || "all"
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("kategori") || "all");
  }, [searchParams]);

  /* ===== SEARCH PRODUK ===== */
  const [productQuery, setProductQuery] = useState("");

  /* ===== SEARCH KOTA ===== */
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showCitySuggestion, setShowCitySuggestion] = useState(false);

  // Filter kota berdasarkan query
  const citySuggestions = useMemo(() => {
    if (!cityQuery.trim() || selectedCity) return [];
    return ALL_CITIES.filter((city) =>
      city.toLowerCase().includes(cityQuery.toLowerCase())
    ).slice(0, 15);
  }, [cityQuery, selectedCity]);

  /* ===== PRICE FILTER ===== */
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  /* ===== SORTING ===== */
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  /* ===== SHOW FILTERS (mobile) ===== */
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: categoryId });
    }
  };

  /* ===== FILTERED & SORTED PRODUCTS ===== */
  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(selectedCategory);

    // Filter by product name search
    if (productQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(productQuery.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort by price
    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, productQuery, priceRange, sortOrder]);

  const resetFilters = () => {
    setProductQuery("");
    setCityQuery("");
    setSelectedCity("");
    setPriceRange([minPrice, maxPrice]);
    setSortOrder("none");
    setSelectedCategory("all");
    setSearchParams({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilters = productQuery || selectedCity || priceRange[0] > minPrice || priceRange[1] < maxPrice || sortOrder !== "none";

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

          {/* SEARCH & FILTER BAR */}
          <div className="space-y-4 mb-8">
            {/* Product Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {productQuery && (
                <button
                  onClick={() => setProductQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter & Sorting
              </Button>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-primary">
                  <X className="w-4 h-4 mr-1" />
                  Reset Filter
                </Button>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="p-6 bg-card border border-border rounded-xl space-y-6 animate-in fade-in slide-in-from-top-2">
                {/* Price Range */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Rentang Harga</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      min={minPrice}
                      max={maxPrice}
                      step={50000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Sorting */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4" />
                    Urutkan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSortOrder("none")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        sortOrder === "none"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => setSortOrder("asc")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        sortOrder === "asc"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      Termurah
                    </button>
                    <button
                      onClick={() => setSortOrder("desc")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        sortOrder === "desc"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      Termahal
                    </button>
                  </div>
                </div>

                {/* City Search */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Kota Pengiriman
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={cityQuery}
                      onFocus={() => setShowCitySuggestion(true)}
                      onBlur={() => setTimeout(() => setShowCitySuggestion(false), 200)}
                      onChange={(e) => {
                        setCityQuery(e.target.value);
                        setSelectedCity("");
                      }}
                      placeholder="Cari kota di seluruh Indonesia..."
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    {cityQuery && (
                      <button
                        onClick={() => {
                          setCityQuery("");
                          setSelectedCity("");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {/* AUTOCOMPLETE DROPDOWN */}
                    {showCitySuggestion && citySuggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-xl shadow-lg max-h-56 overflow-auto">
                        {citySuggestions.map((city) => (
                          <button
                            key={city}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setSelectedCity(city);
                              setCityQuery(city);
                              setShowCitySuggestion(false);
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedCity && (
                    <p className="text-sm text-primary">
                      ✓ Pengiriman tersedia ke <strong>{selectedCity}</strong>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
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
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                Tidak ada produk yang ditemukan
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          )}

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
