// https://your-app.vercel.app/api
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const response = `
RAW TEXT API SERVER

Available Files - Access via: /api/[filename]

FILE YANG TERSEDIA:

File dengan extension:
/main.js
/script.lua  
/data.txt
/config.json
/style.css
/app.py
/utils/helper.js
/docs/api.md
/assets/logo.svg

File TANPA extension:
/config
/readme  
/license

CONTOH PENGGUNAAN:
https://${req.headers.host}/api/main.js
https://${req.headers.host}/api/script.lua
https://${req.headers.host}/api/config
https://${req.headers.host}/api/utils/helper.js

-> Semua file akan menampilkan RAW TEXT content!
  `.trim();
  
  res.status(200).send(response);
}
