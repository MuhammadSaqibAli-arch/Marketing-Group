/* =========================
   AIDERZ Marketing Agency
   script.js
========================= */

/* --------------------------
   1. SIDEBAR TOGGLE
-------------------------- */
function openMenu() {
  document.getElementById("sidebar").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  document.getElementById("sidebar").classList.remove("active");
  document.body.style.overflow = "";
}

// Close sidebar when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

/* --------------------------
   2. STICKY HEADER SHADOW
-------------------------- */
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 20px rgba(122, 46, 168, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* --------------------------
   3. ACTIVE NAV LINK ON SCROLL
-------------------------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function () {
  let currentSection = "";
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

/* --------------------------
   4. CONTACT FORM SUBMIT
-------------------------- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector(".btn");
    const originalHTML = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate sending (replace with real API call if needed)
    setTimeout(function () {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
      btn.style.background = "#22c55e";
      btn.style.boxShadow = "0 4px 12px rgba(34,197,94,0.3)";

      // Show success message
      showToast("Your request has been sent! We will contact you soon.", "success");

      // Reset after 3 seconds
      setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.style.background = "";
        btn.style.boxShadow = "";
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

/* --------------------------
   5. TOAST NOTIFICATION
-------------------------- */
function showToast(message, type) {
  // Remove existing toast
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  toast.innerHTML =
    '<i class="fa-solid fa-' +
    (type === "success" ? "circle-check" : "circle-xmark") +
    '"></i> ' +
    message;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(function () {
    toast.classList.add("toast-show");
  }, 10);

  // Animate out and remove
  setTimeout(function () {
    toast.classList.remove("toast-show");
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 4000);
}

// Toast styles injected via JS (so no extra CSS file needed)
(function injectToastStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 100px;
      right: 24px;
      background: #1e0a33;
      color: white;
      padding: 14px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.4s ease;
      max-width: 320px;
      border-left: 4px solid #22c55e;
    }
    .toast-success i { color: #22c55e; }
    .toast-error { border-left-color: #ef4444; }
    .toast-error i { color: #ef4444; }
    .toast-show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

/* --------------------------
   6. SCROLL REVEAL ANIMATION
-------------------------- */
(function initScrollReveal() {
  const style = document.createElement("style");
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Add reveal class to elements
  const targets = document.querySelectorAll(
    ".card, .why-card, .info-box, .section-header, .hero-content, .contact-form, .contact-info, .footer-col"
  );
  targets.forEach(function (el) {
    el.classList.add("reveal");
  });

  // Observe elements
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add("visible");
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

/* --------------------------
   7. SMOOTH SCROLL FOR ALL ANCHOR LINKS
-------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  });
});

/* --------------------------
   8. SERVICE CARD BUTTONS → SCROLL TO CONTACT
-------------------------- */
document.querySelectorAll(".card-btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const contact = document.getElementById("contact");
    if (contact) {
      const top = contact.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  });
});

/* --------------------------
   9. BACK TO TOP VISIBILITY
-------------------------- */
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTop.style.opacity = "1";
      backToTop.style.pointerEvents = "auto";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.pointerEvents = "none";
    }
  });
  backToTop.style.opacity = "0";
  backToTop.style.transition = "opacity 0.3s ease";
  backToTop.style.pointerEvents = "none";
}

/* --------------------------
   10. ACTIVE NAV STYLE INJECTION
-------------------------- */
(function injectNavActiveStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .navbar a.active {
      color: #7a2ea8;
    }
    .navbar a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
})();

  // Initialize EmailJS with your Public Key
  emailjs.init("w3IopA_R4yiAJ2y5z");

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm("service_ryacx4r", "template_os4m76a", this)
      .then(() => {
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sent Successfully!';
        btn.style.background = "#28a745";
        this.reset();

        // Reset button after 4 seconds
        setTimeout(() => {
          btn.disabled = false;
          btn.style.background = "";
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Request';
        }, 4000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Failed. Try Again';
        btn.style.background = "#dc3545";

        setTimeout(() => {
          btn.style.background = "";
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Request';
        }, 4000);
      });
  });
