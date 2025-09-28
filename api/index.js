const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const SECRET_KEY = 'pepe'; 
const DENIAL_MESSAGE = 'gabisa ngambil code';

export default async (req, res) => {
  const userKey = req.query.key;
  
  // Ambil path penuh dari URL (misal: loader.lua, my_script.txt, folder/another.lua)
  // req.url akan seperti '/api/loader.lua?key=...'
  const fullPath = req.url.replace('/api/', ''); 
  
  // Hapus semua parameter query (?key=...) untuk mendapatkan nama file murni
  const fileName = fullPath.split('?')[0]; 

  res.setHeader('Content-Type', 'text/plain');

  // --- 1. Logika Akses (Gated Access) ---
  if (userKey !== SECRET_KEY || !fileName) {
    // Menolak akses jika kunci salah atau nama file tidak ada di URL
    return res.status(200).send(DENIAL_MESSAGE);
  }

  // --- 2. Ambil Konten dari GitHub Raw ---
  try {
    // Membuat URL Raw GitHub:
    // Contoh: https://raw.githubusercontent.com/kyzenzofficial/script/main/loader.lua
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${fileName}`;
    
    const response = await fetch(rawUrl);

    if (response.status === 404) {
        return res.status(200).send(`File '${fileName}' tidak ditemukan di repo.`);
    }
    
    if (!response.ok) {
        return res.status(200).send('Error saat mengambil konten dari GitHub.');
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server internal error.');
  }
};
