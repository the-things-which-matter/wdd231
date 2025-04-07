document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("timestamp").value = new Date().toISOString();

    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-modal');
        document.getElementById(target).style.display = 'block';
      });
    });

    document.querySelectorAll('.close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
      });
    });

    window.onclick = function (event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    }
  });
