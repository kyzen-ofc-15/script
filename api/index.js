const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const SECRET_KEY = 'ndraawz'; 
const DENIAL_MESSAGE = 'gabisa ngambil code';

export default async (req, res) => {
  const userKey = req.query.key;
  
  // Ambil path penuh (e.g., /loader.lua)
  const fullPath = req.url.replace('/api/', ''); 
  
  // Pisahkan nama file dari path. Kita hanya butuh yang paling kanan (setelah /api/)
  const fileName = fullPath.split('?')[0]; 

  res.setHeader('Content-Type', 'text/plain');

  // --- 1. Pengecekan Kunci Rahasia dan Nama File ---
  if (userKey !== SECRET_KEY || !fileName) {
    return res.status(200).send(DENIAL_MESSAGE);
  }

  // --- 2. Mengambil Konten dari GitHub Raw ---
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${fileName}`;
    
    const response = await fetch(rawUrl);

    if (!response.ok) {
      return res.status(200).send(`File '${fileName}' tidak ditemukan di repo.`);
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server Error saat mengambil file.');
  }
};
    return res.status(500).send('Server Error saat mengambil file.');
  }
};
