const addTask = document.getElementById('add-task-button')
const cancelTask = document.getElementById('cancel-task')
const taskPartial = document.getElementById('newtask-partial')
const createTaskForm = document.getElementById('newtask-form')

addTask.addEventListener('click', () => {
  popup.style.display = "flex";
  taskPartial.style.display = "flex"
})

createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = createTaskForm.querySelector('.title').value
  const data = JSON.stringify({ title })
  fetch("/tasks", {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `${getToken()}`
    },
    body: data
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return errors.innerHTML = "Task creation failed"
      }
      popup.style.display = "none";
      taskPartial.style.display = "none";
      createTaskForm.querySelector('.title').value = ''
      tasks.push(data)
      renderTasks(tasks)
    })
})

cancelTask.addEventListener('click', () => {
  popup.style.display = "none";
  taskPartial.style.display = "none";
  createTaskForm.querySelector('.title').value = ''
  title = ''
})
