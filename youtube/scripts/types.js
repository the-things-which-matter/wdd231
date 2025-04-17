document.addEventListener('DOMContentLoaded', () => {
    // Last modified
    const lastModified = document.getElementById('last-modified');
    if (lastModified) lastModified.textContent = document.lastModified;

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-button');
    const menu = document.getElementById('menu-items');
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Dark mode toggle
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // ✅ Load YouTube content niches
    fetch('content/types.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const section = document.getElementById('content-niches');
            if (!section) return;

            data.forEach(niche => {
                const card = document.createElement('div');
                card.className = 'niche-card';

                card.innerHTML = `
                    <img src="${niche.logo}" alt="${niche.name} logo" width="100">
                    <h3>${niche.name}</h3>
                    <p>${niche.description}</p>
                    <a href="https://the-things-which-matter.github.io/wdd230/youtube/form.html" class="learn-more-btn">Learn More</a>
                `;

                section.appendChild(card);
            });
        })
        .catch(error => console.error('Failed to load content types:', error));
});