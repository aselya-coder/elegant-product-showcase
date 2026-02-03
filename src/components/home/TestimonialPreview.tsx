import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialPreview = () => {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const previewTestimonials = testimonials.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-primary font-medium tracking-wider uppercase text-sm">
            Testimoni
          </p>
          <h2 className="heading-section text-foreground">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-muted-foreground">
            Kepuasan pelanggan adalah prioritas utama kami. Lihat apa kata mereka 
            tentang produk dan layanan BloomGift.
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat testimoni...</p>
          </div>
        ) : previewTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada testimoni</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-xl shadow-soft hover:shadow-card transition-shadow duration-300"
            >
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
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
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
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/testimoni">
            <Button
              variant="outline"
              size="lg"
              className="btn-outline-gold rounded-full px-8 gap-2 group"
            >
              Lihat Semua Testimoni
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPreview;
