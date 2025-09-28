// Anda bisa mengubah isi dari RAW_CONTENT ini sesuai kebutuhan.
const RAW_CONTENT = `loadstring(game:HttpGet("https://lunor.dev/loader"))()

---
Ini adalah teks mentah yang dikirim oleh Vercel.
Kode ini akan terlihat saat Anda mengakses URL /api.
Versi: 1.0`;

// Fungsi utama yang dijalankan Vercel
export default (req, res) => {
  // PENTING: Mengatur Content-Type menjadi 'text/plain' agar browser menampilkannya sebagai teks murni
  res.setHeader('Content-Type', 'text/plain');
  
  // Mengirimkan konten teks
  res.send(RAW_CONTENT);
};
