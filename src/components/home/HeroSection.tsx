import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wider uppercase text-sm">
                Premium Gift & Flower Shop
              </p>
              <h1 className="heading-display text-foreground">
                Hadirkan Kebahagiaan di{" "}
                <span className="text-primary">Setiap Momen</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Buket bunga segar, hampers eksklusif, dan dekorasi premium untuk 
                momen spesial Anda. Pengiriman same-day untuk area Jakarta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/katalog">
                <Button size="lg" className="btn-primary rounded-full px-8 gap-2 group">
                  Lihat Katalog
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a
                href={getWhatsAppUrl(WHATSAPP_CONFIG.consultationMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-outline-gold rounded-full px-8"
                >
                  Konsultasi Gratis
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Pelanggan Puas</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">Pesanan Terkirim</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[450px]">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[3/4]">
                  <img 
                    src={heroImage} 
                    alt="BloomGift - Buket Bunga dan Hampers Premium" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-5 -right-5 w-full h-full border-2 border-primary/30 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
