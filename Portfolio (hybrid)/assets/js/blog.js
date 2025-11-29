let allBlogPosts = []; 

document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-posts-container');
    const searchInput = document.getElementById('search-input');

    if (blogContainer) {
        fetchBlogPosts();

        if (searchInput) {
            searchInput.addEventListener('keyup', handleSearch);
        }
    }
});

async function fetchBlogPosts() {
    try {
        const response = await fetch('assets/data/posts.json');
        if (!response.ok) {
            throw new Error('Blog gönderileri yüklenemedi.');
        }
        allBlogPosts = await response.json(); 
        renderBlogPosts(allBlogPosts); 
    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('blog-posts-container').innerHTML = 
            '<p style="text-align: center;">Blog içerikleri yüklenirken bir hata oluştu.</p>';
    }
}

function renderBlogPosts(posts) {
    const container = document.getElementById('blog-posts-container');
    const noResults = document.getElementById('no-results');
    container.innerHTML = ''; 

    if (posts.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noResults.style.display = 'none';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('blog-card');
        card.addEventListener('click', () => {
            window.location.href = `blog-page.html?id=${post.id}`;
        });

        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <span>Yayınlanma Tarihi: ${post.date}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredPosts = allBlogPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
        return titleMatch || excerptMatch;
    });
    renderBlogPosts(filteredPosts);
}
