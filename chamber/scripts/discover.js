document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const container = document.querySelector("#cards-container");
const sidebar = document.querySelector("#sidebar");


fetch("data/discover.json")
  .then((response) => response.json())
  .then((data) => {
    data.locations.forEach((location) => {
      const card = document.createElement("section");
      card.classList.add("location-card");

      const h2 = document.createElement("h2");
      h2.textContent = location.name;

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = location.image;
      img.alt = location.name;
      img.width = 300;
      img.height = 200;
      figure.appendChild(img);

      const address = document.createElement("address");
      address.textContent = location.address;

      const desc = document.createElement("p");
      desc.textContent = location.description;

      const button = document.createElement("a");
      button.href = location.link;
      button.textContent = "Learn More";
      button.classList.add("learn-btn");

      card.append(h2, figure, address, desc, button);
      container.appendChild(card);
    });
  });


const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const diff = today - Number(lastVisit);
  const days = Math.floor(diff / MILLISECONDS_IN_DAY);

  if (days < 1) {
    message = "Back so soon! Awesome!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

sidebar.textContent = message;
localStorage.setItem("lastVisit", today);
