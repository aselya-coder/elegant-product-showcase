import { Truck, Award, Clock, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Kualitas Premium",
    description: "Hanya bunga segar dan produk berkualitas tinggi yang kami pilih untuk Anda.",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    description: "Same-day delivery untuk area Jakarta dan sekitarnya dengan pengemasan aman.",
  },
  {
    icon: Clock,
    title: "Layanan 24/7",
    description: "Tim customer service siap membantu Anda kapan saja melalui WhatsApp.",
  },
  {
    icon: HeartHandshake,
    title: "Garansi Kepuasan",
    description: "Tidak puas? Kami berikan garansi penggantian atau pengembalian dana.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-primary font-medium tracking-wider uppercase text-sm">
            Mengapa Kami
          </p>
          <h2 className="heading-section text-foreground">
            Keunggulan BloomGift
          </h2>
          <p className="text-muted-foreground">
            Kami berkomitmen memberikan pengalaman terbaik untuk setiap pelanggan.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl text-center space-y-4 shadow-soft hover:shadow-card transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
