// ─── AOS SCROLL ANIMATIONS ───
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => e.target.classList.add('aos-visible'), parseInt(delay));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ─── COPY CODE ───
function initCopyBtns() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre.code');
      const text = pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Скопировано`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Копировать`;
        }, 2000);
      });
    });
  });
}

// ─── HAMBURGER / MOBILE MENU ───
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('active');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
    });
  });
}

// ─── SIDEBAR MOBILE TOGGLE ───
function initSidebarToggle() {
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== btn) {
      sidebar.classList.remove('open');
    }
  });
}

// ─── ACTIVE NAV ───
function initActiveNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .sidebar-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ─── HERO TYPEWRITER ───
function initTypewriter() {
  const cursor = document.querySelector('.code-cursor');
  if (!cursor) return;
}

// ─── SMOOTH NAVBAR ON SCROLL ───
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
    last = y;
  }, { passive: true });
}

// ─── TRY IT YOURSELF (simulated output) ───
function initTryIt() {
  document.querySelectorAll('.try-run-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.try-block');
      const textarea = block.querySelector('textarea');
      const outputDiv = block.querySelector('.try-output');
      const outputBox = block.querySelector('.try-output-box');
      if (!textarea || !outputDiv || !outputBox) return;

      const code = textarea.value;
      outputDiv.classList.add('visible');

      // Simple Python output simulation
      let result = simulatePython(code);
      outputBox.textContent = result;
    });
  });
}

function simulatePython(code) {
  const lines = code.split('\n');
  let output = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // print() calls
    const printMatch = trimmed.match(/^print\((.+)\)$/);
    if (printMatch) {
      let arg = printMatch[1].trim();

      // String literals
      const strMatch = arg.match(/^["'](.*)["']$/);
      if (strMatch) { output.push(strMatch[1]); continue; }

      // f-string
      const fStrMatch = arg.match(/^f["'](.*)["']$/);
      if (fStrMatch) {
        output.push('[f-строка: результат зависит от переменных]');
        continue;
      }

      // Number expression
      if (/^[\d\s+\-*/()%]+$/.test(arg)) {
        try { output.push(String(eval(arg))); continue; } catch(e) {}
      }

      output.push('[вывод: ' + arg + ']');
    }
  }

  if (output.length === 0) {
    return '# Код выполнен без вывода';
  }
  return output.join('\n');
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initCopyBtns();
  initHamburger();
  initSidebarToggle();
  initActiveNav();
  initTypewriter();
  initNavbarScroll();
  initTryIt();
});
