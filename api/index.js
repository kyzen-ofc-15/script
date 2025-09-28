const GITHUB_USERNAME = 'kyzen-ofc-15';
const REPO_NAME = 'script'; 
const SECRET_KEY = 'KUNCI_RAHASIA_ANDA'; 
const DENIAL_MESSAGE = 'gabisa ngambil code';

export default async (req, res) => {
  const userKey = req.query.key; // Kunci tetap dikirim melalui parameter: ?key=RAHASIA

  // Ambil nama file dari URL. req.query.slug adalah array, jadi kita gabungkan.
  const fileName = req.query.slug ? req.query.slug.join('/') : null;

  res.setHeader('Content-Type', 'text/plain');

  // --- 1. Pengecekan Kunci Rahasia dan Nama File ---
  if (userKey !== SECRET_KEY || !fileName) {
    return res.status(200).send(DENIAL_MESSAGE);
  }

  // --- 2. Mengambil Konten dari GitHub Raw ---
  try {
    // Construct URL untuk file di root repositori
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${fileName}`;
    
    const response = await fetch(rawUrl);

    if (!response.ok) {
      // Jika file tidak ditemukan (404)
      return res.status(200).send(`File '${fileName}' tidak ditemukan di repo.`);
    }

    const fileContent = await response.text();
    
    // --- 3. Tampilkan Kode Asli ---
    return res.status(200).send(fileContent);

  } catch (error) {
    return res.status(500).send('Server Error saat mengambil file.');
  }
};
