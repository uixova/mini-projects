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

function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  lightbox.style.display = 'block';
  lightboxImg.src = element.src;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  showSection('home');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('lightbox').style.display === 'block') {
      closeLightbox();
    }
  });
});

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  let isValid = true;

  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  if (isValid) {
    form.reset();

    let message = '';
    if (form.classList.contains('reservation-form')) {
      message = 'Rezervasyon talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.';
    } else if (form.classList.contains('contact-form')) {
      message = 'Mesajınız başarıyla gönderildi. Teşekkür ederiz!';
    }

    alert(message);

    if (form.classList.contains('reservation-form')) {
    }

  } else {
    alert("Lütfen zorunlu alanları (*) eksiksiz doldurunuz!");
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const resForm = document.querySelector('.reservation-form');
  const contactForm = document.querySelector('.contact-form');

  if (resForm) {
    resForm.addEventListener('submit', handleFormSubmit);
  }
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});