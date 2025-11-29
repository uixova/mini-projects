document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
});

/**
 * 
 * @returns {number | null} 
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id ? parseInt(id) : null;
}

async function loadBlogPost() {
    const postId = getPostIdFromUrl();

    if (!postId) {
        displayError('Aranan blog yazısı ID\'si bulunamadı. Lütfen blog sayfasına geri dönün.', 'Geçersiz İstek');
        return;
    }

    try {
        const response = await fetch('assets/data/posts.json');
        if (!response.ok) {
            throw new Error('Blog gönderileri JSON dosyası yüklenemedi.');
        }
        const posts = await response.json();
        const post = posts.find(p => p.id === postId);

        if (post) {
            renderPostContent(post);
        } else {
            displayError('Aranan blog yazısı veri tabanında bulunamadı.', 'Yazı Bulunamadı');
        }

    } catch (error) {
        console.error('Hata:', error);
        displayError('İçerik yüklenirken bir hata oluştu.', 'Sistem Hatası');
    }
}

/**
 * 
 * @param {Object} post 
 */
function renderPostContent(post) {
    document.getElementById('page-title').textContent = `${post.title} - Ayşe Karaca Blog`;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = post.date;
    
    const postImage = document.getElementById('post-image');
    postImage.src = post.image;
    postImage.alt = post.title;
    postImage.style.display = 'block'; 

    const postBody = document.getElementById('post-body');
    postBody.innerHTML = ''; 

    post.content.forEach(paragraph => {
        const p = document.createElement('p');
        p.innerHTML = paragraph; 
        postBody.appendChild(p);
    });
}

/** 
 * 
 * @param {string} message 
 * @param {string} title 
 */
function displayError(message, title) {
    document.getElementById('page-title').textContent = `${title} - Hata`;
    document.getElementById('post-title').textContent = title;
    document.getElementById('post-date').textContent = '';
    
    const postBody = document.getElementById('post-body');
    postBody.innerHTML = `<p style="color: #ff6b6b; text-align: center; font-size: 1.2em; margin-top: 50px;">${message}</p><p style="text-align: center;"><a href="blog.html" style="color: #3498DB;">Blog Listesine Geri Dön</a></p>`;

    const postImage = document.getElementById('post-image');
    postImage.style.display = 'none';
    postImage.src = '';
}