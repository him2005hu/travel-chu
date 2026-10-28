/**
 * Chauhan Travels & Services - Global Site Controller
 * Handles Responsive Mobile Navigation Drawer, Modals, and Active Navigation
 */

(() => {
  'use strict';

  // --- 1. CURRENT PAGE IDENTIFICATION ---
  const getCurrentPage = () => {
    const path = window.location.pathname.split('/').pop().toLowerCase();
    if (!path || path === '' || path === 'index.html' || path === 'home.html' || path === 'travels.html') {
      return 'index.html';
    }
    return path;
  };

  const currentPage = getCurrentPage();

  // --- 2. NAVIGATION LINKS DEFINITION ---
  const NAV_LINKS = [
    { label: 'Home', href: 'index.html', icon: 'fa-solid fa-house' },
    { label: 'About', href: 'about.html', icon: 'fa-solid fa-circle-info' },
    { label: 'Fleet', href: 'fleet.html', icon: 'fa-solid fa-car-side' },
    { label: 'Services', href: 'index.html#services', icon: 'fa-solid fa-bell-concierge' },
    { label: 'Packages', href: 'packages.html', icon: 'fa-solid fa-briefcase' },
    { label: 'Tours', href: 'tours.html', icon: 'fa-solid fa-map-location-dot' },
    { label: 'Payments', href: 'payments.html', icon: 'fa-solid fa-credit-card' },
    { label: 'Contact', href: 'index.html#contact', icon: 'fa-solid fa-phone-volume' }
  ];

  // --- 3. ENSURE MOBILE DRAWER AND BACKDROP EXIST ---
  const initMobileDrawer = () => {
    let backdrop = document.querySelector('.mobile-nav-backdrop');
    let drawer = document.querySelector('.mobile-nav-drawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.className = 'mobile-nav-drawer';
      drawer.id = 'mobile-nav-drawer';
      drawer.setAttribute('aria-label', 'Mobile Navigation Drawer');

      const linksHtml = NAV_LINKS.map(link => {
        const isCurrent = link.href === currentPage || (currentPage === 'index.html' && link.href === 'index.html');
        return `
          <a class="drawer-link ${isCurrent ? 'active' : ''}" href="${link.href}" ${isCurrent ? 'aria-current="page"' : ''}>
            <i class="${link.icon}"></i>
            <span>${link.label}</span>
          </a>
        `;
      }).join('');

      drawer.innerHTML = `
        <div class="drawer-header">
          <div class="drawer-brand">
            <img src="images/logo.png" alt="Chauhan Travels Logo" width="36" height="36">
            <div>
              <div class="drawer-brand-title">Chauhan Travels</div>
              <div class="drawer-brand-sub">16+ Years of Excellence</div>
            </div>
          </div>
          <button class="drawer-close-btn" type="button" aria-label="Close navigation menu">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav class="drawer-menu">
          ${linksHtml}
        </nav>
        <div class="drawer-footer">
          <a class="drawer-btn-wa" href="https://wa.me/919990470656" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
          </a>
          <a class="drawer-btn-call" href="tel:+919990470656">
            <i class="fa-solid fa-phone"></i> Call: +91 9990470656
          </a>
          <div class="drawer-support-note">24x7 Verified Chauffeur & Travel Support</div>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    // Connect toggle buttons
    const toggleBtns = document.querySelectorAll('.mobile-menu-btn');
    const closeBtn = drawer.querySelector('.drawer-close-btn');

    const setDrawerOpen = (open) => {
      drawer.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      document.body.classList.toggle('drawer-open', open);
      toggleBtns.forEach(btn => {
        btn.classList.toggle('is-active', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      });
    };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setDrawerOpen(!drawer.classList.contains('is-open'));
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => setDrawerOpen(false));
    }

    backdrop.addEventListener('click', () => setDrawerOpen(false));

    drawer.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        setDrawerOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawerOpen(false);
      }
    });
  };

  // --- 4. HIGHLIGHT ACTIVE DESKTOP LINKS ---
  const highlightDesktopNav = () => {
    const desktopLinks = document.querySelectorAll('.site-nav a, header nav a');
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('#')[0].toLowerCase();
      if ((targetPage === currentPage) || (targetPage === '' && currentPage === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  // --- 5. MODALS FOR PRIVACY POLICY & TERMS ---
  const initLegalModals = () => {
    let privacyModal = document.getElementById('privacy-modal');
    let termsModal = document.getElementById('terms-modal');

    // If modals aren't in the DOM on this page, inject them
    if (!privacyModal) {
      privacyModal = document.createElement('div');
      privacyModal.id = 'privacy-modal';
      privacyModal.className = 'site-modal-overlay';
      privacyModal.setAttribute('role', 'dialog');
      privacyModal.setAttribute('aria-modal', 'true');
      privacyModal.setAttribute('aria-labelledby', 'privacy-modal-title');
      privacyModal.innerHTML = `
        <div class="site-modal-dialog">
          <div class="site-modal-header">
            <h3 id="privacy-modal-title">Privacy Policy</h3>
            <button class="site-modal-close" type="button" aria-label="Close modal">&times;</button>
          </div>
          <div class="site-modal-body">
            <p>At <strong>Chauhan Travels & Services</strong>, protecting your privacy is our highest priority. This policy outlines how we collect, use, and protect your information.</p>
            <h4>1. Information We Collect</h4>
            <p>When booking a ride or contacting us, we collect your name, phone number, pickup/drop addresses, travel dates, and vehicle preferences to serve you efficiently.</p>
            <h4>2. How We Use Information</h4>
            <p>Your details are used strictly to provide quotations, assign verified chauffeurs, generate invoices, and communicate booking updates. We never sell your personal information to third parties.</p>
            <h4>3. Payment Security</h4>
            <p>All online payments are securely processed through encrypted banking and authorized UPI channels. We do not store sensitive payment card information.</p>
            <h4>4. Contact Support</h4>
            <p>For any privacy queries, reach us at <a href="mailto:info@chauhantravelsandservices.in">info@chauhantravelsandservices.in</a> or call <a href="tel:+919990470656">+91 9990470656</a>.</p>
          </div>
        </div>
      `;
      document.body.appendChild(privacyModal);
    }

    if (!termsModal) {
      termsModal = document.createElement('div');
      termsModal.id = 'terms-modal';
      termsModal.className = 'site-modal-overlay';
      termsModal.setAttribute('role', 'dialog');
      termsModal.setAttribute('aria-modal', 'true');
      termsModal.setAttribute('aria-labelledby', 'terms-modal-title');
      termsModal.innerHTML = `
        <div class="site-modal-dialog">
          <div class="site-modal-header">
            <h3 id="terms-modal-title">Terms & Conditions</h3>
            <button class="site-modal-close" type="button" aria-label="Close modal">&times;</button>
          </div>
          <div class="site-modal-body">
            <p>Welcome to <strong>Chauhan Travels & Services</strong>. By booking our vehicles and services, you agree to the following terms:</p>
            <h4>1. Inclusions & Fuel</h4>
            <p>For chauffeur-driven vehicles, fuel is inclusive for the booked itinerary package. Tolls, parking fees, and state entry taxes are payable as per actuals.</p>
            <h4>2. Garage to Garage Calculation</h4>
            <p>Outstation travel kilometres and hours are calculated garage-to-garage as per standard industry regulations.</p>
            <h4>3. Cleanliness & Vehicle Care</h4>
            <p>Passengers are expected to maintain vehicle hygiene. Smoking and carrying hazardous items are strictly prohibited inside all fleet vehicles.</p>
            <h4>4. Cancellation & Modifications</h4>
            <p>Economy rides cancelled more than 3 hours prior to reporting time incur no cancellation fee. Luxury fleet cancellations require 48 hours notice.</p>
            <h4>5. 24x7 Customer Helpline</h4>
            <p>For support or changes, call <a href="tel:+919990470656">+91 9990470656</a>.</p>
          </div>
        </div>
      `;
      document.body.appendChild(termsModal);
    }

    const bindModalTriggers = () => {
      document.querySelectorAll('.privacy-modal-btn, [href="#privacy-modal"], a.privacy-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          privacyModal.classList.add('is-active');
          document.body.classList.add('drawer-open');
        });
      });

      document.querySelectorAll('.terms-modal-btn, [href="#terms-modal"], a.terms-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          termsModal.classList.add('is-active');
          document.body.classList.add('drawer-open');
        });
      });

      [privacyModal, termsModal].forEach(modal => {
        const closeBtn = modal.querySelector('.site-modal-close, #close-privacy, #close-terms');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            modal.classList.remove('is-active');
            document.body.classList.remove('drawer-open');
          });
        }
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('is-active');
            document.body.classList.remove('drawer-open');
          }
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          privacyModal.classList.remove('is-active');
          termsModal.classList.remove('is-active');
          document.body.classList.remove('drawer-open');
        }
      });
    };

    bindModalTriggers();
  };

  // --- 6. FLOATING ACTIONS (WHATSAPP & CALL) ---
  const initFloatingActions = () => {
    if (!document.querySelector('.floating-actions')) {
      const floatDiv = document.createElement('div');
      floatDiv.className = 'floating-actions';
      floatDiv.setAttribute('aria-label', 'Quick Contact');
      floatDiv.innerHTML = `
        <a class="floating-btn-call" href="tel:+919990470656" aria-label="Call Chauhan Travels" title="Call Now">
          <i class="fa-solid fa-phone"></i>
        </a>
        <a class="floating-btn-wa" href="https://wa.me/919990470656" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="WhatsApp Us">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      `;
      document.body.appendChild(floatDiv);
    }
  };

  // --- INITIALIZE ON DOM READY ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMobileDrawer();
      highlightDesktopNav();
      initLegalModals();
      initFloatingActions();
    });
  } else {
    initMobileDrawer();
    highlightDesktopNav();
    initLegalModals();
    initFloatingActions();
  }
})();
