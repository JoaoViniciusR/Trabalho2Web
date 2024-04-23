function validateLogin() {
    window.location.replace("index.html");
  }
  const form = document.querySelector('.form_container');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateLogin();
    window.location.href = "index.html";
  }
);