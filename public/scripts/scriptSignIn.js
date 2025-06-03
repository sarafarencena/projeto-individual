const formLogin = document.getElementById("signInForm");

console.log(formLogin);

formLogin.addEventListener("submit", (form) => {
  form.preventDefault();

  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  console.log(emailField.value);
  console.log(passwordField.value);
  fetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      email: emailField.value,
      password: passwordField.value,
    }),
    headers: {
      "Content-Type": "application/json", // warns when is sending json
    },
  })
    .then(async (response) => {
      if (response.ok) {
        // Successful login: redirects to home
        window.location.href = "/home";
      } else {
        // Login failed: shows eror message
        const data = await response.json();
        message.innerText = data.error || "Erro ao fazer login";
      }
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      message.innerText = "Erro inesperado. Tente novamente.";
    });
});
