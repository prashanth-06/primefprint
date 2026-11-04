const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);

// COMMON CSS STYLES FOR THE SERVICE PAGES
const commonStyles = `
    :root {
      --primary: #0a0f1d;
      --primary-accent: #0284c7;
      --primary-accent-dark: #0369a1;
      --secondary: #0f172a;
      --bg-light: #f8fafc;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --card-border: #e2e8f0;
      --card-border-hover: #bae6fd;
      --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 10px 25px -3px rgba(0, 0, 0, 0.08);
      --shadow-lg: 0 20px 40px -4px rgba(0, 0, 0, 0.12);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: var(--text-main);
      background-color: #ffffff;
      line-height: 1.6;
      overflow-x: hidden;
      top: 0px !important;
    }
    h1, h2, h3, h4 {
      font-family: 'Space Grotesk', sans-serif;
      color: var(--primary);
    }

    /* TOP NOTIFICATION STRIP */
    .top-strip {
      background: #0a0f1d;
      color: #94a3b8;
      font-size: 13px;
      padding: 10px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .top-strip a { color: #38bdf8; text-decoration: none; font-weight: 600; }
    .strip-items { display: flex; gap: 20px; }

    /* HEADER & NAVIGATION */
    header {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid var(--card-border);
      padding: 14px 5%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
    }
    .nav-container {
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .logo-icon {
      width: 42px; height: 42px;
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }
    .logo-text h3 {
      font-size: 19px;
      font-weight: 800;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.5px;
      color: #0f172a;
    }
    .logo-text span {
      font-size: 11px;
      color: var(--primary-accent);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      display: block;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
    }
    .nav-link {
      text-decoration: none;
      color: #334155;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
      position: relative;
    }
    .nav-link:hover, .nav-link.active { color: var(--primary-accent); }
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -18px;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary-accent);
      border-radius: 3px 3px 0 0;
    }

    /* Dropdown */
    .nav-item { position: relative; }
    .dropdown {
      position: absolute;
      top: 100%;
      left: -20px;
      background: #ffffff;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      width: 290px;
      padding: 12px;
      list-style: none;
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 100;
    }
    .nav-item:hover .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(6px);
    }
    .dropdown li { margin-bottom: 6px; }
    .dropdown li:last-child { margin-bottom: 0; }
    .dropdown a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      color: #334155;
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .dropdown a:hover, .dropdown a.active {
      background: #f0f9ff;
      color: var(--primary-accent);
    }
    .dropdown-icon {
      font-size: 16px;
      color: var(--primary-accent);
      width: 20px;
      text-align: center;
    }
    .dropdown-desc {
      display: block;
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 400;
      margin-top: 2px;
    }

    .header-right-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .btn-header {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
      transition: all 0.25s;
      border: none;
      cursor: pointer;
    }
    .btn-header:hover {
      background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(2, 132, 199, 0.4);
    }
    .mobile-toggle-btn {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid var(--card-border);
      color: #0f172a;
      font-size: 18px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* BUTTONS */
    .btn-primary {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      padding: 14px 28px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14.5px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(2, 132, 199, 0.35);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      border: none;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.45);
      color: #ffffff;
    }
    .btn-outline {
      background: #ffffff;
      border: 1.5px solid #0284c7;
      color: #0284c7;
      padding: 13px 26px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14.5px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s;
    }
    .btn-outline:hover {
      background: #f0f9ff;
      border-color: #0369a1;
      color: #0369a1;
      transform: translateY(-2px);
    }

    /* BADGE PILLS */
    .tag-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 6px 18px;
      border-radius: 50px !important;
      box-shadow: 0 2px 10px rgba(2, 132, 199, 0.08);
      margin-bottom: 16px;
    }
    .tag-badge::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #0284c7;
      box-shadow: 0 0 8px rgba(2, 132, 199, 0.6);
    }

    /* SECTION BASICS */
    section { padding: 90px 5%; position: relative; }
    .section-head { text-align: center; max-width: 780px; margin: 0 auto 55px; }
    .section-title {
      font-size: 38px;
      font-weight: 800;
      letter-spacing: -1px;
      margin-bottom: 14px;
      color: #0f172a;
    }
    .section-desc {
      font-size: 16px;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* HERO SECTION FOR SERVICE PAGES */
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
    }

    /* GRID CARDS FOR AUDIENCE & SERVICE SCOPE */
    .feature-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 26px;
      max-width: 1300px;
      margin: 0 auto;
    }
    .feature-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
      max-width: 1300px;
      margin: 0 auto;
    }
    .feature-card {
      background: #ffffff;
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 28px 24px;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      border-color: #93c5fd;
      box-shadow: 0 16px 32px rgba(2, 132, 199, 0.12);
    }
    .card-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 1px solid #bae6fd;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0284c7;
      font-size: 22px;
      margin-bottom: 20px;
      transition: all 0.25s;
    }
    .feature-card:hover .card-icon-wrap {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      transform: scale(1.08) rotate(3deg);
    }
    .feature-card h4 {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      letter-spacing: -0.3px;
    }
    .feature-card p {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
      margin: 0;
    }

    /* TIMELINE WORKFLOW BAR */
    .timeline-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
    }
    .step-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 32px 26px;
      text-align: center;
      position: relative;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
      transition: all 0.3s;
    }
    .step-card:hover {
      transform: translateY(-4px);
      border-color: #0284c7;
      box-shadow: 0 14px 30px rgba(2, 132, 199, 0.12);
    }
    .step-badge {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #0284c7;
      color: #ffffff;
      font-weight: 800;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 0 12px rgba(2, 132, 199, 0.5);
    }
    .step-card h4 {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .step-time {
      display: inline-block;
      font-size: 13px;
      font-weight: 700;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 3px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .step-card p {
      font-size: 13.5px;
      color: #64748b;
      line-height: 1.5;
    }

    /* ROTATING BORDER FORM ON SERVICE PAGES */
    .booking-wrapper {
      max-width: 820px;
      margin: 0 auto;
    }
    .service-booking-card {
      background: #cbd5e1;
      border: none;
      border-radius: 22px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(2, 132, 199, 0.15);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    .service-booking-card::before {
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
      z-index: -2;
    }
    .service-booking-card::after {
      content: "";
      position: absolute;
      inset: 2px;
      background: #ffffff;
      border-radius: 20px;
      z-index: -1;
    }
    .form-inner-content {
      position: relative;
      z-index: 2;
    }
    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-field { margin-bottom: 16px; }
    .form-field label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 14px;
      background: #f8fafc;
      color: #0f172a;
      transition: all 0.2s;
      font-family: inherit;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
      outline: none;
      border-color: #0284c7;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
    }

    /* FAQ ACCORDION */
    .faq-wrapper { max-width: 860px; margin: 0 auto; }
    .faq-block {
      background: #ffffff;
      border: 1px solid var(--card-border);
      border-radius: 14px;
      margin-bottom: 14px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .faq-trigger {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      background: none;
      border: none;
      color: #0f172a;
      font-size: 16.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Space Grotesk', sans-serif;
      transition: color 0.2s;
    }
    .faq-trigger:hover { color: var(--primary-accent); }
    .faq-body {
      display: none;
      padding: 0 24px 20px;
      color: var(--text-muted);
      font-size: 14.5px;
      line-height: 1.7;
      animation: faqSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes faqSlideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* FLOATING WHATSAPP BUTTON (BOTTOM LEFT, ICON ONLY) */
    .whatsapp-float {
      position: fixed;
      bottom: 28px;
      left: 28px;
      width: 56px;
      height: 56px;
      background: #25d366;
      color: #ffffff;
      border-radius: 50% !important;
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
    }

    /* FOOTER */
    footer {
      background: #0a0f1d;
      color: #94a3b8;
      padding: 70px 5% 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .footer-content {
      max-width: 1300px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 50px;
      margin-bottom: 50px;
    }
    .footer-col h4 {
      color: #ffffff;
      font-size: 17px;
      margin-bottom: 20px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; }
    .footer-col ul a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;
    }
    .footer-col ul a:hover { color: #38bdf8; }
    .footer-bottom {
      max-width: 1300px;
      margin: 0 auto;
      text-align: center;
      padding-top: 25px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 13px;
    }

    /* RESPONSIVE BREAKPOINTS */
    @media (max-width: 992px) {
      .service-hero-container { grid-template-columns: 1fr; gap: 40px; }
      .feature-grid-3, .feature-grid-4, .timeline-steps { grid-template-columns: 1fr; }
      .footer-content { grid-template-columns: 1fr; gap: 30px; }
      .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        padding: 20px 5%;
        border-bottom: 1px solid var(--card-border);
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }
      .nav-links.mobile-open { display: flex; }
      .mobile-toggle-btn { display: flex; }
      .form-grid-2 { grid-template-columns: 1fr; }
      .service-booking-card { padding: 24px 18px; }
      .whatsapp-float { bottom: 22px !important; left: 20px !important; width: 48px !important; height: 48px !important; font-size: 24px !important; }
    }
`;

// ==========================================
// 1. GENERATE service_pcc.html
// ==========================================
const pccHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Police Clearance Certificate (PCC) Processing &amp; Fingerprinting | Key Forensics</title>
  <meta name="description" content="Certified Police Clearance Certificate (PCC) fingerprinting and international consular processing in Hyderabad, India. Accepted for USA, Canada, UK, Australia, Singapore &amp; UAE immigration.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
${commonStyles}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"></script>
</head>
<body>

  <!-- Top Strip -->
  <div class="top-strip">
    <div><i class="fa-solid fa-location-dot" style="color: var(--primary-accent); margin-right: 6px;"></i> Official Forensic Laboratory &bull; Hyderabad, India</div>
    <div class="strip-items">
      <span><i class="fa-solid fa-phone" style="color: var(--primary-accent); margin-right: 6px;"></i> Prior Appointment Mandatory: <a href="tel:+918125255814">+91 81252 55814</a></span>
      <span><i class="fa-regular fa-clock" style="color: var(--primary-accent); margin-right: 6px;"></i> Mon - Sat: 9:30 AM - 6:30 PM</span>
    </div>
  </div>

  <!-- Header -->
  <header>
    <div class="nav-container">
      <a href="landing_slider.html" class="brand-logo">
        <div class="logo-icon"><i class="fa-solid fa-fingerprint"></i></div>
        <div class="logo-text">
          <h3>Key Forensics</h3>
          <span>Certified Experts</span>
        </div>
      </a>

      <ul class="nav-links" id="navLinks">
        <li class="nav-item">
          <a href="landing_slider.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="landing_slider.html#services" class="nav-link active">
            Services <i class="fa-solid fa-chevron-down" style="font-size: 11px;"></i>
          </a>
          <ul class="dropdown">
            <li>
              <a href="service_pcc.html" class="active">
                <i class="fa-solid fa-passport dropdown-icon"></i>
                <div>
                  Police Clearance Certificate (PCC)
                  <span class="dropdown-desc">Global Visa &amp; Immigration Clearance</span>
                </div>
              </a>
            </li>
            <li>
              <a href="service_finra.html">
                <i class="fa-solid fa-briefcase dropdown-icon"></i>
                <div>
                  FINRA Fingerprinting
                  <span class="dropdown-desc">US Corporate &amp; Broker-Dealer Licensing</span>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="landing_slider.html#contact" class="nav-link">Contact</a>
        </li>
      </ul>

      <div class="header-right-actions">
        <a href="#pcc-booking" class="btn-header">Book Appointment</a>
        <button class="mobile-toggle-btn" onclick="toggleMobileMenu()" aria-label="Toggle Navigation">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- PCC Hero Section -->
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
  </section>

  <!-- Who Requires PCC / Ideal For -->
  <section style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="section-head">
      <span class="tag-badge">Applicant Scope</span>
      <h2 class="section-title">Who Needs a PCC? (Ideal For)</h2>
      <p class="section-desc">We routinely assist applicants filing documentation with global embassies and immigration boards.</p>
    </div>

    <div class="feature-grid-4">
      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-plane-arrival"></i></div>
        <h4>Immigration &amp; PR</h4>
        <p>Permanent residency filings for Canada Express Entry, Australia PR, USA Green Card, and UK Settlement.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-briefcase"></i></div>
        <h4>Employment Abroad</h4>
        <p>Foreign corporate background vetting across UAE, Qatar, Singapore, Europe, and multinational corporations.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div>
        <h4>Higher Education</h4>
        <p>International university admissions, student visa clearances, and embassy security clearances.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-user-doctor"></i></div>
        <h4>Medical &amp; Nursing</h4>
        <p>NCLEX, CGFNS, UK NMC, and foreign healthcare board licensing requiring official background checks.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-id-card"></i></div>
        <h4>Work Permits</h4>
        <p>Specialized work visa processing and overseas assignment documentation for IT and healthcare professionals.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-users"></i></div>
        <h4>Family &amp; Dependent Visas</h4>
        <p>Spousal sponsorships, dependent visa applications, and child adoption background verifications.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-flag"></i></div>
        <h4>Citizenship Applications</h4>
        <p>Naturalization and dual citizenship verification requiring full criminal history checks.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-shield-halved"></i></div>
        <h4>Security Clearances</h4>
        <p>Sovereign defence, aviation, maritime, and offshore infrastructure security compliance.</p>
      </div>
    </div>
  </section>

  <!-- End-to-End PCC Services Workflow -->
  <section style="background: #ffffff;">
    <div class="section-head">
      <span class="tag-badge">Structured Process</span>
      <h2 class="section-title">Our End-to-End PCC Processing Assistance</h2>
      <p class="section-desc">Fast, confidential, and accurate assistance from in-person card rolling to embassy tracking.</p>
    </div>

    <div class="timeline-steps">
      <div class="step-card">
        <div class="step-badge">1</div>
        <span class="step-time">15 - 20 Minutes</span>
        <h4>Ink &amp; Roll Fingerprinting</h4>
        <p>Precision ten-print rolling on authentic foreign government cards (FBI FD-258, RCMP C-216C, or consular forms) by senior examiners.</p>
      </div>

      <div class="step-card">
        <div class="step-badge">2</div>
        <span class="step-time">Same Day</span>
        <h4>Document Quality Verification</h4>
        <p>Thorough examination of ridge density, delta points, and applicant demographics to ensure 100% compliance with consular guidelines.</p>
      </div>

      <div class="step-card">
        <div class="step-badge">3</div>
        <span class="step-time">End-to-End</span>
        <h4>Submission &amp; Follow-Up</h4>
        <p>Complete application filing guidance, apostille/attestation coordination, and status tracking until your PCC document is received.</p>
      </div>
    </div>
  </section>

  <!-- Interactive Booking Form Section -->
  <section id="pcc-booking" style="background: radial-gradient(circle at 50% 0%, #f0f9ff 0%, #ffffff 70%);">
    <div class="section-head">
      <span class="tag-badge">Direct Laboratory Slot</span>
      <h2 class="section-title">Schedule In-Person PCC Fingerprinting</h2>
      <p class="section-desc">Prior appointment mandatory to guarantee zero wait time at our Hyderabad forensic laboratory.</p>
    </div>

    <div class="booking-wrapper">
      <div class="service-booking-card">
        <div class="form-inner-content">
          <form onsubmit="alert('Thank you! Your PCC appointment request has been submitted. Our consular desk will contact you via WhatsApp/call within 15 minutes.'); return false;">
            <div class="form-grid-2">
              <div class="form-field">
                <label>Full Name *</label>
                <input type="text" placeholder="e.g. Rahul Sharma" required>
              </div>
              <div class="form-field">
                <label>Mobile / WhatsApp Number *</label>
                <input type="tel" placeholder="+91 98765 43210" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-field">
                <label>Destination Country *</label>
                <input type="text" placeholder="e.g. USA, Canada, Australia, Singapore, UAE" required>
              </div>
              <div class="form-field">
                <label>PCC Purpose *</label>
                <select required>
                  <option value="">Select Purpose...</option>
                  <option value="immigration">Immigration / Permanent Residency (PR)</option>
                  <option value="employment">Employment Abroad / Work Permit</option>
                  <option value="student">Student Visa / University Admission</option>
                  <option value="nursing">Medical / Nursing License (NCLEX/CGFNS)</option>
                  <option value="citizenship">Citizenship / Naturalization</option>
                </select>
              </div>
            </div>

            <div class="form-field">
              <label>Preferred Date &amp; Time Slot *</label>
              <input type="datetime-local" required>
            </div>

            <div class="form-field">
              <label>Additional Notes / Form Requirements (Optional)</label>
              <textarea rows="2" placeholder="Mention if you require FBI FD-258, Canadian RCMP, or specific consular cards..."></textarea>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 16px; font-size: 16px;">
              <span>Confirm PCC Appointment Slot</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

            <div style="text-align: center; margin-top: 14px; font-size: 12px; color: #64748b;">
              <i class="fa-solid fa-shield-halved" style="color: #0284c7; margin-right: 4px;"></i>
              100% Confidentiality &bull; Authentic Government Fingerprint Cards &bull; Zero Embassy Rejection Guarantee
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- PCC Frequently Asked Questions -->
  <section style="background: #ffffff; border-top: 1px solid #e2e8f0;">
    <div class="section-head">
      <span class="tag-badge">Clear Answers</span>
      <h2 class="section-title">PCC Processing FAQs</h2>
      <p class="section-desc">Answers to common questions regarding forms, document checklists, and turnaround times.</p>
    </div>

    <div class="faq-wrapper">
      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          Do I need to carry my own fingerprint cards (e.g. FBI FD-258 or RCMP C-216C)?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          No. We maintain fresh, authentic stock of original FBI FD-258 cards, Canadian RCMP C-216C forms, Singapore SPF sheets, and international consular cards in our laboratory. You do not need to bring blank forms.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          What identification documents must I bring to the appointment?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          Please carry your original valid Passport, a Government photo ID (Aadhaar Card, Voter ID, or Driving License), two recent passport-size photographs, and any official letter or checklist received from the foreign embassy or immigration department.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          How long does the in-person PCC fingerprinting appointment take?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          The appointment takes approximately 15 to 20 minutes, including ID verification, test ink impressions, official ten-print card rolling, and certification signing by our forensic specialists.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          Can you provide mobile/doorstep fingerprinting in Hyderabad?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          Yes! We provide on-site mobile fingerprinting services across Hyderabad for senior citizens, VIP applicants, and corporate batches. Please contact our helpline (+91 81252 55814) to arrange a home or office visit.
        </div>
      </div>
    </div>
  </section>

  <!-- Floating WhatsApp CTA (Bottom-Left, Icon Only) -->
  <a href="https://wa.me/918125255814?text=Hello%20Key%20Forensics,%20I%20would%20like%20to%20book%20a%20Police%20Clearance%20Certificate%20(PCC)%20appointment." target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <!-- Footer -->
  <footer>
    <div class="footer-content">
      <div class="footer-col">
        <div class="brand-logo" style="margin-bottom: 16px;">
          <div class="logo-icon"><i class="fa-solid fa-fingerprint"></i></div>
          <div class="logo-text">
            <h3 style="color: #ffffff;">Key Forensics</h3>
            <span>Certified Experts</span>
          </div>
        </div>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 16px;">
          Government recognized private forensic crime laboratory in Hyderabad, India. Specializing in court-admissible ink rolled fingerprinting, police clearance certificates, and FINRA corporate verification.
        </p>
      </div>

      <div class="footer-col">
        <h4>Practice Areas</h4>
        <ul>
          <li><a href="service_pcc.html">Police Clearance Certificate (PCC)</a></li>
          <li><a href="service_finra.html">FINRA Corporate Fingerprinting</a></li>
          <li><a href="landing_slider.html#service-pcc">FBI FD-258 Cards</a></li>
          <li><a href="landing_slider.html#service-pcc">Canadian RCMP (C-216C)</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="landing_slider.html#home">Home</a></li>
          <li><a href="landing_slider.html#about">Our Legacy &amp; Lab</a></li>
          <li><a href="landing_slider.html#why-us">Why Choose Us</a></li>
          <li><a href="landing_slider.html#faq">FAQs</a></li>
          <li><a href="landing_slider.html#contact">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Direct Lab Contact</h4>
        <p style="font-size: 13.5px; margin-bottom: 8px;"><i class="fa-solid fa-phone" style="color: #38bdf8; margin-right: 8px;"></i> <a href="tel:+918125255814" style="color: #ffffff; text-decoration: none;">+91 81252 55814</a></p>
        <p style="font-size: 13.5px; margin-bottom: 8px;"><i class="fa-solid fa-envelope" style="color: #38bdf8; margin-right: 8px;"></i> <a href="mailto:forensicexperthyd@gmail.com" style="color: #94a3b8; text-decoration: none;">forensicexperthyd@gmail.com</a></p>
        <p style="font-size: 13px; color: #64748b; margin-top: 10px;">Hyderabad, Telangana, India</p>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; 2026 Key Forensics &bull; All Rights Reserved &bull; ISO Certified Forensic Laboratory
    </div>
  </footer>

  <script>
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

fs.writeFileSync(path.join(baseDir, 'service_pcc.html'), pccHtml, 'utf8');
console.log('Saved service_pcc.html successfully');


// ==========================================
// 2. GENERATE service_finra.html
// ==========================================
const finraHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FINRA Fingerprinting Services | US Corporate Broker-Dealer Compliance | Key Forensics</title>
  <meta name="description" content="Mandatory FINRA background check fingerprinting on official FBI standard cards for financial institutions, broker-dealers, investment advisors, and offshore IT professionals.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
${commonStyles}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"></script>
</head>
<body>

  <!-- Top Strip -->
  <div class="top-strip">
    <div><i class="fa-solid fa-location-dot" style="color: var(--primary-accent); margin-right: 6px;"></i> Official Forensic Laboratory &bull; Hyderabad, India</div>
    <div class="strip-items">
      <span><i class="fa-solid fa-phone" style="color: var(--primary-accent); margin-right: 6px;"></i> Corporate Compliance Desk: <a href="tel:+918125255814">+91 81252 55814</a></span>
      <span><i class="fa-regular fa-clock" style="color: var(--primary-accent); margin-right: 6px;"></i> Mon - Sat: 9:30 AM - 6:30 PM</span>
    </div>
  </div>

  <!-- Header -->
  <header>
    <div class="nav-container">
      <a href="landing_slider.html" class="brand-logo">
        <div class="logo-icon"><i class="fa-solid fa-fingerprint"></i></div>
        <div class="logo-text">
          <h3>Key Forensics</h3>
          <span>Certified Experts</span>
        </div>
      </a>

      <ul class="nav-links" id="navLinks">
        <li class="nav-item">
          <a href="landing_slider.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="landing_slider.html#services" class="nav-link active">
            Services <i class="fa-solid fa-chevron-down" style="font-size: 11px;"></i>
          </a>
          <ul class="dropdown">
            <li>
              <a href="service_pcc.html">
                <i class="fa-solid fa-passport dropdown-icon"></i>
                <div>
                  Police Clearance Certificate (PCC)
                  <span class="dropdown-desc">Global Visa &amp; Immigration Clearance</span>
                </div>
              </a>
            </li>
            <li>
              <a href="service_finra.html" class="active">
                <i class="fa-solid fa-briefcase dropdown-icon"></i>
                <div>
                  FINRA Fingerprinting
                  <span class="dropdown-desc">US Corporate &amp; Broker-Dealer Licensing</span>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="landing_slider.html#contact" class="nav-link">Contact</a>
        </li>
      </ul>

      <div class="header-right-actions">
        <a href="#finra-booking" class="btn-header">Book Appointment</a>
        <button class="mobile-toggle-btn" onclick="toggleMobileMenu()" aria-label="Toggle Navigation">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- FINRA Hero Section -->
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
  </section>

  <!-- Who Needs FINRA Fingerprinting -->
  <section style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="section-head">
      <span class="tag-badge">Mandatory Coverage</span>
      <h2 class="section-title">Who Needs FINRA Fingerprinting?</h2>
      <p class="section-desc">Required for professionals joining or providing contracted technological services to FINRA-regulated entities.</p>
    </div>

    <div class="feature-grid-4">
      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-chart-line"></i></div>
        <h4>Broker-Dealers</h4>
        <p>Registered representatives and associated persons of US broker-dealer firms.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-landmark"></i></div>
        <h4>Investment Banks</h4>
        <p>Financial analysts, corporate finance executives, and capital markets personnel.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-user-tie"></i></div>
        <h4>Financial Advisors</h4>
        <p>Registered Investment Advisors (RIAs) and wealth managers subject to SEC/FINRA scrutiny.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-laptop-code"></i></div>
        <h4>Offshore IT Contractors</h4>
        <p>Software engineers and DevOps teams maintaining sensitive US banking &amp; trading infrastructure.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-scale-unbalanced"></i></div>
        <h4>Compliance Officers</h4>
        <p>Chief Compliance Officers, AML analysts, and internal legal auditors.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-arrows-split-up-and-left"></i></div>
        <h4>Transfer Agents</h4>
        <p>Registered transfer agents and custodian staff handling shareholder securities.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-cubes"></i></div>
        <h4>Clearing Operations</h4>
        <p>Back-office settlement and clearing staff processing transaction flows.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-vault"></i></div>
        <h4>Custody Personnel</h4>
        <p>Any corporate employee handling customer funds, securities, or critical ledgers.</p>
      </div>
    </div>
  </section>

  <!-- How Key Forensics Simplifies FINRA -->
  <section style="background: #ffffff;">
    <div class="section-head">
      <span class="tag-badge">The Key Forensics Advantage</span>
      <h2 class="section-title">How We Make FINRA Processing Seamless</h2>
      <p class="section-desc">Our laboratory ensures zero rejection from US processing centers with end-to-end guidance.</p>
    </div>

    <div class="feature-grid-3">
      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-clipboard-check"></i></div>
        <h4>Official Card Stock in Lab</h4>
        <p>We provide genuine, fresh FINRA-compliant cards so you don't need to await international mailings from your employer.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h4>Microscopic Quality Control</h4>
        <p>Examiners check every rolled delta and core under high-power loupes to verify NFIQ quality scores before card sign-off.</p>
      </div>

      <div class="feature-card">
        <div class="card-icon-wrap"><i class="fa-solid fa-box-archive"></i></div>
        <h4>Secure US Courier Support</h4>
        <p>Direct international tracking dispatch via DHL/FedEx to FINRA Document Processing in Rockville, MD or your employer's US office.</p>
      </div>
    </div>

    <!-- Official Clarification Note from Reference Image -->
    <div style="max-width: 900px; margin: 40px auto 0; background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #0284c7; padding: 18px 22px; border-radius: 12px; font-size: 13.5px; color: #1e3a8a; line-height: 1.6;">
      <strong><i class="fa-solid fa-circle-info" style="margin-right: 6px;"></i> Regulatory Clarification:</strong> Key Forensics provides certified ink fingerprinting on official FINRA cards and secure international courier assistance. Once your completed card arrives at the designated U.S. facility, formal background check processing is executed directly by FINRA and the FBI.
    </div>
  </section>

  <!-- Estimated Timeline -->
  <section style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="section-head">
      <span class="tag-badge">Speed &amp; Reliability</span>
      <h2 class="section-title">Estimated Processing Timeline</h2>
      <p class="section-desc">Transparent turnarounds to ensure corporate compliance deadlines are met seamlessly.</p>
    </div>

    <div class="timeline-steps">
      <div class="step-card">
        <div class="step-badge">1</div>
        <span class="step-time">15 - 20 Minutes</span>
        <h4>Appointment &amp; Fingerprinting</h4>
        <p>Quick ten-print recording session at our Hyderabad lab or on-site at your corporate office.</p>
      </div>

      <div class="step-card">
        <div class="step-badge">2</div>
        <span class="step-time">Within 24 Hours</span>
        <h4>Quality Sign-Off &amp; Dispatch</h4>
        <p>Senior examiner authentication and secure tamper-proof packaging for immediate courier handoff.</p>
      </div>

      <div class="step-card">
        <div class="step-badge">3</div>
        <span class="step-time">4 - 7 Business Days</span>
        <h4>Delivery to the USA</h4>
        <p>Express international priority delivery directly to FINRA in Maryland or your corporate US headquarters.</p>
      </div>
    </div>
  </section>

  <!-- FINRA Booking Form -->
  <section id="finra-booking" style="background: radial-gradient(circle at 50% 0%, #f0f9ff 0%, #ffffff 70%);">
    <div class="section-head">
      <span class="tag-badge">Priority Corporate Booking</span>
      <h2 class="section-title">Schedule In-Person FINRA Fingerprinting</h2>
      <p class="section-desc">Individual and corporate batch appointments available with dedicated non-disclosure compliance.</p>
    </div>

    <div class="booking-wrapper">
      <div class="service-booking-card">
        <div class="form-inner-content">
          <form onsubmit="alert('Thank you! Your FINRA fingerprinting appointment has been scheduled. Our corporate desk will contact you via WhatsApp/call.'); return false;">
            <div class="form-grid-2">
              <div class="form-field">
                <label>Applicant Full Name *</label>
                <input type="text" placeholder="e.g. Anand Varma" required>
              </div>
              <div class="form-field">
                <label>Phone / WhatsApp Number *</label>
                <input type="tel" placeholder="+91 98765 43210" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-field">
                <label>Corporate Employer / Firm Name *</label>
                <input type="text" placeholder="e.g. US Financial Services Firm / Bank" required>
              </div>
              <div class="form-field">
                <label>Individual or Corporate Batch *</label>
                <select required>
                  <option value="individual">Individual Appointment (1 Applicant)</option>
                  <option value="batch_small">Small Corporate Batch (2 - 5 Applicants)</option>
                  <option value="batch_large">Large Corporate Batch (5+ On-site)</option>
                </select>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-field">
                <label>FINRA CRD Number (If Assigned)</label>
                <input type="text" placeholder="e.g. 1234567 or leave blank">
              </div>
              <div class="form-field">
                <label>Preferred Date &amp; Time Slot *</label>
                <input type="datetime-local" required>
              </div>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 16px; font-size: 16px;">
              <span>Confirm FINRA Appointment Slot</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

            <div style="text-align: center; margin-top: 14px; font-size: 12px; color: #64748b;">
              <i class="fa-solid fa-shield-halved" style="color: #0284c7; margin-right: 4px;"></i>
              Strict Corporate NDA &bull; Original FINRA Cards in Stock &bull; Express US Dispatch Support
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- FINRA Frequently Asked Questions -->
  <section style="background: #ffffff; border-top: 1px solid #e2e8f0;">
    <div class="section-head">
      <span class="tag-badge">Clear Answers</span>
      <h2 class="section-title">FINRA Fingerprinting FAQs</h2>
      <p class="section-desc">Key details regarding US compliance requirements, CRD filing, and card submission.</p>
    </div>

    <div class="faq-wrapper">
      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          What card format is used for FINRA fingerprinting?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          FINRA submissions require standard FBI FD-258 fingerprint cards printed with specific FINRA identifiers, ORI numbers, and firm CRD details. We maintain fresh, original cards in our laboratory.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          What happens if my previous prints were rejected by FINRA?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          Fingerprints captured with improper ink or inexperienced personnel often smudge and get rejected. Our former government forensic examiners record impressions under specialized magnification to guarantee crisp ridge density that passes FBI CJIS automated processing.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          Can Key Forensics dispatch the cards directly to the United States?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          Yes! We offer tamper-proof packaging and express international courier dispatch with DHL/FedEx directly to FINRA's Document Processing Center in Rockville, Maryland, or directly to your compliance department in the US.
        </div>
      </div>

      <div class="faq-block">
        <button class="faq-trigger" onclick="toggleFaq(this)">
          Do you provide on-site fingerprinting for corporate teams?
          <i class="fa-solid fa-plus"></i>
        </button>
        <div class="faq-body">
          Yes. For financial institutions and technology firms onboarding multiple analysts or contractors, we deploy forensic teams to your Hyderabad campus for rapid batch recording.
        </div>
      </div>
    </div>
  </section>

  <!-- Floating WhatsApp CTA (Bottom-Left, Icon Only) -->
  <a href="https://wa.me/918125255814?text=Hello%20Key%20Forensics,%20I%20would%20like%20to%20book%20a%20FINRA%20fingerprinting%20appointment." target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <!-- Footer -->
  <footer>
    <div class="footer-content">
      <div class="footer-col">
        <div class="brand-logo" style="margin-bottom: 16px;">
          <div class="logo-icon"><i class="fa-solid fa-fingerprint"></i></div>
          <div class="logo-text">
            <h3 style="color: #ffffff;">Key Forensics</h3>
            <span>Certified Experts</span>
          </div>
        </div>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 16px;">
          Government recognized private forensic crime laboratory in Hyderabad, India. Specializing in court-admissible ink rolled fingerprinting, police clearance certificates, and FINRA corporate verification.
        </p>
      </div>

      <div class="footer-col">
        <h4>Practice Areas</h4>
        <ul>
          <li><a href="service_pcc.html">Police Clearance Certificate (PCC)</a></li>
          <li><a href="service_finra.html">FINRA Corporate Fingerprinting</a></li>
          <li><a href="landing_slider.html#service-pcc">FBI FD-258 Cards</a></li>
          <li><a href="landing_slider.html#service-pcc">Canadian RCMP (C-216C)</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="landing_slider.html#home">Home</a></li>
          <li><a href="landing_slider.html#about">Our Legacy &amp; Lab</a></li>
          <li><a href="landing_slider.html#why-us">Why Choose Us</a></li>
          <li><a href="landing_slider.html#faq">FAQs</a></li>
          <li><a href="landing_slider.html#contact">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Direct Lab Contact</h4>
        <p style="font-size: 13.5px; margin-bottom: 8px;"><i class="fa-solid fa-phone" style="color: #38bdf8; margin-right: 8px;"></i> <a href="tel:+918125255814" style="color: #ffffff; text-decoration: none;">+91 81252 55814</a></p>
        <p style="font-size: 13.5px; margin-bottom: 8px;"><i class="fa-solid fa-envelope" style="color: #38bdf8; margin-right: 8px;"></i> <a href="mailto:forensicexperthyd@gmail.com" style="color: #94a3b8; text-decoration: none;">forensicexperthyd@gmail.com</a></p>
        <p style="font-size: 13px; color: #64748b; margin-top: 10px;">Hyderabad, Telangana, India</p>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; 2026 Key Forensics &bull; All Rights Reserved &bull; ISO Certified Forensic Laboratory
    </div>
  </footer>

  <script>
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

fs.writeFileSync(path.join(baseDir, 'service_finra.html'), finraHtml, 'utf8');
console.log('Saved service_finra.html successfully');
