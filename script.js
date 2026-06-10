// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-heading, .skill-card, .project-card, .timeline-item, .contact-item, .about-text, .about-avatar, .hero-content, .hero-code-block').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const target = bar.getAttribute('data-w');
        bar.style.width = target + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 35);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('visible');
    this.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => document.getElementById('formSuccess').classList.remove('visible'), 4000);
  }, 1200);
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
