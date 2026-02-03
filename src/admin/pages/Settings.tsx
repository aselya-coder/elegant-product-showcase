import { useState, useEffect } from "react";
import { Save, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigation, useSaveNavigation } from "@/hooks/useNavigation";
import { MenuItem } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Settings = () => {
  // Navigation settings component
  const { data: serverNavigation } = useNavigation();
  const { mutate: saveNavigation, isPending: isSaving } = useSaveNavigation();

  const [navigation, setNavigation] = useState<MenuItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);

  const [footer, setFooter] = useState({
    brandDescription:
      "Hadirkan kebahagiaan melalui bunga segar, hampers eksklusif, dan dekorasi premium untuk setiap momen spesial Anda.",
    address: "Jl. Raya Janti Gg. Harjuna No.59, Jaranan, Karangjambe, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198",
    phone: "+62 856 4642 0488",
    email: "hello@bloomgift.id",
    hours: "Senin - Sabtu: 08.00 - 20.00\nMinggu: 09.00 - 17.00",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  });

  useEffect(() => {
    if (serverNavigation) {
      setNavigation(serverNavigation);
    }
  }, [serverNavigation]);

  const handleSaveNavigation = () => {
    saveNavigation(navigation, {
      onSuccess: () => toast.success("Navigasi berhasil disimpan"),
      onError: () => toast.error("Gagal menyimpan navigasi"),
    });
  };

  const handleSaveFooter = () => {
    toast.success("Footer berhasil disimpan");
  };

  const toggleMenuVisibility = (id: string) => {
    setNavigation((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleEditItem = (item: MenuItem) => {
    setCurrentMenuItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleSaveDialog = () => {
    if (!currentMenuItem) return;
    
    setNavigation((prev) => {
      const exists = prev.find((item) => item.id === currentMenuItem.id);
      if (exists) {
        return prev.map((item) =>
          item.id === currentMenuItem.id ? currentMenuItem : item
        );
      } else {
        // Fallback just in case, though we removed add button
        return [...prev, currentMenuItem];
      }
    });
    setIsDialogOpen(false);
    setCurrentMenuItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Pengaturan Website
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola navigasi, footer, dan pengaturan umum website
        </p>
      </div>

      <Tabs defaultValue="navigation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="navigation">Navigasi</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Navigation Settings */}
        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Menu Navigasi</CardTitle>
                <CardDescription>
                  Kelola menu utama di header website
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Nama Menu</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Tampil</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...navigation]
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.order}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.href}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.visible}
                            onCheckedChange={() => toggleMenuVisibility(item.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditItem(item)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  {navigation.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Belum ada menu navigasi
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSaveNavigation} 
                  className="gap-2"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Settings */}
        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Footer</CardTitle>
              <CardDescription>
                Edit konten footer website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandDesc">Deskripsi Brand</Label>
                <Textarea
                  id="brandDesc"
                  value={footer.brandDescription}
                  onChange={(e) =>
                    setFooter({ ...footer, brandDescription: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={footer.address}
                  onChange={(e) =>
                    setFooter({ ...footer, address: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    value={footer.phone}
                    onChange={(e) =>
                      setFooter({ ...footer, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={footer.email}
                    onChange={(e) =>
                      setFooter({ ...footer, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Jam Operasional</Label>
                <Textarea
                  id="hours"
                  value={footer.hours}
                  onChange={(e) =>
                    setFooter({ ...footer, hours: e.target.value })
                  }
                  rows={2}
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Social Media Links</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={footer.instagram}
                      onChange={(e) =>
                        setFooter({ ...footer, instagram: e.target.value })
                      }
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={footer.facebook}
                      onChange={(e) =>
                        setFooter({ ...footer, facebook: e.target.value })
                      }
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveFooter} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Menu
            </DialogTitle>
            <DialogDescription>
              Sesuaikan detail menu navigasi di sini.
            </DialogDescription>
          </DialogHeader>
          
          {currentMenuItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Menu</Label>
                <Input
                  id="name"
                  value={currentMenuItem.name}
                  onChange={(e) =>
                    setCurrentMenuItem({ ...currentMenuItem, name: e.target.value })
                  }
                  placeholder="Contoh: Beranda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="href">Link / URL</Label>
                <Input
                  id="href"
                  value={currentMenuItem.href}
                  onChange={(e) =>
                    setCurrentMenuItem({ ...currentMenuItem, href: e.target.value })
                  }
                  placeholder="Contoh: /about atau https://..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={currentMenuItem.order}
                  onChange={(e) =>
                    setCurrentMenuItem({ ...currentMenuItem, order: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="visible"
                  checked={currentMenuItem.visible}
                  onCheckedChange={(checked) =>
                    setCurrentMenuItem({ ...currentMenuItem, visible: checked })
                  }
                />
                <Label htmlFor="visible">Tampilkan di Menu</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveDialog}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
