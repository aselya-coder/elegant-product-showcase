import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { citiesByIsland } from "@/data/citiesByIsland";
import { toast } from "sonner";
import { useCities, useSaveCities, CITIES_QUERY_KEY } from "@/hooks/useCities";
import { useQueryClient } from "@tanstack/react-query";

interface CityData {
  id: string;
  city: string;
  island: string;
  whatsappNumber: string;
  isActive: boolean;
}

const Cities = () => {
  const queryClient = useQueryClient();
  const { data: remoteCities = [], isLoading } = useCities();
  const saveMutation = useSaveCities();

  // const [cities, setCities] = useState<CityData[]>([]); // Removed to fix infinite loop
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityData | null>(null);
  const [deletingCity, setDeletingCity] = useState<CityData | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    island: "",
    whatsappNumber: "6285646420488",
    isActive: true,
  });

  const islands = ["jawa", "sumatra", "kalimantan", "sulawesi", "bali", "papua_maluku"];
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    return searchQuery
      ? remoteCities.filter((c) =>
          c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.island.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : remoteCities;
  }, [remoteCities, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCities.length / ITEMS_PER_PAGE);
  const paginatedCities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCities, currentPage]);

  const handleSync = async () => {
    if (!confirm("Are you sure you want to sync cities from default data? This will overwrite existing configuration.")) {
      return;
    }
    
    setIsSyncing(true);
    try {
      const allCities: CityData[] = [];
      Object.entries(citiesByIsland).forEach(([island, cityList]) => {
        cityList.forEach((city) => {
          allCities.push({
            id: `${island}-${city}`.toLowerCase().replace(/\s+/g, '-'),
            city,
            island,
            whatsappNumber: "6285646420488",
            isActive: true,
          });
        });
      });
      
      await saveMutation.mutateAsync(allCities);
      toast.success(`Successfully synced ${allCities.length} cities`);
      // No need to invalidate manually as mutation does it, but local state update will happen via useEffect
    } catch (error: any) {
      console.error(error);
      const isAuthError = error.status === 401 || error.message?.includes('401') || error.message?.includes('security policy');
      
      if (isAuthError) {
        toast.error("Gagal: Izin ditolak. Pastikan Anda sudah login atau jalankan script setup database.");
      } else {
        toast.error(`Gagal melakukan sinkronisasi: ${error.message || "Unknown error"}`);
      }
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Replaced loadCities with effect from remote data
  
  const handleOpenDialog = (city?: CityData) => {
    if (city) {
      setEditingCity(city);
      setFormData({
        city: city.city,
        island: city.island,
        whatsappNumber: city.whatsappNumber,
        isActive: city.isActive,
      });
    } else {
      setEditingCity(null);
      setFormData({
        city: "",
        island: "",
        whatsappNumber: "6285646420488",
        isActive: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.city || !formData.island) {
      toast.error("Mohon lengkapi field yang wajib diisi");
      return;
    }

    try {
      let updatedCities = [...remoteCities];
      
      if (editingCity) {
        updatedCities = updatedCities.map((c) =>
          c.id === editingCity.id
            ? { ...c, ...formData }
            : c
        );
        toast.success("Kota berhasil diupdate");
      } else {
        updatedCities.push({
          id: `${formData.island}-${formData.city}`.toLowerCase().replace(/\s+/g, '-'),
          ...formData,
        });
        toast.success("Kota berhasil ditambahkan");
      }
      
      await saveMutation.mutateAsync(updatedCities);
      setDialogOpen(false);
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      
      const isConflictError = error.status === 409 || error.message?.includes('409') || error.message?.includes('conflict');
      if (isConflictError) {
        toast.error("Gagal: Data konflik. Mungkin data sudah ada.");
      }
      
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (deletingCity) {
      try {
        const updatedCities = remoteCities.filter((c) => c.id !== deletingCity.id);
        await saveMutation.mutateAsync(updatedCities);
        toast.success("Kota berhasil dihapus");
        setDeleteDialogOpen(false);
        setDeletingCity(null);
      } catch (error) {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
        console.error(error);
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
            Manajemen Kota & Wilayah
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola daftar kota dan cakupan wilayah pengiriman
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            Sync Default Data
          </Button>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Kota
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari kota atau pulau..."
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

      {/* Cities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kota ({filteredCities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kota</TableHead>
                <TableHead>Pulau</TableHead>
                <TableHead>Nomor WhatsApp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Tidak ada kota ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCities.map((city) => (
                  <TableRow key={city.id}>
                    <TableCell className="font-medium">{city.city}</TableCell>
                    <TableCell className="capitalize">{city.island.replace("_", " & ")}</TableCell>
                    <TableCell className="font-mono text-sm">{city.whatsappNumber}</TableCell>
                    <TableCell>
                      <Badge variant={city.isActive ? "default" : "secondary"}>
                        {city.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(city)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeletingCity(city);
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
          {filteredCities.length > 0 && (
            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredCities.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredCities.length)} dari {filteredCities.length} kota
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCity ? "Edit Kota" : "Tambah Kota Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk {editingCity ? "mengubah data" : "menambahkan"} kota.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="city">Nama Kota *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Contoh: Jakarta Pusat"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="island">Pulau *</Label>
              <Select
                value={formData.island}
                onValueChange={(value) => setFormData({ ...formData, island: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pulau" />
                </SelectTrigger>
                <SelectContent>
                  {islands.map((island) => (
                    <SelectItem key={island} value={island} className="capitalize">
                      {island.replace("_", " & ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp *</Label>
              <Input
                id="whatsapp"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappNumber: e.target.value })
                }
                placeholder="628xxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Format: kode negara + nomor (tanpa + atau spasi)
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Label htmlFor="isActive">Status Aktif</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Kota</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kota ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Apakah Anda yakin ingin menghapus kota{" "}
              <span className="font-medium text-foreground">
                {deletingCity?.city}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cities;
