const fs = require('fs');
const b = fs.readFileSync('forensic_landing_pages/images/primefpint.jpeg');
for (let i = 0; i < b.length - 8; i++) {
  if (b[i] === 0xFF && (b[i+1] === 0xC0 || b[i+1] === 0xC2)) {
    const h = b.readUInt16BE(i + 5);
    const w = b.readUInt16BE(i + 7);
    console.log('primefpint.jpeg dimensions:', w, 'x', h);
    break;
  }
}
