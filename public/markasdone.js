myTasks.addEventListener("click", (e) => {
  let task
  let taskId
  if (e.target.classList.contains("mark-as-done") || e.target.classList.contains("done")) {
    task = e.target.parentNode.parentNode
    taskId = e.target.parentNode.parentNode.dataset.id
    const value = (e.target.parentNode.parentNode.dataset.completed === "true")
    console.log(task)

    fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "completed": JSON.stringify(!value)
      })
    })
      .then(response => response.json())
      .then(data => {
        const newValue = JSON.stringify(!value)
        task.setAttribute("data-completed", newValue)
        console.log(value)
        if (!value) {
          e.target.classList.replace("mark-as-done", "done")
          e.target.innerHTML = "Done"
          task.classList.add("done-task")
        } else {
          e.target.classList.replace("done", "mark-as-done")
          e.target.innerHTML = "Mark as done"
          task.classList.remove("done-task")
        }
      })

  }
})

// Task is marked as true in the database, need to reflect in DOM
