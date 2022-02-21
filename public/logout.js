const logOut = document.getElementById('log-out-button')

logOut.addEventListener('click', () => {
  document.cookie = "taskToken=; Expires=Fri, 1 Jan 2000 00:00:00 GMT; path=/"
  location.reload()
})
