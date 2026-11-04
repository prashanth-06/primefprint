const fs = require('fs');
const filePath = 'c:/Users/lapto/Documents/antigravity/keen-hypatia/forensic_landing_pages/landing_slider.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Hamburger toggle button and mobile nav CTA to header
const oldHeaderRight = `      <div class="header-right-actions">
        <button class="btn-header" onclick="openEnquiryModal()" style="border: none; cursor: pointer;">Book Appointment</button>
        
        <!-- Reliable Custom Language Selector -->
        <div class="custom-lang-wrapper">
          <select id="langSelect" class="custom-lang-select" onchange="translatePage(this.value)" title="Choose Language">
            <option value="en">?? English</option>
            <option value="hi">???? ?????? (Hindi)</option>
            <option value="te">???? ?????? (Telugu)</option>
            <option value="ar">???? ??????? (Arabic)</option>
            <option value="fr">???? Franais (French)</option>
            <option value="es">???? Espaol (Spanish)</option>
            <option value="de">???? Deutsch (German)</option>
          </select>
        </div>

        <!-- Hidden Native Google Translate Mount -->
        <div id="google_translate_element" style="display:none !important;"></div>
      </div>`;

const newHeaderRight = `      <div class="header-right-actions">
        <button class="btn-header desktop-only-btn" onclick="openEnquiryModal()" style="border: none; cursor: pointer;">Book Appointment</button>
        
        <!-- Reliable Custom Language Selector -->
        <div class="custom-lang-wrapper">
          <select id="langSelect" class="custom-lang-select" onchange="translatePage(this.value)" title="Choose Language">
            <option value="en">English</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="te">Telugu (తెలుగు)</option>
            <option value="ar">Arabic (العربية)</option>
            <option value="fr">French (Français)</option>
            <option value="es">Spanish (Español)</option>
            <option value="de">German (Deutsch)</option>
          </select>
        </div>

        <!-- Mobile Hamburger Menu Button -->
        <button class="mobile-toggle-btn" id="mobileMenuToggle" aria-label="Toggle Mobile Menu" onclick="toggleMobileMenu()">
          <i class="fa-solid fa-bars"></i>
        </button>

        <!-- Hidden Native Google Translate Mount -->
        <div id="google_translate_element" style="display:none !important;"></div>
      </div>`;

content = content.replace(oldHeaderRight, newHeaderRight);

// Also add a Mobile CTA button inside the .nav-links list before it closes
const oldNavLinksClose = `        <li class="nav-item">
          <a href="#contact" class="nav-link">Contact</a>
        </li>
      </ul>`;

const newNavLinksClose = `        <li class="nav-item">
          <a href="#contact" class="nav-link">Contact</a>
        </li>
        <li class="mobile-only-cta-item" style="padding-top: 14px; list-style: none;">
          <button class="btn-primary" onclick="openEnquiryModal(); toggleMobileMenu();" style="width: 100%; justify-content: center; padding: 12px; font-size: 15px;">
            <span>Book Appointment</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </li>
      </ul>`;

content = content.replace(oldNavLinksClose, newNavLinksClose);

// 2. Add comprehensive Mobile Responsive CSS
const mobileCss = `
    /* ============================================================
       COMPREHENSIVE MOBILE RESPONSIVE STYLES (320px - 992px)
       ============================================================ */
    .mobile-toggle-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      color: #0284c7;
      font-size: 17px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .mobile-toggle-btn:hover {
      background: #0284c7;
      color: #ffffff;
    }
    .mobile-only-cta-item { display: none; }

    @media (max-width: 992px) {
      /* Navigation Bar & Mobile Drawer */
      header {
        padding: 10px 4% !important;
      }
      .nav-container {
        justify-content: space-between !important;
      }
      .desktop-only-btn {
        display: none !important;
      }
      .mobile-toggle-btn {
        display: flex !important;
      }
      .mobile-only-cta-item {
        display: block !important;
      }
      .nav-links {
        display: flex !important;
        position: fixed !important;
        top: 66px !important;
        left: 0 !important;
        width: 100% !important;
        max-height: calc(100vh - 66px) !important;
        background: #ffffff !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0 !important;
        padding: 20px 24px 35px !important;
        overflow-y: auto !important;
        border-bottom: 2px solid #e2e8f0 !important;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15) !important;
        transform: translateY(-130%) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        z-index: 9999 !important;
      }
      .nav-links.mobile-open {
        transform: translateY(0) !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      .nav-links .nav-item {
        width: 100% !important;
        border-bottom: 1px solid #f1f5f9 !important;
        padding: 14px 0 !important;
      }
      .nav-links .nav-link {
        font-size: 16px !important;
        font-weight: 700 !important;
        color: #0f172a !important;
        justify-content: space-between !important;
      }
      .nav-links .dropdown {
        position: static !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        box-shadow: none !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 12px !important;
        margin-top: 10px !important;
        padding: 10px !important;
        background: #f8fafc !important;
      }
      .nav-links .dropdown a {
        padding: 12px 10px !important;
        font-size: 14px !important;
        border-bottom: 1px solid #e2e8f0 !important;
      }
      .nav-links .dropdown li:last-child a {
        border-bottom: none !important;
      }
      .custom-lang-select {
        padding: 6px 10px !important;
        font-size: 12px !important;
        max-width: 110px !important;
      }
    }

    @media (max-width: 768px) {
      /* General Typography & Spacing */
      body {
        font-size: 14px !important;
        overflow-x: hidden !important;
      }
      .section-title {
        font-size: 24px !important;
        line-height: 1.25 !important;
      }
      .section-desc {
        font-size: 13.5px !important;
        line-height: 1.55 !important;
      }
      .tag-badge {
        font-size: 11px !important;
        padding: 4px 12px !important;
      }

      /* Logo Scaling */
      .brand-logo { gap: 8px !important; }
      .logo-icon { width: 34px !important; height: 34px !important; font-size: 15px !important; }
      .logo-text h3 { font-size: 16px !important; }
      .logo-text span { font-size: 9px !important; letter-spacing: 1.5px !important; }

      /* Hero Cinematic Slider Section */
      .hero-slider-section {
        height: auto !important;
        min-height: 100vh !important;
        padding: 85px 16px 50px !important;
      }
      .hero-slider-content {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }
      .hero-badge-pill {
        font-size: 11px !important;
        padding: 5px 12px !important;
        margin-bottom: 14px !important;
      }
      .hero-heading {
        font-size: 26px !important;
        line-height: 1.25 !important;
        margin-bottom: 12px !important;
      }
      .hero-subtext {
        font-size: 13.5px !important;
        line-height: 1.55 !important;
        margin-bottom: 20px !important;
      }
      .hero-actions {
        flex-direction: column !important;
        width: 100% !important;
        gap: 10px !important;
      }
      .hero-actions .btn-primary,
      .hero-actions .btn-secondary {
        width: 100% !important;
        justify-content: center !important;
        padding: 12px 18px !important;
        font-size: 14px !important;
      }
      .hero-form-card {
        padding: 22px 16px !important;
        border-radius: 16px !important;
        margin-top: 5px !important;
      }
      .hero-form-card h3 {
        font-size: 19px !important;
      }
      .slider-arrows {
        display: none !important;
      }
      .slider-dots {
        bottom: 15px !important;
      }

      /* Sticky Left Action Pills on Mobile */
      .sticky-left-actions {
        top: auto !important;
        bottom: 85px !important;
        transform: none !important;
        left: 0 !important;
        gap: 6px !important;
      }
      .sticky-pill {
        width: 38px !important;
        height: 38px !important;
      }
      .sticky-pill-icon {
        width: 38px !important;
        height: 38px !important;
        font-size: 14px !important;
      }
      .sticky-pill:hover {
        width: 38px !important; /* Keep compact on mobile touch screens */
      }
      .sticky-pill-text-wrap {
        display: none !important;
      }

      /* About Section */
      .about-story {
        padding: 55px 16px !important;
      }
      .about-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
      }
      .about-visual img {
        height: 250px !important;
        object-fit: cover !important;
        width: 100% !important;
      }
      .about-plane-bg-wrap {
        display: none !important; /* Avoid horizontal viewport overflow on mobile */
      }
      .about-experience-badge {
        bottom: 12px !important;
        left: 12px !important;
        padding: 8px 14px !important;
      }
      .about-experience-badge .exp-years { font-size: 24px !important; }
      .about-experience-badge .exp-label { font-size: 10.5px !important; }
      .story-card {
        padding: 18px 16px !important;
        margin-bottom: 14px !important;
      }

      /* Services Section */
      .services-section {
        padding: 55px 16px !important;
      }
      .services-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      .service-box {
        padding: 24px 18px !important;
      }
      .service-box h3 {
        font-size: 19px !important;
      }
      .service-bullet-list li {
        font-size: 13px !important;
      }

      /* Why Choose Us Section */
      .why-choose-us {
        padding: 55px 16px !important;
      }
      .features-grid {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }
      .feature-tile {
        padding: 22px 16px !important;
      }

      /* Global Presence & World Map */
      .global-presence {
        padding: 55px 16px !important;
      }
      .routex-plane-motif {
        display: none !important;
      }
      .map-wrapper {
        padding: 18px 12px !important;
        border-radius: 16px !important;
      }
      #world-map {
        height: 260px !important;
      }
      .map-summary-bar {
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        margin-top: 20px !important;
        padding-top: 16px !important;
      }
      .map-summary-card {
        padding: 14px !important;
      }
      .map-summary-card h4 {
        font-size: 14.5px !important;
      }
      .map-summary-card p {
        font-size: 12.5px !important;
      }

      /* Testimonials Section */
      .testimonials-section {
        padding: 55px 16px !important;
      }
      .testimonials-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }
      .testi-card {
        padding: 20px 16px !important;
      }

      /* FAQ Section */
      .faq-section {
        padding: 55px 16px !important;
      }
      .faq-trigger {
        font-size: 14.5px !important;
        padding: 16px 14px !important;
      }
      .faq-body {
        font-size: 13px !important;
        padding: 0 14px 16px !important;
      }

      /* Contact Section */
      .contact-section {
        padding: 55px 16px !important;
      }
      .contact-container {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .contact-info-panel,
      .contact-form-panel {
        padding: 22px 16px !important;
      }

      /* Footer */
      footer {
        padding: 50px 16px 25px !important;
      }
      .footer-content {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .footer-bottom {
        flex-direction: column !important;
        gap: 8px !important;
        text-align: center !important;
        font-size: 12px !important;
      }

      /* Floating Scroll % & WhatsApp Position */
      #scroll-percentage {
        bottom: 20px !important;
        right: 18px !important;
        width: 44px !important;
        height: 44px !important;
      }
      .whatsapp-float {
        bottom: 20px !important;
        left: 18px !important;
        padding: 8px 14px !important;
        font-size: 12.5px !important;
      }

      /* Modal Dialog on Mobile */
      .modal-dialog {
        padding: 24px 18px !important;
        margin: 16px !important;
        max-width: 95% !important;
      }
    }
`;

content = content.replace('</style>', mobileCss + '\n</style>');

// 3. Add toggleMobileMenu() script to main script block
const mobileMenuScript = `
    // Mobile Hamburger Menu Controller
    window.toggleMobileMenu = function() {
      const navLinks = document.querySelector('.nav-links');
      const toggleBtn = document.getElementById('mobileMenuToggle');
      if (navLinks) {
        navLinks.classList.toggle('mobile-open');
        const isOpen = navLinks.classList.contains('mobile-open');
        if (toggleBtn) {
          toggleBtn.innerHTML = isOpen ? '<i class=\"fa-solid fa-xmark\"></i>' : '<i class=\"fa-solid fa-bars\"></i>';
        }
      }
    };

    // Auto-close mobile menu upon clicking any nav link
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
          const navLinks = document.querySelector('.nav-links');
          const toggleBtn = document.getElementById('mobileMenuToggle');
          if (navLinks && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            if (toggleBtn) toggleBtn.innerHTML = '<i class=\"fa-solid fa-bars\"></i>';
          }
        });
      });
    });
`;

const targetInsertScript = '  </script>\n\n    <!-- LEFT SIDE STICKY EXPANDING ACTION PILLS';
content = content.replace(targetInsertScript, mobileMenuScript + '\n' + targetInsertScript);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Mobile responsiveness applied successfully to landing_slider.html!');
