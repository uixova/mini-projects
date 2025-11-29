document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});

/**
 * 
 * @param {Event} event 
 */
function handleFormSubmission(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    form.reset();

    showSuccessAlert("Mesajınız başarıyla iletildi!");
}

/**
 * 
 * @param {string} message 
 */
function showSuccessAlert(message) {
    const alertElement = document.getElementById('success-alert');
    const messageElement = alertElement.querySelector('.alert-message');
    if (messageElement) {
        messageElement.textContent = message;
    }

    alertElement.classList.remove('hidden');
    setTimeout(() => {
        alertElement.classList.add('visible');
    }, 10); 
    setTimeout(() => {
        alertElement.classList.remove('visible');
        setTimeout(() => {
            alertElement.classList.add('hidden');
        }, 300); 
        
    }, 2000);
}