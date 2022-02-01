const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
})

// REFERENCE ONLY

// const me = new User({
//   name: "Ben",
//   email: "ben@gmail.com",
//   password: "password"
// })

// me.save().then((model) => {
//   console.log(model)
// }).catch((error) => {
//   console.log(error)
// })

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
