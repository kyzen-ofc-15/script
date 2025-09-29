// https://your-app.vercel.app/api/main
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const code = `
// File utama - Main JavaScript code
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log("Result:", result);

module.exports = {
  calculateSum,
  result
};
  `.trim();
  
  res.status(200).send(code);
}
