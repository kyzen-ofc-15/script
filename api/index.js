// API route: https://your-app.vercel.app/api

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // Set header untuk raw text
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        // Baca file index.js dari root directory
        const rootDir = path.join(process.cwd(), '..');
        const mainFilePath = path.join(rootDir, 'index.js');
        
        // Coba baca file
        const fileContent = fs.readFileSync(mainFilePath, 'utf8');
        
        res.status(200).send(fileContent);
    } catch (error) {
        // Fallback: kirim kode langsung jika file tidak bisa dibaca
        const fallbackCode = `
// Fallback code - file utama tidak bisa diakses
// Ini adalah konten dari index.js di root

console.log("Hello World dari file utama!");

module.exports = {
    message: "Hello dari API!"
};
`;
        res.status(200).send(fallbackCode);
    }
};
