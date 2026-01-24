import buketMawarImg from "@/assets/products/buket-mawar.jpg";
import hampersLebaranImg from "@/assets/products/hampers-lebaran.jpg";
import kueUlangTahunImg from "@/assets/products/kue-ulang-tahun.jpg";
import buketMatahariImg from "@/assets/products/buket-matahari.jpg";
import hampersBayiImg from "@/assets/products/hampers-bayi.jpg";
import dekorasiLamaranImg from "@/assets/products/dekorasi-lamaran.jpg";
import buketLilyImg from "@/assets/products/buket-lily.jpg";
import kuePengantinImg from "@/assets/products/kue-pengantin.jpg";
import papanDukaImg from "@/assets/products/papanDuka.jpg";
import parselNatalImg from "@/assets/products/parselNatal.jpg";
import paketNatalEkslusifImg from "@/assets/products/paketNatalEkslusif.jpg";
import paketNatalSpecialImg from "@/assets/products/paketNatalSpecial.jpg";
import DekorasilamaransimpleImg from "@/assets/products/Dekorasilamaransimple.jpg";
import DekorasilamaranImg from "@/assets/products/Dekorasilamaran.jpg";
import Papanbunga_akrilikImg from "@/assets/products/Papanbunga_akrilik.jpg";
import PapanBungaHappyWeddingBalImg from "@/assets/products/PapanBungaHappyWeddingBal.jpg";
import papandukacitaImg from "@/assets/products/papandukacita.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  exclusive: boolean;
  productUrl: string;
}

export const categories = [
  { id: "all", name: "Semua Produk" },
  { id: "buket-bunga", name: "Buket Bunga" },
  { id: "hampers", name: "Hampers" },
  { id: "kue-tart", name: "Kue & Tart" },
  { id: "dekorasi", name: "Dekorasi" },
  { id: "papan-bunga", name: "Papan Bunga" },
  { id: "parsel-natal", name: "Parsel Natal" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "buket-mawar-merah-premium",
    name: "Buket Mawar Merah Premium",
    price: 450000,
    originalPrice: 550000,
    description: "Buket mawar merah premium dengan 20 tangkai mawar segar pilihan terbaik. Dibungkus dengan kertas premium dan pita satin berkualitas tinggi. Cocok untuk hadiah ulang tahun, anniversary, atau momen spesial lainnya. Mawar dipilih dengan teliti untuk memastikan kesegaran dan keindahan yang tahan lama.",
    shortDescription: "20 tangkai mawar merah segar dengan kemasan premium",
    category: "buket-bunga",
    images: [buketMawarImg],
    featured: true,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/buket-mawar-merah-premium",
  },
  {
    id: "2",
    slug: "hampers-lebaran-eksklusif",
    name: "Hampers Lebaran Eksklusif",
    price: 850000,
    originalPrice: 1000000,
    description: "Hampers Lebaran eksklusif dengan berbagai pilihan kue kering premium, kurma pilihan, dan aneka cokelat import. Dikemas dalam box eksklusif dengan desain elegan yang cocok untuk dikirim ke relasi bisnis, keluarga, atau orang tercinta.",
    shortDescription: "Paket hampers lebaran lengkap dengan kemasan mewah",
    category: "hampers",
    images: [hampersLebaranImg],
    featured: true,
    bestSeller: false,
    exclusive: true,
    productUrl: "https://bloomgift.com/produk/hampers-lebaran-eksklusif",
  },
  {
    id: "3",
    slug: "kue-ulang-tahun-custom",
    name: "Kue Ulang Tahun Custom",
    price: 350000,
    description: "Kue ulang tahun custom dengan desain sesuai keinginan Anda. Menggunakan bahan-bahan premium dan dekorasi fondant berkualitas tinggi. Tersedia dalam berbagai ukuran dan rasa.",
    shortDescription: "Kue ulang tahun dengan desain custom sesuai keinginan",
    category: "kue-tart",
    images: [kueUlangTahunImg],
    featured: false,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/kue-ulang-tahun-custom",
  },
  {
    id: "4",
    slug: "buket-bunga-matahari",
    name: "Buket Bunga Matahari",
    price: 380000,
    description: "Buket bunga matahari segar yang membawa keceriaan dan kebahagiaan. Terdiri dari 10 tangkai bunga matahari dengan tambahan baby breath dan eucalyptus untuk sentuhan elegan.",
    shortDescription: "10 tangkai bunga matahari segar dengan kemasan cantik",
    category: "buket-bunga",
    images: [buketMatahariImg],
    featured: true,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/buket-bunga-matahari",
  },
  {
    id: "5",
    slug: "hampers-bayi-newborn",
    name: "Hampers Bayi Newborn",
    price: 650000,
    description: "Hampers spesial untuk bayi baru lahir berisi perlengkapan bayi premium seperti baju, selimut, mainan, dan aksesoris lainnya. Dikemas dalam keranjang cantik dengan pita dan kartu ucapan.",
    shortDescription: "Paket lengkap hadiah untuk bayi baru lahir",
    category: "hampers",
    images: [hampersBayiImg],
    featured: false,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/hampers-bayi-newborn",
  },
  {
    id: "6",
    slug: "dekorasi-lamaran-romantis",
    name: "Dekorasi Lamaran Romantis",
    price: 2500000,
    originalPrice: 3000000,
    description: "Paket dekorasi lamaran lengkap dengan backdrop, balon, bunga, lilin, dan properti romantis lainnya. Tim profesional kami akan mendekorasi venue pilihan Anda untuk menciptakan momen lamaran yang tak terlupakan.",
    shortDescription: "Paket dekorasi lamaran lengkap dengan tim profesional",
    category: "dekorasi",
    images: [dekorasiLamaranImg],
    featured: true,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/dekorasi-lamaran-romantis", 
  },
  {
    id: "7",
    slug: "buket-lily-putih-elegan",
    name: "Buket Lily Putih Elegan",
    price: 520000,
    description: "Buket lily putih yang memancarkan keanggunan dan kemewahan. Terdiri dari 15 tangkai lily putih segar dengan aroma yang memikat, dibungkus dengan kertas premium dan pita satin.",
    shortDescription: "15 tangkai lily putih segar dengan kemasan elegan",
    category: "buket-bunga",
    images: [buketLilyImg],
    featured: false,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/buket-lily-putih-elegan",
  },
  {
    id: "8",
    slug: "kue-pengantin-3-tier",
    name: "Kue Pengantin 3 Tier",
    price: 2800000,
    description: "Kue pengantin 3 tingkat dengan desain elegan dan mewah. Dibuat dengan bahan premium dan dapat dikustomisasi sesuai tema pernikahan Anda. Termasuk topper dan dekorasi bunga.",
    shortDescription: "Kue pengantin 3 tingkat dengan desain custom",
    category: "kue-tart",
    images: [kuePengantinImg],
    featured: true,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/kue-pengantin-3-tier",
  },
  {
    id: "9",
    slug: "papan-duka-cita-simpati",
    name: "Papan Duka Cita Simpati",  
    price: 2500000,
    description: "Papan duka cita simpati dengan desain elegan dan mewah. Dapat digunakan sebagai papan duka atau sebagai dekorasi duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Papan duka cita simpati dengan desain elegan",
    category: "papan-bunga",
    images: [papanDukaImg],
    featured: false,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/papan-duka-cita-simpati",
  },
  {
    id: "10",
    slug: "parsel-natal-elegan",
    name: "Parsel Natal Elegan",
    price: 3000000,
    description: "Parsel natal elegan dengan desain mewah dan mewah. Dapat digunakan sebagai dekorasi duka atau sebagai papan duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Parsel natal elegan dengan desain mewah",
    category: "parsel-natal",
    images: [parselNatalImg],
    featured: true,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/parsel-natal-elegan",
  },
  {
    id: "11",
    slug: "paket-natal-ekslusif",
    name: "Paket Natal Ekslusif",
    price: 4500000,
    description: "Paket natal ekslusif dengan berbagai hadiah yang memanjakan hati dan pikiran. Termasuk bunga, kue, selimut, dan mainan lainnya. Dikemas dalam keranjang cantik dengan pita dan kartu ucapan.",
    shortDescription: "Paket natal ekslusif dengan berbagai hadiah",
    category: "parsel-natal",
    images: [paketNatalEkslusifImg],
    featured: false,
    bestSeller: false,
    exclusive: true,
    productUrl: "https://bloomgift.com/produk/paket-natal-ekslusif",
  },
  {
    id: "12",
    slug: "paket-natal-special",
    name: "Paket Natal Special",
    price: 3500000,
    description: "Paket natal special dengan berbagai hadiah yang memanjakan hati dan pikiran. Termasuk bunga, kue, selimut, dan mainan lainnya. Dikemas dalam keranjang cantik dengan pita dan kartu ucapan.",
    shortDescription: "Paket natal special dengan berbagai hadiah",
    category: "parsel-natal",
    images: [paketNatalSpecialImg],
    featured: false,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/paket-natal-special",
  },
  {
    id: "13",
    slug: "dekorasi-lamaran-simple-elegant",
    name: "Dekorasi Lamaran Simple Elegant",
    price: 3500000,
    description: "Dekorasi lamaran simple elegant dengan desain mewah dan mewah. Dapat digunakan sebagai dekorasi lamaran atau sebagai dekorasi duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Dekorasi lamaran simple elegant dengan desain elegan",
    category: "dekorasi",
    images: [DekorasilamaransimpleImg],
    featured: false,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/dekorasi-lamaran-simple-elegant",
  },
  {
    id: "14",
    slug: "dekorasi-lamaran-elegant",
    name: "Dekorasi Lamaran Elegant",
    price: 4000000,
    description: "Dekorasi lamaran elegant dengan desain mewah dan mewah. Dapat digunakan sebagai dekorasi lamaran atau sebagai dekorasi duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Dekorasi lamaran elegant dengan desain elegan",
    category: "dekorasi",
    images: [DekorasilamaranImg],
    featured: false,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/dekorasi-lamaran-elegant",
  },
  {
    id: "15",
    slug: "papan-bunga-akrilik-modern",
    name: "Papan Bunga Akrilik Modern",
    price: 3000000,
    description: "Papan bunga akrilik modern dengan desain elegan dan mewah. Dapat digunakan sebagai papan bunga atau sebagai dekorasi duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Papan bunga akrilik modern dengan desain elegan",
    category: "papan-bunga",
    images: [Papanbunga_akrilikImg],
    featured: false,
    bestSeller: true,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/papan-bunga-akrilik-modern",
  },
  {
    id: "16",
    slug: "papan-bunga-happy-wedding-bal",
    name: "Papan Bunga Wedding",
    price: 10000000,
    description: "Papan bunga happy wedding bal dengan desain elegan dan mewah. Dapat digunakan sebagai papan bunga atau sebagai dekorasi pernikahan. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Papan bunga happy wedding bal dengan desain elegan",
    category: "papan-bunga",
    images: [PapanBungaHappyWeddingBalImg],
    featured: true,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/papan-bunga-happy-wedding-bal",
  },
  {
    id: "17",
    slug: "papan-duka-cita",
    name: "Papan Duka Cita",
    price: 2000000,
    description: "Papan duka cita simpati dengan desain elegan. Dapat digunakan sebagai dekorasi duka atau sebagai papan duka. Tersedia dalam berbagai ukuran dan warna.",
    shortDescription: "Papan duka cita simpati dengan desain elegan",
    category: "papan-bunga",
    images: [papandukacitaImg],
    featured: false,
    bestSeller: false,
    exclusive: false,
    productUrl: "https://bloomgift.com/produk/papan-duka-cita-simpati",
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") return products;
  return products.filter((product) => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter((product) => product.bestSeller);
};
