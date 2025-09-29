// Default endpoint: https://your-app.vercel.app/api
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const response = `
Available endpoints:

/main     - Main code file
/example  - Example file
/data     - Text data file

Access via: https://${req.headers.host}/api/[filename]

Contoh: https://${req.headers.host}/api/main
  `.trim();
  
  res.status(200).send(response);
}
