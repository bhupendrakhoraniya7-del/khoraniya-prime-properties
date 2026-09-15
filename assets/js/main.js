/**
 * Khoraniya Prime Properties - Interactive Frontend Script
 */

// Property Database for Interactive Modal
const propertyData = {
  'prop-1': {
    title: 'Prime Commercial Avenue',
    location: 'Jaipur, Rajasthan',
    tagline: 'Strategic location | High-growth corridor',
    size: '2,000 sq. ft.',
    type: 'Commercial Plot (Category A)',
    frontage: '60 Ft. Wide Sector Road',
    zoning: 'Commercial / Retail / Office Space',
    possession: 'Immediate / Investment Ready',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Positioned on a premier commercial arterial road in Jaipur, this 2,000 sq. ft. plot delivers exceptional visibility, seamless connectivity to transit highways, and high footfall potential for retail or commercial ventures.',
    highlights: [
      '60-foot wide road frontage ensuring prominent brand visibility',
      'Situated in a rapidly appreciating commercial development corridor',
      'Clear demarcation with verified surrounding infrastructure',
      'Ideal for multi-story boutique commercial complexes or retail outlets'
    ]
  },
  'prop-2': {
    title: 'Prime Business District',
    location: 'Jaipur, Rajasthan',
    tagline: 'Excellent connectivity | Investment potential',
    size: '3,500 sq. ft.',
    type: 'Commercial Plot (High-Density)',
    frontage: '80 Ft. Master Plan Arterial',
    zoning: 'Corporate & Mixed Commercial Use',
    possession: 'Ready for Development',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    description: 'A prestigious commercial plot located in Jaipur’s high-density business cluster, offering rapid transit connectivity, robust underground utility provisions, and high rental yield prospects for commercial developers.',
    highlights: [
      'Proximity to major ring corridors and established corporate nodes',
      'Dual-side accessibility supporting efficient logistics and customer parking',
      'High anticipated appreciation index backed by municipal infrastructure',
      'Zoned for corporate offices, diagnostic centers, or hospitality ventures'
    ]
  },
  'prop-3': {
    title: 'Prime Investment Enclave',
    location: 'Jaipur, Rajasthan',
    tagline: 'Growth-focused location | Commercial potential',
    size: '5,000 sq. ft.',
    type: 'Commercial Plot (Flagship Scale)',
    frontage: '100 Ft. Main Growth Corridor',
    zoning: 'Anchor Commercial / Showroom / Institution',
    possession: 'Strategic Investment Holding',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'An expansive 5,000 sq. ft. prime plot tailored for marquee commercial developments, flagship automotive/retail showrooms, or long-term institutional land-banking in Jaipur’s most promising growth zone.',
    highlights: [
      'Generous 100-foot frontage allowing magnificent architectural elevation',
      'Exceptional transit linkages connecting the airport and regional expressways',
      'Surrounded by premium upcoming residential catchments driving local commerce',
      'Unmatched land asset for legacy investors and high-net-worth portfolios'
    ]
  }
};

// Global WhatsApp Number Placeholder (Easily replaceable)
const WHATSAPP_PHONE = '919876543210'; // Replace with real 10-digit number including country code (91 for India)

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPropertyModal();
  initAccordions();
  initLeadForm();
  initMobileActionBar();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCROLL
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.glass-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-drawer');
  const mobileMenuClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll Compact & Blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileMenuDrawer.classList.add('hidden');
      document.body.style.overflow = '';
    };

    mobileMenuClose?.addEventListener('click', closeDrawer);
    mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Close on backdrop tap
    mobileMenuDrawer.addEventListener('click', (e) => {
      if (e.target === mobileMenuDrawer) closeDrawer();
    });
  }

  // Active Link Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('text-[#A8885B]', 'font-semibold');
        } else {
          navLink.classList.remove('text-[#A8885B]', 'font-semibold');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. PROPERTY MODAL HANDLER
   -------------------------------------------------------------------------- */
function initPropertyModal() {
  const modalBackdrop = document.getElementById('property-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalInquireBtn = document.getElementById('modal-inquire-btn');
  let currentPropId = null;

  window.openPropertyModal = function(id) {
    const data = propertyData[id];
    if (!data) return;
    currentPropId = id;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-location').textContent = data.location;
    document.getElementById('modal-size').textContent = data.size;
    document.getElementById('modal-type').textContent = data.type;
    document.getElementById('modal-frontage').textContent = data.frontage;
    document.getElementById('modal-zoning').textContent = data.zoning;
    document.getElementById('modal-possession').textContent = data.possession;
    document.getElementById('modal-description').textContent = data.description;

    const highlightsList = document.getElementById('modal-highlights');
    if (highlightsList) {
      highlightsList.innerHTML = data.highlights
        .map(h => `<li class="flex items-start gap-2.5 text-sm text-[#33383F]"><svg class="w-4 h-4 text-[#A8885B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${h}</span></li>`)
        .join('');
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closePropertyModal = function() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', window.closePropertyModal);

  // Close on outside backdrop click
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) window.closePropertyModal();
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closePropertyModal();
      window.closeSuccessModal();
    }
  });

  // Inquire for specific property button
  modalInquireBtn?.addEventListener('click', () => {
    const data = propertyData[currentPropId];
    window.closePropertyModal();

    // Fill the message field with specific inquiry
    const messageField = document.getElementById('form-message');
    const propertySelect = document.getElementById('form-property');
    if (data && messageField) {
      messageField.value = `I would like to receive detailed brochure, site layout, and pricing information for "${data.title}" (${data.size}).`;
    }
    if (data && propertySelect) {
      propertySelect.value = data.title;
    }

    // Scroll to contact form smoothly
    const contactSection = document.getElementById('enquiry');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('form-name')?.focus();
      }, 500);
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACCORDIONS (FAQ)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items for clean single-view accordion
      items.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        item.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. LEAD FORM & VALIDATION
   -------------------------------------------------------------------------- */
function initLeadForm() {
  const form = document.getElementById('lead-generation-form');
  const successModal = document.getElementById('success-modal');

  window.closeSuccessModal = function() {
    successModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const name = document.getElementById('form-name')?.value.trim();
    const phone = document.getElementById('form-phone')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const property = document.getElementById('form-property')?.value;
    const location = document.getElementById('form-location')?.value;
    const budget = document.getElementById('form-budget')?.value;
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !phone) {
      alert('Please provide your name and phone number so our team can reach you.');
      return;
    }

    // Show Loading state
    const submitBtn = document.getElementById('form-submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing Request...
    `;

    // Simulate submission to backend / CRM
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Populate Success Modal
      document.getElementById('success-client-name').textContent = name;
      document.getElementById('success-client-phone').textContent = phone;
      
      // Open Success Modal
      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Configure direct WhatsApp follow-up button inside success modal
      const successWaBtn = document.getElementById('success-wa-btn');
      if (successWaBtn) {
        const text = encodeURIComponent(
          `Hello Khoraniya Prime Properties, I just submitted an inquiry on your website.\n\nName: ${name}\nPhone: ${phone}\nInterest: ${property || 'Commercial Opportunity'}\nBudget: ${budget || 'Flexible'}\nLocation: ${location || 'Jaipur'}`
        );
        successWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
      }

      form.reset();
    }, 650);
  });
}

/* --------------------------------------------------------------------------
   5. MOBILE STICKY BOTTOM DOCK (Call / WhatsApp / Enquire)
   -------------------------------------------------------------------------- */
function initMobileActionBar() {
  const bar = document.querySelector('.mobile-sticky-bar');
  const enquirySection = document.getElementById('enquiry');
  const footer = document.querySelector('footer');

  if (!bar) return;

  // Hide bar when the enquiry form or footer is already in view to prevent UI clutter
  const observer = new IntersectionObserver((entries) => {
    const isOverlapping = entries.some(entry => entry.isIntersecting);
    if (isOverlapping) {
      bar.classList.add('hidden-by-scroll');
    } else {
      bar.classList.remove('hidden-by-scroll');
    }
  }, { threshold: 0.1 });

  if (enquirySection) observer.observe(enquirySection);
  if (footer) observer.observe(footer);
}

// WhatsApp Helper
window.openWhatsApp = function(customMsg) {
  const defaultMsg = "Hello Khoraniya Prime Properties, I would like to enquire about commercial plots and investment opportunities in Jaipur.";
  const text = encodeURIComponent(customMsg || defaultMsg);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
};
