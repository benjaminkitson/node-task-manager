const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
    unique: true,
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
  },
  tokens: [{
    token:{
      type: String,
      required: true
    }
  }]
});


userSchema.methods.generateAuthToken = function() {
  const tokenPromise = new Promise((resolve, reject) => {
    const token = jwt.sign({_id: this.id.toString()}, 'heckinsecret');
    resolve(token);
    reject("Token creation failed")
  })

  return tokenPromise
}


userSchema.statics.findByCredentials = (email, password) => {
  const loginPromise = new Promise((resolve, reject) => {
    let user
    User.findOne({email})
      .then((result) => {
        if (!result) {
          reject("Login failed.")
        }
        user = result
        return bcrypt.compare(password, user.password)
      })
      .then((result) => {
        if (!result) {
          reject("Login failed.")
        }
        resolve(user)
      })
      .catch((error) => {
        reject(error)
      })
  })

  return loginPromise
}


userSchema.pre('save', async function(callback) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  callback()
})

const User = mongoose.model('User', userSchema)

module.exports = User
