document.addEventListener("DOMContentLoaded", function() {
  const formSignup = document.getElementById("signUpForm");
  const message = document.getElementById("message");

  if (formSignup) {
    formSignup.addEventListener("submit", async (form) => {
      form.preventDefault();

      const emailField = document.getElementById("email");
      const passwordField = document.getElementById("password");
      const nameField = document.getElementById("name");
      const classField = document.getElementById("class");
      const courseField = document.getElementById("course");
      const groupField = document.getElementById("group");

      try {
        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: emailField.value,
            password: passwordField.value,
            name: nameField.value,
            class: classField.value,
            course: courseField.value,
            group: groupField.value,
          }),
          headers: {
            "Content-Type": "application/json", // warns when is sending json
          },
          credentials: 'include' 
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("currentUserId", data.user.id);
          window.location.href = "/home"; // Redirects after succeed
        } else {
          const result = await response.json();
          if (message) {
            message.textContent =
              "Erro ao cadastrar: " +
              (result.error || "Verifique os dados informados.");
            message.style.color = "red";
          } else {
            console.error("Elemento de mensagem não encontrado");
            alert("Erro ao cadastrar: " + (result.error || "Verifique os dados informados."));
          }
        }
      } catch (error) {
        console.error("Erro de rede:", error);
        if (message) {
          message.textContent = "Erro de rede. Tente novamente mais tarde.";
          message.style.color = "red";
        } else {
          alert("Erro de rede. Tente novamente mais tarde.");
        }
      }
    });
  } else {
    console.error("Formulário de cadastro não encontrado!");
  }
});
