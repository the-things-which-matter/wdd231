document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  
    document.getElementById("menu-toggle").addEventListener("click", () => {
      const menu = document.getElementById("menu");
      menu.classList.toggle("hidden");
    });
  
    const cardsContainer = document.getElementById("cards-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const loadingMessage = document.getElementById("loading-message");
  
  
    fetch("data/discover.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        loadingMessage.style.display = "none";
        data.locations.forEach((location) => {
          const card = document.createElement("section");
          card.classList.add("card");
  
          const img = document.createElement("img");
          img.src = location.image;
          img.alt = `${location.name}`;
          img.loading = "lazy";
  
          const name = document.createElement("h2");
          name.textContent = location.name;
  
          const address = document.createElement("p");
          address.textContent = location.address;
  
          const description = document.createElement("p");
          description.textContent = location.description;
  
          const button = document.createElement("button");
          button.textContent = "Learn More";
          button.addEventListener("click", () => {
            alert(`${location.name} - located at ${location.address}`);
          });
  
          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(address);
          card.appendChild(description);
          card.appendChild(button);
  
          cardsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        loadingMessage.textContent = "Failed to load locations.";
      });
  

    gridViewBtn.addEventListener("click", () => {
      cardsContainer.classList.add("grid-view");
      cardsContainer.classList.remove("list-view");
    });
  
    listViewBtn.addEventListener("click", () => {
      cardsContainer.classList.add("list-view");
      cardsContainer.classList.remove("grid-view");
    });
  
   
    const visitDisplay = document.createElement("p");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (lastVisit) {
      const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      visitDisplay.textContent = `It's been ${daysDiff} day(s) since your last visit.`;
    } else {
      visitDisplay.textContent = "This is your first visit!";
    }
  
    document.querySelector("main").prepend(visitDisplay);
    localStorage.setItem("lastVisit", now);
  });