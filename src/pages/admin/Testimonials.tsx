import { useState, useEffect, useCallback } from "react";
import { Check, X, Trash2, Search, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  product: string | null;
  is_approved: boolean | null;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const { toast } = useToast();

  const fetchTestimonials = useCallback(async () => {
    try {
      const query = supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setTestimonials(data ?? []);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Gagal memuat data testimoni";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleApprove = async (id: string, approve: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: approve })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: approve
          ? "Testimoni disetujui"
          : "Testimoni dibatalkan",
      });

      fetchTestimonials();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Gagal mengupdate testimoni";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Testimoni berhasil dihapus",
      });

      fetchTestimonials();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Gagal menghapus testimoni";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "pending") return matchesSearch && !t.is_approved;
    if (filter === "approved") return matchesSearch && t.is_approved;
    return matchesSearch;
  });

  const pendingCount = testimonials.filter((t) => !t.is_approved).length;

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Testimoni</h1>
          <p className="text-muted-foreground mt-1">
            Kelola dan moderasi testimoni pelanggan
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari testimoni..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Semua ({testimonials.length})
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                >
                  Pending ({pendingCount})
                </Button>
                <Button
                  variant={filter === "approved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("approved")}
                >
                  Disetujui
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Tidak ada testimoni
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{t.name}</p>
                        {renderStars(t.rating)}
                      </div>
                      <Badge variant={t.is_approved ? "default" : "secondary"}>
                        {t.is_approved ? "Disetujui" : "Pending"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{t.content}</p>

                    <div className="flex justify-end gap-2">
                      {!t.is_approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(t.id, true)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Setujui
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(t.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
