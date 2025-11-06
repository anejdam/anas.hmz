const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav ul');
const cursor = document.querySelector('.custom-cursor');
const animatedElements = document.querySelectorAll('[data-animate]');
const currentYear = document.getElementById('current-year');

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('open');
        });
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

animatedElements.forEach((el) => observer.observe(el));

document.addEventListener('mousemove', (event) => {
    if (!cursor) return;
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor?.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor?.classList.remove('active');
    });
});

let hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (event) => {
        const strength = 15;
        const x = (event.clientX / window.innerWidth - 0.5) * strength;
        const y = (event.clientY / window.innerHeight - 0.5) * strength;
        hero.style.setProperty('--hero-tilt-x', `${x}px`);
        hero.style.setProperty('--hero-tilt-y', `${y}px`);
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > 40) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});
