const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'landing_slider.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Header dropdown links
content = content.replace(
  /<a href="#service-pcc">\s*<i class="fa-solid fa-passport dropdown-icon"><\/i>\s*<div>\s*Police Clearance Certificate \(PCC\)/g,
  `<a href="service_pcc.html">
                <i class="fa-solid fa-passport dropdown-icon"></i>
                <div>
                  Police Clearance Certificate (PCC)`
);

content = content.replace(
  /<a href="#service-finra">\s*<i class="fa-solid fa-briefcase dropdown-icon"><\/i>\s*<div>\s*FINRA Fingerprinting/g,
  `<a href="service_finra.html">
                <i class="fa-solid fa-briefcase dropdown-icon"></i>
                <div>
                  FINRA Fingerprinting`
);

// 2. Update Services Section card buttons
content = content.replace(
  /<a href="#book-appointment" class="btn-primary" style="padding: 12px 24px; font-size: 14px;">\s*<span>Book PCC Fingerprinting<\/span>/g,
  `<a href="service_pcc.html" class="btn-primary" style="padding: 12px 24px; font-size: 14px;">
          <span>Explore PCC Services &amp; Book</span>`
);

content = content.replace(
  /<a href="#book-appointment" class="btn-primary" style="padding: 12px 24px; font-size: 14px;">\s*<span>Book FINRA Fingerprinting<\/span>/g,
  `<a href="service_finra.html" class="btn-primary" style="padding: 12px 24px; font-size: 14px;">
          <span>Explore FINRA Services &amp; Book</span>`
);

// 3. Update Footer quick links
content = content.replace(
  /<li><a href="#service-pcc">Police Clearance Certificate \(PCC\)<\/a><\/li>/g,
  `<li><a href="service_pcc.html">Police Clearance Certificate (PCC)</a></li>`
);

content = content.replace(
  /<li><a href="#service-finra">FINRA Fingerprinting<\/a><\/li>/g,
  `<li><a href="service_finra.html">FINRA Fingerprinting</a></li>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated internal links in landing_slider.html');
