import { useState, useEffect } from "react";
import { Check, X, Trash2, Search, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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

  const fetchTestimonials = async () => {
    try {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data testimoni",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string, approve: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: approve })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Berhasil",
        description: approve ? "Testimoni disetujui" : "Testimoni ditolak",
      });
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mengupdate testimoni",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Testimoni berhasil dihapus" });
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus testimoni",
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

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
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Tidak ada testimoni
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{testimonial.name}</span>
                          {testimonial.role && (
                            <span className="text-sm text-muted-foreground">
                              ({testimonial.role})
                            </span>
                          )}
                        </div>
                        {renderStars(testimonial.rating)}
                      </div>
                      <Badge variant={testimonial.is_approved ? "default" : "secondary"}>
                        {testimonial.is_approved ? "Disetujui" : "Pending"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {testimonial.content}
                    </p>

                    {testimonial.product && (
                      <p className="text-xs text-primary">
                        Produk: {testimonial.product}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {new Date(testimonial.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <div className="flex items-center gap-2">
                        {!testimonial.is_approved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(testimonial.id, true)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Setujui
                          </Button>
                        )}
                        {testimonial.is_approved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(testimonial.id, false)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Batalkan
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(testimonial.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
