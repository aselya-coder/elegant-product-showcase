import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Award } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Setiap produk dibuat dengan cinta dan dedikasi tinggi.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Kepuasan pelanggan adalah prioritas utama kami.",
  },
  {
    icon: Target,
    title: "Quality",
    description: "Hanya bahan berkualitas premium yang kami gunakan.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Selalu berusaha memberikan yang terbaik.",
  },
];

const TentangKami = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-primary font-medium tracking-wider uppercase text-sm">
              Tentang Kami
            </p>
            <h1 className="heading-display text-foreground">
              Cerita di Balik <span className="text-primary">BloomGift</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bermula dari passion terhadap keindahan dan keinginan untuk 
              menyebarkan kebahagiaan melalui hadiah yang bermakna.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card bg-gradient-to-br from-rose-light to-champagne flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-5xl">💐</span>
                  </div>
                  <p className="font-heading text-xl text-foreground">Since 2018</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-2xl -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="heading-section text-foreground">
                Perjalanan Kami
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BloomGift didirikan pada tahun 2018 dengan visi sederhana namun 
                  kuat: membantu orang-orang mengekspresikan perasaan mereka melalui 
                  hadiah yang indah dan bermakna.
                </p>
                <p>
                  Berawal dari usaha rumahan kecil, kini BloomGift telah berkembang 
                  menjadi salah satu toko bunga dan hadiah premium terpercaya di 
                  Jakarta. Kami melayani ribuan pelanggan setiap bulannya, dari 
                  individu hingga perusahaan besar.
                </p>
                <p>
                  Setiap buket, hampers, dan dekorasi yang kami buat adalah hasil 
                  dari kerja sama tim yang solid, kreativitas tanpa batas, dan 
                  komitmen untuk selalu memberikan yang terbaik.
                </p>
              </div>
              <a
                href={getWhatsAppUrl(WHATSAPP_CONFIG.consultationMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-primary rounded-full px-8 mt-4">
                  Hubungi Kami
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="heading-section text-foreground">
              Nilai-Nilai Kami
            </h2>
            <p className="text-muted-foreground">
              Prinsip yang menjadi fondasi dalam setiap langkah kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl text-center space-y-4 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-medium text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="font-heading text-4xl md:text-5xl font-semibold text-primary">6+</p>
              <p className="text-background/70">Tahun Pengalaman</p>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-4xl md:text-5xl font-semibold text-primary">5000+</p>
              <p className="text-background/70">Pesanan Terkirim</p>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-4xl md:text-5xl font-semibold text-primary">1000+</p>
              <p className="text-background/70">Pelanggan Puas</p>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-4xl md:text-5xl font-semibold text-primary">4.9</p>
              <p className="text-background/70">Rating Kepuasan</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TentangKami;
