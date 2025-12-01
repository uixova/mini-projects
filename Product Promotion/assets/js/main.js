document.addEventListener('DOMContentLoaded', () => {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true' || false;
        hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        const icon = hamburgerToggle.querySelector('i');
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
    };

    hamburgerToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.closest('.faq-item');
            
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                }
            });

            parentItem.classList.toggle('active');
        });
    });

    const requestForm = document.querySelector('.request-form');

    requestForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        if (name === "" || email === "") {
            alert("Lütfen adınızı ve e-posta adresinizi doldurunuz.");
            return;
        }

        alert(`Teşekkürler, ${name}! Ön talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.`);
        requestForm.reset();
    });
});