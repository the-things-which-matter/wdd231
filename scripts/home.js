// Dynamic year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Navigation link active state
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll("nav ul li a").forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Course filtering (add the filter buttons functionality)
document.getElementById("wdd-courses").addEventListener("click", () => {
    filterCourses("wdd");
});
document.getElementById("cse-courses").addEventListener("click", () => {
    filterCourses("cse");
});
document.getElementById("all-courses").addEventListener("click", () => {
    filterCourses("all");
});

// Sample filter function (You can replace with actual course data)
function filterCourses(filter) {
    const allCourses = [
        { name: "WDD 101", category: "wdd" },
        { name: "CSE 102", category: "cse" },
        { name: "WDD 201", category: "wdd" },
        { name: "CSE 201", category: "cse" },
    ];

    let filteredCourses;
    if (filter === "all") {
        filteredCourses = allCourses;
    } else {
        filteredCourses = allCourses.filter(course => course.category === filter);
    }

    displayCourses(filteredCourses);
}

// Display the filtered courses
function displayCourses(courses) {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = ""; // Clear existing courses
    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("card");
        courseDiv.textContent = course.name;
        coursesList.appendChild(courseDiv);
    });
}