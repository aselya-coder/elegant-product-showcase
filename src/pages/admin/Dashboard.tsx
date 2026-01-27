import { useEffect, useState } from "react";
import { Package, MessageSquare, Inbox, Eye, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  totalProducts: number;
  totalTestimonials: number;
  pendingTestimonials: number;
  totalInquiries: number;
  pendingInquiries: number;
  pageViews: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    pageViews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          productsRes,
          testimonialsRes,
          pendingTestimonialsRes,
          inquiriesRes,
          pendingInquiriesRes,
          statsRes,
        ] = await Promise.all([
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("is_approved", false),
          supabase.from("inquiries").select("id", { count: "exact", head: true }),
          supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("site_stats").select("page_views").order("date", { ascending: false }).limit(30),
        ]);

        const totalPageViews = statsRes.data?.reduce((sum, stat) => sum + (stat.page_views || 0), 0) || 0;

        setStats({
          totalProducts: productsRes.count || 0,
          totalTestimonials: testimonialsRes.count || 0,
          pendingTestimonials: pendingTestimonialsRes.count || 0,
          totalInquiries: inquiriesRes.count || 0,
          pendingInquiries: pendingInquiriesRes.count || 0,
          pageViews: totalPageViews,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Produk",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Testimoni",
      value: stats.totalTestimonials,
      subtitle: `${stats.pendingTestimonials} menunggu approval`,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Inquiry",
      value: stats.totalInquiries,
      subtitle: `${stats.pendingInquiries} pending`,
      icon: Inbox,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Page Views (30 hari)",
      value: stats.pageViews,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang di Admin Panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    {isLoading ? (
                      <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                    ) : (
                      <p className="text-3xl font-bold">{stat.value}</p>
                    )}
                    {stat.subtitle && (
                      <p className="text-xs text-muted-foreground">
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Aksi Cepat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/admin/products"
                className="p-4 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-3"
              >
                <Package className="w-5 h-5 text-primary" />
                <span>Kelola Produk</span>
              </a>
              <a
                href="/admin/testimonials"
                className="p-4 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-3"
              >
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Review Testimoni</span>
              </a>
              <a
                href="/admin/inquiries"
                className="p-4 rounded-lg border border-border hover:bg-accent transition-colors flex items-center gap-3"
              >
                <Inbox className="w-5 h-5 text-primary" />
                <span>Lihat Inquiry</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
