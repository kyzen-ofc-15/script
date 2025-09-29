// https://your-app.vercel.app/api/example
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const code = `
// Contoh file JavaScript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return \`Hello, my name is \${this.name} and I'm \${this.age} years old.\`;
  }
}

const john = new Person("John", 25);
console.log(john.introduce());
  `.trim();
  
  res.status(200).send(code);
}
