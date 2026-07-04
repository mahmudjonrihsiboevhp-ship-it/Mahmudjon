// FIELDWORK — shared interactions
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Bag count (visual only, persists for the session via a simple counter)
  var bagCount = document.querySelector('.bag-count');
  var count = 0;

  function bump() {
    count++;
    if (bagCount) bagCount.textContent = count;
  }

  // Add-to-bag buttons
  document.querySelectorAll('.tag-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('added')) return;
      btn.classList.add('added');
      btn.textContent = 'Added ✓';
      bump();
      setTimeout(function () {
        btn.classList.remove('added');
        btn.textContent = 'Add to bag';
      }, 1600);
    });
  });

  // Shop filter chips
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.tag-card');
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var cat = chip.dataset.filter;
        cards.forEach(function (card) {
          var show = cat === 'all' || card.dataset.category === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Newsletter form (visual confirmation, no backend wired up)
  var nForm = document.querySelector('.n-form');
  if (nForm) {
    nForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = nForm.querySelector('input');
      var note = nForm.parentElement.querySelector('.n-note');
      if (note) note.textContent = 'Thanks — check your inbox to confirm.';
      if (input) input.value = '';
    });
  }

  // Contact form
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }
});
