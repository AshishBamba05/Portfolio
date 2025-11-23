
// Accessible toggle: click or Enter/Space; closes others (accordion)
document.querySelectorAll('.course .course-pill').forEach(btn => {
  btn.addEventListener('click', toggle);
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.call(btn, e); }
  });
});

function toggle(){
  const li = this.closest('.course');
  const expanded = this.getAttribute('aria-expanded') === 'true';

  document.querySelectorAll('.course').forEach(c => {
    c.classList.remove('open');
    const b = c.querySelector('.course-pill');
    if (b) b.setAttribute('aria-expanded','false');
  });

  if (!expanded) {
    li.classList.add('open');
    this.setAttribute('aria-expanded','true');
  }
}

  // ===== Terminal typing =====
  const terminalText = `>

I’m an undergraduate junior studying Computer Science, also pursuing a Cognitive Science minor (spec. Machine Learning). 

Back in high school, I was accepted into the Johns Hopkins Center for Talented Youth CS program, where I learned how to turn abstract ideas into practical, working software. That foundation carried forward as I began tackling larger, more impact-driven problems.

Fast forward to summer 2025, I worked as a software developer at Vikmere Software Inc., where I redesigned a core backend workflow for a client’s dining reservation platform, strengthening reliability and improving the overall experience for their customers. From there, I continued pushing into projects that blend usability, performance, and clean system design.

Parallel to full-stack work, I doubled down on AI/ML systems at UCSD. I led CS foreach as 1 of 3 AI/ML starter-kit developers, where I built reproducible Scikit-Learn kits to teach supervied ML concepts to 250+ students across different computer science orgs and high-schools. I've also recently joined CSES Innovate as a researcher and am exploring the interserction of Machine Learning and Music, securing awards at SoCal AI Responsibility Summit (SAIRS 2025) and San Diego Tech Conference (SDTC).

I’m currently seeking opportunities to level up in my full-stack career.

`;

  const pre = document.getElementById('terminal-text');
  const skipBtn = document.getElementById('skipBtn');
  const restartBtn = document.getElementById('restart-btn');

  let idx = 0;
  let typing = true;
  let timerId = null;

  function typeWriter() {
    if (!typing) return;
    if (idx < terminalText.length) {
      pre.textContent += terminalText.charAt(idx++);
      timerId = setTimeout(typeWriter, 22);
    }
  }

  function skipTyping() {
    typing = false;
    if (timerId) clearTimeout(timerId);
    pre.textContent = terminalText;
    skipBtn.style.display = 'none';
  }

  function restartTyping() {
    typing = false;
    if (timerId) clearTimeout(timerId);
    // reset
    pre.textContent = '';
    idx = 0;
    typing = true;
    // show skip again in case it was hidden
    skipBtn.style.display = '';
    typeWriter();
  }

  skipBtn.addEventListener('click', skipTyping);
  restartBtn.addEventListener('click', restartTyping);
  window.addEventListener('load', typeWriter);


  const buttons = document.querySelectorAll('.filter-btn');
  const badges  = document.querySelectorAll('.badge');

  function applyFilter(key) {
    badges.forEach(badge => {
      if (key === 'all') { badge.hidden = false; return; }
      const tags = (badge.dataset.tags || '').split(/\s+/);
      badge.hidden = !tags.includes(key);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // default: show all
  applyFilter('all');
  




function adjustBodyPad(){
  const f = document.querySelector('.site-footer');
  if (!f) return;
  const h = f.offsetHeight || 0;
  document.body.style.paddingBottom = `calc(${h}px + env(safe-area-inset-bottom))`;
}
window.addEventListener('load', adjustBodyPad);
window.addEventListener('resize', adjustBodyPad);


document.addEventListener('DOMContentLoaded', () => {
  const SPEED = 18; // ms/char

  document.querySelectorAll('.project-desc').forEach(box => {
    // guard against double-binding
    if (box.dataset.wired === '1') return;
    box.dataset.wired = '1';

    const full = box.textContent.trim();
    box.textContent = ''; // clear once to build structure

    const textSpan = document.createElement('span');
    textSpan.className = 'desc-text';
    textSpan.textContent = full;

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');

    box.appendChild(textSpan);
    box.appendChild(caret);

    // lock height so clearing text doesn’t collapse the hover area
    const h = box.getBoundingClientRect().height || 0;
    if (h) box.style.minHeight = Math.ceil(h) + 'px';

    let i = 0, t = null, hovering = false;

    function step(){
      if (!hovering) return;
      if (i <= full.length){
        textSpan.textContent = full.slice(0, i++);
        t = setTimeout(step, SPEED);
      }
    }

    box.addEventListener('pointerenter', () => {
      hovering = true;
      clearTimeout(t);
      i = 0;
      textSpan.textContent = '';      // erase immediately
      box.classList.add('typing');    // show glow + caret
      step();
    });

    box.addEventListener('pointerleave', () => {
      hovering = false;
      clearTimeout(t);
      textSpan.textContent = full;    // restore
      box.classList.remove('typing');
    });
  });
});


new Typed(".cta-typed", {
  strings: [
    "Let's connect and code!",
    "I'm open to new opportunities and collaborations. Feel free to reach out!"
  ],
  typeSpeed: 40,
  backSpeed: 0,
  showCursor: false
});
