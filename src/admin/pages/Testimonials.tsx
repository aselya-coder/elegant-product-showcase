import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  useTestimonials, 
  useCreateTestimonial, 
  useUpdateTestimonial, 
  useDeleteTestimonial,
  TESTIMONIALS_QUERY_KEY
} from "@/hooks/useTestimonials";
import { Testimonial, testimonialsApi } from "@/lib/api";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import { useQueryClient } from "@tanstack/react-query";

const Testimonials = () => {
  const queryClient = useQueryClient();
  const { data: testimonials = [], isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  // Auto-sync default testimonials if list is empty
  useEffect(() => {
    if (!isLoading && testimonials.length === 0) {
      const syncDefaultTestimonials = async () => {
        try {
          let count = 0;
          for (const t of defaultTestimonials) {
            await testimonialsApi.create({
              name: t.name,
              role: t.role,
              content: t.content,
              rating: t.rating,
              product: t.product,
              is_approved: true,
            });
            count++;
          }
          
          if (count > 0) {
            toast.success(`Data testimoni berhasil diinisialisasi (${count} testimoni)`);
            queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
          }
        } catch (error) {
          console.error("Failed to auto-sync testimonials:", error);
        }
      };
      
      syncDefaultTestimonials();
    }
  }, [isLoading, testimonials.length, queryClient]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTestimonials = useMemo(() => {
    return searchQuery
      ? testimonials.filter((t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.product && t.product.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : testimonials;
  }, [testimonials, searchQuery]);

  const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
  const paginatedTestimonials = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTestimonials.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTestimonials, currentPage]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    product: "",
  });

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        role: testimonial.role || "",
        content: testimonial.content,
        rating: testimonial.rating,
        product: testimonial.product || "",
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        role: "",
        content: "",
        rating: 5,
        product: "",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    // Validasi field wajib
    if (!formData.name) {
      toast.error("Nama pelanggan wajib diisi");
      return;
    }
    if (!formData.content) {
      toast.error("Isi testimoni wajib diisi");
      return;
    }

    try {
      if (editingTestimonial) {
        await updateMutation.mutateAsync({
          id: editingTestimonial.id,
          updates: formData,
        });
        toast.success("Testimoni berhasil diupdate");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Testimoni berhasil ditambahkan");
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error saving testimonial:", error);
    }
  };

  const handleDelete = async () => {
    if (deletingTestimonial) {
      try {
        await deleteMutation.mutateAsync(deletingTestimonial.id);
        toast.success("Testimoni berhasil dihapus");
        setDeleteDialogOpen(false);
        setDeletingTestimonial(null);
      } catch (error) {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Manajemen Testimoni
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola testimoni pelanggan
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Testimoni
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari testimoni berdasarkan nama, isi, atau produk..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Testimoni ({filteredTestimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Testimoni</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTestimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Tidak ada testimoni ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                    <TableCell>{testimonial.role}</TableCell>
                    <TableCell>
                      <p className="line-clamp-2 max-w-md">{testimonial.content}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.product || "-"}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(testimonial)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeletingTestimonial(testimonial);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {filteredTestimonials.length > 0 && (
            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTestimonials.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredTestimonials.length)} dari {filteredTestimonials.length} testimoni
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Sebelumnya
                </Button>
                <div className="flex items-center px-2 text-sm font-medium">
                  Halaman {currentPage} dari {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimoni" : "Tambah Testimoni Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk {editingTestimonial ? "mengubah" : "menambahkan"} testimoni pelanggan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Pelanggan *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Sarah Wijaya"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role/Pekerjaan</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Contoh: Pengusaha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Isi Testimoni *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis testimoni pelanggan..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: value })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        value <= formData.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Nama Produk (Opsional)</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="Contoh: Buket Mawar Merah Premium"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Testimoni</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus testimoni ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Apakah Anda yakin ingin menghapus testimoni dari{" "}
              <span className="font-medium text-foreground">
                {deletingTestimonial?.name}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Testimonials;
