const logOut = document.getElementById('log-out-button')
const cancelLogout = document.getElementById('cancel-logout')
const requestLogout = document.getElementById('request-logout')
const areYouSurePartial = document.getElementById('areyousure-partial')

requestLogout.addEventListener('click', () => {
  popup.style.display = "flex"
  areYouSurePartial.style.display = "flex"
})


logOut.addEventListener('click', () => {
  fetch("/users/logout", {
    method: "POST",
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

cancelLogout.addEventListener('click', () => {
  popup.style.display = "none";
  areYouSurePartial.style.display = "none";
})
