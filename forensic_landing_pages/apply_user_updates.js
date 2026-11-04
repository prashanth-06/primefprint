const fs = require('fs');
const filePath = 'c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/landing_slider.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix .hero-badge-pill CSS (make both sides curved identically: border-radius: 50px)
const oldPillCss = `    .hero-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(2, 132, 199, 0.2);
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 6px 16px;
      border-radius: 0 30px 30px 0; border-left: none;
      font-size: 13px;
      font-weight: 700;
      color: #38bdf8;
      backdrop-filter: blur(8px);
      margin-bottom: 20px;
    }`;

const newPillCss = `    .hero-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(2, 132, 199, 0.25);
      border: 1px solid rgba(56, 189, 248, 0.5);
      padding: 7px 20px;
      border-radius: 50px; /* Fully rounded on both left and right */
      font-size: 13px;
      font-weight: 700;
      color: #38bdf8;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 15px rgba(2, 132, 199, 0.2);
      margin-bottom: 20px;
    }`;

content = content.replace(oldPillCss, newPillCss);

// 2. Fix WhatsApp Button: round circular floating action button with ONLY WhatsApp icon
const oldWaCss = `    /* Floating WhatsApp Button */
    .whatsapp-float {
      position: fixed; bottom: 28px; right: 28px;
      background: #25d366; color: #fff;
      padding: 14px 22px; border-radius: 0 30px 30px 0; border-left: none;
      display: flex; align-items: center; gap: 10px;
      font-weight: 800; font-size: 14px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
      z-index: 9999;
      transition: transform 0.2s;
    }
    .whatsapp-float:hover { transform: scale(1.05); }`;

const newWaCss = `    /* Floating WhatsApp Circular Button (Icon Only) */
    .whatsapp-float {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 56px;
      height: 56px;
      background: #25d366;
      color: #ffffff;
      border-radius: 50%; /* Pure round circular button */
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      text-decoration: none;
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.45);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .whatsapp-float:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
      color: #ffffff;
    }`;

content = content.replace(oldWaCss, newWaCss);

// Update WhatsApp button in HTML to remove text
const oldWaHtml = `  <!-- Floating WhatsApp CTA -->
  <a href="https://wa.me/918125255814?text=Hello%20Key%20Forensics,%20I%20would%20like%20to%20book%20a%20fingerprinting%20appointment." target="_blank" class="whatsapp-float">
    <i class="fa-brands fa-whatsapp" style="font-size: 20px;"></i>
    <span>Chat on WhatsApp</span>
  </a>`;

const newWaHtml = `  <!-- Floating WhatsApp CTA (Icon Only) -->
  <a href="https://wa.me/918125255814?text=Hello%20Key%20Forensics,%20I%20would%20like%20to%20book%20a%20fingerprinting%20appointment." target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
    <i class="fa-brands fa-whatsapp"></i>
  </a>`;

content = content.replace(oldWaHtml, newWaHtml);

// 3. Update Hero Slider Data & Initial HTML
// Slide 1: PCC
// Slide 2: FINRA
// Slide 3: FBI FD-258 & Canadian RCMP (Continuation)

const oldSlidesData = `    const slidesData = [
      {
        pill: "FBI FD-258 &bull; RCMP Canada &bull; FINRA Verified",
        title: "Certified Forensic Precision.<br><span class='gradient-text'>Accepted in 25+ Countries.</span>",
        desc: "Official smudge-free ink-and-roll fingerprinting and court-admissible forensic documentation for international visas, medical boards, and corporate background checks."
      },
      {
        pill: "Consular Grade Document Verification",
        title: "High-Security Clearances.<br><span class='gradient-text'>Zero Rejection from Embassies.</span>",
        desc: "Specialized ink rolled impressions on original foreign government cards guaranteed to meet strict CJIS and Canadian RCMP standards."
      },
      {
        pill: "40+ Years of Forensic Crime Lab Heritage",
        title: "Trusted by Global Corporations<br><span class='gradient-text'>& Legal Professionals Worldwide.</span>",
        desc: "Fast, confidential in-lab and mobile corporate fingerprinting appointments across Hyderabad for FINRA, NCLEX, and foreign police clearances."
      }
    ];`;

const newSlidesData = `    const slidesData = [
      {
        pill: "Police Clearance Certificate (PCC) &bull; Global Clearances",
        title: "Certified PCC Fingerprinting.<br><span class='gradient-text'>Accepted in 25+ Countries.</span>",
        desc: "Official smudge-free ink-and-roll fingerprinting and court-admissible forensic documentation for international visas, permanent residency (PR), and police clearances across USA, Canada, UK, Australia, UAE & Singapore."
      },
      {
        pill: "FINRA Corporate Fingerprinting &bull; US Licensing",
        title: "Mandatory FINRA Clearances.<br><span class='gradient-text'>Fast-Track US Broker-Dealer Licensing.</span>",
        desc: "Specialized background check fingerprinting for corporate financial institutions, US broker-dealers, investment advisors, funding firms, and offshore IT professionals with complete NDA protection."
      },
      {
        pill: "FBI FD-258 &bull; RCMP Canada &bull; 40+ Years Heritage",
        title: "High-Security Forensic Clearances.<br><span class='gradient-text'>Zero Rejection from Embassies.</span>",
        desc: "Specialized ink rolled impressions on authentic foreign government cards guaranteed to meet strict FBI CJIS and Canadian RCMP standards with senior forensic crime lab supervision."
      }
    ];`;

content = content.replace(oldSlidesData, newSlidesData);

// Also update the initial HTML in the hero section so Slide 1 shows PCC on initial load!
const oldInitialHero = `        <div class="hero-badge-pill" id="slide-pill">
          <span class="pulse-dot"></span>
          FBI FD-258 &bull; RCMP Canada &bull; FINRA Verified
        </div>

        <h1 class="hero-heading" id="slide-title">
          Certified Forensic Precision.<br>
          <span class="gradient-text">Accepted in 25+ Countries.</span>
        </h1>
        <p class="hero-subtext" id="slide-desc">
          Official smudge-free ink-and-roll fingerprinting and court-admissible forensic documentation for international visas, medical boards, and corporate background checks.
        </p>`;

const newInitialHero = `        <div class="hero-badge-pill" id="slide-pill">
          <span class="pulse-dot"></span>
          Police Clearance Certificate (PCC) &bull; Global Clearances
        </div>

        <h1 class="hero-heading" id="slide-title">
          Certified PCC Fingerprinting.<br>
          <span class="gradient-text">Accepted in 25+ Countries.</span>
        </h1>
        <p class="hero-subtext" id="slide-desc">
          Official smudge-free ink-and-roll fingerprinting and court-admissible forensic documentation for international visas, permanent residency (PR), and police clearances across USA, Canada, UK, Australia, UAE & Singapore.
        </p>`;

content = content.replace(oldInitialHero, newInitialHero);

fs.writeFileSync(filePath, content, 'utf8');
console.log('landing_slider.html successfully updated with symmetrical pill, WhatsApp icon-only, and PCC/FINRA slides!');
