myTasks.addEventListener("click", (e) => {
  let task
  let taskId
  if (e.target.classList.contains("mark-as-done")) {
    task = e.target.parentNode.parentNode
    taskId = e.target.parentNode.parentNode.dataset.id
    fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "completed": true
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }
})

// Task is marked as true in the database, need to reflect in DOM
