const fs = require('fs');

// Read files
let pcc = fs.readFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_pcc.html', 'utf8');
let finra = fs.readFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_finra.html', 'utf8');

// Ensure SmoothScroll library is included in head if not already
const smoothScrollCdn = '<script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"></script>';

// Common enhanced CSS to inject/replace
const enhancedCss = `
    /* Top Reading Scroll Progress Bar */
    #scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3.5px;
      width: 0%;
      background: linear-gradient(90deg, #0284c7, #38bdf8, #0ea5e9);
      z-index: 99999;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(2, 132, 199, 0.5);
    }

    /* Routex Circular Scroll-Percentage & Back To Top Button */
    #scroll-percentage {
      height: 52px;
      width: 52px;
      background: conic-gradient(#0284c7 0%, #e2e8f0 0%);
      border-radius: 50%;
      position: fixed;
      bottom: 30px;
      right: 30px;
      transform: scale(0);
      display: grid;
      place-items: center;
      cursor: pointer;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 999;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);
    }
    #scroll-percentage.active {
      transform: scale(1);
      opacity: 1;
      visibility: visible;
    }
    #scroll-percentage:hover {
      transform: scale(1.1) translateY(-2px);
      box-shadow: 0 14px 30px rgba(2, 132, 199, 0.3);
    }
    #scroll-percentage-value {
      width: 42px;
      height: 42px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      color: #0284c7;
      position: relative;
    }
    #scroll-percentage-value .pct-icon {
      display: none;
      font-size: 13px;
    }
    #scroll-percentage:hover #scroll-percentage-value .pct-text { display: none; }
    #scroll-percentage:hover #scroll-percentage-value .pct-icon { display: block; color: #0284c7; }

    /* INNER PAGE HERO (CLEAN LIGHT THEME WITH BREADCRUMB ONLY) */
    .inner-page-hero {
      background: linear-gradient(135deg, #f0f7ff 0%, #f8fafc 60%, #ffffff 100%);
      border-bottom: 1px solid var(--card-border);
      padding: 44px 5% 48px;
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
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
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

    /* Headings Scroll Reveal & Fade In / Fade Out Animation */
    .heading-fade, .section-title, .section-head, .inner-hero-title {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .heading-fade.revealed, .section-title.revealed, .section-head.revealed, .inner-hero-title.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .heading-fade.faded-out, .section-title.faded-out, .section-head.faded-out {
      opacity: 0.25;
      transform: translateY(-14px);
    }

    /* OVERVIEW SPLIT LAYOUT IN CONTENT SECTION */
    .pcc-overview-container {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 52px;
      align-items: center;
    }
    .pcc-overview-content {
      display: flex;
      flex-direction: column;
    }

    /* Clean, well-spaced list items (No native bullet dots) */
    .service-bullet-list {
      list-style: none !important;
      padding: 0 !important;
      margin: 0 0 32px 0 !important;
    }
    .service-bullet-list li {
      display: flex !important;
      align-items: flex-start !important;
      gap: 14px !important;
      font-size: 15px !important;
      color: #334155 !important;
      line-height: 1.65 !important;
      margin-bottom: 16px !important;
      list-style: none !important;
    }
    .service-bullet-list li:last-child {
      margin-bottom: 0 !important;
    }
    .service-bullet-list li i {
      color: #0284c7 !important;
      font-size: 16px !important;
      margin-top: 4px !important;
      flex-shrink: 0 !important;
    }
    .service-bullet-list li strong {
      color: #0f172a !important;
      font-weight: 700 !important;
    }

    /* Overview CTA Row with Proper Spacing */
    .overview-cta-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    /* Fancybox Document Inspection Card (Pure Image + Sleek Badge) */
    .fancybox-card {
      display: block;
      text-decoration: none;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
      border: 1px solid #cbd5e1;
      position: relative;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      background: #0f172a;
      cursor: pointer;
    }
    .fancybox-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 22px 50px rgba(2, 132, 199, 0.22);
      border-color: #38bdf8;
    }
    .fancybox-img-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10.5;
      overflow: hidden;
    }
    .fancybox-img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fancybox-card:hover .fancybox-img-container img {
      transform: scale(1.05);
    }
    .fancybox-badge {
      position: absolute;
      bottom: 16px;
      right: 16px;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(10px);
      color: #ffffff;
      padding: 9px 16px;
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
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
      transform: scale(1.03);
    }
    .fancybox-card:hover .fancybox-badge i {
      color: #ffffff;
    }

    /* ENHANCED CARD DESIGNS (Elevated Shadows, Top Line Accent, Smooth Hover) */
    .feature-card {
      background: #ffffff;
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 34px 28px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .feature-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0284c7, #38bdf8);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 40px rgba(2, 132, 199, 0.12);
      border-color: #bae6fd;
    }
    .feature-card:hover::before {
      opacity: 1;
    }
    .card-icon-wrap {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%);
      border: 1px solid #bae6fd;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0284c7;
      font-size: 22px;
      margin-bottom: 22px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
    }
    .feature-card:hover .card-icon-wrap {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      transform: scale(1.08) rotate(2deg);
      box-shadow: 0 8px 20px rgba(2, 132, 199, 0.3);
      border-color: #0284c7;
    }
    .feature-card h4 {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
      letter-spacing: -0.3px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .feature-card p {
      font-size: 14px;
      color: #64748b;
      line-height: 1.65;
      margin: 0;
    }

    /* Timeline Step Cards Enhancement */
    .timeline-step {
      background: #ffffff;
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 34px 28px;
      position: relative;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .timeline-step:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 40px rgba(2, 132, 199, 0.12);
      border-color: #bae6fd;
    }
    .step-num-badge {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 20px;
      box-shadow: 0 6px 16px rgba(2, 132, 199, 0.35);
    }
    .step-time-chip {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }

    /* Mobile Responsive Breakpoints */
    @media (max-width: 992px) {
      .pcc-overview-container {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .inner-hero-title {
        font-size: 28px;
      }
      .overview-cta-row {
        flex-direction: column;
      }
      .overview-cta-row a {
        width: 100%;
        justify-content: center;
      }
    }
`;

// Common scripts to inject before </body>
const enhancedScripts = `
  <!-- Routex Smooth Inertia Scrolling & Heading Fade Observer -->
  <div id="scroll-percentage" onclick="scrollToTop()" title="Back to Top">
    <div id="scroll-percentage-value">
      <span class="pct-text">0%</span>
      <i class="fa-solid fa-arrow-up pct-icon"></i>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
  <script>
    // 1. Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {});

    // 2. Initialize Routex Smooth Momentum Scroll
    document.addEventListener("DOMContentLoaded", function () {
      if (typeof SmoothScroll !== 'undefined') {
        SmoothScroll({
          animationTime: 850,
          stepSize: 80,
          accelerationDelta: 50,
          accelerationMax: 3,
          pulseAlgorithm: true,
          pulseScale: 4,
          pulseNormalize: 1,
          touchpadSupport: true
        });
      }

      // Top Progress Bar & Scroll Indicator
      const progressBar = document.getElementById('scroll-progress-bar');
      const scrollPctEl = document.getElementById('scroll-percentage');
      const pctTextEl = document.querySelector('#scroll-percentage-value .pct-text');

      window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        const roundedPct = Math.round(scrollPercent);

        if (progressBar) progressBar.style.width = scrollPercent + '%';

        if (scrollPctEl) {
          scrollPctEl.style.background = \`conic-gradient(#0284c7 \${roundedPct}%, #e2e8f0 \${roundedPct}%)\`;
          if (pctTextEl) pctTextEl.textContent = roundedPct + '%';
          if (scrollTop > 200) {
            scrollPctEl.classList.add('active');
          } else {
            scrollPctEl.classList.remove('active');
          }
        }
      }, { passive: true });

      // Smooth Anchor Navigation with Offset
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              const headerOffset = 90;
              const elementPosition = targetEl.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });

      // 3. Heading Fade In & Fade Out on Scroll
      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.classList.remove('faded-out');
          } else {
            if (entry.boundingClientRect.top < 0) {
              entry.target.classList.add('faded-out');
              entry.target.classList.remove('revealed');
            } else {
              entry.target.classList.remove('revealed');
              entry.target.classList.remove('faded-out');
            }
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.heading-fade, .section-title, .section-head, .inner-hero-title').forEach(el => {
        headingObserver.observe(el);
      });

      // Reveal hero title immediately on load
      const heroTitle = document.querySelector('.inner-hero-title');
      if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('revealed'), 80);
      }
    });

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileMenu() {
      document.getElementById('navLinks').classList.toggle('mobile-open');
    }

    function toggleFaq(btn) {
      const body = btn.nextElementSibling;
      const icon = btn.querySelector('i');
      const isCurrentlyOpen = body.style.display === 'block';

      document.querySelectorAll('.faq-body').forEach(b => b.style.display = 'none');
      document.querySelectorAll('.faq-trigger i').forEach(ic => {
        ic.classList.remove('fa-minus');
        ic.classList.add('fa-plus');
      });

      if (!isCurrentlyOpen) {
        body.style.display = 'block';
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    }
  </script>
</body>
</html>`;

// Update service_pcc.html
// 1. Replace style block or append enhancedCss
// Let's replace the inner-page-hero / pcc-overview-container CSS block
pcc = pcc.replace(/(\/\* INNER PAGE HERO[\s\S]*?)(?=\/\* GRID CARDS)/, enhancedCss + '\n    /* GRID CARDS');

// 2. Ensure progress bar is right after <body>
if (!pcc.includes('id="scroll-progress-bar"')) {
  pcc = pcc.replace('<body>', '<body>\n  <!-- Top Reading Scroll Progress Bar -->\n  <div id="scroll-progress-bar"></div>');
}

// 3. Restructure Content Section in PCC:
// Separate Overview from 3 Pillars with generous padding and background
const oldPccContentRegex = /<!-- Content Section: PCC Overview[\s\S]*?<\/div>\s*<\/section>/;

const newPccContent = `<!-- Content Section 1: PCC Overview with Integrated Fancybox Visual Inspection -->
  <section style="background: #ffffff; padding: 75px 5% 70px;">
    <div class="pcc-overview-container">
      <div class="pcc-overview-content">
        <span class="tag-badge">Official Consular Clarification</span>
        <h2 class="section-title heading-fade" style="text-align: left; margin-bottom: 20px;">What is a Police Clearance Certificate (PCC)?</h2>
        <p class="section-desc" style="text-align: left; margin-bottom: 20px;">
          A Police Clearance Certificate (PCC) is an official legal record issued by sovereign police or federal law enforcement agencies confirming whether an individual has any criminal convictions or ongoing judicial proceedings. It serves as mandatory proof of good character for international relocation.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.75; margin-bottom: 28px;">
          Different foreign governments require fingerprints rolled on specific sovereign fingerprint cards (such as <strong>FBI FD-258</strong> for the USA or <strong>RCMP C-216C</strong> for Canada) along with court-admissible forensic examiner authentication.
        </p>

        <!-- Properly Spaced Service List Items (No double bullet dots) -->
        <ul class="service-bullet-list">
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>100% Embassy Acceptance:</strong> Recognized across 25+ sovereign consulates worldwide</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>Original Fingerprint Cards:</strong> Authentic FBI FD-258 &amp; RCMP C-216C forms in stock</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>Ex-Govt Senior Examiners:</strong> 40+ years experience ensuring zero smudge rejection</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>20-Min Fast Track:</strong> Express in-lab appointments with same-day completion</div>
          </li>
        </ul>

        <!-- Generous CTA Action Row -->
        <div class="overview-cta-row">
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

      <!-- Fancybox Image Inspection Card (Pure Image + Sleek Badge) -->
      <div class="pcc-overview-visual">
        <a href="images/pcc_hero.jpg" data-fancybox="pcc-gallery" data-caption="Official Police Clearance Certificate (PCC) Documentation &amp; FBI FD-258 Fingerprint Verification" class="fancybox-card">
          <div class="fancybox-img-container">
            <img src="images/pcc_hero.jpg" alt="Certified Police Clearance Certificate Consular Verification Desk">
            <div class="fancybox-badge">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>Click to Enlarge / Inspect</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Content Section 2: Core Certification Pillars (Enhanced Card Section) -->
  <section class="section-pillars" style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 85px 5%;">
    <div class="section-head heading-fade">
      <span class="tag-badge">Core Benchmarks</span>
      <h2 class="section-title">Essential Certification Pillars</h2>
      <p class="section-desc">Key standards ensuring international sovereign admissibility without rejection or delay.</p>
    </div>

    <div class="feature-grid-3">
      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-passport"></i></div>
        <h4>Also Known As</h4>
        <p>Criminal Record Check (CRC), Certificate of Clearance (COC), Identity History Summary (IdHS), Police Check, or Good Standing Certificate.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-scale-balanced"></i></div>
        <h4>Legal Requirement</h4>
        <p>Mandatory for foreign embassies, consulates, immigration departments, and international corporations to verify applicant security standing.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-award"></i></div>
        <h4>Zero-Smudge Guarantee</h4>
        <p>Our senior crime laboratory examiners ensure smudge-free, high-definition friction ridge rolling to eliminate any risk of rejection by foreign consulates.</p>
      </div>
    </div>
  </section>`;

pcc = pcc.replace(oldPccContentRegex, newPccContent);

// 4. Update the bottom scripts
pcc = pcc.replace(/<!-- Fancybox JS[\s\S]*?<\/html>/, enhancedScripts);
fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_pcc.html', pcc, 'utf8');
console.log('Successfully updated service_pcc.html!');


// Update service_finra.html similarly
finra = finra.replace(/(\/\* INNER PAGE HERO[\s\S]*?)(?=\/\* GRID CARDS)/, enhancedCss + '\n    /* GRID CARDS');

if (!finra.includes('id="scroll-progress-bar"')) {
  finra = finra.replace('<body>', '<body>\n  <!-- Top Reading Scroll Progress Bar -->\n  <div id="scroll-progress-bar"></div>');
}

const oldFinraContentRegex = /<!-- Content Section: FINRA Overview[\s\S]*?<\/div>\s*<\/section>/;

const newFinraContent = `<!-- Content Section 1: FINRA Overview with Integrated Fancybox Visual Inspection -->
  <section style="background: #ffffff; padding: 75px 5% 70px;">
    <div class="pcc-overview-container">
      <div class="pcc-overview-content">
        <span class="tag-badge">US Regulatory Compliance</span>
        <h2 class="section-title heading-fade" style="text-align: left; margin-bottom: 20px;">What is FINRA Fingerprinting?</h2>
        <p class="section-desc" style="text-align: left; margin-bottom: 20px;">
          FINRA (Financial Industry Regulatory Authority) fingerprinting is a mandatory statutory background verification process for individuals registering with FINRA member firms in the United States.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.75; margin-bottom: 28px;">
          Under <strong>SEC Rule 17f-2</strong>, candidate fingerprints are submitted to conduct an FBI criminal background check as part of federal regulatory requirements. Candidates must have their friction ridges rolled on authentic FINRA-approved cards with authentic employer codes and CRD numbers.
        </p>

        <!-- Properly Spaced Service List Items (No double bullet dots) -->
        <ul class="service-bullet-list">
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>Official FINRA Cards:</strong> Authentic FBI standard fingerprint cards in stock with correct ORI</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>100% FBI CJIS Smudge-Free:</strong> Rolled according to strict FBI biometric capture specs</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>NDA Protection:</strong> Strict data confidentiality for financial firms &amp; IT contractors</div>
          </li>
          <li>
            <i class="fa-solid fa-circle-check"></i>
            <div><strong>Courier Dispatch Assistance:</strong> Fast international courier forwarding to designated US addresses</div>
          </li>
        </ul>

        <!-- Generous CTA Action Row -->
        <div class="overview-cta-row">
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

      <!-- Fancybox Image Inspection Card (Pure Image + Sleek Badge) -->
      <div class="pcc-overview-visual">
        <a href="images/finra_hero.jpg" data-fancybox="finra-gallery" data-caption="FINRA Fingerprinting Cards and US Corporate Compliance Documentation" class="fancybox-card">
          <div class="fancybox-img-container">
            <img src="images/finra_hero.jpg" alt="Official FINRA Fingerprinting Card and Corporate US Compliance Documentation">
            <div class="fancybox-badge">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>Click to Enlarge / Inspect</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Content Section 2: Core Compliance Pillars (Enhanced Card Section) -->
  <section class="section-pillars" style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 85px 5%;">
    <div class="section-head heading-fade">
      <span class="tag-badge">Mandatory Standards</span>
      <h2 class="section-title">Core Compliance Framework</h2>
      <p class="section-desc">Statutory requirements governing FINRA registered personnel and financial contractors.</p>
    </div>

    <div class="feature-grid-3">
      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-building-columns"></i></div>
        <h4>Federal FBI Vetting</h4>
        <p>Under SEC Rule 17f-2, candidate fingerprints are submitted to conduct an FBI criminal background check as part of federal regulatory compliance for the U.S. financial services industry.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-file-signature"></i></div>
        <h4>Official Card Standards</h4>
        <p>Fingerprints must be recorded on official FINRA-compliant cards with exact ORI numbers, CRD numbers, and employer codes properly authenticated.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-user-lock"></i></div>
        <h4>Strict NDA Confidentiality</h4>
        <p>We work with leading investment banks and offshore technology companies, maintaining strict data privacy protocols and Non-Disclosure Agreements (NDAs).</p>
      </div>
    </div>
  </section>`;

finra = finra.replace(oldFinraContentRegex, newFinraContent);

finra = finra.replace(/<!-- Fancybox JS[\s\S]*?<\/html>/, enhancedScripts);
fs.writeFileSync('c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/service_finra.html', finra, 'utf8');
console.log('Successfully updated service_finra.html!');
