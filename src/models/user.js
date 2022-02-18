const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
const Task = require("./task")


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
    token:  {
      type: String,
      required: true
    }
  }]
},{
  timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'userId'
})


userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  delete user.tokens
  console.log(user)
  return user
}


userSchema.methods.generateAuthToken = function() {
  const tokenPromise = new Promise((resolve, reject) => {
    const token = jwt.sign({_id: this._id.toString()}, 'heckinsecret');
    this.tokens = this.tokens.concat({token});
    return this.save()
      .then((result) => {
        if (!result) {
          reject("Could not save token.")
        }
        if (!token) {
          reject("Token creation failed.")
        }
        resolve(token);
      }).catch((error) => {
        reject(error)
      })
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


userSchema.pre('remove', async function(callback) {
  await Task.deleteMany({ userId: this._id})

  callback()
})

const User = mongoose.model('User', userSchema)

module.exports = User
