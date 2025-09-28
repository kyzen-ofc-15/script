const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const SECRET_KEY = 'andragntg'; // Kunci untuk mengakses kode

const DENIAL_MESSAGE = 'gabisa ngambil code';

export default async (req, res) => {
  const userKey = req.query.key;
  const fileName = req.query.file; // Mengambil nama file dari URL: ?file=namafile.lua

  // Atur header default ke text/plain
  res.setHeader('Content-Type', 'text/plain');
  
  // --- 1. Pengecekan Kunci Rahasia ---
  if (userKey !== SECRET_KEY || !fileName) {
    return res.status(200).send(DENIAL_MESSAGE);
  }

  // --- 2. Mengambil Konten dari GitHub Raw ---
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${fileName}`;
    
    // Menggunakan fitur fetch() bawaan Node.js
    const response = await fetch(rawUrl);

    if (!response.ok) {
      // Jika file tidak ditemukan (404) atau ada masalah lain
      return res.status(200).send(`File '${fileName}' tidak ditemukan atau error.`);
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    // Error jaringan atau fetch gagal
    return res.status(500).send('Server Error saat mengambil file.');
  }
};
