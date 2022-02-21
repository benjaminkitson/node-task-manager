const signUpHere = document.getElementById("sign-up-here")
const signupPartial = document.getElementById("signup-partial")
const signupForm = document.getElementById("signup-form")

signUpHere.addEventListener("click", () => {
  loginPartial.style.display = "none"
  signupPartial.style.display = "flex"
})

signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = signupForm.querySelector('.name').value
  const email = signupForm.querySelector('.email').value
  const password = signupForm.querySelector('.password').value
  const data = JSON.stringify({name, email, password})
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: data
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      return errors.innerHTML = "Invalid login details"
    }

    greeting.innerHTML = `Hello ${data.user.name}`
    popup.style.display = "none"
    signupPartial.style.display = "none"
    document.cookie = `taskToken=${data.token}`
  })
})
