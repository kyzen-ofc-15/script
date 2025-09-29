const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Parse path dari req.url (Vercel API route: /api/* jadi req.url = /namafile atau /raw/namafile)
  const urlPath = req.url.slice(1); // Hilangkan leading '/'
  
  let filePath;
  let isRawFolder = false;
  
  if (urlPath.startsWith('raw/')) {
    // Untuk /api/raw/namafile → read dari folder ./raw/namafile
    filePath = path.join(process.cwd(), 'raw', urlPath.slice(4)); // slice 'raw/' = namafile
    isRawFolder = true;
  } else {
    // Untuk /api/namafile → read dari root ./namafile
    filePath = path.join(process.cwd(), urlPath);
  }
  
  try {
    // Cek apakah file ada dan bisa dibaca
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `File not found: ${urlPath}` });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Set header untuk raw text (sama seperti static file)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 jam optional
    
    // Return raw content
    res.status(200).send(content);
    
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Internal server error while reading file' });
  }
};
    
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
