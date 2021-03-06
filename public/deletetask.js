function deleteLocalTask(task, id) {
  const index = tasks.findIndex((task) => {
    return task._id === id
  })
  tasks.splice(index, 1)
}

myTasks.addEventListener("click", (e) => {
  let task
  let taskId
  if (e.target.classList.contains("delete")) {
    task = e.target.parentNode.parentNode
    taskId = e.target.parentNode.parentNode.dataset.id
  fetch(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    task.remove()
    deleteLocalTask(task, taskId)
  })
}
})
