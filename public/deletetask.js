myTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const taskTitle = e.target.parentNode.parentNode.dataset.id
    console.log(taskTitle)
  }
})
