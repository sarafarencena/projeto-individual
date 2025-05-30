const formLogin = document.getElementById("signInForm")

console.log(formLogin)

formLogin.addEventListener("submit", (form) => {
    form.preventDefault()

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")

    console.log(emailField.value)
    console.log(passwordField.value)
    fetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            email: emailField.value,
            password: passwordField.value
        }),
        headers: {
            "Content-Type": "application/json" // avisa que está enviando json
        }
    }).then((response) => {
        console.log("response")
    }).catch((reject) => {      
        console.log("deu erro")
    })

    console.log("passou tudo")
})