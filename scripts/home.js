
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll("nav ul li a").forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}


document.getElementById("wdd-courses").addEventListener("click", () => {
    filterCourses("wdd");
});
document.getElementById("cse-courses").addEventListener("click", () => {
    filterCourses("cse");
});
document.getElementById("all-courses").addEventListener("click", () => {
    filterCourses("all");
});


const allCourses = [
    { name: "CSE 110", category: "cse" },
    { name: "WDD 130", category: "wdd" },
    { name: "CSE 111", category: "cse" },
    { name: "CSE 210", category: "cse" },
    { name: "WDD 131", category: "wdd" },
    { name: "WDD 231", category: "wdd" }
];


function filterCourses(filter) {
    let filteredCourses = filter === "all" ? allCourses : allCourses.filter(course => course.category === filter);
    displayCourses(filteredCourses);
}


function displayCourses(courses) {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = ""; 
    const ul = document.createElement("ul");

    courses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course.name;
        ul.appendChild(li);
    });

    coursesList.appendChild(ul);
}


document.addEventListener("DOMContentLoaded", () => {
    displayCourses(allCourses);
});