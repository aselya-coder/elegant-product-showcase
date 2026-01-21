// WhatsApp Configuration
// Ganti nomor di bawah ini dengan nomor WhatsApp bisnis Anda
// Format: kode negara + nomor (tanpa + atau spasi)

export const WHATSAPP_CONFIG = {
  // Nomor WhatsApp (contoh: 6281234567890 untuk Indonesia)
  phoneNumber: "6281234567890",
  
  // Pesan default saat klik floating button
  defaultMessage: "Halo, saya ingin bertanya tentang produk di website Anda.",
  
  // Template pesan untuk produk
  productMessage: (productName: string) => 
    `Halo, saya tertarik dengan produk ${productName} dari website Anda.`,
  
  // Template pesan untuk konsultasi
  consultationMessage: "Halo, saya ingin berkonsultasi mengenai produk yang cocok untuk kebutuhan saya.",
};

// Fungsi untuk membuat URL WhatsApp
export const getWhatsAppUrl = (message: string = WHATSAPP_CONFIG.defaultMessage) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
};

// Fungsi untuk membuat URL WhatsApp untuk produk tertentu
export const getProductWhatsAppUrl = (productName: string) => {
  return getWhatsAppUrl(WHATSAPP_CONFIG.productMessage(productName));
};
