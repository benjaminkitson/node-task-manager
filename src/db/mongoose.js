const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

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

const me = new User({
  name: "Ben",
  email: "ben@gmail.com",
  password: "password"
})

me.save().then((model) => {
  console.log(model)
}).catch((error) => {
  console.log(error)
})

// const Task = mongoose.model('Task', {
//   title:
//     {
//       type: String
//     },
//   completed:
//     {
//       type: Boolean
//     }
// })

// const laundry = new Task({
//   title: "Laundry",
//   completed: false
// })

// laundry.save().then((model) => {
//   console.log(model)
// }).catch((error) => {
//   console.log(error)
// })
