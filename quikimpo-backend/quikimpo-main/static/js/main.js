/* ================================================
   QUIKIMPO FREIGHT & LOGISTICS
   main.js — Global JavaScript
   ================================================ */


/* ── 1. NAVBAR SCROLL EFFECT ───────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});


/* ── 2. MOBILE HAMBURGER MENU ──────────────────── */
function toggleMenu() {
  const navLinks   = document.getElementById('nav-links');
  const hamburger  = document.getElementById('hamburger');
  if (navLinks)  navLinks.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('active');
}

// Close menu when a link is clicked on mobile
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links')?.classList.remove('open');
      document.getElementById('hamburger')?.classList.remove('active');
    });
  });
});


/* ── 3. ACTIVE NAV LINK HIGHLIGHT ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
});


/* ── 4. AI CHAT WIDGET ─────────────────────────── */
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) chatWindow.classList.toggle('chat-hidden');
}

async function sendChat() {
  const input  = document.getElementById('chat-input');
  const msgBox = document.getElementById('chat-messages');
  if (!input || !msgBox) return;

  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  // Show user message
  msgBox.innerHTML += `<div class="user-msg">${escapeHTML(msg)}</div>`;

  // Show typing indicator
  const thinking      = document.createElement('div');
  thinking.className  = 'bot-msg';
  thinking.id         = 'thinking';
  thinking.textContent = 'Typing...';
  msgBox.appendChild(thinking);
  msgBox.scrollTop = msgBox.scrollHeight;

  try {
    const res = await fetch('/ai-chat/', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken':  getCookie('csrftoken')
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    document.getElementById('thinking')?.remove();
    msgBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;

  } catch (err) {
    document.getElementById('thinking')?.remove();
    msgBox.innerHTML += `<div class="bot-msg">
      Connection issue. Please email 
      <a href="mailto:quotes@quikimpo.com">quotes@quikimpo.com</a>
    </div>`;
  }

  msgBox.scrollTop = msgBox.scrollHeight;
}

// Allow Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendChat();
    });
  }
});


/* ── 5. TRACKING PAGE ──────────────────────────── */
const demoShipments = {
  'QKI-2024-00123': {
    tracking:    'QKI-2024-00123',
    status:      'In Transit',
    origin:      'Shanghai, China',
    destination: 'Nairobi, Kenya',
    eta:         '28 Jun 2024',
    type:        'Sea Freight (FCL)',
    step:        3,
    timeline: [
      { date: '10 Jun 2024', time: '09:00', event: 'Order confirmed and booking created',        location: 'Nairobi, Kenya'       },
      { date: '13 Jun 2024', time: '14:30', event: 'Cargo picked up from supplier warehouse',   location: 'Shanghai, China'      },
      { date: '15 Jun 2024', time: '08:00', event: 'Cargo loaded onto vessel MSC DIANA',        location: 'Shanghai Port, China' },
      { date: '16 Jun 2024', time: '11:00', event: 'Vessel departed Shanghai Port',             location: 'Shanghai, China'      },
    ]
  },
  'QKI-2024-00456': {
    tracking:    'QKI-2024-00456',
    status:      'Delivered',
    origin:      'Dubai, UAE',
    destination: 'Kampala, Uganda',
    eta:         '20 Jun 2024',
    type:        'Air Freight',
    step:        6,
    timeline: [
      { date: '14 Jun 2024', time: '10:00', event: 'Order confirmed',                           location: 'Kampala, Uganda'   },
      { date: '15 Jun 2024', time: '15:00', event: 'Cargo picked up',                           location: 'Dubai, UAE'        },
      { date: '16 Jun 2024', time: '22:00', event: 'Departed Dubai International Airport',      location: 'Dubai, UAE'        },
      { date: '17 Jun 2024', time: '06:00', event: 'Arrived Entebbe International Airport',     location: 'Entebbe, Uganda'   },
      { date: '18 Jun 2024', time: '09:00', event: 'Customs clearance completed',               location: 'Entebbe, Uganda'   },
      { date: '20 Jun 2024', time: '13:00', event: '✅ Delivered to recipient',                 location: 'Kampala, Uganda'   },
    ]
  }
};

function trackShipment() {
  const input = document.getElementById('tracking-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();

  document.getElementById('track-placeholder')?.style && (document.getElementById('track-placeholder').style.display = 'none');
  document.getElementById('track-result')?.style      && (document.getElementById('track-result').style.display      = 'none');
  document.getElementById('track-notfound')?.style    && (document.getElementById('track-notfound').style.display    = 'none');

  if (!code) return;

  const shipment = demoShipments[code];

  if (!shipment) {
    document.getElementById('track-notfound').style.display = 'block';
    return;
  }

  // Fill summary cards
  document.getElementById('res-tracking').textContent    = shipment.tracking;
  document.getElementById('res-status').textContent      = shipment.status;
  document.getElementById('res-origin').textContent      = shipment.origin;
  document.getElementById('res-destination').textContent = shipment.destination;
  document.getElementById('res-eta').textContent         = shipment.eta;
  document.getElementById('res-type').textContent        = shipment.type;

  // Status badge colour
  const badge = document.getElementById('res-status');
  badge.className = 'ts-value status-badge';
  if      (shipment.status === 'Delivered')  badge.classList.add('status-delivered');
  else if (shipment.status === 'In Transit') badge.classList.add('status-transit');
  else                                       badge.classList.add('status-pending');

  // Progress steps
  for (let i = 1; i <= 6; i++) {
    const el = document.getElementById('step-' + i);
    if (!el) continue;
    el.classList.remove('step-done', 'step-active');
    if      (i < shipment.step)  el.classList.add('step-done');
    else if (i === shipment.step) el.classList.add('step-active');
  }

  // Timeline
  const tl = document.getElementById('timeline-items');
  if (tl) {
    tl.innerHTML = '';
    shipment.timeline.forEach(item => {
      tl.innerHTML += `
        <div class="tl-item">
          <div class="tl-dot"></div>
          <div class="tl-content">
            <div class="tl-date">${item.date} &nbsp;·&nbsp; ${item.time}</div>
            <div class="tl-event">${item.event}</div>
            <div class="tl-loc">📍 ${item.location}</div>
          </div>
        </div>`;
    });
  }

  document.getElementById('track-result').style.display = 'block';
}


/* ── 6. SCROLL ANIMATIONS ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});


/* ── 7. COUNTER ANIMATION (for stats on home page) */
function animateCounter(el, target, duration = 2000) {
  let start     = 0;
  const step    = target / (duration / 16);
  const timer   = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString() + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + '+';
    }
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-counter'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});


/* ── 8. FORM VALIDATION FEEDBACK ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.style.borderColor = '#dc3545';
        } else {
          input.style.borderColor = '#28a745';
        }
      });
    });
  });
});


/* ── 9. SMOOTH SCROLL FOR ANCHOR LINKS ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});


/* ── 10. UTILITY FUNCTIONS ─────────────────────── */
function getCookie(name) {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)');
  return v ? v[2] : null;
}
