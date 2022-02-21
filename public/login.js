const loginForm = document.getElementById('login-form')
const errors = document.getElementById('login-errors')
const greeting = document.getElementById('greeting')
const popup = document.getElementById('popup')
const loginPartial = document.getElementById('login-partial')


loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.querySelector('.email').value
  const password = loginForm.querySelector('.password').value
  const data = JSON.stringify({email, password})
  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: data
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        return errors.innerHTML = "Invalid login details"
      }

      greeting.innerHTML = `Hi ${data.user.name}!`
      popup.style.display = "none"
      loginPartial.style.display = "none"

      document.cookie = `taskToken=${data.token}`
      fetch("/tasks", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `${data.token}`
      }
      })
        .then(response => response.json())
        .then(data => renderTasks(data.tasks))
    })
})
