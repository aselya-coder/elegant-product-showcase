import { Package, MessageSquare, MapPin, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { citiesByIsland } from "@/data/citiesByIsland";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive !== false).length;
  const totalTestimonials = testimonials.length;
  const totalCities = Object.values(citiesByIsland).flat().length;

  const stats = [
    {
      title: "Total Produk",
      value: totalProducts,
      subtitle: `${activeProducts} aktif`,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      link: "/admin/products",
    },
    {
      title: "Testimoni",
      value: totalTestimonials,
      subtitle: "Total testimoni",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
      link: "/admin/testimonials",
    },
    {
      title: "Kota Aktif",
      value: totalCities,
      subtitle: "Wilayah terdaftar",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      link: "/admin/cities",
    },
    {
      title: "WhatsApp",
      value: WHATSAPP_CONFIG.phoneNumber,
      subtitle: "Nomor aktif",
      icon: MessageCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      link: "/admin/whatsapp",
    },
  ];

  const quickActions = [
    { label: "Tambah Produk", href: "/admin/products" },
    { label: "Kelola Home Page", href: "/admin/home" },
    { label: "Tambah Testimoni", href: "/admin/testimonials" },
    { label: "Pengaturan WhatsApp", href: "/admin/whatsapp" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Dashboard Admin
        </h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di panel admin BloomGift
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-card transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.href}>
                <Button variant="outline" className="w-full">
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produk Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary ml-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimoni Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testimonials.slice(0, 5).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <span className="text-xs font-medium text-primary">
                        {testimonial.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">⭐</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
