/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - PARSHVA | FREELANCE DEVELOPER & UI DESIGNER
 * Modern Light Mode, Clean Interactions, Zero Emojis.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. PRELOADER DISMISSAL
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const dismissPreloader = () => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 450);
    }
  };

  window.addEventListener('load', dismissPreloader);
  setTimeout(dismissPreloader, 1000);


  // --------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLLSPY
  // --------------------------------------------------------------------------
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  const onScroll = () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    const offset = 140;

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  const openMobileMenu = () => {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('active');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --------------------------------------------------------------------------
  // 4. PACKAGE INQUIRY BUTTONS (AUTO-FILL FORM)
  // --------------------------------------------------------------------------
  const tierButtons = document.querySelectorAll('.select-tier-btn');
  const budgetSelect = document.getElementById('projectBudget');
  const contactSection = document.getElementById('contact');

  tierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tierValue = btn.getAttribute('data-tier-name') || btn.getAttribute('data-budget');

      if (budgetSelect && tierValue) {
        budgetSelect.value = tierValue;

        // Smooth scroll to contact section
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Focus the dropdown
        setTimeout(() => {
          budgetSelect.focus();
        }, 500);

        showToast(`Selected Package: ${tierValue}`, 'info');
      }
    });
  });


  // --------------------------------------------------------------------------
  // 5. PORTFOLIO FILTER TABS
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });


  // --------------------------------------------------------------------------
  // 6. COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'patelparshv1052006@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard.', 'success');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #059669;"></i>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      }).catch(() => {
        showToast('Direct email: ' + email, 'info');
      });
    });
  }


  // --------------------------------------------------------------------------
  // 7. INQUIRY FORM VALIDATION & DIRECT WHATSAPP INTEGRATION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatusMsg = document.getElementById('formStatusMsg');

  if (contactForm) {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    const descInput = document.getElementById('projectDesc');

    const validateField = (input, condition) => {
      const formField = input.closest('.form-field');
      if (!condition) {
        formField?.classList.add('has-error');
        return false;
      } else {
        formField?.classList.remove('has-error');
        return true;
      }
    };

    nameInput?.addEventListener('blur', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2);
    });

    emailInput?.addEventListener('blur', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(emailInput, emailRegex.test(emailInput.value.trim()));
    });

    phoneInput?.addEventListener('blur', () => {
      validateField(phoneInput, phoneInput.value.trim().length >= 7);
    });

    budgetSelect?.addEventListener('change', () => {
      validateField(budgetSelect, budgetSelect.value !== '');
    });

    descInput?.addEventListener('blur', () => {
      validateField(descInput, descInput.value.trim().length >= 10);
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      const isPhoneValid = validateField(phoneInput, phoneInput.value.trim().length >= 7);
      const isBudgetValid = validateField(budgetSelect, budgetSelect.value !== '');
      const isDescValid = validateField(descInput, descInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isBudgetValid || !isDescValid) {
        showToast('Please complete all required fields.', 'info');
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const userNameVal = nameInput.value.trim();
      const userEmailVal = emailInput.value.trim();
      const userPhoneVal = phoneInput.value.trim();
      const userBudgetVal = budgetSelect.value;
      const userDescVal = descInput.value.trim();

      // Construct pre-filled professional WhatsApp message
      const waText = encodeURIComponent(
        `Hello Parshva,\n\nI have submitted a project inquiry via your portfolio website:\n\n` +
        `Name: ${userNameVal}\n` +
        `Email: ${userEmailVal}\n` +
        `Phone: ${userPhoneVal}\n` +
        `Project Type: ${userBudgetVal}\n` +
        `Project Scope: ${userDescVal}\n\nLooking forward to your response.`
      );
      const waLink = `https://wa.me/919054079397?text=${waText}`;

      // Real email dispatch to patelparshv1052006@gmail.com via FormSubmit AJAX API
      fetch('https://formsubmit.co/ajax/patelparshv1052006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: userNameVal,
          email: userEmailVal,
          phone: userPhoneVal,
          project_type: userBudgetVal,
          message: userDescVal,
          _subject: `New Client Inquiry from ${userNameVal} (${userBudgetVal})`,
          _template: 'table',
          _captcha: 'false'
        })
      })
        .then((res) => res.json())
        .then((data) => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;

          formStatusMsg.className = 'submission-notice success';
          formStatusMsg.innerHTML = `
          <strong>Inquiry Sent to patelparshv1052006@gmail.com</strong><br>
          Thank you, ${userNameVal}. Your message has been sent to my inbox. I will review your requirements and respond within 24 hours.<br><br>
          <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-sm btn-whatsapp" style="margin-top: 6px;">
            <i class="fa-brands fa-whatsapp"></i> Also Connect Directly on WhatsApp
          </a>
        `;

          showToast('Inquiry sent to patelparshv1052006@gmail.com successfully.', 'success');
          contactForm.reset();
        })
        .catch(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;

          formStatusMsg.className = 'submission-notice success';
          formStatusMsg.innerHTML = `
          <strong>Inquiry Prepared</strong><br>
          Thank you, ${userNameVal}. Please also forward your inquiry directly via WhatsApp or email to ensure immediate review:<br><br>
          <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-sm btn-whatsapp" style="margin-top: 6px; margin-right: 8px;">
            <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
          </a>
          <a href="mailto:patelparshv1052006@gmail.com?subject=Project Inquiry from ${userNameVal}&body=${encodeURIComponent(userDescVal)}" class="btn btn-sm btn-secondary" style="margin-top: 6px;">
            <i class="fa-regular fa-envelope"></i> Send Direct Email
          </a>
        `;
          showToast('Inquiry ready. You can also chat on WhatsApp.', 'info');
        });
    });
  }


  // --------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

});
