document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");

    // Update footer info
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" width="100">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${getMembershipLevel(member.membership)}</p>
            `;
            membersContainer.appendChild(memberCard);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 3: return "Gold";
            case 2: return "Silver";
            case 1: return "Member";
            default: return "Unknown";
        }
    }

    gridViewButton.addEventListener("click", () => {
        membersContainer.classList.remove("list");
        membersContainer.classList.add("grid");
    });

    listViewButton.addEventListener("click", () => {
        membersContainer.classList.remove("grid");
        membersContainer.classList.add("list");
    });

    fetchMembers();
});