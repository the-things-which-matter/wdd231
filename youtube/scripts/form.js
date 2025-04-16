
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


const passwordMessage = document.createElement('p');
passwordMessage.style.color = 'red';
passwordMessage.style.fontSize = '0.9rem';
passwordMessage.style.display = 'none'; 

const form = document.getElementById('membership-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', (e) => {
   
    if (password.value !== confirmPassword.value) {
        e.preventDefault();

       
        passwordMessage.textContent = 'Passwords do not match. Please try again.';
        form.insertBefore(passwordMessage, confirmPassword.nextSibling);
        passwordMessage.style.display = 'block'; 

      
        password.style.borderColor = 'red';
        confirmPassword.style.borderColor = 'red';
    } else {
        passwordMessage.style.display = 'none'; 
        password.style.borderColor = '#ccc'; 
        confirmPassword.style.borderColor = '#ccc'; 
    }
});


const rating = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

rating.addEventListener('input', () => {
  
    ratingValue.textContent = rating.value;
});


const timestampField = document.getElementById('timestamp');
timestampField.value = new Date().toISOString();