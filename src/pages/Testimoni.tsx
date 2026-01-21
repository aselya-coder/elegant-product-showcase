import { Star, Quote } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";

const Testimoni = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-primary font-medium tracking-wider uppercase text-sm">
              Testimoni
            </p>
            <h1 className="heading-display text-foreground">
              Kepuasan <span className="text-primary">Pelanggan</span> Kami
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Baca pengalaman nyata dari ribuan pelanggan yang telah mempercayakan 
              momen spesial mereka kepada BloomGift.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card p-8 rounded-xl shadow-soft hover:shadow-card transition-shadow duration-300 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 leading-relaxed mb-6 italic relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-heading text-lg font-medium text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Product Badge */}
                {testimonial.product && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Produk: <span className="text-primary">{testimonial.product}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="heading-section">
              Ingin Menjadi Pelanggan <span className="text-primary">Berikutnya?</span>
            </h2>
            <p className="text-background/70 text-lg leading-relaxed">
              Bergabunglah dengan ribuan pelanggan puas lainnya. Hubungi kami 
              sekarang dan rasakan pelayanan terbaik dari BloomGift!
            </p>
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.consultationMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-8 mt-4"
              >
                Hubungi Kami via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimoni;
