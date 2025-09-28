const GITHUB_USERNAME = 'kyzen-ofc-15'; // User baru Anda
const REPO_NAME = 'script'; 
const BRANCH_NAME = 'main'; 

export default async (req, res) => {
  if (!req.url) {
      return res.status(500).send('URL request is invalid or missing.');
  }

  // 1. Ambil path penuh dari URL, bersihkan dari /api/
  const fullPath = req.url.replace('/api/', ''); 
  
  // Hapus query parameter dan dapatkan nama file
  const pathWithoutQuery = fullPath.split('?')[0];
  const fileName = pathWithoutQuery; 

  res.setHeader('Content-Type', 'text/plain');

  // --- Pengecekan Ketersediaan File ---
  if (!fileName || fileName === '') {
      // Jika URL hanya /api/ atau /api
      return res.status(400).send('Error 400: Silakan sertakan nama file setelah /api/');
  }

  // --- Ambil Konten dari GitHub Raw ---
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH_NAME}/${fileName}`;
    
    const response = await fetch(rawUrl);

    if (!response.ok) {
        // Jika file tidak ditemukan (404)
        return res.status(404).send(`Error 404: File '${fileName}' tidak ditemukan di repositori '${REPO_NAME}'.`);
    }

    const fileContent = await response.text();
    
    // --- Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    // Menangkap error jaringan atau eksekusi
    console.error('FETCH OR EXECUTION CRASH:', error); 
    return res.status(500).send(`CRITICAL ERROR: Fungsi gagal. Detail: ${error.message}`);
  }
};
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server internal error.');
  }
};
