// HANYA kode yang Anda inginkan. Tidak ada baris kosong di atas atau di bawah.
const RAW_CONTENT = 'loadstring(game:HttpGet("https://lunor.dev/loader"))()';

// Fungsi utama Vercel
export default (req, res) => {
  // Mengatur Content-Type: 'text/plain'
  res.setHeader('Content-Type', 'text/plain');
  
  // Mengirimkan konten tanpa tambahan
  res.send(RAW_CONTENT);
};
