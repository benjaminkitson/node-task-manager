const signUpHere = document.getElementById("sign-up-here")
const signupPartial = document.getElementById("signup-partial")
const loginPartial = document.getElementById("login-partial")

signUpHere.addEventListener("click", function() {
  loginPartial.style.display = "none"
  signupPartial.style.display = "flex"
})
