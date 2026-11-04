const fs = require('fs');

const files = [
  'c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/landing_slider.html',
  'c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_pcc.html',
  'c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_finra.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Update CSS: .brand-logo-img height: 70px, and navbar height: 86px
  content = content.replace(/\.nav-container\s*\{[^}]*height:\s*80px;/, `.nav-container {\n      max-width: 1300px;\n      margin: 0 auto;\n      height: 86px;`);

  content = content.replace(
    /\.brand-logo-img\s*\{[^}]+\}/,
    `.brand-logo-img {
      height: 68px;
      width: auto;
      max-width: 220px;
      object-fit: contain;
      display: block;
      transition: transform 0.25s ease;
    }`
  );

  // 2. In header: Remove the text and use clean cropped logo image
  // Replace: <a href="..." class="brand-logo" ...> <img ...> <div class="logo-text">...</div> </a>
  const headerBrandPattern = /<a href="([^"]*)" class="brand-logo"[^>]*>[\s\S]*?<img src="images\/[^"]+"[^>]*>[\s\S]*?<div class="logo-text">[\s\S]*?<\/div>\s*<\/a>/;
  content = content.replace(headerBrandPattern, (match, href) => {
    return `<a href="${href}" class="brand-logo" title="PrimeFPrint - Fingerprinting & PCC Services">
        <img src="images/primefpint_clean.png" alt="PrimeFPrint - Fingerprinting & PCC Services" class="brand-logo-img">
      </a>`;
  });

  // Also in case it didn't have logo-text:
  const headerBrandImgOnlyPattern = /<a href="([^"]*)" class="brand-logo"[^>]*>\s*<img src="images\/primefpint\.jpeg"[^>]*>\s*<\/a>/;
  content = content.replace(headerBrandImgOnlyPattern, (match, href) => {
    return `<a href="${href}" class="brand-logo" title="PrimeFPrint - Fingerprinting & PCC Services">
        <img src="images/primefpint_clean.png" alt="PrimeFPrint - Fingerprinting & PCC Services" class="brand-logo-img">
      </a>`;
  });

  // 3. In footer: Update to primefpint_clean.png with height: 60px
  content = content.replace(
    /<img src="images\/primefpint\.jpeg" alt="PrimeFPrint"[^>]*>/,
    `<img src="images/primefpint_clean.png" alt="PrimeFPrint" style="height: 60px; width: auto; display: block; border-radius: 4px;">`
  );

  // 4. Responsive CSS: ensure mobile scales nicely
  if (!content.includes('.brand-logo-img { height: 50px !important; }')) {
    content = content.replace(
      '@media (max-width: 768px) {',
      `@media (max-width: 768px) {\n      .brand-logo-img { height: 52px !important; }`
    );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated logo height and removed text in:', file);
});
