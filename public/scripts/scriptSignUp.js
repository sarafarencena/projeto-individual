const formSignup = document.getElementById("signUpForm");
const message = document.getElementById("message");

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
    });

    if (response.ok) {
      window.location.href = "/home"; // Redirects after succeed
    } else {
      const result = await response.json();
      message.textContent =
        "Erro ao cadastrar: " +
        (result.error || "Verifique os dados informados.");
      message.style.color = "red";
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    message.textContent = "Erro de rede. Tente novamente mais tarde.";
    message.style.color = "red";
  }
});
