const loginForm = document.getElementById('login-form')

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
      if (data.error) return console.log("Invalid details")

      console.log(data)
      document.cookie = `token=${data.token}`
      fetch("/users/me", {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `${data.token}`
      }
      })
        .then(response => response.json())
        .then(data => console.log(data))
    })
})
