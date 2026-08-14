export const whatsappTemplates = {
  cafe: `Halo Kak, saya Faiz.

Saya melihat {businessName} di Google Maps dan ingin menawarkan NFC Review Card yang bisa membantu customer memberikan review Google dengan lebih mudah.

Kalau Kakak berkenan, saya bisa jelaskan cara kerjanya secara singkat.`,

  barbershop: `Halo Kak, saya Faiz.

Saya melihat {businessName} di Google Maps. Saya sedang membantu bisnis seperti barbershop untuk mendapatkan review Google dengan lebih mudah menggunakan NFC Review Card.

Kalau berkenan, saya bisa kirim contoh cara kerjanya.`,

  hotel: `Halo Kak, saya Faiz.

Saya melihat {businessName} di Google Maps. Saya memiliki NFC Review Card yang memungkinkan customer memberikan review Google hanya dengan tap menggunakan HP.

Saya ingin menawarkan produknya untuk bisnis Kakak. Boleh saya jelaskan sedikit?`,

  restaurant: `Halo Kak, saya Faiz.

Saya melihat {businessName} di Google Maps. Saya memiliki NFC Review Card yang bisa membantu customer memberikan review Google dengan lebih cepat dan praktis.

Kalau Kakak berkenan, saya bisa kirim contoh produknya.`,

  other: `Halo Kak, saya Faiz.

Saya melihat {businessName} di Google Maps dan ingin menawarkan NFC Review Card untuk membantu customer memberikan review Google dengan lebih mudah.

Kalau berkenan, saya bisa jelaskan cara kerjanya secara singkat.`,
};


export function normalizeWhatsAppNumber(number) {
  let phone = number.replace(/\D/g, "");

  if (phone.startsWith("0")) {
    phone = "62" + phone.slice(1);
  }

  if (!phone.startsWith("62")) {
    throw new Error("Nomor WhatsApp harus menggunakan nomor Indonesia.");
  }

  return phone;
}


export function generateWhatsAppUrl(number, templateCategory, businessName) {
  const phone = normalizeWhatsAppNumber(number);

  const template =
    whatsappTemplates[templateCategory] || whatsappTemplates.other;

  const message = template.replace(
    "{businessName}",
    businessName
  );

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}