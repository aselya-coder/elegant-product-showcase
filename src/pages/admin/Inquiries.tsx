import { useState, useEffect } from "react";
import { Phone, Mail, MessageSquare, Search, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Inquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  product_name: string | null;
  message: string;
  status: string | null;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  contacted: "Sudah Dihubungi",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data inquiry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Berhasil",
        description: "Status inquiry diperbarui",
      });
      fetchInquiries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mengupdate status",
        variant: "destructive",
      });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ notes })
        .eq("id", selectedInquiry.id);

      if (error) throw error;
      
      toast({
        title: "Berhasil",
        description: "Catatan disimpan",
      });
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menyimpan catatan",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0") 
      ? "62" + cleanPhone.slice(1) 
      : cleanPhone;
    const message = encodeURIComponent(`Halo ${name}, terima kasih telah menghubungi kami.`);
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
  };

  const filteredInquiries = inquiries.filter((i) => {
    const matchesSearch = 
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.phone.includes(searchQuery) ||
      (i.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && i.status === statusFilter;
  });

  const pendingCount = inquiries.filter((i) => i.status === "pending").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Inquiry</h1>
          <p className="text-muted-foreground mt-1">
            Kelola pesan dan pesanan dari pelanggan
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama atau nomor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Semua ({inquiries.length})
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending ({pendingCount})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Tidak ada inquiry
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{inquiry.name}</span>
                          <Badge className={statusColors[inquiry.status || "pending"]}>
                            {statusLabels[inquiry.status || "pending"]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inquiry.phone}
                          </span>
                          {inquiry.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {inquiry.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inquiry.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {inquiry.product_name && (
                      <p className="text-xs text-primary">
                        Produk: {inquiry.product_name}
                      </p>
                    )}
                    
                    <p className="text-sm text-muted-foreground">
                      <MessageSquare className="w-3 h-3 inline mr-1" />
                      {inquiry.message}
                    </p>

                    {inquiry.notes && (
                      <p className="text-xs bg-muted p-2 rounded">
                        <strong>Catatan:</strong> {inquiry.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Select
                          value={inquiry.status || "pending"}
                          onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-40 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Sudah Dihubungi</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setNotes(inquiry.notes || "");
                          }}
                        >
                          Catatan
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openWhatsApp(inquiry.phone, inquiry.name)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Dialog */}
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Catatan untuk {selectedInquiry?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis catatan di sini..."
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                  Batal
                </Button>
                <Button onClick={handleSaveNotes} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
