const loginPopup = document.getElementById('popup')
const myTasks = document.getElementById('tasks')
let tasks = []

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

function taskBuilder(task) {
  const newTask = document.createElement("div")
  newTask.setAttribute("class", "task")
  const content = document.createTextNode(task.title)
  const buttons = document.createElement("div")
  const deleteButton = document.createElement("button")
  newTask.appendChild(content)
  return newTask
}

function renderTasks(tasks) {
  myTasks.innerHTML = ''
  tasks.forEach((task) => {
    myTasks.insertAdjacentElement("beforeEnd", taskBuilder(task))
  })
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
      if (data.error) {
        console.log("Le fail")
        return loginPopup.style.display = "flex"
      }
      popup.style.display = "none"
      loginPartial.style.display = "none"
      greeting.innerHTML = `Hello ${data.user.name}`
      tasks = data.tasks
      renderTasks(tasks)
    })
}

isLoggedIn()
