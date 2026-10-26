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


  // --------------------------------------------------------------------------
  // 9. INTERACTIVE PORTFOLIO CHATBOT
  // --------------------------------------------------------------------------
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  const chatbotFloatWrap = document.getElementById('chatbotFloatWrap');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
  const chatbotResetBtn = document.getElementById('chatbotResetBtn');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotTyping = document.getElementById('chatbotTyping');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');

  const openChatbot = () => {
    chatbotWindow?.classList.add('active');
    chatbotFloatWrap?.classList.add('is-open');
    chatbotWindow?.setAttribute('aria-hidden', 'false');
    setTimeout(() => chatbotInput?.focus(), 250);
  };

  const closeChatbot = () => {
    chatbotWindow?.classList.remove('active');
    chatbotFloatWrap?.classList.remove('is-open');
    chatbotWindow?.setAttribute('aria-hidden', 'true');
  };

  chatbotToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (chatbotWindow?.classList.contains('active')) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  chatbotCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeChatbot();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatbotWindow?.classList.contains('active')) {
      closeChatbot();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      chatbotWindow?.classList.contains('active') &&
      !chatbotWindow.contains(e.target) &&
      !chatbotFloatWrap.contains(e.target)
    ) {
      closeChatbot();
    }
  });

  const scrollChatToBottom = () => {
    if (chatbotMessages) {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  };

  const appendUserMessage = (text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `
      <div class="chat-msg-content">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    chatbotMessages.appendChild(msgDiv);
    scrollChatToBottom();
  };

  const appendBotMessage = (htmlContent) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    msgDiv.innerHTML = `
      <div class="chat-msg-avatar">
        <img src="assets/parshva.jpg" alt="Parshva">
      </div>
      <div class="chat-msg-content">
        ${htmlContent}
      </div>
    `;
    chatbotMessages.appendChild(msgDiv);
    scrollChatToBottom();
  };

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const botResponses = {
    projects: `
      <p>Featured live production platforms:</p>
      <p><strong>Ibex Adventure</strong><br>
      High-conversion adventure tourism and trek booking web platform with responsive UX.<br>
      <a href="https://ibex-adventure-updated.vercel.app/" target="_blank" rel="noopener" class="chat-link-btn">Visit Ibex Adventure <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>
      <p><strong>GeM Verify</strong><br>
      Government e-Marketplace credentials validation and vendor verification portal.<br>
      <a href="https://gem-verify-ten.vercel.app/" target="_blank" rel="noopener" class="chat-link-btn">Visit GeM Verify <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>
    `,
    pricing: `
      <p>Website packages and scope:</p>
      <p><strong>Basic Website (Starter)</strong>: 3 to 5 custom pages, mobile-responsive layout, contact forms, and WhatsApp quick chat. (5-7 business days)</p>
      <p><strong>Standard Website (Growth)</strong>: 5 to 8 bespoke pages, custom layout, micro-animations, on-page SEO setup, and PageSpeed score &gt;90.</p>
      <p><strong>Premium Website (Enterprise)</strong>: Custom web applications, admin panel / CMS, database integration, and payment gateways (Razorpay &amp; Stripe).</p>
      <a href="#services" class="chat-link-btn" onclick="document.getElementById('chatbotWindow').classList.remove('active'); document.getElementById('chatbotFloatWrap').classList.remove('is-open');">Explore Packages Section <i class="fa-solid fa-arrow-down"></i></a>
      <a href="https://wa.me/919054079397?text=Hi%20Parshva,%20I'd%20like%20a%20quote%20for%20my%20website%20project." target="_blank" rel="noopener" class="chat-link-btn wa-btn">Get Custom Quote on WhatsApp <i class="fa-brands fa-whatsapp"></i></a>
    `,
    stack: `
      <p>Core technical stack and tools:</p>
      <p><strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Tailwind CSS</p>
      <p><strong>Backend &amp; APIs:</strong> Node.js, Express, Python, REST APIs</p>
      <p><strong>Database &amp; Hosting:</strong> Supabase, PostgreSQL, MongoDB, Vercel, Git &amp; GitHub</p>
      <p><strong>Focus:</strong> Clean semantics, mobile responsiveness, and high PageSpeed performance.</p>
    `,
    timeline: `
      <p>Standard delivery timelines:</p>
      <p><strong>Starter Website:</strong> 5 to 7 business days</p>
      <p><strong>Standard Website:</strong> 10 to 14 business days</p>
      <p><strong>Custom Web App / E-Commerce:</strong> 2 to 4 weeks depending on scope</p>
      <p>Fast-track turnaround is also available upon request.</p>
    `,
    whatsapp: `
      <p>Direct communication on WhatsApp:</p>
      <p><strong>Phone:</strong> +91 90540 79397<br>
      <strong>Location:</strong> Ahmedabad, Gujarat, India</p>
      <a href="https://wa.me/919054079397?text=Hi%20Parshva,%20I%20am%20interested%20in%20building%20a%20website%20with%20you!" target="_blank" rel="noopener" class="chat-link-btn wa-btn">Open WhatsApp Chat <i class="fa-brands fa-whatsapp"></i></a>
    `,
    contact: `
      <p>Direct contact channels:</p>
      <p><strong>Email:</strong> patelparshv1052006@gmail.com<br>
      <strong>Phone:</strong> +91 90540 79397<br>
      <strong>Location:</strong> Ahmedabad, Gujarat, India</p>
      <a href="#contact" class="chat-link-btn" onclick="document.getElementById('chatbotWindow').classList.remove('active'); document.getElementById('chatbotFloatWrap').classList.remove('is-open');">Go to Contact Form <i class="fa-solid fa-arrow-down"></i></a>
      <a href="https://wa.me/919054079397?text=Hi%20Parshva,%20I%20would%20like%20to%20discuss%20a%20new%20project." target="_blank" rel="noopener" class="chat-link-btn wa-btn">Chat on WhatsApp <i class="fa-brands fa-whatsapp"></i></a>
    `
  };

  const getSmartReply = (rawText) => {
    const q = rawText.toLowerCase().trim();

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('ibex') || q.includes('gem') || q.includes('sample')) {
      return botResponses.projects;
    }
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('charge') || q.includes('plan') || q.includes('starter') || q.includes('standard') || q.includes('premium')) {
      return botResponses.pricing;
    }
    if (q.includes('tech') || q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('react') || q.includes('tool') || q.includes('framework')) {
      return botResponses.stack;
    }
    if (q.includes('time') || q.includes('timeline') || q.includes('day') || q.includes('how long') || q.includes('fast') || q.includes('delivery')) {
      return botResponses.timeline;
    }
    if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('mobile')) {
      return botResponses.whatsapp;
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('quote') || q.includes('meet') || q.includes('touch') || q.includes('inquiry')) {
      return botResponses.contact;
    }
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('kem cho') || q.includes('namaste') || q.includes('morning') || q.includes('evening')) {
      return `<p>Hello. How can I assist you with your web development or design project today?</p>`;
    }
    if (q.includes('about') || q.includes('who') || q.includes('parshva') || q.includes('experience')) {
      return `
        <p>Parshva is a freelance web developer and UI designer based in <strong>Ahmedabad, Gujarat, India</strong>.</p>
        <p>Specializing in custom websites, responsive UI design, and full-stack web applications for businesses and founders.</p>
        <a href="#about" class="chat-link-btn" onclick="document.getElementById('chatbotWindow').classList.remove('active'); document.getElementById('chatbotFloatWrap').classList.remove('is-open');">Read Full About Section <i class="fa-solid fa-arrow-down"></i></a>
      `;
    }

    return `
      <p>Thank you for your message.</p>
      <p>To review your specific project requirements directly, please send a message on WhatsApp or submit the contact form:</p>
      <a href="https://wa.me/919054079397?text=${encodeURIComponent('Hi Parshva, ' + rawText)}" target="_blank" rel="noopener" class="chat-link-btn wa-btn">Message Parshva on WhatsApp <i class="fa-brands fa-whatsapp"></i></a>
      <a href="#services" class="chat-link-btn" onclick="document.getElementById('chatbotWindow').classList.remove('active'); document.getElementById('chatbotFloatWrap').classList.remove('is-open');">View Packages <i class="fa-solid fa-arrow-down"></i></a>
    `;
  };

  const handleUserSubmission = (text) => {
    if (!text || !text.trim()) return;

    appendUserMessage(text);
    if (chatbotInput) chatbotInput.value = '';

    // Show typing indicator
    if (chatbotTyping) {
      chatbotTyping.classList.add('active');
      scrollChatToBottom();
    }

    // Realistic response delay
    setTimeout(() => {
      if (chatbotTyping) chatbotTyping.classList.remove('active');
      const reply = getSmartReply(text);
      appendBotMessage(reply);
    }, 450);
  };

  // Form submit handler
  chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatbotInput?.value;
    handleUserSubmission(text);
  });

  // Chips click handler
  chatbotMessages?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chat-chip');
    if (!chip) return;

    const queryKey = chip.getAttribute('data-query');
    const chipText = chip.textContent.trim();

    appendUserMessage(chipText);

    if (chatbotTyping) {
      chatbotTyping.classList.add('active');
      scrollChatToBottom();
    }

    setTimeout(() => {
      if (chatbotTyping) chatbotTyping.classList.remove('active');
      const reply = botResponses[queryKey] || getSmartReply(chipText);
      appendBotMessage(reply);
    }, 380);
  });

  // Reset conversation button
  chatbotResetBtn?.addEventListener('click', () => {
    if (!chatbotMessages) return;
    chatbotMessages.innerHTML = `
      <div class="chat-system-pill">
        <span>Direct Portfolio Inquiry</span>
      </div>
      <div class="chat-msg bot-msg">
        <div class="chat-msg-avatar">
          <img src="assets/parshva.jpg" alt="Parshva">
        </div>
        <div class="chat-msg-content">
          <p>Hello. Welcome to my portfolio.</p>
          <p>I am a freelance web developer and UI designer based in Ahmedabad, India. How can I assist you with your project today?</p>
        </div>
      </div>
      <div class="chat-chips-container" id="chatChipsContainer">
        <button type="button" class="chat-chip" data-query="projects">Live Projects</button>
        <button type="button" class="chat-chip" data-query="pricing">Services &amp; Pricing</button>
        <button type="button" class="chat-chip" data-query="timeline">Delivery Timelines</button>
        <button type="button" class="chat-chip" data-query="stack">Technology Stack</button>
        <button type="button" class="chat-chip" data-query="whatsapp">WhatsApp Direct</button>
        <button type="button" class="chat-chip" data-query="contact">Contact Information</button>
      </div>
    `;
    showToast('Conversation reset', 'info');
  });

});
