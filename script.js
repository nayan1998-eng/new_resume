const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const progress = document.querySelector('.scroll-progress span');
const glow = document.querySelector('.cursor-glow');
const reveals = document.querySelectorAll('.reveal');

const savedTheme = localStorage.getItem('resume-theme');
if (savedTheme) {
    root.dataset.theme = savedTheme;
}

themeButton?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem('resume-theme', nextTheme);
});

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progress.style.width = `${percent}%`;
});

window.addEventListener('pointermove', (event) => {
    if (!glow) return;
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.14
});

reveals.forEach((item) => observer.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
