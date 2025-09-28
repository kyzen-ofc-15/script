const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const BRANCH_NAME = 'main'; 
const DEFAULT_FILE_NAME = 'kyzenz';

export default async (req, res) => {
  if (!req.url) {
      return res.status(500).send('URL request is invalid or missing.');
  }

  const fullPath = req.url.replace('/api/', ''); 
  const pathWithoutQuery = fullPath.split('?')[0];
  const fileName = pathWithoutQuery || DEFAULT_FILE_NAME;

  res.setHeader('Content-Type', 'text/plain');

  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH_NAME}/${fileName}`;
    
    const response = await fetch(rawUrl);

    if (!response.ok) {
        return res.status(404).send(`Error 404: File '${fileName}' tidak ditemukan di repositori.`);
    }

    const fileContent = await response.text();
    
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send(`Server Error: Gagal mengambil file. Detail: ${error.message}`);
  }
};

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server internal error.');
  }
};
