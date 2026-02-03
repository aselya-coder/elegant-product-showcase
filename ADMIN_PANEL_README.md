# BloomGift Admin Panel

## 📋 Overview

Admin panel lengkap untuk mengelola konten website BloomGift. Panel ini terpisah sepenuhnya dari website utama dan dirancang dengan arsitektur modular yang mudah dikembangkan.

## 🔐 Login Credentials

```
Email: admin@bloomgift.id
Password: admin123
```

## 🚀 Akses Admin Panel

- **Login Page**: `http://localhost:8080/admin/login`
- **Dashboard**: `http://localhost:8080/admin/dashboard`

## 📁 Struktur Folder Admin

```
src/admin/
├── pages/              # Halaman admin
│   ├── Login.tsx       # Halaman login
│   ├── Dashboard.tsx   # Dashboard utama
│   ├── Products.tsx    # Manajemen produk
│   ├── HomePage.tsx    # Manajemen home page
│   ├── Testimonials.tsx # Manajemen testimoni
│   ├── Cities.tsx      # Manajemen kota
│   ├── WhatsApp.tsx    # Pengaturan WhatsApp
│   └── Settings.tsx    # Pengaturan umum
├── components/         # Komponen admin
│   └── ProtectedRoute.tsx # Route protection
├── layout/            # Layout admin
│   └── AdminLayout.tsx # Layout dengan sidebar
├── hooks/             # Custom hooks
│   └── useAuth.ts     # Hook autentikasi
├── services/          # Service layer
│   ├── authService.ts # Service autentikasi
│   └── dataService.ts # Service data management
└── types/             # Type definitions
    └── index.ts       # Type definitions
```

## ✨ Fitur Admin Panel

### 1️⃣ Dashboard
- Total produk (aktif & nonaktif)
- Total testimoni
- Total kota terdaftar
- Status WhatsApp
- Quick actions untuk akses cepat
- Daftar produk terbaru
- Daftar testimoni terbaru

### 2️⃣ Manajemen Produk
**Terkoneksi dengan:**
- `src/data/products.ts`
- `src/components/product/ProductCard.tsx`
- `src/pages/Katalog.tsx`
- `src/pages/ProductDetail.tsx`

**Fitur:**
- ✅ Tambah produk baru
- ✅ Edit produk existing
- ✅ Hapus produk
- ✅ Search & filter produk
- ✅ Toggle status aktif/nonaktif
- ✅ Set produk unggulan, best seller, premium, exclusive
- ✅ Atur harga & harga asli (untuk diskon)
- ✅ Kategori produk
- ✅ Generate link WhatsApp produk otomatis

### 3️⃣ Manajemen Home Page
**Terkoneksi dengan:**
- `src/components/home/HeroSection.tsx`
- `src/components/home/FeaturedProducts.tsx`
- `src/components/home/WhyChooseUs.tsx`
- `src/components/home/CTASection.tsx`

**Fitur:**
- ✅ Edit hero section (judul, subtitle, deskripsi, CTA buttons)
- ✅ Edit statistik (pelanggan, pesanan, rating)
- ✅ Edit section keunggulan (4 features)
- ✅ Edit CTA section

### 4️⃣ Manajemen Testimoni
**Terkoneksi dengan:**
- `src/data/testimonials.ts`
- `src/pages/Testimoni.tsx`

**Fitur:**
- ✅ Tambah testimoni baru
- ✅ Edit testimoni existing
- ✅ Hapus testimoni
- ✅ Set rating (1-5 bintang)
- ✅ Link ke produk spesifik

### 5️⃣ Manajemen Kota & Wilayah
**Terkoneksi dengan:**
- `src/data/citiesByIsland.ts`

**Fitur:**
- ✅ Tambah kota baru
- ✅ Edit kota existing
- ✅ Hapus kota
- ✅ Mapping kota → nomor WhatsApp
- ✅ Organisasi per pulau (Jawa, Sumatra, dll)
- ✅ Toggle status aktif/nonaktif
- ✅ Search kota

### 6️⃣ Pengaturan WhatsApp
**Terkoneksi dengan:**
- `src/config/whatsapp.ts`
- `src/components/layout/WhatsAppFloat.tsx`
- `src/components/layout/FloatingMenu.tsx`

**Fitur:**
- ✅ Set nomor WhatsApp utama
- ✅ Edit pesan default
- ✅ Template pesan produk (dengan placeholder)
- ✅ Template pesan konsultasi
- ✅ Toggle floating WhatsApp button
- ✅ Preview URL WhatsApp
- ✅ Test WhatsApp langsung

### 7️⃣ Pengaturan Website
**Terkoneksi dengan:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`

**Fitur:**
- ✅ Kelola menu navigasi
- ✅ Toggle tampil/sembunyikan menu
- ✅ Edit footer info (alamat, telepon, email, jam)
- ✅ Edit social media links

## 🔒 Sistem Autentikasi

### Cara Kerja
1. Login dengan email & password
2. Session disimpan di localStorage
3. Semua route `/admin/*` (kecuali login) protected
4. Auto redirect ke login jika belum authenticated
5. Auto redirect ke dashboard jika sudah login

### File Terkait
- `src/admin/services/authService.ts` - Logic autentikasi
- `src/admin/hooks/useAuth.ts` - Hook untuk autentikasi
- `src/admin/components/ProtectedRoute.tsx` - Route protection

## 💾 Data Persistence

Saat ini menggunakan **localStorage** untuk simulasi persistence:
- Data produk disimpan di `admin_products`
- Data testimoni disimpan di `admin_testimonials`
- Dan lainnya...

### Migrasi ke Backend
File yang perlu dimodifikasi untuk koneksi ke API:
1. `src/admin/services/dataService.ts` - Ganti localStorage dengan API calls
2. `src/admin/services/authService.ts` - Ganti localStorage dengan real auth API

Struktur sudah siap untuk integrasi API (async/await pattern sudah digunakan).

## 🎨 Design System

- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Fonts**: 
  - Heading: Cormorant Garamond
  - Body: Inter

### Warna Utama
```css
--primary: Gold theme
--secondary: Rose theme
--background: White
--foreground: Dark text
--muted: Gray variants
```

## 📱 Responsive Design

Admin panel fully responsive:
- Desktop: Sidebar tetap terlihat
- Tablet/Mobile: Hamburger menu dengan slide-in sidebar

## 🚀 Development

### Menjalankan Development Server
```bash
npm run dev
```

Akses admin panel di: `http://localhost:8080/admin/login`

### Build untuk Production
```bash
npm run build
```

## 🔄 Workflow Admin

1. **Login** → Masuk dengan credentials
2. **Dashboard** → Lihat overview & quick access
3. **Kelola Data** → CRUD operations di berbagai section
4. **Lihat Perubahan** → Klik "Lihat Website" untuk preview
5. **Logout** → Keluar dari admin panel

## 📝 Catatan Penting

### ✅ Yang TIDAK Berubah
- UI user tetap sama (tidak ada perubahan)
- Routing user tetap berfungsi normal
- Semua komponen user tidak termodifikasi
- Layout user tidak berubah

### ✨ Yang Ditambahkan
- Folder `src/admin/` (terpisah total)
- Route `/admin/*` di App.tsx
- Data persistence layer (siap untuk API)

## 🛠️ Pengembangan Selanjutnya

### Backend Integration
1. Buat REST API atau GraphQL endpoint
2. Update `dataService.ts` untuk API calls
3. Implement proper authentication (JWT, OAuth, etc.)
4. Add image upload functionality
5. Add real-time updates (WebSocket/Polling)

### Fitur Tambahan
- Analytics & reporting
- Order management
- Customer management
- Email marketing integration
- Inventory management
- Multi-user admin dengan roles

## 🐛 Troubleshooting

### Login Tidak Berfungsi
- Pastikan menggunakan credentials yang benar
- Clear localStorage jika ada masalah
- Refresh browser

### Data Tidak Tersimpan
- Check browser console untuk errors
- Pastikan localStorage tidak full
- Pastikan tidak ada blocker untuk localStorage

### Routing Error
- Pastikan dev server berjalan
- Clear browser cache
- Check network tab untuk 404 errors

## 📞 Support

Untuk pertanyaan atau issue, hubungi tim development BloomGift.

---

**Version**: 1.0.0  
**Last Updated**: 2026-01-30  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
