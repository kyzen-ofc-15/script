// File utama - akan ditampilkan via API
const mainCode = `
// Ini adalah kode utama dari file index.js di root

function greeting() {
    return "Hello dari file utama!";
}

const message = greeting();
console.log(message);

module.exports = {
    greeting,
    message
};
`;

// Export untuk bisa diakses
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mainCode };
}
