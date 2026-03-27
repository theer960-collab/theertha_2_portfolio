/* ================================================
   THEERTHA PORTFOLIO - MAIN JAVASCRIPT
   Handles: Navbar, Animations, API calls, Forms
   ================================================ */

const API_BASE = 'https://theertha-2-portfolio-backend.onrender.com/api';

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== TYPING ROLES =====
const roles = [
  'Student Developer',
  'Frontend Enthusiast',
  'Problem Solver',
  'Tech Explorer',
  'Creative Coder',
];
let roleIndex = 0;
const roleText = document.getElementById('roleText');

function rotateRoles() {
  if (!roleText) return;
  roleText.style.opacity = '0';
  roleText.style.transform = 'translateY(8px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
    roleText.style.opacity = '1';
    roleText.style.transform = 'translateY(0)';
  }, 300);
}

roleText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
setInterval(rotateRoles, 3000);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger skill bar animation when visible
        const bars = entry.target.querySelectorAll('.skill-bar-fill');
        bars.forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });

        // Trigger attendance bar animation
        const attBars = entry.target.querySelectorAll('.pct-bar-fill');
        attBars.forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const statsEl = document.querySelector('.about-stats');
if (statsEl) counterObserver.observe(statsEl);

// ===== TOAST =====
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message, type = 'default') {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== LOAD SKILLS =====
async function loadSkills() {
  const grid = document.getElementById('skillsGrid');
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const json = await res.json();

    if (!json.success || !json.data.length) {
      grid.innerHTML = '<p style="text-align:center;color:var(--clr-text-muted);padding:2rem;">No skills found. Please seed the database.</p>';
      return;
    }

    grid.innerHTML = '';
    json.data.forEach((skill, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal';
      card.style.animationDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="skill-header">
          <span class="skill-icon">${skill.icon || '💻'}</span>
          <div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.level}% proficiency</div>
          </div>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" data-level="${skill.level}" style="width:0"></div>
        </div>
        <span class="skill-category-badge">${skill.category}</span>
      `;
      grid.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--clr-text-muted);grid-column:1/-1">
        <p style="font-size:2rem;margin-bottom:0.5rem">⚠️</p>
        <p>Could not connect to backend. Make sure the server is running.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;opacity:0.6">${err.message}</p>
      </div>`;
  }
}

// ===== LOAD ACHIEVEMENTS =====
async function loadAchievements() {
  const grid = document.getElementById('achievementsGrid');
  try {
    const res = await fetch(`${API_BASE}/achievements`);
    const json = await res.json();

    if (!json.success || !json.data.length) {
      grid.innerHTML = '<p style="text-align:center;color:var(--clr-text-muted);padding:2rem;grid-column:1/-1">No achievements found. Please seed the database.</p>';
      return;
    }

    grid.innerHTML = '';
    json.data.forEach((ach, i) => {
      const card = document.createElement('div');
      card.className = `achievement-card reveal ${ach.highlight ? 'highlight' : ''}`;
      card.style.animationDelay = `${i * 0.08}s`;
      card.innerHTML = `
        <div class="achievement-icon-wrap">
          <span class="achievement-icon">${ach.icon || '🏆'}</span>
          <span class="achievement-category cat-${ach.category}">${ach.category}</span>
        </div>
        <h3 class="achievement-title">${ach.title}</h3>
        <p class="achievement-desc">${ach.description}</p>
        <span class="achievement-date">📅 ${ach.date}</span>
      `;
      grid.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--clr-text-muted);grid-column:1/-1">
        <p style="font-size:2rem;margin-bottom:0.5rem">⚠️</p>
        <p>Could not connect to backend.</p>
      </div>`;
  }
}

// ===== LOAD ATTENDANCE =====
async function loadAttendance() {
  const tableWrap = document.getElementById('attendanceTableWrap');
  const totalSubjectsEl = document.getElementById('totalSubjects');
  const avgAttendanceEl = document.getElementById('avgAttendance');
  const lowAttendanceEl = document.getElementById('lowAttendance');

  try {
    const res = await fetch(`${API_BASE}/attendance`);
    const json = await res.json();

    if (!json.success || !json.data.length) {
      tableWrap.innerHTML = '<p style="text-align:center;color:var(--clr-text-muted);padding:2rem;">No attendance data found.</p>';
      return;
    }

    const records = json.data;
    const total = records.length;
    const avgPct = Math.round(records.reduce((s, r) => s + r.percentage, 0) / total);
    const lowCount = records.filter(r => r.percentage < 75).length;

    totalSubjectsEl.textContent = total;
    avgAttendanceEl.textContent = `${avgPct}%`;
    lowAttendanceEl.textContent = lowCount;

    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Attended</th>
            <th>Total</th>
            <th>Attendance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
    `;

    records.forEach((rec, i) => {
      const pct = rec.percentage;
      const pctClass = pct >= 75 ? 'pct-good' : pct >= 60 ? 'pct-warning' : 'pct-danger';
      const labelClass = pct >= 75 ? 'good' : pct >= 60 ? 'warning' : 'danger';
      const statusClass = pct >= 75 ? 'status-safe' : pct >= 60 ? 'status-warn' : 'status-low';
      const statusText = pct >= 75 ? '✅ Safe' : pct >= 60 ? '⚠️ At Risk' : '🚨 Critical';

      tableHTML += `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${rec.subject}</strong><br><span style="font-size:0.78rem;color:var(--clr-text-muted)">${rec.semester || ''}</span></td>
          <td>${rec.attended}</td>
          <td>${rec.total}</td>
          <td>
            <div class="pct-bar-wrap">
              <div class="pct-bar-bg">
                <div class="pct-bar-fill ${pctClass}" data-pct="${pct}" style="width:0"></div>
              </div>
              <span class="pct-label ${labelClass}">${pct}%</span>
            </div>
          </td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        </tr>
      `;
    });

    tableHTML += '</tbody></table>';
    tableWrap.innerHTML = tableHTML;

    // Animate bars when they come into view
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.pct-bar-fill').forEach(bar => {
            setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 200);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    barObserver.observe(tableWrap);

  } catch (err) {
    tableWrap.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--clr-text-muted)">
        <p style="font-size:2rem;margin-bottom:0.5rem">⚠️</p>
        <p>Could not fetch attendance. Make sure the backend server is running.</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;opacity:0.6">${err.message}</p>
      </div>`;
  }
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('contactSubmitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formStatus.className = 'form-status';
  formStatus.style.display = 'none';

  const formData = {
    name: document.getElementById('contactName').value.trim(),
    email: document.getElementById('contactEmail').value.trim(),
    subject: document.getElementById('contactSubject').value.trim(),
    message: document.getElementById('contactMessage').value.trim(),
  };

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    if (json.success) {
      formStatus.textContent = json.message;
      formStatus.className = 'form-status success';
      contactForm.reset();
      showToast('Message sent successfully! 🎉', 'success');
    } else {
      formStatus.textContent = json.message || 'Something went wrong.';
      formStatus.className = 'form-status error';
      showToast('Failed to send message. Try again.', 'error');
    }
  } catch (err) {
    formStatus.textContent = 'Could not reach the server. Make sure the backend is running.';
    formStatus.className = 'form-status error';
    showToast('Server connection failed.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkEls.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { passive: true });

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  loadSkills();
  loadAchievements();
  loadAttendance();
});
