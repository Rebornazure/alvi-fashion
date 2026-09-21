# ALVI FASHION

Website toko pakaian **ALVI FASHION** (Kudus, Jawa Tengah): katalog produk, keranjang, dan pemesanan lewat WhatsApp. Dibuat dengan Next.js dan siap di-deploy ke Vercel.

> **Penting:** semua produk, harga, ukuran, warna, dan foto di project ini adalah **DATA DEMO / PLACEHOLDER**. Nomor WhatsApp, telepon, email, Instagram, TikTok, Shopee, jam buka, kebijakan pengiriman, dan retur sengaja **dikosongkan** — isi dengan data asli toko (lihat bagian "Mengganti informasi toko").

## Fitur

- Halaman: Beranda, Shop (filter, urutkan, pencarian), Kategori, Detail Produk, Tentang, Kontak, 404
- Keranjang (disimpan di browser lewat `localStorage`) dan favorit
- Checkout lewat tombol **Pesan via WhatsApp** (tanpa payment gateway, tanpa backend)
- Pilih ukuran dan warna dengan validasi, quick view, galeri foto dengan zoom dan geser
- Pencarian produk (nama, kategori, warna)
- Responsif dari 320 px sampai desktop, animasi halus yang menghormati pengaturan "reduce motion"
- SEO: metadata per halaman, Open Graph, `sitemap.xml`, `robots.txt`
- Tanpa data palsu: rating, jumlah terjual, dan label "Best Seller" hanya muncul jika kamu mengisi data aslinya

## Teknologi

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Motion · Lucide React.
Font Playfair Display dan Inter sudah disertakan di `app/fonts/` (tidak perlu koneksi ke Google Fonts).

## Menjalankan di komputer

Butuh **Node.js 20.9 atau lebih baru**.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Perintah lain:

```bash
npm run build       # build produksi
npm run start       # jalankan hasil build
npm run typecheck   # cek TypeScript
```

## Struktur folder

```
app/                 Halaman (beranda, shop, kategori, produk, tentang, kontak), layout, sitemap, robots
components/          Komponen UI (Navbar, Hero, ProductCard, CartDrawer, dll.)
components/providers Keranjang & favorit (StoreProvider)
data/                DATA YANG BISA KAMU EDIT: products.ts, categories.ts, site.ts, colors.ts
hooks/               Hook dialog yang aksesibel
lib/                 Fungsi bantu (harga, WhatsApp, pencarian, metadata)
public/images/       Foto: products/, categories/, banners/, brand/
scripts/             Pembuat gambar placeholder (opsional)
types/               Tipe TypeScript
```

## Mengganti informasi toko

Semua ada di **`data/site.ts`**:

| Field | Contoh |
| --- | --- |
| `whatsappNumber` | `"6281234567890"` (atau `"081234567890"`, otomatis diubah ke 62) |
| `phone`, `email` | isi jika ada |
| `instagram`, `tiktok`, `shopee` | link lengkap, contoh `"https://instagram.com/namaakun"` |
| `mapsUrl` | link dari Google Maps → Bagikan → Salin link (kosong = pakai pencarian alamat) |
| `businessHours` | `[{ day: "Senin – Sabtu", hours: "09.00 – 17.00" }]` |
| `shippingInfo`, `returnPolicy` | teks bebas |
| `showDemoNotice` | ubah ke `false` setelah semua data produk asli |

Field yang kosong tidak ditampilkan (atau tampil sebagai "Segera diperbarui"), jadi tidak ada tombol yang mengarah ke tujuan palsu. Selama `whatsappNumber` kosong, tombol pesan akan menampilkan "Nomor WhatsApp belum dikonfigurasi."

Tabel panduan ukuran ada di bagian `sizeGuide` pada file yang sama.

## Menambah atau mengubah produk

Buka **`data/products.ts`**, salin satu blok produk, lalu ubah isinya:

```ts
{
  id: "cargo-003",                 // unik
  slug: "celana-cargo-baru",       // unik, jadi URL /produk/celana-cargo-baru
  name: "Celana Cargo Baru",
  category: "celana-cargo",        // harus sama dengan slug di data/categories.ts
  price: 89000,
  discountPrice: 69000,            // hapus baris ini jika tidak ada diskon
  description: "Deskripsi produk.",
  images: ["/images/products/cargo-003-1.jpg", "/images/products/cargo-003-2.jpg"],
  sizes: ["M", "L", "XL"],
  colors: ["Black", "Army"],       // nama warna harus ada di data/colors.ts
  stock: 20,                       // 0 = "Stok habis"
  badge: "NEW",
  rating: null,                    // isi hanya jika punya data asli
  sold: null,                      // isi hanya jika punya data asli
  featured: true,                  // tampil di "Pilihan Kami"
  newArrival: true,                // tampil di "Baru Datang"
}
```

Setelah datanya asli, **hapus `isDemo: true`** pada produk itu supaya label "Data demo" hilang.

Kategori diatur di `data/categories.ts`. Warna baru ditambahkan di `data/colors.ts`.

## Mengganti foto

1. Simpan foto asli ke `public/images/...` (sebaiknya format `.jpg` atau `.webp`).
2. Tulis path-nya di `data/products.ts` (produk), `data/categories.ts` (kartu kategori), atau `siteImages` di `data/site.ts` (hero, promo, cerita brand, lokasi, gambar OG).

Ukuran yang disarankan: foto produk **4:5** (mis. 800×1000), kategori **3:4** (900×1200), hero **1920×1200**, promo **1600×900**, brand **1000×1250**, lokasi **1200×900**, OG **1200×630**.

Jika ingin membuat ulang gambar placeholder (butuh Python dan Pillow; tidak menimpa file yang sudah ada kecuali dengan `--force`):

```bash
pip install pillow
python3 scripts/generate-placeholders.py
```

## Deploy ke Vercel

1. Upload project ke GitHub (repository baru).
2. Di https://vercel.com pilih **Add New → Project**, lalu impor repository itu. Framework terdeteksi otomatis sebagai Next.js; tidak perlu mengubah pengaturan build.
3. (Disarankan) Tambahkan environment variable `NEXT_PUBLIC_SITE_URL` berisi alamat website final, contoh `https://alvifashion.com`. Ini dipakai untuk canonical URL, sitemap, dan Open Graph. Lihat `.env.example`.
4. Klik **Deploy**. Setiap `git push` ke branch utama akan otomatis men-deploy ulang.

## Catatan

- Keranjang dan favorit tersimpan di browser masing-masing pengunjung, jadi tidak ikut pindah antar perangkat.
- Website tidak menyimpan data pelanggan dan tidak memakai database atau API key.
- Structured data (JSON-LD) produk hanya dibuat untuk produk yang sudah bukan data demo.
