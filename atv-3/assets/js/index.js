const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;
const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  toggleBtn.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

hamburgerBtn.addEventListener('click', () => {
  const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('show');
});
