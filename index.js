module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send('Hello from root index.js! Ini raw text untuk web utama di Vercel.');
};
