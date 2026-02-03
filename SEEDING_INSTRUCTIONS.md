# Panduan Mengisi Data Produk dan Testimoni

## Status Saat Ini

✅ **Testimoni**: Sudah terisi dengan 6 testimoni (Sarah Wijaya, Budi Santoso, Dian Permata, Ahmad Faisal, Rina Melati, Hendro Wibowo)

⚠️ **Produk**: Belum terisi karena Row Level Security (RLS) - hanya admin yang bisa menambah produk

## Cara Mengisi Data Produk

Ada 2 cara untuk mengisi data produk:

### Cara 1: Melalui Admin Panel (Recommended)
1. Login sebagai admin di `/admin/login`
2. Buka halaman Products di `/admin/products`
3. Klik tombol "Tambah Produk"
4. Isi data produk sesuai dengan data di `src/data/products.ts`
5. Ulangi untuk 19 produk yang ada

### Cara 2: Import Otomatis (Butuh Service Role Key)
Jika Anda memiliki Supabase Service Role Key:

1. Tambahkan ke file `.env`:
   ```
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

2. Update `src/scripts/seedDatabase.ts` untuk menggunakan service role key:
   ```typescript
   const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
   ```

3. Jalankan: `npm run seed`

**⚠️ Peringatan**: Service role key bypasses semua security. Jangan commit ke git!

## Daftar 19 Produk yang Perlu Ditambahkan

1. Buket Mawar Merah Premium - Rp 450,000
2. Hampers Lebaran Eksklusif - Rp 850,000
3. Kue Ulang Tahun Custom - Rp 350,000
4. Buket Bunga Matahari - Rp 380,000
5. Hampers Bayi Newborn - Rp 650,000
6. Dekorasi Lamaran Romantis - Rp 2,500,000
7. Buket Lily Putih Elegan - Rp 520,000
8. Kue Pengantin 3 Tier - Rp 2,800,000
9. Papan Duka Cita Simpati - Rp 2,500,000
10. Parsel Natal Elegan - Rp 3,000,000
11. Paket Natal Ekslusif - Rp 4,500,000
12. Paket Natal Special - Rp 3,500,000
13. Dekorasi Lamaran Simple Elegant - Rp 3,500,000
14. Dekorasi Lamaran Elegant - Rp 4,000,000
15. Papan Bunga Akrilik Modern - Rp 3,000,000
16. Papan Bunga Wedding - Rp 10,000,000
17. Papan Duka Cita - Rp 2,000,000
18. Bento Cake Unik - Rp 50,000
19. Hampers Lebaran - Rp 500,000

Detail lengkap ada di file `src/data/products.ts`
