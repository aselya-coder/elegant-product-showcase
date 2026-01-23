import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "@/config/whatsapp";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Raya Janti Gg. Harjuna No.59, Jaranan, Karangjambe, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198",
    action: null,
  },
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    content: "+62 856 4642 0488",
    action: getWhatsAppUrl(),
  },
  {
    icon: Mail,
    title: "Email",
    content: "hello@bloomgift.id",
    action: "mailto:hello@bloomgift.id",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    content: "Senin - Sabtu: 08.00 - 20.00\nMinggu: 09.00 - 17.00",
    action: null,
  },
];

const Kontak = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-primary font-medium tracking-wider uppercase text-sm">
              Hubungi Kami
            </p>
            <h1 className="heading-display text-foreground">
              Kami Siap <span className="text-primary">Membantu</span> Anda
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ada pertanyaan atau ingin berkonsultasi? Jangan ragu untuk 
              menghubungi kami. Tim kami siap melayani Anda dengan senang hati.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-section text-foreground mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-muted-foreground">
                  Pilih cara yang paling nyaman untuk menghubungi kami.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-soft space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-foreground">
                      {info.title}
                    </h3>
                    {info.action ? (
                      <a
                        href={info.action}
                        target={info.action.startsWith("http") ? "_blank" : undefined}
                        rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors block whitespace-pre-line"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-medium text-foreground">
                  Ikuti Kami
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-whatsapp hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-foreground text-background rounded-2xl p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-whatsapp flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                  Cara Tercepat untuk <span className="text-primary">Menghubungi</span> Kami
                </h2>
                <p className="text-background/70 leading-relaxed">
                  Langsung chat dengan tim kami via WhatsApp untuk respon cepat. 
                  Kami siap membantu Anda memilih produk yang tepat dan menjawab 
                  semua pertanyaan Anda.
                </p>
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
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted">
        <div className="container-custom py-8">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-card shadow-soft flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-heading text-xl text-foreground mb-2">
                Lokasi Kami
              </p>
              <p className="text-muted-foreground">
                Jl. Raya Janti Gg. Harjuna No.59,<br />
                Jaranan, Karangjambe, Kec. Banguntapan,<br />
                Kabupaten Bantul,<br />
                Daerah Istimewa Yogyakarta 55198
              </p>

              <a
                href="https://maps.app.goo.gl/X7LXYqo4MwvhJS3X7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4"
              >
                <Button variant="outline" className="btn-outline-gold rounded-full">
                  Lihat di Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
