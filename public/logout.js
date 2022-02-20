const logOut = document.getElementById('log-out-button')

logOut.addEventListener('click', () => {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00: 00: 00 UTC"
  location.reload()
})
