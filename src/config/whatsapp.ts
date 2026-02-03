// ===============================
// WhatsApp Configuration
// ===============================
// Format nomor: kode negara + nomor (tanpa + dan tanpa spasi)

export const WHATSAPP_CONFIG = {
  phoneNumber: "6285646420488",

  // Pesan default (floating button)
  defaultMessage:
    "Halo, saya ingin bertanya tentang produk di website Anda.",

  // Pesan konsultasi
  consultationMessage:
    "Halo, saya ingin berkonsultasi mengenai produk yang cocok untuk kebutuhan saya.",

  // Pesan untuk produk tertentu
  productMessage: (productName: string, productUrl: string) =>
    `Halo, saya tertarik dengan produk berikut:
Nama Produk: ${productName}
Link Produk: ${productUrl}
`,
};

// ===============================
// Helper Functions
// ===============================

// URL WhatsApp default / konsultasi
export const getWhatsAppUrl = (
  message: string = WHATSAPP_CONFIG.consultationMessage
) => {
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
};

// URL WhatsApp untuk produk tertentu
export const getProductWhatsAppUrl = (
  productName: string,
  productUrl: string
) => {
  return getWhatsAppUrl(
    WHATSAPP_CONFIG.productMessage(productName, productUrl)
  );
};
