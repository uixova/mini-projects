const track = document.querySelector('.activity-track');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const items = document.querySelectorAll('.activity-item');

let index = 0;

function visibleItemsCount() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
}

function updateTrack() {
    const visible = visibleItemsCount();
    const itemWidth = items[0].getBoundingClientRect().width + 15; 
    if (index > items.length - visible) index = 0;
    if (index < 0) index = items.length - visible;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

next.addEventListener('click', () => {
    index++;
    updateTrack();
});

prev.addEventListener('click', () => {
    index--;
    updateTrack();
});

window.addEventListener('resize', updateTrack);

window.addEventListener('load', updateTrack);

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = 'block';
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  const clickedLink = document.querySelector(`.nav-links a[onclick*="${sectionId}"]`);
  if (clickedLink) {
    clickedLink.classList.add('active');
  }
}

function goHome() {
  showSection('home');
}

const hamburgerToggle = document.getElementById('hamburger-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu(forceClose = false) {
    const isOpen = mobileMenu.classList.contains('active');
    const shouldOpen = forceClose ? false : !isOpen;

    mobileMenu.classList.toggle('active', shouldOpen);

    const icon = hamburgerToggle.querySelector('i');
    if (shouldOpen) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x'); // Menü açıkken X ikonu
    } else {
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list'); // Menü kapalıyken hamburger
    }
}

hamburgerToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', (e) => {
    const clickedInside = mobileMenu.contains(e.target) || hamburgerToggle.contains(e.target);
    if (!clickedInside && mobileMenu.classList.contains('active')) {
        toggleMenu(true);
    }
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});
