import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Product data to seed (IDs will be auto-generated as UUIDs)
const productsToSeed = [
  {
    slug: "buket-mawar-merah-premium",
    name: "Buket Mawar Merah Premium",
    price: 450000,
    description: "Buket mawar merah premium dengan 20 tangkai mawar segar pilihan terbaik. Dibungkus dengan kertas premium dan pita satin berkualitas tinggi. Cocok untuk hadiah ulang tahun, anniversary, atau momen spesial lainnya.",
    category: "buket-bunga",
    image_url: "/assets/products/buket-mawar.jpg",
    is_featured: true,
    is_active: true,
  },
  {
    slug: "hampers-lebaran-eksklusif",
    name: "Hampers Lebaran Eksklusif",
    price: 850000,
    description: "Hampers Lebaran eksklusif dengan berbagai pilihan kue kering premium, kurma pilihan, dan aneka cokelat import. Dikemas dalam box eksklusif dengan desain elegan.",
    category: "hampers",
    image_url: "/assets/products/hampers-lebaran.jpg",
    is_featured: true,
    is_active: true,
  },
  {
    slug: "kue-ulang-tahun-custom",
    name: "Kue Ulang Tahun Custom",
    price: 350000,
    description: "Kue ulang tahun custom dengan desain sesuai keinginan Anda. Menggunakan bahan-bahan premium dan dekorasi fondant berkualitas tinggi.",
    category: "kue-tart",
    image_url: "/assets/products/kue-ulang-tahun.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "buket-bunga-matahari",
    name: "Buket Bunga Matahari",
    price: 380000,
    description: "Buket bunga matahari segar yang membawa keceriaan dan kebahagiaan. Terdiri dari 10 tangkai bunga matahari dengan tambahan baby breath dan eucalyptus.",
    category: "buket-bunga",
    image_url: "/assets/products/buket-matahari.jpg",
    is_featured: true,
    is_active: true,
  },
  {
    slug: "hampers-bayi-newborn",
    name: "Hampers Bayi Newborn",
    price: 650000,
    description: "Hampers spesial untuk bayi baru lahir berisi perlengkapan bayi premium seperti baju, selimut, mainan, dan aksesoris lainnya.",
    category: "hampers",
    image_url: "/assets/products/hampers-bayi.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "dekorasi-lamaran-romantis",
    name: "Dekorasi Lamaran Romantis",
    price: 2500000,
    description: "Paket dekorasi lamaran lengkap dengan backdrop, balon, bunga, lilin, dan properti romantis lainnya. Tim profesional kami akan mendekorasi venue pilihan Anda.",
    category: "dekorasi",
    image_url: "/assets/products/dekorasi-lamaran.jpg",
    is_featured: true,
    is_active: true,
  },
  {
    slug: "buket-lily-putih-elegan",
    name: "Buket Lily Putih Elegan",
    price: 520000,
    description: "Buket lily putih yang memancarkan keanggunan dan kemewahan. Terdiri dari 15 tangkai lily putih segar dengan aroma yang memikat.",
    category: "buket-bunga",
    image_url: "/assets/products/buket-lily.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "kue-pengantin-3-tier",
    name: "Kue Pengantin 3 Tier",
    price: 2800000,
    description: "Kue pengantin 3 tingkat dengan desain elegan dan mewah. Dibuat dengan bahan premium dan dapat dikustomisasi sesuai tema pernikahan Anda.",
    category: "kue-tart",
    image_url: "/assets/products/kue-pengantin.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "papan-duka-cita-simpati",
    name: "Papan Duka Cita Simpati",
    price: 2500000,
    description: "Papan duka cita simpati dengan desain elegan dan mewah. Dapat digunakan sebagai papan duka atau sebagai dekorasi duka.",
    category: "papan-bunga",
    image_url: "/assets/products/papanDuka.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "parsel-natal-elegan",
    name: "Parsel Natal Elegan",
    price: 3000000,
    description: "Parsel natal elegan dengan desain mewah. Dapat digunakan sebagai hadiah natal untuk keluarga, teman, atau rekan bisnis.",
    category: "parsel-natal",
    image_url: "/assets/products/parselNatal.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "paket-natal-ekslusif",
    name: "Paket Natal Ekslusif",
    price: 4500000,
    description: "Paket natal ekslusif dengan berbagai hadiah yang memanjakan hati dan pikiran. Termasuk bunga, kue, selimut, dan mainan lainnya.",
    category: "parsel-natal",
    image_url: "/assets/products/paketNatalEkslusif.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "paket-natal-special",
    name: "Paket Natal Special",
    price: 3500000,
    description: "Paket natal special dengan berbagai hadiah yang memanjakan hati dan pikiran. Termasuk bunga, kue, selimut, dan mainan lainnya.",
    category: "parsel-natal",
    image_url: "/assets/products/paketNatalSpecial.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "dekorasi-lamaran-simple-elegant",
    name: "Dekorasi Lamaran Simple Elegant",
    price: 3500000,
    description: "Dekorasi lamaran simple elegant dengan desain mewah dan elegant. Dapat digunakan sebagai dekorasi lamaran atau tunangan.",
    category: "dekorasi",
    image_url: "/assets/products/Dekorasilamaransimple.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "dekorasi-lamaran-elegant",
    name: "Dekorasi Lamaran Elegant",
    price: 4000000,
    description: "Dekorasi lamaran elegant dengan desain mewah dan elegant. Dapat digunakan sebagai dekorasi lamaran atau tunangan.",
    category: "dekorasi",
    image_url: "/assets/products/Dekorasilamaran.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "papan-bunga-akrilik-modern",
    name: "Papan Bunga Akrilik Modern",
    price: 3000000,
    description: "Papan bunga akrilik modern dengan desain elegan dan mewah. Dapat digunakan sebagai papan bunga atau sebagai dekorasi wisuda.",
    category: "papan-bunga",
    image_url: "/assets/products/Papanbunga_akrilik.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "papan-bunga-happy-wedding-bal",
    name: "Papan Bunga Wedding",
    price: 10000000,
    description: "Papan bunga happy wedding bal dengan desain elegan dan mewah. Dapat digunakan sebagai papan bunga atau sebagai dekorasi pernikahan.",
    category: "papan-bunga",
    image_url: "/assets/products/PapanBungaHappyWeddingBal.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "papan-duka-cita",
    name: "Papan Duka Cita",
    price: 2000000,
    description: "Papan duka cita simpati dengan desain elegan. Dapat digunakan sebagai dekorasi duka atau sebagai papan duka.",
    category: "papan-bunga",
    image_url: "/assets/products/papandukacita.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "bento-cake-unik",
    name: "Bento Cake Unik",
    price: 50000,
    description: "Bento cake unik dengan berbagai pilihan desain lucu dan menarik. Cocok untuk hadiah ulang tahun anak-anak atau sebagai camilan spesial.",
    category: "kue-tart",
    image_url: "/assets/products/BentoCake.jpg",
    is_featured: false,
    is_active: true,
  },
  {
    slug: "hampers-lebaran",
    name: "Hampers Lebaran",
    price: 500000,
    description: "Hampers lebaran dengan berbagai isian snack yang menarik. Cocok untuk hampers lebaran keluarga atau sebagai camilan spesial.",
    category: "hampers",
    image_url: "/assets/products/hampersLebaran.jpg",
    is_featured: false,
    is_active: true,
  },
];

// Testimonial data to seed (IDs will be auto-generated as UUIDs)
const testimonialsToSeed = [
  {
    name: "Sarah Wijaya",
    role: "Pengusaha",
    content: "Buket bunganya sangat cantik dan segar! Pengiriman tepat waktu dan pelayanannya ramah sekali. Pasti akan order lagi untuk acara-acara spesial berikutnya.",
    rating: 5,
    product: "Buket Mawar Merah Premium",
    is_approved: true,
  },
  {
    name: "Budi Santoso",
    role: "Manager Marketing",
    content: "Hampers Lebaran dari sini selalu jadi pilihan utama untuk dikirim ke klien. Kualitas produk premium dan kemasan sangat elegan. Highly recommended!",
    rating: 5,
    product: "Hampers Lebaran Eksklusif",
    is_approved: true,
  },
  {
    name: "Dian Permata",
    role: "Ibu Rumah Tangga",
    content: "Kue ulang tahun untuk anak saya sesuai dengan ekspektasi. Rasanya enak, desainnya persis seperti yang diminta, dan pelayanannya sangat profesional.",
    rating: 5,
    product: "Kue Ulang Tahun Custom",
    is_approved: true,
  },
  {
    name: "Ahmad Faisal",
    role: "Dokter",
    content: "Dekorasi lamarannya AMAZING! Tim sangat profesional dan hasilnya melebihi ekspektasi. Terima kasih sudah membuat momen lamaran saya begitu spesial.",
    rating: 5,
    product: "Dekorasi Lamaran Romantis",
    is_approved: true,
  },
  {
    name: "Rina Melati",
    role: "Influencer",
    content: "Sudah beberapa kali order di sini dan tidak pernah mengecewakan. Kualitas bunga selalu fresh, kemasan cantik, dan pengiriman selalu on time!",
    rating: 5,
    product: "Buket Bunga Matahari",
    is_approved: true,
  },
  {
    name: "Hendro Wibowo",
    role: "CEO Startup",
    content: "Hampers bayi untuk keponakan sangat lengkap dan berkualitas. Kemasannya juga sangat instagramable. Penerima sangat senang dengan hadiahnya!",
    rating: 5,
    product: "Hampers Bayi Newborn",
    is_approved: true,
  },
];

async function seedProducts() {
  console.log("🌱 Seeding products...");
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const product of productsToSeed) {
    try {
      // Check if product already exists
      const { data: existing } = await supabase
        .from("products")
        .select("id")
        .eq("slug", product.slug)
        .single();

      if (existing) {
        console.log(`⏭️  Product "${product.name}" already exists, skipping...`);
        skipCount++;
        continue;
      }

      // Insert product (ID will be auto-generated)
      // Use only essential fields to avoid schema cache issues
      const essentialProduct = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category: product.category,
      };
      const { error } = await supabase.from("products").insert(essentialProduct);

      if (error) {
        console.error(`❌ Error inserting product "${product.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Added product: ${product.name}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing product "${product.name}":`, error);
      errorCount++;
    }
  }
  
  console.log(`\nProducts: ${successCount} added, ${skipCount} skipped, ${errorCount} errors`);
}

async function seedTestimonials() {
  console.log("\n🌱 Seeding testimonials...");
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const testimonial of testimonialsToSeed) {
    try {
      // Check if testimonial already exists (by name and content combination)
      const { data: existing } = await supabase
        .from("testimonials")
        .select("id")
        .eq("name", testimonial.name)
        .eq("content", testimonial.content)
        .single();

      if (existing) {
        console.log(`⏭️  Testimonial from "${testimonial.name}" already exists, skipping...`);
        skipCount++;
        continue;
      }

      // Insert testimonial (ID will be auto-generated)
      const { error } = await supabase.from("testimonials").insert(testimonial);

      if (error) {
        console.error(`❌ Error inserting testimonial from "${testimonial.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Added testimonial: ${testimonial.name}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing testimonial from "${testimonial.name}":`, error);
      errorCount++;
    }
  }
  
  console.log(`\nTestimonials: ${successCount} added, ${skipCount} skipped, ${errorCount} errors`);
}

async function seed() {
  console.log("🚀 Starting database seeding...\n");
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase credentials not found in environment variables!");
    console.error("Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file");
    return;
  }
  
  try {
    await seedProducts();
    await seedTestimonials();
    console.log("\n✨ Database seeding completed!");
  } catch (error) {
    console.error("\n💥 Database seeding failed:", error);
  }
}

// Run the seed function
seed();
