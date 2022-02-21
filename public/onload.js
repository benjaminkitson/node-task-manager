const loginPopup = document.getElementById('popup')

function parseCookies() {
  const cookiePairs = document.cookie.split(';')
  const cookies = cookiePairs.map((pair) => {
    const trimmed = pair.trim()
    const pairArr = trimmed.split('=')
    const key = pairArr[0]
    const value = pairArr[1]
    return { [key]: value }
  })
  return cookies
}

function getToken() {
  try {
    return parseCookies().find(cookie => cookie["taskToken"])["taskToken"]
  } catch (e) {
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
    .then((user) => {
      if (user.error) {
        console.log("Le fail")
        return loginPopup.style.display = "flex"
      }
      loginPopup.style.display = "none"
      greeting.innerHTML = `Hello ${user.name}`
    })
}

isLoggedIn()
