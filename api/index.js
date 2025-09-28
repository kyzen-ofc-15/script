const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const BRANCH_NAME = 'main'; 
const DEFAULT_FILE_NAME = 'kyzenz';

export default async (req, res) => {
  // Ambil path penuh dari URL (misal: /loader.lua)
  const fullPath = req.url.replace('/api/', ''); 
  
  // Hapus query parameter jika ada
  const fileName = fullPath.split('?')[0] || DEFAULT_FILE_NAME;

  res.setHeader('Content-Type', 'text/plain');

  // --- Ambil Konten dari GitHub Raw ---
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH_NAME}/${fileName}`;
    
    // Pastikan environment mendukung fetch (dibantu oleh package.json)
    const response = await fetch(rawUrl);

    if (!response.ok) {
        return res.status(404).send(`Error 404: File '${fileName}' tidak ditemukan di repositori.`);
    }

    const fileContent = await response.text();
    
    // --- Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    // Menangkap error network atau fetch
    return res.status(500).send(`Server Error: Gagal mengambil file. Detail: ${error.message}`);
  }
};
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server internal error.');
  }
};
