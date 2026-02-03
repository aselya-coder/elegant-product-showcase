import { useState } from "react";
import { Save, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { WHATSAPP_CONFIG } from "@/config/whatsapp";
import { toast } from "sonner";

const WhatsApp = () => {
  const [config, setConfig] = useState({
    phoneNumber: WHATSAPP_CONFIG.phoneNumber,
    defaultMessage: WHATSAPP_CONFIG.defaultMessage,
    consultationMessage: WHATSAPP_CONFIG.consultationMessage,
    floatingButtonEnabled: true,
    productMessageTemplate: "Halo, saya tertarik dengan produk {nama_produk}",
  });

  const handleSave = () => {
    // In production, this would save to backend
    toast.success("Pengaturan WhatsApp berhasil disimpan");
  };

  const testWhatsApp = () => {
    const url = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(
      config.defaultMessage
    )}`;
    window.open(url, "_blank");
    toast.success("Membuka WhatsApp untuk test");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Pengaturan WhatsApp
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola konfigurasi WhatsApp untuk website
          </p>
        </div>
        <Button onClick={testWhatsApp} variant="outline" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          Test WhatsApp
        </Button>
      </div>

      {/* Main Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Umum</CardTitle>
          <CardDescription>
            Konfigurasi nomor WhatsApp dan pesan default
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Nomor WhatsApp Utama *</Label>
            <Input
              id="phoneNumber"
              value={config.phoneNumber}
              onChange={(e) =>
                setConfig({ ...config, phoneNumber: e.target.value })
              }
              placeholder="628xxxxxxxxxx"
            />
            <p className="text-xs text-muted-foreground">
              Format: kode negara + nomor (tanpa + atau spasi). Contoh: 6281234567890
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultMessage">Pesan Default</Label>
            <Textarea
              id="defaultMessage"
              value={config.defaultMessage}
              onChange={(e) =>
                setConfig({ ...config, defaultMessage: e.target.value })
              }
              placeholder="Pesan yang muncul saat klik tombol WhatsApp..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Pesan ini akan muncul saat pengguna klik floating button WhatsApp
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-0.5">
              <Label htmlFor="floatingButton">Floating WhatsApp Button</Label>
              <p className="text-xs text-muted-foreground">
                Tampilkan tombol WhatsApp melayang di pojok kanan bawah
              </p>
            </div>
            <Switch
              id="floatingButton"
              checked={config.floatingButtonEnabled}
              onCheckedChange={(checked) =>
                setConfig({ ...config, floatingButtonEnabled: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Template Pesan</CardTitle>
          <CardDescription>
            Kustomisasi template pesan untuk berbagai tujuan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productMessage">Template Pesan Produk</Label>
            <Textarea
              id="productMessage"
              value={config.productMessageTemplate}
              onChange={(e) =>
                setConfig({ ...config, productMessageTemplate: e.target.value })
              }
              placeholder="Template pesan untuk produk..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Gunakan placeholder: {"{nama_produk}"}, {"{link_produk}"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultationMessage">Pesan Konsultasi</Label>
            <Textarea
              id="consultationMessage"
              value={config.consultationMessage}
              onChange={(e) =>
                setConfig({ ...config, consultationMessage: e.target.value })
              }
              placeholder="Pesan untuk konsultasi produk..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Pesan ini digunakan untuk tombol konsultasi di hero section
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview URL WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">URL Default:</p>
              <code className="text-xs bg-muted p-2 rounded block break-all">
                https://wa.me/{config.phoneNumber}?text=
                {encodeURIComponent(config.defaultMessage)}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">URL Produk (Contoh):</p>
              <code className="text-xs bg-muted p-2 rounded block break-all">
                https://wa.me/{config.phoneNumber}?text=
                {encodeURIComponent(
                  config.productMessageTemplate.replace(
                    "{nama_produk}",
                    "Buket Mawar Merah"
                  )
                )}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

export default WhatsApp;
