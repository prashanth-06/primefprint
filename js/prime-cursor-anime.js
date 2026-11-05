/**
 * PrimeFPrint - Custom Magnetic Follower Cursor & Kinetic Heading Animations
 * Inspired by Vistara Theme GSAP & Physics Cursor System
 */

(function () {
  'use strict';

  // ============================================================
  // 1. RECURSIVE TEXT SPLITTER (PURE JS, ZERO DEPENDENCY)
  // ============================================================
  function splitElementIntoChars(el) {
    if (!el || el.dataset.splitDone) return [];
    el.dataset.splitDone = 'true';

    function walkNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // Skip pure newline whitespace
        if (!text.trim() && text.includes('\n')) return;

        const fragment = document.createDocumentFragment();
        const parts = text.split(/(\s+)/);

        parts.forEach(part => {
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'prime-split-word';

            for (let i = 0; i < part.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.className = 'prime-split-char';
              charSpan.textContent = part[i];
              wordSpan.appendChild(charSpan);
            }
            fragment.appendChild(wordSpan);
          }
        });

        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Do not split if explicitly marked or inside icons
        if (node.classList.contains('prime-no-split') || node.tagName === 'I' || node.tagName === 'SVG') {
          return;
        }
        Array.from(node.childNodes).forEach(walkNode);
      }
    }

    walkNode(el);
    return el.querySelectorAll('.prime-split-char');
  }

  // ============================================================
  // 2. KINETIC HEADING ANIMATOR (GSAP + SCROLLTRIGGER)
  // ============================================================
  function initHeadingAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const headingSelectors = [
      '.hero-heading',
      '.section-title',
      '.inner-hero-title',
      '.prime-text-anime'
    ];

    const elements = document.querySelectorAll(headingSelectors.join(', '));

    elements.forEach(el => {
      // Avoid re-splitting
      if (el.dataset.splitDone) return;

      const chars = splitElementIntoChars(el);
      if (chars.length === 0) return;

      // Check if element is above the fold (hero heading)
      const rect = el.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight && rect.top >= 0;

      if (isAboveFold) {
        // Animate immediately on page load
        gsap.from(chars, {
          x: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.015,
          ease: 'power2.out',
          delay: 0.15,
          clearProps: 'all'
        });
      } else if (typeof ScrollTrigger !== 'undefined') {
        // Scroll-triggered reveal
        gsap.from(chars, {
          x: 35,
          opacity: 0,
          duration: 0.75,
          stagger: 0.015,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        });
      }
    });
  }

  // ============================================================
  // 3. MAGNETIC FOLLOWER CURSOR (BALL & RING PHYSICS)
  // ============================================================
  class PrimeCursor {
    constructor() {
      // Disable on mobile screen widths (< 992px)
      if (window.innerWidth < 992) {
        return;
      }

      this.cursor = document.createElement('div');
      this.cursor.className = 'cb-cursor';

      this.textEl = document.createElement('div');
      this.textEl.className = 'cb-cursor-text';
      this.cursor.appendChild(this.textEl);

      document.body.appendChild(this.cursor);

      this.pos = { x: -100, y: -100 };
      this.target = { x: -100, y: -100 };
      this.speed = 0.22; // Lerp smooth follow factor
      this.isVisible = false;

      this.bindEvents();
      this.render();
    }

    bindEvents() {
      // Track mouse coordinates
      window.addEventListener('mousemove', e => {
        this.target.x = e.clientX;
        this.target.y = e.clientY;

        if (!this.isVisible) {
          this.isVisible = true;
          this.cursor.style.opacity = '1';
          this.pos.x = e.clientX;
          this.pos.y = e.clientY;
        }
      }, { passive: true });

      // Window leave / enter
      document.addEventListener('mouseleave', () => {
        this.isVisible = false;
        this.cursor.style.opacity = '0';
      });

      document.addEventListener('mouseenter', () => {
        this.isVisible = true;
        this.cursor.style.opacity = '1';
      });

      // Click / Press feedback
      document.addEventListener('mousedown', () => {
        this.cursor.classList.add('-active');
      });

      document.addEventListener('mouseup', () => {
        this.cursor.classList.remove('-active');
      });

      // Interactive Hover Delegation
      const interactiveTargets = 'a, button, input, select, textarea, [role="button"], .pcc-tab, .faq-trigger, .step-card, .service-card, .pcc-country-card, .brand-logo';

      document.addEventListener('mouseover', e => {
        const target = e.target.closest(interactiveTargets);
        if (target) {
          const customText = target.getAttribute('data-cursor-text');
          if (customText) {
            this.textEl.textContent = customText;
            this.cursor.classList.add('-text');
          } else {
            this.cursor.classList.add('-pointer');
          }
        }
      });

      document.addEventListener('mouseout', e => {
        const target = e.target.closest(interactiveTargets);
        if (target) {
          this.cursor.classList.remove('-pointer', '-text');
          this.textEl.textContent = '';
        }
      });
    }

    render() {
      // Smooth lerp (linear interpolation)
      this.pos.x += (this.target.x - this.pos.x) * this.speed;
      this.pos.y += (this.target.y - this.pos.y) * this.speed;

      this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;

      requestAnimationFrame(() => this.render());
    }
  }

  // ============================================================
  // 4. INITIALIZE IMMEDIATELY
  // ============================================================
  function init() {
    // 1. Initialize cursor
    new PrimeCursor();

    // 2. Initialize kinetic heading animations
    initHeadingAnimations();
  }

  if (document.body) {
    init();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global for manual refresh if content changes dynamically
  window.refreshPrimeAnimations = initHeadingAnimations;

})();
