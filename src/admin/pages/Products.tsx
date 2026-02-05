import { useState, useEffect, useMemo } from "react";
import { Plus, Pencil, Trash2, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { categories, products as defaultProducts } from "@/data/products";
import { toast } from "sonner";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  PRODUCTS_QUERY_KEY,
} from "@/hooks/useProducts";
import { Product, productsApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { uploadProductImage } from "@/lib/storage";

const Products = () => {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  // Auto-sync default products if list is empty
  useEffect(() => {
    if (!isLoading && products.length === 0) {
      const syncDefaultProducts = async () => {
        try {
          let count = 0;
          for (const p of defaultProducts) {
            await productsApi.upsert({
              slug: p.slug,
              name: p.name,
              price: p.price,
              original_price: p.originalPrice,
              category: p.category,
              description: p.description,
              image_url: p.images[0],
              is_active: p.isActive ?? true,
              is_featured: p.featured ?? false,
              is_best_seller: p.bestSeller ?? false,
              is_exclusive: p.exclusive ?? false,
              is_premium: p.premium ?? false,
            });
            count++;
          }
          if (count > 0) {
            toast.success(`Data produk berhasil diinisialisasi (${count} produk)`);
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
          }
        } catch (error) {
          console.error("Failed to auto-sync products:", error);
        }
      };

      syncDefaultProducts();
    }
  }, [isLoading, products.length, queryClient]);

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    original_price: 0,
    description: "",
    category: "",
    slug: "",
    image_url: "",
    product_url: "",
    is_active: true,
    is_featured: false,
    is_best_seller: false,
    is_exclusive: false,
    is_premium: false,
  });

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return searchQuery
      ? products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;
  }, [products, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleOpenDialog = (product?: Product) => {
    setSelectedFile(null);
    if (product) {
      setEditingProduct(product);
      setImagePreview(product.image_url || null);
      setFormData({
        name: product.name,
        price: product.price,
        original_price: product.original_price || 0,
        description: product.description || "",
        category: product.category,
        slug: product.slug,
        image_url: product.image_url || "",
        product_url: product.product_url || "",
        is_active: product.is_active ?? true,
        is_featured: product.is_featured ?? false,
        is_best_seller: product.is_best_seller ?? false,
        is_exclusive: product.is_exclusive ?? false,
        is_premium: product.is_premium ?? false,
      });
    } else {
      setEditingProduct(null);
      setImagePreview(null);
      setFormData({
        name: "",
        price: 0,
        original_price: 0,
        description: "",
        category: "",
        slug: "",
        image_url: "",
        product_url: "",
        is_active: true,
        is_featured: false,
        is_best_seller: false,
        is_exclusive: false,
        is_premium: false,
      });
    }
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const result = await uploadProductImage(file);
    
    if (!result.success) {
      throw new Error(result.error || "Gagal mengupload gambar");
    }
    
    return result.url!;
  };

  const handleSave = async () => {
    // Validasi field wajib
    if (!formData.name) {
      toast.error("Nama produk wajib diisi");
      return;
    }
    if (!formData.category) {
      toast.error("Kategori wajib dipilih");
      return;
    }
    if (!formData.price) {
      toast.error("Harga produk wajib diisi");
      return;
    }

    try {
      let imageUrl = formData.image_url;

      // Handle Image Upload
      if (selectedFile) {
        setIsUploading(true);
        try {
          imageUrl = await uploadImage(selectedFile);
          toast.success("Gambar berhasil diupload ke Supabase");
        } catch (error) {
          console.error("Upload failed:", error);
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Gagal mengupload gambar";
          toast.error(errorMessage);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          updates: { ...formData, image_url: imageUrl },
        });
        toast.success("Produk berhasil diupdate");
      } else {
        const slug = formData.slug || formData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        await createMutation.mutateAsync({
          ...formData,
          image_url: imageUrl,
          slug,
        });
        toast.success("Produk berhasil ditambahkan");
      }
      setDialogOpen(false);
    } catch (error) {
      setIsUploading(false);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error saving product:", error);
      if (typeof error === 'object' && error !== null) {
         console.error("Error details:", JSON.stringify(error, null, 2));
      }
    }
  };

  const handleDelete = async () => {
    if (deletingProduct) {
      try {
        await deleteMutation.mutateAsync(deletingProduct.id);
        toast.success("Produk berhasil dihapus");
        setDeleteDialogOpen(false);
        setDeletingProduct(null);
      } catch (error) {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
        console.error("Error deleting product:", error);
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
            Manajemen Produk
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola semua produk di katalog
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk berdasarkan nama atau kategori..."
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nama Produk</TableHead>
                <TableHead className="w-[150px]">Kategori</TableHead>
                <TableHead className="w-[150px]">Harga</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="min-w-[200px]">Label</TableHead>
                <TableHead className="text-right w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    Tidak ada produk ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="py-4">
                      <div className="font-medium text-base">{product.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {categories.find((c) => c.id === product.category)?.name ||
                          product.category}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-base">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        {(product.original_price || 0) > 0 && (
                          <span className="text-xs text-red-500 line-through">
                            Rp {(product.original_price || 0).toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          product.is_active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.is_active ? "bg-green-600" : "bg-red-600"}`}></span>
                        {product.is_active ? "Aktif" : "Nonaktif"}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-2">
                        {product.is_featured && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100">
                            Unggulan
                          </Badge>
                        )}
                        {product.is_best_seller && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                            Best Seller
                          </Badge>
                        )}
                        {product.is_exclusive && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
                            Exclusive
                          </Badge>
                        )}
                        {product.is_premium && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                            Premium
                          </Badge>
                        )}
                        {!product.is_featured && !product.is_best_seller && !product.is_exclusive && !product.is_premium && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Lihat Produk"
                        >
                          <a 
                            href={`/produk/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeletingProduct(product);
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
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} dari {filteredProducts.length} produk
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingProduct ? "mengedit" : "menambahkan"} produk.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Produk *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Buket Mawar Merah Premium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  placeholder="350000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Harga Coret (Opsional)</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={(e) =>
                    setFormData({ ...formData, original_price: Number(e.target.value) })
                  }
                  placeholder="Isi jika ada diskon"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="buket-mawar-merah"
              />
              <p className="text-xs text-muted-foreground">
                Biarkan kosong untuk generate otomatis dari nama produk
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product_url">Link Eksternal / Marketplace (Opsional)</Label>
              <Input
                id="product_url"
                value={formData.product_url}
                onChange={(e) =>
                  setFormData({ ...formData, product_url: e.target.value })
                }
                placeholder="https://tokopedia.com/..."
              />
              <p className="text-xs text-muted-foreground">
                Jika diisi, tombol "Pesan Sekarang" akan mengarah ke link ini langsung.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c.id !== "all").map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Gambar Produk</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-xs text-center p-2">
                      No Image
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    id="image_upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <div className="text-xs text-muted-foreground">
                    Atau gunakan URL gambar eksternal:
                  </div>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Lengkap</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Deskripsi lengkap produk"
                rows={4}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Status Aktif</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">Produk Unggulan</Label>
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_best_seller">Best Seller</Label>
                <Switch
                  id="is_best_seller"
                  checked={formData.is_best_seller}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_best_seller: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_exclusive">Exclusive</Label>
                <Switch
                  id="is_exclusive"
                  checked={formData.is_exclusive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_exclusive: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_premium">Premium</Label>
                <Switch
                  id="is_premium"
                  checked={formData.is_premium}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_premium: checked })
                  }
                />
              </div>
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
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk{" "}
              <span className="font-medium text-foreground">
                {deletingProduct?.name}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
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

export default Products;
