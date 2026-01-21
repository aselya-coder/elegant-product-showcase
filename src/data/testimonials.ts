export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  product?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Wijaya",
    role: "Pengusaha",
    content: "Buket bunganya sangat cantik dan segar! Pengiriman tepat waktu dan pelayanannya ramah sekali. Pasti akan order lagi untuk acara-acara spesial berikutnya.",
    rating: 5,
    product: "Buket Mawar Merah Premium",
  },
  {
    id: "2",
    name: "Budi Santoso",
    role: "Manager Marketing",
    content: "Hampers Lebaran dari sini selalu jadi pilihan utama untuk dikirim ke klien. Kualitas produk premium dan kemasan sangat elegan. Highly recommended!",
    rating: 5,
    product: "Hampers Lebaran Eksklusif",
  },
  {
    id: "3",
    name: "Dian Permata",
    role: "Ibu Rumah Tangga",
    content: "Kue ulang tahun untuk anak saya sesuai dengan ekspektasi. Rasanya enak, desainnya persis seperti yang diminta, dan pelayanannya sangat profesional.",
    rating: 5,
    product: "Kue Ulang Tahun Custom",
  },
  {
    id: "4",
    name: "Ahmad Faisal",
    role: "Dokter",
    content: "Dekorasi lamarannya AMAZING! Tim sangat profesional dan hasilnya melebihi ekspektasi. Terima kasih sudah membuat momen lamaran saya begitu spesial.",
    rating: 5,
    product: "Dekorasi Lamaran Romantis",
  },
  {
    id: "5",
    name: "Rina Melati",
    role: "Influencer",
    content: "Sudah beberapa kali order di sini dan tidak pernah mengecewakan. Kualitas bunga selalu fresh, kemasan cantik, dan pengiriman selalu on time!",
    rating: 5,
    product: "Buket Bunga Matahari",
  },
  {
    id: "6",
    name: "Hendro Wibowo",
    role: "CEO Startup",
    content: "Hampers bayi untuk keponakan sangat lengkap dan berkualitas. Kemasannya juga sangat instagramable. Penerima sangat senang dengan hadiahnya!",
    rating: 5,
    product: "Hampers Bayi Newborn",
  },
];
