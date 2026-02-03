import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const HomePage = () => {
  const [heroContent, setHeroContent] = useState({
    subtitle: "Premium Gift & Flower Shop",
    title: "Hadirkan Kebahagiaan di",
    titleHighlight: "Setiap Momen",
    description:
      "Buket bunga segar, hampers eksklusif, dan dekorasi premium untuk momen spesial Anda. Pengiriman same-day untuk area Jakarta.",
    ctaPrimary: "Lihat Katalog",
    ctaSecondary: "Konsultasi Gratis",
    statsCustomers: "1000+",
    statsOrders: "5000+",
    statsRating: "4.9",
  });

  const [featuresContent, setFeaturesContent] = useState({
    sectionSubtitle: "Mengapa Kami",
    sectionTitle: "Keunggulan BloomGift",
    sectionDescription:
      "Kami berkomitmen memberikan pengalaman terbaik untuk setiap pelanggan.",
    feature1Title: "Kualitas Premium",
    feature1Desc: "Hanya bunga segar dan produk berkualitas tinggi yang kami pilih untuk Anda.",
    feature2Title: "Pengiriman Cepat",
    feature2Desc: "Same-day delivery untuk area Jakarta dan sekitarnya dengan pengemasan aman.",
    feature3Title: "Layanan 24/7",
    feature3Desc: "Tim customer service siap membantu Anda kapan saja melalui WhatsApp.",
    feature4Title: "Garansi Kepuasan",
    feature4Desc: "Tidak puas? Kami berikan garansi penggantian atau pengembalian dana.",
  });

  const [ctaContent, setCtaContent] = useState({
    title: "Butuh Bantuan Memilih",
    titleHighlight: "Hadiah Sempurna?",
    description:
      "Tim kami siap membantu Anda menemukan produk yang tepat untuk setiap momen spesial. Konsultasikan kebutuhan Anda secara gratis melalui WhatsApp!",
    buttonText: "Chat via WhatsApp",
  });

  const handleSaveHero = () => {
    // In production, this would save to backend
    toast.success("Konten hero section berhasil disimpan");
  };

  const handleSaveFeatures = () => {
    toast.success("Konten keunggulan berhasil disimpan");
  };

  const handleSaveCTA = () => {
    toast.success("Konten CTA berhasil disimpan");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Manajemen Home Page
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola konten halaman beranda website
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Keunggulan</TabsTrigger>
          <TabsTrigger value="cta">CTA Section</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Edit konten utama di bagian atas halaman beranda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={heroContent.subtitle}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, subtitle: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Utama</Label>
                  <Input
                    id="title"
                    value={heroContent.title}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleHighlight">Judul (Highlight)</Label>
                  <Input
                    id="titleHighlight"
                    value={heroContent.titleHighlight}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, titleHighlight: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={heroContent.description}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaPrimary">Tombol Utama</Label>
                  <Input
                    id="ctaPrimary"
                    value={heroContent.ctaPrimary}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, ctaPrimary: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaSecondary">Tombol Sekunder</Label>
                  <Input
                    id="ctaSecondary"
                    value={heroContent.ctaSecondary}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, ctaSecondary: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Statistik</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="statsCustomers">Pelanggan</Label>
                    <Input
                      id="statsCustomers"
                      value={heroContent.statsCustomers}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, statsCustomers: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statsOrders">Pesanan</Label>
                    <Input
                      id="statsOrders"
                      value={heroContent.statsOrders}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, statsOrders: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statsRating">Rating</Label>
                    <Input
                      id="statsRating"
                      value={heroContent.statsRating}
                      onChange={(e) =>
                        setHeroContent({ ...heroContent, statsRating: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveHero} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Section */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Keunggulan</CardTitle>
              <CardDescription>
                Edit konten "Mengapa Memilih BloomGift"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featureSubtitle">Subtitle Section</Label>
                <Input
                  id="featureSubtitle"
                  value={featuresContent.sectionSubtitle}
                  onChange={(e) =>
                    setFeaturesContent({
                      ...featuresContent,
                      sectionSubtitle: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featureTitle">Judul Section</Label>
                <Input
                  id="featureTitle"
                  value={featuresContent.sectionTitle}
                  onChange={(e) =>
                    setFeaturesContent({
                      ...featuresContent,
                      sectionTitle: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featureDesc">Deskripsi Section</Label>
                <Textarea
                  id="featureDesc"
                  value={featuresContent.sectionDescription}
                  onChange={(e) =>
                    setFeaturesContent({
                      ...featuresContent,
                      sectionDescription: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>

              <div className="pt-4 border-t space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="space-y-3">
                    <h3 className="text-sm font-medium">Keunggulan {num}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`feature${num}Title`}>Judul</Label>
                        <Input
                          id={`feature${num}Title`}
                          value={
                            featuresContent[
                              `feature${num}Title` as keyof typeof featuresContent
                            ]
                          }
                          onChange={(e) =>
                            setFeaturesContent({
                              ...featuresContent,
                              [`feature${num}Title`]: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`feature${num}Desc`}>Deskripsi</Label>
                        <Textarea
                          id={`feature${num}Desc`}
                          value={
                            featuresContent[
                              `feature${num}Desc` as keyof typeof featuresContent
                            ]
                          }
                          onChange={(e) =>
                            setFeaturesContent({
                              ...featuresContent,
                              [`feature${num}Desc`]: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveFeatures} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA Section */}
        <TabsContent value="cta" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CTA Section</CardTitle>
              <CardDescription>
                Edit konten section call-to-action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaTitle">Judul</Label>
                  <Input
                    id="ctaTitle"
                    value={ctaContent.title}
                    onChange={(e) =>
                      setCtaContent({ ...ctaContent, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaTitleHighlight">Judul (Highlight)</Label>
                  <Input
                    id="ctaTitleHighlight"
                    value={ctaContent.titleHighlight}
                    onChange={(e) =>
                      setCtaContent({ ...ctaContent, titleHighlight: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaDescription">Deskripsi</Label>
                <Textarea
                  id="ctaDescription"
                  value={ctaContent.description}
                  onChange={(e) =>
                    setCtaContent({ ...ctaContent, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaButton">Teks Tombol</Label>
                <Input
                  id="ctaButton"
                  value={ctaContent.buttonText}
                  onChange={(e) =>
                    setCtaContent({ ...ctaContent, buttonText: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveCTA} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
