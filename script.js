document.documentElement.style.scrollBehavior = "smooth";

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navbar) {
  const handleNavbar = () => {
    if (window.scrollY > 10) {
      navbar.classList.remove("bg-black");
      navbar.classList.add("bg-brandSky", "shadow-md");
    } else {
      navbar.classList.remove("bg-black");
      navbar.classList.add("bg-brandSky");
      navbar.classList.remove("shadow-md");
    }
  };
  handleNavbar();
  window.addEventListener("scroll", handleNavbar, { passive: true });
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

const testimonials = Array.from(document.querySelectorAll(".testimonial-item"));
if (testimonials.length > 1) {
  let current = 0;
  setInterval(() => {
    testimonials[current].classList.add("hidden");
    current = (current + 1) % testimonials.length;
    testimonials[current].classList.remove("hidden");
  }, 3800);
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const runTypewriter = (element, text, speed = 40) => {
  let index = 0;
  element.textContent = "";
  const tick = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index += 1;
      window.setTimeout(tick, speed);
    }
  };
  tick();
};

const typewriterElements = Array.from(document.querySelectorAll("[data-typewriter]"));
typewriterElements.forEach((element, order) => {
  const text = element.getAttribute("data-typewriter");
  if (!text) return;
  window.setTimeout(() => runTypewriter(element, text), order * 350);
});

const counters = Array.from(document.querySelectorAll(".counter"));
if (counters.length > 0) {
  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;
    const target = Number(counter.getAttribute("data-target") || 0);
    const suffix = counter.getAttribute("data-suffix") || "";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = window.setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        window.clearInterval(timer);
        counter.dataset.animated = "true";
      }
      counter.textContent = `${current}${suffix}`;
    }, 28);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

const form = document.getElementById("inquiryForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const content = `New hiring inquiry from website:%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    const mailto = `mailto:Sourcingiamanagementconsulting@gmail.com?subject=Hiring%20Inquiry%20from%20Website&body=${content}`;
    const whatsapp = `https://wa.me/917996200355?text=${content}`;

    const status = document.getElementById("formStatus");
    if (status) {
      status.textContent = "Opening your mail client and WhatsApp to complete submission.";
    }

    window.location.href = mailto;
    setTimeout(() => {
      window.open(whatsapp, "_blank", "noopener,noreferrer");
      form.reset();
    }, 500);
  });
}

const floatingFab = document.getElementById("floatingFab");
if (floatingFab) {
  let scrollTimer;
  const handleFabOnScroll = () => {
    floatingFab.classList.add("is-scrolling");
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      floatingFab.classList.remove("is-scrolling");
    }, 220);
  };

  window.addEventListener("scroll", handleFabOnScroll, { passive: true });
}
