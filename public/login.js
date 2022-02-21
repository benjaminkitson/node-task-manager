const loginForm = document.getElementById('login-form')
const errors = document.querySelector('.login-errors')
const greeting = document.getElementById('greeting')
let tasks


loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.querySelector('.email').value
  const password = loginForm.querySelector('.password').value
  fetch("/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        return errors.innerHTML = "Invalid login details"
      }

      greeting.innerHTML = `Hello ${data.user.name}`
      loginPopup.style.display = "none"
      document.cookie = `taskToken=${data.token}`
      fetch("/tasks", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `${data.token}`
      }
      })
        .then(response => response.json())
        .then(data => console.log(data))
    })
})
