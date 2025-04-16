document.addEventListener('DOMContentLoaded', () => {
    // Update last modified
    const lastModified = document.getElementById('last-modified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-button');
    const menu = document.getElementById('menu-items');
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // ✅ Load testimonials
    fetch('content/testimony.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('testimonial-cards');
            if (!container) return;

            data.forEach(testimonial => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';

                card.innerHTML = `
                    <p class="comment">"${testimonial.comment}"</p>
                    <p class="author">– ${testimonial.name}, <span class="location">${testimonial.location}</span></p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Failed to load testimonials:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById('last-modified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }

    // Dark mode toggle (optional if you're implementing this)
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-button');
    const menu = document.getElementById('menu-items');
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});