const loginForm = document.getElementById('login-form')
const errors = document.querySelector('.login-errors')
let tasks

document.cookie="test=2"

function parseCookies() {
  const cookiePairs = document.cookie.split(';')
  const cookies = cookiePairs.map((pair) => {
    const trimmed = pair.trim()
    const pairArr = trimmed.split('=')
    const key = pairArr[0]
    const value = pairArr[1]
    return { [key] : value }
  })
  return cookies
}

function getToken() {
  try {
    return parseCookies().find(cookie => cookie["taskToken"])["taskToken"]
  } catch(e) {
    return ""
  }
}

getToken()

function isLoggedIn() {
  fetch("/tasks", {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": `${getToken()}`
    }
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) return console.log("No user logged in.")

      errors.innerHTML = "Cookie monster"
    })
}

isLoggedIn()



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

      errors.innerHTML = "Hello!"
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
