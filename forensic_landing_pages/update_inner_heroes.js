const fs = require('fs');

// 1. Process service_pcc.html
let pcc = fs.readFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_pcc.html', 'utf8');

// Ensure Fancybox CSS in head
if (!pcc.includes('fancybox.css')) {
  pcc = pcc.replace(
    '</head>',
    '  <!-- Fancybox CSS -->\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />\n</head>'
  );
}

// Ensure Fancybox JS in body end
if (!pcc.includes('fancybox.umd.js')) {
  pcc = pcc.replace(
    '</body>',
    '  <!-- Fancybox JS -->\n  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>\n  <script>\n    Fancybox.bind("[data-fancybox]", {\n      // Custom options\n    });\n  </script>\n</body>'
  );
}

// Replace CSS styles for hero
const pccOldCssTarget = `    /* HERO SECTION FOR SERVICE PAGES */
    .service-hero {
      background: linear-gradient(135deg, #09152a 0%, #0d1e38 50%, #081122 100%);
      color: #ffffff;
      padding: 85px 5% 90px;
      position: relative;
      overflow: hidden;
    }
    .service-hero-container {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 55px;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .service-hero h1 {
      font-size: 44px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1.2px;
      color: #ffffff;
      margin-bottom: 18px;
    }
    .service-hero p {
      font-size: 16.5px;
      color: #cbd5e1;
      line-height: 1.7;
      margin-bottom: 30px;
      max-width: 580px;
    }
    .hero-trust-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 35px;
    }
    .trust-chip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 12.5px;
      color: #e2e8f0;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .trust-chip i { color: #38bdf8; font-size: 12px; }

    /* IMAGE FRAME WITH ANIMATED ROTATING BORDER */
    .service-hero-image-box {
      position: relative;
      border-radius: 22px;
      background: #cbd5e1;
      padding: 3px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(2, 132, 199, 0.25);
    }
    .service-hero-image-box::before {
      content: "";
      position: absolute;
      top: -65%;
      left: -65%;
      width: 230%;
      height: 230%;
      background: conic-gradient(
        transparent 0deg,
        transparent 160deg,
        #0284c7 200deg,
        #38bdf8 215deg,
        #ffffff 225deg,
        #38bdf8 235deg,
        #0284c7 250deg,
        transparent 290deg,
        transparent 360deg
      );
      animation: rotateHeroBorder 5s linear infinite;
      z-index: 1;
    }
    .service-hero-img-inner {
      position: relative;
      border-radius: 19px;
      overflow: hidden;
      background: #0f172a;
      z-index: 2;
      aspect-ratio: 16 / 10;
    }
    .service-hero-img-inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s ease;
    }
    .service-hero-image-box:hover .service-hero-img-inner img {
      transform: scale(1.04);
    }
    @keyframes rotateHeroBorder {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`;

const pccNewCssReplacement = `    /* INNER PAGE HERO (CLEAN LIGHT THEME WITH BREADCRUMB ONLY) */
    .inner-page-hero {
      background: linear-gradient(135deg, #f0f7ff 0%, #f8fafc 60%, #ffffff 100%);
      border-bottom: 1px solid var(--card-border);
      padding: 42px 5% 46px;
      position: relative;
    }
    .inner-hero-container {
      max-width: 1300px;
      margin: 0 auto;
    }
    .breadcrumb-nav {
      margin-bottom: 12px;
    }
    .breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 10px;
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text-muted);
    }
    .breadcrumb-list li a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .breadcrumb-list li a:hover {
      color: var(--primary-accent);
    }
    .breadcrumb-separator {
      font-size: 10px;
      color: #94a3b8;
    }
    .breadcrumb-list li.active {
      color: var(--primary-accent-dark);
      font-weight: 700;
    }
    .inner-hero-title {
      font-size: 38px;
      font-weight: 800;
      letter-spacing: -0.8px;
      color: var(--primary);
      margin: 0;
      line-height: 1.2;
      font-family: 'Space Grotesk', sans-serif;
    }

    /* OVERVIEW SPLIT LAYOUT IN CONTENT SECTION */
    .pcc-overview-container {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 50px;
      align-items: center;
    }
    .fancybox-card {
      display: block;
      text-decoration: none;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      border: 1px solid #cbd5e1;
      position: relative;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      background: #ffffff;
      cursor: pointer;
    }
    .fancybox-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 45px rgba(2, 132, 199, 0.2);
      border-color: #38bdf8;
    }
    .fancybox-img-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: #0f172a;
    }
    .fancybox-img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }
    .fancybox-card:hover .fancybox-img-container img {
      transform: scale(1.05);
    }
    .fancybox-badge {
      position: absolute;
      bottom: 14px;
      right: 14px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.25s;
    }
    .fancybox-badge i {
      color: #38bdf8;
      font-size: 13px;
    }
    .fancybox-card:hover .fancybox-badge {
      background: #0284c7;
      color: #ffffff;
    }
    .fancybox-card:hover .fancybox-badge i {
      color: #ffffff;
    }
    .fancybox-card-caption {
      padding: 16px 20px;
      background: #ffffff;
      border-top: 1px solid var(--card-border);
    }
    .fancybox-card-caption h5 {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .fancybox-card-caption p {
      font-size: 13px;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.5;
    }`;

if (pcc.includes(pccOldCssTarget)) {
  pcc = pcc.replace(pccOldCssTarget, pccNewCssReplacement);
} else {
  console.log('Warning: pccOldCssTarget not found in service_pcc.html');
}

// Replace Hero and Content section HTML in service_pcc.html
const pccOldHtmlTarget = `  <!-- PCC Hero Section -->
  <section class="service-hero">
    <div class="service-hero-container">
      <div>
        <div class="tag-badge" style="background: rgba(2, 132, 199, 0.2); border-color: rgba(56, 189, 248, 0.4); color: #7dd3fc;">
          Official Consular Clearance &bull; Global Acceptance
        </div>
        <h1>Police Clearance Certificate (PCC) Processing</h1>
        <p>
          Expert ink-and-roll fingerprinting and end-to-end documentation assistance for international immigration, employment, permanent residency (PR), and university admissions across 25+ sovereign nations.
        </p>

        <div class="hero-trust-chips">
          <span class="trust-chip"><i class="fa-solid fa-circle-check"></i> 100% Embassy Acceptance</span>
          <span class="trust-chip"><i class="fa-solid fa-shield-halved"></i> FBI FD-258 &amp; RCMP In Stock</span>
          <span class="trust-chip"><i class="fa-solid fa-user-shield"></i> Ex-Govt Forensic Examiners</span>
          <span class="trust-chip"><i class="fa-solid fa-bolt"></i> 20-Min Fast Track Slot</span>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="#pcc-booking" class="btn-primary">
            <span>Schedule PCC Fingerprinting</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="tel:+918125255814" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; background: rgba(255,255,255,0.06);">
            <i class="fa-solid fa-phone"></i>
            <span>Call Examiner: +91 81252 55814</span>
          </a>
        </div>
      </div>

      <!-- Generated High-Resolution Photography Asset with Rotating Border Beam -->
      <div class="service-hero-image-box">
        <div class="service-hero-img-inner">
          <img src="images/pcc_hero.jpg" alt="Certified Police Clearance Certificate Consular Documentation and Fingerprint Cards">
        </div>
      </div>
    </div>
  </section>

  <!-- What is PCC Section -->
  <section style="background: #ffffff;">
    <div class="section-head">
      <span class="tag-badge">Official Clarification</span>
      <h2 class="section-title">What is a Police Clearance Certificate (PCC)?</h2>
      <p class="section-desc">
        A Police Clearance Certificate (PCC) is an official legal record issued by sovereign police or federal law enforcement agencies confirming whether an individual has any criminal convictions or ongoing judicial proceedings. It serves as mandatory proof of good character for international relocation.
      </p>
    </div>`;

const pccNewHtmlReplacement = `  <!-- Clean Light Inner Page Hero (Heading & Breadcrumb Only) -->
  <section class="inner-page-hero">
    <div class="inner-hero-container">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><a href="landing_slider.html"><i class="fa-solid fa-house"></i> Home</a></li>
          <li class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></li>
          <li><a href="landing_slider.html#services">Services</a></li>
          <li class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></li>
          <li class="active" aria-current="page">Police Clearance Certificate (PCC)</li>
        </ol>
      </nav>
      <h1 class="inner-hero-title">Police Clearance Certificate (PCC)</h1>
    </div>
  </section>

  <!-- Content Section: PCC Overview with Integrated Fancybox Visual Inspection -->
  <section style="background: #ffffff; padding: 75px 5% 70px;">
    <div class="pcc-overview-container">
      <div class="pcc-overview-content">
        <span class="tag-badge">Official Consular Clarification</span>
        <h2 class="section-title" style="text-align: left; margin-bottom: 18px;">What is a Police Clearance Certificate (PCC)?</h2>
        <p class="section-desc" style="text-align: left; margin-bottom: 20px;">
          A Police Clearance Certificate (PCC) is an official legal record issued by sovereign police or federal law enforcement agencies confirming whether an individual has any criminal convictions or ongoing judicial proceedings. It serves as mandatory proof of good character for international relocation.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 24px;">
          Different foreign governments require fingerprints rolled on specific sovereign fingerprint cards (such as <strong>FBI FD-258</strong> for the USA or <strong>RCMP C-216C</strong> for Canada) along with court-admissible forensic examiner authentication.
        </p>

        <ul class="service-bullet-list" style="margin-bottom: 28px;">
          <li><i class="fa-solid fa-circle-check"></i> <strong>100% Embassy Acceptance:</strong> Recognized across 25+ sovereign consulates worldwide</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>Original Fingerprint Cards:</strong> Authentic FBI FD-258 &amp; RCMP C-216C forms in stock</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>Ex-Govt Senior Examiners:</strong> 40+ years experience ensuring zero smudge rejection</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>20-Min Fast Track:</strong> Express in-lab appointments with same-day completion</li>
        </ul>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="#pcc-booking" class="btn-primary">
            <span>Schedule PCC Fingerprinting</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="tel:+918125255814" class="btn-outline">
            <i class="fa-solid fa-phone"></i>
            <span>Call Examiner: +91 81252 55814</span>
          </a>
        </div>
      </div>

      <!-- Fancybox Image Inspection Card -->
      <div class="pcc-overview-visual">
        <a href="images/pcc_hero.jpg" data-fancybox="pcc-gallery" data-caption="Official Police Clearance Certificate (PCC) Documentation &amp; FBI FD-258 Fingerprint Verification" class="fancybox-card">
          <div class="fancybox-img-container">
            <img src="images/pcc_hero.jpg" alt="Certified Police Clearance Certificate Consular Verification Desk">
            <div class="fancybox-badge">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>Click to Enlarge / Inspect</span>
            </div>
          </div>
          <div class="fancybox-card-caption">
            <h5>Certified Consular Documentation</h5>
            <p>Official FBI FD-258 rolled cards and forensic certification.</p>
          </div>
        </a>
      </div>
    </div>`;

if (pcc.includes(pccOldHtmlTarget)) {
  pcc = pcc.replace(pccOldHtmlTarget, pccNewHtmlReplacement);
} else {
  console.log('Warning: pccOldHtmlTarget not found in service_pcc.html');
}

fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_pcc.html', pcc, 'utf8');
console.log('Successfully updated service_pcc.html!');


// 2. Process service_finra.html
let finra = fs.readFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_finra.html', 'utf8');

// Ensure Fancybox CSS in head
if (!finra.includes('fancybox.css')) {
  finra = finra.replace(
    '</head>',
    '  <!-- Fancybox CSS -->\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />\n</head>'
  );
}

// Ensure Fancybox JS in body end
if (!finra.includes('fancybox.umd.js')) {
  finra = finra.replace(
    '</body>',
    '  <!-- Fancybox JS -->\n  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>\n  <script>\n    Fancybox.bind("[data-fancybox]", {\n      // Custom options\n    });\n  </script>\n</body>'
  );
}

if (finra.includes(pccOldCssTarget)) {
  finra = finra.replace(pccOldCssTarget, pccNewCssReplacement);
} else {
  console.log('Warning: pccOldCssTarget not found in service_finra.html');
}

// Replace Hero and Content section HTML in service_finra.html
const finraOldHtmlTarget = `  <!-- FINRA Hero Section -->
  <section class="service-hero">
    <div class="service-hero-container">
      <div>
        <div class="tag-badge" style="background: rgba(2, 132, 199, 0.2); border-color: rgba(56, 189, 248, 0.4); color: #7dd3fc;">
          US Regulatory Compliance &bull; Broker-Dealer Licensing
        </div>
        <h1>FINRA Corporate Fingerprinting Services</h1>
        <p>
          Specialized mandatory background check fingerprinting on official FINRA-compliant cards for professionals registering with FINRA member firms in the United States. Fast-track corporate batches and individual appointments in Hyderabad.
        </p>

        <div class="hero-trust-chips">
          <span class="trust-chip"><i class="fa-solid fa-circle-check"></i> Official FINRA Cards In Stock</span>
          <span class="trust-chip"><i class="fa-solid fa-shield-halved"></i> 100% FBI CJIS Smudge-Free</span>
          <span class="trust-chip"><i class="fa-solid fa-file-contract"></i> Complete NDA Protection</span>
          <span class="trust-chip"><i class="fa-solid fa-truck-fast"></i> US Courier Dispatch Support</span>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="#finra-booking" class="btn-primary">
            <span>Schedule FINRA Appointment</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="tel:+918125255814" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; background: rgba(255,255,255,0.06);">
            <i class="fa-solid fa-phone"></i>
            <span>Corporate Desk: +91 81252 55814</span>
          </a>
        </div>
      </div>

      <!-- Generated High-Resolution Photography Asset with Rotating Border Beam -->
      <div class="service-hero-image-box">
        <div class="service-hero-img-inner">
          <img src="images/finra_hero.jpg" alt="Official FINRA Fingerprinting Card and Corporate US Compliance Documentation">
        </div>
      </div>
    </div>
  </section>

  <!-- What is FINRA Fingerprinting -->
  <section style="background: #ffffff;">
    <div class="section-head">
      <span class="tag-badge">Regulatory Requirement</span>
      <h2 class="section-title">What is FINRA Fingerprinting?</h2>
      <p class="section-desc">
        FINRA (Financial Industry Regulatory Authority) fingerprinting is a mandatory statutory background verification process for individuals registering with FINRA member firms in the United States.
      </p>
    </div>`;

const finraNewHtmlReplacement = `  <!-- Clean Light Inner Page Hero (Heading & Breadcrumb Only) -->
  <section class="inner-page-hero">
    <div class="inner-hero-container">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><a href="landing_slider.html"><i class="fa-solid fa-house"></i> Home</a></li>
          <li class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></li>
          <li><a href="landing_slider.html#services">Services</a></li>
          <li class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></li>
          <li class="active" aria-current="page">FINRA Fingerprinting</li>
        </ol>
      </nav>
      <h1 class="inner-hero-title">FINRA Fingerprinting</h1>
    </div>
  </section>

  <!-- Content Section: FINRA Overview with Integrated Fancybox Visual Inspection -->
  <section style="background: #ffffff; padding: 75px 5% 70px;">
    <div class="pcc-overview-container">
      <div class="pcc-overview-content">
        <span class="tag-badge">US Regulatory Compliance</span>
        <h2 class="section-title" style="text-align: left; margin-bottom: 18px;">What is FINRA Fingerprinting?</h2>
        <p class="section-desc" style="text-align: left; margin-bottom: 20px;">
          FINRA (Financial Industry Regulatory Authority) fingerprinting is a mandatory statutory background verification process for individuals registering with FINRA member firms in the United States.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 24px;">
          Under <strong>SEC Rule 17f-2</strong>, candidate fingerprints are submitted to conduct an FBI criminal background check as part of federal regulatory requirements. Candidates must have their friction ridges rolled on authentic FINRA-approved cards with authentic employer codes and CRD numbers.
        </p>

        <ul class="service-bullet-list" style="margin-bottom: 28px;">
          <li><i class="fa-solid fa-circle-check"></i> <strong>Official FINRA Cards:</strong> Authentic FBI standard fingerprint cards in stock</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>100% FBI CJIS Smudge-Free:</strong> Rolled according to strict FBI biometric specs</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>NDA Protection:</strong> Strict data confidentiality for financial firms &amp; contractors</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>Courier Dispatch Assistance:</strong> Fast courier forwarding to designated US addresses</li>
        </ul>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="#finra-booking" class="btn-primary">
            <span>Schedule FINRA Appointment</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="tel:+918125255814" class="btn-outline">
            <i class="fa-solid fa-phone"></i>
            <span>Corporate Desk: +91 81252 55814</span>
          </a>
        </div>
      </div>

      <!-- Fancybox Image Inspection Card -->
      <div class="pcc-overview-visual">
        <a href="images/finra_hero.jpg" data-fancybox="finra-gallery" data-caption="FINRA Fingerprinting Cards and US Corporate Compliance Documentation" class="fancybox-card">
          <div class="fancybox-img-container">
            <img src="images/finra_hero.jpg" alt="Official FINRA Fingerprinting Card and Corporate US Compliance Documentation">
            <div class="fancybox-badge">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>Click to Enlarge / Inspect</span>
            </div>
          </div>
          <div class="fancybox-card-caption">
            <h5>SEC &amp; FINRA Standard Cards</h5>
            <p>Official corporate fingerprint verification with authentic CRD/ORI authentication.</p>
          </div>
        </a>
      </div>
    </div>`;

if (finra.includes(finraOldHtmlTarget)) {
  finra = finra.replace(finraOldHtmlTarget, finraNewHtmlReplacement);
} else {
  console.log('Warning: finraOldHtmlTarget not found in service_finra.html');
}

fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_finra.html', finra, 'utf8');
console.log('Successfully updated service_finra.html!');
