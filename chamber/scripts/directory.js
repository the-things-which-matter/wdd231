document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }
    
    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" width="100">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.level)}</p>
            `;
            
            membersContainer.appendChild(card);
        });
    }
    
    function getMembershipLevel(level) {
        switch (level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            default: return "Member";
        }
    }
    
    gridViewBtn.addEventListener("click", () => {
        membersContainer.classList.remove("list");
        membersContainer.classList.add("grid");
    });
    
    listViewBtn.addEventListener("click", () => {
        membersContainer.classList.remove("grid");
        membersContainer.classList.add("list");
    });
    
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
    
    fetchMembers();
});