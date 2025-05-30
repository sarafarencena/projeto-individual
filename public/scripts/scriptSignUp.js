const formSignup = document.getElementById("signUpForm")

console.log(formSignup)

formSignup.addEventListener("submit", (form) => {
    form.preventDefault()

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")
    const nameField = document.getElementById("name")
    const classField = document.getElementById("class")
    const courseField = document.getElementById("course")
    const groupField = document.getElementById("group")

    console.log(emailField.value)
    console.log(passwordField.value)
    console.log(nameField.value)
    console.log(classField.value)
    console.log(courseField.value)
    console.log(groupField.value)
    
    fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            email: emailField.value,
            password: passwordField.value,
            name: nameField.value,
            class: classField.value,
            course: courseField.value,
            group: groupField.value
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