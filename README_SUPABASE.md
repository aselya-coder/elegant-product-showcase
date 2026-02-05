# 🚀 Cara Mengaktifkan Upload Gambar ke Supabase

Fitur upload gambar produk sudah terintegrasi! Ikuti langkah-langkah berikut untuk mengaktifkannya:

## ⚡ Quick Start (5 Menit)

### 1️⃣ Setup Supabase Project

1. Daftar/Login di [supabase.com](https://supabase.com) (GRATIS)
2. Buat project baru
3. Tunggu setup selesai (~2 menit)

### 2️⃣ Dapatkan Kredensial

Di Supabase Dashboard:
1. **Settings** → **API**
2. Salin:
   - ✅ **Project URL** 
   - ✅ **anon public key**

### 3️⃣ Update File `.env`

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4️⃣ Buat Storage Bucket

Di Supabase Dashboard:
1. **Storage** → **New bucket**
2. Name: `products`
3. ✅ Centang **Public bucket**
4. **Create bucket**

### 5️⃣ Setup Policies

Di bucket `products` → **Policies**:

**Policy 1 - Public Read:**
```sql
-- Policy name: Public Read Access
-- Command: SELECT
-- USING expression:
true
```

**Policy 2 - Public Upload:**
```sql
-- Policy name: Public Upload
-- Command: INSERT  
-- WITH CHECK expression:
true
```

**Policy 3 - Public Delete (Opsional):**
```sql
-- Policy name: Public Delete
-- Command: DELETE
-- USING expression:
true
```

### 6️⃣ Restart & Test

```bash
npm run dev
```

1. Login ke `/admin`
2. **Manajemen Produk** → **Tambah Produk**
3. Upload gambar
4. **Simpan**

✅ Selesai! Gambar tersimpan di Supabase Storage.

---

## 📚 Dokumentasi Lengkap

Lihat [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) untuk:
- Troubleshooting
- Tips optimasi
- Fitur advanced
- Image transformations

## 🆓 Free Tier Limits

Supabase Free Tier:
- ✅ 1GB Storage
- ✅ 2GB Bandwidth/bulan
- ✅ Unlimited API requests

Cukup untuk ratusan gambar produk!

## 🔧 Troubleshooting Cepat

| Error | Solusi |
|-------|--------|
| "Bucket 'products' tidak ditemukan" | Buat bucket `products` (Step 4) |
| "Supabase tidak terkonfigurasi" | Cek kredensial di `.env` (Step 3) |
| "Permission denied" | Setup policies (Step 5) |
| Upload lambat | Compress gambar sebelum upload |

## 💡 Tips

- Gunakan gambar format WebP/JPEG
- Resize ke max 1920x1920px
- Compress dengan TinyPNG
- Max file size: 5MB

---

**Need help?** Baca [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) untuk panduan detail.
