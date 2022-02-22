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
  if (task.completed) newTask.classList.add("class", "done-task")
  newTask.setAttribute("data-id", task._id)
  newTask.setAttribute("data-completed", task.completed)


  const content = document.createTextNode(task.title)
  const buttons = document.createElement("div")
  buttons.setAttribute("class", "buttons")

  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "delete")
  const deleteButtonText = document.createTextNode("Delete")
  deleteButton.appendChild(deleteButtonText)

  const doneButton = document.createElement("button")
  console.log(task.completed)
  doneButton.setAttribute("class", task.completed ? "done" : "mark-as-done")
  const doneButtonText = document.createTextNode(task.completed ? "Done" : "Mark as done")
  doneButton.appendChild(doneButtonText)

  buttons.appendChild(doneButton)
  buttons.appendChild(deleteButton)
  newTask.appendChild(content)
  newTask.appendChild(buttons)
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
      greeting.innerHTML = `Hi ${data.user.name}!`
      tasks = data.tasks
      console.log(tasks)
      renderTasks(tasks)
    })
}

isLoggedIn()
