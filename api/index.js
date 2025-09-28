const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const BRANCH_NAME = 'main'; 
const DEFAULT_FILE_NAME = 'kyzenz'; // File default jika hanya /api/ yang diakses

export default async (req, res) => {
  // Ambil nama file dari query: ?file=nama_script.lua
  const fileName = req.query.file; 
  
  // Tentukan nama file akhir
  const finalFileName = fileName || DEFAULT_FILE_NAME;

  // Set header Content-Type ke 'text/plain'
  res.setHeader('Content-Type', 'text/plain');

  // --- Ambil Konten dari GitHub Raw ---
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH_NAME}/${finalFileName}`;
    
    const response = await fetch(rawUrl);

    if (!response.ok) {
        // Jika file tidak ditemukan
        return res.status(404).send(`Error 404: File '${finalFileName}' tidak ditemukan di repositori.`);
    }

    const fileContent = await response.text();
    
    // --- Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server Error saat mencoba mengambil file.');
  }
};
        return res.status(200).send('Error saat mengambil konten dari GitHub.');
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server internal error.');
  }
};
