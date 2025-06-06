const formLogin = document.getElementById("signInForm");

formLogin.addEventListener("submit", (form) => {
    form.preventDefault();
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    fetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            email: emailField.value,
            password: passwordField.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include' // Importante para incluir cookies
    })
    .then(async (response) => {
        if (response.ok) {
            const data = await response.json();
            // Armazena o userId no localStorage para uso no frontend
            localStorage.setItem("currentUserId", data.user.id);
            window.location.href = "/home";
        } else {
            const data = await response.json();
            message.innerText = data.error || "Erro ao fazer login";
        }
    })
    .catch((error) => {
        console.error("Erro na requisição:", error);
        message.innerText = "Erro inesperado. Tente novamente.";
    });
});
