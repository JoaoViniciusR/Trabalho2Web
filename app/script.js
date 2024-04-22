function resetForm() {
    document.getElementById("myForm").reset();
    document.getElementById("error-message").innerText = "";
  }
  
  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var terms = document.getElementById("terms").checked;
  
    if (name === "" || email === "" || age === "" || gender === "" || !terms) {
      document.getElementById("error-message").innerText = "Por favor, preencha todos os campos e aceite os termos.";
    } else {
      // Aqui você pode adicionar a lógica para salvar os dados do formulário
      alert("Formulário enviado com sucesso!");
      resetForm();
    }
  });
  