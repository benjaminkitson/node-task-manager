const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  name:
  {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Not a valid email")
    }
  },
  password:
  {
    type: String,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.includes('password')) throw new Error("It can't include 'password'.")
    }
  }
})

module.exports = User
