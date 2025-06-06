document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("signInForm");
    const message = document.getElementById("message");

    if (formLogin) {
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
                credentials: 'include' 
            })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("currentUserId", data.user.id);
                    window.location.href = "/home";
                } else {
                    const data = await response.json();
                    if (message) {
                        message.innerText = data.error || "Erro ao fazer login";
                        message.style.color = "red";
                    } else {
                        console.error("Elemento de mensagem não encontrado");
                        alert(data.error || "Erro ao fazer login");
                    }
                }
            })
            .catch((error) => {
                console.error("Erro na requisição:", error);
                if (message) {
                    message.innerText = "Erro inesperado. Tente novamente.";
                    message.style.color = "red";
                } else {
                    alert("Erro inesperado. Tente novamente.");
                }
            });
        });
    } else {
        console.error("Formulário de login não encontrado!");
    }
});
