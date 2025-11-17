/**
 * Belirtilen bölümü gösterir ve diğer tüm bölümleri gizler.
 * Ayrıca navigasyon linklerinin aktif/pasif durumunu yönetir.
 * @param {string} sectionId - Gösterilecek bölümün ID'si ('home', 'menu', vs.).
 */
function showSection(sectionId) {
  // 1. Tüm ana bölümleri gizle
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // 2. İstenen bölümü göster
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = 'block';
  }

  // 3. Navigasyon linklerinin "active" durumunu güncelle (CSS ile uyum için)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  // Tıklanan linke "active" sınıfını ekle
  const clickedLink = document.querySelector(`.nav-links a[onclick*="${sectionId}"]`);
  if (clickedLink) {
    clickedLink.classList.add('active');
  }
}

/**
 * Anasayfa'ya yönlendirir. (HTML'de logo tıklaması için kullanılır)
 */
function goHome() {
  showSection('home');
}

/**
 * Galeri görselini Lightbox içinde açar.
 * @param {HTMLElement} element - Tıklanan görsel elementi.
 */
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  lightbox.style.display = 'block';
  lightboxImg.src = element.src;
  // Lightbox açıkken ana sayfanın kaydırılmasını engelle (daha iyi UX)
  document.body.style.overflow = 'hidden';
}

/**
 * Lightbox'ı kapatır.
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  // Sayfa kaydırmayı geri aç
  document.body.style.overflow = 'auto';
}

// ---------------- Başlangıç ve Olay Dinleyicileri ----------------

// Sayfa yüklendiğinde çalışacak kısım:
document.addEventListener('DOMContentLoaded', () => {
  // 1. Varsayılan olarak Anasayfayı göster ve nav linkini aktif yap
  showSection('home');

  // 2. Lightbox'ın kapatılması için klavye ESC tuşunu dinle
  document.addEventListener('keydown', (e) => {
    // Eğer basılan tuş 'Escape' ise VE lightbox görünür durumdaysa kapat
    if (e.key === 'Escape' && document.getElementById('lightbox').style.display === 'block') {
      closeLightbox();
    }
  });
});

// Rezervasyon ve İletişim formlarının gönderimini yöneten genel fonksiyon
function handleFormSubmit(event) {
  event.preventDefault(); // Formun varsayılan gönderimini (sayfa yenilemeyi) durdur

  const form = event.target;
  let isValid = true; // Basit validasyon bayrağı

  // Zorunlu alanların boş olup olmadığını kontrol et
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  if (isValid) {
    // Form verilerini sıfırla (gönderilmiş gibi yapmak için)
    form.reset();

    // Başarılı mesajı göster
    let message = '';
    if (form.classList.contains('reservation-form')) {
      message = 'Rezervasyon talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.';
    } else if (form.classList.contains('contact-form')) {
      message = 'Mesajınız başarıyla gönderildi. Teşekkür ederiz!';
    }

    alert(message);

    // Opsiyonel: Rezervasyon sonrası Anasayfaya dön
    if (form.classList.contains('reservation-form')) {
      // showSection('home'); // İstenirse formu gönderdikten sonra Anasayfaya dönebilir.
    }

  } else {
    alert("Lütfen zorunlu alanları (*) eksiksiz doldurunuz!");
  }
}

// Olay Dinleyicileri (DOMContentLoaded içinde güncelleme)
document.addEventListener('DOMContentLoaded', () => {
  // ... (Mevcut kodlar) ...

  // Yeni eklenen kısım: Form gönderim olaylarını dinle
  const resForm = document.querySelector('.reservation-form');
  const contactForm = document.querySelector('.contact-form');

  if (resForm) {
    resForm.addEventListener('submit', handleFormSubmit);
  }
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});