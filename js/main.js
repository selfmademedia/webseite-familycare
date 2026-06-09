/* ===================================================
   Family Care – Animation sequence & interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const hero     = document.getElementById('hero');
  const services = document.getElementById('services');
  const footer   = document.querySelector('footer');

  // ── Phase 1: Hero text animates in via CSS (0–2.5 s) ──────────────────

  // ── Phase 2: Fade out hero at 4 s ────────────────────────────────────
  setTimeout(() => {
    hero.classList.add('fade-out');
  }, 4000);

  // ── Phase 3: Show services after fade (4.8 s) ─────────────────────────
  setTimeout(() => {
    hero.style.display = 'none';
    services.classList.add('visible');

    // Logo scales in
    setTimeout(() => {
      const logo = document.querySelector('.logo-center');
      if (logo) logo.classList.add('animate-in');
    }, 150);

    // SVG lines fade in (staggered)
    const lines = document.querySelectorAll('.orbit-line');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, 500 + i * 120);
    });

    // Circles scale in (staggered)
    const cards = document.querySelectorAll('.circle-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 550 + i * 180);
    });

    // Footer slides in slowly after circles
    if (footer) {
      setTimeout(() => {
        footer.classList.add('footer-visible');
      }, 1800);
    }

  }, 4800);

  // ── Touch / click support for flip cards ─────────────────────────────
  // On desktop hover already flips via CSS.
  // On touch, a tap flips; tapping elsewhere or the same card unflips.

  function isTouchDevice() {
    return window.matchMedia('(hover: none)').matches;
  }

  if (isTouchDevice()) {
    document.querySelectorAll('.circle-float').forEach(floatEl => {
      floatEl.addEventListener('click', (e) => {
        const isFlipped = floatEl.classList.contains('flipped');
        // Collapse all others
        document.querySelectorAll('.circle-float.flipped').forEach(f => {
          f.classList.remove('flipped');
        });
        if (!isFlipped) {
          floatEl.classList.add('flipped');
          e.stopPropagation();
        }
      });
    });

    // Tap outside collapses all
    document.addEventListener('click', () => {
      document.querySelectorAll('.circle-float.flipped').forEach(f => {
        f.classList.remove('flipped');
      });
    });
  }
});
