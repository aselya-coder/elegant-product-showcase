import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";

const CTASection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="heading-section">
            Butuh Bantuan Memilih <span className="text-primary">Hadiah Sempurna?</span>
          </h2>
          <p className="text-background/70 text-lg leading-relaxed">
            Tim kami siap membantu Anda menemukan produk yang tepat untuk setiap 
            momen spesial. Konsultasikan kebutuhan Anda secara gratis melalui WhatsApp!
          </p>
          <div className="pt-4">
            <a
              href={getWhatsAppUrl(WHATSAPP_CONFIG.consultationMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-8 gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
