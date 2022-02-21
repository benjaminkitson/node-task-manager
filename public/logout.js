const logOut = document.getElementById('log-out-button')

logOut.addEventListener('click', () => {
  fetch("/users/logout", {
    method: "post",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    document.cookie = "taskToken=; Expires=Fri, 1 Jan 2000 00:00:00 GMT; path=/"
    location.reload()
  })
})
