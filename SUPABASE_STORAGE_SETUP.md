# Panduan Setup Supabase Storage untuk Upload Gambar

Panduan ini menjelaskan cara mengatur Supabase Storage agar fitur upload gambar produk dapat berfungsi dengan baik.

## Prasyarat

1. Akun Supabase (gratis di [supabase.com](https://supabase.com))
2. Project Supabase yang sudah dibuat

## Langkah 1: Dapatkan Kredensial Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka **Settings** → **API**
4. Salin informasi berikut:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon/public key** (token JWT panjang yang dimulai dengan `eyJ`)

## Langkah 2: Konfigurasi Environment Variables

1. Buka file `.env` di root project
2. Update dengan kredensial Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SITE_URL=https://elegant-showcase.com
```

⚠️ **PENTING**: Jangan commit file `.env` ke Git! File ini sudah ada di `.gitignore`.

## Langkah 3: Buat Storage Bucket untuk Produk

1. Di Supabase Dashboard, buka **Storage** di menu sidebar
2. Klik tombol **New bucket**
3. Isi form dengan detail berikut:
   - **Name**: `products`
   - **Public bucket**: ✅ CENTANG (Enable)
   - **File size limit**: 5 MB (opsional)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif` (opsional)

4. Klik **Create bucket**

### Screenshot Referensi Bucket Settings:
```
┌─────────────────────────────────────┐
│ Create a new bucket                 │
├─────────────────────────────────────┤
│ Name: products                      │
│                                     │
│ ☑ Public bucket                     │
│ (Allows public access to files)    │
│                                     │
│ File size limit: 5 MB               │
│ Allowed MIME types: image/*         │
│                                     │
│ [Cancel]  [Create bucket]           │
└─────────────────────────────────────┘
```

## Langkah 4: Setup Storage Policies (RLS)

Supabase menggunakan Row Level Security (RLS) untuk mengamankan storage. Anda perlu membuat policies untuk mengatur akses.

### Policy 1: Public Read Access

1. Di bucket `products`, klik tab **Policies**
2. Klik **New Policy**
3. Pilih **For full customization**
4. Isi policy:
   - **Policy name**: `Public Read Access`
   - **Target roles**: `public`
   - **Command**: `SELECT`
   - **WITH CHECK expression**: (kosongkan)
   - **USING expression**:
     ```sql
     true
     ```

5. Klik **Review** → **Save policy**

### Policy 2: Authenticated Upload Access

1. Klik **New Policy** lagi
2. Pilih **For full customization**
3. Isi policy:
   - **Policy name**: `Authenticated Upload`
   - **Target roles**: `authenticated`, `anon`
   - **Command**: `INSERT`
   - **WITH CHECK expression**:
     ```sql
     true
     ```
   - **USING expression**: (kosongkan)

4. Klik **Review** → **Save policy**

### Policy 3: Authenticated Delete Access (Opsional)

Jika Anda ingin menghapus gambar lama saat update:

1. Klik **New Policy**
2. Pilih **For full customization**
3. Isi policy:
   - **Policy name**: `Authenticated Delete`
   - **Target roles**: `authenticated`, `anon`
   - **Command**: `DELETE`
   - **WITH CHECK expression**: (kosongkan)
   - **USING expression**:
     ```sql
     true
     ```

4. Klik **Review** → **Save policy**

## Langkah 5: Setup Folder Structure (Opsional)

Aplikasi akan otomatis membuat folder `images/` di dalam bucket `products` saat upload pertama. Struktur folder:

```
products/
└── images/
    ├── 1709876543-a1b2c3.jpg
    ├── 1709876544-d4e5f6.png
    └── ...
```

## Langkah 6: Testing Upload

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Login ke Admin Panel (`/admin`)
3. Buka halaman **Manajemen Produk**
4. Klik **Tambah Produk** atau **Edit** produk yang sudah ada
5. Pilih gambar untuk diupload
6. Klik **Simpan**

### Hasil yang Diharapkan:

✅ **Sukses**: 
- Muncul notifikasi: "Gambar berhasil diupload ke Supabase"
- Muncul notifikasi: "Produk berhasil ditambahkan/diupdate"
- Gambar muncul di preview dan di halaman produk

❌ **Gagal - Bucket Tidak Ditemukan**:
- Error: "Bucket 'products' tidak ditemukan..."
- Solusi: Pastikan bucket `products` sudah dibuat (Langkah 3)

❌ **Gagal - Supabase Tidak Terkonfigurasi**:
- Error: "Supabase tidak terkonfigurasi..."
- Solusi: Pastikan kredensial di `.env` sudah benar (Langkah 2)

❌ **Gagal - Permission Denied**:
- Error: "new row violates row-level security policy"
- Solusi: Pastikan policies sudah dibuat (Langkah 4)

## Struktur URL Gambar

Setelah upload berhasil, gambar akan memiliki URL format:

```
https://xxxxx.supabase.co/storage/v1/object/public/products/images/1709876543-a1b2c3.jpg
```

URL ini disimpan di database dan digunakan untuk menampilkan gambar di website.

## Tips & Best Practices

### 1. Optimasi Gambar Sebelum Upload
- Gunakan format WebP atau JPEG untuk ukuran file lebih kecil
- Resize gambar ke dimensi maksimal 1920x1920px
- Compress gambar menggunakan tools seperti TinyPNG atau Squoosh

### 2. Naming Convention
File akan otomatis diberi nama dengan format:
```
{timestamp}-{random}.{extension}
```
Contoh: `1709876543-a1b2c3.jpg`

### 3. Keamanan
- ⚠️ **Jangan expose** Supabase `service_role` key
- ✅ Gunakan `anon/public` key untuk operasi client-side
- ✅ Set file size limits di bucket settings
- ✅ Batasi MIME types yang diperbolehkan

### 4. Monitoring
- Cek Storage usage di Supabase Dashboard → **Reports** → **Storage**
- Free tier: 1GB storage, 2GB bandwidth/bulan
- Upgrade ke Pro jika perlu lebih banyak storage

## Troubleshooting

### Upload Lambat
- Periksa koneksi internet
- Compress gambar sebelum upload
- Cek status Supabase di [status.supabase.com](https://status.supabase.com)

### Gambar Tidak Muncul
- Pastikan bucket di-set sebagai **Public**
- Periksa policies untuk SELECT/READ access
- Cek browser console untuk error CORS

### Quota Exceeded
- Hapus file yang tidak terpakai di Storage
- Upgrade plan Supabase
- Gunakan CDN external untuk hosting gambar

## Fitur Tambahan (Advanced)

### Auto-Delete Gambar Lama Saat Update

Tambahkan kode ini di `handleSave` function (opsional):

```typescript
// Sebelum upload gambar baru
if (editingProduct?.image_url && selectedFile) {
  // Delete old image
  await deleteProductImage(editingProduct.image_url);
}
```

Import `deleteProductImage` dari `@/lib/storage`.

### Image Transformation (Resize/Optimize)

Supabase Storage mendukung transformasi gambar on-the-fly:

```typescript
// Resize to 400x400
const imageUrl = `${baseUrl}/resize/400x400/${filePath}`;

// Convert to WebP
const imageUrl = `${baseUrl}/render/image/webp/${filePath}`;
```

Dokumentasi lengkap: [Supabase Image Transformations](https://supabase.com/docs/guides/storage/image-transformations)

## Kesimpulan

Setelah mengikuti panduan ini, fitur upload gambar produk sudah aktif dan terintegrasi dengan Supabase Storage. Gambar yang diupload akan tersimpan secara permanen di cloud dan dapat diakses dengan URL publik.

Untuk pertanyaan atau masalah, silakan buka issue di repository atau hubungi tim support.

---

**Dibuat**: 2026-02-05  
**Terakhir diupdate**: 2026-02-05  
**Versi**: 1.0.0
