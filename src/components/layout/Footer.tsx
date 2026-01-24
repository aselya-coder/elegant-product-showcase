import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl } from "@/config/whatsapp";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold">
                Bloom<span className="text-primary">Gift</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Hadirkan kebahagiaan melalui bunga segar, hampers eksklusif, dan 
              dekorasi premium untuk setiap momen spesial Anda.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-whatsapp transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Menu</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/katalog" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link to="/testimoni" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Kategori</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/katalog?kategori=buket-bunga" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Buket Bunga
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategori=hampers" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Hampers
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategori=kue-tart" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Kue & Tart
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategori=dekorasi" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Dekorasi
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategori=papan-bunga" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Papan Bunga
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategori=parsel-natal" className="text-background/70 hover:text-primary transition-colors text-sm">
                  Parsel Natal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                Jl. Raya Janti Gg. Harjuna No.59, Jaranan, Karangjambe, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={getWhatsAppUrl()} className="text-background/70 hover:text-primary transition-colors text-sm">
                  +62 856 4642 0488
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-background/70 text-sm">
                  hello@bloomgift.id
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Senin - Sabtu: 08.00 - 20.00<br />
                  Minggu: 09.00 - 17.00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} BloomGift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
