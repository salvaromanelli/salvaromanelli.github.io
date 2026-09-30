document.documentElement.classList.add('js');

// Año del pie de página
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Ecualizador decorativo de la portada
const eq = document.querySelector('.eq');
if (eq) {
  const bars = window.matchMedia('(min-width: 720px)').matches ? 72 : 36;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('span');
    bar.style.setProperty('--h', (0.25 + Math.random() * 0.75).toFixed(2));
    bar.style.animationDuration = (0.55 + Math.random() * 0.9).toFixed(2) + 's';
    bar.style.animationDelay = (-Math.random() * 1.5).toFixed(2) + 's';
    frag.appendChild(bar);
  }
  eq.appendChild(frag);
}

if ('IntersectionObserver' in window) {
  // Marca en el menú la sección que se está viendo
  const links = [...document.querySelectorAll('.nav__links a')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      byId.get(entry.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });

  // Aparición suave de cada sección
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
}
