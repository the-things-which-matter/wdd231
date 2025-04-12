
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


document.addEventListener('DOMContentLoaded', () => {
  showLastVisitMessage();
  loadMemberCards();
});


function showLastVisitMessage() {
  const sidebar = document.getElementById('sidebar');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let message = '';
  if (lastVisit) {
      const daysElapsed = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
      message = daysElapsed === 0
          ? '👋 Welcome back! You last visited today.'
          : `👋 Welcome back! It's been ${daysElapsed} day${daysElapsed > 1 ? 's' : ''} since your last visit.`;
  } else {
      message = '👋 Welcome! This is your first visit.';
  }

  sidebar.innerHTML = `<p>${message}</p>`;
  localStorage.setItem('lastVisit', now.toString());
}


async function loadMemberCards() {
  const loading = document.getElementById('loading-message');
  const container = document.getElementById('cards-container');

  try {
      console.log('Attempting to fetch: chamber/discover.json');

     
      const response = await fetch('chamber/discover.json'); 

   
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

    
      const data = await response.json();
      console.log('Loaded data:', data);

     
      if (data.locations && Array.isArray(data.locations)) {
          displayMemberCards(data.locations, container);
      } else {
          console.error('No locations found in the JSON data or invalid data structure');
          container.innerHTML = `<p class="error">❌ No data available for member cards.</p>`;
      }
  } catch (error) {
      console.error('Error fetching member data:', error);
      container.innerHTML = `<p class="error">❌ Unable to load member data. Check console for details.</p>`;
  } finally {
   
      loading.style.display = 'none';
  }
}


function displayMemberCards(locations, container) {
  locations.forEach(location => {
      const { name, address, description, image } = location; 

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
          <img src="${image}" alt="${name}" loading="lazy">
          <h2>${name}</h2>
          <p>${address}</p>
          <p>${description}</p>
      `;

      container.appendChild(card);
  });
}